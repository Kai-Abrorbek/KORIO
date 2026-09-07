/**
 * 리그의 "주" 계산.
 *
 * 조용히 틀리는 종류라 따로 검사한다. 주차 키가 하루라도 밀리면 정산이
 * 엉뚱한 XP 창을 보고, 순위가 방 입장순으로 뒤섞인다. 연말·연초(W52/W53/W01)
 * 와 시간대 경계가 특히 위험하다.
 *
 * 실행: npx ts-node src/__scratch/league-week.test.ts   (-T 붙이지 말 것)
 */
import {
  getWeekKey,
  pickDueWeeks,
  weekRangeFromKey,
} from '../league/league.week';
import { LEAGUE_TIMEZONE } from '../common/date.util';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

console.log(`리그 기준 시간대: ${LEAGUE_TIMEZONE}\n`);

// ── 키 ↔ 범위 왕복 ────────────────────────────────────────────
// 어느 한쪽만 틀려도 정산이 다른 주의 XP 를 본다
{
  let broken: string[] = [];
  const d = new Date('2026-01-01T12:00:00Z');
  for (let i = 0; i < 400; i++) {
    const key = getWeekKey(d);
    const { start, end } = weekRangeFromKey(key);
    // 그 주 범위 안의 아무 시각이나 다시 키로 바꾸면 같은 키가 나와야 한다
    const mid = new Date((start.getTime() + end.getTime()) / 2);
    if (getWeekKey(mid) !== key) broken.push(`${d.toISOString().slice(0, 10)} → ${key}`);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  say(broken.length === 0, `400일 연속 왕복 일치 ${broken.length ? '실패: ' + broken.slice(0, 3).join(', ') : ''}`);
}

// ── 주 범위 ──────────────────────────────────────────────────
{
  const { start, end } = weekRangeFromKey('2026-W10');
  say(end.getTime() - start.getTime() === 7 * 86400000, '한 주는 정확히 7일');
  say(getWeekKey(start) === '2026-W10', '주 시작 시각도 같은 키');
  // 끝 시각은 다음 주에 속한다 (반열림 구간). 안 그러면 하루가 두 주에 잡힌다
  say(getWeekKey(end) === '2026-W11', '주 끝 시각은 다음 주 (반열림)');
  say(getWeekKey(new Date(end.getTime() - 1)) === '2026-W10', '끝 1ms 전은 아직 이번 주');
}
{
  // 연말·연초 — 여기서 틀리면 1년에 한 번 정산이 통째로 어긋난다
  const w1 = weekRangeFromKey('2027-W01');
  say(getWeekKey(w1.start) === '2027-W01', '2027-W01 시작이 제 키로 돌아온다');
  const last = getWeekKey(new Date(w1.start.getTime() - 86400000));
  say(/^2026-W5[23]$/.test(last), `1주차 전날은 전해 마지막 주 (${last})`);
}
{
  const bad = weekRangeFromKey('쓰레기');
  say(bad.end.getTime() > Date.now(), '못 읽는 키는 이번 주로 (과거로 안 샌다)');
}

// ── 정산 대상 고르기 ──────────────────────────────────────────
const NOW = new Date('2026-03-10T00:00:00Z');
const endOf = (k: string) => {
  // W01 = 1일차, 한 주 = 10일이라고 치는 가짜 달력 (계산이 아니라 규칙만 본다)
  const w = Number(k.split('-W')[1]);
  return new Date(NOW.getTime() + (w - 5) * 10 * 86400000);
};
{
  const due = pickDueWeeks(['2026-W03', '2026-W04', '2026-W05', '2026-W06'], NOW, 8, endOf);
  say(due.join(',') === '2026-W03,2026-W04,2026-W05', '끝난 주만 고른다');
  say(due[0] === '2026-W03', '오래된 주부터');
}
{
  // 진행 중인 주를 정산하면 유저가 월요일 아침에 이미 끝난 리그를 본다
  const due = pickDueWeeks(['2026-W06', '2026-W07'], NOW, 8, endOf);
  say(due.length === 0, '아직 안 끝난 주는 절대 안 고른다');
}
{
  // 오래 멈춰 있다 살아난 상황 — 밀린 주가 20개
  const many = Array.from({ length: 20 }, (_, i) => `2026-W${String(i + 1).padStart(2, '0')}`);
  const wayPast = (k: string) => new Date(NOW.getTime() - 86400000);
  const due = pickDueWeeks(many, NOW, 8, wayPast);
  say(due.length === 8, '한 번에 도는 주 수는 제한된다 (남은 건 다음 실행이)');
  say(due[0] === '2026-W01', '제한이 걸려도 오래된 것부터');
}
{
  const due = pickDueWeeks(['', '쓰레기', '2026-W3', '2026-W03'], NOW, 8, endOf);
  say(due.join(',') === '2026-W03', '모양이 안 맞는 키는 버린다');
}

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
