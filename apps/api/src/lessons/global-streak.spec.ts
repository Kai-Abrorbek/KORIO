import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { LessonsService } from './lessons.service';
import { STREAK_CHEST_GEMS } from './economy.const';

// Exercise the real services without initializing circular Mongo decorators.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<typeof import('@nestjs/mongoose')>('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

function query<T>(value: T) {
  return {
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(value),
  };
}

const tz = 'Asia/Tashkent';
const userId = new Types.ObjectId().toString();
const localDay = (date: string) => new Date(`${date}T00:00:00+05:00`);

describe('shared streak service contracts', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T18:59:00Z'));
  });

  afterEach(() => jest.useRealTimers());

  it('reads all qualifying account dates regardless of the selected language', async () => {
    const user = {
      timezone: tz,
      targetLanguage: 'en',
      streakFreeze: 0,
      streakFrozenDays: [],
      isSuper: false,
    };
    const users = {
      findById: jest.fn(() => query(user)),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const stats = {
      find: jest.fn(() =>
        query([
          { date: localDay('2026-10-19') },
          { date: localDay('2026-10-20') },
        ]),
      ),
    };
    const service = new UsersService(
      users as never,
      stats as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );

    const english = await service.syncStreak(userId);
    user.targetLanguage = 'ko';
    const korean = await service.syncStreak(userId);

    expect(english.current).toBe(2);
    expect(korean).toEqual(english);
    expect(stats.find).toHaveBeenCalledTimes(2);
    for (const call of stats.find.mock.calls) {
      expect(call).toEqual([
        {
          userId: new Types.ObjectId(userId),
          $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
        },
      ]);
    }
    expect(users.updateOne).toHaveBeenLastCalledWith(
      { _id: new Types.ObjectId(userId) },
      { $set: { streak: 2, longestStreak: 2 } },
    );
  });

  function celebrationFixture(studied = true) {
    const user = { gems: 55, targetLanguage: 'ko' };
    let celebratedOn: string | undefined;
    const chestClaims = new Set<string>();
    const users = {
      findById: jest.fn(() => query(user)),
      findOneAndUpdate: jest.fn(
        (filter: { streakCelebratedOn: { $ne: string } }) => {
          const day = filter.streakCelebratedOn.$ne;
          const claimed = celebratedOn !== day;
          if (claimed) celebratedOn = day;
          return query(claimed ? { _id: new Types.ObjectId(userId) } : null);
        },
      ),
    };
    const stats = {
      findOne: jest.fn(() =>
        query(studied ? { totalQuestions: 1, xpEarned: 0 } : null),
      ),
    };
    const chests = {
      grantFixedAndClaim: jest.fn((_id: string, key: string) => {
        if (chestClaims.has(key)) return Promise.resolve(null);
        chestClaims.add(key);
        return Promise.resolve({ grade: 'gold', gems: STREAK_CHEST_GEMS });
      }),
    };
    const service = new LessonsService(
      {} as never,
      {} as never,
      chests as never,
      {} as never,
      {} as never,
      stats as never,
      {} as never,
      {} as never,
      users as never,
      {} as never,
      { getTimezone: jest.fn().mockResolvedValue(tz) } as never,
      {} as never,
      {} as never,
      {} as never,
    );
    const knownStreak = {
      current: 3,
      longest: 3,
      days: [
        localDay('2026-10-18'),
        localDay('2026-10-19'),
        localDay('2026-10-20'),
      ],
    };
    return { service, user, users, stats, chests, knownStreak };
  }

  it('uses the same daily celebration and chest claim after switching language or client', async () => {
    const { service, user, users, stats, chests, knownStreak } =
      celebrationFixture();

    const koreanInApp = await service.celebrateStudyDay(userId, knownStreak);
    user.targetLanguage = 'en';
    const englishInTelegram = await service.celebrateStudyDay(
      userId,
      knownStreak,
    );

    expect(koreanInApp.dailyStreak?.streak).toBe(3);
    expect(koreanInApp.streakChest?.gems).toBe(STREAK_CHEST_GEMS);
    expect(englishInTelegram).toEqual({
      dailyStreak: null,
      streakChest: null,
      gems: 55,
    });
    expect(users.findOneAndUpdate).toHaveBeenCalledTimes(2);
    expect(users.findOneAndUpdate.mock.calls[0]).toEqual([
      {
        _id: new Types.ObjectId(userId),
        streakCelebratedOn: { $ne: '2026-10-20' },
      },
      { $set: { streakCelebratedOn: '2026-10-20' } },
    ]);
    expect(users.findOneAndUpdate.mock.calls[1]).toEqual(
      users.findOneAndUpdate.mock.calls[0],
    );
    expect(chests.grantFixedAndClaim).toHaveBeenNthCalledWith(
      1,
      userId,
      'streak:2026-10-20',
      { grade: 'gold', gems: STREAK_CHEST_GEMS },
    );
    expect(chests.grantFixedAndClaim.mock.calls[1]).toEqual(
      chests.grantFixedAndClaim.mock.calls[0],
    );
    expect(stats.findOne).toHaveBeenCalledWith({
      userId: new Types.ObjectId(userId),
      date: localDay('2026-10-20'),
    });
  });

  it('permits a new shared celebration only after the user local midnight', async () => {
    const { service, knownStreak } = celebrationFixture();
    await service.celebrateStudyDay(userId, knownStreak);
    jest.setSystemTime(new Date('2026-10-20T19:00:00Z'));

    const nextDay = await service.celebrateStudyDay(userId, {
      current: 4,
      longest: 4,
      days: [...knownStreak.days, localDay('2026-10-21')],
    });

    expect(nextDay.dailyStreak?.streak).toBe(4);
    expect(nextDay.streakChest).toBeNull();
  });

  it('does not award a previous streak when no activity exists today', async () => {
    const { service, users, chests, knownStreak } = celebrationFixture(false);

    expect(await service.celebrateStudyDay(userId, knownStreak)).toEqual({
      dailyStreak: null,
      streakChest: null,
      gems: 55,
    });
    expect(users.findOneAndUpdate).not.toHaveBeenCalled();
    expect(chests.grantFixedAndClaim).not.toHaveBeenCalled();
  });
});
