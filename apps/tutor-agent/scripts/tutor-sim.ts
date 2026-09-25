/**
 * 튜터 두뇌(글) 자동 시험 — 가짜 학습자와 대화시키고 채점관이 채점한다.
 *
 *   pnpm --filter tutor-agent tutor:sim
 *   → apps/tutor-agent/tmp/tutor-sim/latest.md  (보고서)
 *     apps/tutor-agent/tmp/tutor-sim/latest.json (원자료)
 *
 * ── 왜 ──
 *
 * 새 튜터는 STT → LLM(글) → TTS(소리) 다. 수업이 자연스러운지·매번 똑같은지·
 * 학습자를 기다리는지·틀렸을 때 제대로 고쳐주는지는 전부 **LLM 이 쓰는 글**에서
 * 정해진다. 그 부분만 떼어 글로 시험하면 폰 통화 없이 몇 분 만에 수십 판을
 * 돌려볼 수 있다. 프롬프트를 고칠 때마다 이걸 한 번 돌리고 보고서를 본다.
 *
 * ── 누가 누구와 ──
 *
 *   튜터    운영과 **같은 프롬프트** (api 의 buildTutorInstructions, koreanVoice
 *           'text') + 같은 모델 설정. 여기서 따로 쓰면 시험이 운영을 대변 못 한다.
 *   학습자  AI 가 연기한다. 매 턴 **무슨 행동을 할지는 스크립트가 정한다**
 *           (살짝 틀리기 / 모른다 / 모국어로 대답 / 섞어 말하기 / 질문 / 침묵 …).
 *           모델에게 맡기면 늘 모범생이 돼서 시험이 안 된다.
 *   채점관  대화가 끝나면 다른 AI 가 루브릭으로 채점한다 (기본 Claude —
 *           튜터와 다른 회사 모델이라야 제 식구 감싸기가 없다).
 *   기계검사 기호·ㅋㅋ·질문 두 개·너무 긴 턴 같은 건 코드가 직접 센다.
 *   다양성   같은 설정을 여러 판 돌려 한국어 표현이 얼마나 겹치는지 잰다
 *           ("매번 똑같은 수업" 을 숫자로).
 *
 * ── 옵션 ──
 *
 *   --only uz-lesson-cafe,ru-lesson-directions   시나리오 골라서
 *   --repeat 2        같은 설정 몇 판 (다양성 측정은 2 이상)
 *   --turns 8         튜터 발화 몇 번까지
 *   --variants text,native   프롬프트 변형 비교 (text = 새 파이프라인용, native = 옛 Live 프롬프트)
 *   --model gemini-3.5-flash --thinking low --temperature 1
 *   --judge claude|gemini|none   --judge-model <이름>
 *   --concurrency 3
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { GoogleGenAI, ThinkingLevel, Type, type Content } from '@google/genai';
import { OPENING_DIRECTIVE } from '../src/config.js';
import { splitByKorean } from '../src/segments.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP = join(HERE, '..');
/** 결과 폴더. TUTOR_SIM_OUT 은 스크립트 검증용 (진짜 결과를 안 덮게) */
const OUT = process.env.TUTOR_SIM_OUT ?? join(APP, 'tmp', 'tutor-sim');
const API_ENV = join(APP, '..', 'api', '.env');
const API_TUTOR = new URL('../../api/src/tutor/', import.meta.url);

// ───────────────────────── 옵션 ─────────────────────────

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const listArg = (name: string) =>
  arg(name)
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const ONLY = listArg('only');
const REPEAT = Math.max(1, Number(arg('repeat') ?? 2));
const TURNS = Math.max(2, Number(arg('turns') ?? 8));
const VARIANTS = listArg('variants') ?? ['text'];
const MODEL = arg('model') ?? 'gemini-3.5-flash';
const THINKING = (arg('thinking') ?? 'low').toLowerCase();
const TEMPERATURE = Number(arg('temperature') ?? 1);
const LEARNER_MODEL = arg('learner-model') ?? MODEL;
const CONCURRENCY = Math.max(1, Number(arg('concurrency') ?? 3));
const JUDGE_ARG = arg('judge');
const JUDGE_MODEL_ARG = arg('judge-model');
const SEED = Number(arg('seed') ?? Date.now() % 100000);

/**
 * 스크립트 자체 검증용: Gemini · Claude 요청을 전부 이 주소(가짜 서버)로 보낸다.
 * 평소엔 안 쓴다. 키를 태우지 않고 흐름·보고서만 확인할 때.
 */
const MOCK_BASE = process.env.TUTOR_SIM_BASE_URL?.replace(/\/$/, '');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ───────────────────────── 운영 코드에서 가져오는 것 ─────────────────────────

type Level = 'beginner' | 'intermediate' | 'advanced';
type Lang = 'uz' | 'ru' | 'en';

interface LearnerContextLike {
  koreanLevel: Level;
  nativeLanguage: string;
  weakPoints: string[];
  recentVocabulary: string[];
  interests: string[];
  nickname?: string;
  topicProgress?: number;
  spokenMistakes?: { corrected: string; type: string }[];
  mistakeHabits?: string[];
  lastSession?: { topicTitle?: string; daysAgo: number };
}

type BuildTutorInstructions = (
  learner: LearnerContextLike,
  mode: string,
  scene: string | undefined,
  topic: unknown,
  teacher: unknown,
  addressStyle: string,
  koreanVoice: string,
) => string;

interface TopicLike {
  id: string;
  title: { en: string };
  targetExpressions: string[];
}
interface TeacherLike {
  id: string;
  personality: string;
}

/** api 는 CommonJS 라 tsx 로 불러오면 named export 가 default 아래로 갈 수 있다 */
async function load(path: string): Promise<Record<string, unknown>> {
  const mod: Record<string, unknown> = await import(new URL(path, API_TUTOR).href);
  const inner = mod.default;
  return inner && typeof inner === 'object' ? { ...(inner as Record<string, unknown>), ...mod } : mod;
}

function need<T>(mod: Record<string, unknown>, name: string, ok: (v: unknown) => boolean): T {
  const v = mod[name];
  if (!ok(v)) throw new Error(`api 모듈에서 ${name} 을 못 찾았다`);
  return v as T;
}

async function loadApi() {
  const prompt = await load('prompt/build-instructions.ts');
  const teachers = await load('teachers/tutor-teachers.ts');
  const topics = await load('topics/tutor-topics.ts');
  return {
    build: need<BuildTutorInstructions>(prompt, 'buildTutorInstructions', (v) => typeof v === 'function'),
    teachers: need<TeacherLike[]>(teachers, 'TUTOR_TEACHERS', Array.isArray),
    topics: need<TopicLike[]>(topics, 'TUTOR_TOPICS', Array.isArray),
  };
}
type Api = Awaited<ReturnType<typeof loadApi>>;

// ───────────────────────── 시나리오 ─────────────────────────

interface Scenario {
  id: string;
  /** 보고서에 보일 한 줄 — 이 판으로 뭘 보려는지 */
  why: string;
  lang: Lang;
  level: Level;
  mode: 'lesson' | 'rolePlay' | 'freeTalk' | 'review' | 'pronunciation';
  topic?: string;
  scene?: string;
  teacher: string;
  address: 'casual' | 'polite';
  learner?: Partial<LearnerContextLike>;
}

/**
 * Kai 가 실기기에서 겪은 문제를 하나씩 겨냥한다.
 * cafe 가 여러 번 나오는 건 일부러다 — 실기기 테스트가 거의 cafe 였다.
 */
const SCENARIOS: Scenario[] = [
  {
    id: 'uz-lesson-cafe',
    why: '실기기에서 제일 많이 본 판. 우즈벡어로 묻고 기다리나, 살짝 틀리면 고쳐주나',
    lang: 'uz',
    level: 'beginner',
    mode: 'lesson',
    topic: 'cafe',
    teacher: 'yuna',
    address: 'casual',
  },
  {
    id: 'uz-lesson-clinic',
    why: '카페가 아닌 주제에서도 커피·공항(프롬프트 예시)이 새어 나오나',
    lang: 'uz',
    level: 'beginner',
    mode: 'lesson',
    topic: 'clinic',
    teacher: 'seoyeon',
    address: 'polite',
  },
  {
    id: 'uz-lesson-free',
    why: '주제 없이 시작하면 무엇을 가르치나 (매번 같은 걸 고르나)',
    lang: 'uz',
    level: 'beginner',
    mode: 'lesson',
    teacher: 'minjun',
    address: 'casual',
  },
  {
    id: 'uz-roleplay-restaurant',
    why: '역할극 — 직원 대사(한국어)와 도움말(우즈벡어)이 섞이는 제일 어려운 판',
    lang: 'uz',
    level: 'beginner',
    mode: 'rolePlay',
    topic: 'restaurant',
    scene: 'restaurant',
    teacher: 'jiwoo',
    address: 'casual',
  },
  {
    id: 'uz-freetalk-intermediate',
    why: '중급 자유대화 — 한국어 비중이 늘어도 자연스러운가',
    lang: 'uz',
    level: 'intermediate',
    mode: 'freeTalk',
    teacher: 'yuna',
    address: 'casual',
    learner: { interests: ['football', 'cooking'], nickname: 'Aziz' },
  },
  {
    id: 'uz-review-mistakes',
    why: '지난 수업 오답을 기억해서 다시 꺼내나',
    lang: 'uz',
    level: 'beginner',
    mode: 'review',
    teacher: 'seoyeon',
    address: 'polite',
    learner: {
      spokenMistakes: [
        { corrected: '물을 마시고 싶어요', type: 'vocabulary' },
        { corrected: '학교에 가요', type: 'particle' },
      ],
      mistakeHabits: ['particle'],
      recentVocabulary: ['물', '학교', '버스', '지하철'],
      lastSession: { topicTitle: 'Getting around', daysAgo: 2 },
    },
  },
  {
    id: 'ru-lesson-directions',
    why: '러시아어 학습자 — 같은 규칙이 러시아어로도 서나',
    lang: 'ru',
    level: 'beginner',
    mode: 'lesson',
    topic: 'directions',
    teacher: 'minjun',
    address: 'casual',
  },
];

// ───────────────────────── 키 · 재시도 ─────────────────────────

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

function statusOf(e: unknown): number | undefined {
  if (typeof e === 'object' && e !== null && 'status' in e && typeof e.status === 'number') return e.status;
  return undefined;
}

function short(e: unknown): string {
  const one = (e instanceof Error ? e.message : String(e)).replace(/\s+/g, ' ').trim();
  return one.length > 240 ? `${one.slice(0, 240)}…` : one;
}

function retryAfterMs(e: unknown): number | null {
  const text = e instanceof Error ? e.message : String(e);
  const m = /retryDelay\\?"?:\s*\\?"?(\d+)s/.exec(text) ?? /retry in ([\d.]+)s/i.exec(text);
  return m ? Math.ceil(Number(m[1]) * 1000) + 1000 : null;
}

let freeTierWarned = false;

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const TRIES = 5;
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (e) {
      const status = statusOf(e);
      const retryable = status === undefined || status === 429 || status >= 500;
      if (!retryable || attempt >= TRIES) throw e;
      if (status === 429 && /free_tier/i.test(short(e)) && !freeTierWarned) {
        freeTierWarned = true;
        console.log('  ⚠️ Gemini 무료 티어 한도에 걸렸다 — 느리게 간다. 실서비스엔 결제가 필수다');
      }
      const wait = status === 429 ? Math.max(retryAfterMs(e) ?? 0, 15_000) : 2_000 * attempt;
      console.log(`    ↻ ${label} ${Math.round(wait / 1000)}초 뒤 다시 (${status ?? 'network'}: ${short(e).slice(0, 80)})`);
      await sleep(wait);
    }
  }
}

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

// ───────────────────────── 튜터 (운영과 같은 설정) ─────────────────────────

let gemini: GoogleGenAI;

const THINKING_LEVELS: Record<string, ThinkingLevel> = {
  minimal: ThinkingLevel.MINIMAL,
  low: ThinkingLevel.LOW,
  medium: ThinkingLevel.MEDIUM,
  high: ThinkingLevel.HIGH,
};

interface TutorReply {
  text: string;
  /** 요청 → 첫 글자. 음성에서는 이게 "말 시작까지 걸리는 시간" 의 대부분이다 */
  firstMs: number;
  totalMs: number;
  inputTokens: number;
  cachedTokens: number;
  outputTokens: number;
  thoughtTokens: number;
}

async function tutorReply(system: string, history: Content[]): Promise<TutorReply> {
  return withRetry('tutor', async () => {
    const t0 = performance.now();
    const level = THINKING_LEVELS[THINKING];
    const stream = await gemini.models.generateContentStream({
      model: MODEL,
      contents: history,
      config: {
        systemInstruction: system,
        temperature: TEMPERATURE,
        maxOutputTokens: 1024,
        ...(level ? { thinkingConfig: { thinkingLevel: level } } : {}),
      },
    });
    let text = '';
    let firstMs = 0;
    let usage: TutorReply = {
      text: '',
      firstMs: 0,
      totalMs: 0,
      inputTokens: 0,
      cachedTokens: 0,
      outputTokens: 0,
      thoughtTokens: 0,
    };
    for await (const chunk of stream) {
      for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
        if (part.thought || !part.text) continue;
        if (!firstMs) firstMs = performance.now() - t0;
        text += part.text;
      }
      const u = chunk.usageMetadata;
      if (u) {
        usage = {
          ...usage,
          inputTokens: u.promptTokenCount ?? usage.inputTokens,
          cachedTokens: u.cachedContentTokenCount ?? usage.cachedTokens,
          outputTokens: u.candidatesTokenCount ?? usage.outputTokens,
          thoughtTokens: u.thoughtsTokenCount ?? usage.thoughtTokens,
        };
      }
    }
    if (!text.trim()) throw new HttpError(502, '튜터가 빈 답을 냈다');
    return { ...usage, text: text.trim(), firstMs, totalMs: performance.now() - t0 };
  });
}

// ───────────────────────── 가짜 학습자 ─────────────────────────

type Behavior =
  | 'correct'
  | 'slight_error'
  | 'dont_know'
  | 'native_answer'
  | 'mixed'
  | 'ask'
  | 'off_topic'
  | 'silence';

const LANG_NAME: Record<Lang, string> = { uz: 'Uzbek', ru: 'Russian', en: 'English' };

/**
 * 행동 비율. 모범답안만 내는 학습자로는 "틀렸을 때" 를 시험할 수가 없다.
 * 초급은 틀리고 막히는 비율이 높고, 중급은 질문·잡담이 늘어난다.
 */
const WEIGHTS: Record<Level, [Behavior, number][]> = {
  beginner: [
    ['correct', 28],
    ['slight_error', 26],
    ['dont_know', 10],
    ['native_answer', 9],
    ['mixed', 10],
    ['ask', 9],
    ['off_topic', 3],
    ['silence', 5],
  ],
  intermediate: [
    ['correct', 32],
    ['slight_error', 24],
    ['dont_know', 5],
    ['native_answer', 5],
    ['mixed', 12],
    ['ask', 10],
    ['off_topic', 8],
    ['silence', 4],
  ],
  advanced: [
    ['correct', 45],
    ['slight_error', 25],
    ['mixed', 5],
    ['ask', 10],
    ['off_topic', 15],
  ],
};

const BEHAVIOR_HOW: Record<Exclude<Behavior, 'silence'>, (lang: string) => string> = {
  correct: () => 'Do what the tutor asked, correctly and briefly (a beginner-sized answer).',
  slight_error: (l) =>
    'Do what the tutor asked but make exactly ONE small, realistic mistake a ' +
    `${l} speaker makes: wrong particle (을/를, 이/가, 은/는, 에/에서), a wrong but related verb ` +
    '(먹다 for a drink, 가다/오다), dropping 요, the dictionary form instead of a polite ending, ' +
    'wrong tense, or one misremembered syllable. Keep it close to right.',
  dont_know: (l) => `You don't know or forgot. Say so briefly in ${l} (maybe ask for a hint).`,
  native_answer: (l) => `Answer only in ${l}, even if Korean was asked for.`,
  mixed: (l) => `Answer in ${l} with one or two Korean words mixed in, the way learners do.`,
  ask: (l) => `Ask the tutor one short question in ${l} about a word or phrase you just heard (what it means, or why).`,
  off_topic: (l) => `Say something personal or a bit off-topic in ${l} (tired, a busy day, a question about the tutor).`,
};

function makeRng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

function pickBehavior(level: Level, rnd: () => number): Behavior {
  const table = WEIGHTS[level];
  const total = table.reduce((n, [, w]) => n + w, 0);
  let x = rnd() * total;
  for (const [b, w] of table) {
    if ((x -= w) < 0) return b;
  }
  return 'correct';
}

function learnerSystem(sc: Scenario): string {
  const l = LANG_NAME[sc.lang];
  const level =
    sc.level === 'beginner'
      ? 'Beginner: you can read Hangul and know about a hundred words (greetings, 네/아니요, ' +
        '감사합니다, numbers, basic food and places). You make very short sentences and often get endings or particles wrong.'
      : sc.level === 'intermediate'
        ? 'Intermediate: you hold simple conversations, use past tense and -고 싶어요, but still slip on particles and honorifics.'
        : 'Advanced: fluent in everyday Korean with occasional unnatural phrasing.';
  return [
    `You are role-playing a real ${l}-speaking learner of Korean in a live VOICE lesson with an AI Korean tutor.`,
    `Your Korean: ${level}`,
    '',
    'You SPEAK, you do not type. Write exactly what a speech recognizer would transcribe:',
    `- Korean in Hangul, ${l} in its normal script. No quotes, no emojis, no stage directions.`,
    '- Short, like real speech: usually 1 to 10 words.',
    '- Never be a perfect student, never explain that you are role-playing, never speak for the tutor.',
    '',
    'Each turn you are given a BEHAVIOR. Perform it if it fits what the tutor just said.',
    "If it clearly doesn't fit (for example the tutor only said hello), answer naturally and report did = \"natural\".",
    'Reply as JSON: {"said": "...", "did": "<the behavior you actually performed>"}.',
  ].join('\n');
}

interface Turn {
  who: 'tutor' | 'learner';
  text: string;
  /** 학습자: 스크립트가 시킨 행동 / 실제로 한 행동 */
  asked?: Behavior;
  did?: string;
  reply?: TutorReply;
}

async function learnerSays(sc: Scenario, turns: Turn[], behavior: Behavior): Promise<{ said: string; did: string }> {
  if (behavior === 'silence') return { said: '(silence)', did: 'silence' };
  const l = LANG_NAME[sc.lang];
  const recent = turns
    .slice(-10)
    .map((t) => `${t.who === 'tutor' ? 'Tutor' : 'You'}: ${t.text}`)
    .join('\n');
  const prompt = `${recent}\n\nBEHAVIOR for your next turn: ${behavior} — ${BEHAVIOR_HOW[behavior](l)}\nNow say your next turn.`;
  return withRetry('learner', async () => {
    const res = await gemini.models.generateContent({
      model: LEARNER_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: learnerSystem(sc),
        temperature: 1,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: { said: { type: Type.STRING }, did: { type: Type.STRING } },
          required: ['said', 'did'],
        },
      },
    });
    const raw = res.text ?? '';
    try {
      const j = JSON.parse(raw) as { said?: string; did?: string };
      if (!j.said?.trim()) throw new Error('빈 대사');
      return { said: j.said.trim(), did: j.did?.trim() || behavior };
    } catch {
      throw new HttpError(502, `학습자 JSON 이 깨졌다: ${raw.slice(0, 120)}`);
    }
  });
}

// ───────────────────────── 기계 검사 (모델 없이 코드가 센다) ─────────────────────────

const ROMANIZED =
  /\b(annyeong|haseyo|kamsa|gamsa|hamnida|juseyo|imnida|saranghae|mashisseo|chingu|keopi|masigo|sipeoyo|isseoyo|eopseoyo|ieyo|yeyo)\w*/i;
const LABEL = /^\s*(Teacher|Tutor|Learner|Student|O['‘ʻ]?qituvchi|Ustoz|Учитель|Ученик|Преподаватель)\s*:/im;

/** 말로 몇 초쯤 걸리나 — 대략. 한글 한 음절 0.2초, 설명 언어 한 낱말 0.38초 */
function speechSeconds(text: string): number {
  let sec = 0;
  for (const seg of splitByKorean(text)) {
    if (seg.lang === 'ko') sec += (seg.text.match(/[가-힣]/g)?.length ?? 0) * 0.2;
    else sec += seg.text.split(/\s+/).filter(Boolean).length * 0.38;
    sec += seg.pauseAfterMs / 1000;
  }
  return Math.round(sec * 10) / 10;
}

function mechanical(text: string): string[] {
  const flags: string[] = [];
  if (/[*#_`\[\]{}()<>|~]/.test(text) || /^\s*[-•·]\s/m.test(text) || /\p{Extended_Pictographic}/u.test(text)) {
    flags.push('기호');
  }
  if (/[ㅋㅎ]{2,}|[ㅠㅜ]{2,}/.test(text)) flags.push('ㅋㅋ');
  if (LABEL.test(text)) flags.push('라벨');
  if (ROMANIZED.test(text)) flags.push('로마자');
  if (/\d+\s?(잔|개|시|명|살|번|분|장|권|마리|병|층)/.test(text)) flags.push('숫자+단위');
  const segs = splitByKorean(text);
  const nativeQuestions = segs.filter((s) => s.lang === 'native').reduce((n, s) => n + (s.text.match(/\?/g)?.length ?? 0), 0);
  if (nativeQuestions >= 2) flags.push('질문 여러 개');
  // 마지막 설명 언어 질문 **뒤에** 한국어가 또 나오면 → 자기가 묻고 자기가 답했을 가능성.
  // 단 "…demoqchi edingizmi? Qani, yana bir marta: 저는…" 처럼 콜론으로 따라 하기를
  // 시킨 뒤의 한국어는 답이 아니라 따라 할 문장이다 — 그건 빼고 센다.
  let lastQ = -1;
  segs.forEach((s, i) => {
    if (s.lang === 'native' && s.text.includes('?')) lastQ = i;
  });
  if (lastQ >= 0) {
    const after = segs.slice(lastQ + 1);
    // 질문 뒤 같은 조각 안에서 콜론으로 끝나는 경우도 있다: "…edingizmi? Qani, yana bir marta:"
    const tailOfQ = segs[lastQ].text.slice(segs[lastQ].text.lastIndexOf('?') + 1);
    const cue = /:\s*$/.test(tailOfQ) || after.some((s) => s.lang === 'native' && /:\s*$/.test(s.text));
    const answer = after.some((s) => s.lang === 'ko' && (s.text.match(/[가-힣]/g)?.length ?? 0) >= 4);
    if (answer && !cue) flags.push('자문자답?');
  }
  if (speechSeconds(text) > 14) flags.push('김');
  return flags;
}

// ───────────────────────── 한 판 ─────────────────────────

interface RunResult {
  scenario: Scenario;
  variant: string;
  rep: number;
  promptChars: number;
  turns: Turn[];
  error?: string;
  judge?: JudgeResult;
  judgeError?: string;
}

function learnerContext(sc: Scenario): LearnerContextLike {
  return {
    koreanLevel: sc.level,
    nativeLanguage: sc.lang,
    weakPoints: [],
    recentVocabulary: [],
    interests: [],
    topicProgress: 0,
    ...sc.learner,
  };
}

function buildPrompt(api: Api, sc: Scenario, variant: string): { prompt: string; topic?: TopicLike } {
  const teacher = api.teachers.find((t) => t.id === sc.teacher);
  const topic = sc.topic ? api.topics.find((t) => t.id === sc.topic) : undefined;
  if (!teacher) throw new Error(`선생님 ${sc.teacher} 이 없다`);
  if (sc.topic && !topic) throw new Error(`주제 ${sc.topic} 가 없다`);
  const koreanVoice = variant === 'native' ? 'native' : 'text';
  const prompt = api.build(learnerContext(sc), sc.mode, sc.scene, topic, teacher, sc.address, koreanVoice);
  return { prompt, topic };
}

async function runConversation(api: Api, sc: Scenario, variant: string, rep: number, seed: number): Promise<RunResult> {
  const { prompt } = buildPrompt(api, sc, variant);
  const rnd = makeRng(seed);
  const turns: Turn[] = [];
  /**
   * 운영(AgentSession + google.LLM)이 Gemini 에 보내는 모양을 그대로 흉내 낸다:
   *  - 첫 인사: generateReply({ instructions }) 는 지시를 **시스템 프롬프트 뒤에
   *    붙이고**, 대화가 비어 있으니 플러그인이 가짜 user "." 를 끼운다
   *    (@livekit/agents llm/provider_format/google.js 의 injectDummyUserMessage).
   *  - 그 뒤: 대화는 model(첫 인사) 로 시작하고 user/model 이 번갈아 붙는다.
   */
  const history: Content[] = [];
  const result: RunResult = { scenario: sc, variant, rep, promptChars: prompt.length, turns };
  try {
    for (let t = 1; t <= TURNS; t++) {
      const reply =
        t === 1
          ? await tutorReply(`${prompt}\n${OPENING_DIRECTIVE}`, [{ role: 'user', parts: [{ text: '.' }] }])
          : await tutorReply(prompt, history);
      turns.push({ who: 'tutor', text: reply.text, reply });
      history.push({ role: 'model', parts: [{ text: reply.text }] });
      if (t === TURNS) break;
      const asked = pickBehavior(sc.level, rnd);
      const { said, did } = await learnerSays(sc, turns, asked);
      turns.push({ who: 'learner', text: said, asked, did });
      history.push({ role: 'user', parts: [{ text: said }] });
    }
  } catch (e) {
    result.error = short(e);
  }
  return result;
}

// ───────────────────────── 채점관 ─────────────────────────

const SCORE_KEYS = [
  'teaching_language',
  'korean_quality',
  'native_naturalness',
  'turn_taking',
  'error_handling',
  'engagement',
  'progression',
  'speech_ready',
] as const;
type ScoreKey = (typeof SCORE_KEYS)[number];

const SCORE_LABEL: Record<ScoreKey, string> = {
  teaching_language: '설명 언어',
  korean_quality: '한국어 품질',
  native_naturalness: '모국어 자연스러움',
  turn_taking: '턴 넘기기',
  error_handling: '교정',
  engagement: '사람 같음',
  progression: '진도',
  speech_ready: '소리 적합',
};

interface JudgeIssue {
  turn: string;
  code: string;
  quote?: string;
  why?: string;
}

interface JudgeResult {
  model: string;
  scores: Partial<Record<ScoreKey, number>>;
  issues: JudgeIssue[];
  best_moment?: { turn: string; why: string };
  verdict?: string;
  fixes?: string[];
}

const JUDGE_SYSTEM = `You are a strict senior reviewer of AI Korean tutors. A voice tutor app for Uzbek,
Russian and English speakers is being tested. The tutor's text is read aloud by one TTS voice
(Hangul → Korean pronunciation, other letters → the learner's language). The learner's lines
come from speech recognition. Learner behaviors were scripted on purpose (mistakes, silence,
questions) to test the tutor — judge only the TUTOR.

What the product owner wants:
- Explanations, reactions and questions in the learner's language; Korean for the material itself.
- Natural and varied like a real human teacher — not scripted, not the same moves every turn.
- Asks the learner to produce Korean ("How do you say … in Korean?") in the learner's language, then WAITS.
- When the learner is slightly wrong: recast warmly ("Oh, you meant «…»?"), at most one short reason,
  and let them say it once more. Never ignore a mistake, never lecture.
- Short turns (about 3–10 seconds of speech). One question per turn. Never answer its own question.
- Korean to repeat stands in its own sentence. No symbols, emojis, romanization, labels, brackets.
- Lesson content comes from the selected topic and the learner — not from generic stock examples
  (coffee/커피, airport/공항, Gangnam/강남, movies/영화 showing up where the topic doesn't call for them).

Score each dimension 1–5 (5 = a great human teacher would do this; 3 = acceptable but clearly AI;
1 = broken): teaching_language, korean_quality, native_naturalness, turn_taking, error_handling,
engagement, progression, speech_ready.

List concrete issues with the turn id (T1, T2 …). Codes:
SELF_ANSWER, MULTI_QUESTION, NO_WAIT, TOO_LONG, MISSED_ERROR, NO_RETRY, HARSH, WRONG_LANGUAGE,
KOREAN_ERROR, NATIVE_UNNATURAL, IGNORED_LEARNER, REPETITIVE, OFF_TOPIC, STOCK_EXAMPLE, NOT_SPEAKABLE, OTHER.
Quote the exact words. Be strict — list every real issue, but do not invent issues.

Write "why", "verdict" and "fixes" in KOREAN (the owner reads Korean). "fixes" = up to 3
concrete changes to the tutor's instructions that would fix the worst problems.

Return ONLY JSON:
{"scores":{"teaching_language":n,...},"issues":[{"turn":"T3","code":"...","quote":"...","why":"..."}],
 "best_moment":{"turn":"T2","why":"..."},"verdict":"...","fixes":["..."]}`;

function transcriptForJudge(r: RunResult, topic?: TopicLike): string {
  const sc = r.scenario;
  const head = [
    `Teaching language: ${LANG_NAME[sc.lang]} · learner level: ${sc.level} · mode: ${sc.mode}` +
      (topic ? ` · topic: ${topic.title.en} (targets: ${topic.targetExpressions.join(', ')})` : ' · topic: none selected') +
      (sc.scene ? ` · roleplay scene: ${sc.scene}` : '') +
      ` · teacher persona: ${sc.teacher} · tutor speaks to learner: ${sc.address}`,
    '',
  ];
  let t = 0;
  let l = 0;
  for (const turn of r.turns) {
    if (turn.who === 'tutor') head.push(`[T${++t}] TUTOR: ${turn.text}`);
    else head.push(`[L${++l}] LEARNER (scripted: ${turn.asked}; performed: ${turn.did}): ${turn.text}`);
  }
  return head.join('\n');
}

function parseJson(text: string): unknown {
  const a = text.indexOf('{');
  const b = text.lastIndexOf('}');
  if (a < 0 || b <= a) throw new Error(`JSON 이 없다: ${text.slice(0, 120)}`);
  return JSON.parse(text.slice(a, b + 1));
}

type JudgeKind = 'claude' | 'gemini' | 'none';
let judgeKind: JudgeKind = 'none';
let judgeModel = '';

async function judge(r: RunResult, topic?: TopicLike): Promise<JudgeResult> {
  const content = transcriptForJudge(r, topic);
  const raw = await withRetry('judge', async () => {
    if (judgeKind === 'claude') {
      const res = await fetch(`${MOCK_BASE ?? 'https://api.anthropic.com'}/v1/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: judgeModel,
          max_tokens: 4000,
          system: JUDGE_SYSTEM,
          messages: [{ role: 'user', content }],
        }),
        signal: AbortSignal.timeout(180_000),
      });
      if (!res.ok) throw new HttpError(res.status, `claude ${res.status}: ${await res.text().catch(() => '')}`);
      const j = (await res.json()) as { content?: { type: string; text?: string }[] };
      return (j.content ?? []).filter((b) => b.type === 'text').map((b) => b.text ?? '').join('');
    }
    const res = await gemini.models.generateContent({
      model: judgeModel,
      contents: [{ role: 'user', parts: [{ text: content }] }],
      config: { systemInstruction: JUDGE_SYSTEM, responseMimeType: 'application/json' },
    });
    return res.text ?? '';
  });
  const j = parseJson(raw) as Omit<JudgeResult, 'model'>;
  return {
    model: judgeModel,
    scores: j.scores ?? {},
    issues: Array.isArray(j.issues) ? j.issues : [],
    best_moment: j.best_moment,
    verdict: j.verdict,
    fixes: Array.isArray(j.fixes) ? j.fixes : [],
  };
}

// ───────────────────────── 다양성 ─────────────────────────

const HANGUL_SYL = /[가-힣]/g;

/** 튜터가 들려준 한국어 구절들 (문장부호 뺀 모양) */
function koreanPhrases(r: RunResult): Set<string> {
  const set = new Set<string>();
  for (const t of r.turns) {
    if (t.who !== 'tutor') continue;
    for (const s of splitByKorean(t.text)) {
      if (s.lang !== 'ko') continue;
      const norm = s.text.replace(/[^가-힣\s]/g, '').replace(/\s+/g, ' ').trim();
      if ((norm.match(HANGUL_SYL)?.length ?? 0) >= 2) set.add(norm);
    }
  }
  return set;
}

function koreanWords(r: RunResult): Set<string> {
  const set = new Set<string>();
  for (const p of koreanPhrases(r)) for (const w of p.split(' ')) if (w.length >= 2) set.add(w);
  return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size && !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function meanPairwise(sets: Set<string>[]): number | null {
  const vals: number[] = [];
  for (let i = 0; i < sets.length; i++) for (let j = i + 1; j < sets.length; j++) vals.push(jaccard(sets[i], sets[j]));
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

/** 프롬프트 예시에서 온 단골 소재 */
const STOCK_WORDS = ['커피', '마시', '아메리카노', '공항', '강남', '영화'];

function stockHits(r: RunResult): string[] {
  const hits: string[] = [];
  for (const t of r.turns) if (t.who === 'tutor') for (const w of STOCK_WORDS) if (t.text.includes(w)) hits.push(w);
  return hits;
}

// ───────────────────────── 보고서 ─────────────────────────

const pct = (xs: number[], p: number) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
const f1 = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : '-');
const sec = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

function scoreAvg(j?: JudgeResult): number {
  if (!j) return NaN;
  return avg(SCORE_KEYS.map((k) => j.scores[k]).filter((v): v is number => typeof v === 'number'));
}

function tutorTurns(r: RunResult): Turn[] {
  return r.turns.filter((t) => t.who === 'tutor');
}

function oneLine(text: string): string {
  return text.replace(/\s*\n\s*/g, ' ⏎ ');
}

function renderReport(runs: RunResult[], meta: Record<string, string>): string {
  const out: string[] = [];
  out.push('# 튜터 두뇌 시험 결과', '');
  for (const [k, v] of Object.entries(meta)) out.push(`- ${k}: ${v}`);
  out.push('');

  // 변형별 한눈에
  out.push('## 한눈에 (프롬프트 변형별)', '');
  out.push(`| 변형 | 판 | 평균 | ${SCORE_KEYS.map((k) => SCORE_LABEL[k]).join(' | ')} | 기계 경고/턴 | 첫 글자 p50 · p90 |`);
  out.push(`|${'---|'.repeat(SCORE_KEYS.length + 5)}`);
  for (const v of VARIANTS) {
    const rs = runs.filter((r) => r.variant === v);
    const judged = rs.filter((r) => r.judge);
    const per = SCORE_KEYS.map((k) => f1(avg(judged.map((r) => r.judge?.scores[k]).filter((x): x is number => typeof x === 'number'))));
    const tts = rs.flatMap(tutorTurns);
    const flags = tts.reduce((n, t) => n + mechanical(t.text).length, 0);
    const firsts = tts.map((t) => t.reply?.firstMs ?? 0).filter((x) => x > 0);
    out.push(
      `| ${v} | ${rs.length} | **${f1(avg(judged.map((r) => scoreAvg(r.judge))))}** | ${per.join(' | ')} | ${
        tts.length ? (flags / tts.length).toFixed(2) : '-'
      } | ${sec(pct(firsts, 50))} · ${sec(pct(firsts, 90))} |`,
    );
  }
  out.push('');

  // 시나리오별
  out.push('## 시나리오별', '');
  out.push('| 시나리오 | 변형 | 평균 | 한국어 겹침 (구절 · 낱말) | 단골 소재 | 한 줄 평 |');
  out.push('|---|---|---|---|---|---|');
  for (const sc of SCENARIOS) {
    for (const v of VARIANTS) {
      const rs = runs.filter((r) => r.scenario.id === sc.id && r.variant === v);
      if (!rs.length) continue;
      const ok = rs.filter((r) => !r.error);
      const phrase = meanPairwise(ok.map(koreanPhrases));
      const word = meanPairwise(ok.map(koreanWords));
      const stock = [...new Set(rs.flatMap(stockHits))];
      const verdict = rs.find((r) => r.judge?.verdict)?.judge?.verdict ?? rs.find((r) => r.error)?.error ?? '';
      out.push(
        `| ${sc.id} | ${v} | ${f1(avg(rs.map((r) => scoreAvg(r.judge)).filter(Number.isFinite)))} | ${
          phrase === null ? '-' : `${Math.round(phrase * 100)}% · ${Math.round((word ?? 0) * 100)}%`
        } | ${stock.join(', ') || '-'} | ${verdict.replace(/\|/g, '/')} |`,
      );
    }
  }
  out.push('', '겹침: 같은 설정 판끼리 튜터가 쓴 한국어가 얼마나 같은지 (높을수록 "매번 똑같은 수업").', '');

  // 자주 나온 문제
  const issues = runs.flatMap((r) =>
    (r.judge?.issues ?? []).map((i) => ({ ...i, where: `${r.scenario.id}·${r.variant}·${r.rep}` })),
  );
  const byCode = new Map<string, typeof issues>();
  for (const i of issues) byCode.set(i.code, [...(byCode.get(i.code) ?? []), i]);
  out.push('## 자주 나온 문제 (채점관)', '');
  if (!byCode.size) out.push('(없음 — 또는 채점을 안 했다)');
  for (const [code, list] of [...byCode.entries()].sort((a, b) => b[1].length - a[1].length)) {
    out.push(`- **${code}** ×${list.length}`);
    for (const i of list.slice(0, 3)) out.push(`  - ${i.where} ${i.turn}: "${i.quote ?? ''}" — ${i.why ?? ''}`);
  }
  out.push('');

  // 기계 경고
  const mech = new Map<string, string[]>();
  for (const r of runs) {
    tutorTurns(r).forEach((t, i) => {
      for (const f of mechanical(t.text)) mech.set(f, [...(mech.get(f) ?? []), `${r.scenario.id}·${r.variant}·${r.rep} T${i + 1}`]);
    });
  }
  out.push('## 기계 검사 경고', '');
  if (!mech.size) out.push('(없음)');
  for (const [f, where] of [...mech.entries()].sort((a, b) => b[1].length - a[1].length)) {
    out.push(`- **${f}** ×${where.length} — ${where.slice(0, 6).join(', ')}${where.length > 6 ? ' …' : ''}`);
  }
  out.push('');

  // 수정 제안
  out.push('## 채점관이 제안한 수정', '');
  for (const r of runs) {
    for (const fx of r.judge?.fixes ?? []) out.push(`- (${r.scenario.id}·${r.variant}·${r.rep}) ${fx}`);
  }
  out.push('');

  // 대화 전문
  out.push('## 대화 전문', '');
  for (const r of runs) {
    out.push(`### ${r.scenario.id} · ${r.variant} · ${r.rep}판 — 평균 ${f1(scoreAvg(r.judge))}`, '');
    out.push(`> ${r.scenario.why}`, '');
    let t = 0;
    let l = 0;
    for (const turn of r.turns) {
      if (turn.who === 'tutor') {
        const flags = mechanical(turn.text);
        out.push(
          `**T${++t} 튜터** (${sec(turn.reply?.firstMs ?? 0)}): ${oneLine(turn.text)}${flags.length ? `  ⚠️ ${flags.join(', ')}` : ''}`,
          '',
        );
      } else {
        out.push(`*L${++l} 학습자 [${turn.asked}${turn.did && turn.did !== turn.asked ? ` → ${turn.did}` : ''}]*: ${oneLine(turn.text)}`, '');
      }
    }
    if (r.error) out.push(`❌ 중단: ${r.error}`, '');
    if (r.judge) {
      out.push(`채점 (${r.judge.model}): ${SCORE_KEYS.map((k) => `${SCORE_LABEL[k]} ${r.judge?.scores[k] ?? '-'}`).join(' · ')}`, '');
      for (const i of r.judge.issues) out.push(`- ${i.turn} **${i.code}** "${i.quote ?? ''}" — ${i.why ?? ''}`);
      if (r.judge.best_moment) out.push(`- 👍 ${r.judge.best_moment.turn}: ${r.judge.best_moment.why}`);
      if (r.judge.verdict) out.push(`- 한 줄 평: ${r.judge.verdict}`);
      out.push('');
    } else if (r.judgeError) {
      out.push(`채점 실패: ${r.judgeError}`, '');
    }
  }
  return out.join('\n');
}

// ───────────────────────── 실행 ─────────────────────────

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>): Promise<void> {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

function pickJudge(): void {
  const want = (JUDGE_ARG ?? (process.env.ANTHROPIC_API_KEY ? 'claude' : 'gemini')) as JudgeKind;
  if (want === 'claude') {
    const model = JUDGE_MODEL_ARG ?? process.env.ANTHROPIC_MODEL?.trim();
    if (process.env.ANTHROPIC_API_KEY && model) {
      judgeKind = 'claude';
      judgeModel = model;
      return;
    }
    console.log('  · Claude 채점관을 못 쓴다 (ANTHROPIC_API_KEY / ANTHROPIC_MODEL 없음) → Gemini 로 채점');
  }
  if (want === 'none') {
    judgeKind = 'none';
    return;
  }
  judgeKind = 'gemini';
  judgeModel = JUDGE_MODEL_ARG ?? 'gemini-3-pro-preview';
}

/**
 * 본게임 전에 모델 이름·키가 맞는지 한 번씩 찔러본다.
 * 모델 이름 하나 틀린 걸 수십 판 돌린 뒤에 알면 Kai 시간만 버린다.
 */
async function preflight(): Promise<void> {
  const models = [...new Set([MODEL, LEARNER_MODEL, ...(judgeKind === 'gemini' ? [judgeModel] : [])])];
  for (const model of models) {
    try {
      await gemini.models.generateContent({ model, contents: 'ping', config: { maxOutputTokens: 16 } });
    } catch (e) {
      if (statusOf(e) === 429) continue; // 한도는 본게임에서 기다리면 된다
      throw new Error(`Gemini 모델 ${model} 을 못 쓴다 — ${short(e)}\n  --model / --learner-model 로 바꿔서 다시 돌려라`);
    }
  }
  if (judgeKind === 'claude') {
    const res = await fetch(`${MOCK_BASE ?? 'https://api.anthropic.com'}/v1/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ model: judgeModel, max_tokens: 16, messages: [{ role: 'user', content: 'ping' }] }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok && res.status !== 429) {
      const body = (await res.text().catch(() => '')).slice(0, 200);
      console.log(`  · Claude 채점관(${judgeModel})을 못 쓴다 (${res.status}: ${body}) → Gemini 로 채점`);
      judgeKind = 'gemini';
      judgeModel = JUDGE_MODEL_ARG && JUDGE_ARG === 'gemini' ? JUDGE_MODEL_ARG : 'gemini-3-pro-preview';
    }
  }
}

async function main(): Promise<void> {
  loadApiEnv(['ANTHROPIC_API_KEY', 'ANTHROPIC_MODEL']);
  const key = process.env.GOOGLE_API_KEY?.trim();
  if (!key) throw new Error('GOOGLE_API_KEY 가 없다 (apps/tutor-agent/.env)');
  gemini = new GoogleGenAI({ apiKey: key, ...(MOCK_BASE ? { httpOptions: { baseUrl: MOCK_BASE } } : {}) });
  if (THINKING !== 'off' && !THINKING_LEVELS[THINKING]) throw new Error(`--thinking 은 minimal|low|medium|high|off: ${THINKING}`);
  pickJudge();

  await preflight();
  const api = await loadApi();
  const scenarios = ONLY ? SCENARIOS.filter((s) => ONLY.includes(s.id)) : SCENARIOS;
  if (!scenarios.length) throw new Error(`시나리오가 없다. 있는 것: ${SCENARIOS.map((s) => s.id).join(', ')}`);

  const jobs = scenarios.flatMap((sc, si) =>
    VARIANTS.flatMap((v) => Array.from({ length: REPEAT }, (_, k) => ({ sc, v, rep: k + 1, seed: SEED + si * 1000 + k * 17 }))),
  );
  console.log(
    `튜터 ${MODEL} (thinking ${THINKING}, temp ${TEMPERATURE}) · 학습자 ${LEARNER_MODEL} · 채점 ${judgeKind}${judgeModel ? ` ${judgeModel}` : ''}`,
  );
  console.log(`시나리오 ${scenarios.length} × 변형 ${VARIANTS.length} × ${REPEAT}판 = ${jobs.length}판, 판마다 튜터 ${TURNS}턴 · 동시 ${CONCURRENCY}\n`);

  const runs: RunResult[] = [];
  const started = performance.now();
  await pool(jobs, CONCURRENCY, async ({ sc, v, rep, seed }) => {
    const r = await runConversation(api, sc, v, rep, seed);
    const { topic } = buildPrompt(api, sc, v);
    if (judgeKind !== 'none' && tutorTurns(r).length >= 2) {
      try {
        r.judge = await judge(r, topic);
      } catch (e) {
        r.judgeError = short(e);
      }
    }
    runs.push(r);
    const firsts = tutorTurns(r).map((t) => t.reply?.firstMs ?? 0);
    console.log(
      `  ${r.error ? '✖' : '✔'} ${sc.id} · ${v} · ${rep}판 — 튜터 ${tutorTurns(r).length}턴 · 첫 글자 p50 ${sec(pct(firsts, 50))}` +
        (r.judge ? ` · 채점 ${f1(scoreAvg(r.judge))}` : r.judgeError ? ` · 채점 실패 (${r.judgeError.slice(0, 60)})` : '') +
        (r.error ? ` · 중단: ${r.error.slice(0, 100)}` : ''),
    );
  });

  // 보고서는 시나리오 → 변형 → 판 순서로
  runs.sort(
    (a, b) =>
      SCENARIOS.indexOf(a.scenario) - SCENARIOS.indexOf(b.scenario) ||
      VARIANTS.indexOf(a.variant) - VARIANTS.indexOf(b.variant) ||
      a.rep - b.rep,
  );

  const tokens = runs.flatMap(tutorTurns).map((t) => t.reply);
  const meta: Record<string, string> = {
    시각: new Date().toISOString(),
    튜터: `${MODEL} · thinking ${THINKING} · temperature ${TEMPERATURE}`,
    학습자: LEARNER_MODEL,
    채점관: judgeKind === 'none' ? '(없음)' : `${judgeKind} ${judgeModel}`,
    규모: `${runs.length}판 × 튜터 ${TURNS}턴 · seed ${SEED}`,
    '프롬프트 길이': VARIANTS.map((v) => `${v} ${runs.find((r) => r.variant === v)?.promptChars ?? '-'}자`).join(' · '),
    토큰: `입력 ${tokens.reduce((n, t) => n + (t?.inputTokens ?? 0), 0).toLocaleString()} (캐시 ${tokens
      .reduce((n, t) => n + (t?.cachedTokens ?? 0), 0)
      .toLocaleString()}) · 출력 ${tokens.reduce((n, t) => n + (t?.outputTokens ?? 0), 0).toLocaleString()} · 생각 ${tokens
      .reduce((n, t) => n + (t?.thoughtTokens ?? 0), 0)
      .toLocaleString()}`,
    걸린시간: `${Math.round((performance.now() - started) / 1000)}초`,
  };

  mkdirSync(OUT, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const md = renderReport(runs, meta);
  writeFileSync(join(OUT, `${stamp}.md`), md);
  writeFileSync(join(OUT, `${stamp}.json`), JSON.stringify({ meta, runs }, null, 2));
  copyFileSync(join(OUT, `${stamp}.md`), join(OUT, 'latest.md'));
  copyFileSync(join(OUT, `${stamp}.json`), join(OUT, 'latest.json'));
  console.log(`\n보고서 → ${join(OUT, 'latest.md')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
