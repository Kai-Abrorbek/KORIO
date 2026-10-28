import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { APP_RELEASES, STORE } from '../../app-release/app-releases.data';
import { PlayVersionService } from '../../app-release/play-version.service';
import { PushService } from '../../push/push.service';
import { PushMailService } from '../../push/push-mail.service';
import { PushType } from '../../push/push.types';
import { User, UserDocument } from '../../users/schemas/user.schema';
import {
  DeviceToken,
  DeviceTokenDocument,
} from '../../push/schemas/device-token.schema';
import { AdminAuditService } from '../admin-audit.service';
import {
  AdminAuditLog,
  AdminAuditLogDocument,
} from '../schemas/admin-audit-log.schema';
import type { AdminRequestContext } from '../guards/admin.guard';

const LANGS = ['ko', 'uz', 'en', 'ru'] as const;

export interface SendAnnouncementInput {
  key: string;
  title: Record<string, string>;
  body: Record<string, string>;
  reason: string;
  /** 푸시가 닿지 않는 사람(토큰 없음)에게 메일로도 */
  email?: boolean;
}

@Injectable()
export class AdminOperationsService {
  private readonly logger = new Logger(AdminOperationsService.name);

  constructor(
    private readonly play: PlayVersionService,
    private readonly push: PushService,
    private readonly pushMail: PushMailService,
    private readonly audit: AdminAuditService,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(DeviceToken.name)
    private readonly tokens: Model<DeviceTokenDocument>,
    @InjectModel(AdminAuditLog.name)
    private readonly auditLogs: Model<AdminAuditLogDocument>,
  ) {}

  async status() {
    const play = this.play.latest();
    const stale = new Date(Date.now() - 120 * 86400_000);
    const [recipientIds, recent] = await Promise.all([
      this.tokens.distinct('userId', {
        invalidAt: null,
        lastSeenAt: { $gte: stale },
      }),
      this.auditLogs
        .find({ action: 'operations.announcement_send', success: true })
        .sort({ at: -1 })
        .limit(10)
        .select('at adminEmail targetId targetLabel changes')
        .lean(),
    ]);
    return {
      checkedAt: new Date().toISOString(),
      version: {
        latestVersion: play?.versionName ?? STORE.android.latestVersion,
        latestBuild: play?.versionCode ?? null,
        minSupportedVersion: STORE.android.minSupportedVersion,
        source: play ? 'play' : 'file',
        playCheckedAt: play?.checkedAt ?? null,
        storeUrl: STORE.android.storeUrl,
        recentRelease: APP_RELEASES[0]
          ? {
              date: APP_RELEASES[0].date,
              items: APP_RELEASES[0].items
                .filter((item) => !item.only || item.only === 'mobile')
                .map((item) => item.text.ko),
            }
          : null,
      },
      push: {
        eligibleUsers: recipientIds.length,
        definition:
          '최근 120일 내 등록한 유효한 푸시 토큰의 고유 사용자 수. 알림 수신 설정과 최종 전달 성공을 보장하지 않습니다.',
      },
      recentAnnouncements: recent.map((row) => ({
        key: row.targetId,
        title: row.targetLabel,
        at: row.at.toISOString(),
        adminEmail: row.adminEmail,
        sent: Number(row.changes?.sent?.to ?? 0),
        targets: Number(row.changes?.targets?.to ?? 0),
      })),
      controls: {
        maintenance: 'not_implemented',
        featureFlags: 'not_implemented',
        campaigns: 'not_implemented',
        versionPolicy: 'code_deploy',
      },
    };
  }

  async announce(input: SendAnnouncementInput, admin: AdminRequestContext) {
    const key = input.key?.trim();
    const reason = input.reason?.trim();
    if (!key || !/^[a-zA-Z0-9_-]{8,80}$/.test(key))
      throw new BadRequestException('INVALID_ANNOUNCEMENT_KEY');
    if (!reason || reason.length > 500)
      throw new BadRequestException('REASON_REQUIRED');
    for (const lang of LANGS) {
      const title = input.title?.[lang]?.trim();
      const body = input.body?.[lang]?.trim();
      if (!title || title.length > 100 || !body || body.length > 500) {
        throw new BadRequestException(
          `INVALID_ANNOUNCEMENT_${lang.toUpperCase()}`,
        );
      }
    }
    // A retry with the same key cannot send twice; PushLog also de-duplicates per user.
    const previous = await this.auditLogs
      .findOne({
        action: 'operations.announcement_send',
        targetId: key,
        success: true,
      })
      .lean();
    if (previous) throw new BadRequestException('ANNOUNCEMENT_ALREADY_SENT');
    const result = await this.push.announce({
      key,
      title: input.title,
      body: input.body,
    });
    // 메일은 몇 분이 걸린다 (초당 2통) — 응답을 붙잡지 않고 뒤에서 보낸다
    const mailTargets = input.email ? await this.mailTargets() : [];
    if (mailTargets.length) void this.mailAnnouncement(key, input, mailTargets);
    await this.audit.record({
      admin,
      action: 'operations.announcement_send',
      targetType: 'push_announcement',
      targetId: key,
      targetLabel: input.title.ko.trim(),
      reason,
      changes: {
        sent: { from: 0, to: result.sent },
        targets: { from: 0, to: 'targets' in result ? result.targets : 0 },
        mailQueued: { from: 0, to: mailTargets.length },
      },
    });
    return { ...result, mailQueued: mailTargets.length };
  }

  /** 푸시가 닿지 않는 사람 — 살아 있는 토큰이 없고, 메일이 있고, 수신 거부 안 함 */
  private async mailTargets(): Promise<Types.ObjectId[]> {
    const stale = new Date(Date.now() - 120 * 86400_000);
    const reachable = new Set(
      (
        await this.tokens.distinct('userId', {
          invalidAt: null,
          lastSeenAt: { $gte: stale },
        })
      ).map(String),
    );
    const rows = await this.users
      .find({
        email: { $regex: '@' },
        emailNotifications: { $ne: false },
        isBot: { $ne: true },
      })
      .select('_id')
      .lean<{ _id: Types.ObjectId }[]>();
    return rows.map((r) => r._id).filter((id) => !reachable.has(String(id)));
  }

  private async mailAnnouncement(
    key: string,
    input: SendAnnouncementInput,
    ids: Types.ObjectId[],
  ) {
    const copyByLang: Record<string, { title: string; body: string }> = {};
    for (const lang of LANGS) {
      copyByLang[lang] = {
        title: input.title[lang].trim(),
        body: input.body[lang].trim(),
      };
    }
    let mailed = 0;
    for (const id of ids) {
      try {
        if (
          await this.pushMail.send(id, PushType.ANNOUNCEMENT, {
            copyByLang,
            dedupKey: `announce:${key}`,
          })
        )
          mailed++;
      } catch (e) {
        this.logger.warn(
          `공지 메일 실패 (${String(id)}): ${(e as Error).message}`,
        );
      }
    }
    this.logger.log(`공지 ${key} 메일 ${mailed}/${ids.length}건 발송`);
  }
}
