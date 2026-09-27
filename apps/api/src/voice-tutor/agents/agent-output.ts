import type {
  TutorDelivery,
  TutorEmotion,
  TutorGesture,
  TutorPlan,
  TutorProgress,
} from '../voice-tutor.types';

const EMOTIONS: TutorEmotion[] = [
  'neutral',
  'happy',
  'laughing',
  'shocked',
  'angry',
  'mocking',
  'disbelief',
  'excited',
  'explaining',
];
const DELIVERIES: TutorDelivery[] = [
  'normal',
  'shout',
  'whisper',
  'laugh',
  'dramatic',
];
const GESTURES: TutorGesture[] = [
  'none',
  'hand_raise_1',
  'hand_raise_2',
  'hand_raise_3',
  'both_explain_1',
  'both_explain_2',
  'both_compare',
];

const shortText = (value: unknown, max = 400): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const shortList = (value: unknown, maxItems = 8): string[] =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => shortText(item, 120))
        .filter(Boolean)
        .slice(0, maxItems)
    : [];

export function parseLessonReply(value: Record<string, unknown>): {
  text: string;
  language: string;
  correction: { original: string; corrected: string } | null;
  displayText?: string;
  speechText?: string;
  emotion?: TutorEmotion;
  delivery?: TutorDelivery;
  intensity?: number;
  gesture?: TutorGesture;
} | null {
  // Newer lesson prompts may provide separate subtitle and spoken text without
  // the legacy `text` field. Accept either while keeping the old shape valid.
  const text =
    shortText(value.text, 1500) ||
    shortText(value.displayText, 1500) ||
    shortText(value.speechText, 1500);
  if (!text) return null;
  const correction =
    value.correction && typeof value.correction === 'object'
      ? (value.correction as Record<string, unknown>)
      : null;
  return {
    text,
    displayText: shortText(value.displayText, 1500) || undefined,
    speechText: shortText(value.speechText, 1500) || undefined,
    emotion: EMOTIONS.includes(value.emotion as TutorEmotion)
      ? (value.emotion as TutorEmotion)
      : undefined,
    delivery: DELIVERIES.includes(value.delivery as TutorDelivery)
      ? (value.delivery as TutorDelivery)
      : undefined,
    intensity:
      typeof value.intensity === 'number' && Number.isFinite(value.intensity)
        ? Math.min(1, Math.max(0, value.intensity))
        : undefined,
    gesture: GESTURES.includes(value.gesture as TutorGesture)
      ? (value.gesture as TutorGesture)
      : undefined,
    language: ['ko', 'en', 'ru', 'uz'].includes(String(value.language))
      ? String(value.language)
      : 'ko',
    correction:
      correction &&
      shortText(correction.original) &&
      shortText(correction.corrected)
        ? {
            original: shortText(correction.original),
            corrected: shortText(correction.corrected),
          }
        : null,
  };
}

export function parseProgress(value: Record<string, unknown>): TutorProgress {
  return {
    grammarMistakes: shortList(value.grammarMistakes),
    repeatedMistakes: shortList(value.repeatedMistakes),
    learnedVocabulary: shortList(value.learnedVocabulary),
    weakVocabulary: shortList(value.weakVocabulary),
    strongPoints: shortList(value.strongPoints),
    weakPoints: shortList(value.weakPoints),
    estimatedLevel: shortText(value.estimatedLevel, 40),
    notes: shortText(value.notes, 1000),
  };
}

export function parsePlan(value: Record<string, unknown>): TutorPlan | null {
  const lessonGoal = shortText(value.lessonGoal);
  if (!lessonGoal) return null;
  return {
    lessonGoal,
    reviewTopics: shortList(value.reviewTopics, 5),
    newTopics: shortList(value.newTopics, 5),
    targetVocabulary: shortList(value.targetVocabulary),
    grammarFocus: shortList(value.grammarFocus, 5),
    conversationScenario: shortText(value.conversationScenario),
    difficulty: shortText(value.difficulty, 40),
  };
}
