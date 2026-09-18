/**
 * Agent 환경.
 *
 * ⚠️ GOOGLE_API_KEY 는 **이 프로세스에만** 있다. 앱에도, NestJS 에도 없다.
 *    앱이 Gemini 에 직접 붙던 구조를 버린 이유의 절반이 이거다.
 */

/** dispatch 이름. ⚠️ API 의 LIVEKIT_TUTOR_AGENT_NAME 과 글자까지 같아야 한다 */
export const AGENT_NAME =
  process.env.LIVEKIT_TUTOR_AGENT_NAME?.trim() || 'korio-tutor';

/**
 * 모델 기본값.
 *
 * 평소에는 **API 가 dispatch metadata 로 보내준 값**을 쓴다 — Agent 를
 * 다시 배포하지 않고 모델을 갈아 끼울 수 있게. 이건 metadata 가 없을 때의
 * 마지막 보루다.
 */
export const FALLBACK_MODEL =
  process.env.GEMINI_LIVE_MODEL?.trim() || 'gemini-3.8-live';

/**
 * 아무도 안 들어오면 몇 초 뒤에 접는가.
 *
 * 토큰만 받고 연결을 안 하는 경우가 실제로 있다. 그때 Agent 가 방에 남아
 * Gemini 세션을 붙들고 있으면 아무도 안 듣는 대화에 돈이 나간다.
 */
export const WAIT_FOR_LEARNER_SEC = 30;
