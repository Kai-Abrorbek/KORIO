/**
 * LiveKit 접속 정보. 호출 시점에 읽는다 (모듈 로드 때 캐시하지 않는다).
 *
 * 옛 튜터(`src/tutor/livekit/livekit.const.ts`)에서 가져오던 것을 복사했다 —
 * 새 Voice Tutor 가 옛 튜터 모듈에 기대지 않게. 옛 튜터(텔레그램 미니앱이 아직
 * 쓴다)를 나중에 지워도 이 파일은 그대로 돈다.
 */
export function voiceTutorLiveKitEnv() {
  return {
    url: (process.env.LIVEKIT_URL ?? '').trim(),
    apiKey: (process.env.LIVEKIT_API_KEY ?? '').trim(),
    apiSecret: (process.env.LIVEKIT_API_SECRET ?? '').trim(),
  };
}
