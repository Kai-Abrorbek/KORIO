import {
  ENGLISH_GRAMMAR_SEED_S1,
  ENGLISH_GT_S1_NODES,
  ENGLISH_GT_S1_QUESTIONS,
} from './data/english-grammar/section1';
import {
  ENGLISH_GRAMMAR_SEED_S2,
  ENGLISH_GT_S2_NODES,
  ENGLISH_GT_S2_QUESTIONS,
} from './data/english-grammar/section2';
import {
  ENGLISH_GRAMMAR_SEED_S3,
  ENGLISH_GT_S3_NODES,
  ENGLISH_GT_S3_QUESTIONS,
} from './data/english-grammar/section3';
import {
  ENGLISH_GRAMMAR_SEED_S4,
  ENGLISH_GT_S4_NODES,
  ENGLISH_GT_S4_QUESTIONS,
} from './data/english-grammar/section4';
import {
  ENGLISH_GRAMMAR_SEED_S5,
  ENGLISH_GT_S5_NODES,
  ENGLISH_GT_S5_QUESTIONS,
} from './data/english-grammar/section5';
import {
  ENGLISH_GRAMMAR_SEED_S6,
  ENGLISH_GT_S6_NODES,
  ENGLISH_GT_S6_QUESTIONS,
} from './data/english-grammar/section6';
import { ENGLISH_GRAMMAR_SEED_S7 } from './data/english-grammar/section7';
import { ENGLISH_GRAMMAR_SEED_S8 } from './data/english-grammar/section8';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar sections 7-8 explanation seed', () => {
  const pages = [...ENGLISH_GRAMMAR_SEED_S7, ...ENGLISH_GRAMMAR_SEED_S8];

  it('finishes source units 92-114 in the planned app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S7).toHaveLength(15);
    expect(ENGLISH_GRAMMAR_SEED_S8).toHaveLength(8);
    expect(pages.map((grammar) => grammar.sourceUnit)).toEqual(
      Array.from({ length: 23 }, (_, index) => index + 92),
    );

    const countByUnit = (section: number) =>
      [1, 2, 3].map(
        (unit) =>
          pages.filter(
            (grammar) => grammar.section === section && grammar.unit === unit,
          ).length,
      );
    expect(countByUnit(7)).toEqual([5, 5, 5]);
    expect(countByUnit(8)).toEqual([3, 3, 2]);
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of pages) {
      expect(grammar.courseId).toBe('en-general');
      expect(grammar.targetLanguage).toBe('en');
      expect(grammar.examples).toHaveLength(10);
      expect(grammar.quiz).toHaveLength(5);
      expect(grammar.dialogue.length).toBeGreaterThanOrEqual(2);
      expect(grammar.cautions.length).toBeGreaterThanOrEqual(2);

      for (const field of [
        grammar.summary,
        grammar.explanation,
        grammar.conjugationRule,
        ...grammar.tags,
        ...grammar.cautions,
      ]) {
        for (const language of LANGUAGES) {
          expect(field[language].trim()).not.toBe('');
        }
      }

      for (const example of grammar.examples) {
        expect(example.text).toContain(example.highlight);
        for (const language of LANGUAGES) {
          expect(example.gloss[language].trim()).not.toBe('');
        }
      }
      for (const quiz of grammar.quiz) {
        expect(quiz.prompt).toContain('___');
        expect(quiz.options).toHaveLength(3);
        expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      }
    }

    expect(new Set(pages.map((grammar) => grammar.code)).size).toBe(
      pages.length,
    );
  });

  it('registers 114 explanation pages without publishing unfinished track problems', () => {
    const grammarSeed = [
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
      ...ENGLISH_GRAMMAR_SEED_S4,
      ...ENGLISH_GRAMMAR_SEED_S5,
      ...ENGLISH_GRAMMAR_SEED_S6,
      ...ENGLISH_GRAMMAR_SEED_S7,
      ...ENGLISH_GRAMMAR_SEED_S8,
    ];
    const trackNodes = [
      ...ENGLISH_GT_S1_NODES,
      ...ENGLISH_GT_S2_NODES,
      ...ENGLISH_GT_S3_NODES,
      ...ENGLISH_GT_S4_NODES,
      ...ENGLISH_GT_S5_NODES,
      ...ENGLISH_GT_S6_NODES,
    ];
    const trackQuestions = {
      ...ENGLISH_GT_S1_QUESTIONS,
      ...ENGLISH_GT_S2_QUESTIONS,
      ...ENGLISH_GT_S3_QUESTIONS,
      ...ENGLISH_GT_S4_QUESTIONS,
      ...ENGLISH_GT_S5_QUESTIONS,
      ...ENGLISH_GT_S6_QUESTIONS,
    };

    expect(grammarSeed).toHaveLength(114);
    expect(trackNodes).toHaveLength(18);
    expect(Object.keys(trackQuestions)).toHaveLength(1820);
    expect(Math.max(...trackNodes.map((node) => node.section))).toBe(6);
  });
});
