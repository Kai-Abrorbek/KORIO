import { createHash } from 'node:crypto';
import { S1_UNIT1_WORDS } from './data/vocabulary/section1';
import { S1_UNIT2_WORDS } from './data/vocabulary/section1';
import { S1_UNIT3_WORDS } from './data/vocabulary/section1';
import { S1_UNIT4_WORDS } from './data/vocabulary/section1';
import { S1_UNIT5_WORDS } from './data/vocabulary/section1';
import { S1_UNIT6_WORDS } from './data/vocabulary/section1';
import { S1_UNIT7_WORDS } from './data/vocabulary/section1';
import { S1_UNIT8_WORDS } from './data/vocabulary/section1';

import { S2_UNIT1_WORDS } from './data/vocabulary/section2';
import { S2_UNIT2_WORDS } from './data/vocabulary/section2';
import { S2_UNIT3_WORDS } from './data/vocabulary/section2';
import { S2_UNIT4_WORDS } from './data/vocabulary/section2';
import { S2_UNIT5_WORDS } from './data/vocabulary/section2';
import { S2_UNIT6_WORDS } from './data/vocabulary/section2';
import { S2_UNIT7_WORDS } from './data/vocabulary/section2';
import { S2_UNIT8_WORDS } from './data/vocabulary/section2';

import { S3_UNIT1_WORDS } from './data/vocabulary/section3';
import { S3_UNIT2_WORDS } from './data/vocabulary/section3';
import { S3_UNIT3_WORDS } from './data/vocabulary/section3';
import { S3_UNIT4_WORDS } from './data/vocabulary/section3';
import { S3_UNIT5_WORDS } from './data/vocabulary/section3';
import { S3_UNIT6_WORDS } from './data/vocabulary/section3';
import { S3_UNIT7_WORDS } from './data/vocabulary/section3';
import { S3_UNIT8_WORDS } from './data/vocabulary/section3';

import { S4_UNIT1_WORDS } from './data/vocabulary/section4';
import { S4_UNIT2_WORDS } from './data/vocabulary/section4';
import { S4_UNIT3_WORDS } from './data/vocabulary/section4';
import { S4_UNIT4_WORDS } from './data/vocabulary/section4';
import { S4_UNIT5_WORDS } from './data/vocabulary/section4';
import { S4_UNIT6_WORDS } from './data/vocabulary/section4';
import { S4_UNIT7_WORDS } from './data/vocabulary/section4';
import { S4_UNIT8_WORDS } from './data/vocabulary/section4';
import { S4_UNIT9_WORDS } from './data/vocabulary/section4';
import {
  WordPartOfSpeech,
  type WordLanguage,
} from '../words/schemas/word.schema';
import {
  type LocalizedWordSeedText,
  type WordSeedEntry,
  type WordSeedSource,
} from './word-seed.types';

const REQUIRED_LANGUAGES: WordLanguage[] = ['ko', 'uz', 'en', 'ru'];

const WORD_SOURCES: WordSeedSource[] = [
  { section: 1, unit: 1, words: S1_UNIT1_WORDS },
  { section: 1, unit: 2, words: S1_UNIT2_WORDS },
  { section: 1, unit: 3, words: S1_UNIT3_WORDS },
  { section: 1, unit: 4, words: S1_UNIT4_WORDS },
  { section: 1, unit: 5, words: S1_UNIT5_WORDS },
  { section: 1, unit: 6, words: S1_UNIT6_WORDS },
  { section: 1, unit: 7, words: S1_UNIT7_WORDS },
  { section: 1, unit: 8, words: S1_UNIT8_WORDS },
  { section: 2, unit: 1, words: S2_UNIT1_WORDS },
  { section: 2, unit: 2, words: S2_UNIT2_WORDS },
  { section: 2, unit: 3, words: S2_UNIT3_WORDS },
  { section: 2, unit: 4, words: S2_UNIT4_WORDS },
  { section: 2, unit: 5, words: S2_UNIT5_WORDS },
  { section: 2, unit: 6, words: S2_UNIT6_WORDS },
  { section: 2, unit: 7, words: S2_UNIT7_WORDS },
  { section: 2, unit: 8, words: S2_UNIT8_WORDS },
  { section: 3, unit: 1, words: S3_UNIT1_WORDS },
  { section: 3, unit: 2, words: S3_UNIT2_WORDS },
  { section: 3, unit: 3, words: S3_UNIT3_WORDS },
  { section: 3, unit: 4, words: S3_UNIT4_WORDS },
  { section: 3, unit: 5, words: S3_UNIT5_WORDS },
  { section: 3, unit: 6, words: S3_UNIT6_WORDS },
  { section: 3, unit: 7, words: S3_UNIT7_WORDS },
  { section: 3, unit: 8, words: S3_UNIT8_WORDS },
  { section: 4, unit: 1, words: S4_UNIT1_WORDS },
  { section: 4, unit: 2, words: S4_UNIT2_WORDS },
  { section: 4, unit: 3, words: S4_UNIT3_WORDS },
  { section: 4, unit: 4, words: S4_UNIT4_WORDS },
  { section: 4, unit: 5, words: S4_UNIT5_WORDS },
  { section: 4, unit: 6, words: S4_UNIT6_WORDS },
  { section: 4, unit: 7, words: S4_UNIT7_WORDS },
  { section: 4, unit: 8, words: S4_UNIT8_WORDS },
  { section: 4, unit: 9, words: S4_UNIT9_WORDS },
];

export interface NormalizedWordSeed {
  code: string;
  targetLanguage: 'ko';
  headword: string;
  senseKey: string;
  partOfSpeech: WordPartOfSpeech;
  meaning: Record<WordLanguage, string>;
  examples: Array<{
    korean: string;
    translations: Record<WordLanguage, string>;
  }>;
  pronunciation: {
    hangul: string;
    romanization: string;
    ttsText: string;
  };
  media: {
    emoji: string;
    imageUrl: string;
    imageAlt: Record<WordLanguage, string>;
  };
  placements: Array<{
    section: number;
    unit: number;
    order: number;
    isCore: boolean;
  }>;
  tags: string[];
  difficulty: number;
  usageNote: Record<WordLanguage, string>;
  isActive: boolean;
}

/** DB 유니크 인덱스와 같은 기준의 키 */
function senseIdOf(word: NormalizedWordSeed) {
  return `${word.headword}|${word.senseKey}`;
}

export function buildWordSeedData(): NormalizedWordSeed[] {
  const grouped = new Map<string, NormalizedWordSeed>();

  // words 컬렉션의 유니크 인덱스는 (targetLanguage, headword, senseKey) 다.
  // code 로만 묶으면 "같은 단어·같은 뜻인데 code 만 다른" 항목이 그대로 통과했다가
  // insert 단계에서 E11000 으로 시딩이 통째로 죽는다. 실제로 섹션4를 붙이자마자
  // 메뉴(restaurant-menu ↔ word_menu_noun) 에서 터졌다.
  // 그래서 여기서 미리 합친다 — 같은 뜻이면 단어 문서 하나에 placements 만
  // 늘어나는 게 맞다. 그래야 s1 에서 배운 진도가 s4 에서도 이어진다.
  const bySense = new Map<string, NormalizedWordSeed>();
  const merged: string[] = [];

  for (const source of WORD_SOURCES) {
    source.words.forEach((entry, index) => {
      const word = normalizeEntry(entry, source, index + 1);
      const senseId = senseIdOf(word);
      const existing = grouped.get(word.code) ?? bySense.get(senseId);

      if (!existing) {
        grouped.set(word.code, word);
        bySense.set(senseId, word);
        return;
      }

      assertCompatible(existing, word);
      if (existing.code !== word.code) {
        merged.push(
          `${word.headword}(${word.senseKey}): ${word.code} → ${existing.code}` +
            ` [s${source.section}u${source.unit}]`,
        );
      }
      for (const placement of word.placements) {
        const isDuplicate = existing.placements.some(
          (item) =>
            item.section === placement.section && item.unit === placement.unit,
        );
        if (!isDuplicate) existing.placements.push(placement);
      }
      existing.examples = mergeExamples(existing.examples, word.examples);
      existing.tags = [...new Set([...existing.tags, ...word.tags])];
    });
  }

  if (merged.length) {
    console.log(
      `\nℹ️ 같은 뜻이라 code 를 합친 단어 ${merged.length}개 ` +
        `(먼저 나온 code 가 남는다):`,
    );
    merged.forEach((line) => console.log(`   ${line}`));
    console.log('');
  }

  return [...grouped.values()].map((word) => ({
    ...word,
    placements: word.placements.sort(
      (a, b) => a.section - b.section || a.unit - b.unit || a.order - b.order,
    ),
  }));
}

function normalizeEntry(
  entry: WordSeedEntry,
  source: WordSeedSource,
  order: number,
): NormalizedWordSeed {
  const headword = entry.korean.trim();
  if (!headword) {
    throw new Error(
      `Empty Korean headword at section ${source.section}, unit ${source.unit}, order ${order}`,
    );
  }

  const meaning = completeLocalizedText(
    {
      ko: entry.meaning?.ko || entry.ko || headword,
      uz: entry.meaning?.uz || entry.uz,
      en: entry.meaning?.en || entry.en,
      ru: entry.meaning?.ru || entry.ru,
    },
    `${headword} meaning`,
  );
  const meaningSignature = createMeaningSignature(meaning);
  const senseKey =
    entry.senseKey?.trim() || `legacy-${shortHash(meaningSignature)}`;
  const code =
    entry.code?.trim() || `word_${shortHash(`${headword}|${senseKey}`)}`;
  const examples = (entry.examples || []).map((example, exampleIndex) => ({
    korean: requiredText(
      example.korean,
      `${headword} example ${exampleIndex + 1} Korean text`,
    ),
    translations: completeLocalizedText(
      example.translations,
      `${headword} example ${exampleIndex + 1} translations`,
    ),
  }));

  return {
    code,
    targetLanguage: 'ko',
    headword,
    senseKey,
    partOfSpeech: entry.partOfSpeech || WordPartOfSpeech.OTHER,
    meaning,
    examples,
    pronunciation: {
      hangul: entry.pronunciation?.hangul?.trim() || headword,
      romanization: entry.pronunciation?.romanization?.trim() || '',
      ttsText: entry.pronunciation?.ttsText?.trim() || headword,
    },
    media: {
      emoji: entry.media?.emoji || entry.emoji || '',
      imageUrl: entry.media?.imageUrl || '',
      imageAlt: optionalLocalizedText(entry.media?.imageAlt),
    },
    placements: [
      {
        section: source.section,
        unit: source.unit,
        order,
        isCore: entry.isCore ?? true,
      },
    ],
    tags: [...new Set(['lesson-seed', ...(entry.tags || [])])],
    difficulty: Math.min(5, Math.max(1, entry.difficulty || source.section)),
    usageNote: optionalLocalizedText(entry.usageNote),
    isActive: entry.isActive ?? true,
  };
}

function completeLocalizedText(
  value: LocalizedWordSeedText,
  label: string,
): Record<WordLanguage, string> {
  const result = {} as Record<WordLanguage, string>;
  for (const lang of REQUIRED_LANGUAGES) {
    result[lang] = requiredText(value[lang], `${label}.${lang}`);
  }
  return result;
}

function optionalLocalizedText(
  value?: LocalizedWordSeedText,
): Record<WordLanguage, string> {
  return {
    ko: value?.ko?.trim() || '',
    uz: value?.uz?.trim() || '',
    en: value?.en?.trim() || '',
    ru: value?.ru?.trim() || '',
  };
}

function requiredText(value: string | undefined, label: string) {
  const normalized = value?.trim() || '';
  if (!normalized) throw new Error(`Missing ${label}`);
  return normalized;
}

function shortHash(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 12);
}

function createMeaningSignature(meaning: Record<WordLanguage, string>) {
  return REQUIRED_LANGUAGES.map((lang) =>
    meaning[lang].trim().toLocaleLowerCase(),
  ).join('|');
}

function assertCompatible(
  existing: NormalizedWordSeed,
  next: NormalizedWordSeed,
) {
  const sameIdentity =
    existing.headword === next.headword &&
    existing.senseKey === next.senseKey &&
    existing.partOfSpeech === next.partOfSpeech;

  // Localized definitions can be natural paraphrases of the same dictionary
  // sense. The stable code + headword + senseKey + part of speech define the
  // identity; the first source remains the canonical displayed definition.
  if (!sameIdentity) {
    // headword + senseKey 는 같은데 품사만 다른 경우 — 합칠 수도, 따로 둘 수도
    // 없다. DB 유니크 인덱스가 (headword, senseKey) 라 따로 두면 insert 에서
    // 죽는다. 둘 중 하나의 senseKey 를 바꿔야 한다.
    if (
      existing.headword === next.headword &&
      existing.senseKey === next.senseKey
    ) {
      throw new Error(
        `"${next.headword}" 의 senseKey "${next.senseKey}" 를 품사가 다른 두 ` +
          `항목이 함께 쓰고 있다 (${existing.code}=${existing.partOfSpeech} vs ` +
          `${next.code}=${next.partOfSpeech}). words 컬렉션은 ` +
          `(headword, senseKey) 가 유니크라 둘 다 넣을 수 없다 — ` +
          '한쪽 senseKey 를 다른 값으로 바꿀 것.',
      );
    }
    throw new Error(
      `Word code ${next.code} is reused for incompatible content ` +
        `(${existing.headword}/${existing.senseKey}/${existing.partOfSpeech} vs ` +
        `${next.headword}/${next.senseKey}/${next.partOfSpeech}). ` +
        'Give each meaning a unique stable code.',
    );
  }
}

function mergeExamples(
  current: NormalizedWordSeed['examples'],
  next: NormalizedWordSeed['examples'],
) {
  const seen = new Set(current.map((example) => example.korean));
  return [
    ...current,
    ...next.filter((example) => {
      if (seen.has(example.korean)) return false;
      seen.add(example.korean);
      return true;
    }),
  ];
}
