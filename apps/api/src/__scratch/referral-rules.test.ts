/**
 * ⚠️ 여기서 apps/mobile 을 import 하지 마라.
 *
 * 상대경로로 한 줄만 끌어와도 mobile 파일이 api 의 TS 프로그램에 들어가서
 * 공통 소스 루트가 apps/ 로 올라간다. 그러면 tsc 가
 *   "The common source directory of 'tsconfig.json' is '..'"
 * 를 뱉고, outDir 레이아웃이 dist/api/... 로 바뀌어 도커 빌드의
 * `test -f apps/api/dist/main.js` 가 깨진다.
 * 앱 쪽 로직 테스트는 apps/mobile/src/__scratch 에 둔다.
 */
import {
  generateCode,
  isValidCode,
  normalizeCode,
} from '../referral/referral-code.util';
import {
  CODE_ALPHABET,
  CODE_LENGTH,
  REFERRAL_MILESTONES,
} from '../referral/referral.constants';

let fail = 0;
function eq(name: string, got: any, want: any) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(
    `${ok ? '✅' : '❌'} ${name}${ok ? '' : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`,
  );
}

// ── 코드 생성 ──
const codes = new Set<string>();
for (let i = 0; i < 5000; i++) codes.add(generateCode());
eq('5000개 생성해도 중복 없음', codes.size, 5000);
eq(
  '전부 유효한 모양',
  [...codes].every((c) => isValidCode(c) && c.length === CODE_LENGTH),
  true,
);
eq(
  '헷갈리는 글자(0 O 1 I L)가 절대 안 나옴',
  [...codes].some((c) => /[01OIL]/.test(c)),
  false,
);
eq('알파벳에 O/0/1/I/L 없음', /[01OIL]/.test(CODE_ALPHABET), false);

// ── 유저가 붙여넣는 온갖 모양 ──
eq('그냥 코드', normalizeCode('ABC2345'), 'ABC2345');
eq('소문자', normalizeCode('abc2345'), 'ABC2345');
eq('앞뒤 공백', normalizeCode('  ABC2345  '), 'ABC2345');
eq('하이픈', normalizeCode('ABC-2345'), 'ABC2345');
eq('링크 통째로', normalizeCode('https://korio.online/i/ABC2345'), 'ABC2345');
eq('링크 + 쿼리', normalizeCode('https://korio.online/i/ABC2345?utm=kakao'), 'ABC2345');
eq('스킴 링크', normalizeCode('mobile://invite?code=ABC2345'), 'ABC2345');
eq('빈 값', normalizeCode(''), '');

// ── 오타는 추측하지 않는다 (엉뚱한 사람에게 보상이 가면 안 된다) ──
eq('O 가 섞이면 무효', isValidCode(normalizeCode('ABO2345')), false);
eq('0 이 섞이면 무효', isValidCode(normalizeCode('AB02345')), false);
eq('길이가 짧으면 무효', isValidCode('ABC234'), false);
eq('길이가 길면 무효', isValidCode('ABC23456'), false);

// ── 마일스톤 ──
eq('마일스톤이 오름차순', REFERRAL_MILESTONES.map((m) => m.count),
   [...REFERRAL_MILESTONES.map((m) => m.count)].sort((a, b) => a - b));
eq('보상도 오름차순', REFERRAL_MILESTONES.map((m) => m.gems),
   [...REFERRAL_MILESTONES.map((m) => m.gems)].sort((a, b) => a - b));
// "3명 달성 시 3단계까지 지급" 같은 계산이 안 겹치는지
function payable(total: number, alreadyPaid: number[]) {
  return REFERRAL_MILESTONES.filter(
    (m) => total >= m.count && !alreadyPaid.includes(m.count),
  ).map((m) => m.count);
}
eq('2명이면 아무것도 안 줌', payable(2, []), []);
eq('3명이면 3단계만', payable(3, []), [3]);
eq('10명인데 3은 이미 받음 → 10만', payable(10, [3]), [10]);
eq('한 번에 25명이 되면 밀린 것 다 지급', payable(25, []), [3, 10, 25]);
eq('전부 받았으면 재지급 없음', payable(50, [3, 10, 25, 50]), []);

console.log(fail ? `\n💥 실패 ${fail}건` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
