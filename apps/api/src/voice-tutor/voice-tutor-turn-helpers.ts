import type { ExplanationLanguage } from './voice-tutor.config';
import type { TutorPlan } from './voice-tutor.types';
import type { VoiceTutorTopic } from './topics/voice-tutor-topics';

/*
 * Pure turn helpers, kept out of voice-tutor.service.ts so they can be tested
 * without loading the Mongoose schemas the service pulls in.
 */

/**
 * Words this lesson is about, for the worker's speech recognizer. Without them
 * a learner's slightly-off "배고파" can come back as some other real word.
 * Hangul-only, short, capped — the recognizer takes literal terms, not prose.
 */
export function sttKeywordsFromPlan(plan: TutorPlan): string[] {
  const words = [...plan.targetVocabulary, ...plan.reviewTopics]
    .flatMap((item) => item.split(/[,/·~]/))
    .map((item) => item.trim())
    .filter((item) => /^[가-힣][가-힣\s]{0,19}$/.test(item));
  return [...new Set(words)].slice(0, 30);
}

const PHANTOM_WINDOW_MS = 30_000;

/**
 * LiveKit starts the reply as soon as a sentence is transcribed (preemptive
 * generation). If the learner keeps talking, that draft is discarded unheard
 * and the real turn arrives with the longer transcript — which starts with the
 * draft's transcript. Returns the draft's user+teacher rows, or null.
 */
export function findPreemptivePhantom<
  T extends { role: string; text: string; turnId?: string | null; createdAt?: Date },
>(history: T[], transcript: string): T[] | null {
  const lastUserIndex = history.map((row) => row.role).lastIndexOf('user');
  if (lastUserIndex < 0) return null;
  const previous = history[lastUserIndex];
  const said = previous.text.trim();
  const now = transcript.trim();
  if (!said || now.length <= said.length || !now.startsWith(said)) return null;
  if (
    previous.createdAt &&
    Date.now() - new Date(previous.createdAt).getTime() > PHANTOM_WINDOW_MS
  )
    return null;
  const after = history.slice(lastUserIndex + 1);
  if (after.some((row) => row.role !== 'teacher' || row.turnId !== previous.turnId))
    return null;
  return [previous, ...after];
}

export function connectionFallback(
  language: ExplanationLanguage,
  style: 'polite' | 'casual',
): string {
  switch (language) {
    case 'en':
      return 'Sorry, the connection glitched for a second. Could you say that again?';
    case 'ru':
      return style === 'casual'
        ? 'Ой, связь на секунду пропала. Повтори, пожалуйста?'
        : 'Ой, связь на секунду пропала. Повторите, пожалуйста?';
    case 'uz':
      return style === 'casual'
        ? 'Kechirasan, aloqa bir soniya uzilib qoldi. Yana bir marta aytib berasanmi?'
        : 'Kechirasiz, aloqa bir soniya uzilib qoldi. Yana bir marta aytib bera olasizmi?';
    default:
      return style === 'casual'
        ? '잠깐 연결이 불안정해. 다시 한 번 말해 줄래?'
        : '잠깐 연결이 불안정해요. 다시 한 번 말씀해 주시겠어요?';
  }
}

/**
 * This lesson only: the chosen conversation topic takes over the goal, the
 * scenario the tutor plays, and the phrases to practise. The learner's weak
 * points from the saved plan stay as review so the topic still feels personal.
 */
export function planForTopic(plan: TutorPlan, topic: VoiceTutorTopic): TutorPlan {
  const core = topic.targetExpressions;
  return {
    lessonGoal: `${topic.title.ko} — ${topic.blurb.ko}`,
    reviewTopics: plan.reviewTopics.slice(0, 2),
    newTopics: [topic.title.ko],
    targetVocabulary: [...core, ...topic.hints].slice(0, 8),
    grammarFocus: topic.targetGrammar,
    conversationScenario: `${topic.title.en}. ${topic.opener}`,
    difficulty: plan.difficulty || topic.level,
    // Kai: "항상 똑같은 부분까지만 하고 주제를 다 했다고 한다" — 주제 하나를
    // 7단계로 깊게 판다. 표현 5개로 끝나는 게 아니라 관련 어휘·문법·변형·문화까지
    curriculum: [
      `Core phrases: ${core.slice(0, 3).join(' / ')} — meaning, when Koreans use each one, pronunciation tips; the learner says each one in a sentence.`,
      `More core: ${core.slice(3).join(' / ')}${topic.hints.length ? ` — plus model answers like ${topic.hints.join(' / ')}` : ''}; the learner answers real questions with them.`,
      `Related vocabulary for "${topic.title.en}": at least 8 more words and phrases Koreans actually use in this situation (things, quantities, numbers, typical questions and answers), taught 2–3 at a time with examples.`,
      `Grammar behind it: ${topic.targetGrammar.join(', ')} — why this form is used here, contrast it with a similar form learners confuse, 3 fresh examples, then the learner builds their own sentences.`,
      `Role-play: ${topic.opener} Play the whole scene; then add a complication (something unavailable, a misunderstanding, an unexpected follow-up question) the learner must handle in Korean.`,
      `Variations and real life: polite vs casual versions, what the other person may say back and how to reply, the mistakes foreigners typically make here, one short culture tip.`,
      'Mastery: the learner runs the whole situation alone from start to finish; then a harder version with new details and faster pace.',
    ],
  };
}

/** Lesson stages for this session — the topic's own, or ones built from the planner's plan. */
export function lessonCurriculum(plan: TutorPlan): string[] {
  if (plan.curriculum?.length) return plan.curriculum;
  const list = (items: string[]) => items.filter(Boolean).join(' / ');
  return [
    `Warm-up and review${plan.reviewTopics.length ? `: ${list(plan.reviewTopics)}` : ': how the learner is doing, recycle words from earlier lessons'}.`,
    `Core of today: ${plan.lessonGoal}${plan.targetVocabulary.length ? ` — introduce ${list(plan.targetVocabulary.slice(0, 4))}` : ''}.`,
    `Expand vocabulary${plan.targetVocabulary.length > 4 ? `: ${list(plan.targetVocabulary.slice(4))}` : ''} plus closely related words the learner will need, 2–3 at a time with examples.`,
    `Grammar focus${plan.grammarFocus.length ? `: ${list(plan.grammarFocus)}` : ': the grammar that today\'s sentences rely on'} — explain simply, contrast with a similar form, fresh examples, learner makes own sentences.`,
    `Scenario practice: ${plan.conversationScenario || 'a realistic everyday situation'} — role-play it, then add a complication.`,
    'Natural Korean: how Koreans actually say it — polite vs casual variants, typical reactions and replies, a culture note.',
    'Mixed review: the learner produces a full exchange alone; fix the remaining weak spots, then push to a harder version.',
  ];
}

/** Turns spent on one stage before the tutor is nudged to the next. */
export const TURNS_PER_STAGE = 4;

/**
 * Where this lesson is. The lesson agent only sees ~12 recent messages, so
 * without this it forgot what it had covered, repeated the first part of the
 * topic and then declared the topic "done".
 */
export function lessonProgress(
  plan: TutorPlan,
  turn: number,
  taughtItems: string[],
) {
  const stages = lessonCurriculum(plan);
  const index = Math.min(
    Math.floor(Math.max(0, turn - 1) / TURNS_PER_STAGE),
    stages.length - 1,
  );
  const pastEnd = turn > stages.length * TURNS_PER_STAGE;
  return {
    turn,
    stage: `${index + 1}/${stages.length}`,
    currentStage: pastEnd
      ? 'All stages covered once — keep going deeper: new situations, harder variations and related expressions for the same topic; recycle what was taught inside new sentences.'
      : stages[index],
    nextStage: pastEnd ? null : (stages[index + 1] ?? null),
    alreadyTaught: taughtItems.slice(-40),
  };
}
