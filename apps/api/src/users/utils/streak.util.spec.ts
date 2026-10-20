import { startOfDay } from '../../common/date.util';
import {
  calcStreak,
  evaluateStreakGoal,
  planStreakFreeze,
} from './streak.util';

const tz = 'Asia/Tashkent';
const localDay = (date: string) => new Date(`${date}T00:00:00+05:00`);

describe('account-wide study streak', () => {
  it('continues when the learner changes from Korean to English', () => {
    const sessions = [
      { targetLanguage: 'ko', at: '2026-10-19T12:00:00Z' },
      { targetLanguage: 'en', at: '2026-10-20T12:00:00Z' },
    ];

    expect(
      calcStreak(
        sessions.map((session) => session.at),
        new Date('2026-10-20T13:00:00Z'),
        tz,
      ),
    ).toEqual({
      current: 2,
      longest: 2,
      days: [localDay('2026-10-19'), localDay('2026-10-20')],
    });
  });

  it('counts two languages and two clients on the same local date only once', () => {
    const result = calcStreak(
      ['2026-10-19T20:00:00Z', '2026-10-20T04:00:00Z', '2026-10-20T18:59:59Z'],
      new Date('2026-10-20T18:59:59Z'),
      tz,
    );

    expect(result).toEqual({
      current: 1,
      longest: 1,
      days: [localDay('2026-10-20')],
    });
  });

  it('uses the user midnight, not UTC midnight, to advance the day', () => {
    const before = '2026-10-20T18:59:59Z';
    const after = '2026-10-20T19:00:00Z';

    expect(calcStreak([before, after], new Date(after), tz)).toEqual({
      current: 2,
      longest: 2,
      days: [localDay('2026-10-20'), localDay('2026-10-21')],
    });
    expect(calcStreak([before, after], new Date(after), 'UTC').current).toBe(1);
  });

  it('allows the existing one-day gap but breaks after two missed days', () => {
    const studied = [localDay('2026-10-18'), localDay('2026-10-20')];

    expect(calcStreak(studied, localDay('2026-10-22'), tz).current).toBe(2);
    expect(calcStreak(studied, localDay('2026-10-23'), tz)).toEqual({
      current: 0,
      longest: 2,
      days: [],
    });
  });

  it('uses freeze days only to connect study days, not to add study credit', () => {
    const studied = [localDay('2026-10-17'), localDay('2026-10-20')];
    const frozen = [localDay('2026-10-18')];

    expect(calcStreak(studied, localDay('2026-10-20'), tz, frozen)).toEqual({
      current: 2,
      longest: 2,
      days: studied,
    });
    expect(calcStreak(studied, localDay('2026-10-20'), tz).current).toBe(1);
  });

  it('does not use a freeze when any language was studied today', () => {
    expect(
      planStreakFreeze({
        studied: [localDay('2026-10-19'), localDay('2026-10-20')],
        frozen: [],
        today: new Date('2026-10-20T13:00:00Z'),
        tz,
        available: 1,
      }),
    ).toEqual([]);
  });

  it('shares goal progress across languages and excludes freeze credit', () => {
    const today = new Date('2026-10-20T13:00:00Z');
    const studied = [localDay('2026-10-17'), localDay('2026-10-20')];
    const frozen = [localDay('2026-10-18')];

    expect(
      evaluateStreakGoal({
        startDay: localDay('2026-10-17'),
        targetDays: 3,
        studied,
        frozen,
        today,
        tz,
      }),
    ).toEqual({ status: 'active', progress: 2 });
    expect(
      evaluateStreakGoal({
        startDay: localDay('2026-10-17'),
        targetDays: 3,
        studied: [...studied, startOfDay('2026-10-19T12:00:00Z', tz)],
        frozen,
        today,
        tz,
      }),
    ).toEqual({ status: 'completed', progress: 3 });
  });
});
