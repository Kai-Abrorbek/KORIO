import { AdminAnalyticsService } from './admin-analytics.service';
import { dayKey as learnerDayKey } from '../../common/date.util';

jest.mock('../../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../../users/schemas/user-stats.schema', () => ({
  UserStats: class UserStats {},
}));
jest.mock('../../users/schemas/user-progress.schema', () => ({
  UserProgress: class UserProgress {},
}));
jest.mock('../../payments/subscriptions/subscription.schema', () => ({
  Subscription: class Subscription {},
}));
jest.mock('../../analytics/schemas/subscription-event.schema', () => ({
  SubscriptionEvent: class SubscriptionEvent {},
}));
jest.mock('../../analytics/schemas/lesson-attempt.schema', () => ({
  LessonAttempt: class LessonAttempt {},
}));

describe('AdminAnalyticsService local-day activity', () => {
  it('recognizes a Seoul-local October 7 study date stored on October 6 UTC', () => {
    expect(
      learnerDayKey(new Date('2026-10-06T15:00:00.000Z'), 'Asia/Seoul'),
    ).toBe('2026-10-07');
  });

  it('groups DAU and rolling users by each learner’s local date', async () => {
    const pipelines: Record<string, unknown>[][] = [];
    const statsModel = {
      aggregate: jest.fn((pipeline: Record<string, unknown>[]) => {
        pipelines.push(pipeline);
        const rows =
          pipelines.length === 1
            ? [{ _id: '2026-10-07', value: 1 }]
            : [{ _id: { d: '2026-10-07', u: 'learner-1' } }];
        return { exec: jest.fn().mockResolvedValue(rows) };
      }),
    };
    const userModel = { collection: { name: 'users' } };
    const service = new AdminAnalyticsService(
      userModel as never,
      statsModel as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );

    const result = await service.activeUsers('2026-10-07', '2026-10-07');

    expect(result.series).toEqual([
      { date: '2026-10-07', dau: 1, wau: 1, mau: 1 },
    ]);
    for (const pipeline of pipelines) {
      const stages = JSON.stringify(pipeline);
      expect(stages).toContain('"from":"users"');
      expect(stages).toContain('"timezone":"$_adminTimezone"');
      expect(stages).toContain('"d":"$_adminLocalDay","u":"$userId"');
    }
    const firstMatch = pipelines[0][0].$match as { date: { $gte: Date } };
    expect(firstMatch.date.$gte.toISOString()).toBe('2026-10-06T00:00:00.000Z');
  });
});
