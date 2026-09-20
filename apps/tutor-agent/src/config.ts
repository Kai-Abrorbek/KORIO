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

/**
 * 턴 감지(VAD) 설정.
 *
 * ⚠️ 초급 학습자는 **문장 중간에 단어를 떠올리느라 멈춘다.** 기본값으로 두면
 *    그 공백을 "말 끝남" 으로 보고 선생님이 끼어든다 — 회화 연습에서 제일
 *    거슬리는 고장이다.
 *
 * Gemini Live 기본값은 start=HIGH / end=HIGH 다. 그래서 실제로 바꿔야 하는
 * 건 **end 쪽**이다:
 *
 *   start HIGH — 말 시작을 자주 잡는다. 작게 말하는 초급자를 놓치지 않는다
 *   end   LOW  — 말 끝을 덜 자주 잡는다. 생각하는 공백을 끝으로 안 본다
 *   silence 800ms — 그 공백을 얼마나 기다려 주는가
 *
 * ⚠️ 800 은 **시작값이다.** 실기기에서 재보고 조정할 것:
 *    · 선생님이 자꾸 끼어들면  → 늘린다 (900~1200)
 *    · 대답이 너무 굼뜨면      → 줄인다 (600~700)
 *
 * prefixPaddingMs 는 일부러 비워 둔다 — 모델 기본값을 모르는 채로 숫자를
 * 박으면 짧은 단어("네")가 오히려 잘릴 수 있다. 짧은 단어가 안 잡히면
 * 그때 건드릴 손잡이다.
 */
export const VAD_SILENCE_MS = Number(process.env.TUTOR_VAD_SILENCE_MS) || 800;

/**
 * 자막 언어 힌트 (BCP-47).
 *
 * ⚠️ **고정이 아니라 힌트다.** 빈 배열이면 자동 감지로 돌아간다.
 *    이 튜터의 오디오에는 한국어와 학습자 모국어 두 가지만 나오므로, 그
 *    두 개를 알려주면 code-switching 자막이 훨씬 정확해진다.
 *    (예전 OpenAI 구조에서 우즈벡어 문장이 터키어/키릴로 받아적히던 문제)
 */
const BCP47: Record<string, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US',
  ko: 'ko-KR',
};

export function transcriptionLanguages(teachingLanguage: string): string[] {
  const learner = BCP47[teachingLanguage];
  // 한국어는 언제나 들어간다 — 가르치는 언어가 무엇이든 한국어가 나온다
  return [...new Set(['ko-KR', ...(learner ? [learner] : [])])];
}

/**
 * 통화가 열리자마자 선생님이 먼저 던지는 한 마디를 끌어내는 지시문.
 *
 * ⚠️ **이걸 빼면 인사를 아예 안 한다.**
 *
 * @livekit/agents-plugin-google 의 generateReply 는 이렇게 생겼다:
 *
 *   const turns = [];
 *   if (instructions !== undefined) turns.push({ role: 'model', parts: [{ text: instructions }] });
 *   if (needsReplyPlaceholder(model))  turns.push({ role: 'user',  parts: [{ text: '.' }] });
 *   sendClientEvent({ type: 'content', value: { turns, turnComplete: true } });
 *
 * 그런데 MODELS_WITHOUT_REPLY_PLACEHOLDER = ['3.1', '3.8'] 이라 우리 모델엔
 * placeholder 가 안 붙는다. 인자 없이 부르면 **turns 가 빈 배열**로 나가고,
 * Gemini 는 반응할 게 없어서 조용히 있다가 5초 뒤 타임아웃난다. 화면에는
 * "듣고 있어요" 만 계속 떠서, 죽은 건지 기다리는 건지 구분이 안 된다.
 *
 * 이 문자열은 **model 역할 turn 으로 들어간다.** 읽히는 대사가 아니라
 * 지시문으로 쓰되, 혹시 읽어버려도 티가 안 나게 첫 줄에 못을 박아 둔다.
 */
export const OPENING_DIRECTIVE = [
  '(Silent stage direction — never read this aloud.)',
  'The learner just joined the call and is waiting. Speak first, immediately.',
  'Greet them the way your system instructions tell you to — same language mix,',
  'same address style, same pronunciation rules. Keep it to two short sentences:',
  'one warm hello, then the first question that opens today\u2019s topic.',
  'Do not explain what you are about to do. Just start the lesson.',
].join(' ');
