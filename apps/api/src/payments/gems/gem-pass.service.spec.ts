import { Types } from 'mongoose';
jest.mock('../../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../subscriptions/subscription.schema', () => ({
  Subscription: class Subscription {},
}));
jest.mock('../subscriptions/subscription.service', () => ({
  SubscriptionService: class SubscriptionService {},
}));
jest.mock('../../analytics/subscription-events.service', () => ({
  SubscriptionEventsService: class SubscriptionEventsService {},
}));
jest.mock('../../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class GemLedgerService {},
}));

import { GemPassService } from './gem-pass.service';
import { gemPassDayPrice } from './gem-pass.const';

const DAY = 86_400_000;
const chain = (value: unknown) => {
  const node = {
    sort: () => node,
    limit: () => node,
    select: () => node,
    lean: () => Promise.resolve(value),
  };
  return node;
};

describe('GemPassService — 30일 체험 중에도 체험을 덮어쓰지 않는다', () => {
  const userId = new Types.ObjectId().toString();
  let user: Record<string, unknown>;
  let activeSubs: { expiresAt: Date }[];
  let created: { startedAt: Date; expiresAt: Date }[];
  let service: GemPassService;

  beforeEach(() => {
    user = { gems: 50_000 };
    activeSubs = [];
    created = [];
    const subModel = {
      find: jest.fn(() => chain(activeSubs)),
      exists: jest.fn().mockResolvedValue(null),
      create: jest.fn((doc: { startedAt: Date; expiresAt: Date }) => {
        created.push(doc);
        return Promise.resolve(doc);
      }),
    };
    const userModel = {
      findById: jest.fn(() => chain(user)),
      findOneAndUpdate: jest.fn(() => chain({ gems: 40_000 })),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    service = new GemPassService(
      userModel as never,
      subModel as never,
      { syncUser: jest.fn().mockResolvedValue(true) } as never,
      { record: jest.fn().mockResolvedValue(undefined) } as never,
    );
  });

  it('a reward day during the trial starts after the trial ends', async () => {
    const trialEnd = new Date(Date.now() + 20 * DAY);
    user = { superPlan: 'trial', superExpiresAt: trialEnd };
    await service.grantRewardDays(userId, 1, 'checkin7');
    expect(created[0].startedAt.getTime()).toBe(trialEnd.getTime());
    expect(created[0].expiresAt.getTime()).toBe(trialEnd.getTime() + DAY);
  });

  it('a gem pass bought during the trial is added after the trial', async () => {
    const trialEnd = new Date(Date.now() + 10 * DAY);
    user = { gems: 50_000, superPlan: 'trial', superExpiresAt: trialEnd };
    const res = await service.redeem(userId, 'days_7');
    expect(created[0].startedAt.getTime()).toBe(trialEnd.getTime());
    expect(res.premiumUntil.getTime()).toBe(trialEnd.getTime() + 7 * DAY);
  });

  it('without premium it starts now', async () => {
    const before = Date.now();
    await service.grantRewardDays(userId, 1, 'checkin7');
    expect(created[0].startedAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(created[0].startedAt.getTime()).toBeLessThan(before + 1000);
  });

  it('a paid subscription that outlasts the trial wins', async () => {
    const paidEnd = new Date(Date.now() + 40 * DAY);
    user = {
      superPlan: 'trial',
      superExpiresAt: new Date(Date.now() + 5 * DAY),
    };
    activeSubs = [{ expiresAt: paidEnd }];
    await service.grantRewardDays(userId, 1, 'x');
    expect(created[0].startedAt.getTime()).toBe(paidEnd.getTime());
  });

  it('prices one premium day from the shortest pass', () => {
    expect(gemPassDayPrice()).toBe(1667);
  });
});
