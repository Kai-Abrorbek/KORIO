import {
  ENGLISH_PRON_COPY,
  ENGLISH_PRON_DATA,
  englishPronunciationGloss,
} from "../../../../../../shared/english-pronunciation";
import {
  createPronunciationCurriculum,
  type PronunciationLanguage,
} from "../../../../../../shared/pronunciation";
import { PRON_DATA } from "./pronunciation";
import { glossOf } from "./pronunciation-gloss";

export {
  pronunciationScoreKey,
  resolvePronunciationLanguage,
  type PronunciationLanguage,
} from "../../../../../../shared/pronunciation";

const KOREAN_CURRICULUM = createPronunciationCurriculum(PRON_DATA);
const ENGLISH_CURRICULUM = createPronunciationCurriculum(ENGLISH_PRON_DATA);

export function getPronunciationCurriculum(language: PronunciationLanguage) {
  return language === "en"
    ? { ...ENGLISH_CURRICULUM, speechLocale: "en-US" as const }
    : { ...KOREAN_CURRICULUM, speechLocale: "ko-KR" as const };
}

export function pronunciationGloss(
  word: string,
  locale: string,
  language: PronunciationLanguage,
) {
  return language === "en"
    ? englishPronunciationGloss(word, locale)
    : glossOf(word, locale);
}

export { ENGLISH_PRON_COPY };
