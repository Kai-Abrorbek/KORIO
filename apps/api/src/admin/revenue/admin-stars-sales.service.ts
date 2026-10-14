import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { SubscriptionDocument } from '../../payments/subscriptions/subscription.schema';
import { revenueRange } from './revenue-range';

const DAY_MS = 86_400_000;

/** Confirmed KORIO invoice purchases only; neither cash nor current bot balance. */
@Injectable()
export class AdminStarsSalesService {
  constructor(
    @InjectModel('Subscription')
    private readonly subscriptions: Model<SubscriptionDocument>,
  ) {}

  async summary(from?: string, to?: string) {
    const range = revenueRange(from, to);
    const endExclusive = new Date(Date.parse(`${range.end}T00:00:00Z`) + DAY_MS)
      .toISOString()
      .slice(0, 10);
    const rows = await this.subscriptions.aggregate<{
      _id: null;
      grossMicros: number;
      refundedMicros: number;
      count: number;
      refundedCount: number;
    }>([
      {
        $match: {
          provider: 'telegram_stars',
          currency: 'XTR',
          priceMicros: { $type: 'number', $gte: 0 },
          createdAt: {
            $gte: new Date(`${range.start}T00:00:00+05:00`),
            $lt: new Date(`${endExclusive}T00:00:00+05:00`),
          },
        },
      },
      {
        $group: {
          _id: null,
          grossMicros: { $sum: '$priceMicros' },
          refundedMicros: {
            $sum: {
              $cond: [
                { $ne: [{ $ifNull: ['$revokedAt', null] }, null] },
                '$priceMicros',
                0,
              ],
            },
          },
          count: { $sum: 1 },
          refundedCount: {
            $sum: {
              $cond: [{ $ne: [{ $ifNull: ['$revokedAt', null] }, null] }, 1, 0],
            },
          },
        },
      },
    ]);
    const grossStars = (rows[0]?.grossMicros ?? 0) / 1_000_000;
    const refundedStars = (rows[0]?.refundedMicros ?? 0) / 1_000_000;
    return {
      currency: 'XTR' as const,
      grossStars,
      refundedStars,
      netStars: grossStars - refundedStars,
      count: rows[0]?.count ?? 0,
      refundedCount: rows[0]?.refundedCount ?? 0,
      source: 'telegram_stars_subscriptions' as const,
      note: 'Refunds are attributed to the original purchase date; Stars are not fiat revenue.',
    };
  }
}
