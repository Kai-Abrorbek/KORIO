/**
 * 새 튜터 — STT → LLM(글) → TTS(소리).
 *
 *   학습자 음성 ─▶ Gemini STT (우즈벡어+한국어 받아쓰기)
 *               ─▶ Gemini LLM (선생님이 **글로** 생각한다)
 *               ─▶ BilingualTTS (글을 한국어/설명 언어로 잘라 **한 목소리**로 읽는다)
 *
 * ── 왜 Gemini Live 를 버리나 ──
 *
 * Live 는 한 턴의 소리를 통째로 만든다. 그 안에서 언어가 바뀌면 한국어가
 * 우즈벡어 억양으로 뭉개졌고, 도구로 떼어내자 이번엔 우즈벡어가 끝나기 전에
 * 한국어가 튀어나왔다 (다섯 번 프롬프트를 고쳐도 확률만 줄었다).
 * 글로 생각하게 하면 언어 경계가 **글자에 그대로 남는다.** 소리는 그 경계대로
 * 따로 만들면 된다 — 섞일 방법 자체가 없다. Praktika 같은 서비스도 이 구조다
 * (Whisper → GPT → ElevenLabs 한 목소리).
 *
 * 턴 감지 · 끼어들기 · 선제 생성은 AgentSession 기본값을 쓴다 (로컬 silero VAD
 * + 로컬 end-of-turn 모델). 우리가 만지는 건 "초급자가 생각하느라 멈추는 걸
 * 기다려 주기" 쪽 숫자뿐이다.
 */
import { voice } from '@livekit/agents';
import * as google from '@livekit/agents-plugin-google';
import { ThinkingLevel } from '@google/genai';
import { BilingualTTS } from './bilingual-tts.js';
import {
  AzureSegmentVoice,
  GeminiSegmentVoice,
  OpenAISegmentVoice,
  type SegmentVoice,
} from './segment-voices.js';
import { transcriptionLanguages } from './config.js';
import type { TutorDispatchMetadata } from './metadata.js';

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);

/** 글 모델. 평소엔 API 가 metadata.model 로 보낸다. 이건 마지막 보루 */
export const TEXT_MODEL_FALLBACK = process.env.TUTOR_TEXT_MODEL?.trim() || 'gemini-3.5-flash';

/**
 * 생각 깊이. 회화에서는 **첫 소리까지의 시간**이 제일 중요하다 — 깊게 생각할수록
 * 선생님이 대답 전에 멍하니 있는 시간이 는다. tutor-sim 으로 품질을 보며 정한다.
 */
const THINKING: Record<string, ThinkingLevel> = {
  minimal: ThinkingLevel.MINIMAL,
  low: ThinkingLevel.LOW,
  medium: ThinkingLevel.MEDIUM,
  high: ThinkingLevel.HIGH,
};
const THINKING_LEVEL = THINKING[(process.env.TUTOR_THINKING ?? 'low').toLowerCase()] ?? ThinkingLevel.LOW;

/**
 * 학습자가 이만큼(초) 아무 말이 없으면 선생님이 먼저 도와준다 — 프롬프트 §0 의
 * "(silence)". 초급자는 한국어를 떠올리는 데 몇 초씩 걸린다. 너무 짧으면 생각을
 * 끊고, 너무 길면 막힌 채 방치된다.
 */
export const SILENCE_NUDGE_SEC = num(process.env.TUTOR_SILENCE_NUDGE_SEC, 9);

/**
 * 말 끝 판정 (ms). 초급자는 문장 중간에 단어를 떠올리느라 멈춘다 — 그 공백을
 * "말 끝" 으로 보면 선생님이 끼어든다. Live 때 800ms 로 맞춰 둔 감을 이어받는다.
 *   minDelay: 마지막 소리 뒤 최소 이만큼은 기다린다
 *   maxDelay: end-of-turn 모델이 "아직 안 끝났다" 고 해도 이만큼 지나면 끝으로 본다
 */
const ENDPOINT_MIN_MS = num(process.env.TUTOR_ENDPOINT_MIN_MS, 800);
const ENDPOINT_MAX_MS = num(process.env.TUTOR_ENDPOINT_MAX_MS, 4500);

/** 이름에 live 가 들어간 건 음성 모델이다 — 글 모델 자리에 오면 기본값으로 */
function textModel(meta: TutorDispatchMetadata): string {
  const m = meta.model?.trim();
  return m && !/live/i.test(m) ? m : TEXT_MODEL_FALLBACK;
}

// ───────────────────────── 목소리 ─────────────────────────

/** api/src/tutor/tts/azure-tutor-tts.provider.ts 의 endpoint() 와 같은 규칙 */
function azureEndpoint(): string | null {
  const region = process.env.AZURE_SPEECH_REGION?.trim();
  const custom = process.env.AZURE_SPEECH_ENDPOINT?.trim();
  if (custom) {
    try {
      const url = new URL(custom);
      if (url.hostname.endsWith('.api.cognitive.microsoft.com') && region) {
        return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
      }
      url.pathname = `${url.pathname.replace(/\/$/, '')}/cognitiveservices/v1`;
      return url.toString().replace(/\/$/, '');
    } catch {
      return null;
    }
  }
  return region ? `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1` : null;
}

const AZURE_NATIVE: Record<string, string> = {
  uz: 'uz-UZ-MadinaNeural',
  ru: 'ru-RU-SvetlanaNeural',
  en: 'en-US-JennyNeural',
};

/**
 * 어느 업체 목소리로 읽나 — TUTOR_TTS (gemini | openai | azure).
 *
 * 기본은 gemini: 선생님 목소리 이름(meta.voiceName)이 Gemini Live 와 같은 30개라
 * 지금 통화·미리듣기와 **같은 사람**이 나온다. 다른 업체로 바꾸면 선생님별
 * 목소리 매핑부터 새로 정해야 한다.
 */
export function segmentVoiceFor(meta: TutorDispatchMetadata, log: (m: string) => void): SegmentVoice {
  const provider = (process.env.TUTOR_TTS ?? 'gemini').toLowerCase();
  const lang = meta.teachingLanguage;

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (apiKey) {
      return new OpenAISegmentVoice({
        apiKey,
        model: process.env.TUTOR_TTS_MODEL?.trim() || 'gpt-4o-mini-tts-2025-12-15',
        voice: process.env.OPENAI_TTS_VOICE?.trim() || 'marin',
        teachingLanguage: lang,
      });
    }
    log('⚠️ TUTOR_TTS=openai 인데 OPENAI_API_KEY 가 없다 → gemini 로 읽는다');
  }

  if (provider === 'azure') {
    const key = process.env.AZURE_SPEECH_KEY?.trim();
    const endpoint = azureEndpoint();
    if (key && endpoint) {
      const multi = process.env.AZURE_TTS_VOICE?.trim();
      return new AzureSegmentVoice({
        key,
        endpoint,
        teachingLanguage: lang,
        ...(multi
          ? { multilingualVoice: multi }
          : { koreanVoice: 'ko-KR-SunHiNeural', nativeVoice: AZURE_NATIVE[lang] ?? AZURE_NATIVE.uz }),
      });
    }
    log('⚠️ TUTOR_TTS=azure 인데 AZURE_SPEECH_KEY / REGION 이 없다 → gemini 로 읽는다');
  }

  return new GeminiSegmentVoice({
    apiKey: process.env.GOOGLE_API_KEY ?? '',
    model: process.env.TUTOR_TTS_MODEL?.trim() || 'gemini-3.1-flash-tts-preview',
    voiceName: meta.voiceName,
    teachingLanguage: lang,
  });
}

// ───────────────────────── 세션 ─────────────────────────

export function createPipelineSession(
  meta: TutorDispatchMetadata,
  log: (m: string) => void,
): { session: voice.AgentSession; describe: string } {
  const segmentVoice = segmentVoiceFor(meta, log);
  const model = textModel(meta);
  const langs = transcriptionLanguages(meta.teachingLanguage);

  const session = new voice.AgentSession({
    /**
     * 받아쓰기. Live 때 자막에 쓰던 것과 같은 Gemini 받아쓰기 모델이다 —
     * 언어 힌트(한국어 + 모국어)가 code-switching 정확도를 가른다.
     */
    stt: new google.beta.GeminiSTT({ languageCodes: langs }),

    llm: new google.LLM({
      model,
      // Gemini 3 계열은 temperature 1 이 권장값이다 (낮추면 같은 말을 되풀이한다)
      temperature: 1,
      thinkingConfig: { thinkingLevel: THINKING_LEVEL },
      maxOutputTokens: 1024,
    }),

    tts: new BilingualTTS(segmentVoice),

    // vad 는 비워 둔다 → AgentSession 이 로컬 silero VAD 를 붙인다 (돈 안 든다)

    userAwayTimeout: SILENCE_NUDGE_SEC,
    turnHandling: {
      endpointing: { minDelay: ENDPOINT_MIN_MS, maxDelay: ENDPOINT_MAX_MS },
    },
  });

  return {
    session,
    describe:
      `파이프라인 · 받아쓰기 gemini(${langs.join('+')}) · 생각 ${model} · ` +
      `목소리 ${segmentVoice.provider}/${segmentVoice.model}/${
        segmentVoice.provider === 'google' ? meta.voiceName : '-'
      } · 말끝 ${ENDPOINT_MIN_MS}~${ENDPOINT_MAX_MS}ms · 침묵 도움 ${SILENCE_NUDGE_SEC}s`,
  };
}

// ───────────────────────── 침묵 도움 · 진단 ─────────────────────────

const p = (xs: number[], q: number) => {
  if (!xs.length) return NaN;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
};
const ms = (v: number) => (Number.isFinite(v) ? `${Math.round(v)}ms` : '-');

/**
 * 학습자가 오래 조용하면 선생님이 먼저 돕게 하고, 통화 한 번이 어땠는지를
 * 로그로 남긴다. 반환값은 종료 때 찍을 요약 한 줄.
 */
export function attachPipelineHelpers(session: voice.AgentSession, log: (m: string) => void): () => string {
  const E = voice.AgentSessionEventTypes;
  const stats = { tutor: 0, learner: 0, nudges: 0, errors: 0, falseInterruptions: 0 };
  const eou: number[] = [];
  const llmFirst: number[] = [];
  const ttsFirst: number[] = [];

  /**
   * "(silence)" — 프롬프트 §0 이 약속한 신호. 선생님이 첫 단어를 주거나 더 쉬운
   * 버전으로 바꿔 준다. 두 번 도와도 조용하면 더는 재촉하지 않는다 (폰을 내려
   * 놓았을 수도 있다). 학습자가 말하면 다시 센다.
   */
  let nudgesInRow = 0;
  session.on(E.UserStateChanged, (ev) => {
    if (ev.newState === 'speaking') nudgesInRow = 0;
    if (ev.newState !== 'away' || nudgesInRow >= 2) return;
    nudgesInRow += 1;
    stats.nudges += 1;
    log(`… 학습자가 ${SILENCE_NUDGE_SEC}초 조용함 → 선생님이 먼저 돕는다 (${nudgesInRow}/2)`);
    session.generateReply({ userInput: '(silence)' });
  });

  session.on(E.UserInputTranscribed, (ev) => {
    if (!ev.isFinal || !ev.transcript.trim()) return;
    stats.learner += 1;
    log(`🎙 학습자${ev.language ? ` [${ev.language}]` : ''}: ${ev.transcript.slice(0, 200)}`);
  });

  session.on(E.ConversationItemAdded, (ev) => {
    const item = ev.item;
    if (item.type !== 'message' || item.role !== 'assistant') return;
    const text = item.textContent ?? '';
    if (!text.trim()) return;
    stats.tutor += 1;
    log(`🗣 선생님: ${text.replace(/\s*\n\s*/g, ' ⏎ ').slice(0, 240)}`);
  });

  session.on(E.MetricsCollected, (ev) => {
    const m = ev.metrics;
    if (m.type === 'eou_metrics') eou.push(m.endOfUtteranceDelayMs);
    else if (m.type === 'llm_metrics') llmFirst.push(m.ttftMs);
    else if (m.type === 'tts_metrics' && m.ttfbMs > 0) ttsFirst.push(m.ttfbMs);
  });

  session.on(E.AgentFalseInterruption, () => {
    stats.falseInterruptions += 1;
  });

  session.on(E.Error, (ev) => {
    stats.errors += 1;
    const inner = 'error' in ev.error ? ev.error.error : undefined;
    const msg = inner instanceof Error ? inner.message : ev.error.type;
    log(`⚠️ 오류 (${ev.error.type}): ${msg.slice(0, 200)}`);
  });

  return () =>
    `요약 — 선생님 ${stats.tutor} · 학습자 ${stats.learner} · 침묵 도움 ${stats.nudges} · ` +
    `헛 끼어들기 ${stats.falseInterruptions} · 오류 ${stats.errors} · ` +
    `말끝 판정 p50 ${ms(p(eou, 0.5))} · 글 첫 토큰 p50 ${ms(p(llmFirst, 0.5))} / p90 ${ms(p(llmFirst, 0.9))} · ` +
    `소리 첫 바이트 p50 ${ms(p(ttsFirst, 0.5))} / p90 ${ms(p(ttsFirst, 0.9))}`;
}
