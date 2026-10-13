import { buildVersusWeek, versusFetchRange } from './versus-week.util';

/** 타슈켄트 자정 (UTC+5) = 전날 19:00Z */
const tashkentMidnight = (day: string) =>
  new Date(new Date(`${day}T00:00:00+05:00`).getTime());
/** 서울 자정 (UTC+9) */
const seoulMidnight = (day: string) => new Date(`${day}T00:00:00+09:00`);

describe('buildVersusWeek', () => {
  // 2026-10-14 수요일 15:00 타슈켄트
  const now = new Date('2026-10-14T10:00:00Z');

  it('uses the league week (Mon → Sun) and marks today', () => {
    const week = buildVersusWeek(
      { tz: 'Asia/Tashkent', rows: [] },
      { tz: 'Asia/Tashkent', rows: [] },
      now,
    );
    expect(week.days.map((d) => d.date)).toEqual([
      '2026-10-12',
      '2026-10-13',
      '2026-10-14',
      '2026-10-15',
      '2026-10-16',
      '2026-10-17',
      '2026-10-18',
    ]);
    expect(week.days.map((d) => d.weekday)).toEqual([1, 2, 3, 4, 5, 6, 0]);
    expect(week.today).toBe('2026-10-14');
  });

  it('lines both people up by calendar date even in different time zones', () => {
    const week = buildVersusWeek(
      {
        tz: 'Asia/Tashkent',
        rows: [
          { date: tashkentMidnight('2026-10-12'), xpEarned: 120 },
          { date: tashkentMidnight('2026-10-14'), xpEarned: 300 },
        ],
      },
      {
        // 서울 자정은 타슈켄트로는 전날 저녁 — 시각으로 자르면 하루 밀린다
        tz: 'Asia/Seoul',
        rows: [
          { date: seoulMidnight('2026-10-12'), xpEarned: 50 },
          { date: seoulMidnight('2026-10-13'), xpEarned: 80 },
        ],
      },
      now,
    );
    expect(week.days.slice(0, 3)).toEqual([
      { date: '2026-10-12', weekday: 1, them: 120, me: 50 },
      { date: '2026-10-13', weekday: 2, them: 0, me: 80 },
      { date: '2026-10-14', weekday: 3, them: 300, me: 0 },
    ]);
    expect(week.them).toBe(420);
    expect(week.me).toBe(130);
  });

  it('keeps last week apart from this week', () => {
    const week = buildVersusWeek(
      {
        tz: 'Asia/Tashkent',
        rows: [
          { date: tashkentMidnight('2026-10-11'), xpEarned: 900 }, // 지난주 일요일
          { date: tashkentMidnight('2026-10-05'), xpEarned: 100 }, // 지난주 월요일
          { date: tashkentMidnight('2026-10-04'), xpEarned: 999 }, // 지지난주
        ],
      },
      { tz: 'Asia/Tashkent', rows: [] },
      now,
    );
    expect(week.them).toBe(0);
    expect(week.lastWeek).toEqual({ them: 1000, me: 0 });
  });

  it('fetches a range wide enough for both weeks', () => {
    const { from, to } = versusFetchRange(now);
    expect(from.getTime()).toBeLessThan(
      tashkentMidnight('2026-10-05').getTime(),
    );
    expect(to.getTime()).toBeGreaterThan(
      tashkentMidnight('2026-10-18').getTime(),
    );
  });
});
