import type { TutorAddressStyle, TutorMode } from '../tutor.const';
import type { KoreanVoiceMode } from '../gemini/live.const';

/**
 * Agent 에게 넘기는 전부.
 *
 * ── 왜 여기서 다 만들어서 넘기나 ──
 *
 * Agent 는 DB 를 안 본다. 학습자 프로필도, 오답 장부도, 지난 세션도 읽지
 * 않는다. 그걸 읽게 하면 개인화 로직이 API 와 Agent 두 군데로 갈라지고,
 * 두 곳의 프롬프트가 조금씩 달라지는 순간 무엇 때문에 튜터가 이상하게
 * 구는지 알 수 없게 된다.
 *
 * ⚠️ 이 값은 **서버가 만든다.** 앱은 여기에 한 글자도 못 넣는다.
 *    instructions 를 앱이 보낼 수 있게 두면 누구든 우리 Gemini 키로
 *    아무 프롬프트나 돌릴 수 있다 — 그게 이 구조의 핵심 보안 경계다.
 */
export interface TutorDispatchMetadata {
  /** 우리 DB 의 TutorSession._id. 로그를 서로 맞출 때 쓴다 */
  sessionId: string;
  /** 완성된 master prompt. Agent 는 이걸 그대로 쓴다 */
  instructions: string;
  /** Gemini 모델. 서버가 정한다 — Agent 재배포 없이 바꾸려고 */
  model: string;
  /** Gemini prebuilt voice 이름 */
  voiceName: string;
  teacherId: string;
  mode: TutorMode;
  topicId?: string;
  /** 학습자 모국어 = 설명에 쓰는 언어 (uz/ru/en/ko) */
  teachingLanguage: string;
  /** 튜터가 학습자에게 쓰는 말투. 가르치는 한국어의 격식과는 다른 축이다 */
  addressStyle: TutorAddressStyle;
  /**
   * 이 시간이 지나면 Agent 가 스스로 끊는다.
   *
   * 앱에도 같은 타이머가 있지만 그건 앱을 고치면 우회된다. 돈이 나가는 건
   * Agent ↔ Gemini 구간이라 **끊는 책임도 거기 있어야 한다.**
   */
  maxDurationSec: number;
  /**
   * 한국어를 누가 소리 내나 (gemini/live.const.ts 의 koreanVoiceMode).
   *
   * 'tool' 이면 Agent 가 say_korean 도구를 등록한다. 프롬프트(§0)도 그걸
   * 전제로 쓰였다 — **둘은 반드시 같이 움직여야** 해서, 프롬프트를 만든
   * API 가 정해서 싣는다. 빠져 있으면 Agent 는 'native' 로 본다.
   *
   * ⚠️ 배포 순서: **Agent 먼저, API 나중.** 옛 Agent 는 이 필드를 몰라서
   *    도구를 안 만드는데, 새 API 의 프롬프트는 "한국어는 say_korean 으로만"
   *    이라 한국어가 아예 안 들린다.
   */
  koreanVoice?: KoreanVoiceMode;
}

/**
 * dispatch metadata 는 문자열 하나로만 실린다.
 *
 * 따로 함수를 둔 이유: 만드는 쪽(API)과 읽는 쪽(Agent)이 다른 앱이라
 * 모양이 어긋나기 쉽다. 여기 한 곳만 보면 계약 전체가 보이게 해둔다.
 */
export function encodeDispatchMetadata(m: TutorDispatchMetadata): string {
  return JSON.stringify(m);
}

/**
 * Agent 쪽에서 쓰는 역함수.
 *
 * ⚠️ 여기서 **모양을 검사한다.** metadata 는 우리 서버가 만든 것이지만,
 *    배포 시점이 어긋나면(=API 는 새 필드를 보내는데 Agent 는 옛날 코드)
 *    조용히 undefined 가 프롬프트 자리에 들어간다. 그러면 튜터가 아무
 *    지시 없이 말하기 시작한다 — 차라리 크게 실패하는 게 낫다.
 */
export function decodeDispatchMetadata(raw: string): TutorDispatchMetadata {
  const m = JSON.parse(raw) as Partial<TutorDispatchMetadata>;
  const need: (keyof TutorDispatchMetadata)[] = [
    'sessionId',
    'instructions',
    'model',
    'voiceName',
    'teacherId',
    'mode',
    'teachingLanguage',
    'addressStyle',
    'maxDurationSec',
  ];
  const missing = need.filter((k) => m[k] === undefined || m[k] === '');
  if (missing.length) {
    throw new Error(`dispatch metadata 에 없는 값: ${missing.join(', ')}`);
  }
  if (
    m.koreanVoice !== undefined &&
    m.koreanVoice !== 'tool' &&
    m.koreanVoice !== 'native'
  ) {
    throw new Error(`dispatch metadata koreanVoice 값이 이상하다: ${String(m.koreanVoice)}`);
  }
  return m as TutorDispatchMetadata;
}
