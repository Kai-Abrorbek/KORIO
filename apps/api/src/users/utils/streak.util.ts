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
  /**
   * 복구펜으로 메운 날. **이어짐 판정에만** 쓰고 학습일 수(current)에는 안 센다.
   * 복구펜은 연속을 지켜줄 뿐 하루를 공부한 걸로 쳐주지는 않는다.
   */
  frozen: (Date | string | number)[] = [],
): StreakResult {
  if (!dates?.length) return { current: 0, longest: 0, days: [] };

  const studied = new Set(dates.map((d) => startOfDay(d, tz).getTime()));
  const all = Array.from(
    new Set([...studied, ...frozen.map((d) => startOfDay(d, tz).getTime())]),
  ).sort((a, b) => a - b);

  // 가장 긴 연속 — 이어짐은 공부한 날 + 메운 날로, 길이는 공부한 날만 센다
  let longest = 0;
  let run = 0;
  for (let i = 0; i < all.length; i++) {
    if (i > 0 && Math.round((all[i] - all[i - 1]) / DAY_MS) > MAX_GAP_DAYS) {
      run = 0;
    }
    if (studied.has(all[i])) run += 1;
    if (run > longest) longest = run;
  }

  const t0 = startOfDay(today, tz).getTime();
  const last = all[all.length - 1];
  // 마지막 학습일(또는 메운 날)과 오늘 사이가 이틀을 넘으면(= 이틀 연속 안 함) 끊긴다
  if (Math.round((t0 - last) / DAY_MS) > MAX_GAP_DAYS)
    return { current: 0, longest, days: [] };

  const days: number[] = [];
  for (let i = all.length - 1; i >= 0; i--) {
    if (
      i < all.length - 1 &&
      Math.round((all[i + 1] - all[i]) / DAY_MS) > MAX_GAP_DAYS
    ) {
      break;
    }
    if (studied.has(all[i])) days.push(all[i]);
  }
  days.reverse();

  return { current: days.length, longest, days: days.map((n) => new Date(n)) };
}

/**
 * 복구펜을 몇 장, 어느 날에 쓸지 정한다 (순수 함수).
 *
 * 연속은 하루 빠지는 건 원래 봐준다(MAX_GAP_DAYS). 그 이상 빠져서 **오늘 기준으로
 * 끊길 상황**일 때만 쓴다 — 마지막 학습일(또는 이미 메운 날) 바로 다음 날부터
 * 끊기지 않을 만큼만 메운다.
 *
 * 가진 복구펜으로 다 못 메우면 **한 장도 쓰지 않는다.** 어차피 끊기는데 쓰면
 * 복구펜만 날린다.
 */
export function planStreakFreeze(input: {
  studied: (Date | string | number)[];
  frozen: (Date | string | number)[];
  today: Date;
  tz?: string;
  available: number;
}): Date[] {
  const { studied, frozen, today, tz, available } = input;
  if (available <= 0 || !studied.length) return [];

  const all = Array.from(
    new Set([...studied, ...frozen].map((d) => startOfDay(d, tz).getTime())),
  ).sort((a, b) => a - b);
  const last = all[all.length - 1];
  const t0 = startOfDay(today, tz).getTime();
  const gap = Math.round((t0 - last) / DAY_MS);
  if (gap <= MAX_GAP_DAYS) return [];

  const needed = gap - MAX_GAP_DAYS;
  if (needed > available) return [];

  return Array.from({ length: needed }, (_, i) =>
    startOfDay(last + (i + 1) * DAY_MS + DAY_MS / 2, tz),
  );
}

/**
 * 연속 학습 목표 판정 (순수 함수).
 *
 * 목표를 고른 날(startDay) 전날을 "있었던 날" 로 두고, 그 뒤로 연속 규칙
 * (하루까지는 빠져도 됨)이 끊기지 않은 채 공부한 날이 targetDays 가 되면 달성.
 * 중간에 끊기면 실패. 복구펜으로 메운 날은 이어짐에는 쓰고 일수에는 안 센다.
 *
 * 고른 날 아직 공부를 안 했어도 바로 실패가 아니다 — 그날이나 다음 날 하면 된다.
 */
export type StreakGoalStatus = 'active' | 'completed' | 'failed';

export function evaluateStreakGoal(input: {
  startDay: Date | string | number;
  targetDays: number;
  studied: (Date | string | number)[];
  frozen: (Date | string | number)[];
  today: Date;
  tz?: string;
}): { status: StreakGoalStatus; progress: number } {
  const { targetDays, today, tz } = input;
  const s0 = startOfDay(input.startDay, tz).getTime();
  const studied = new Set(
    input.studied.map((d) => startOfDay(d, tz).getTime()),
  );
  const present = Array.from(
    new Set([
      ...studied,
      ...input.frozen.map((d) => startOfDay(d, tz).getTime()),
    ]),
  )
    .filter((t) => t >= s0)
    .sort((a, b) => a - b);

  let prev = s0 - DAY_MS;
  let progress = 0;
  for (const t of present) {
    if (Math.round((t - prev) / DAY_MS) > MAX_GAP_DAYS) {
      return { status: 'failed', progress };
    }
    if (studied.has(t)) progress += 1;
    if (progress >= targetDays) return { status: 'completed', progress };
    prev = t;
  }

  const t0 = startOfDay(today, tz).getTime();
  if (Math.round((t0 - prev) / DAY_MS) > MAX_GAP_DAYS) {
    return { status: 'failed', progress };
  }
  return { status: 'active', progress };
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
