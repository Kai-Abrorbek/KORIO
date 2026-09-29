/**
 * LiveKit 접속 정보. 호출 시점에 읽는다 (모듈 로드 때 캐시하지 않는다).
 *
 * 옛 튜터(`src/tutor/livekit/livekit.const.ts`, 2026-09-30 삭제)에서 복사해 온 것이다.
 */
export function voiceTutorLiveKitEnv() {
  return {
    url: (process.env.LIVEKIT_URL ?? '').trim(),
    apiKey: (process.env.LIVEKIT_API_KEY ?? '').trim(),
    apiSecret: (process.env.LIVEKIT_API_SECRET ?? '').trim(),
  };
}
