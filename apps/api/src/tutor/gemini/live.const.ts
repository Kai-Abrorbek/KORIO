/**
 * Gemini 3.8 Live — 세션 설정.
 *
 * **native audio-to-audio 다.** 모델이 소리를 직접 듣고 같은 목소리로 직접
 * 말한다. STT → LLM → TTS 파이프라인이 아니다.
 *
 * ⚠️ 여기 있는 값은 **전송 방식과 무관하다.** 앱이 직접 붙든(WebSocket)
 *    중간에 무엇이 끼든, Gemini 에 넘기는 세션 설정은 이 모양 하나다.
 *    그래서 전송 결정을 기다리지 않고 먼저 굳혀 둔다.
 */

/** SDK 용 모델 ID */
export const GEMINI_LIVE_MODEL = 'gemini-3.8-live';
/** raw WebSocket / ephemeral token constraint 용 (접두사가 붙는다) */
export const GEMINI_LIVE_MODEL_PATH = `models/${GEMINI_LIVE_MODEL}`;

/**
 * 오디오 규격.
 *
 * 입력만 우리가 맞춰 보내면 되고 출력은 서버가 정한다. 다른 샘플레이트도
 * MIME 에 정확히 적으면 서버가 리샘플하지만, **16kHz 가 native 라** 굳이
 * 서버에 일을 시킬 이유가 없다.
 */
export const AUDIO_IN = {
  sampleRate: 16_000,
  /** 16-bit PCM, mono, little-endian */
  mimeType: 'audio/pcm;rate=16000',
  channels: 1,
  bitsPerSample: 16,
} as const;

export const AUDIO_OUT = {
  sampleRate: 24_000,
  mimeType: 'audio/pcm;rate=24000',
  channels: 1,
  bitsPerSample: 16,
} as const;

/**
 * 한 번에 보낼 오디오 조각 길이.
 *
 * 20~100ms 가 권장 구간이다. 짧을수록 응답이 빠르지만 그만큼 메시지가 잦아진다.
 * 40ms = 16kHz × 16bit × 0.04s = **1,280 바이트**. 회화 연습에서 체감되는 건
 * "끼어드는 속도"라 짧은 쪽에 붙인다.
 */
export const AUDIO_CHUNK_MS = 40;
export const AUDIO_CHUNK_BYTES =
  (AUDIO_IN.sampleRate * AUDIO_IN.bitsPerSample * AUDIO_CHUNK_MS) / (8 * 1000);

/**
 * ephemeral token 수명.
 *
 * `newSessionExpireTime` 은 **새 세션을 열 수 있는 마감**이고,
 * `expireTime` 은 그 세션이 살아 있을 수 있는 마감이다. 둘을 같게 두면
 * 연결이 조금만 늦어도 토큰이 죽는다.
 *
 * 우리 세션 상한이 10분이라 넉넉히 잡되, 주웠을 때의 가치를 줄이려고 짧게 둔다.
 */
export const TOKEN_NEW_SESSION_SEC = 60;
export const TOKEN_EXPIRE_SEC = 20 * 60;

/**
 * 세션 수명.
 *
 * ⚠️ 오디오 전용 세션은 압축 없이 **약 15분** 한도가 있고, WebSocket 자체도
 *    10분쯤에 한 번 재연결될 수 있다. 우리 상한이 10분이라 첫 버전은 그 안에
 *    들어오지만, **재연결은 "혹시" 가 아니라 "언젠가" 다.**
 *    sessionResumption 없이 나가면 그때 대화가 통째로 날아간다.
 */
export const SESSION_RESUMPTION = true;
