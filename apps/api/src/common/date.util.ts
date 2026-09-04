/**
 * 하루·한 주의 경계를 어느 시간대로 자를지 정하는 곳. 여기 하나만 본다.
 *
 * 예전에는 서버 전체를 KST 로 고정해두고(`config/timezone.ts`) 곳곳에서
 * `new Date(); setHours(0,0,0,0)` 을 불렀다. 서버 로컬 자정 = KST 자정이라
 * 타슈켄트(UTC+5) 유저가 저녁 8시 이후에 공부하면 그 기록이 다음 날로 넘어갔다.
 * XP 액수는 맞는데 날짜가 틀리는 문제여서 통계·연속학습일·리그 집계가 전부 밀린다.
 *
 * 이제 경계는 **그 유저의 시간대** 기준이다. 유저 시간대를 모르면 APP_TIMEZONE.
 * 서버 로컬 시간(`setHours`, `getDay`, `getFullYear` …)에 기대는 코드를 새로
 * 쓰지 마라 — 배포 지역이 바뀌면 조용히 어긋난다.
 */

/** 유저 시간대를 모를 때. 주 시장이 우즈베키스탄이다. */
export const APP_TIMEZONE = 'Asia/Tashkent';

/** 리그처럼 모두가 같은 창을 봐야 하는 것의 기준 시간대. */
export const LEAGUE_TIMEZONE = APP_TIMEZONE;

const DAY_MS = 24 * 60 * 60 * 1000;

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(tz: string): Intl.DateTimeFormat {
  let f = formatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    formatters.set(tz, f);
  }
  return f;
}

/**
 * 시간대 문자열을 믿을 수 있는 값으로 바꾼다.
 * 클라가 이상한 값을 보내도 서버가 죽으면 안 되므로 검증하고 기본값으로 떨어뜨린다.
 */
export function resolveTimezone(tz?: string | null): string {
  if (!tz) return APP_TIMEZONE;
  try {
    formatter(tz);
    return tz;
  } catch {
    return APP_TIMEZONE;
  }
}

/** 이 순간을 tz 벽시계로 읽었을 때 UTC 와의 차이(ms) */
function offsetMs(at: Date, tz: string): number {
  const parts = formatter(tz).formatToParts(at);
  const n = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  // hour12:false 인데도 자정을 '24' 로 주는 ICU 가 있다
  const wall = Date.UTC(
    n('year'),
    n('month') - 1,
    n('day'),
    n('hour') % 24,
    n('minute'),
    n('second'),
  );
  return wall - Math.floor(at.getTime() / 1000) * 1000;
}

/** tz 벽시계를 UTC 필드에 담은 Date. 내부 계산용 — 밖으로 내보내지 마라. */
function wallClock(at: Date, tz: string): Date {
  return new Date(at.getTime() + offsetMs(at, tz));
}

/** 벽시계 Date 를 실제 순간으로 되돌린다. 서머타임 경계에서 한 번 더 보정한다. */
function fromWallClock(wall: Date, tz: string, hint: number): Date {
  const guess = new Date(wall.getTime() - hint);
  return new Date(wall.getTime() - offsetMs(guess, tz));
}

/** tz 기준 그날 자정 */
export function startOfDay(at: Date | string | number, tz?: string): Date {
  const zone = resolveTimezone(tz);
  const date = new Date(at);
  const off = offsetMs(date, zone);
  const wall = new Date(date.getTime() + off);
  wall.setUTCHours(0, 0, 0, 0);
  return fromWallClock(wall, zone, off);
}

/**
 * tz 기준 그날 자정에서 days 일 뒤/앞.
 * ms 를 더하지 않고 날짜 필드를 더한다 — 서머타임으로 23/25시간인 날에도 맞다.
 */
export function startOfDayPlus(
  at: Date | string | number,
  days: number,
  tz?: string,
): Date {
  const zone = resolveTimezone(tz);
  const base = startOfDay(at, zone);
  const off = offsetMs(base, zone);
  const wall = new Date(base.getTime() + off);
  wall.setUTCDate(wall.getUTCDate() + days);
  return fromWallClock(wall, zone, off);
}

/** tz 기준 벽시계 시각(0~23). 푸시 슬롯처럼 "그 사람의 지금 몇 시" 가 필요할 때 */
export function hourIn(at: Date | string | number, tz?: string): number {
  return wallClock(new Date(at), resolveTimezone(tz)).getUTCHours();
}

/** tz 기준 요일. 월=1 … 일=7 */
export function weekdayIn(at: Date | string | number, tz?: string): number {
  return wallClock(new Date(at), resolveTimezone(tz)).getUTCDay() || 7;
}

/** tz 기준 그 주 월요일 자정 */
export function startOfWeek(at: Date | string | number, tz?: string): Date {
  const zone = resolveTimezone(tz);
  return startOfDayPlus(at, -(weekdayIn(at, zone) - 1), zone);
}

/** tz 기준 'YYYY-MM-DD'. 날짜 비교·그룹핑 키로 쓴다. */
export function dayKey(at: Date | string | number, tz?: string): string {
  return wallClock(new Date(at), resolveTimezone(tz))
    .toISOString()
    .slice(0, 10);
}

/** 자정끼리의 날짜 차이. startOfDay 로 자른 값들에 쓴다. */
export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

/**
 * @deprecated tz 를 넘기는 `dayKey` 를 써라. 서버 로컬 시간에 기대는 옛 함수다.
 */
export function localKey(dt: Date): string {
  return dayKey(dt, APP_TIMEZONE);
}

/** tz 기준 달력 필드. 라벨·버킷을 만들 때 서버 로컬 getter 대신 이걸 쓴다. */
export interface DateParts {
  year: number;
  /** 1~12 */
  month: number;
  /** 1~31 */
  day: number;
  /** 0=일 … 6=토 (JS Date.getDay 와 같은 배열 인덱스) */
  weekday: number;
}

export function dateParts(at: Date | string | number, tz?: string): DateParts {
  const zone = resolveTimezone(tz);
  const wall = wallClock(new Date(at), zone);
  return {
    year: wall.getUTCFullYear(),
    month: wall.getUTCMonth() + 1,
    day: wall.getUTCDate(),
    weekday: wall.getUTCDay(),
  };
}

/** tz 기준 그달 1일 자정 */
export function startOfMonth(at: Date | string | number, tz?: string): Date {
  const zone = resolveTimezone(tz);
  const { year, month } = dateParts(at, zone);
  // 그달 1일 정오를 기준점으로 잡고 자정으로 내린다 (오프셋 부호에 안 흔들리게)
  return startOfDay(new Date(Date.UTC(year, month - 1, 1, 12)), zone);
}

/** tz 기준으로 months 개월 뒤 1일 자정 */
export function startOfMonthPlus(
  at: Date | string | number,
  months: number,
  tz?: string,
): Date {
  const zone = resolveTimezone(tz);
  const { year, month } = dateParts(at, zone);
  const total = (year * 12 + (month - 1)) + months;
  return startOfDay(
    new Date(Date.UTC(Math.floor(total / 12), total % 12, 1, 12)),
    zone,
  );
}
