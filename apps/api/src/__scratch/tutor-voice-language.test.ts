/**
 * 어느 목소리로 읽을 것인가.
 *
 * 이 판정이 틀리면 "소리가 안 나는" 게 아니라 **알아들을 수 없는 소리가 난다** —
 * 우즈벡어 문장을 한국어 음성이 라틴 문자 그대로 읽거나, 그 반대가 된다.
 * 로그에도 안 남고 코드만 봐서는 안 보이는 실패라 여기에 못 박는다.
 *
 * 실행: npx ts-node src/__scratch/tutor-voice-language.test.ts   (-T 붙이지 말 것)
 */
import { detectSpokenLanguage } from '../tutor/tts/detect-spoken-language';

let fail = 0;
const say = (ok: boolean, msg: string) => {
  if (!ok) fail++;
  console.log(`${ok ? '✅' : '❌'} ${msg}`);
};
const is = (text: string, want: 'ko' | 'uz', msg: string) => {
  const got = detectSpokenLanguage(text);
  say(got === want, `${msg}\n     "${text}"\n   → ${got} (${want} 기대)`);
};

// ── 한 언어만 있는 문장 ───────────────────────────────────────
is('오, 강남이요? 뭐 먹었어요?', 'ko', '한국어 문장');
is('커피는 마셨어요가 자연스러워요.', 'ko', '교정 문장');
is('ㅋㅋ 커피는 마셔요.', 'ko', '자음만 있는 웃음도 한국어');
is('Mayli. Qaysi qismini tushunmayapsiz?', 'uz', '우즈벡어 문장');
is("Men kecha do'stim bilan kinoga bordim.", 'uz', '아포스트로피 있는 우즈벡어');

// ── 섞인 문장 — 여기가 어렵다 ─────────────────────────────────
// 이 앱에서 섞인 문장은 대개 둘 중 하나다:
//   (1) 한국어 문장 안에 외래어 한 단어  → 한국어 음성이 읽어야 한다
//   (2) 우즈벡어 설명 안에 한국어 예문    → 우즈벡어 음성이 읽어야 한다
// "한글이 하나라도 있으면 한국어" 로 판정하면 (2)가 통째로 깨진다.
is('아메리카노는 kofe 예요.', 'ko', '한국어 안 외래어 한 단어');
is('오늘 KTX 타고 부산 갔어요.', 'ko', '한국어 안 약어');
is('-러 가다 biror joyga borishni bildiradi.', 'uz', '우즈벡어 설명 안 한국어 표현');
is("Bu yerda 은 gapning mavzusini ko'rsatadi.", 'uz', '우즈벡어 설명 안 조사');

// ── 한 응답이 두 언어로 갈리는 실제 모양 ──────────────────────
// 프롬프트가 "한 문장 안에 섞지 마라" 를 시키므로 문장 단위로 깔끔히 갈린다
{
  const reply = [
    '-러 가다 biror joyga borishni bildiradi.',
    '영화 보러 가요.',
    'Tushundingizmi?',
    '그럼 한국어로 한번 해봐요.',
  ];
  const got = reply.map(detectSpokenLanguage).join(',');
  say(got === 'uz,ko,uz,ko', `우즈벡어 설명이 문장마다 갈린다 → ${got}`);
}

// ── 글자가 없는 조각 ──────────────────────────────────────────
// 문장 자르기가 만들어낼 수 있는 조각들. 어느 쪽이든 같게 들리므로 한국어로
is('', 'ko', '빈 문자열');
is('2024.', 'ko', '숫자만');
is('?!', 'ko', '문장부호만');

console.log(fail ? `\n❌ ${fail}건 실패` : '\n🎉 전부 통과');
process.exit(fail ? 1 : 0);
