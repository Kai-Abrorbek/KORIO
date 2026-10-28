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

/** 정답·오답·모름·핑계·장난이 섞인 초급 학습자 */
const LEARNER_LINES = {
  ko: [
    '조금요',
    '감사합니다',
    '배구리',
    '저는 학생이에요',
    '나 너무 피곤해 ㅋㅋ 그냥 자고 싶어',
    '모르겠어요',
    '저는 어제 학교에 가요',
    '너 진짜 웃기다',
  ],
  en: [
    'A little bit.',
    'Thank you.',
    'Yes, I speak.',
    'I go to school yesterday.',
    "I'm so tired lol, I just want to sleep",
    "I don't know.",
    'I am a student.',
    'You are funny teacher.',
  ],
};

const SWEARS =
  /씨발|시발|존나|개새|새끼|미친|젠장|fuck|shit|damn|\bhell\b|bastard|bullshit|dumbass|idiot|блин|ч[её]рт|сука|хрен|дурак/i;
const AUDIO_TAG = /\[[a-z][a-z' -]{0,40}\]/i;
/** 끝부분에 질문이나 "말해 봐" 류가 있으면 공을 넘긴 것으로 본다 */
const PASSES_BALL =
  /[?？]|say it|say:|give me|말해|해 봐|해봐|따라|ayt|takrorla|de-chi|повтори|скажи|попробуй/i;

/** 성격별로 이 정도는 나와야 "리액션 0" 이 아니다 */
const TARGETS: Record<
  TutorPersonality,
  { swear: [number, number]; tag: number; intensity: number }
> = {
  friendly: { swear: [0, 0], tag: 0.3, intensity: 0.4 },
  close_friend: { swear: [0.15, 0.7], tag: 0.4, intensity: 0.5 },
  savage: { swear: [0.35, 1], tag: 0.5, intensity: 0.6 },
  chaotic_savage: { swear: [0.5, 1], tag: 0.6, intensity: 0.7 },
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

  const replies: { reply: TutorReaction; firstWordMs?: number }[] = [];
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
  recent.push({ role: 'teacher', text: opening.displayText });

  for (const [index, line] of LEARNER_LINES[learn].entries()) {
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
    console.log(`[${index + 1}] 학습자: ${line}`);
    show(
      reply,
      `첫 마디 ${firstWordMs ?? '-'}ms / 전체 ${Date.now() - started}ms`,
    );
    replies.push({ reply, firstWordMs });
    taught.push(...(reply.taught ?? []));
    recent.push({ role: 'teacher', text: reply.displayText });
  }

  const total = replies.length;
  const words = replies.map(
    ({ reply }) => stripAudioTags(reply.speechText).split(/\s+/).length,
  );
  const swore = replies.filter(({ reply }) => SWEARS.test(reply.speechText));
  const tagged = replies.filter(({ reply }) =>
    AUDIO_TAG.test(reply.speechText),
  );
  const passed = replies.filter(({ reply }) =>
    PASSES_BALL.test(reply.displayText.slice(-80)),
  );
  const intensity =
    replies.reduce((sum, { reply }) => sum + reply.intensity, 0) / total;
  const firstWords = replies.flatMap(({ firstWordMs }) =>
    firstWordMs === undefined ? [] : [firstWordMs],
  );
  const target = TARGETS[personality];
  const swearRate = swore.length / total;
  const check = (ok: boolean) => (ok ? 'OK ' : 'LOW');

  console.log('── 요약 ──');
  console.log(
    `${check(passed.length / total >= 0.8)} 공 넘김(질문·말해 봐로 끝남): ${percent(passed.length, total)}  (목표 80% 이상)`,
  );
  console.log(
    `${check(words.reduce((a, b) => a + b, 0) / total <= 30)} 평균 길이: ${(words.reduce((a, b) => a + b, 0) / total).toFixed(1)}단어  (목표 30 이하)`,
  );
  console.log(
    `${check(swearRate >= target.swear[0] && swearRate <= target.swear[1])} 욕: ${percent(swore.length, total)}  (목표 ${Math.round(target.swear[0] * 100)}–${Math.round(target.swear[1] * 100)}%)`,
  );
  console.log(
    `${check(tagged.length / total >= target.tag)} 연기 태그([laughs] 등): ${percent(tagged.length, total)}  (목표 ${Math.round(target.tag * 100)}% 이상)`,
  );
  console.log(
    `${check(intensity >= target.intensity)} 평균 리액션 강도: ${intensity.toFixed(2)}  (목표 ${target.intensity} 이상)`,
  );
  if (firstWords.length)
    console.log(
      `    첫 마디 평균: ${Math.round(firstWords.reduce((a, b) => a + b, 0) / firstWords.length)}ms (API→모델 구간만, STT·TTS 제외)`,
    );
  console.log(
    '\n드립이 웃긴지는 숫자로 못 잰다 — 위 대사를 직접 읽어 볼 것.\n',
  );
}

main().catch((error: Error) => {
  console.error(`실패: ${error.message}`);
  process.exit(1);
});
