/**
 * LiveKit 연결 설정.
 *
 * 전송 구조:
 *   앱 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──Gemini Live──▶ gemini-3.8-live
 *
 * API 가 하는 일은 두 가지뿐이다: **참가자 토큰 발급**과 **Agent dispatch**.
 * 오디오는 API 를 지나지 않는다.
 *
 * ⚠️ **process.env 를 모듈 최상단에서 읽지 마라.**
 *
 *    NestJS 의 ConfigModule.forRoot() 는 `@Module({...})` 데코레이터가
 *    평가될 때 dotenv 를 로드하는데, 그건 이 파일의 import 가 **전부 끝난
 *    뒤**다 (import 는 모듈 본문보다 먼저 실행된다). 그래서 최상단에서
 *    읽으면 .env 에 값이 있어도 빈 문자열로 굳는다.
 *
 *    실제로 그 버그로 "LIVEKIT_* 가 없다 — AI 튜터 통화가 비활성이다" 가
 *    떴다. 값은 .env 에 멀쩡히 있었다. 그래서 전부 함수로 읽는다.
 */

export interface LiveKitEnv {
  /** 클라이언트가 붙을 주소. wss://... */
  url: string;
  apiKey: string;
  /** ⚠️ 절대 앱으로 내려가면 안 된다. 서버 안에서만 쓴다 */
  apiSecret: string;
  /**
   * Agent 이름. explicit dispatch 의 키다.
   *
   * ⚠️ Agent worker 쪽 `agentName` 과 **글자 하나까지 같아야 한다.** 다르면
   *    dispatch 는 성공하는데 아무도 방에 안 들어온다 — 앱은 연결된 채로
   *    아무 소리도 안 나는, 제일 진단하기 어려운 실패가 된다.
   */
  agentName: string;
}

/** 호출 시점에 읽는다. 절대 모듈 로드 시점에 캐시하지 않는다 */
export function liveKitEnv(): LiveKitEnv {
  return {
    url: (process.env.LIVEKIT_URL ?? '').trim(),
    apiKey: (process.env.LIVEKIT_API_KEY ?? '').trim(),
    apiSecret: (process.env.LIVEKIT_API_SECRET ?? '').trim(),
    agentName:
      process.env.LIVEKIT_TUTOR_AGENT_NAME?.trim() || 'korio-tutor',
  };
}

export function isLiveKitConfigured(): boolean {
  const e = liveKitEnv();
  return !!(e.url && e.apiKey && e.apiSecret);
}

/**
 * 토큰 수명.
 *
 * 세션 상한이 10분이라 그보다 넉넉히 두되, 주웠을 때의 가치를 줄이려고 짧게
 * 둔다. 방 이름이 세션마다 달라서 이 토큰으로는 그 방 하나에만 들어갈 수 있다.
 */
export const TOKEN_TTL_SEC = 15 * 60;

/**
 * 방 이름. **세션당 하나.**
 *
 * 세션 id 를 쓰는 이유는 충돌이 구조적으로 불가능하기 때문이다 (Mongo
 * ObjectId). 유저 id 로 만들면 같은 사람이 두 기기에서 열었을 때 같은 방에
 * 들어가서 대화가 섞인다.
 */
export function tutorRoomName(sessionId: string): string {
  return `tutor-${sessionId}`;
}

/**
 * 참가자 identity.
 *
 * userId 를 그대로 쓰지 않는다 — identity 는 같은 방의 다른 참가자에게
 * 그대로 보인다. 지금은 1:1 방이라 상대가 우리 Agent 뿐이지만, 나중에
 * 그룹 수업 같은 걸 붙였을 때 과거 토큰이 유저 id 를 흘리고 있으면 그때는
 * 고치기 늦다.
 *
 * 세션당 유일하면 충분하다 — 서버는 sessionId 로 이미 누구인지 안다.
 */
export function learnerIdentity(sessionId: string): string {
  return `learner-${sessionId}`;
}
