export const DAY_MS = 24 * 60 * 60 * 1000;

/** 로컬 자정 기준으로 정규화 (모든 날짜 비교의 단일 기준) */
export function startOfDay(d: Date | string | number): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export interface StreakResult {
  current: number;
  longest: number;
  /** 현재 연속에 포함된 날짜들 (오름차순, 자정 정규화) */
  days: Date[];
}

/**
 * 학습한 날짜 목록 → 연속 학습일 계산
 * 규칙: 마지막 학습일이 오늘/어제면 유지. 이틀 이상 비면 현재 연속 0.
 */
export function calcStreak(
  dates: (Date | string | number)[],
  today: Date = new Date(),
): StreakResult {
  if (!dates?.length) return { current: 0, longest: 0, days: [] };

  const uniq = Array.from(
    new Set(dates.map((d) => startOfDay(d).getTime())),
  ).sort((a, b) => a - b);

  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniq.length; i++) {
    run = Math.round((uniq[i] - uniq[i - 1]) / DAY_MS) === 1 ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  const t0 = startOfDay(today).getTime();
  const last = uniq[uniq.length - 1];
  if (Math.round((t0 - last) / DAY_MS) > 1)
    return { current: 0, longest, days: [] };

  const days: number[] = [last];
  for (let i = uniq.length - 2; i >= 0; i--) {
    if (Math.round((uniq[i + 1] - uniq[i]) / DAY_MS) !== 1) break;
    days.push(uniq[i]);
  }
  days.reverse();

  return { current: days.length, longest, days: days.map((n) => new Date(n)) };
}
