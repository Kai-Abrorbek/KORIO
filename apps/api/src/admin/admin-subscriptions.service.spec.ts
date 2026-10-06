import { BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AdminSubscriptionsService } from './admin-subscriptions.service';
import type { SubscriptionDocument } from '../payments/subscriptions/subscription.schema';
import type { UserDocument } from '../users/schemas/user.schema';

jest.mock('../payments/subscriptions/subscription.schema', () => ({
  Subscription: class Subscription {},
}));
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));

describe('AdminSubscriptionsService', () => {
  const userId = new Types.ObjectId();
  const row = {
    _id: new Types.ObjectId(),
    userId,
    provider: 'google_play',
    platform: 'android',
    country: 'KR',
    tier: 'super',
    plan: 'monthly',
    productId: 'product',
    status: 'active',
    startedAt: new Date('2026-10-01'),
    expiresAt: new Date('2099-10-01'),
    autoRenew: true,
    priceMicros: null,
    currency: '',
    externalTransactionId: 'must-not-leak',
  };
  const query = {
    select: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([row]),
  };
  const find = jest.fn().mockReturnValue(query);
  const subscriptions = {
    find,
    countDocuments: jest.fn().mockResolvedValue(1),
  } as unknown as Model<SubscriptionDocument>;
  const userQuery = {
    select: jest.fn().mockReturnThis(),
    lean: jest
      .fn()
      .mockResolvedValue([{ _id: userId, email: 'learner@example.com' }]),
  };
  const users = {
    find: jest.fn().mockReturnValue(userQuery),
  } as unknown as Model<UserDocument>;
  const service = new AdminSubscriptionsService(subscriptions, users);

  beforeEach(() => jest.clearAllMocks());

  it('returns subscription data without provider transaction secrets', async () => {
    const response = await service.list({ page: '1' });
    expect(response.items[0]).toMatchObject({
      email: 'learner@example.com',
      entitledNow: true,
      priceMicros: null,
    });
    expect(response.items[0]).not.toHaveProperty('externalTransactionId');
    expect(query.select).toHaveBeenCalled();
  });

  it('rejects unsupported filters', async () => {
    await expect(service.list({ status: 'unknown' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(find).not.toHaveBeenCalled();
  });
});
