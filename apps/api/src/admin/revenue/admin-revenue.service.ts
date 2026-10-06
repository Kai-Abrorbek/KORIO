import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PlayReportFile,
  PlayReportFileDocument,
  PlayReportRow,
  PlayReportRowDocument,
  PlayReportSyncState,
  PlayReportSyncStateDocument,
} from './play-report.schema';
import { PlayReportSyncService } from './play-report.sync.service';

const DAY_MS = 86_400_000;
type ActiveFile = Pick<
  PlayReportFile,
  'path' | 'sha256' | 'kind' | 'rowCount' | 'importedAt'
>;
const EMPTY_TOTALS = () => ({
  grossMinor: 0,
  refundsMinor: 0,
  googleFeesMinor: 0,
  taxMinor: 0,
  netMinor: 0,
  orders: 0,
  refunds: 0,
});

function range(from?: string, to?: string) {
  const end = to ?? new Date().toISOString().slice(0, 10);
  if (!validDay(end)) throw new BadRequestException('INVALID_DATE_RANGE');
  const start =
    from ??
    new Date(Date.parse(`${end}T00:00:00Z`) - 29 * DAY_MS)
      .toISOString()
      .slice(0, 10);
  if (!validDay(start)) {
    throw new BadRequestException('INVALID_DATE_RANGE');
  }
  const days =
    Math.round(
      (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) /
        DAY_MS,
    ) + 1;
  if (days < 1 || days > 366)
    throw new BadRequestException('INVALID_DATE_RANGE');
  return { start, end, days };
}

function validDay(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return (
    Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

@Injectable()
export class AdminRevenueService {
  constructor(
    @InjectModel(PlayReportFile.name)
    private readonly files: Model<PlayReportFileDocument>,
    @InjectModel(PlayReportRow.name)
    private readonly rows: Model<PlayReportRowDocument>,
    @InjectModel(PlayReportSyncState.name)
    private readonly state: Model<PlayReportSyncStateDocument>,
    private readonly syncService: PlayReportSyncService,
  ) {}

  private async context() {
    if (!this.syncService.configured)
      return { status: 'unconfigured' as const, files: [] as ActiveFile[] };
    const state = await this.state.findOne({ key: 'google_play' }).lean();
    if (!state?.lastSuccessfulCheckAt)
      throw new ServiceUnavailableException('PLAY_REPORT_NOT_SYNCED');
    const files = (await this.files
      .find({})
      .select('path sha256 kind importedAt rowCount')
      .lean()) as unknown as ActiveFile[];
    return {
      status: files.some((file) => file.rowCount > 0)
        ? ('ready' as const)
        : ('no_reports' as const),
      files,
      syncWarning: state.lastFailureAt ? 'PLAY_REPORT_ACCESS_FAILED' : null,
    };
  }

  private fileFilter(files: ActiveFile[]) {
    return files.map((file) => ({ path: file.path, sha256: file.sha256 }));
  }

  async summary(query: { from?: string; to?: string; currency?: string }) {
    const dates = range(query.from, query.to);
    const context = await this.context();
    const coverage = {
      estimatedThrough: null as string | null,
      earningsThrough: null as string | null,
      lastImportedAt: null as string | null,
    };
    const base = {
      status: context.status,
      currencies: [] as string[],
      selectedCurrency: null as string | null,
      coverage,
      totals: EMPTY_TOTALS(),
      hasEstimatedData: false,
      hasEarningsData: false,
      series: [] as Array<
        ReturnType<typeof EMPTY_TOTALS> & {
          date: string;
          hasEstimatedData: boolean;
          hasEarningsData: boolean;
        }
      >,
      provenance: {
        gross: 'estimated_sales' as const,
        settlement: 'earnings' as const,
        estimatedDateZone: 'UTC' as const,
        earningsDateZone: 'Play report date (Pacific Time)' as const,
      },
      syncWarning:
        context.status === 'unconfigured' ? null : context.syncWarning,
    };
    if (!context.files.length) return base;
    const filter = this.fileFilter(context.files);
    const [currencies, lastDates] = await Promise.all([
      this.rows.distinct('currency', { $or: filter }),
      this.rows.aggregate<{ _id: string; through: string }>([
        { $match: { $or: filter } },
        { $group: { _id: '$kind', through: { $max: '$date' } } },
      ]),
    ]);
    const sorted = currencies.sort();
    const requested = query.currency?.trim().toUpperCase();
    if (requested && !/^[A-Z]{3}$/.test(requested))
      throw new BadRequestException('INVALID_CURRENCY');
    if (requested && !sorted.includes(requested))
      throw new BadRequestException('CURRENCY_NOT_AVAILABLE');
    const selectedCurrency =
      requested ?? (sorted.includes('KRW') ? 'KRW' : (sorted[0] ?? null));
    coverage.estimatedThrough =
      lastDates.find((row) => row._id === 'estimated_sales')?.through ?? null;
    coverage.earningsThrough =
      lastDates.find((row) => row._id === 'earnings')?.through ?? null;
    const lastImportedMs = Math.max(
      ...context.files.map((file) => file.importedAt.getTime()),
    );
    coverage.lastImportedAt = Number.isFinite(lastImportedMs)
      ? new Date(lastImportedMs).toISOString()
      : null;
    if (!selectedCurrency) return { ...base, currencies: sorted, coverage };
    const groups = await this.rows.aggregate<{
      _id: { date: string; kind: string; category: string };
      amount: number;
      count: number;
    }>([
      {
        $match: {
          $or: filter,
          currency: selectedCurrency,
          date: { $gte: dates.start, $lte: dates.end },
        },
      },
      {
        $group: {
          _id: { date: '$date', kind: '$kind', category: '$category' },
          amount: { $sum: '$amountMinor' },
          count: { $sum: 1 },
        },
      },
    ]);
    const byDate = new Map<
      string,
      ReturnType<typeof EMPTY_TOTALS> & {
        date: string;
        hasEstimatedData: boolean;
        hasEarningsData: boolean;
      }
    >();
    for (
      let t = Date.parse(`${dates.start}T00:00:00Z`);
      t <= Date.parse(`${dates.end}T00:00:00Z`);
      t += DAY_MS
    ) {
      const date = new Date(t).toISOString().slice(0, 10);
      byDate.set(date, {
        date,
        ...EMPTY_TOTALS(),
        hasEstimatedData: false,
        hasEarningsData: false,
      });
    }
    for (const group of groups) {
      const daily = byDate.get(group._id.date);
      if (!daily) continue;
      if (group._id.kind === 'estimated_sales') {
        daily.hasEstimatedData = true;
        if (group._id.category === 'charge') {
          daily.grossMinor += group.amount;
          daily.orders += group.count;
        }
        if (group._id.category === 'refund') {
          daily.refundsMinor += group.amount;
          daily.refunds += group.count;
        }
      } else {
        daily.hasEarningsData = true;
        daily.netMinor += group.amount;
        if (group._id.category === 'fee') daily.googleFeesMinor -= group.amount;
        if (group._id.category === 'tax') daily.taxMinor -= group.amount;
      }
    }
    const series = [...byDate.values()];
    const totals = series.reduce((acc, day) => {
      for (const key of Object.keys(acc) as Array<keyof typeof acc>)
        acc[key] += day[key];
      return acc;
    }, EMPTY_TOTALS());
    return {
      ...base,
      status: context.status,
      currencies: sorted,
      selectedCurrency,
      hasEstimatedData: series.some((day) => day.hasEstimatedData),
      hasEarningsData: series.some((day) => day.hasEarningsData),
      coverage,
      totals,
      series,
    };
  }

  async transactions(query: {
    from?: string;
    to?: string;
    currency?: string;
    page?: string;
    pageSize?: string;
  }) {
    const dates = range(query.from, query.to);
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      throw new BadRequestException('INVALID_PAGINATION');
    }
    const context = await this.context();
    if (!context.files.length)
      return { status: context.status, items: [], total: 0, page, pageSize };
    const currency = query.currency?.trim().toUpperCase();
    if (currency && !/^[A-Z]{3}$/.test(currency))
      throw new BadRequestException('INVALID_CURRENCY');
    const filter = {
      $or: this.fileFilter(context.files),
      date: { $gte: dates.start, $lte: dates.end },
      ...(currency ? { currency } : {}),
    };
    const [items, total] = await Promise.all([
      this.rows
        .find(filter)
        .sort({ date: -1, _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select('date kind currency amountMinor category orderNumber skuId')
        .lean(),
      this.rows.countDocuments(filter),
    ]);
    return {
      status: context.status,
      items: items.map((row) => ({
        id: String(row._id),
        date: row.date,
        kind: row.kind,
        currency: row.currency,
        amountMinor: row.amountMinor,
        category: row.category,
        orderNumber: row.orderNumber,
        skuId: row.skuId,
      })),
      total,
      page,
      pageSize,
    };
  }
}
