/**
 * say_korean 도구의 **선언과 규칙** — 소리를 내는 부분(korean-voice.ts)과 떼어 둔다.
 *
 * 왜 따로 두나: 호출 실험 스크립트(scripts/probe-korean-voice.ts)가 운영과
 * **글자 하나 다르지 않은** 선언으로 Gemini 에 붙어야 실험 결과를 믿을 수 있다.
 * 그런데 korean-voice.ts 는 @livekit/agents(네이티브 모듈 포함)를 끌고 와서
 * 스크립트에서 그대로 import 하기 무겁다. 선언·검증·진단만 여기 두고 양쪽이
 * 같이 쓴다. 이 파일은 외부 의존성이 없다.
 */

export const SAY_KOREAN = 'say_korean';

/**
 * 도구 설명. Google Live API best practices 의 모양을 따른다: 무엇을 하는지 +
 * **언제 부르는지(Invocation condition)** 를 따로 적는다. 그리고 "부르는 건
 * 소리 내는 게 아니다" 를 도구 설명에도 박는다 — 실기기에서 모델이 호출 대신
 * 호출 표기를 소리 내 읽었다 (api 의 build-instructions.ts renderKoreanCues 참고).
 */
export const SAY_KOREAN_DESCRIPTION = [
  'Plays Korean audio to the learner in your own voice, with native Seoul',
  'pronunciation. It is the ONLY way Korean can be heard in this lesson.',
  'Invocation condition: invoke it every time the learner should hear Korean —',
  'a target phrase, an example, a correction, a model answer, a word they asked',
  "for, or your role-play character's line. Finish your sentence in the teaching",
  'language first, then invoke it instead of pronouncing Korean yourself.',
  "Invoking it is an action, not speech: never say this function's name or read",
  'its text aloud.',
].join(' ');

/** 인자 `text` 설명 */
export const SAY_KOREAN_TEXT_DESCRIPTION =
  'One complete Korean phrase or sentence, exactly as the learner should hear it, ' +
  'in Hangul only. No translation, no romanization, no words from any other language.';

/**
 * 도구 결과. 모델이 다음에 뭘 할지가 이 문장으로 갈린다.
 *
 * played 에 한 줄을 더 얹는다: 실험에서 **호출로 시작한 세션도 나중에 표기를
 * 읽는 턴이 섞였다.** 호출할 때마다 결과로 "계속 이 함수로" 가 문맥에 쌓이게
 * 한다 (모델은 자기가 앞에서 한 방식을 그대로 따라간다).
 */
export const SAY_KOREAN_RESULT = {
  played: 'Played. The learner heard it. Keep using say_korean for every Korean phrase.',
  rejected:
    'Nothing was played: the text contains non-Korean words. ' +
    'Invoke say_korean again with the ENTIRE phrase in Korean only. ' +
    'Never mix the teaching language into the Korean.',
  interrupted:
    'The learner started speaking, so the Korean was cut off. Listen to them.',
  failed:
    'The Korean audio failed to play, but the phrase is shown on the ' +
    "learner's screen. Do NOT pronounce it yourself. Point to the screen " +
    'in the teaching language and continue.',
} as const;

/** 한글 (완성형 · 자모 · 호환 자모) */
export const HANGUL = /[가-힣ᄀ-ᇿ㄰-㆏]/;

/**
 * 선생님 자막에 **실제 한국어 말**이 들었나 (진단용).
 *
 * 웃음·감탄사(ㅋㅋ, 음, 아, 오 …)는 뺀다. 프롬프트가 쓰라고 한 소리라서
 * 자막에 한글로 찍혀도 "한국어를 직접 발음했다" 가 아니다 — 세면 경보가
 * 헛돈다.
 */
const INTERJECTION =
  /(^|[\s,.!?…~])(?:ㅋ+|ㅎ+|음+|아+|어+|오+|와+|헐|흠+)(?=$|[\s,.!?…~])/g;

export function containsSpokenKorean(text: string): boolean {
  return HANGUL.test(text.replace(INTERJECTION, '$1'));
}

/**
 * 선생님이 도구를 **부르지 않고** 도구 표기를 소리 내 읽었나 (진단용).
 * 프롬프트 예시의 무대 지시문 "(invoke say_korean: …)", 옛 표기
 * "→ say_korean(…)", 자리 표시 🔊 가 자막에 찍히면 호출이 아니라 낭독이다.
 */
export const SPOKEN_TOOL_NOTATION = /say[\s_]?korean|\binvoke\b|→|🔊/i;

/**
 * 선생님이 **프롬프트 예시를 대사로 읽었나** (진단용). 실험에서 한 번,
 * 모델이 "Learner makes a terrible pronunciation: Tutor: Stooooop…" 처럼
 * 시스템 지시문의 예시 대본을 그대로 읊었다.
 */
export const SPOKEN_PROMPT_LEAK = /\b(Learner|Tutor|Teacher)\s*:|---|━━/;

/**
 * 한글 외 문자(숫자·문장부호·공백 제외)가 섞였는지.
 *
 * ⚠️ HANGUL.test() 만으로는 "공항에 qanday 가요" 도 통과한다 — 한글이 **들어
 *    있기만** 하면 되니까. 그러면 우리가 막으려던 바로 그 섞인 문장을 TTS 가
 *    그대로 읽는다. 한글 말고 다른 글자가 하나라도 있으면 거절한다.
 */
const NON_KOREAN_CONTENT =
  /[^\p{Script=Hangul}\p{Number}\p{Punctuation}\p{Separator}]/u;

/**
 * 모델이 따옴표·장식 기호를 같이 넘기는 경우가 있다. 소리 낼 것만 남긴다.
 *
 * ⚠️ '~' 는 **문장부호가 아니라 수학 기호(Sm)** 로 분류돼서, 안 지우면
 *    "좋아요~" 가 NON_KOREAN_CONTENT 에 걸려 거절된다. 모델은 고칠 게 없는데
 *    "한국어만 써라" 를 받고 같은 문장을 다시 보내는 헛바퀴를 돈다.
 *    말투용 장식이라 소리에도 영향이 없다.
 */
function clean(text: string): string {
  return text
    .replace(/[«»“”"'`]/g, '')
    .replace(/[~～♡♥☆★♪]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 도구에 넘어온 글자를 **소리 낼 한국어**로 바꾼다. 못 쓰면 null.
 *
 * ⚠️ HANGUL 이 들어 있기만 하면 통과시키면 안 된다 — "공항에 qanday 가요" 도
 *    통과해서, 우리가 막으려던 바로 그 섞인 문장을 TTS 가 그대로 읽는다.
 */
export function koreanOnly(text: string): string | null {
  const korean = clean(text);
  if (!korean || !HANGUL.test(korean) || NON_KOREAN_CONTENT.test(korean)) {
    return null;
  }
  return korean;
}
