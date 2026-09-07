/**
 * 메일 문구가 4개 언어 전부 채워져 있고, 보간이 남지 않는지 본다.
 *
 * 여기서 놓치면 유저 메일함에 "{{minutes}}분 뒤에 만료돼요" 가 그대로 간다.
 * 알림 쪽에서 실제로 "{{message}}" 가 화면에 찍힌 적이 있어서 같은 검사를 둔다.
 *
 * 실행: npx ts-node src/__scratch/mail-rules.test.ts   (-T 는 쓰지 말 것 —
 *      데코레이터 메타데이터가 빠져서 스키마 검사가 엉뚱하게 터진다)
 */
import {
  passwordResetMail,
  passwordResetSocialMail,
} from '../mail/mail.templates';
import { MAIL_LANGS, resolveMailLang } from '../mail/mail.types';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};

// ── 언어 좁히기 ──────────────────────────────────────────────
say(resolveMailLang('ko') === 'ko', "'ko' → ko");
say(resolveMailLang('ko-KR') === 'ko', "'ko-KR' → ko");
say(resolveMailLang('RU') === 'ru', "'RU' → ru (대문자)");
say(resolveMailLang(undefined) === 'uz', 'undefined → 기본 uz');
say(resolveMailLang('de') === 'uz', '모르는 언어 → 기본 uz');

// ── 재설정 코드 메일 ──────────────────────────────────────────
for (const lang of MAIL_LANGS) {
  const m = passwordResetMail('a@b.com', lang, '048213', 10);

  say(!!m.subject.trim(), `[${lang}] 제목 있음`);
  say(m.html.includes('048213'), `[${lang}] 본문에 코드가 들어감`);
  say(m.text.includes('048213'), `[${lang}] 텍스트 본문에도 코드가 들어감`);
  say(!/\{\{\w+\}\}/.test(m.html), `[${lang}] HTML 에 안 채운 자리 없음`);
  say(!/\{\{\w+\}\}/.test(m.text), `[${lang}] 텍스트에 안 채운 자리 없음`);
  say(m.html.includes('10'), `[${lang}] 만료 시간이 문구에 반영됨`);
  // 텍스트 본문이 없으면 스팸 점수가 올라간다
  say(m.text.length > 40, `[${lang}] 텍스트 본문이 비어 있지 않음`);
}

// ── 소셜 계정 안내 메일 ────────────────────────────────────────
for (const lang of MAIL_LANGS) {
  const m = passwordResetSocialMail('a@b.com', lang, 'kakao');
  say(m.html.includes('Kakao'), `[${lang}] 소셜 안내에 제공자 이름이 들어감`);
  say(!/\{\{\w+\}\}/.test(m.html), `[${lang}] 소셜 안내에 안 채운 자리 없음`);
  say(!/<[a-z]/i.test(m.text), `[${lang}] 소셜 안내 텍스트에 태그가 안 남음`);
}

// 모르는 제공자여도 빈칸이 되지 않아야 한다
const unknown = passwordResetSocialMail('a@b.com', 'ko', 'line');
say(unknown.html.includes('line'), '모르는 제공자는 값 그대로 노출');

// 코드에 0 이 앞에 오는 경우가 잘리지 않는지 (padStart 회귀 방지)
const zero = passwordResetMail('a@b.com', 'en', '000042', 10);
say(zero.html.includes('000042'), '앞자리 0 이 살아 있음');

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
