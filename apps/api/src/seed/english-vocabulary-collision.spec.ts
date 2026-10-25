import { WordPartOfSpeech } from '../words/schemas/word.schema';
import {
  adaptEnglishWordSeed,
  ENGLISH_VOCABULARY_MODULES,
} from './english-vocabulary-seed.data';
import { buildWordSeedData } from './word-seed.data';
import { buildVocabularyCourseSeed } from './vocabulary-course.data';

jest.mock('@nestjs/mongoose', () => ({
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

describe('English vocabulary collision handling', () => {
  let log: jest.SpyInstance;

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => log.mockRestore());

  it('publishes all ten Section 1 units with five nodes each', () => {
    const { nodes } = buildVocabularyCourseSeed({ courseId: 'en-general' });
    const section1Units = new Map<number, number>();

    for (const node of nodes.filter((node) => node.section === 1)) {
      section1Units.set(node.unit, (section1Units.get(node.unit) ?? 0) + 1);
    }

    expect([...section1Units.entries()].sort(([a], [b]) => a - b)).toEqual(
      Array.from({ length: 10 }, (_, index) => [index + 1, 5]),
    );
  });

  it('normalizes every published unit to unique codes and dictionary senses', () => {
    const authoredArrays = ENGLISH_VOCABULARY_MODULES.flatMap((data) =>
      Object.keys(data).filter((name) =>
        /^EN_S\d+_UNIT\d+_NODE\d+_WORDS$/.test(name),
      ),
    );
    const words = buildWordSeedData({ courseId: 'en-general' });

    expect(authoredArrays).toHaveLength(50);
    expect(words).toHaveLength(934);
    expect(new Set(words.map((word) => word.code)).size).toBe(words.length);
    expect(
      new Set(
        words.map(
          (word) => `${word.targetLanguage}|${word.headword}|${word.senseKey}`,
        ),
      ).size,
    ).toBe(words.length);
  });

  it('merges reviewed duplicate meanings and preserves every placement', () => {
    const words = buildWordSeedData({ courseId: 'en-general' });
    const garden = words.find((word) => word.code === 'en-home-garden');

    expect(garden?.senseKey).toBe('home-garden');
    expect(
      garden?.placements.map(({ section, unit }) => [section, unit]),
    ).toEqual(
      expect.arrayContaining([
        [1, 3],
        [1, 6],
      ]),
    );
    expect(garden?.examples).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: 'They’ve got a lovely garden.' }),
        expect.objectContaining({ text: 'There is a table in the garden.' }),
      ]),
    );
  });

  it('keeps genuinely different business and charity senses separate', () => {
    const words = buildWordSeedData({ courseId: 'en-general' });

    expect(
      words
        .filter((word) => word.headword === 'business')
        .map((word) => [word.code, word.senseKey]),
    ).toEqual(
      expect.arrayContaining([
        ['en-noun-business', 'work-purpose'],
        ['en-noun-business-company', 'commercial-company'],
      ]),
    );
    expect(
      words
        .filter((word) => word.headword === 'charity')
        .map((word) => [word.code, word.senseKey]),
    ).toEqual(
      expect.arrayContaining([
        ['en-noun-charity', 'organisation-helping-people'],
        ['en-noun-charity-activity', 'charitable-activity'],
      ]),
    );
  });

  it('applies aliases only to the exact reviewed identity', () => {
    const garden = {
      code: 'en-home-garden',
      headword: 'garden',
      senseKey: 'area-outside-house-with-plants',
      partOfSpeech: WordPartOfSpeech.NOUN,
    };

    expect(adaptEnglishWordSeed(garden).senseKey).toBe('home-garden');
    expect(
      adaptEnglishWordSeed({ ...garden, headword: 'garden centre' }).senseKey,
    ).toBe('area-outside-house-with-plants');
    expect(
      adaptEnglishWordSeed({
        ...garden,
        partOfSpeech: WordPartOfSpeech.VERB,
      }).senseKey,
    ).toBe('area-outside-house-with-plants');
  });
});
