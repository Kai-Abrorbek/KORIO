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
}

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
  return m as TutorDispatchMetadata;
}
