import type { Section7BuildPractice } from './section7.types';

export const b = (
  ko: string,
  target: string,
  distractor1: string,
  distractor2: string,
  uz: string,
  en: string,
  ru: string,
): Section7BuildPractice => ({
  ko,
  target,
  distractors: [distractor1, distractor2],
  translations: { uz, en, ru },
});
