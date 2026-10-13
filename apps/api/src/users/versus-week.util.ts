import {
  LEAGUE_TIMEZONE,
  dayKey,
  startOfDayPlus,
  startOfWeek,
} from '../common/date.util';

/**
 * 친구 프로필 "이번 주 대결" 계산 — 친구와 나의 날짜별 XP 를 같은 날짜 칸에 나란히.
 *
 * 주는 리그와 같다: 월~일, 리그 시간대(타슈켄트). 그래서 합계가 리그 순위표의
 * 주간 XP 와 맞는다.
 *
 * 각자의 UserStats 한 줄은 "그 사람 시간대의 하루" 로 쌓였다(date = 그 사람의 자정).
 * 그래서 시각으로 자르지 않고 그 사람 시간대의 날짜 이름(YYYY-MM-DD)으로 맞춘다.
 * 예전엔 두 사람의 "최근 7일" 을 따로 받아 순서(index)로 겹쳐서, 시간대가 다르면
 * 하루씩 어긋났고 요일 이름도 한국어로 박혀 있었다.
 */
export interface XpRow {
  date: Date | string;
  xpEarned?: number | null;
}

export interface VersusSide {
  tz: string;
  rows: XpRow[];
}

export interface VersusDay {
  /** YYYY-MM-DD (리그 시간대 달력) */
  date: string;
  /** 0=일 … 6=토 */
  weekday: number;
  them: number;
  me: number;
}

export interface VersusWeek {
  /** 오늘 날짜 이름 — 이 칸에 표시, 뒤 칸은 아직 안 온 날 */
  today: string;
  /** 월 → 일 */
  days: VersusDay[];
  /** 이번 주 합계 */
  them: number;
  me: number;
  /** 지난주 합계 (끝난 대결) */
  lastWeek: { them: number; me: number };
}

/** UserStats 를 가져올 범위 — 지난주 월요일 ~ 이번 주 일요일, 시간대 차이만큼 하루씩 여유 */
export function versusFetchRange(now = new Date()) {
  const monday = startOfWeek(now, LEAGUE_TIMEZONE);
  return {
    from: startOfDayPlus(monday, -8, LEAGUE_TIMEZONE),
    to: startOfDayPlus(monday, 8, LEAGUE_TIMEZONE),
  };
}

/** 그 사람 시간대의 날짜 이름별 XP */
export function xpByDayKey(rows: XpRow[], tz: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of rows) {
    const key = dayKey(new Date(row.date), tz);
    map.set(key, (map.get(key) ?? 0) + (Number(row.xpEarned) || 0));
  }
  return map;
}

/** monday 부터 7일의 날짜 이름 */
function weekKeys(monday: Date): string[] {
  return Array.from({ length: 7 }, (_, i) =>
    dayKey(startOfDayPlus(monday, i, LEAGUE_TIMEZONE), LEAGUE_TIMEZONE),
  );
}

const weekdayOf = (key: string) => new Date(`${key}T12:00:00Z`).getUTCDay();
const sum = (map: Map<string, number>, keys: string[]) =>
  keys.reduce((total, key) => total + (map.get(key) ?? 0), 0);

export function buildVersusWeek(
  them: VersusSide,
  me: VersusSide,
  now = new Date(),
): VersusWeek {
  const monday = startOfWeek(now, LEAGUE_TIMEZONE);
  const keys = weekKeys(monday);
  const lastKeys = weekKeys(startOfDayPlus(monday, -7, LEAGUE_TIMEZONE));
  const themXp = xpByDayKey(them.rows, them.tz);
  const meXp = xpByDayKey(me.rows, me.tz);
  return {
    today: dayKey(now, LEAGUE_TIMEZONE),
    days: keys.map((date) => ({
      date,
      weekday: weekdayOf(date),
      them: themXp.get(date) ?? 0,
      me: meXp.get(date) ?? 0,
    })),
    them: sum(themXp, keys),
    me: sum(meXp, keys),
    lastWeek: { them: sum(themXp, lastKeys), me: sum(meXp, lastKeys) },
  };
}
