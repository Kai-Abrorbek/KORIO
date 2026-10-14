import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import type { CardPaymentOrderDocument } from '../../payments/card/card-payment-order.schema';
import { AdminAuditService } from '../admin-audit.service';
import type { AdminRequestContext } from '../guards/admin.guard';
import {
  ManualRevenueEntry,
  ManualRevenueEntryDocument,
  type ManualRevenueKind,
} from './manual-revenue-entry.schema';
import { revenueRange, validRevenueDate } from './revenue-range';

export interface ManualRevenueInput {
  requestId: string;
  kind: ManualRevenueKind;
  date: string;
  currency: string;
  amountMinor: number;
  category: string;
  reference?: string;
  note?: string;
  reason: string;
}

function display(row: ManualRevenueEntryDocument) {
  return {
    id: String(row._id),
    requestId: row.requestId,
    kind: row.kind,
    date: row.date,
    currency: row.currency,
    amountMinor: row.amountMinor,
    category: row.category,
    reference: row.reference,
    note: row.note,
    reason: row.reason,
    createdAt: row.createdAt.toISOString(),
    createdBy: row.createdByEmail,
    voidedAt: row.voidedAt?.toISOString() ?? null,
    voidReason: row.voidReason,
  };
}

@Injectable()
export class AdminManualRevenueService {
  constructor(
    @InjectModel(ManualRevenueEntry.name)
    private readonly entries: Model<ManualRevenueEntryDocument>,
    @InjectModel('CardPaymentOrder')
    private readonly cardOrders: Model<CardPaymentOrderDocument>,
    private readonly audit: AdminAuditService,
  ) {}

  async list(query: {
    from?: string;
    to?: string;
    currency?: string;
    page?: string;
    pageSize?: string;
  }) {
    const dates = revenueRange(query.from, query.to);
    const currency = query.currency?.trim().toUpperCase();
    if (currency && !/^[A-Z]{3}$/.test(currency))
      throw new BadRequestException('INVALID_CURRENCY');
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 50);
    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      page > 1_000_000 ||
      !Number.isSafeInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    )
      throw new BadRequestException('INVALID_PAGINATION');

    const filter = {
      date: { $gte: dates.start, $lte: dates.end },
      ...(currency ? { currency } : {}),
    };
    const [items, total, grouped] = await Promise.all([
      this.entries
        .find(filter)
        .sort({ date: -1, createdAt: -1, _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      this.entries.countDocuments(filter),
      this.entries.aggregate<{
        _id: { currency: string; kind: ManualRevenueKind };
        amountMinor: number;
      }>([
        { $match: { ...filter, voidedAt: null } },
        {
          $group: {
            _id: { currency: '$currency', kind: '$kind' },
            amountMinor: { $sum: '$amountMinor' },
          },
        },
      ]),
    ]);
    const byCurrency = new Map<
      string,
      {
        currency: string;
        expenseMinor: number;
        telegramCardRevenueMinor: number;
      }
    >();
    for (const row of grouped) {
      const value = byCurrency.get(row._id.currency) ?? {
        currency: row._id.currency,
        expenseMinor: 0,
        telegramCardRevenueMinor: 0,
      };
      if (row._id.kind === 'expense') value.expenseMinor += row.amountMinor;
      if (row._id.kind === 'telegram_card_revenue')
        value.telegramCardRevenueMinor += row.amountMinor;
      byCurrency.set(row._id.currency, value);
    }
    return {
      items: items.map((row) => display(row as ManualRevenueEntryDocument)),
      total,
      page,
      pageSize,
      totalsByCurrency: [...byCurrency.values()].sort((a, b) =>
        a.currency.localeCompare(b.currency),
      ),
    };
  }

  async create(input: ManualRevenueInput, admin: AdminRequestContext) {
    if (!['expense', 'telegram_card_revenue'].includes(input.kind))
      throw new BadRequestException('INVALID_KIND');
    if (!validRevenueDate(input.date))
      throw new BadRequestException('INVALID_DATE');
    const currency = input.currency.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency))
      throw new BadRequestException('INVALID_CURRENCY');
    if (
      !Number.isSafeInteger(input.amountMinor) ||
      input.amountMinor < 1 ||
      input.amountMinor > 1_000_000_000_000
    )
      throw new BadRequestException('INVALID_AMOUNT');
    const category = input.category.trim();
    const reference = input.reference?.trim() ?? '';
    const note = input.note?.trim() ?? '';
    const reason = input.reason.trim();
    if (!category || category.length > 80 || note.length > 500)
      throw new BadRequestException('INVALID_DESCRIPTION');
    if (reason.length < 5 || reason.length > 500)
      throw new BadRequestException('REASON_REQUIRED');
    if (reference.length > 120)
      throw new BadRequestException('INVALID_REFERENCE');
    if (input.kind === 'telegram_card_revenue' && !reference)
      throw new BadRequestException('CARD_REFERENCE_REQUIRED');
    if (input.kind === 'telegram_card_revenue' && currency !== 'UZS')
      throw new BadRequestException('CARD_CURRENCY_MUST_BE_UZS');
    const existing = await this.entries.findOne({ requestId: input.requestId });
    if (existing) return this.replay(existing, input, admin);
    // A registered order, including one still awaiting approval, belongs to
    // the automatic path. It must never be entered into the exception ledger.
    if (input.kind === 'telegram_card_revenue') {
      const orderId = reference.replace(/^card:/i, '');
      if (
        Types.ObjectId.isValid(orderId) &&
        (await this.cardOrders.exists({ _id: orderId }))
      )
        throw new ConflictException('CARD_ORDER_ALREADY_TRACKED');
    }

    let row: ManualRevenueEntryDocument;
    try {
      row = await this.entries.create({
        requestId: input.requestId,
        kind: input.kind,
        date: input.date,
        currency,
        amountMinor: input.amountMinor,
        category,
        reference,
        referenceKey: reference.toLowerCase(),
        note,
        reason,
        createdBy: new Types.ObjectId(admin.userId),
        createdByEmail: admin.email,
        voidedAt: null,
        voidedBy: null,
        voidReason: '',
      });
    } catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
      const duplicate = await this.entries.findOne({
        requestId: input.requestId,
      });
      if (duplicate) return this.replay(duplicate, input, admin);
      throw new ConflictException('CARD_REFERENCE_ALREADY_RECORDED');
    }
    await this.audit.record({
      admin,
      action: 'revenue.manual_create',
      targetType: 'manual_revenue_entry',
      targetId: String(row._id),
      targetLabel: `${row.kind} ${row.date} ${row.currency} ${row.amountMinor}`,
      changes: {
        amountMinor: { from: null, to: row.amountMinor },
        currency: { from: null, to: row.currency },
        kind: { from: null, to: row.kind },
      },
      reason,
    });
    return { ...display(row), duplicate: false };
  }

  private replay(
    row: ManualRevenueEntryDocument,
    input: ManualRevenueInput,
    admin: AdminRequestContext,
  ) {
    if (
      row.kind !== input.kind ||
      row.date !== input.date ||
      row.currency !== input.currency.trim().toUpperCase() ||
      row.amountMinor !== input.amountMinor ||
      row.category !== input.category.trim() ||
      row.reference !== (input.reference?.trim() ?? '') ||
      row.note !== (input.note?.trim() ?? '') ||
      row.reason !== input.reason.trim() ||
      String(row.createdBy) !== admin.userId
    )
      throw new ConflictException('MANUAL_REQUEST_ID_CONFLICT');
    return { ...display(row), duplicate: true };
  }

  async void(id: string, reason: string, admin: AdminRequestContext) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_ENTRY_ID');
    const trimmed = reason.trim();
    if (trimmed.length < 5 || trimmed.length > 500)
      throw new BadRequestException('REASON_REQUIRED');
    const row = await this.entries.findOneAndUpdate(
      { _id: new Types.ObjectId(id), voidedAt: null },
      {
        $set: {
          voidedAt: new Date(),
          voidedBy: new Types.ObjectId(admin.userId),
          voidReason: trimmed,
        },
      },
      { returnDocument: 'after' },
    );
    if (!row) {
      const previous = await this.entries.findById(id);
      if (!previous) throw new NotFoundException('MANUAL_ENTRY_NOT_FOUND');
      return { ...display(previous), duplicate: true };
    }
    await this.audit.record({
      admin,
      action: 'revenue.manual_void',
      targetType: 'manual_revenue_entry',
      targetId: id,
      targetLabel: `${row.kind} ${row.date} ${row.currency} ${row.amountMinor}`,
      changes: { voidedAt: { from: null, to: row.voidedAt?.toISOString() } },
      reason: trimmed,
    });
    return { ...display(row), duplicate: false };
  }
}
