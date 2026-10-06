import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash, randomUUID } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { parsePlayZip } from './play-report.parser';
import {
  PlayReportFile,
  PlayReportFileDocument,
  PlayReportKind,
  PlayReportRow,
  PlayReportRowDocument,
  PlayReportSyncState,
  PlayReportSyncStateDocument,
} from './play-report.schema';

const STORAGE_SCOPE = 'https://www.googleapis.com/auth/devstorage.read_only';
const STORAGE_API = 'https://storage.googleapis.com/storage/v1';
const MAX_ARCHIVE_BYTES = 32 * 1024 * 1024;
const LEASE_MS = 60 * 60 * 1000;

interface GcsObject {
  name: string;
  generation: string;
  size?: string;
}

@Injectable()
export class PlayReportSyncService implements OnModuleInit {
  private readonly logger = new Logger(PlayReportSyncService.name);
  private auth?: GoogleAuth;

  constructor(
    @InjectModel(PlayReportFile.name)
    private readonly files: Model<PlayReportFileDocument>,
    @InjectModel(PlayReportRow.name)
    private readonly rows: Model<PlayReportRowDocument>,
    @InjectModel(PlayReportSyncState.name)
    private readonly state: Model<PlayReportSyncStateDocument>,
  ) {}

  get configured(): boolean {
    return Boolean(
      this.bucket &&
      process.env.GOOGLE_PLAY_PACKAGE_NAME?.trim() &&
      (process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() ||
        process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()),
    );
  }

  private get bucket(): string | null {
    const value = process.env.GOOGLE_PLAY_REPORT_BUCKET?.trim() ?? '';
    const match = /^gs:\/\/([a-z0-9._-]+)\/?$/i.exec(value);
    return match?.[1] ?? null;
  }

  private getAuth(): GoogleAuth {
    if (this.auth) return this.auth;
    const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
    if (inline) {
      let credentials: Record<string, unknown>;
      try {
        credentials = JSON.parse(inline) as Record<string, unknown>;
      } catch {
        throw new BadRequestException('GOOGLE_SERVICE_ACCOUNT_JSON_INVALID');
      }
      this.auth = new GoogleAuth({ credentials, scopes: [STORAGE_SCOPE] });
    } else {
      this.auth = new GoogleAuth({ scopes: [STORAGE_SCOPE] });
    }
    return this.auth;
  }

  private async get(url: string): Promise<Response> {
    try {
      const client = await this.getAuth().getClient();
      const authHeaders = await client.getRequestHeaders(url);
      const response = await fetch(url, {
        headers: Object.fromEntries(new Headers(authHeaders)),
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) {
        // Do not log URLs, response bodies, credentials, or tokens.
        this.logger.warn(`Play report storage HTTP ${response.status}`);
        throw new ServiceUnavailableException('PLAY_REPORT_ACCESS_FAILED');
      }
      return response;
    } catch (error) {
      if (error instanceof ServiceUnavailableException) throw error;
      this.logger.warn('Play report storage request failed');
      throw new ServiceUnavailableException('PLAY_REPORT_ACCESS_FAILED');
    }
  }

  private async list(prefix: string): Promise<GcsObject[]> {
    const objects: GcsObject[] = [];
    let pageToken = '';
    do {
      const params = new URLSearchParams({
        prefix,
        fields: 'items(name,generation,size),nextPageToken',
        maxResults: '500',
      });
      if (pageToken) params.set('pageToken', pageToken);
      const response = await this.get(
        `${STORAGE_API}/b/${encodeURIComponent(this.bucket!)}/o?${params}`,
      );
      const body = (await response.json()) as {
        items?: GcsObject[];
        nextPageToken?: string;
      };
      objects.push(...(body.items ?? []));
      if (objects.length > 2000)
        throw new ServiceUnavailableException('PLAY_REPORT_TOO_MANY_FILES');
      pageToken = body.nextPageToken ?? '';
    } while (pageToken);
    return objects;
  }

  private async download(name: string, declaredSize?: string): Promise<Buffer> {
    if (Number(declaredSize) > MAX_ARCHIVE_BYTES)
      throw new ServiceUnavailableException('PLAY_REPORT_TOO_LARGE');
    const response = await this.get(
      `${STORAGE_API}/b/${encodeURIComponent(this.bucket!)}/o/${encodeURIComponent(name)}?alt=media`,
    );
    if (Number(response.headers.get('content-length')) > MAX_ARCHIVE_BYTES)
      throw new ServiceUnavailableException('PLAY_REPORT_TOO_LARGE');
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > MAX_ARCHIVE_BYTES)
      throw new ServiceUnavailableException('PLAY_REPORT_TOO_LARGE');
    return bytes;
  }

  private identify(
    name: string,
  ): { kind: PlayReportKind; month: string } | null {
    const sales = /^sales\/salesreport_(\d{6})\.zip$/.exec(name);
    if (sales) return { kind: 'estimated_sales', month: sales[1] };
    const earnings = /^earnings\/earnings_(\d{6})(?:[^/]*)\.zip$/.exec(name);
    if (earnings) return { kind: 'earnings', month: earnings[1] };
    return null;
  }

  /** A cron may run on two deploy replicas. Unique row keys + DB lease make it safe. */
  @Cron('0 20 6 * * *')
  async scheduledSync(): Promise<void> {
    if (!this.configured) return;
    try {
      await this.sync();
    } catch {
      this.logger.warn('Scheduled Play report sync failed');
    }
  }

  /** Populate initial status without blocking API startup. */
  onModuleInit(): void {
    if (!this.configured) return;
    void this.scheduledSync();
  }

  async sync(): Promise<{
    status: 'unconfigured' | 'busy' | 'complete';
    files: number;
    changed: number;
  }> {
    if (!this.configured)
      return { status: 'unconfigured', files: 0, changed: 0 };
    // The unique indexes are the cross-replica idempotency guarantee.
    await Promise.all([this.files.init(), this.rows.init(), this.state.init()]);
    try {
      await this.state.updateOne(
        { key: 'google_play' },
        { $setOnInsert: { key: 'google_play' } },
        { upsert: true },
      );
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
    }
    const now = new Date();
    const owner = randomUUID();
    const lease = await this.state.findOneAndUpdate(
      {
        key: 'google_play',
        $or: [{ leaseUntil: null }, { leaseUntil: { $lt: now } }],
      },
      {
        $set: {
          leaseUntil: new Date(now.getTime() + LEASE_MS),
          leaseOwner: owner,
        },
      },
      { new: true },
    );
    if (!lease) return { status: 'busy', files: 0, changed: 0 };
    try {
      const objects = [
        ...(await this.list('sales/salesreport_')),
        ...(await this.list('earnings/earnings_')),
      ].filter((object) => Boolean(this.identify(object.name)));
      let changed = 0;
      for (const object of objects) {
        const activeLease = await this.state.exists({
          key: 'google_play',
          leaseOwner: owner,
          leaseUntil: { $gt: new Date() },
        });
        if (!activeLease)
          throw new ServiceUnavailableException('PLAY_REPORT_SYNC_LEASE_LOST');
        const report = this.identify(object.name)!;
        const current = await this.files.findOne({ path: object.name }).lean();
        if (current?.generation === object.generation) continue;
        const archive = await this.download(object.name, object.size);
        const sha256 = createHash('sha256').update(archive).digest('hex');
        if (current?.sha256 === sha256) {
          await this.assertLease(owner);
          await this.files.updateOne(
            { path: object.name },
            { $set: { generation: object.generation, importedAt: new Date() } },
          );
          continue;
        }
        const parsed = parsePlayZip(
          archive,
          report.kind,
          process.env.GOOGLE_PLAY_PACKAGE_NAME!.trim(),
        );
        for (let offset = 0; offset < parsed.length; offset += 500) {
          const chunk = parsed.slice(offset, offset + 500);
          await this.rows.bulkWrite(
            chunk.map((row) => ({
              updateOne: {
                filter: { path: object.name, sha256, rowIndex: row.rowIndex },
                update: { $setOnInsert: { ...row, path: object.name, sha256 } },
                upsert: true,
              },
            })),
            { ordered: false },
          );
        }
        // Activate the complete new snapshot only after all rows have persisted.
        await this.assertLease(owner);
        await this.files.updateOne(
          { path: object.name },
          {
            $set: {
              path: object.name,
              kind: report.kind,
              month: report.month,
              generation: object.generation,
              sha256,
              rowCount: parsed.length,
              importedAt: new Date(),
            },
          },
          { upsert: true },
        );
        changed++;
      }
      await this.state.updateOne(
        { key: 'google_play' },
        { $set: { lastSuccessfulCheckAt: new Date(), lastFailureAt: null } },
      );
      return { status: 'complete', files: objects.length, changed };
    } catch (error) {
      await this.state.updateOne(
        { key: 'google_play' },
        { $set: { lastFailureAt: new Date() } },
      );
      throw error;
    } finally {
      await this.state.updateOne(
        { key: 'google_play', leaseOwner: owner },
        { $set: { leaseUntil: null, leaseOwner: null } },
      );
    }
  }

  private async assertLease(owner: string): Promise<void> {
    const active = await this.state.exists({
      key: 'google_play',
      leaseOwner: owner,
      leaseUntil: { $gt: new Date() },
    });
    if (!active)
      throw new ServiceUnavailableException('PLAY_REPORT_SYNC_LEASE_LOST');
  }
}
