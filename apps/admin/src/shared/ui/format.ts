/** 큰 수는 자리수를 줄여 읽는다. 어드민은 정확한 자릿수보다 크기를 먼저 본다 */
export function compact(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${trim(n / 1_000_000)}M`;
  if (abs >= 10_000) return `${trim(n / 1_000)}K`;
  return n.toLocaleString("ko-KR");
}

function trim(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

export function full(n: number): string {
  return n.toLocaleString("ko-KR");
}

export function percent(n: number | null | undefined, digits = 1): string {
  if (n === null || n === undefined) return "—";
  return `${(Math.round(n * 10 ** digits) / 10 ** digits).toLocaleString("ko-KR")}%`;
}

/** 2026-09-14 → 9.14 */
export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${Number(m)}.${Number(d)}`;
}

/** 2026-09-14 → 9월 14일 (월) */
const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
export function longDate(iso: string): string {
  const dt = new Date(`${iso}T00:00:00.000Z`);
  return `${dt.getUTCMonth() + 1}월 ${dt.getUTCDate()}일 (${WEEKDAY[dt.getUTCDay()]})`;
}

/** ISO 타임스탬프 → 2026. 9. 14. */
export function dateOnly(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ko-KR");
}

/**
 * 축 눈금.
 *
 * 최댓값을 그대로 쓰면 눈금이 "1,237" 같은 숫자가 된다. 사람이 읽는 값
 * (1·2·2.5·5 의 10배수)으로 올려 잡는다.
 */
export function niceMax(max: number, ticks = 4): number {
  if (max <= 0) return ticks;
  const rough = max / ticks;
  const mag = 10 ** Math.floor(Math.log10(rough));
  const norm = rough / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * mag * ticks;
}
