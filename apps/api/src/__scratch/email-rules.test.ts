/**
 * 이메일 정규화 규칙.
 *
 * 여기가 틀리면 조용히 아프다: 저장은 소문자인데 조회는 원문이면 "가입은 됐는데
 * 로그인이 안 되는" 계정이 생기고, 선택 필드에 '' 를 넣으면 sparse 유니크
 * 인덱스에 빈 문자열이 쌓여 두 번째 유저부터 가입이 막힌다.
 *
 * 실행: npx ts-node src/__scratch/email-rules.test.ts   (-T 붙이지 말 것)
 */
import {
  EmailRow,
  normalizeEmail,
  normalizeEmailOptional,
  planEmailNormalization,
} from '../common/normalize-email';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

// ── normalizeEmail ────────────────────────────────────────────
say(normalizeEmail('Kai@X.com') === 'kai@x.com', '대문자 → 소문자');
say(normalizeEmail('  a@b.com  ') === 'a@b.com', '앞뒤 공백 제거');
say(normalizeEmail(undefined) === '', 'undefined → 빈 문자열');
say(normalizeEmail(null) === '', 'null → 빈 문자열');
// @Transform 은 검증보다 먼저 돈다 — 숫자가 들어와도 안 터져야 한다
say(normalizeEmail(123 as any) === '123', '문자열이 아니어도 안 터짐');
say(normalizeEmail({} as any) === '[object object]', '객체도 안 터짐');

// ── normalizeEmailOptional ────────────────────────────────────
say(normalizeEmailOptional(undefined) === undefined, '없으면 undefined 유지');
say(normalizeEmailOptional('') === undefined, "'' 는 undefined (인덱스에 '' 금지)");
say(normalizeEmailOptional('   ') === undefined, '공백만 있어도 undefined');
say(normalizeEmailOptional('A@B.com') === 'a@b.com', '값이 있으면 소문자로');

// ── planEmailNormalization ────────────────────────────────────
const row = (id: string, email: string): EmailRow => ({ id, email });

{
  const p = planEmailNormalization([row('1', 'Kai@x.com')]);
  say(p.updates.length === 1 && p.updates[0].to === 'kai@x.com', '대문자 하나 → 변경 1건');
  say(p.collisions.length === 0, '짝이 없으면 충돌 없음');
}
{
  const p = planEmailNormalization([row('1', 'kai@x.com')]);
  say(p.updates.length === 0 && p.untouched === 1, '이미 소문자면 손 안 댐');
}
{
  // 여기서 그냥 밀면 유니크 인덱스에 걸리거나 한쪽 계정이 가려진다
  const p = planEmailNormalization([row('1', 'Kai@x.com'), row('2', 'kai@x.com')]);
  say(p.updates.length === 0, '충돌이면 아무것도 바꾸지 않는다');
  say(p.collisions.length === 1 && p.collisions[0].rows.length === 2, '충돌로 보고');
  say(p.collisions[0].email === 'kai@x.com', '충돌 키는 소문자 형태');
}
{
  const p = planEmailNormalization([
    row('1', 'Kai@x.com'),
    row('2', 'KAI@x.com'),
    row('3', 'kAi@x.com'),
  ]);
  say(p.collisions.length === 1 && p.collisions[0].rows.length === 3, '셋 이상도 한 무리로');
  say(p.updates.length === 0, '전부 대문자여도 충돌이면 안 건드림');
}
{
  const p = planEmailNormalization([row('1', 'A@x.com'), row('2', 'B@x.com')]);
  say(p.updates.length === 2, '서로 다른 주소는 각각 변경');
}
{
  const p = planEmailNormalization([row('1', ''), row('2', '   '), row('3', 'A@x.com')]);
  say(p.updates.length === 1, '빈 이메일은 계획에서 빠진다');
  say(p.collisions.length === 0, '빈 값끼리 충돌로 잡히지 않는다');
}
{
  // 공백만 다른 경우도 같은 주소다
  const p = planEmailNormalization([row('1', ' kai@x.com '), row('2', 'kai@x.com')]);
  say(p.collisions.length === 1, '공백 차이도 같은 주소로 본다');
}

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
