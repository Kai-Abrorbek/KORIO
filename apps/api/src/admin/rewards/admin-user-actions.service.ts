import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { ENERGY_CONFIG } from '../../energy/energy.constants';
import { STREAK_FREEZE } from '../../retention/retention.config';
import { GemPassService } from '../../payments/gems/gem-pass.service';
import { SubscriptionService } from '../../payments/subscriptions/subscription.service';
import { PushService } from '../../push/push.service';
import { PushType } from '../../push/push.types';
import { AdminAuditService } from '../admin-audit.service';
import type { AdminRequestContext } from '../guards/admin.guard';
import {
  AdminRewardGrant,
  AdminRewardGrantDocument,
} from './admin-reward-grant.schema';

type RewardKind = 'gems' | 'energy_refill' | 'streak_freeze' | 'super_days';
type GrantInput = {
  requestId: string;
  kind: RewardKind;
  amount: number;
  reason: string;
};

@Injectable()
export class AdminUserActionsService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(AdminRewardGrant.name)
    private readonly grants: Model<AdminRewardGrantDocument>,
    private readonly gemPass: GemPassService,
    private readonly subscriptions: SubscriptionService,
    private readonly pushService: PushService,
    private readonly audit: AdminAuditService,
  ) {}

  private async target(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_USER_ID');
    const user = await this.users
      .findOne({ _id: new Types.ObjectId(id), isBot: { $ne: true } })
      .select('_id')
      .lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return new Types.ObjectId(id);
  }

  async history(id: string) {
    const uid = await this.target(id);
    const rows = await this.grants
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return {
      items: rows.map((row) => ({
        id: String(row._id),
        requestId: row.requestId,
        kind: row.kind,
        amount: row.amount,
        status: row.status,
        adminEmail: row.adminEmail,
        reason: row.reason,
        appliedAt: row.appliedAt,
      })),
    };
  }

  async grant(id: string, input: GrantInput, admin: AdminRequestContext) {
    const uid = await this.target(id);
    const reason = input.reason.trim();
    if (reason.length < 5) throw new BadRequestException('REASON_REQUIRED');
    const allowed: Record<RewardKind, readonly number[] | null> = {
      gems: null,
      energy_refill: [1],
      streak_freeze: [1],
      super_days: [1, 7, 14, 30],
    };
    if (
      !(input.kind in allowed) ||
      !Number.isInteger(input.amount) ||
      input.amount < 1 ||
      input.amount > 10000 ||
      (allowed[input.kind] && !allowed[input.kind]!.includes(input.amount))
    ) {
      throw new BadRequestException('INVALID_REWARD');
    }

    let row = await this.grants.findOne({ requestId: input.requestId });
    if (!row) {
      try {
        row = await this.grants.create({
          requestId: input.requestId,
          userId: uid,
          kind: input.kind,
          amount: input.amount,
          status: 'pending',
          adminId: new Types.ObjectId(admin.userId),
          adminEmail: admin.email,
          reason,
        });
      } catch (error) {
        if ((error as { code?: number }).code !== 11000) throw error;
        row = await this.grants.findOne({ requestId: input.requestId });
      }
    }
    if (
      !row ||
      String(row.userId) !== id ||
      row.kind !== input.kind ||
      row.amount !== input.amount ||
      row.reason !== reason ||
      String(row.adminId) !== admin.userId
    )
      throw new ConflictException('REWARD_REQUEST_ID_CONFLICT');
    if (row.status === 'applied')
      return { applied: true, duplicate: true, requestId: input.requestId };

    if (input.kind === 'super_days') {
      await this.gemPass.grantRewardDays(
        id,
        input.amount,
        `admin:${input.requestId}`,
      );
      // A previous attempt may have created the subscription but failed before projection.
      await this.subscriptions.syncUser(id);
    } else {
      const filter: Record<string, unknown> = {
        _id: uid,
        adminRewardKeys: { $ne: input.requestId },
      };
      const update: Record<string, unknown> = {
        $addToSet: { adminRewardKeys: input.requestId },
      };
      if (input.kind === 'gems') update.$inc = { gems: input.amount };
      if (input.kind === 'energy_refill') {
        filter.energy = { $lt: ENERGY_CONFIG.MAX };
        update.$set = {
          energy: ENERGY_CONFIG.MAX,
          energyUpdatedAt: new Date(),
        };
      }
      if (input.kind === 'streak_freeze') {
        filter.$expr = {
          $lt: [{ $ifNull: ['$streakFreeze', 0] }, STREAK_FREEZE.MAX_HOLD],
        };
        update.$inc = { streakFreeze: 1 };
      }
      const applied = await this.users.updateOne(filter, update);
      if (!applied.modifiedCount) {
        const previous = await this.users.exists({
          _id: uid,
          adminRewardKeys: input.requestId,
        });
        if (!previous)
          throw new BadRequestException(
            input.kind === 'energy_refill'
              ? 'ENERGY_ALREADY_FULL'
              : 'STREAK_FREEZE_LIMIT',
          );
      }
    }

    await this.grants.updateOne(
      { _id: row._id, status: 'pending' },
      { $set: { status: 'applied', appliedAt: new Date() } },
    );
    await this.audit.record({
      admin,
      action: 'user.reward.grant',
      targetType: 'user',
      targetId: id,
      reason,
      changes: {
        reward: {
          from: null,
          to: {
            kind: input.kind,
            amount: input.amount,
            requestId: input.requestId,
          },
        },
      },
    });
    return { applied: true, duplicate: false, requestId: input.requestId };
  }

  async push(
    id: string,
    input: { requestId: string; title: string; body: string; reason: string },
    admin: AdminRequestContext,
  ) {
    await this.target(id);
    const title = input.title.trim();
    const body = input.body.trim();
    const reason = input.reason.trim();
    if (!title || !body || reason.length < 5)
      throw new BadRequestException('INVALID_PUSH');
    const accepted = await this.pushService.send(id, PushType.ANNOUNCEMENT, {
      copy: { title, body },
      dedupKey: `admin-personal:${input.requestId}`,
    });
    await this.audit.record({
      admin,
      action: 'user.push.send',
      targetType: 'user',
      targetId: id,
      reason,
      success: accepted,
      errorCode: accepted ? '' : 'NOT_ACCEPTED_OR_DUPLICATE',
      changes: {
        push: { from: null, to: { title, body, requestId: input.requestId } },
      },
    });
    return {
      accepted,
      note: accepted
        ? 'EXPO_ACCEPTED_RECEIPT_PENDING'
        : 'NOT_ACCEPTED_OR_DUPLICATE',
    };
  }
}
