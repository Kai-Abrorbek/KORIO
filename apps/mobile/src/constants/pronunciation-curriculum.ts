import { PRON_DATA } from "./pronunciation";
import { glossOf } from "./pronunciation-gloss";
import {
  createPronunciationCurriculum,
  type PronunciationLanguage,
} from "../../../../shared/pronunciation";
import {
  ENGLISH_PRON_DATA,
  ENGLISH_PRON_COPY,
  englishPronunciationGloss,
} from "../../../../shared/english-pronunciation";

export {
  pronunciationScoreKey,
  resolvePronunciationLanguage,
} from "../../../../shared/pronunciation";
export type { PronunciationLanguage } from "../../../../shared/pronunciation";

const curricula = {
  ko: createPronunciationCurriculum(PRON_DATA),
  en: createPronunciationCurriculum(ENGLISH_PRON_DATA),
};

export function getPronunciationCurriculum(language: PronunciationLanguage) {
  return {
    ...curricula[language],
    speechLocale: language === "en" ? "en-US" : "ko-KR",
    gloss: language === "en" ? englishPronunciationGloss : glossOf,
  };
}

export function englishPronunciationCopy(locale: string) {
  const base = locale.toLowerCase().split(/[-_]/)[0];
  return (
    ENGLISH_PRON_COPY[base as keyof typeof ENGLISH_PRON_COPY] ??
    ENGLISH_PRON_COPY.en
  );
}
