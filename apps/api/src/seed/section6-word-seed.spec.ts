import { createHash } from 'node:crypto';
import { WordPartOfSpeech } from '../words/schemas/word.schema';
import * as section1 from './data/vocabulary/section1';
import * as section2 from './data/vocabulary/section2';
import * as section3 from './data/vocabulary/section3';
import * as section4 from './data/vocabulary/section4';
import * as section5 from './data/vocabulary/section5';
import * as section6 from './data/vocabulary/section6';
import { buildWordSeedData } from './word-seed.data';
import type { WordSeedEntry } from './word-seed.types';

// These are data tests, not schema tests. Isolated Jest transforms cannot infer
// circular LessonCategory metadata; keep real enums without initializing Mongo schemas.
jest.mock('@nestjs/mongoose', () => ({
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

// Include section 6 explicitly even before its WORD_SOURCES registration is committed.
const sources = [
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
].flatMap((data, sectionIndex) =>
  Object.entries(data)
    .filter(([name]) => /^S\d+_UNIT\d+_WORDS$/.test(name))
    .map(([name, words]) => ({
      section: sectionIndex + 1,
      name,
      words: words as readonly WordSeedEntry[],
    })),
);

const entries = sources.flatMap((source) =>
  source.words.map((word, index) => {
    const headword = word.korean.trim();
    const meaningSignature = (['ko', 'uz', 'en', 'ru'] as const)
      .map((lang) =>
        (word.meaning?.[lang] || word[lang] || (lang === 'ko' ? headword : ''))
          .trim()
          .toLocaleLowerCase(),
      )
      .join('|');
    const senseKey =
      word.senseKey?.trim() ||
      `legacy-${createHash('sha256').update(meaningSignature).digest('hex').slice(0, 12)}`;
    return {
      ...word,
      headword,
      senseKey,
      partOfSpeech: word.partOfSpeech || WordPartOfSpeech.OTHER,
      location: `${source.name}[${index + 1}]`,
    };
  }),
);

type SeedEntry = (typeof entries)[number];

function identity(word: SeedEntry) {
  return `${word.headword}/${word.senseKey}/${word.partOfSpeech}`;
}

function conflicts(keyOf: (word: SeedEntry) => string | undefined) {
  const grouped = new Map<string, Map<string, string[]>>();
  for (const word of entries) {
    const key = keyOf(word);
    if (!key) continue;
    const identities = grouped.get(key) ?? new Map<string, string[]>();
    const signature = identity(word);
    identities.set(signature, [
      ...(identities.get(signature) ?? []),
      word.location,
    ]);
    grouped.set(key, identities);
  }
  return [...grouped]
    .filter(([, identities]) => identities.size > 1)
    .map(([key, identities]) => ({ key, identities: [...identities] }));
}

describe('section 6 word seed compatibility', () => {
  it('checks all nine units, including intra-unit repeats and earlier sections', () => {
    expect(
      sources
        .filter((source) => source.section === 6)
        .map((s) => s.name)
        .sort(),
    ).toEqual(
      Array.from({ length: 9 }, (_, index) => `S6_UNIT${index + 1}_WORDS`),
    );
    for (const source of sources)
      expect(source.words.length).toBeGreaterThan(0);
  });

  it('reports all incompatible uses of a stable word code, not only the first one', () => {
    expect(conflicts((word) => word.code?.trim())).toEqual([]);
  });

  it('keeps headword/sense identities compatible with the database unique index', () => {
    expect(conflicts((word) => `${word.headword}|${word.senseKey}`)).toEqual(
      [],
    );
  });

  it.each([
    [
      'work-diligent',
      '성실하다',
      'diligent-and-responsible',
      WordPartOfSpeech.ADJECTIVE,
    ],
    [
      'work-quick-understanding',
      '이해가 빠르다',
      'understand-quickly',
      WordPartOfSpeech.PHRASE,
    ],
    [
      'work-do-best',
      '최선을 다하다',
      'make-best-effort',
      WordPartOfSpeech.PHRASE,
    ],
    [
      'repair-technician',
      '수리 기사',
      'repair-technician',
      WordPartOfSpeech.NOUN,
    ],
    ['secretly', '몰래', 'secretly', WordPartOfSpeech.ADVERB],
    ['world', '세상', 'world', WordPartOfSpeech.NOUN],
  ])(
    'preserves the canonical identity for %s',
    (code, headword, senseKey, partOfSpeech) => {
      const occurrences = entries.filter((word) => word.code === code);
      expect(occurrences.length).toBeGreaterThanOrEqual(2);
      expect([...new Set(occurrences.map(identity))]).toEqual([
        `${headword}/${senseKey}/${partOfSpeech}`,
      ]);
    },
  );

  it('normalizes the enabled sources with unique codes and database identities', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    try {
      const words = buildWordSeedData();
      expect(words.length).toBeGreaterThan(0);
      expect(new Set(words.map((word) => word.code)).size).toBe(words.length);
      expect(
        new Set(words.map((word) => `${word.headword}|${word.senseKey}`)).size,
      ).toBe(words.length);
    } finally {
      log.mockRestore();
    }
  });
});
