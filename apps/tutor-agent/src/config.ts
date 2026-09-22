/**
 * Agent 환경.
 *
 * ⚠️ GOOGLE_API_KEY 는 **이 프로세스에만** 있다. 앱에도, NestJS 에도 없다.
 *    앱이 Gemini 에 직접 붙던 구조를 버린 이유의 절반이 이거다.
 */

import { GoogleGenAI, Modality, type Session } from '@google/genai';

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

/**
 * Live(선생님 목소리)의 출력 언어. 설명 언어 하나로 못 박는다.
 * 한국어는 Live 가 말하지 않는다 — say_korean 만 말한다.
 */
export function tutorOutputLanguage(teachingLanguage: string): string {
  return BCP47[teachingLanguage] ?? 'uz-UZ';
}

/**
 * 그 언어 코드를 Live 가 **실제로 받아주는지** 확인한다.
 *
 * ⚠️ 문서만으로는 확정이 안 된다:
 *   · 공식 문서: native audio 모델은 "언어 코드 명시를 지원하지 않는다"
 *   · 실제 보고: 안 받는 코드를 넣으면 **세션 연결 단계에서 거부**된다
 *       "Unsupported language code 'en-GB' for model …native-audio…"
 *   · 지원 언어 표에는 우즈벡어가 'uz' 로만 적혀 있다 ('uz-UZ' 아님)
 *
 * 거부되면 튜터가 **통째로 연결이 안 된다.** 그래서 학습자를 기다리는 동안
 * 같은 모델로 잠깐 붙어보고 setupComplete 를 받은 코드만 쓴다. BCP-47
 * ('uz-UZ') 과 기본 코드('uz') 를 동시에 보고 앞의 것을 고른다. 둘 다
 * 안 되면 코드 없이 간다 — 프롬프트(§0)와 say_korean 검증은 그대로 산다.
 *
 * 결과는 프로세스 안에서 재사용한다.
 */
type ProbeResult = { ok: boolean; reason?: string };
const probed = new Map<string, Promise<ProbeResult>>();

function probeLiveLanguage(
  model: string,
  languageCode: string,
  timeoutMs = 6000,
): Promise<ProbeResult> {
  return new Promise<ProbeResult>((resolve) => {
    let settled = false;
    let session: Session | undefined;
    const finish = (r: ProbeResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      session?.close();
      resolve(r);
    };
    const timer = setTimeout(
      () => finish({ ok: false, reason: `${timeoutMs}ms 안에 응답 없음` }),
      timeoutMs,
    );
    new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY }).live
      .connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { languageCode },
        },
        callbacks: {
          onmessage: (m) => {
            if (m.setupComplete) finish({ ok: true });
          },
          onerror: () => finish({ ok: false, reason: '연결 에러' }),
          onclose: (e) =>
            finish({ ok: false, reason: e.reason || `close ${e.code}` }),
        },
      })
      .then((s) => {
        session = s;
        if (settled) s.close();
      })
      .catch((e: unknown) =>
        finish({ ok: false, reason: e instanceof Error ? e.message : String(e) }),
      );
  });
}

/** 받아주는 코드 하나 (없으면 undefined) + 로그용 요약 */
export async function lockableOutputLanguage(
  model: string,
  teachingLanguage: string,
): Promise<{ code?: string; report: string }> {
  const full = tutorOutputLanguage(teachingLanguage);
  const candidates = [...new Set([full, full.split('-')[0]])];
  const results = await Promise.all(
    candidates.map((c) => {
      const key = `${model}|${c}`;
      let pending = probed.get(key);
      if (!pending) {
        pending = probeLiveLanguage(model, c);
        probed.set(key, pending);
      }
      return pending;
    }),
  );
  const i = results.findIndex((r) => r.ok);
  const report = candidates
    .map((c, j) => `${c}=${results[j].ok ? 'OK' : `거부(${results[j].reason})`}`)
    .join(', ');
  return { code: i >= 0 ? candidates[i] : undefined, report };
}

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
  'Greet them the way your system instructions tell you to — your voice rule,',
  'address style and personality all apply from the very first word.',
  'Keep it to two short sentences:',
  'one warm hello, then the first question that opens today\u2019s topic.',
  'Do not explain what you are about to do. Just start the lesson.',
].join(' ');

/**
 * tool 모드의 첫 인사 지시문.
 *
 * 첫 턴이 제일 중요하다 — 모델은 자기가 앞에서 한 방식을 그대로 이어 간다.
 * 첫 인사에서 한국어를 자기 목소리로(또는 도구 표기를 읽어서) 내면 그 뒤로도
 * 계속 그렇게 한다. 그래서 첫 마디 직전에 한 번 더 못 박는다.
 */
export const OPENING_DIRECTIVE_TOOL = [
  OPENING_DIRECTIVE,
  'Any Korean in it is heard only by invoking the say_korean function —',
  'never pronounce Korean yourself and never say the function name.',
].join(' ');

/**
 * tool 모드 첫 인사 — **첫 행동을 say_korean 호출로** 못 박는 판.
 *
 * 실험(2026-09-21, 14세션)에서 세션의 **첫 한국어 순간이 끝까지 갔다**:
 * 첫 한국어를 표기로 읽은 세션은 7개 전부 끝까지 표기만 읽었고, 첫 한국어를
 * 진짜로 호출한 세션은 끝까지 호출했다. 그래서 첫 한국어를 운에 맡기지 않고,
 * 말을 꺼내기 **전에** 호출부터 하게 한다 — 인사 한마디든 롤플레이 첫 대사든.
 */
export const OPENING_DIRECTIVE_TOOL_FIRST_CALL = [
  '(Silent stage direction — never read this aloud.)',
  'The learner just joined the call and is waiting.',
  'Your very first action is to invoke the say_korean function with a short',
  'Korean opening line — a warm greeting, or in role-play your character\u2019s',
  'first line — before you say a single word.',
  'When it has played, speak to them the way your system instructions tell you',
  'to — your voice rule, address style and personality all apply — and ask the',
  'first question that opens today\u2019s topic. Keep it short.',
  'Do not explain what you are about to do.',
  'Every Korean phrase is heard only by invoking say_korean — never pronounce',
  'Korean yourself and never say the function name.',
].join(' ');
