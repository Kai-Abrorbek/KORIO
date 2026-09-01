import { LEVEL2_GLOSSES_01_14 } from './reading-level2.glosses-01-14';
import { LEVEL2_GLOSSES_15_28 } from './reading-level2.glosses-15-28';

const LEVEL2_READING_GLOSSES = {
  ...LEVEL2_GLOSSES_01_14,
  ...LEVEL2_GLOSSES_15_28,
};

export function getLevel2ReadingGloss(word: string) {
  const gloss = LEVEL2_READING_GLOSSES[word];
  if (!gloss) {
    throw new Error(`2급 읽기 어휘 뜻이 없습니다: ${word}`);
  }
  return gloss;
}
