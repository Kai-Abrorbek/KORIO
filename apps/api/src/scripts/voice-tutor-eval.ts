/**
 * Voice Tutor 말투 점검.
 *
 * 실제 수업 프롬프트 + 실제 모델에 정해진 학습자 대사를 흘려 보내고,
 * 선생님이 리액션·질문·욕·드립을 실제로 하는지 숫자로 찍는다.
 * DB·LiveKit·TTS 없이 OpenAI 만 부른다 (한 번에 몇 센트).
 *
 *   pnpm --filter api tutor:eval                                 # chaotic_savage, 우즈벡어로 한국어 수업
 *   pnpm --filter api tutor:eval savage ko                       # 성격, 수업 언어
 *   pnpm --filter api tutor:eval chaotic_savage uz en            # 영어 튜터
 *   VOICE_TUTOR_LESSON_MODEL=gpt-6.1-terra pnpm --filter api tutor:eval
 *   VOICE_TUTOR_REASONING_EFFORT=low pnpm --filter api tutor:eval
 *
 * 모델·추론·프롬프트를 바꿀 때 같은 대사로 전후를 비교하려고 만든 것이다.
 * 대사가 고정이라 선생님 질문과 안 맞는 답도 섞인다 — 엉뚱한 답에 어떻게
 * 반응하는지도 보는 거라 일부러 그대로 둔다.
 * OPENAI_API_KEY 는 셸 환경변수나 apps/api/.env 에서 읽는다.
 */
import {
  VoiceTutorAgentsService,
  defaultVoiceTutorPlan,
} from '../voice-tutor/agents/voice-tutor-agents.service';
import type { StudentMemorySnapshot } from '../voice-tutor/memory/voice-tutor-profile.service';
import {
  VOICE_TUTOR_PERSONALITY_IDS,
  type TutorPersonality,
} from '../voice-tutor/personality/voice-tutor-personalities';
import { stripAudioTags } from '../voice-tutor/personality/speech-performance';
import { lastTargetPhrase } from '../voice-tutor/agents/lesson-context';
import { OpenAiTutorLlmProvider } from '../voice-tutor/providers/openai-llm.provider';
import { voiceTutorTopic } from '../voice-tutor/topics/voice-tutor-topics';
import {
  VOICE_TUTOR_LANGUAGES,
  tutorTargetLanguage,
  voiceTutorModels,
  voiceTutorReasoningEffort,
  type ExplanationLanguage,
} from '../voice-tutor/voice-tutor.config';
import {
  lessonProgress,
  planForTopic,
} from '../voice-tutor/voice-tutor-turn-helpers';
import type {
  TutorMessage,
  TutorReaction,
  TutorSettings,
} from '../voice-tutor/voice-tutor.types';

/**
 * 초급 학습자. 평범한 답 사이에 레퍼런스 영상의 도발을 두 번 섞었다
 * (provoke: 틀린 언어로 답하기, "나 없이 공부해" 하고 자러 가기).
 * 영상 튜터는 평범한 답엔 평범하게, 도발에만 크게 터진다 — 그걸 본다.
 */
interface LearnerLine {
  text: string;
  provoke?: boolean;
}

const LEARNER_LINES: Record<'ko' | 'en', LearnerLine[]> = {
  ko: [
    { text: '조금요' },
    { text: '감사합니다' },
    { text: 'Oishii!', provoke: true },
    // 대개 여기서 선생님이 고쳐 준 말을 다시 말한다
    { text: '맛있어요' },
    { text: '저는 학생이에요' },
    { text: '나 없이 공부해. 나 잘래 ㅋㅋ', provoke: true },
    { text: '모르겠어요' },
    { text: '저는 어제 학교에 가요' },
    { text: '너 진짜 웃기다' },
  ],
  en: [
    { text: 'A little bit.' },
    { text: 'Thank you.' },
    { text: 'Delicioso!', provoke: true },
    { text: "It's delicious." },
    { text: 'I am a student.' },
    { text: "Study without me, I'm going to sleep lol", provoke: true },
    { text: "I don't know." },
    { text: 'I go to school yesterday.' },
    { text: 'You are funny teacher.' },
  ],
};

/** 수업 언어(우즈벡어·러시아어) 욕도 센다 — 첫 GPT-6.1 점검의 "jin ursin" 5번을 0% 로 놓쳤다 */
const SWEARS =
  /씨발|시발|존나|개새|새끼|미친|젠장|fuck|shit|damn|\bhell\b|bastard|bullshit|dumbass|idiot|jin ursin|la[’‘'`]?nat|ahmoq|tentak|jinni|iflos|блин|бля|ч[её]рт|сука|хрен|охрен|пипец|дурак/i;
const SWEARS_ALL = new RegExp(SWEARS.source, 'gi');
const AUDIO_TAG = /\[[a-z][a-z' -]{0,40}\]/i;
/** 글로 쓴 웃음. 5.6 점검에서 9턴 중 8턴이 "…, 욕 ㅋㅋㅋ." 로 끝났다 */
const WRITTEN_LAUGH = /ㅋㅋ|ㅎㅎ|\bhaha|\blol\b|хаха/i;
/** 끝부분에 질문이나 "말해 봐" 류가 있으면 공을 넘긴 것으로 본다 */
const PASSES_BALL =
  /[?？]|say it|say:|give me|말해|해 봐|해봐|따라|ayt|takrorla|de-chi|повтори|скажи|попробуй/i;

/**
 * 비율 할당량은 없다 — 할당량을 프롬프트에 넣으면 모델이 공식처럼 따라 했다.
 * 레퍼런스 영상에서 보이는 것만 본다: 도발엔 크게, 평범한 답엔 평범하게, 강약이 있다.
 * bigOnProvoke = 도발 턴의 최소 리액션 강도, calmSwearMax = 평범한 턴에서 욕한 비율 상한
 */
const TARGETS: Record<
  TutorPersonality,
  { bigOnProvoke: number; calmSwearMax: number; swearOnProvoke: boolean }
> = {
  friendly: { bigOnProvoke: 0.6, calmSwearMax: 0, swearOnProvoke: false },
  close_friend: { bigOnProvoke: 0.7, calmSwearMax: 0.5, swearOnProvoke: false },
  savage: { bigOnProvoke: 0.75, calmSwearMax: 0.6, swearOnProvoke: false },
  chaotic_savage: {
    bigOnProvoke: 0.8,
    calmSwearMax: 0.6,
    swearOnProvoke: true,
  },
};

function loadEnv() {
  try {
    process.loadEnvFile('.env');
  } catch {
    // 셸에서 넘긴 환경변수만 쓴다
  }
}

function args() {
  const [personality = 'chaotic_savage', teach = 'uz', learn = 'ko'] =
    process.argv.slice(2).filter((arg) => arg !== '--');
  if (!(VOICE_TUTOR_PERSONALITY_IDS as readonly string[]).includes(personality))
    throw new Error(
      `성격은 ${VOICE_TUTOR_PERSONALITY_IDS.join(' | ')} 중 하나 (받은 값: ${personality})`,
    );
  if (!(VOICE_TUTOR_LANGUAGES as readonly string[]).includes(teach))
    throw new Error(
      `수업 언어는 ${VOICE_TUTOR_LANGUAGES.join(' | ')} 중 하나 (받은 값: ${teach})`,
    );
  return {
    personality: personality as TutorPersonality,
    teach: teach as ExplanationLanguage,
    learn: tutorTargetLanguage(learn),
  };
}

const emptyMemory = (): StudentMemorySnapshot => ({
  summary: '',
  estimatedLevel: 'beginner',
  grammarMistakes: [],
  repeatedMistakes: [],
  recurringMistakes: [],
  learnedVocabulary: [],
  weakVocabulary: [],
  strongPoints: [],
  weakPoints: [],
  notes: '',
  lessonsCompleted: 0,
});

/** 바로 앞 턴과 같은 걸 몇 번 했는지 — 같은 첫마디, 같은 욕 */
function repeatsInARow<T>(items: T[], key: (item: T) => string | undefined) {
  let count = 0;
  for (let i = 1; i < items.length; i++) {
    const now = key(items[i]);
    if (now && now === key(items[i - 1])) count++;
  }
  return count;
}

/** 같은 문장을 세 턴 연속 시킨 횟수. 서버와 같은 lastTargetPhrase 로 비교한다 */
function sameAskThreeTimes(endings: string[]) {
  let runs = 0;
  let run = 1;
  for (let i = 1; i < endings.length; i++) {
    run = endings[i] && endings[i] === endings[i - 1] ? run + 1 : 1;
    if (run === 3) runs++;
  }
  return runs;
}

const percent = (part: number, whole: number) =>
  whole ? `${Math.round((part / whole) * 100)}%` : '-';

async function main() {
  loadEnv();
  if (!process.env.OPENAI_API_KEY?.trim())
    throw new Error('OPENAI_API_KEY 가 없다 (셸 또는 apps/api/.env)');
  const { personality, teach, learn } = args();
  const settings: TutorSettings = {
    voiceId: 'eval',
    speechStyle: 'casual',
    explanationLanguage: teach,
    koreanLevel: 'beginner',
    personality,
    characterId: 'female_01',
    targetLanguage: learn,
  };
  const memory = emptyMemory();
  const topic = voiceTutorTopic(learn, 'food');
  const basePlan = defaultVoiceTutorPlan(memory, learn);
  const plan = topic ? planForTopic(basePlan, topic, learn) : basePlan;
  const agents = new VoiceTutorAgentsService(new OpenAiTutorLlmProvider());

  console.log(
    `\n모델 ${voiceTutorModels().lesson} (reasoning ${voiceTutorReasoningEffort()}) · 성격 ${personality} · 수업 언어 ${teach} · 배우는 언어 ${learn} · 주제 ${plan.topic ?? '-'}\n`,
  );

  const replies: {
    reply: TutorReaction;
    firstWordMs?: number;
    provoke?: boolean;
  }[] = [];
  const recent: Pick<TutorMessage, 'role' | 'text'>[] = [];
  const taught: string[] = [];
  const show = (reply: TutorReaction, ms: string) =>
    console.log(
      `    선생님 (${reply.emotion}/${reply.delivery} ${reply.intensity.toFixed(2)}, ${ms}): ${reply.speechText}\n`,
    );

  let started = Date.now();
  const opening = await agents.lesson(
    settings,
    plan,
    memory,
    [],
    lessonProgress(0, []),
  );
  console.log('[0] (수업 시작)');
  show(opening, `${Date.now() - started}ms`);
  replies.push({ reply: opening });
  taught.push(...(opening.taught ?? []));
  recent.push({ role: 'teacher', text: opening.speechText });

  for (const [index, { text: line, provoke }] of LEARNER_LINES[
    learn
  ].entries()) {
    recent.push({ role: 'user', text: line });
    started = Date.now();
    let firstWordMs: number | undefined;
    const reply = await agents.lessonStream(
      settings,
      plan,
      memory,
      recent,
      () => {
        firstWordMs ??= Date.now() - started;
      },
      undefined,
      undefined,
      lessonProgress(index + 1, taught),
    );
    console.log(`[${index + 1}] 학습자: ${line}${provoke ? '   ← 도발' : ''}`);
    show(
      reply,
      `첫 마디 ${firstWordMs ?? '-'}ms / 전체 ${Date.now() - started}ms`,
    );
    replies.push({ reply, firstWordMs, provoke });
    taught.push(...(reply.taught ?? []));
    recent.push({ role: 'teacher', text: reply.speechText });
  }

  const total = replies.length;
  const calm = replies.filter(({ provoke }) => !provoke);
  const provoked = replies.filter(({ provoke }) => provoke);
  const calmWords = calm.map(
    ({ reply }) => stripAudioTags(reply.speechText).split(/\s+/).length,
  );
  const swore = (list: typeof replies) =>
    list.filter(({ reply }) => SWEARS.test(reply.speechText));
  const swearsUsed = replies.flatMap(({ reply }) =>
    [...reply.speechText.matchAll(SWEARS_ALL)].map(([word]) =>
      word.toLowerCase(),
    ),
  );
  const tagged = replies.filter(({ reply }) =>
    AUDIO_TAG.test(reply.speechText),
  );
  const passed = replies.filter(({ reply }) =>
    PASSES_BALL.test(reply.displayText.slice(-80)),
  );
  const intensities = replies.map(({ reply }) => reply.intensity);
  const firstWords = replies.flatMap(({ firstWordMs }) =>
    firstWordMs === undefined ? [] : [firstWordMs],
  );
  // "Qaysi ovqatni yoqtirasan? Koreyscha ayt!" 도 질문이다 — 끝 15글자만 보면
  // 뒤에 붙은 "koreyscha ayt" 때문에 질문을 "따라 해" 로 셌다
  const questions = replies.filter(({ reply }) =>
    /[?？]/.test(reply.displayText.slice(-60)),
  );
  const sameOpen = repeatsInARow(replies, ({ reply }) =>
    reply.speechText.trim().split(/\s+/)[0]?.toLowerCase(),
  );
  const sameSwear = repeatsInARow(replies, ({ reply }) =>
    reply.speechText.match(SWEARS)?.[0].toLowerCase(),
  );
  const writtenLaughs = replies.filter(({ reply }) =>
    WRITTEN_LAUGH.test(reply.speechText),
  );
  const sameAsk = sameAskThreeTimes(
    replies.map(({ reply }) =>
      lastTargetPhrase(reply.displayText, learn).replace(/\s+/g, ''),
    ),
  );
  const target = TARGETS[personality];
  const bigOnProvoke = provoked.filter(
    ({ reply }) => reply.intensity >= target.bigOnProvoke,
  );
  const calmSwearRate = calm.length ? swore(calm).length / calm.length : 0;
  const spread = Math.max(...intensities) - Math.min(...intensities);
  const average = (values: number[]) =>
    values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1);
  const check = (ok: boolean) => (ok ? 'OK ' : 'LOW');

  console.log('── 요약 ──');
  console.log('[수업]');
  console.log(
    `${check(passed.length / total >= 0.8)} 공 넘김(질문·말해 봐로 끝남): ${percent(passed.length, total)}  (목표 80% 이상)`,
  );
  console.log(
    `${check(questions.length / total >= 0.4)} 진짜 질문(?로 끝남): ${percent(questions.length, total)}  (목표 40% 이상 — 나머지는 "따라 해")`,
  );
  console.log(
    `${check(sameAsk === 0)} 같은 문장 3턴 연속 요구: ${sameAsk}번  (목표 0)`,
  );
  console.log(
    `${check(average(calmWords) <= 30)} 평범한 턴 평균 길이: ${average(calmWords).toFixed(1)}단어  (목표 30 이하 — 폭발 턴은 길어도 된다)`,
  );
  console.log('[레퍼런스 영상처럼 반응하나]');
  console.log(
    `${check(bigOnProvoke.length === provoked.length)} 도발에 크게 반응: ${bigOnProvoke.length}/${provoked.length}  (도발 턴 강도 ${target.bigOnProvoke} 이상)`,
  );
  if (target.swearOnProvoke)
    console.log(
      `${check(swore(provoked).length === provoked.length)} 도발에 진짜 욕: ${swore(provoked).length}/${provoked.length}  (영상처럼 터질 땐 욕이 나와야 한다)`,
    );
  console.log(
    `${check(calmSwearRate <= target.calmSwearMax)} 평범한 답에도 욕: ${percent(swore(calm).length, calm.length)}  (목표 ${Math.round(target.calmSwearMax * 100)}% 이하 — 매 턴 욕이면 공식이다)`,
  );
  console.log(
    `${check(spread >= 0.3)} 리액션 강약 차이: ${Math.min(...intensities).toFixed(2)}–${Math.max(...intensities).toFixed(2)}  (목표 차이 0.3 이상 — 늘 같은 세기면 단조롭다)`,
  );
  console.log('[공식처럼 반복하나]');
  console.log(
    `${check(sameOpen <= (total - 1) * 0.3)} 앞 턴과 같은 첫마디: ${sameOpen}/${total - 1}  (목표 30% 이하)`,
  );
  console.log(
    `${check(sameSwear <= 1)} 앞 턴과 같은 욕: ${sameSwear}/${total - 1}  (목표 1 이하)`,
  );
  console.log(
    `${check(writtenLaughs.length / total <= 0.4)} 글로 쓴 웃음(ㅋㅋㅋ·haha): ${percent(writtenLaughs.length, total)}  (목표 40% 이하)`,
  );
  console.log('[참고]');
  console.log(
    `    욕한 턴 ${percent(swore(replies).length, total)} · 쓴 욕: ${swearsUsed.length ? [...new Set(swearsUsed)].join(', ') : '-'}`,
  );
  console.log(`    연기 태그 들어간 턴: ${percent(tagged.length, total)}`);
  if (firstWords.length)
    console.log(
      `    첫 마디 평균: ${Math.round(average(firstWords))}ms (API→모델 구간만, STT·TTS 제외)`,
    );
  console.log(
    '\n드립이 웃긴지는 숫자로 못 잰다 — 위 대사를 직접 읽어 볼 것.\n',
  );
}

main().catch((error: Error) => {
  console.error(`실패: ${error.message}`);
  process.exit(1);
});
