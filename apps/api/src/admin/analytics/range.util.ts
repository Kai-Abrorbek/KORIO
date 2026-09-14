/**
 * 어드민의 기간 필터.
 *
 * 모든 분석 화면이 같은 기간을 쓰고, 항상 **직전 같은 길이의 기간**과 비교한다.
 * 숫자 하나만 보면 그게 좋은 건지 나쁜 건지 알 수 없다 — "어제 대비", "지난주
 * 대비" 가 붙어야 비로소 읽힌다.
 */
export interface DateRange {
  from: Date;
  to: Date;
  /** 직전 같은 길이 구간 */
  prevFrom: Date;
  prevTo: Date;
  /** 구간 길이 (일). 스파크라인 점 개수 */
  days: number;
}

const DAY_MS = 86_400_000;

export function resolveRange(fromISO?: string, toISO?: string, fallbackDays = 30): DateRange {
  const to = toISO ? endOfDayUtc(new Date(toISO)) : endOfDayUtc(new Date());
  const from = fromISO
    ? startOfDayUtc(new Date(fromISO))
    : startOfDayUtc(new Date(to.getTime() - (fallbackDays - 1) * DAY_MS));

  const span = Math.max(DAY_MS, to.getTime() - from.getTime());
  return {
    from,
    to,
    prevFrom: new Date(from.getTime() - span),
    prevTo: new Date(from.getTime() - 1),
    days: Math.max(1, Math.round(span / DAY_MS)),
  };
}

export function startOfDayUtc(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

export function endOfDayUtc(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(23, 59, 59, 999);
  return x;
}

/** YYYY-MM-DD (UTC) */
export function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * 구간의 모든 날짜를 0 으로 채운 시계열.
 *
 * 값이 없는 날을 빼고 내보내면 그래프에 구멍이 나고, 더 나쁘게는 **아무도
 * 안 쓴 날이 존재하지 않는 날처럼** 보인다. 0 은 0 으로 보여야 한다.
 */
export function emptySeries(range: DateRange): { date: string; value: number }[] {
  const out: { date: string; value: number }[] = [];
  for (let t = range.from.getTime(); t <= range.to.getTime(); t += DAY_MS) {
    out.push({ date: dayKey(new Date(t)), value: 0 });
  }
  return out;
}

export function fillSeries(
  range: DateRange,
  rows: { _id: string; value: number }[],
): { date: string; value: number }[] {
  const map = new Map(rows.map((r) => [r._id, r.value]));
  return emptySeries(range).map((p) => ({ ...p, value: map.get(p.date) ?? 0 }));
}

/** 증감률. 이전이 0 이면 비율이 무의미하므로 null 을 준다 (∞ 를 그리지 않게) */
export function deltaPct(current: number, previous: number): number | null {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}
