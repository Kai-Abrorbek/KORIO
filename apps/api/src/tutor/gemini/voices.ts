/**
 * 선생님 → Gemini 목소리.
 *
 * ⚠️ **이 파일 하나만 고치면 목소리가 바뀐다.** 다른 데 흩어 두지 않는 이유는
 *    이게 귀로 정하는 값이기 때문이다 — AI Studio 에서 우즈벡어·한국어·
 *    러시아어·영어 네 언어로 직접 들어보고 바꿀 값이지, 코드를 읽고 정할 값이
 *    아니다.
 *
 * ⚠️ 아래 매핑은 **임시다.** 의도만 맞춰 놓은 것이고 확정이 아니다.
 *    바꿀 땐 voiceName 문자열만 갈아 끼우면 된다.
 *
 * ⚠️ 목소리는 **성격의 절반이다.** 민준(낮고 거친)과 유나(밝고 장난기)가 같은
 *    소리로 말하면 카드에서 선생님을 고르는 의미가 사라진다. 다섯이 확실히
 *    구분되게 골라라 — 특히 남/여가 섞여 있어야 한다.
 */
export interface GeminiVoice {
  voiceName: string;
  /** 왜 이 목소리인가. 다음에 고르는 사람(=너)이 기준을 알 수 있게 */
  intent: string;
}

export const TEACHER_VOICE: Record<string, GeminiVoice> = {
  seoyeon: { voiceName: 'Achernar', intent: '부드럽고 차분한 여자 목소리' },
  jiwoo: { voiceName: 'Zephyr', intent: '밝은 여자 목소리' },
  minjun: { voiceName: 'Algenib', intent: '낮고 약간 거친 남자 목소리' },
  hyunwoo: { voiceName: 'Iapetus', intent: '발음 또렷한 남자 목소리' },
  yuna: { voiceName: 'Laomedeia', intent: '밝고 장난기 있는 여자 목소리' },
};

/** 모르는 선생님이면 차분한 쪽으로. 소리가 없는 것보다 낫다 */
export const DEFAULT_GEMINI_VOICE = 'Achernar';

export function voiceForTeacher(teacherId: string): string {
  return TEACHER_VOICE[teacherId]?.voiceName ?? DEFAULT_GEMINI_VOICE;
}
