import {
  LEAGUE_TIMEZONE,
  dayKey,
  startOfDay,
  startOfDayPlus,
  startOfWeek,
} from '../common/date.util';

/**
 * 리그의 "주" 계산.
 *
 * 서비스에서 빼놨다. 연말·연초(W52/W53/W01)와 시간대 경계에서 조용히 틀리는
 * 종류라 DB 없이 검사할 수 있어야 한다.
 *
 * ⚠️ 유저별 시간대를 쓰면 안 된다. 같은 방 사람들이 서로 다른 창으로 비교되면
 *    순위가 말이 안 된다. 리그는 항상 LEAGUE_TIMEZONE 하나로 본다.
 */

/** ISO 주차 키 ("2026-W26") */
export function getWeekKey(d = new Date()): string {
  const [y, m, day0] = dayKey(d, LEAGUE_TIMEZONE).split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, day0));
  const day = date.getUTCDay() || 7;
  // ISO 주차는 그 주 목요일이 속한 해로 센다
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/** 그 주 월요일 0시 ~ 다음 월요일 0시 (리그 기준 시간대) */
export function weekRange(d = new Date()) {
  const start = startOfWeek(d, LEAGUE_TIMEZONE);
  const end = startOfDayPlus(start, 7, LEAGUE_TIMEZONE);
  return { start, end };
}

/** getWeekKey 의 역함수. 못 읽는 키면 이번 주를 돌려준다 */
export function weekRangeFromKey(weekKey: string) {
  const [yStr, wStr] = (weekKey ?? '').split('-W');
  const year = Number(yStr);
  const week = Number(wStr);
  if (!year || !week) return weekRange();

  // ISO 규칙상 1월 4일은 항상 그 해 1주차에 속한다
  const jan4 = startOfDay(new Date(Date.UTC(year, 0, 4, 12)), LEAGUE_TIMEZONE);
  const week1Monday = startOfWeek(jan4, LEAGUE_TIMEZONE);

  const start = startOfDayPlus(week1Monday, (week - 1) * 7, LEAGUE_TIMEZONE);
  const end = startOfDayPlus(start, 7, LEAGUE_TIMEZONE);
  return { start, end };
}

/**
 * 아직 정산 안 된 주차 키들 중 **이미 끝난 주**만 골라 오래된 것부터 돌려준다.
 *
 * 진행 중인 주는 절대 포함되면 안 된다 — 정산해 버리면 유저가 월요일 아침에
 * 이미 끝나 있는 리그를 보게 된다.
 *
 * @param max 한 번에 따라잡을 최대 주 수. 오래 멈춰 있었어도 한 번에 다
 *            돌지는 않는다 (남은 건 다음 실행이 가져간다)
 */
export function pickDueWeeks(
  keys: string[],
  now: Date,
  max: number,
  endOf: (key: string) => Date = (k) => weekRangeFromKey(k).end,
): string[] {
  return keys
    .filter((k) => /^\d{4}-W\d{2}$/.test(k ?? ''))
    .filter((k) => endOf(k).getTime() <= now.getTime())
    .sort() // "2026-W03" 는 자리수가 고정이라 문자열 정렬 = 시간순
    .slice(0, max);
}
