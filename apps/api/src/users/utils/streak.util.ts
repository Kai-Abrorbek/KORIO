import { startOfDay } from '../../common/date.util';

export const DAY_MS = 24 * 60 * 60 * 1000;

export interface StreakResult {
  current: number;
  longest: number;
  /** 현재 연속에 포함된 날짜들 (오름차순, 자정 정규화) */
  days: Date[];
}

/**
 * 하루까지는 빠져도 연속으로 본다. **이틀 연속** 빠지면 그때 끊긴다.
 *
 * 즉 날짜 간격이 2일까지는 이어진 것으로 친다 (사이에 안 한 날이 하루).
 * 3일이면 이틀을 통째로 건너뛴 것이라 끊는다.
 */
export const MAX_GAP_DAYS = 2;

/**
 * 학습한 날짜 목록 → 연속 학습일 계산
 *
 * 규칙: 하루 빠지는 건 봐준다. 이틀 연속 안 하면 초기화.
 * 그래서 마지막 학습일이 오늘·어제·그저께면 유지되고, 그보다 오래되면 0 이다.
 * current 는 **실제로 학습한 날 수**다 (빠진 날은 안 센다).
 *
 * tz 는 "오늘"을 어디 기준으로 자를지다. 안 넘기면 APP_TIMEZONE 이지만,
 * 유저 기록을 다룰 때는 반드시 그 유저의 시간대를 넘겨라 — 서울 기준으로
 * 자르면 타슈켄트 유저의 밤 학습이 다음 날로 넘어가 연속이 끊긴 것처럼 보인다.
 */
export function calcStreak(
  dates: (Date | string | number)[],
  today: Date = new Date(),
  tz?: string,
): StreakResult {
  if (!dates?.length) return { current: 0, longest: 0, days: [] };

  const uniq = Array.from(
    new Set(dates.map((d) => startOfDay(d, tz).getTime())),
  ).sort((a, b) => a - b);

  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniq.length; i++) {
    const gap = Math.round((uniq[i] - uniq[i - 1]) / DAY_MS);
    run = gap <= MAX_GAP_DAYS ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  const t0 = startOfDay(today, tz).getTime();
  const last = uniq[uniq.length - 1];
  // 마지막 학습일과 오늘 사이가 이틀을 넘으면(= 이틀 연속 안 함) 끊긴다
  if (Math.round((t0 - last) / DAY_MS) > MAX_GAP_DAYS)
    return { current: 0, longest, days: [] };

  const days: number[] = [last];
  for (let i = uniq.length - 2; i >= 0; i--) {
    if (Math.round((uniq[i + 1] - uniq[i]) / DAY_MS) > MAX_GAP_DAYS) break;
    days.push(uniq[i]);
  }
  days.reverse();

  return { current: days.length, longest, days: days.map((n) => new Date(n)) };
}

/**
 * 연속 학습 화면에 그릴 **7일 창**.
 *
 * 오늘부터 앞으로 7일이 아니다. 그러면 내일 열었을 때 어제가 사라져서
 * "내가 며칠째인지" 를 볼 수가 없다. 창은 **연속이 시작된 날**에 고정하고,
 * 7일이 다 차면 다음 7일로 넘어간다.
 *
 *   연속 시작 9/1 → 9/1~9/7 이 첫 주. 9/8 에 학습하면 9/8~9/14 로 넘어간다.
 *
 * studied 는 그 날 실제로 학습했는지다. 하루 빠진 날은 창 안에 그대로
 * 남되 체크가 안 켜진다 — 빠진 자리가 보여야 다음 날 오게 된다.
 */
export interface StreakWeekDay {
  /** 자정 정규화된 날짜 */
  date: Date;
  /** 그 날 학습했나 */
  studied: boolean;
  /** 오늘인가 */
  isToday: boolean;
  /** 아직 오지 않은 날인가 */
  future: boolean;
}

export function streakWeek(
  streakDays: Date[],
  today: Date = new Date(),
  tz?: string,
): StreakWeekDay[] {
  const t0 = startOfDay(today, tz).getTime();
  const studied = new Set(streakDays.map((d) => startOfDay(d, tz).getTime()));

  // 연속이 없으면 오늘부터 시작하는 창을 보여준다 (첫날이 곧 시작일)
  const start = streakDays.length
    ? startOfDay(streakDays[0], tz).getTime()
    : t0;

  // 시작일로부터 몇 번째 7일 구간인가
  const elapsed = Math.max(0, Math.round((t0 - start) / DAY_MS));
  const windowStart = start + Math.floor(elapsed / 7) * 7 * DAY_MS;

  return Array.from({ length: 7 }, (_, i) => {
    const ms = windowStart + i * DAY_MS;
    return {
      date: new Date(ms),
      studied: studied.has(ms),
      isToday: ms === t0,
      future: ms > t0,
    };
  });
}
