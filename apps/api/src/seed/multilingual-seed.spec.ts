import { createHash } from 'node:crypto';
import { WordPartOfSpeech } from '../words/schemas/word.schema';
import { parseSeedCourseScope } from './course-seed.options';
import {
  adaptEnglishWordSeed,
  buildEnglishWordSources,
  ENGLISH_VOCABULARY_MODULES,
} from './english-vocabulary-seed.data';
import { buildVocabularyCourseSeed } from './vocabulary-course.data';
import { buildWordSeedData } from './word-seed.data';
import {
  wordSeedUpdate,
  wordSeedUpdatePipeline,
} from './word-seed.persistence';
import type { MultilingualWordSeedEntry } from './word-seed.types';

jest.mock('@nestjs/mongoose', () => ({
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

const translated = {
  ko: '인사',
  uz: 'salom',
  en: 'greeting',
  ru: 'приветствие',
};
const fixture: MultilingualWordSeedEntry = {
  headword: 'hello',
  senseKey: 'greeting',
  partOfSpeech: WordPartOfSpeech.INTERJECTION,
  meaning: translated,
  examples: [{ text: 'Hello, Anna.', translations: translated }],
};

function englishWords(words: MultilingualWordSeedEntry[]) {
  return buildWordSeedData({
    courseId: 'en-general',
    sources: [
      {
        courseId: 'en-general',
        targetLanguage: 'en',
        section: 1,
        unit: 1,
        words,
      },
    ],
  });
}

describe('multilingual vocabulary seeds', () => {
  let log: jest.SpyInstance;
  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });
  afterEach(() => log.mockRestore());

  it('keeps existing CLI commands Korean-only and requires an explicit English course', () => {
    expect(parseSeedCourseScope([])).toEqual({
      courseId: 'ko-general',
      targetLanguage: 'ko',
    });
    expect(parseSeedCourseScope(['--', '--courseId=en-general'])).toEqual({
      courseId: 'en-general',
      targetLanguage: 'en',
    });
    expect(
      parseSeedCourseScope(['--courseId', 'en-general']).targetLanguage,
    ).toBe('en');
    expect(() => parseSeedCourseScope(['--prune'])).toThrow();
    expect(() => parseSeedCourseScope(['--courseId=no-such-course'])).toThrow();
  });

  it('keeps published Korean generated identities byte-for-byte', () => {
    const headword = '인사';
    const hash = (value: string) =>
      createHash('sha256').update(value).digest('hex').slice(0, 12);
    const senseKey = `legacy-${hash(
      Object.values(translated)
        .map((value) => value.toLocaleLowerCase())
        .join('|'),
    )}`;
    const [word] = buildWordSeedData({
      sources: [
        {
          section: 1,
          unit: 1,
          words: [{ korean: headword, meaning: translated }],
        },
      ],
    });
    expect(word.senseKey).toBe(senseKey);
    expect(word.code).toBe(`word_${hash(`${headword}|${senseKey}`)}`);
    expect(word.placements[0].courseId).toBe('ko-general');
  });

  it('normalizes all authored English nodes and retains IPA without false Korean fields', () => {
    const authoredWordArrays = ENGLISH_VOCABULARY_MODULES.flatMap((data) =>
      Object.keys(data).filter((name) =>
        /^EN_S\d+_UNIT\d+_NODE\d+_WORDS$/.test(name),
      ),
    );
    expect(authoredWordArrays.length).toBeGreaterThan(0);
    expect(buildEnglishWordSources()).toHaveLength(authoredWordArrays.length);
    const words = buildWordSeedData({ courseId: 'en-general' });
    const hello = words.find((word) => word.code === 'en-greeting-hello')!;
    expect(hello.targetLanguage).toBe('en');
    expect(hello.headword).toBe('hello');
    expect(hello.pronunciation.ipa).toBe('/həˈləʊ/');
    expect(hello.pronunciation.hangul).toBe('');
    expect(hello.examples[0].text).toBe('Hello, I’m Anna.');
    expect(hello.examples[0].korean).toBeUndefined();
    expect(
      words.every((word) =>
        word.placements.every(
          (placement) => placement.courseId === 'en-general',
        ),
      ),
    ).toBe(true);
    expect(new Set(words.map((word) => word.code)).size).toBe(words.length);
    expect(
      new Set(
        words.map(
          (word) => `${word.targetLanguage}|${word.headword}|${word.senseKey}`,
        ),
      ).size,
    ).toBe(words.length);
  });

  it('accepts neutral headword and example fields without English-specific source names', () => {
    const [word] = englishWords([fixture]);
    expect(word.headword).toBe('hello');
    expect(word.examples[0].text).toBe('Hello, Anna.');
    expect(word.code).toMatch(/^en_word_/);
  });

  it('normalizes only exact documented English sense aliases', () => {
    const source = {
      ...fixture,
      code: 'en-verb-study',
      headword: 'study',
      senseKey: 'learn-subject',
      partOfSpeech: WordPartOfSpeech.VERB,
    };
    expect(adaptEnglishWordSeed(source).senseKey).toBe('learn');
    expect(
      adaptEnglishWordSeed({ ...source, headword: 'study carefully' }).senseKey,
    ).toBe('learn-subject');
    expect(
      adaptEnglishWordSeed({ ...source, partOfSpeech: WordPartOfSpeech.NOUN })
        .senseKey,
    ).toBe('learn-subject');
    expect(source.senseKey).toBe('learn-subject');
    expect(() =>
      englishWords([
        { ...source, senseKey: 'learn' },
        { ...source, headword: 'study carefully' },
      ]),
    ).toThrow(/incompatible/);
  });

  it('does not lose collision detection when one dictionary sense has alternate codes', () => {
    expect(() =>
      englishWords([
        { ...fixture, code: 'en-hello' },
        { ...fixture, code: 'en-salutation' },
        { ...fixture, code: 'en-salutation', senseKey: 'different-meaning' },
      ]),
    ).toThrow(/incompatible/);
  });

  it('rejects accidentally mixed course sources', () => {
    expect(() =>
      buildWordSeedData({
        courseId: 'en-general',
        sources: [
          {
            courseId: 'ko-general',
            targetLanguage: 'ko',
            section: 1,
            unit: 1,
            words: [fixture],
          },
        ],
      }),
    ).toThrow();
  });

  it('preserves another course placement when reseeding the shared word', () => {
    const [word] = englishWords([{ ...fixture, code: 'en-hello' }]);
    const other = {
      ...word.placements[0],
      courseId: 'en-business',
      section: 2,
    };
    const result = wordSeedUpdate(word, {
      ...word,
      placements: [other, { ...word.placements[0], order: 99 }],
    });
    expect(result.placements).toEqual([other, ...word.placements]);
    expect(() =>
      wordSeedUpdate(word, { ...word, targetLanguage: 'ko' }),
    ).toThrow(/Refusing/);
  });

  it('atomically merges placements against the current stored document', () => {
    const [word] = englishWords([{ ...fixture, code: 'en-hello' }]);
    const [stage] = wordSeedUpdatePipeline(word);
    expect(stage).toMatchObject({ $set: { headword: { $literal: 'hello' } } });
    expect(stage.$set.placements.$concatArrays).toEqual([
      {
        $filter: {
          input: { $ifNull: ['$placements', []] },
          as: 'placement',
          cond: {
            $not: [
              {
                $in: [
                  { $ifNull: ['$$placement.courseId', 'ko-general'] },
                  ['en-general'],
                ],
              },
            ],
          },
        },
      },
      { $literal: word.placements },
    ]);
  });

  it('retains Korean node/lesson identities and isolates every English reference', () => {
    const korean = buildVocabularyCourseSeed();
    const english = buildVocabularyCourseSeed({ courseId: 'en-general' });
    expect(korean.nodes[0].code).toBe('s1_u1_o1');
    expect(korean.nodes[0].lessons[0].code).toBe('s1_u1_o1_l1');
    const authoredNodes = ENGLISH_VOCABULARY_MODULES.flatMap((data) =>
      Object.entries(data)
        .filter(([name]) => /^EN_S\d+_UNIT\d+_NODE\d+$/.test(name))
        .map(([, node]) => node),
    );
    expect(authoredNodes.length).toBeGreaterThan(0);
    expect(english.nodes).toHaveLength(authoredNodes.length);
    expect(
      english.nodes.map((node) => [node.section, node.unit, node.order]),
    ).toEqual(
      authoredNodes.map((node) => {
        const position = node as {
          section: number;
          unit: number;
          order: number;
        };
        return [position.section, position.unit, position.order];
      }),
    );
    for (const node of english.nodes) {
      expect(node.code).toMatch(/^en-general:s/);
      expect(node.targetLanguage).toBe('en');
      for (const lesson of node.lessons) {
        expect(lesson.courseId).toBe('en-general');
        for (const code of lesson.questions) {
          expect(english.questions[code].targetLanguage).toBe('en');
          expect(korean.questions[code]).toBeUndefined();
        }
      }
    }
  });

  it('stores English matching pairs in the neutral text field', () => {
    const { questions } = buildVocabularyCourseSeed({ courseId: 'en-general' });
    const matching = Object.values(questions).filter((question) =>
      Array.isArray(question.pairs),
    );
    expect(matching.length).toBeGreaterThan(0);
    for (const question of matching) {
      for (const pair of question.pairs as Array<{
        text: string;
        korean?: string;
      }>) {
        expect(pair.text.length).toBeGreaterThan(0);
        expect(pair.korean).toBeUndefined();
      }
    }
  });
});
