/**
 * 튜터 목소리 후보 블라인드 듣기 테스트.
 *
 *   pnpm --filter tutor-agent voice:samples
 *   → 끝나면 apps/tutor-agent/tmp/voice-samples/index.html 이 브라우저로 열린다
 *
 * ── 왜 ──
 *
 * 새 튜터는 STT → LLM(글) → TTS(소리) 로 간다. 선생님 말은 "우즈벡어 설명
 * 안에 한국어가 섞인 글" 이 되고, 그걸 **한 목소리**로 읽어야 한다.
 * 어느 TTS 가 우즈벡어도 한국어도 제대로 읽는지는 문서로 못 정한다 —
 * Gemini TTS·ElevenLabs 공식 지원 언어에 우즈벡어가 아예 없다. 귀로만 안다.
 * 그래서 실제 수업에서 나올 문장을 후보마다 뽑아 이름을 가리고 나란히 듣는다.
 *
 * ── 후보 ──
 *
 *   gemini-whole  Gemini TTS — 한 줄을 통째로 (모델이 알아서 언어를 바꿔 읽는다)
 *   gemini-split  Gemini TTS — 같은 목소리로 한국어/설명 구간을 따로 합성해 이어 붙인다
 *   openai-whole  OpenAI gpt-4o-mini-tts — 통째로
 *   openai-split  OpenAI — 구간별
 *   azure-duo     Azure 우즈벡어 음성 + 한국어 음성 — 목소리 두 개. 발음 기준선
 *   azure-multi   Azure 다국어 음성 중 우즈벡어·한국어를 둘 다 읽는 게 있으면 한 목소리로
 *
 * whole 과 split 을 둘 다 듣는 이유: 통째로 읽으면 억양이 자연스럽지만 언어가
 * 섞일 수 있고, 잘라 읽으면 발음은 깨끗하지만 이음새가 뚝뚝 끊길 수 있다.
 * 어느 쪽이 나은지는 업체마다 다르다.
 *
 * ── 키 ──
 *
 * GOOGLE_API_KEY 는 이 앱 .env 에서, OPENAI_API_KEY · AZURE_SPEECH_* 는
 * apps/api/.env 에서 **그 키들만** 읽는다. 키가 없는 후보는 건너뛴다.
 *
 * ── 다시 돌리기 ──
 *
 * 이미 만든 파일은 건너뛴다. 실패한 것만 다시 채워진다. 전부 새로: --force
 *   --only gemini-whole,openai-split   후보 골라서
 *   --lines 1,3                        문장 골라서
 *   --gemini-voice Laomedeia           Gemini 목소리 (기본 Achernar = 서연 선생님)
 *   --no-open                          끝나고 브라우저 안 열기
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { GoogleGenAI, Modality } from '@google/genai';
import { splitByKorean, type Segment } from '../src/segments.js';
import { segmentInstruction as productionSegmentInstruction } from '../src/segment-voices.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP = join(HERE, '..');
/** 결과 폴더. VOICE_SAMPLES_OUT 은 스크립트 검증용 (진짜 결과를 안 덮게) */
const OUT = process.env.VOICE_SAMPLES_OUT ?? join(APP, 'tmp', 'voice-samples');
const API_ENV = join(APP, '..', 'api', '.env');

const argv = process.argv.slice(2);
function flag(name: string): string | undefined {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}
const FORCE = argv.includes('--force');
const ONLY = flag('--only')?.split(',').map((s) => s.trim());
const ONLY_LINES = flag('--lines')?.split(',').map((s) => s.trim());

/** 기본 선생님(서연) 목소리 — 지금 통화에서 듣는 바로 그 목소리 (api/src/tutor/gemini/voices.ts) */
const GEMINI_VOICE = flag('--gemini-voice') ?? 'Achernar';
/** @livekit/agents-plugin-google beta.TTS 의 기본 모델 */
const GEMINI_MODEL = flag('--gemini-model') ?? 'gemini-3.1-flash-tts-preview';
const OPENAI_VOICE = flag('--openai-voice') ?? 'marin';
let openaiModel = flag('--openai-model') ?? 'gpt-4o-mini-tts-2025-12-15';

/**
 * 스크립트 자체 검증용: 모든 요청을 이 주소(가짜 서버)로 보낸다.
 * 평소엔 안 쓴다. 키를 태우지 않고 자르기·이어 붙이기·페이지를 확인할 때만.
 */
const MOCK_BASE = process.env.VOICE_SAMPLES_BASE_URL?.replace(/\/$/, '');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ───────────────────────── 문장 ─────────────────────────

type Lang = 'uz' | 'ru';

const LANGUAGE: Record<Lang, string> = {
  uz: 'Uzbek (Tashkent pronunciation)',
  ru: 'Russian',
};
const LOCALE: Record<Lang, string> = { uz: 'uz-UZ', ru: 'ru-RU' };

interface Line {
  id: string;
  lang: Lang;
  /** 이 문장으로 뭘 듣는지 — 페이지에 보인다 */
  checks: string;
  text: string;
}

/**
 * 실제 수업에서 LLM 이 쓸 모양 그대로. 한국어는 설명 문장 안에 섞여 있다.
 * 5번까지 한 수업의 흐름이다: 인사 → 모국어로 묻기 → 고쳐주기 → 역할극 → 뜻 풀기.
 */
const LINES: Line[] = [
  {
    id: '1',
    lang: 'uz',
    checks: '인사 + 첫 단어. "따라 하세요:" 다음에 한국어',
    text: "Salom! Men sizning koreys tili ustozingizman. Bugun kafeda buyurtma berishni o'rganamiz. Birinchi so'z — 커피. Qani, takrorlang: 커피.",
  },
  {
    id: '2',
    lang: 'uz',
    checks: '모국어로 묻기. 한국어 없음 — 우즈벡어만 얼마나 자연스러운지',
    text: "Endi o'zingiz aytib ko'ring: «Men qahva ichmoqchiman» — buni koreys tilida qanday aytasiz?",
  },
  {
    id: '3',
    lang: 'uz',
    checks: '살짝 틀렸을 때 고쳐주기. 문장 가운데 한국어가 네 번 끼어든다',
    text: "Aa, «저는 커피를 마시고 싶어요» demoqchi edingizmi? Deyarli to'g'ri! Faqat ichimlik haqida «먹다» emas, «마시다» deymiz. Qani, yana bir marta: 저는 커피를 마시고 싶어요.",
  },
  {
    id: '4',
    lang: 'uz',
    checks: '역할극 시작. 설명하다가 점원 대사로 넘어가기',
    text: "Zo'r! Endi men kafe xodimiman, siz esa mijozsiz. Boshladik: 어서 오세요! 뭐 드릴까요?",
  },
  {
    id: '5',
    lang: 'uz',
    checks: '표현 뜻 풀어주기. 긴 한국어 + 짧은 한국어 조각',
    text: "Juda yaxshi! «아이스 아메리카노 한 잔 주세요» — bu yerda «한 잔» «bitta stakan» degani. Endi o'zingiz boshqa ichimlik buyurtma qiling.",
  },
  {
    id: '6',
    lang: 'ru',
    checks: '러시아어 학습자용',
    text: 'Отлично! Теперь скажи по-корейски: «Я хочу пить кофе». Подсказка: «пить» — это 마시다.',
  },
];

// ───────────────────────── 읽기 지시 ─────────────────────────

const TEACHER = 'a warm, friendly Korean teacher';
const NO_EDIT = 'Do not translate, skip or add any words';

function wholeInstruction(lang: Lang): string {
  const l = LANGUAGE[lang];
  return (
    `Read this aloud as ${TEACHER} talking to a student who speaks ${l}. ` +
    `Speak the ${l.split(' ')[0]} parts in natural, native ${l}. ` +
    'Speak every Korean (Hangul) part in clear, native Seoul Korean, a little slower so a learner can follow. ' +
    `Keep one consistent voice. ${NO_EDIT}`
  );
}

/** 구간 읽기 지시는 운영 코드(src/segment-voices.ts)의 것을 그대로 쓴다 — 귀로 고른 소리가 운영에서 나와야 한다 */
const segmentInstruction = (seg: Segment, lang: Lang): string => productionSegmentInstruction(seg, lang);

// ───────────────────────── 오디오 ─────────────────────────

interface Clip {
  pcm: Int16Array;
  rate: number;
  /** 요청 시작 → 첫 오디오 바이트 */
  firstMs: number;
  totalMs: number;
  requests: number;
}

function pcmFromBytes(buf: Buffer): Int16Array {
  const out = new Int16Array(buf.length >> 1);
  for (let i = 0; i < out.length; i++) out[i] = buf.readInt16LE(i * 2);
  return out;
}

function silence(ms: number, rate: number): Int16Array {
  return new Int16Array(Math.round((rate * ms) / 1000));
}

function concat(parts: Int16Array[]): Int16Array {
  const out = new Int16Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

/** 조각 앞뒤의 무음을 걷어낸다. 안 걷으면 이어 붙인 자리마다 쉼이 두 배가 된다 */
function trimSilence(pcm: Int16Array, rate: number): Int16Array {
  const THRESHOLD = 500; // ≈ -36 dBFS
  const pad = Math.round(rate * 0.04);
  let start = 0;
  while (start < pcm.length && Math.abs(pcm[start]) < THRESHOLD) start++;
  let end = pcm.length - 1;
  while (end > start && Math.abs(pcm[end]) < THRESHOLD) end--;
  if (start >= end) return pcm;
  return pcm.slice(Math.max(0, start - pad), Math.min(pcm.length, end + pad));
}

/**
 * 크기를 맞춘다. 큰 소리가 더 좋게 들리는 착각이 있어서, 안 맞추면
 * 발음이 아니라 볼륨으로 고르게 된다.
 */
function normalize(pcm: Int16Array): Int16Array {
  let sum = 0;
  let n = 0;
  let peak = 1;
  for (const s of pcm) {
    const a = Math.abs(s);
    if (a > peak) peak = a;
    if (a > 500) {
      sum += s * s;
      n++;
    }
  }
  if (!n) return pcm;
  const rms = Math.sqrt(sum / n);
  const gain = Math.min(3277 / rms, (0.95 * 32767) / peak); // -20 dBFS, 피크 보호
  const out = new Int16Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) out[i] = Math.round(pcm[i] * gain);
  return out;
}

function toWav(pcm: Int16Array, rate: number): Buffer {
  const data = Buffer.alloc(pcm.length * 2);
  for (let i = 0; i < pcm.length; i++) data.writeInt16LE(pcm[i], i * 2);
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write('WAVE', 8);
  h.write('fmt ', 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // mono
  h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

/** HTTP 응답 본문을 받으면서 첫 바이트 시각을 잰다 */
async function readTimed(res: Response, t0: number): Promise<{ bytes: Buffer; firstMs: number }> {
  if (!res.body) throw new Error('응답 본문이 없다');
  const chunks: Buffer[] = [];
  let firstMs = 0;
  const reader = res.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!firstMs) firstMs = performance.now() - t0;
    chunks.push(Buffer.from(value));
  }
  return { bytes: Buffer.concat(chunks), firstMs };
}

/**
 * 구간별로 합성해서 이어 붙인다. 쉼은 segments.ts 가 정한 대로.
 * 첫 소리 지연 = 첫 구간의 첫 바이트 (나머지는 그게 재생되는 동안 만들면 된다)
 */
async function stitched(
  line: Line,
  synth: (seg: Segment) => Promise<Clip>,
  parallel: boolean,
): Promise<Clip> {
  const segs = splitByKorean(line.text);
  const t0 = performance.now();
  const clips: Clip[] = [];
  if (parallel) clips.push(...(await Promise.all(segs.map(synth))));
  else for (const s of segs) clips.push(await synth(s));

  const rate = clips[0].rate;
  const parts: Int16Array[] = [];
  clips.forEach((c, i) => {
    if (c.rate !== rate) throw new Error(`샘플레이트가 섞였다 (${rate} / ${c.rate})`);
    parts.push(trimSilence(c.pcm, rate));
    if (segs[i].pauseAfterMs) parts.push(silence(segs[i].pauseAfterMs, rate));
  });
  return {
    pcm: concat(parts),
    rate,
    firstMs: clips[0].firstMs,
    totalMs: performance.now() - t0,
    requests: clips.reduce((n, c) => n + c.requests, 0),
  };
}

// ───────────────────────── 에러 · 재시도 ─────────────────────────

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** 다시 해봐야 소용없는 실패 (하루 쿼터 소진 등) */
class FatalError extends Error {}

function statusOf(e: unknown): number | undefined {
  if (typeof e === 'object' && e !== null && 'status' in e && typeof e.status === 'number') {
    return e.status;
  }
  return undefined;
}

function short(e: unknown): string {
  const one = (e instanceof Error ? e.message : String(e)).replace(/\s+/g, ' ').trim();
  return one.length > 220 ? `${one.slice(0, 220)}…` : one;
}

/** "Please retry in 43.3s" / "retryDelay": "43s" */
function retryAfterMs(e: unknown): number | null {
  const text = e instanceof Error ? e.message : String(e);
  const m = /retryDelay\\?"?:\s*\\?"?(\d+)s/.exec(text) ?? /retry in ([\d.]+)s/i.exec(text);
  return m ? Math.ceil(Number(m[1]) * 1000) + 1000 : null;
}

async function withRetry<T>(label: string, fn: () => Promise<T>, on429?: (e: unknown) => void): Promise<T> {
  const TRIES = 4;
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof FatalError) throw e;
      const status = statusOf(e);
      const retryable = status === undefined || status === 429 || status >= 500;
      if (!retryable || attempt >= TRIES) throw e;
      if (status === 429) on429?.(e);
      const wait = status === 429 ? Math.max(retryAfterMs(e) ?? 0, 20_000) : 3_000 * attempt;
      console.log(`    ↻ ${label} — ${Math.round(wait / 1000)}초 뒤 다시 (${status ?? 'network'}: ${short(e).slice(0, 90)})`);
      await sleep(wait);
    }
  }
}

// ───────────────────────── 후보 ─────────────────────────

interface Candidate {
  id: string;
  title: string;
  detail: string;
  /** null 이면 준비 완료, 문자열이면 건너뛴 이유 */
  prepare(): Promise<string | null>;
  make(line: Line): Promise<Clip>;
}

// ── Gemini ──

let gemini: GoogleGenAI | null = null;
/**
 * Gemini 요청 간격. 무료 티어는 TTS 가 분당 3요청이라 429 를 한 번 맞으면
 * 21초 간격으로 바꾼다 (generate-voice-previews.ts 에서 확인된 한도).
 */
let geminiGapMs = 0;
let geminiNextAt = 0;
let geminiDead: string | null = null;

async function geminiSlot(): Promise<void> {
  const now = Date.now();
  const at = Math.max(now, geminiNextAt);
  geminiNextAt = at + geminiGapMs;
  if (at > now) await sleep(at - now);
}

function onGemini429(e: unknown): void {
  const text = short(e);
  if (/per.?day/i.test(text)) {
    geminiDead = 'Gemini 하루 쿼터를 다 썼다 (무료 티어). 내일 다시 돌리거나 결제를 붙여야 한다';
  }
  if (/free_tier/i.test(text) && geminiGapMs < 21_000) {
    geminiGapMs = 21_000;
    console.log('    ⚠️ Gemini 키가 무료 티어다 — TTS 분당 3요청이라 21초 간격으로 간다. 실서비스엔 결제가 필수다');
  }
}

async function geminiSynth(text: string, instruction: string): Promise<Clip> {
  if (!gemini) throw new Error('GOOGLE_API_KEY 없음');
  const client = gemini;
  return withRetry(
    'gemini',
    async () => {
      if (geminiDead) throw new FatalError(geminiDead);
      await geminiSlot();
      const t0 = performance.now();
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 90_000);
      try {
        const stream = await client.models.generateContentStream({
          model: GEMINI_MODEL,
          // beta.TTS 플러그인과 같은 모양: `지시:\n"본문"`
          contents: [{ role: 'user', parts: [{ text: `${instruction}:\n"${text}"` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: GEMINI_VOICE } } },
            abortSignal: ac.signal,
          },
        });
        const chunks: Buffer[] = [];
        let firstMs = 0;
        let rate = 24_000;
        for await (const res of stream) {
          for (const part of res.candidates?.[0]?.content?.parts ?? []) {
            const d = part.inlineData;
            if (!d?.data || !d.mimeType?.startsWith('audio/')) continue;
            if (!firstMs) firstMs = performance.now() - t0;
            const m = /rate=(\d+)/.exec(d.mimeType);
            if (m) rate = Number(m[1]);
            chunks.push(Buffer.from(d.data, 'base64'));
          }
        }
        if (!chunks.length) throw new HttpError(502, '오디오 없이 끝났다 (조용한 실패)');
        return {
          pcm: pcmFromBytes(Buffer.concat(chunks)),
          rate,
          firstMs,
          totalMs: performance.now() - t0,
          requests: 1,
        };
      } finally {
        clearTimeout(timer);
      }
    },
    onGemini429,
  );
}

function geminiCandidate(mode: 'whole' | 'split'): Candidate {
  return {
    id: `gemini-${mode}`,
    title: mode === 'whole' ? 'Gemini TTS · 통째로' : 'Gemini TTS · 구간별 (같은 목소리)',
    detail: `${GEMINI_MODEL} · ${GEMINI_VOICE}`,
    async prepare() {
      const key = process.env.GOOGLE_API_KEY?.trim();
      if (!key) return 'GOOGLE_API_KEY 없음 (apps/tutor-agent/.env)';
      gemini ??= new GoogleGenAI({ apiKey: key, ...(MOCK_BASE ? { httpOptions: { baseUrl: MOCK_BASE } } : {}) });
      return null;
    },
    make(line) {
      if (mode === 'whole') return geminiSynth(line.text, wholeInstruction(line.lang));
      // 무료 티어면 어차피 줄 서야 한다 — 병렬로 쏴봐야 429 만 늘어난다
      return stitched(line, (seg) => geminiSynth(seg.text, segmentInstruction(seg, line.lang)), false);
    },
  };
}

// ── OpenAI ──

let openaiKey: string | undefined;

async function openaiSynth(text: string, instruction: string): Promise<Clip> {
  return withRetry('openai', async () => {
    const t0 = performance.now();
    const res = await fetch(`${MOCK_BASE ?? 'https://api.openai.com'}/v1/audio/speech`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: openaiModel,
        voice: OPENAI_VOICE,
        input: text,
        instructions: `${instruction}.`,
        // 24kHz 16-bit mono little-endian — 헤더 없는 PCM
        response_format: 'pcm',
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      // 날짜 붙은 스냅샷을 못 쓰는 계정이면 별칭으로 한 번 내려간다
      if ((res.status === 400 || res.status === 404) && /model/i.test(body) && openaiModel !== 'gpt-4o-mini-tts') {
        console.log(`    ⚠️ ${openaiModel} 못 씀 → gpt-4o-mini-tts 로 바꾼다`);
        openaiModel = 'gpt-4o-mini-tts';
        throw new HttpError(503, 'model fallback');
      }
      throw new HttpError(res.status, `openai ${res.status}: ${body}`);
    }
    const { bytes, firstMs } = await readTimed(res, t0);
    return { pcm: pcmFromBytes(bytes), rate: 24_000, firstMs, totalMs: performance.now() - t0, requests: 1 };
  });
}

function openaiCandidate(mode: 'whole' | 'split'): Candidate {
  const cand: Candidate = {
    id: `openai-${mode}`,
    title: mode === 'whole' ? 'OpenAI TTS · 통째로' : 'OpenAI TTS · 구간별 (같은 목소리)',
    detail: `${openaiModel} · ${OPENAI_VOICE}`,
    async prepare() {
      openaiKey = process.env.OPENAI_API_KEY?.trim();
      return openaiKey ? null : 'OPENAI_API_KEY 없음 (apps/api/.env)';
    },
    async make(line) {
      const clip =
        mode === 'whole'
          ? await openaiSynth(line.text, wholeInstruction(line.lang))
          : await stitched(line, (seg) => openaiSynth(seg.text, segmentInstruction(seg, line.lang)), true);
      cand.detail = `${openaiModel} · ${OPENAI_VOICE}`; // 별칭으로 내려갔으면 그게 보이게
      return clip;
    },
  };
  return cand;
}

// ── Azure ──

/** api/src/tutor/tts/azure-tutor-tts.provider.ts 의 endpoint() 와 같은 규칙 */
function azureSynthEndpoint(): string | null {
  if (MOCK_BASE) return `${MOCK_BASE}/azure/synth`;
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

/** api/src/tts/tts.service.ts 의 resolveVoiceListEndpoint() 와 같은 규칙 */
function azureVoicesEndpoint(): string | null {
  if (MOCK_BASE) return `${MOCK_BASE}/azure/voices`;
  const region = process.env.AZURE_SPEECH_REGION?.trim();
  const custom = process.env.AZURE_SPEECH_ENDPOINT?.trim();
  if (custom) {
    try {
      const url = new URL(custom);
      if (url.hostname.endsWith('.api.cognitive.microsoft.com') || url.hostname.endsWith('.tts.speech.microsoft.com')) {
        return `https://${region ?? url.hostname.split('.')[0]}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
      }
      url.pathname = '/tts/cognitiveservices/voices/list';
      url.search = '';
      return url.toString().replace(/\/$/, '');
    } catch {
      return null;
    }
  }
  return region ? `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list` : null;
}

function escapeXml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function azureSynth(ssml: string): Promise<Clip> {
  const endpoint = azureSynthEndpoint();
  const key = process.env.AZURE_SPEECH_KEY?.trim();
  if (!endpoint || !key) throw new Error('AZURE_SPEECH_* 없음');
  return withRetry('azure', async () => {
    const t0 = performance.now();
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'raw-24khz-16bit-mono-pcm',
        'User-Agent': 'korio-voice-samples',
      },
      body: ssml,
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) {
      throw new HttpError(res.status, `azure ${res.status}: ${await res.text().catch(() => '')}`);
    }
    const { bytes, firstMs } = await readTimed(res, t0);
    return { pcm: pcmFromBytes(bytes), rate: 24_000, firstMs, totalMs: performance.now() - t0, requests: 1 };
  });
}

/** 설명 언어별 Azure 음성 (api/src/tts/tts.service.ts 의 VOICES 와 같은 여성 음성) */
const AZURE_NATIVE: Record<Lang, string> = { uz: 'uz-UZ-MadinaNeural', ru: 'ru-RU-SvetlanaNeural' };
const AZURE_KOREAN = 'ko-KR-SunHiNeural';

function azureDuoCandidate(): Candidate {
  return {
    id: 'azure-duo',
    title: 'Azure · 목소리 두 개 (우즈벡어 음성 + 한국어 음성)',
    detail: `${AZURE_NATIVE.uz} + ${AZURE_KOREAN} (러시아어 줄은 ${AZURE_NATIVE.ru})`,
    async prepare() {
      return azureSynthEndpoint() && process.env.AZURE_SPEECH_KEY?.trim()
        ? null
        : 'AZURE_SPEECH_KEY / REGION 없음 (apps/api/.env)';
    },
    make(line) {
      // SSML 한 장에 목소리를 갈아 끼운다 — 요청 하나, 이음새는 Azure 가 만든다
      const body = splitByKorean(line.text)
        .map((s) => `<voice name="${s.lang === 'ko' ? AZURE_KOREAN : AZURE_NATIVE[line.lang]}">${escapeXml(s.text)}</voice>`)
        .join('');
      return azureSynth(
        `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${LOCALE[line.lang]}">${body}</speak>`,
      );
    },
  };
}

interface AzureVoice {
  ShortName: string;
  Locale: string;
  Gender?: string;
  SecondaryLocaleList?: string[];
}

function azureMultiCandidate(): Candidate {
  let voice: AzureVoice | null = null;
  const speaks = (v: AzureVoice, locale: string) =>
    v.Locale === locale || (v.SecondaryLocaleList ?? []).includes(locale);
  const cand: Candidate = {
    id: 'azure-multi',
    title: 'Azure · 다국어 음성 한 개',
    detail: '(음성 목록에서 찾는다)',
    async prepare() {
      const endpoint = azureVoicesEndpoint();
      const key = process.env.AZURE_SPEECH_KEY?.trim();
      if (!endpoint || !key) return 'AZURE_SPEECH_KEY / REGION 없음 (apps/api/.env)';
      const res = await fetch(endpoint, {
        headers: { 'Ocp-Apim-Subscription-Key': key },
        signal: AbortSignal.timeout(20_000),
      });
      if (!res.ok) return `음성 목록 실패 (${res.status})`;
      const all = (await res.json()) as AzureVoice[];
      // 한 목소리로 우즈벡어·한국어를 둘 다 읽는 다국어 음성. 여성 · 한국어 원어민 음성 우선
      const fits = all
        .filter((v) => /Multilingual/i.test(v.ShortName))
        .filter((v) => speaks(v, 'uz-UZ') && speaks(v, 'ko-KR'))
        .sort(
          (a, b) =>
            Number(b.Gender === 'Female') - Number(a.Gender === 'Female') ||
            Number(b.Locale === 'ko-KR') - Number(a.Locale === 'ko-KR') ||
            Number(speaks(b, 'ru-RU')) - Number(speaks(a, 'ru-RU')),
        );
      voice = fits[0] ?? null;
      if (!voice) {
        const multi = all.filter((v) => /Multilingual/i.test(v.ShortName)).length;
        return `다국어 음성 ${multi}개 중 우즈벡어를 읽는 게 없다`;
      }
      cand.detail = `${voice.ShortName} (맞는 음성 ${fits.length}개 중)`;
      return null;
    },
    make(line) {
      if (!voice) throw new Error('음성 없음');
      // 한 목소리 안에서 <lang> 으로 언어만 바꾼다
      const body = splitByKorean(line.text)
        .map((s) => `<lang xml:lang="${s.lang === 'ko' ? 'ko-KR' : LOCALE[line.lang]}">${escapeXml(s.text)}</lang>`)
        .join(' ');
      return azureSynth(
        `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${LOCALE[line.lang]}">` +
          `<voice name="${escapeXml(voice.ShortName)}">${body}</voice></speak>`,
      );
    },
  };
  return cand;
}

// ───────────────────────── 실행 ─────────────────────────

/** apps/api/.env 에서 **이 키들만** 읽는다. 값은 어디에도 찍지 않는다 */
function loadApiEnv(keys: string[]): void {
  if (!existsSync(API_ENV)) return;
  for (const raw of readFileSync(API_ENV, 'utf8').split(/\r?\n/)) {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(raw);
    if (!m || !keys.includes(m[1]) || process.env[m[1]]) continue;
    let v = m[2].trim();
    if (/^(['"]).*\1$/.test(v)) v = v.slice(1, -1);
    else v = v.replace(/\s+#.*$/, '');
    process.env[m[1]] = v;
  }
}

interface ClipMeta {
  ok: boolean;
  file?: string;
  error?: string;
  firstMs?: number;
  totalMs?: number;
  seconds?: number;
  requests?: number;
}

interface Results {
  generatedAt: string;
  /** 후보 id → 가린 이름 (A, B, …). 다시 돌려도 안 바뀐다 */
  blind: Record<string, string>;
  candidates: Record<string, { title: string; detail: string; skipped?: string }>;
  clips: Record<string, ClipMeta>;
}

function loadResults(): Results {
  const file = join(OUT, 'results.json');
  if (existsSync(file)) {
    try {
      return JSON.parse(readFileSync(file, 'utf8')) as Results;
    } catch {
      // 깨졌으면 새로 만든다
    }
  }
  return { generatedAt: '', blind: {}, candidates: {}, clips: {} };
}

function assignBlind(results: Results, ids: string[]): void {
  const used = new Set(Object.values(results.blind));
  const free = 'ABCDEFGHIJ'
    .slice(0, Math.max(ids.length, used.size))
    .split('')
    .filter((l) => !used.has(l));
  // 순서로 짐작 못 하게 섞는다
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [free[i], free[j]] = [free[j], free[i]];
  }
  for (const id of ids) if (!results.blind[id]) results.blind[id] = free.shift() ?? id;
}

async function main(): Promise<void> {
  loadApiEnv(['OPENAI_API_KEY', 'AZURE_SPEECH_KEY', 'AZURE_SPEECH_REGION', 'AZURE_SPEECH_ENDPOINT']);
  mkdirSync(OUT, { recursive: true });

  const all: Candidate[] = [
    geminiCandidate('whole'),
    geminiCandidate('split'),
    openaiCandidate('whole'),
    openaiCandidate('split'),
    azureDuoCandidate(),
    azureMultiCandidate(),
  ];
  const candidates = ONLY ? all.filter((c) => ONLY.includes(c.id)) : all;
  const lines = ONLY_LINES ? LINES.filter((l) => ONLY_LINES.includes(l.id)) : LINES;

  const results = loadResults();
  assignBlind(results, all.map((c) => c.id));

  console.log('후보 준비…');
  const ready: Candidate[] = [];
  for (const c of candidates) {
    let skip: string | null;
    try {
      skip = await c.prepare();
    } catch (e) {
      skip = short(e);
    }
    results.candidates[c.id] = { title: c.title, detail: c.detail, ...(skip ? { skipped: skip } : {}) };
    console.log(skip ? `  · ${c.id} 건너뜀 — ${skip}` : `  ✔ ${c.id} — ${c.detail}`);
    if (!skip) ready.push(c);
  }

  console.log(`\n합성 시작 — 후보 ${ready.length}개 × 문장 ${lines.length}개`);
  // 업체끼리는 동시에, 한 후보 안에서는 한 줄씩 (쿼터 보호)
  await Promise.all(
    ready.map(async (c) => {
      mkdirSync(join(OUT, c.id), { recursive: true });
      for (const line of lines) {
        const key = `${c.id}/${line.id}`;
        const file = `${c.id}/${line.id}.wav`;
        if (!FORCE && existsSync(join(OUT, file)) && results.clips[key]?.ok) {
          console.log(`  · ${key} 이미 있음`);
          continue;
        }
        try {
          const clip = await c.make(line);
          const pcm = normalize(trimSilence(clip.pcm, clip.rate));
          writeFileSync(join(OUT, file), toWav(pcm, clip.rate));
          results.clips[key] = {
            ok: true,
            file,
            firstMs: Math.round(clip.firstMs),
            totalMs: Math.round(clip.totalMs),
            seconds: Math.round((pcm.length / clip.rate) * 10) / 10,
            requests: clip.requests,
          };
          console.log(
            `  ✔ ${key}  첫 소리 ${(clip.firstMs / 1000).toFixed(2)}s · 전체 ${(clip.totalMs / 1000).toFixed(2)}s`,
          );
        } catch (e) {
          results.clips[key] = { ok: false, error: short(e) };
          console.log(`  ✖ ${key} — ${short(e)}`);
        }
      }
      results.candidates[c.id].detail = c.detail;
    }),
  );

  results.generatedAt = new Date().toISOString();
  writeFileSync(join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  const page = join(OUT, 'index.html');
  writeFileSync(page, renderPage(results));

  const metas = Object.values(results.clips);
  const fails = metas.filter((m) => !m.ok).length;
  console.log(`\n완료 — 파일 ${metas.length - fails}개 · 실패 ${fails}개`);
  if (fails) console.log('실패한 것만 다시 채우기: pnpm --filter tutor-agent voice:samples');
  console.log(`\n듣기 페이지 → ${page}`);
  if (!argv.includes('--no-open')) openInBrowser(page);
}

function openInBrowser(file: string): void {
  const [cmd, args]: [string, string[]] =
    process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', file]]
      : process.platform === 'darwin'
        ? ['open', [file]]
        : ['xdg-open', [file]];
  try {
    // 못 열어도 그만이다 — 위에 경로가 찍혀 있다
    spawn(cmd, args, { detached: true, stdio: 'ignore' }).on('error', () => undefined).unref();
  } catch {
    /* 무시 */
  }
}

function renderPage(results: Results): string {
  const data = { lines: LINES, results };
  // </script> 로 페이지가 깨지지 않게
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return PAGE.replace('/*DATA*/null', () => json);
}

// ───────────────────────── 듣기 페이지 ─────────────────────────

const PAGE = String.raw`<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>튜터 목소리 블라인드 테스트</title>
<style>
  :root {
    --bg: #f6f5fb; --card: #ffffff; --ink: #1d1b2c; --muted: #6b6883; --line: #e4e1f2;
    --primary: #776ee2; --primary-deep: #5a52c4; --primary-soft: #eeecfc;
    --ko: #0f7b6c; --ko-soft: #e2f4f1; --bad: #c2410c; --bad-soft: #fdeee4;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #14131c; --card: #1d1c28; --ink: #ecebf5; --muted: #a09db6; --line: #2d2b3d;
      --primary: #8f87ee; --primary-deep: #6c64d6; --primary-soft: #2a2745;
      --ko: #4fd1bb; --ko-soft: #173330; --bad: #fb923c; --bad-soft: #3a2518;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink);
    font: 15px/1.55 system-ui, -apple-system, "Segoe UI", "Malgun Gothic", sans-serif; }
  main { max-width: 1180px; margin: 0 auto; padding: 28px 16px 80px; }
  h1 { font-size: 24px; margin: 0 0 6px; }
  .lead { color: var(--muted); margin: 0 0 16px; }
  .criteria { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;
    margin: 0 0 26px; padding: 0; list-style: none; }
  .criteria li { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; font-size: 14px; }
  .criteria b { color: var(--primary); margin-right: 4px; }
  section.line { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 18px; margin-bottom: 18px; }
  .line-head { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
  .num { background: var(--primary); color: #fff; border-radius: 8px; padding: 1px 9px; font-weight: 700; }
  .checks { color: var(--muted); font-size: 14px; }
  .text { font-size: 17px; margin: 10px 0 14px; }
  .text .ko { background: var(--ko-soft); color: var(--ko); border-radius: 6px; padding: 0 4px; font-weight: 600; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
  .tile { border: 2px solid var(--line); border-radius: 14px; padding: 10px 12px; transition: border-color .15s, background .15s; }
  .tile.best { border-color: var(--primary); background: var(--primary-soft); }
  .tile-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .letter { font-weight: 800; font-size: 18px; }
  .who { display: none; font-size: 12px; color: var(--muted); margin-top: 6px; }
  body.revealed .who { display: block; }
  audio { width: 100%; height: 36px; }
  label.pick { display: flex; gap: 6px; align-items: center; cursor: pointer; font-weight: 600; font-size: 14px; }
  .flags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .flag { border: 1px solid var(--line); background: transparent; color: var(--muted); border-radius: 999px;
    padding: 2px 10px; font-size: 12.5px; cursor: pointer; font-family: inherit; }
  .flag.on { border-color: var(--bad); background: var(--bad-soft); color: var(--bad); font-weight: 600; }
  .fail { color: var(--bad); font-size: 13px; word-break: break-word; }
  .overall { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 18px; }
  .overall h2 { margin: 0 0 10px; font-size: 18px; }
  .choices { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .choices label { border: 2px solid var(--line); border-radius: 10px; padding: 6px 14px; cursor: pointer; font-weight: 700; }
  .choices input { margin-right: 6px; }
  textarea { width: 100%; min-height: 70px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg);
    color: var(--ink); padding: 10px; font: inherit; }
  button.main { margin-top: 12px; background: var(--primary); color: #fff; border: 0; border-bottom: 4px solid var(--primary-deep);
    border-radius: 12px; padding: 12px 20px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit; }
  button.main:active { transform: translateY(2px); border-bottom-width: 2px; }
  #summary { display: none; margin-top: 14px; min-height: 220px; font-family: ui-monospace, Consolas, monospace; font-size: 13px; }
  body.revealed #summary { display: block; }
  #copied { display: none; color: var(--ko); font-weight: 600; margin-left: 10px; }
  table.map { display: none; border-collapse: collapse; margin-top: 14px; width: 100%; font-size: 14px; }
  body.revealed table.map { display: table; }
  table.map td, table.map th { border-bottom: 1px solid var(--line); padding: 6px 8px; text-align: left; vertical-align: top; }
</style>
</head>
<body>
<main>
  <h1>튜터 목소리 블라인드 테스트</h1>
  <p class="lead">업체 이름은 가려놨다. 줄마다 A~F 를 들어보고 제일 자연스러운 하나를 골라. 거슬리는 데가 있으면
    그 칸의 버튼으로 표시. 다 고르면 맨 아래 <b>결과 만들기</b> → 나온 글을 채팅에 붙여줘 (자동으로 복사된다).</p>
  <ul class="criteria">
    <li><b>①</b>우즈벡어가 현지인처럼 들리나</li>
    <li><b>②</b>한국어 발음이 깨끗한가 (우즈벡어 억양이 안 섞였나)</li>
    <li><b>③</b>한 사람이 말하는 것처럼 이어지나</li>
    <li><b>④</b>언어 넘어갈 때 끊기거나 튀지 않나</li>
  </ul>
  <div id="lines"></div>
  <div class="overall">
    <h2>전체적으로 제일 좋은 건?</h2>
    <div class="choices" id="overall"></div>
    <textarea id="notes" placeholder="하고 싶은 말 (예: B 는 우즈벡어는 좋은데 한국어가 외국인 같다)"></textarea>
    <button class="main" id="reveal">결과 만들기 (이름 공개)</button><span id="copied">복사됨 — 채팅에 붙여넣기</span>
    <table class="map" id="map"></table>
    <textarea id="summary" readonly></textarea>
  </div>
</main>
<script>
const DATA = /*DATA*/null;
const R = DATA.results;
const ids = Object.keys(R.blind).filter((id) => R.candidates[id]).sort((a, b) => R.blind[a].localeCompare(R.blind[b]));
const FLAGS = ['우즈벡어 어색', '한국어 어색', '끊김·튐', '말 빠짐/더함'];
const state = { best: {}, flags: {}, overall: null };
const HANGUL_RUN = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]+(?:[\s,.!?]+[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]+)*[.!?]?/g;

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function sec(ms) { return ms == null ? '-' : (ms / 1000).toFixed(2) + 's'; }

const root = document.getElementById('lines');
for (const line of DATA.lines) {
  const s = document.createElement('section');
  s.className = 'line';
  s.innerHTML = '<div class="line-head"><span class="num">' + line.id + '</span><span class="checks">' + esc(line.checks) +
    '</span></div><div class="text">' + esc(line.text).replace(HANGUL_RUN, (m) => '<span class="ko">' + m + '</span>') +
    '</div><div class="grid"></div>';
  const grid = s.querySelector('.grid');
  for (const id of ids) {
    const c = R.candidates[id];
    const meta = R.clips[id + '/' + line.id];
    const ok = !c.skipped && meta && meta.ok;
    const t = document.createElement('div');
    t.className = 'tile';
    let body;
    if (c.skipped) body = '<div class="fail">건너뜀 — ' + esc(c.skipped) + '</div>';
    else if (!meta) body = '<div class="fail">아직 안 만듦</div>';
    else if (!meta.ok) body = '<div class="fail">실패 — ' + esc(meta.error || '') + '</div>';
    else body = '<audio controls preload="none" src="' + esc(meta.file) + '"></audio><div class="flags">' +
      FLAGS.map((f) => '<button class="flag" data-f="' + esc(f) + '">' + esc(f) + '</button>').join('') + '</div>';
    t.innerHTML = '<div class="tile-head"><span class="letter">' + R.blind[id] + '</span>' +
      (ok ? '<label class="pick"><input type="radio" name="best-' + line.id + '" value="' + id + '">이게 제일 좋다</label>' : '') +
      '</div>' + body + '<div class="who">' + esc(c.title) + '<br>' + esc(c.detail) +
      (ok ? '<br>첫 소리 ' + sec(meta.firstMs) + ' · 전체 ' + sec(meta.totalMs) + ' · 요청 ' + meta.requests + '번' : '') + '</div>';
    const radio = t.querySelector('input');
    if (radio) radio.addEventListener('change', () => {
      state.best[line.id] = id;
      grid.querySelectorAll('.tile').forEach((x) => x.classList.remove('best'));
      t.classList.add('best');
    });
    t.querySelectorAll('.flag').forEach((b) => b.addEventListener('click', () => {
      b.classList.toggle('on');
      state.flags[id + '/' + line.id] = [...t.querySelectorAll('.flag.on')].map((x) => x.dataset.f);
    }));
    // 하나 틀면 나머지는 멈춘다 — 두 개가 겹치면 비교가 안 된다
    const audio = t.querySelector('audio');
    if (audio) audio.addEventListener('play', () => {
      document.querySelectorAll('audio').forEach((a) => { if (a !== audio) a.pause(); });
    });
    grid.appendChild(t);
  }
  root.appendChild(s);
}

const overall = document.getElementById('overall');
for (const id of ids) {
  if (R.candidates[id].skipped) continue;
  const l = document.createElement('label');
  l.innerHTML = '<input type="radio" name="overall" value="' + id + '">' + R.blind[id];
  l.querySelector('input').addEventListener('change', () => { state.overall = id; });
  overall.appendChild(l);
}

document.getElementById('reveal').addEventListener('click', () => {
  document.body.classList.add('revealed');
  document.getElementById('map').innerHTML = '<tr><th>이름</th><th>정체</th><th>평균 첫 소리</th></tr>' + ids.map((id) => {
    const c = R.candidates[id];
    const ms = DATA.lines.map((l) => R.clips[id + '/' + l.id]).filter((m) => m && m.ok).map((m) => m.firstMs);
    const avg = ms.length ? ms.reduce((a, b) => a + b, 0) / ms.length : null;
    return '<tr><td><b>' + R.blind[id] + '</b></td><td>' + esc(c.title) + '<br><small>' + esc(c.detail) + '</small>' +
      (c.skipped ? '<br><small>건너뜀: ' + esc(c.skipped) + '</small>' : '') + '</td><td>' + sec(avg) + '</td></tr>';
  }).join('');
  const name = (id) => R.blind[id] + ' = ' + id;
  const out = ['[목소리 테스트 결과]'];
  out.push('전체 1등: ' + (state.overall ? name(state.overall) : '(안 고름)'));
  for (const line of DATA.lines) out.push(line.id + '번 1등: ' + (state.best[line.id] ? name(state.best[line.id]) : '(안 고름)'));
  const flagged = Object.entries(state.flags).filter(([, v]) => v.length);
  if (flagged.length) {
    out.push('표시한 문제:');
    for (const [k, v] of flagged) {
      const [id, n] = k.split('/');
      out.push('  ' + n + '번 ' + name(id) + ': ' + v.join(', '));
    }
  }
  const notes = document.getElementById('notes').value.trim();
  if (notes) out.push('메모: ' + notes);
  const summary = document.getElementById('summary');
  summary.value = out.join('\n');
  summary.select();
  // 복사는 되면 좋고, 안 되면 선택된 글을 직접 복사하면 된다
  const done = () => { document.getElementById('copied').style.display = 'inline'; };
  const fallback = () => { try { if (document.execCommand && document.execCommand('copy')) done(); } catch (e) {} };
  try {
    navigator.clipboard.writeText(summary.value).then(done, fallback);
  } catch (e) {
    fallback();
  }
});
</script>
</body>
</html>`;

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
