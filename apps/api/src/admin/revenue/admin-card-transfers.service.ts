import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { CardPaymentOrderDocument } from '../../payments/card/card-payment-order.schema';
import { revenueRange } from './revenue-range';

const DAY_MS = 86_400_000;

/** Approved card orders are stored in UZS; use the paid amount, not the list price. */
@Injectable()
export class AdminCardTransfersService {
  constructor(
    @InjectModel('CardPaymentOrder')
    private readonly orders: Model<CardPaymentOrderDocument>,
  ) {}

  async summary(from?: string, to?: string) {
    const range = revenueRange(from, to);
    const endExclusive = new Date(Date.parse(`${range.end}T00:00:00Z`) + DAY_MS)
      .toISOString()
      .slice(0, 10);
    const startAt = new Date(`${range.start}T00:00:00+05:00`);
    const endAt = new Date(`${endExclusive}T00:00:00+05:00`);
    const rows = await this.orders.aggregate<{
      _id: null;
      amountMinor: number;
      count: number;
    }>([
      {
        $match: {
          status: 'approved',
          decidedAt: { $gte: startAt, $lt: endAt },
        },
      },
      {
        $group: {
          _id: null,
          amountMinor: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);
    return {
      currency: 'UZS' as const,
      amountMinor: rows[0]?.amountMinor ?? 0,
      count: rows[0]?.count ?? 0,
      source: 'approved_card_payment_orders' as const,
    };
  }
}
