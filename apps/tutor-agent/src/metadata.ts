/**
 * API ↔ Agent 계약.
 *
 * ⚠️ **원본은 `apps/api/src/tutor/livekit/dispatch-metadata.ts` 다.**
 *    여기는 그 사본이다. 두 앱이 서로를 import 할 수 없어서(별도 workspace,
 *    별도 빌드) 어쩔 수 없이 두 벌이다. 그래서 아래 `decodeDispatchMetadata`
 *    가 **모양을 검사한다** — 한쪽만 고치고 배포하면 조용히 undefined 가
 *    프롬프트 자리에 들어가는 대신, 시끄럽게 죽는다.
 *
 *    한쪽을 고치면 반드시 다른 쪽도 고칠 것.
 */

export type TutorAddressStyle = 'polite' | 'casual';

export type TutorMode =
  | 'freeTalk'
  | 'rolePlay'
  | 'lesson'
  | 'pronunciation'
  | 'review';

export interface TutorDispatchMetadata {
  sessionId: string;
  /** 완성된 master prompt. Agent 는 이걸 그대로 쓴다 — 다시 만들지 않는다 */
  instructions: string;
  model: string;
  voiceName: string;
  teacherId: string;
  mode: TutorMode;
  topicId?: string;
  teachingLanguage: string;
  addressStyle: TutorAddressStyle;
  /** 이 시간이 지나면 Agent 가 스스로 끊는다 */
  maxDurationSec: number;
  /**
   * 한국어를 누가 소리 내나.
   *
   *   'tool'   — say_korean 도구를 등록한다. 선생님 목소리는 설명 언어만 말하고
   *              한국어는 같은 목소리의 TTS 가 따로 낸다 (korean-voice.ts).
   *   'native' — 예전처럼 Gemini Live 가 두 언어를 다 말한다.
   *
   * ⚠️ 프롬프트가 이 값을 전제로 쓰여 있다. 그래서 **프롬프트를 만든 API 가
   *    정해서 싣는다.** 빠져 있으면(옛 API) 'native' 로 본다 — 도구 없이
   *    "say_korean 을 불러라" 는 프롬프트가 돌면 한국어가 아예 안 들린다.
   */
  koreanVoice?: KoreanVoiceMode;
}

export type KoreanVoiceMode = 'tool' | 'native';

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
