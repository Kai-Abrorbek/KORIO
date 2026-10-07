import { Types } from 'mongoose';
// The model is mocked here; importing the application's decorated schema under
// ts-jest would execute unrelated Mongoose metadata at module-load time.
jest.mock('../../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../../payments/gems/gem-pass.service', () => ({
  GemPassService: class GemPassService {},
}));
jest.mock('../../payments/subscriptions/subscription.service', () => ({
  SubscriptionService: class SubscriptionService {},
}));
jest.mock('../../push/push.service', () => ({
  PushService: class PushService {},
}));
jest.mock('../admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));
import type { Model } from 'mongoose';
import type { UserDocument } from '../../users/schemas/user.schema';
import type { AdminRewardGrantDocument } from './admin-reward-grant.schema';
import type { GemPassService } from '../../payments/gems/gem-pass.service';
import type { SubscriptionService } from '../../payments/subscriptions/subscription.service';
import type { PushService } from '../../push/push.service';
import type { AdminAuditService } from '../admin-audit.service';
import { AdminUserActionsService } from './admin-user-actions.service';

describe('AdminUserActionsService', () => {
  const userId = new Types.ObjectId().toString();
  const adminId = new Types.ObjectId().toString();
  const admin = {
    userId: adminId,
    email: 'admin@example.test',
    role: 'super_admin' as const,
  };
  const requestId = '0b605183-1515-4367-9d3c-738cdf54d799';
  let users: { findOne: jest.Mock; updateOne: jest.Mock; exists: jest.Mock };
  let grants: { findOne: jest.Mock; create: jest.Mock; updateOne: jest.Mock };
  let gemPass: { grantRewardDays: jest.Mock };
  let subscriptions: { syncUser: jest.Mock };
  let push: { send: jest.Mock };
  let audit: { record: jest.Mock };
  let service: AdminUserActionsService;

  beforeEach(() => {
    users = {
      findOne: jest.fn().mockReturnValue({
        select: () => ({ lean: jest.fn().mockResolvedValue({ _id: userId }) }),
      }),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      exists: jest.fn().mockResolvedValue(null),
    };
    grants = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockImplementation((value: Record<string, unknown>) =>
          Promise.resolve({ ...value, _id: new Types.ObjectId() }),
        ),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    };
    gemPass = { grantRewardDays: jest.fn().mockResolvedValue(true) };
    subscriptions = { syncUser: jest.fn().mockResolvedValue(undefined) };
    push = { send: jest.fn().mockResolvedValue(true) };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    service = new AdminUserActionsService(
      users as unknown as Model<UserDocument>,
      grants as unknown as Model<AdminRewardGrantDocument>,
      gemPass as unknown as GemPassService,
      subscriptions as unknown as SubscriptionService,
      push as unknown as PushService,
      audit as unknown as AdminAuditService,
    );
  });

  it('applies gems with a user-level idempotency key and writes history', async () => {
    const result = await service.grant(
      userId,
      { requestId, kind: 'gems', amount: 50, reason: '고객 보상 지급' },
      admin,
    );
    expect(result.applied).toBe(true);
    expect(users.updateOne).toHaveBeenCalledWith(
      expect.objectContaining({ adminRewardKeys: { $ne: requestId } }),
      { $addToSet: { adminRewardKeys: requestId }, $inc: { gems: 50 } },
    );
    expect(grants.updateOne).toHaveBeenCalledTimes(1);
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'user.reward.grant',
        targetId: userId,
      }),
    );
  });

  it('does not apply an already completed request again', async () => {
    grants.findOne.mockResolvedValue({
      requestId,
      userId: new Types.ObjectId(userId),
      kind: 'gems',
      amount: 50,
      reason: '고객 보상 지급',
      adminId: new Types.ObjectId(adminId),
      status: 'applied',
    });
    const result = await service.grant(
      userId,
      { requestId, kind: 'gems', amount: 50, reason: '고객 보상 지급' },
      admin,
    );
    expect(result.duplicate).toBe(true);
    expect(users.updateOne).not.toHaveBeenCalled();
  });

  it('only allows supported SUPER pass periods', async () => {
    await expect(
      service.grant(
        userId,
        { requestId, kind: 'super_days', amount: 3, reason: '고객 보상 지급' },
        admin,
      ),
    ).rejects.toThrow('INVALID_REWARD');
    expect(gemPass.grantRewardDays).not.toHaveBeenCalled();
  });

  it('sends an announcement to the selected user only', async () => {
    await service.push(
      userId,
      {
        requestId,
        title: '안내',
        body: '개별 메시지',
        reason: '문의 답변 안내',
      },
      admin,
    );
    expect(push.send).toHaveBeenCalledWith(
      userId,
      'announcement',
      expect.objectContaining({
        dedupKey: `admin-personal:${requestId}`,
        copy: { title: '안내', body: '개별 메시지' },
      }),
    );
  });
});
