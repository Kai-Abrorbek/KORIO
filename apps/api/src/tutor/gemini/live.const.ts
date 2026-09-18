/**
 * Gemini Live — 모델 하나.
 *
 * 예전에는 여기에 PCM 규격(16k/24k), 40ms chunk, ephemeral token 수명,
 * sessionResumption 같은 게 다 있었다. 앱이 Gemini 에 **직접** WebSocket 을
 * 붙는 전제였기 때문이다.
 *
 * 지금은 LiveKit Tutor Agent 가 Gemini 연결을 전담한다:
 *
 *   앱 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──Gemini Live──▶ gemini-3.8-live
 *
 * 그래서 오디오 규격·재연결·토큰은 전부 Agent(와 그 SDK) 사정이고,
 * API 가 알아야 할 건 **어떤 모델로 돌릴지** 하나뿐이다. 이 값은 Agent 로
 * dispatch metadata 에 실려 간다 — Agent 를 다시 배포하지 않고도 모델을
 * 갈아 끼울 수 있게 서버가 들고 있는다.
 *
 * ⚠️ 함수인 이유: ConfigModule 이 dotenv 를 로드하는 건 이 파일의 import 가
 *    끝난 **뒤**라, 최상단 const 로 읽으면 .env 의 값이 무시된다.
 *    (livekit.const.ts 의 같은 주석 참고 — 실제로 그 버그를 겪었다)
 */
export const DEFAULT_GEMINI_LIVE_MODEL = 'gemini-3.8-live';

export function geminiLiveModel(): string {
  return process.env.GEMINI_LIVE_MODEL?.trim() || DEFAULT_GEMINI_LIVE_MODEL;
}
