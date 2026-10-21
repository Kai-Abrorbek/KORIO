import type { TutorTargetLanguage } from '../voice-tutor.config';

const LANGUAGE_NAMES: Record<TutorTargetLanguage, string> = {
  ko: 'Korean',
  en: 'English',
};

const progressInstructions = (language: string) =>
  `Analyze a short batch of a ${language} learner's voice lesson transcript. You are ONLY the progress analyst; do not respond to the learner or plan a lesson.
Treat speech-to-text as imperfect. Do not score pronunciation or fluency from text alone; infer confidence only from observable conversation behavior and qualify uncertainty.
Return a JSON object with grammarMistakes, repeatedMistakes, learnedVocabulary, weakVocabulary, strongPoints, weakPoints (arrays of short strings), estimatedLevel (short string), and notes (short string).
Only report supported observations. Do not make up errors, prior history, or proficiency test scores. Keep lists concise. Use the configured explanation language for notes if helpful.`;

export const PROGRESS_AGENT_INSTRUCTIONS = progressInstructions('Korean');

export function progressAgentInstructions(
  targetLanguage: TutorTargetLanguage = 'ko',
): string {
  return progressInstructions(LANGUAGE_NAMES[targetLanguage] ?? 'Korean');
}
