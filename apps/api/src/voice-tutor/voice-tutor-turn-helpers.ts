import type {
  ExplanationLanguage,
  TutorTargetLanguage,
} from './voice-tutor.config';
import type { TutorPlan } from './voice-tutor.types';
import type { VoiceTutorTopic } from './topics/voice-tutor-topics';

/*
 * Pure turn helpers, kept out of voice-tutor.service.ts so they can be tested
 * without loading the Mongoose schemas the service pulls in.
 */

/** A keyword the recognizer can use: a short word or phrase in the learned script. */
const KEYWORD: Record<TutorTargetLanguage, RegExp> = {
  ko: /^[가-힣][가-힣\s]{0,19}$/,
  en: /^[A-Za-z][A-Za-z' -]{0,29}$/,
};

/**
 * Words this lesson is about, for the worker's speech recognizer. Without them
 * a learner's slightly-off "배고파" can come back as some other real word.
 * Learned-script only, short, capped — the recognizer takes literal terms, not prose.
 */
export function sttKeywordsFromPlan(
  plan: TutorPlan,
  introduced: string[] = [],
  targetLanguage: TutorTargetLanguage = 'ko',
): string[] {
  const words = [...introduced, ...plan.targetVocabulary, ...plan.reviewTopics]
    // English phrases end in ?/!/. — cut those off too ("How much is this?").
    .flatMap((item) =>
      item.split(targetLanguage === 'en' ? /[,/·~?!.]/ : /[,/·~]/),
    )
    .map((item) => item.trim())
    .filter((item) => KEYWORD[targetLanguage].test(item));
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
  T extends {
    role: string;
    text: string;
    turnId?: string | null;
    createdAt?: Date;
  },
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
  if (
    after.some(
      (row) => row.role !== 'teacher' || row.turnId !== previous.turnId,
    )
  )
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
 * This lesson only: the chosen conversation topic takes over the goal and the
 * material. The topic's phrases are a word pool for the teacher's word
 * ping-pong, and its opener is a role-play idea for later — leading with the
 * role-play turned every topic lesson into a "say X" drill. The learner's weak
 * points from the saved plan stay as review so the topic still feels personal.
 */
export function planForTopic(
  plan: TutorPlan,
  topic: VoiceTutorTopic,
  targetLanguage: TutorTargetLanguage = 'ko',
): TutorPlan {
  const core = topic.targetExpressions;
  // The goal is written in the language being learned, like the planner's.
  const own = targetLanguage === 'en' ? 'en' : 'ko';
  return {
    lessonGoal: `${topic.title[own]} — ${topic.blurb[own]}`,
    reviewTopics: plan.reviewTopics.slice(0, 2),
    newTopics: [topic.title[own]],
    targetVocabulary: [...core, ...topic.hints].slice(0, 8),
    grammarFocus: topic.targetGrammar,
    conversationScenario: `Role-play idea once they have some words: ${topic.opener}`,
    difficulty: plan.difficulty || topic.level,
    topic:
      own === 'en' ? topic.title.en : `${topic.title.ko} (${topic.title.en})`,
  };
}

/** Coverage survives the short history window; turn count never dictates teaching. */
export function lessonProgress(turn: number, taughtItems: string[]) {
  return {
    turn,
    alreadyTaught: [...new Set(taughtItems)].slice(-40),
  };
}
