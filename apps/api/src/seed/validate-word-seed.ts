import { WORD_LANGUAGES } from '../words/schemas/word.schema';
import { buildWordSeedData } from './word-seed.data';

const words = buildWordSeedData();
const codes = new Set<string>();

for (const word of words) {
  if (codes.has(word.code)) throw new Error(`Duplicate word code: ${word.code}`);
  codes.add(word.code);

  if (word.placements.length === 0) {
    throw new Error(`${word.code} has no section/unit placement`);
  }
  for (const lang of WORD_LANGUAGES) {
    if (!word.meaning[lang]) {
      throw new Error(`${word.code} is missing meaning.${lang}`);
    }
  }
  for (const example of word.examples) {
    for (const lang of WORD_LANGUAGES) {
      if (!example.translations[lang]) {
        throw new Error(
          `${word.code} example "${example.korean}" is missing translations.${lang}`,
        );
      }
    }
  }
}

console.log(`✅ 단어 시드 ${words.length}개 검증 완료`);
