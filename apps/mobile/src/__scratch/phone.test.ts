import { toE164 } from "../utils/phone-format";

/**
 * 전화번호 정규화 규칙.
 *
 * 연락처 매칭에서 제일 틀리기 쉬운 부분이다. 잘못 만든 번호는 매칭이 안 될
 * 뿐이지만, **다른 사람의 번호로 잘못 만들면 엉뚱한 사람이 친구 추천에 뜬다.**
 * 그래서 애매하면 null 을 돌려주는 게 규칙이고, 그 규칙을 여기서 지킨다.
 *
 *   cd apps/mobile
 *   npx ts-node --compilerOptions '{"module":"commonjs","moduleResolution":"node","types":["node"]}' \
 *     src/__scratch/phone.test.ts
 */
let fail = 0;
function eq(name: string, got: any, want: any) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(
    `${ok ? "\u2705" : "\u274c"} ${name}${ok ? "" : `  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`}`,
  );
}

// ── 전화번호 정규화 (앱) ──
eq("우즈벡 국내표기", toE164("90 123 45 67", "UZ"), "+998901234567");
eq("우즈벡 국가번호 포함", toE164("998901234567", "UZ"), "+998901234567");
eq("한국 010", toE164("010-1234-5678", "KR"), "+821012345678");
eq("한국 하이픈 없음", toE164("01012345678", "KR"), "+821012345678");
// 유선전화(02-…)는 일부러 안 받는다. 유선번호로 가입한 사람은 없고,
// 자릿수를 느슨하게 열면 엉뚱한 번호가 매칭돼서 남이 친구 추천에 뜬다
eq("한국 유선번호는 포기", toE164("02-123-4567", "KR"), null);
eq("러시아 8 접두", toE164("8 912 345 67 89", "RU"), "+79123456789");
eq("이미 +붙은 국제번호는 그대로", toE164("+821012345678", "UZ"), "+821012345678");
eq("00 국제접두 → +", toE164("00821012345678", "UZ"), "+821012345678");
eq("괄호·공백 섞임", toE164("+82 (10) 1234-5678", "KR"), "+821012345678");
eq("자릿수 모자라면 포기", toE164("1234", "UZ"), null);
eq("빈 값", toE164("", "UZ"), null);
eq("숫자 아님", toE164("없음", "UZ"), null);
eq("trunk 못 떼면 포기(잘못된 매칭 방지)", toE164("0123", "UZ"), null);

console.log(fail ? `\n\uD83D\uDCA5 실패 ${fail}건` : "\n\uD83C\uDF89 전부 통과");
// 앱 tsconfig 에는 node 타입이 없다. 종료코드는 ts-node 실행 시 --types node 로 준다
(globalThis as any).process?.exit?.(fail ? 1 : 0);
