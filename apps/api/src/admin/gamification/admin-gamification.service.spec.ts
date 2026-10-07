import { AdminGamificationService } from './admin-gamification.service';
import { DAILY_XP_CAP, XP_AWARD_DIVISOR } from '../../lessons/economy.const';
import { MONTHLY_CHALLENGE } from '../../retention/retention.config';

jest.mock('../../users/schemas/user.schema', () => ({
  User: class User {},
  UserLeague: Object.fromEntries(
    [
      'BRONZE',
      'SILVER',
      'GOLD',
      'SAPPHIRE',
      'RUBY',
      'EMERALD',
      'AMETHYST',
      'PEARL',
      'OBSIDIAN',
      'DIAMOND',
    ].map((tier) => [tier, tier.toLowerCase()]),
  ),
}));
jest.mock('../../users/schemas/user-stats.schema', () => ({
  UserStats: class UserStats {},
}));
jest.mock('../../league/schemas/league-room.schema', () => ({
  LeagueRoom: class LeagueRoom {},
}));
jest.mock('../../lessons/schemas/question.schema', () => ({
  QuestionType: new Proxy({}, { get: (_target, key) => String(key) }),
}));

const aggregate = (value: unknown) => ({
  exec: jest.fn().mockResolvedValue(value),
});

describe('AdminGamificationService', () => {
  it('reads live server constants without hard-coding values in the admin response', () => {
    const service = new AdminGamificationService(
      {} as never,
      {} as never,
      {} as never,
    );
    const settings = service.settings();
    expect(settings.readOnly).toBe(true);
    expect(settings.groups[0]?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'DAILY_XP_CAP', value: DAILY_XP_CAP }),
        expect.objectContaining({
          key: 'XP_AWARD_DIVISOR',
          value: XP_AWARD_DIVISOR,
        }),
      ]),
    );
    expect(settings.groups[2]?.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'MONTHLY_CHALLENGE.TARGET',
          value: MONTHLY_CHALLENGE.TARGET,
        }),
      ]),
    );
  });

  it('keeps period XP separate from all-time profile XP and fills inactive dates with zero', async () => {
    const stats = {
      aggregate: jest
        .fn()
        .mockReturnValueOnce(
          aggregate([{ _id: '2026-10-07', value: 90, learners: 2 }]),
        )
        .mockReturnValueOnce(aggregate([{ n: 2 }]))
        .mockReturnValueOnce(aggregate([])),
    };
    const users = {
      collection: { name: 'users' },
      aggregate: jest
        .fn()
        .mockReturnValueOnce(
          aggregate([
            {
              summary: [
                { users: 4, lifetimeXp: 5000, streakSum: 10, streakUsers: 2 },
              ],
              xp: [
                { _id: 0, count: 1 },
                { _id: '10000+', count: 1 },
              ],
              streak: [{ _id: 0, count: 2 }],
              leagues: [{ _id: 'bronze', count: 4 }],
            },
          ]),
        )
        .mockReturnValueOnce(
          aggregate([{ participants: 2, claims: 4, completed: 0 }]),
        ),
    };
    const rooms = {
      aggregate: jest
        .fn()
        .mockReturnValue(aggregate([{ rooms: 1, participants: 3 }])),
    };
    const service = new AdminGamificationService(
      users as never,
      stats as never,
      rooms as never,
    );
    const result = await service.overview('2026-10-06', '2026-10-07');
    expect(result.xp.earned).toBe(90);
    expect(result.xp.lifetimeOnProfiles).toBe(5000);
    expect(result.xp.distribution.at(-1)?.count).toBe(1);
    expect(result.xp.series).toEqual([
      { date: '2026-10-06', value: 0, learners: 0 },
      { date: '2026-10-07', value: 90, learners: 2 },
    ]);
    expect(result.league.participants).toBe(3);
    expect(result.quests.claims).toBe(4);
    const calls = stats.aggregate.mock.calls as unknown as Array<[unknown]>;
    const pipeline = JSON.stringify(calls[0]?.[0]);
    expect(pipeline).toContain('"timezone":"$_adminTimezone"');
    expect(pipeline).toContain('"_user.isBot"');
  });
});
