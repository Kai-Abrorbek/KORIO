import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminRewardGrant,
  AdminRewardGrantDocument,
} from '../admin/rewards/admin-reward-grant.schema';

@Injectable()
export class RewardInboxService {
  constructor(
    @InjectModel(AdminRewardGrant.name)
    private readonly grants: Model<AdminRewardGrantDocument>,
  ) {}

  async pending(userId: string) {
    const rows = await this.grants
      .find({
        userId: new Types.ObjectId(userId),
        status: 'applied',
        acknowledgedAt: null,
      })
      .sort({ appliedAt: 1, _id: 1 })
      .limit(20)
      .select('_id kind amount appliedAt')
      .lean();
    return {
      items: rows.map((row) => ({
        id: String(row._id),
        kind: row.kind,
        amount: row.amount,
        appliedAt: row.appliedAt,
      })),
    };
  }

  async acknowledge(userId: string, id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_REWARD_ID');
    const result = await this.grants.updateOne(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
        status: 'applied',
        acknowledgedAt: null,
      },
      { $set: { acknowledgedAt: new Date() } },
    );
    if (result.modifiedCount) return { acknowledged: true };
    // Multiple devices may confirm the same grant at once. Keep the action
    // idempotent, but never confirm a different user's reward.
    const alreadyAcknowledged = await this.grants.exists({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
      status: 'applied',
      acknowledgedAt: { $ne: null },
    });
    return { acknowledged: !!alreadyAcknowledged };
  }
}
