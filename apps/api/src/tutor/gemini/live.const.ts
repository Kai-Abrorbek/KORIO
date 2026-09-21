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

/**
 * 한국어를 누가 소리 내나.
 *
 *   'tool'   — 선생님 목소리(Gemini Live)는 설명 언어만 말하고, 한국어는
 *              say_korean 도구 → **같은 목소리**의 Gemini TTS 가 따로 낸다.
 *   'native' — 예전 방식. Gemini Live 가 두 언어를 한 턴에 다 말한다.
 *
 * ── 왜 'tool' 이 기본인가 ──
 *
 * Gemini Live 는 한 턴의 소리를 하나의 흐름으로 통째로 만든다. 그 안에 두
 * 언어가 섞이면 한국어가 우즈벡어 발음으로 읽히고, 심하면 한국어 문장을
 * 말하다가 우즈벡어로 새 버린다 ("공항에 어떻게 가요?" → "공항에 qanday
 * qayo"). 한 언어만 말할 땐 둘 다 멀쩡했다. 프롬프트로 "문장을 나눠라" 를
 * 아무리 세게 써도 못 고쳤다 — 그래서 소리 단위를 물리적으로 나눴다.
 *
 * 설명 언어가 한국어(ko)면 섞일 일이 없으니 항상 'native' 다.
 *
 * 되돌리는 법: TUTOR_KOREAN_VOICE=native → API 재시작만 하면 된다.
 * 이 값은 dispatch metadata 로 Agent 에 실려 가서 도구 등록도 같이 꺼진다
 * (프롬프트와 도구가 따로 놀면 한국어가 아예 안 들린다).
 *
 * ⚠️ 'tool' 은 한국어 한 마디마다 Gemini TTS 요청이 나간다. 무료 티어(분당
 *    3회)에서는 금방 막혀서 한국어가 소리 없이 자막으로만 나온다 — 결제 필수.
 */
export type KoreanVoiceMode = 'tool' | 'native';

export function koreanVoiceMode(teachingLanguage: string): KoreanVoiceMode {
  if (teachingLanguage === 'ko') return 'native';
  return process.env.TUTOR_KOREAN_VOICE?.trim() === 'native' ? 'native' : 'tool';
}
