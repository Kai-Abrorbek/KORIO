import type { TutorTargetLanguage } from '../voice-tutor.config';

const LANGUAGE_NAMES: Record<TutorTargetLanguage, string> = {
  ko: 'Korean',
  en: 'English',
};

const planningInstructions = (language: string) =>
  `You are ONLY a ${language} lesson planner. Use the learner's structured memory, the current lesson goal, and the latest progress analysis. Do not address the learner directly.
Prepare one achievable next voice lesson with a concrete natural scenario. Use previousPlan and learnedVocabulary to avoid replaying the same opening, examples and vocabulary list. Include purposeful review where memory suggests it is useful, not a mandatory first stage. Choose fresh relevant expressions and adapt difficulty gradually. This plan is flexible direction for a teacher, not a script or ordered curriculum. Keep ${language} accurate and useful.
Return a JSON object with lessonGoal (string), reviewTopics, newTopics, targetVocabulary, grammarFocus (short string arrays), conversationScenario (string), and difficulty (short string).`;

export const PLANNING_AGENT_INSTRUCTIONS = planningInstructions('Korean');

export function planningAgentInstructions(
  targetLanguage: TutorTargetLanguage = 'ko',
): string {
  return planningInstructions(LANGUAGE_NAMES[targetLanguage] ?? 'Korean');
}
