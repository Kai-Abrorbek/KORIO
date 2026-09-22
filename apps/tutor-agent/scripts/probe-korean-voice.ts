/**
 * say_korean 도구 호출 실험.
 *
 * 실기기 한 바퀴(배포 → 폰 → 로그)를 돌지 않고, **운영과 같은 프롬프트·같은
 * 도구 선언**으로 Gemini Live 에 직접 붙어서 "모델이 한국어를 도구로 내는가" 를
 * 잰다. 선생님 대사는 오디오 자막(outputTranscription)으로 받는다.
 *
 * 실행 (레포 루트, Windows 터미널):
 *
 *   pnpm --filter tutor-agent probe:voice                       (전부 비교, uz·lesson)
 *   pnpm --filter tutor-agent probe:voice -- --only split --mode lesson,rolePlay --lang uz,ru --repeat 2
 *
 *   --only    실험 id (쉼표로 여러 개)          기본: 전부
 *   --mode    lesson,rolePlay                  기본: lesson
 *   --lang    uz,ru,en                         기본: uz
 *   --repeat  같은 조합을 몇 번 (모델은 매번 다르게 답한다)   기본: 1
 *   --concurrency 동시에 여는 세션 수          기본: 2
 *   --model   Live 모델                        기본: GEMINI_LIVE_MODEL
 *
 * 결과: apps/tutor-agent/tmp/probe/latest.md (표) + 시각별 폴더에 원본 json.
 *
 * ── 실험 ──
 *
 *   head         지난 커밋(c73eabe) 프롬프트 — 예시 줄 사이에 "→ say_korean(…)"
 *                → 실기기 실패(도구 0회, 표기를 소리 냄)를 재현하면 실험을 믿어도 된다
 *   tail-first   운영 후보. 예시 대본엔 설명어만 — 한국어 자리였던 곳은 선생님 말이
 *                콜론으로 끝나고("Qani, qaytarib ko'ring:") 한국어는 그 뒤 도구로
 *                + 첫 행동을 say_korean 호출로
 *   tail         tail, 첫 인사는 보통 지시문
 *   marker       예시 대본 속 한국어 자리를 🔊 하나로 (읽을 글자가 없다)
 *   marker-first marker + 첫 행동을 say_korean 호출로 (OPENING_DIRECTIVE_TOOL_FIRST_CALL)
 *   split-first  split + 첫 행동을 호출로
 *   split        "(invoke say_korean: …)" 를 자기 문단으로 떼어 냄
 *   direction    같은 지시문을 선생님 말 줄 사이에 붙여 둠
 *   rename       direction + 도구 이름만 play_korean_audio
 *   rules-only   §0 만, 마스터 프롬프트 본문(§1~§36) 없이 (direction 표기)
 *   direction-nb direction + NON_BLOCKING
 *
 *   2026-09-21 결과 (14세션): **세션의 첫 한국어 순간이 끝까지 간다.** 첫 한국어를
 *   표기로 읽은 세션은 7개 전부 끝까지 표기만 읽었고, 첫 한국어를 호출한 세션은
 *   끝까지 호출했다. 다만 예시에 표기 글자가 남아 있으면 "호출하면서 표기도 읽는"
 *   턴이 섞였다. split 1차 성공(4/4)은 첫 턴 운이었다 → marker·first 를 만든 이유.
 *
 *   3차 (uz, lesson·rolePlay ×3): first 로 첫 인사는 거의 다 진짜 호출. 하지만
 *   marker 는 대본을 🔊 줄까지 통째로 말한 **뒤에** 도구를 불러 순서가 뒤집혔고,
 *   한 세션은 프롬프트 예시를 대사로 읊었다. split-first 는 rolePlay 14/15 ✅,
 *   lesson 은 첫 인사 뒤로 표기 낭독. 잘 된 턴은 전부 "설명어로 콜론까지 → 도구"
 *   모양이었다 → tail.
 *
 * ── 한계 ──
 *
 *  · 학습자 말은 소리가 아니라 **글자**로 보낸다 (realtimeInput.text). 도구를
 *    부르냐 마냐는 모델 쪽 판단이라 충분히 대표적이지만, 음성 인식 오류는 없다.
 *  · 도구 결과는 실제 TTS 없이 "Played." 를 돌려준다 (재생 시간만큼 기다린 뒤).
 *  · 모델은 매번 조금씩 다르게 답한다. --repeat 로 여러 번 돌려서 볼 것.
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Behavior,
  EndSensitivity,
  FunctionResponseScheduling,
  GoogleGenAI,
  Modality,
  StartSensitivity,
  Type,
  type FunctionDeclaration,
  type FunctionResponse,
  type LiveServerMessage,
  type Session,
} from '@google/genai';
import {
  FALLBACK_MODEL,
  OPENING_DIRECTIVE,
  OPENING_DIRECTIVE_TOOL,
  OPENING_DIRECTIVE_TOOL_FIRST_CALL,
  VAD_SILENCE_MS,
  transcriptionLanguages,
  tutorOutputLanguage,
} from '../src/config.js';
import {
  SAY_KOREAN,
  SAY_KOREAN_DESCRIPTION,
  SAY_KOREAN_RESULT,
  SAY_KOREAN_TEXT_DESCRIPTION,
  SPOKEN_PROMPT_LEAK,
  SPOKEN_TOOL_NOTATION,
  containsSpokenKorean,
  koreanOnly,
} from '../src/korean-voice-spec.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = join(HERE, '..', 'tmp', 'probe');
const API_TUTOR = new URL('../../api/src/tutor/', import.meta.url);

// ─────────────────────────────────────────────────────────────
// 인자
// ─────────────────────────────────────────────────────────────

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const listArg = (name: string) =>
  arg(name)?.split(',').map((s) => s.trim()).filter(Boolean);

type Mode = 'lesson' | 'rolePlay';
const MODES: readonly Mode[] = ['lesson', 'rolePlay'];
const isMode = (m: string): m is Mode => (MODES as readonly string[]).includes(m);

const LANGS = listArg('lang') ?? ['uz'];
const MODES_RUN = (listArg('mode') ?? ['lesson']).filter(isMode);
const ONLY = listArg('only');
const REPEAT = Math.max(1, Number(arg('repeat') ?? 1));
const CONCURRENCY = Math.max(1, Number(arg('concurrency') ?? 2));
const MODEL = arg('model') ?? FALLBACK_MODEL;

// ─────────────────────────────────────────────────────────────
// 운영 코드에서 그대로 가져오는 것들 (api 의 프롬프트 빌더)
// ─────────────────────────────────────────────────────────────

interface LearnerContextLike {
  koreanLevel: 'beginner' | 'intermediate' | 'advanced';
  nativeLanguage: string;
  weakPoints: string[];
  recentVocabulary: string[];
  interests: string[];
  topicProgress?: number;
}

type BuildTutorInstructions = (
  learner: LearnerContextLike,
  mode: string,
  scene: string | undefined,
  topic: unknown,
  teacher: unknown,
  addressStyle: string,
  koreanVoice: 'tool' | 'native',
  cueStyle?: string,
) => string;

/**
 * api 는 CommonJS 라 tsx 로 불러오면 named export 가 default 아래로 들어갈 수
 * 있다. 양쪽 다 보고, 없으면 무엇이 없는지 말하고 죽는다.
 */
async function load(path: string): Promise<Record<string, unknown>> {
  const mod: Record<string, unknown> = await import(new URL(path, API_TUTOR).href);
  const inner = mod.default;
  return inner && typeof inner === 'object'
    ? { ...(inner as Record<string, unknown>), ...mod }
    : mod;
}

function need<T>(mod: Record<string, unknown>, name: string, check: (v: unknown) => boolean): T {
  const v = mod[name];
  if (!check(v)) throw new Error(`api 모듈에서 ${name} 을 못 찾았다`);
  return v as T;
}

const isFn = (v: unknown) => typeof v === 'function';
const isArr = (v: unknown) => Array.isArray(v);

interface Teacher { id: string }
interface Topic { id: string }

async function loadApi() {
  const prompt = await load('prompt/build-instructions.ts');
  const teachers = await load('teachers/tutor-teachers.ts');
  const topics = await load('topics/tutor-topics.ts');
  const voices = await load('gemini/voices.ts');
  const build = need<BuildTutorInstructions>(prompt, 'buildTutorInstructions', isFn);
  const allTeachers = need<Teacher[]>(teachers, 'TUTOR_TEACHERS', isArr);
  const allTopics = need<Topic[]>(topics, 'TUTOR_TOPICS', isArr);
  const voiceFor = need<(id: string) => string>(voices, 'voiceForTeacher', isFn);
  const teacher = allTeachers.find((t) => t.id === 'yuna');
  const topic = allTopics.find((t) => t.id === 'cafe');
  if (!teacher || !topic) throw new Error('yuna 선생님이나 cafe 주제가 없다');
  return { build, teacher, topic, voiceName: voiceFor('yuna') };
}
type Api = Awaited<ReturnType<typeof loadApi>>;

// ─────────────────────────────────────────────────────────────
// 실험 설계
// ─────────────────────────────────────────────────────────────

/** 처음 쓰는 초급 학습자 — 실기기 테스트와 같은 조건 */
const learnerFor = (lang: string): LearnerContextLike => ({
  koreanLevel: 'beginner',
  nativeLanguage: lang,
  weakPoints: [],
  recentVocabulary: [],
  interests: [],
  topicProgress: 0,
});

/**
 * 학습자 대사. 전부 "여기선 한국어를 들려줘야 한다" 는 자리를 만든다.
 * rolePlay 는 선생님이 카페 직원 역이라 **한국어 대사가 제일 많은** 모드다
 * (실기기에서 섞임이 제일 심했던 "따뜻한 걸로 드릴까요…" 가 여기서 나온다).
 */
/**
 * 학습자 대사 몇 번째에서 **한국어가 들려야 하나** (첫 인사는 따로).
 * 여기서 도구도 안 부르고 한국어도 없으면 "한국어 빠짐" 이다 — 🔊 를 그냥 침묵으로
 * 흉내 내고 넘어가는 실패를 잡으려고.
 *   lesson   1) 인사 대답 — 질문만 해도 된다 · 2) 먹다→마시다 교정 · 3) 단어 · 4) 더 자연스러운 문장
 *   rolePlay 전부 — 직원(선생님)이 한국어로 받아야 한다 (단어 질문은 단어를 들려준다)
 */
const EXPECT_KOREAN: Record<Mode, boolean[]> = {
  lesson: [false, true, true, true],
  rolePlay: [true, true, true, true],
};

const SCRIPT: Record<Mode, Record<string, string[]>> = {
  lesson: {
    uz: [
      'Salom! Yaxshi, tayyorman.',
      '저는 커피를 먹고 싶어요.',
      "Aeroport koreyschada nima bo'ladi?",
      '아이스 아메리카노 주세요.',
    ],
    ru: [
      'Привет! Да, я готов.',
      '저는 커피를 먹고 싶어요.',
      'Как по-корейски «аэропорт»?',
      '아이스 아메리카노 주세요.',
    ],
    en: [
      "Hi! Yeah, I'm ready.",
      '저는 커피를 먹고 싶어요.',
      'How do you say "airport" in Korean?',
      '아이스 아메리카노 주세요.',
    ],
  },
  rolePlay: {
    uz: [
      '아이스 아메리카노 주세요.',
      '음... "katta" koreyschada nima?',
      '큰 사이즈로 주세요.',
      '카드로 할게요.',
    ],
    ru: [
      '아이스 아메리카노 주세요.',
      'Эм... а как сказать «большой»?',
      '큰 사이즈로 주세요.',
      '카드로 할게요.',
    ],
    en: [
      '아이스 아메리카노 주세요.',
      'Umm... how do I say "large"?',
      '큰 사이즈로 주세요.',
      '카드로 할게요.',
    ],
  },
};

interface Variant {
  id: string;
  what: string;
  behavior: Behavior;
  /** null 이면 이번 실행에서 못 돌린다 (사유는 skip) */
  prompt: string | null;
  skip?: string;
  /** 도구 설명을 운영 것 대신 이걸로 (head 재현용) */
  declaration?: { description: string; textDescription: string };
  /** 도구 이름을 운영 것(say_korean) 대신 이걸로 */
  toolName?: string;
  opening: string;
  /** 첫 인사에서 호출을 요구했나 (그러면 첫 인사도 한국어가 들려야 한다) */
  firstCall?: boolean;
  /** 도구 결과 문장을 운영 것 대신 이걸로 (head 재현용) */
  played?: string;
}

const toolNameOf = (v: Variant) => v.toolName ?? SAY_KOREAN;

/** 지난 커밋(c73eabe)의 도구 설명 — head 실험을 그때 그대로 재현하려고 */
const HEAD_DECLARATION = {
  description: [
    'The ONLY way Korean can be heard in this lesson.',
    'Plays the given Korean aloud in your own voice with native Seoul pronunciation.',
    'Call it every time Korean needs to be heard: a target phrase, an example,',
    'a correction, a model answer, a word the learner asked for, or your',
    "role-play character's line. Never pronounce Korean with your own voice.",
  ].join(' '),
  textDescription:
    'One complete Korean phrase or sentence, copied exactly, in Hangul only. ' +
    'No translation, no romanization, no words from any other language.',
};

/** 이름만 바꾼 실험: 프롬프트·도구 설명 속 이름을 전부 갈아 끼운다 */
const RENAMED = 'play_korean_audio';
const renamed = (text: string) => text.split(SAY_KOREAN).join(RENAMED);

/**
 * §0 과 런타임 정보, 마지막 알림만 남긴다. 본문(§1~§36)은 뺀다.
 * 모델이 **규칙만 있을 때도** 도구를 안 부르면, 문제는 예시가 아니라 모델 쪽이다.
 */
function rulesOnly(prompt: string): string {
  const bodyStart = prompt.indexOf('1. CORE IDENTITY');
  const tail = prompt.indexOf('FINAL REMINDER');
  if (bodyStart < 0 || tail < 0) throw new Error('프롬프트 구조가 바뀌었다 — rules-only 를 못 만든다');
  // 제목 바로 위의 ━━━ 줄이 시작하는 자리
  const cut = (i: number) => prompt.lastIndexOf('\n', i - 2) + 1;
  return prompt.slice(0, cut(bodyStart)).trimEnd() + '\n\n' + prompt.slice(cut(tail));
}

/** head 의 기준 프롬프트 파일 (지난 커밋으로 뽑아 둔 것 — tmp 는 커밋 안 됨) */
const baselinePath = (lang: string, mode: Mode) =>
  join(OUT_ROOT, `baseline-${lang}-${mode}.txt`);

function variants(api: Api, lang: string, mode: Mode): Variant[] {
  const scene = mode === 'rolePlay' ? 'cafe' : undefined;
  const topic = mode === 'rolePlay' ? undefined : api.topic;
  const build = (cueStyle: string) =>
    api.build(learnerFor(lang), mode, scene, topic, api.teacher, 'casual', 'tool', cueStyle);
  const base = baselinePath(lang, mode);
  const baseline = existsSync(base) ? readFileSync(base, 'utf8') : null;
  const all: Variant[] = [
    {
      id: 'head',
      what: '지난 커밋 프롬프트 ("→ say_korean(…)" 표기) — 실기기 실패 재현',
      behavior: Behavior.BLOCKING,
      prompt: baseline,
      skip: baseline ? undefined : `${base} 없음`,
      declaration: HEAD_DECLARATION,
      // 그땐 tool 모드 문장이 없었다
      opening: OPENING_DIRECTIVE,
      played: 'Played.',
    },
    {
      id: 'tail-first',
      what: '운영 후보 — 예시는 설명어만, 콜론으로 끝나는 말 뒤에 한국어(도구) + 첫 행동 호출',
      behavior: Behavior.BLOCKING,
      prompt: build('tail'),
      opening: OPENING_DIRECTIVE_TOOL_FIRST_CALL,
      firstCall: true,
    },
    {
      id: 'tail',
      what: 'tail, 첫 인사는 보통 지시문',
      behavior: Behavior.BLOCKING,
      prompt: build('tail'),
      opening: OPENING_DIRECTIVE_TOOL,
    },
    {
      id: 'marker',
      what: '예시 속 한국어 자리를 🔊 하나로',
      behavior: Behavior.BLOCKING,
      prompt: build('marker'),
      opening: OPENING_DIRECTIVE_TOOL,
    },
    {
      id: 'marker-first',
      what: 'marker + 첫 행동을 say_korean 호출로 (3차: 순서가 뒤집히고 프롬프트를 읽음)',
      behavior: Behavior.BLOCKING,
      prompt: build('marker'),
      opening: OPENING_DIRECTIVE_TOOL_FIRST_CALL,
      firstCall: true,
    },
    {
      id: 'split-first',
      what: 'split + 첫 행동을 say_korean 호출로',
      behavior: Behavior.BLOCKING,
      prompt: build('split'),
      opening: OPENING_DIRECTIVE_TOOL_FIRST_CALL,
      firstCall: true,
    },
    {
      id: 'split',
      what: '지시문을 자기 문단으로',
      behavior: Behavior.BLOCKING,
      prompt: build('split'),
      opening: OPENING_DIRECTIVE_TOOL,
    },
    {
      id: 'direction',
      what: '지시문을 선생님 말 줄 사이에 (1차 실험에서 실패)',
      behavior: Behavior.BLOCKING,
      prompt: build('direction'),
      opening: OPENING_DIRECTIVE_TOOL,
    },
    {
      id: 'rename',
      what: `direction + 도구 이름 ${RENAMED}`,
      behavior: Behavior.BLOCKING,
      prompt: renamed(build('direction')),
      toolName: RENAMED,
      declaration: {
        description: renamed(SAY_KOREAN_DESCRIPTION),
        textDescription: SAY_KOREAN_TEXT_DESCRIPTION,
      },
      opening: renamed(OPENING_DIRECTIVE_TOOL),
    },
    {
      id: 'rules-only',
      what: '§0 목소리 규칙만 (본문 없음, direction 표기)',
      behavior: Behavior.BLOCKING,
      prompt: rulesOnly(build('direction')),
      opening: OPENING_DIRECTIVE_TOOL,
    },
    {
      id: 'direction-nb',
      what: 'direction + NON_BLOCKING',
      behavior: Behavior.NON_BLOCKING,
      prompt: build('direction'),
      opening: OPENING_DIRECTIVE_TOOL,
    },
  ];
  return ONLY ? all.filter((v) => ONLY.includes(v.id)) : all;
}

/**
 * 운영과 같은 선언. LiveKit 플러그인이 zod 스키마를 바꿔서 보내는 모양
 * (type object · text string · required) 을 그대로 적었다. 글자는 전부
 * korean-voice-spec.ts 에서 온다.
 */
function sayKoreanDeclaration(v: Variant): FunctionDeclaration {
  const d = v.declaration ?? {
    description: SAY_KOREAN_DESCRIPTION,
    textDescription: SAY_KOREAN_TEXT_DESCRIPTION,
  };
  return {
    name: toolNameOf(v),
    description: d.description,
    parameters: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING, description: d.textDescription },
      },
      required: ['text'],
    },
    behavior: v.behavior,
  };
}

// ─────────────────────────────────────────────────────────────
// 한 세션 돌리기
// ─────────────────────────────────────────────────────────────

interface CallLog {
  name: string;
  text: string;
  accepted: boolean;
  atMs: number;
}

type Step = { say: string } | { call: CallLog };

interface TurnLog {
  kind: 'greeting' | 'learner';
  input: string;
  /** 이 턴에서 한국어가 들려야 했나 */
  expectKorean: boolean;
  via: 'content' | 'realtime' | 'realtime→content';
  /** 선생님 목소리 자막과 도구 호출을 **일어난 순서대로** */
  timeline: Step[];
  calls: CallLog[];
  /** modelTurn 에 글자 part 가 오면 (보통 없음) */
  textParts: string[];
  firstAudioMs?: number;
  resumeMs: number[];
  audioSec: number;
  events: string[];
}

type Verdict = 'tool' | 'rejected' | 'leak' | 'notation' | 'korean' | 'missing' | 'none' | 'silent';

function speechOf(t: TurnLog): string {
  return t.timeline.flatMap((s) => ('say' in s ? [s.say.trim()] : [])).join(' ');
}

function verdictOf(t: TurnLog): Verdict {
  const speech = speechOf(t);
  if (SPOKEN_PROMPT_LEAK.test(speech)) return 'leak';
  if (SPOKEN_TOOL_NOTATION.test(speech) || /play[\s_]?korean/i.test(speech)) return 'notation';
  if (containsSpokenKorean(speech)) return 'korean';
  // 도구는 불렀는데 인자에 설명어가 섞여서 거절됐다 = 학습자는 한국어를 못 들었다
  if (t.calls.some((c) => !c.accepted)) return 'rejected';
  if (t.calls.length > 0) return 'tool';
  if (!speech.trim() && t.audioSec === 0) return 'silent';
  return t.expectKorean ? 'missing' : 'none';
}

const VERDICT_LABEL: Record<Verdict, string> = {
  tool: '✅ 도구로 한국어',
  rejected: '⚠️ 도구 인자에 설명어가 섞여 거절',
  leak: '❌ 프롬프트 예시를 대사로 읽음',
  notation: '❌ 도구 표기를 소리 냄',
  korean: '❌ 한국어를 직접 발음',
  missing: '❌ 한국어가 들려야 할 자리에서 빠짐',
  none: '— 한국어 없이 설명어만 (필요 없던 턴)',
  silent: '⚠️ 응답 없음',
};

interface Job {
  variant: Variant;
  lang: string;
  mode: Mode;
  round: number;
}

interface RunResult {
  variant: string;
  what: string;
  lang: string;
  mode: Mode;
  round: number;
  behavior: string;
  model: string;
  error?: string;
  turns: TurnLog[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 한국어 한 마디를 실제로 재생하는 데 걸릴 만한 시간 */
const playMs = (text: string) => Math.min(4000, 600 + 90 * [...text].length);

async function runJob(job: Job, api: Api, apiKey: string, tag: (m: string) => void): Promise<RunResult> {
  const { variant: v, lang, mode, round } = job;
  const result: RunResult = {
    variant: v.id,
    what: v.what,
    lang,
    mode,
    round,
    behavior: v.behavior,
    model: MODEL,
    turns: [],
  };
  if (!v.prompt) {
    result.error = `건너뜀: ${v.skip}`;
    return result;
  }

  const blocking = v.behavior === Behavior.BLOCKING;
  const hints = transcriptionLanguages(lang);
  let turn: TurnLog | undefined;
  let lastActivity = Date.now();
  let turnComplete = false;
  let gotAnything = false;
  let inputAt = 0;
  let resumeFrom: number | undefined;
  let closed: string | undefined;
  const pending = new Set<string>();
  let session: Session | undefined;

  const answerCalls = async (calls: { id?: string; name?: string; args?: Record<string, unknown> }[]) => {
    for (const fc of calls) {
      const id = fc.id ?? `${Date.now()}`;
      const name = fc.name ?? '';
      const raw = typeof fc.args?.text === 'string' ? fc.args.text : JSON.stringify(fc.args ?? {});
      const korean = name === toolNameOf(v) ? koreanOnly(raw) : null;
      const call: CallLog = { name, text: raw, accepted: !!korean, atMs: Date.now() - inputAt };
      turn?.calls.push(call);
      turn?.timeline.push({ call });
      tag(`   도구 호출 ${name}("${raw}")${korean ? '' : ' → 거절'}`);
      pending.add(id);
      if (korean) await sleep(playMs(korean));
      const response: FunctionResponse = {
        id,
        name,
        response: {
          output:
            name !== toolNameOf(v)
              ? `Unknown function: ${name}`
              : korean
                ? (v.played ?? SAY_KOREAN_RESULT.played)
                : SAY_KOREAN_RESULT.rejected,
        },
        ...(blocking ? {} : { scheduling: FunctionResponseScheduling.SILENT }),
      };
      if (closed || !session) return;
      session.sendToolResponse({ functionResponses: [response] });
      pending.delete(id);
      // BLOCKING 이면 결과를 받은 모델이 이어서 말한다 — 그 끝을 다시 기다린다
      if (blocking) turnComplete = false;
      resumeFrom = Date.now();
      lastActivity = Date.now();
    }
  };

  const onMessage = (m: LiveServerMessage) => {
    const sc = m.serverContent;
    if (sc || m.toolCall) {
      gotAnything = true;
      lastActivity = Date.now();
    }
    if (sc) {
      for (const part of sc.modelTurn?.parts ?? []) {
        const data = part.inlineData?.data;
        if (data && turn) {
          if (turn.firstAudioMs === undefined) turn.firstAudioMs = Date.now() - inputAt;
          if (resumeFrom !== undefined) {
            turn.resumeMs.push(Date.now() - resumeFrom);
            resumeFrom = undefined;
          }
          turn.audioSec += (data.length * 3) / 4 / 48_000;
        }
        if (part.text && turn && !part.thought) turn.textParts.push(part.text);
      }
      const said = sc.outputTranscription?.text;
      if (said && turn) {
        const last = turn.timeline[turn.timeline.length - 1];
        if (last && 'say' in last) last.say += said;
        else turn.timeline.push({ say: said });
      }
      if (sc.interrupted) turn?.events.push('interrupted');
      if (sc.turnComplete) turnComplete = true;
    }
    if (m.toolCall?.functionCalls?.length) {
      void answerCalls(m.toolCall.functionCalls);
    }
    if (m.toolCallCancellation) {
      turn?.events.push(`toolCallCancellation ${JSON.stringify(m.toolCallCancellation.ids ?? [])}`);
    }
    if (m.goAway) turn?.events.push('goAway');
  };

  const waitTurnEnd = async () => {
    const started = Date.now();
    for (;;) {
      await sleep(100);
      const now = Date.now();
      if (closed) {
        turn?.events.push(`세션 닫힘: ${closed}`);
        return;
      }
      const quiet = now - lastActivity;
      if (now - started > 60_000) {
        turn?.events.push('60초 초과');
        return;
      }
      if (pending.size) continue;
      if (turnComplete && quiet > 1500) return;
      if (gotAnything && quiet > 10_000) {
        turn?.events.push('turnComplete 없이 10초 조용');
        return;
      }
      if (!gotAnything && now - started > 12_000) return;
    }
  };

  const startTurn = (
    kind: TurnLog['kind'],
    input: string,
    via: TurnLog['via'],
    expectKorean: boolean,
  ): TurnLog => {
    const t: TurnLog = { kind, input, expectKorean, via, timeline: [], calls: [], textParts: [], resumeMs: [], audioSec: 0, events: [] };
    turn = t;
    result.turns.push(t);
    turnComplete = false;
    gotAnything = false;
    resumeFrom = undefined;
    inputAt = Date.now();
    lastActivity = Date.now();
    return t;
  };

  try {
    const ai = new GoogleGenAI({
      apiKey,
      // 로컬 가짜 서버로 이 스크립트 자체를 시험할 때만 쓴다
      ...(process.env.PROBE_BASE_URL ? { httpOptions: { baseUrl: process.env.PROBE_BASE_URL } } : {}),
    });
    const connecting = ai.live.connect({
      model: MODEL,
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: { parts: [{ text: v.prompt }] },
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: api.voiceName } },
          languageCode: tutorOutputLanguage(lang),
        },
        tools: [{ functionDeclarations: [sayKoreanDeclaration(v)] }],
        inputAudioTranscription: { languageCodes: hints },
        outputAudioTranscription: { languageCodes: hints },
        realtimeInputConfig: {
          automaticActivityDetection: {
            startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
            endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
            silenceDurationMs: VAD_SILENCE_MS,
          },
        },
        contextWindowCompression: { slidingWindow: {} },
      },
      callbacks: {
        onmessage: onMessage,
        onerror: (e) => {
          closed ??= `error ${e.message ?? ''}`.trim();
        },
        onclose: (e) => {
          closed ??= `close ${e.code}${e.reason ? ` ${e.reason}` : ''}`;
        },
      },
    });
    // ⚠️ 서버가 설정을 거부하면 connect 는 영영 안 끝난다 (setupComplete 를 기다림)
    session = await Promise.race([
      connecting,
      (async () => {
        for (let i = 0; i < 150; i++) {
          await sleep(100);
          if (closed) throw new Error(`연결 거부: ${closed}`);
        }
        throw new Error('15초 안에 setupComplete 없음');
      })(),
    ]);
    tag('연결됨');

    // 0) 첫 인사 — 운영의 generateReply({ instructions }) 와 같은 모양 (model 역할 turn)
    const hello = startTurn('greeting', '(첫 인사 지시문)', 'content', !!v.firstCall || mode === 'rolePlay');
    session.sendClientContent({
      turns: [{ role: 'model', parts: [{ text: v.opening }] }],
      turnComplete: true,
    });
    await waitTurnEnd();
    report(hello, tag);

    // 1~) 학습자
    const lines = SCRIPT[mode][lang] ?? SCRIPT[mode].uz;
    for (const [i, line] of lines.entries()) {
      if (closed) break;
      const t = startTurn('learner', line, 'realtime', EXPECT_KOREAN[mode][i] ?? false);
      session.sendRealtimeInput({ text: line });
      await waitTurnEnd();
      if (!gotAnything && !closed) {
        // 글자 입력을 turn 으로 안 받는 경우를 대비한 두 번째 길
        t.via = 'realtime→content';
        t.events.push('realtimeInput.text 무응답 → clientContent 로 다시 보냄');
        inputAt = Date.now();
        lastActivity = Date.now();
        session.sendClientContent({ turns: [{ role: 'user', parts: [{ text: line }] }], turnComplete: true });
        await waitTurnEnd();
      }
      report(t, tag);
    }
  } catch (e) {
    result.error = e instanceof Error ? e.message : String(e);
    tag(`❌ ${result.error}`);
  } finally {
    try {
      session?.close();
    } catch {
      // 이미 닫힘
    }
  }
  return result;
}

function report(t: TurnLog, tag: (m: string) => void) {
  tag(`${VERDICT_LABEL[verdictOf(t)]} ← ${t.input}`);
  const flow = t.timeline
    .map((s) => ('say' in s ? s.say.trim() : `🔊${s.call.text}`))
    .filter(Boolean)
    .join(' ⏵ ');
  if (flow) tag(`   ${flow.slice(0, 240)}`);
}

// ─────────────────────────────────────────────────────────────
// 보고서
// ─────────────────────────────────────────────────────────────

const VERDICT_ORDER: Verdict[] = ['tool', 'rejected', 'leak', 'notation', 'korean', 'missing', 'none', 'silent'];

function median(xs: number[]): string {
  if (!xs.length) return '-';
  const s = [...xs].sort((a, b) => a - b);
  return `${(s[Math.floor(s.length / 2)] / 1000).toFixed(1)}s`;
}

function summarize(runs: RunResult[]): string {
  const lines: string[] = [];
  lines.push(`# say_korean 호출 실험 — ${new Date().toISOString()}`);
  lines.push('');
  lines.push(`모델 \`${MODEL}\` · 선생님 yuna(teasing) · 초급 · 반복 ${REPEAT}회`);
  lines.push('');
  lines.push('판정은 **턴 단위**다. "한국어 필요 없던 턴" 은 질문만 한 턴처럼 원래 한국어가 없어도 되는 자리라 실패가 아니다. "한국어 빠짐" 은 교정·단어·롤플레이 대사처럼 한국어가 들려야 했는데 호출도 한국어도 없던 턴이다.');
  lines.push('');
  lines.push('| 언어·모드 | 실험 | 호출 방식 | ✅ 도구로 한국어 | ⚠️ 인자 거절 | ❌ 프롬프트 낭독 | ❌ 표기 낭독 | ❌ 직접 발음 | ❌ 한국어 빠짐 | 한국어 필요 없던 턴 | 응답 없음 | 도구 호출 수 | 첫 소리(중앙값) | 도구 뒤 재개(중앙값) | 오류 |');
  lines.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');

  // 같은 (언어, 모드, 실험) 은 반복을 합쳐서 한 줄
  const groups = new Map<string, RunResult[]>();
  for (const r of runs) {
    const key = `${r.lang}·${r.mode}|${r.variant}`;
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  for (const [key, rs] of groups) {
    const [combo, variant] = key.split('|');
    const turns = rs.flatMap((r) => r.turns);
    const count = (v: Verdict) => turns.filter((t) => verdictOf(t) === v).length;
    const calls = turns.reduce((n, t) => n + t.calls.length, 0);
    const first = turns.flatMap((t) => (t.firstAudioMs === undefined ? [] : [t.firstAudioMs]));
    const resume = turns.flatMap((t) => t.resumeMs);
    const errors = rs.filter((r) => r.error).map((r) => r.error).join(' / ');
    lines.push(
      `| ${combo} | ${variant} | ${rs[0].behavior} | ${VERDICT_ORDER.map(count).join(' | ')} | ${calls} | ${median(first)} | ${median(resume)} | ${errors || ''} |`,
    );
  }
  lines.push('');

  for (const r of runs) {
    lines.push(`## ${r.lang}·${r.mode} · ${r.variant} #${r.round} — ${r.what}`);
    lines.push('');
    if (r.error) lines.push(`> ${r.error}`, '');
    for (const t of r.turns) {
      lines.push(`**${VERDICT_LABEL[verdictOf(t)]}** ← \`${t.input}\` (${t.via})`);
      for (const step of t.timeline) {
        if ('say' in step) {
          if (step.say.trim()) lines.push(`- 목소리: ${step.say.trim()}`);
        } else {
          const c = step.call;
          lines.push(`- 🔊 ${c.name}("${c.text}")${c.accepted ? '' : ' ← 거절됨'}`);
        }
      }
      if (t.textParts.length) lines.push(`- (글자 part) ${t.textParts.join(' ').slice(0, 200)}`);
      if (t.events.length) lines.push(`- (이벤트) ${t.events.join(' · ')}`);
      lines.push('');
    }
  }
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────

async function main() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_API_KEY 가 없다 — apps/tutor-agent/.env 를 확인할 것');
    process.exit(1);
  }
  if (!MODES_RUN.length) {
    console.error(`--mode 는 ${MODES.join(', ')} 중에서`);
    process.exit(1);
  }
  const api = await loadApi();

  const jobs: Job[] = [];
  for (const lang of LANGS) {
    for (const mode of MODES_RUN) {
      for (const variant of variants(api, lang, mode)) {
        for (let round = 1; round <= REPEAT; round++) jobs.push({ variant, lang, mode, round });
      }
    }
  }
  console.log(
    `모델 ${MODEL} · 목소리 ${api.voiceName} · 언어 ${LANGS.join(',')} · 모드 ${MODES_RUN.join(',')} · ` +
      `실험 ${[...new Set(jobs.map((j) => j.variant.id))].join(',')} · 반복 ${REPEAT} → 세션 ${jobs.length}개 (동시 ${CONCURRENCY})`,
  );

  const runs: RunResult[] = new Array(jobs.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, async () => {
      while (next < jobs.length) {
        const i = next++;
        const job = jobs[i];
        const label = `${job.lang}·${job.mode}·${job.variant.id}#${job.round}`;
        const tag = (m: string) => console.log(`[${label}] ${m}`);
        runs[i] = await runJob(job, api, apiKey, tag);
      }
    }),
  );

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dir = join(OUT_ROOT, stamp);
  mkdirSync(dir, { recursive: true });
  for (const r of runs) {
    writeFileSync(join(dir, `${r.lang}-${r.mode}-${r.variant}-${r.round}.json`), JSON.stringify(r, null, 2));
  }
  const md = summarize(runs);
  writeFileSync(join(dir, 'report.md'), md);
  writeFileSync(join(OUT_ROOT, 'latest.md'), md);
  const table = md.split('\n').filter((l) => l.startsWith('|'));
  console.log('\n' + table.join('\n'));
  console.log(`\n자세한 결과: ${join(OUT_ROOT, 'latest.md')}`);
}

// 합성 에러 한 번에 프로세스가 죽지 않게 (preview 스크립트와 같은 이유)
process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection:', e instanceof Error ? e.message : e);
});

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.stack : e);
  process.exit(1);
});
