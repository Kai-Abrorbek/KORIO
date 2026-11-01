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
import {
  ENGLISH_GRAMMAR_SEED_S7,
  ENGLISH_GT_S7_NODES,
  ENGLISH_GT_S7_QUESTIONS,
} from './data/english-grammar/section7';
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

  it('provides a complete, mixed Section 7 grammar practice track', () => {
    expect(ENGLISH_GT_S7_NODES).toHaveLength(3);
    expect(Object.keys(ENGLISH_GT_S7_QUESTIONS)).toHaveLength(300);

    for (const node of ENGLISH_GT_S7_NODES) {
      expect(node.section).toBe(7);
      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S7_QUESTIONS[code],
        );
        const blanks = questions.filter(
          (question) => question.type === 'grammar_blank',
        );
        const builds = questions.filter(
          (question) => question.type === 'grammar_build',
        );
        const multiBlanks = blanks.filter(
          (question) => question.sentenceTemplate,
        );

        expect(blanks).toHaveLength(10);
        expect(builds).toHaveLength(10);
        expect(multiBlanks).toHaveLength(3);
        expect(
          multiBlanks.filter((question) => question.blankAnswers?.length === 2),
        ).toHaveLength(2);
        expect(
          multiBlanks.filter((question) => question.blankAnswers?.length === 3),
        ).toHaveLength(1);
        expect(
          blanks.filter((question) =>
            question.tags.includes('blank-focus-grammar'),
          ),
        ).toHaveLength(5);
        expect(
          blanks.filter((question) =>
            question.tags.includes('blank-focus-context'),
          ),
        ).toHaveLength(5);

        questions.forEach((question, index) => {
          expect(question.type).toBe(
            index % 2 === 0 ? 'grammar_blank' : 'grammar_build',
          );
          expect(question.level).toBe('6');
          expect(new Set(question.acceptedAnswers).size).toBe(
            question.acceptedAnswers.length,
          );
          expect(question.acceptedAnswers).not.toContain(question.answer);

          for (const field of [
            question.instruction,
            question.answerTranslation,
            question.hint,
            question.explanation,
          ]) {
            for (const language of LANGUAGES) {
              expect(field[language].trim()).not.toBe('');
            }
          }

          if (question.type === 'grammar_blank') {
            if (question.sentenceTemplate) {
              let answerIndex = 0;
              const rebuilt = question.sentenceTemplate.replace(
                /_{3,}/g,
                () => question.blankAnswers?.[answerIndex++] ?? '',
              );
              expect(question.answer).toBe(rebuilt);
              expect(rebuilt).toBe(question.answerTranslation.en);
            } else {
              expect(
                `${question.sentencePrefix}${question.answer}${question.sentenceSuffix}`,
              ).toBe(question.answerTranslation.en);
            }
          } else {
            expect(question.buildRows.map((row) => row.correct).join(' ')).toBe(
              question.answer,
            );
            for (const row of question.buildRows) {
              expect(row.options).toHaveLength(3);
              expect(new Set(row.options).size).toBe(3);
              expect(row.options).toContain(row.correct);
              expect(row.options.every((option) => /^\S+$/u.test(option))).toBe(
                true,
              );
            }
          }
        });
      }
    }
  });

  it('registers Section 7 practice while keeping Section 8 explanation-only', () => {
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
      ...ENGLISH_GT_S7_NODES,
    ];
    const trackQuestions = {
      ...ENGLISH_GT_S1_QUESTIONS,
      ...ENGLISH_GT_S2_QUESTIONS,
      ...ENGLISH_GT_S3_QUESTIONS,
      ...ENGLISH_GT_S4_QUESTIONS,
      ...ENGLISH_GT_S5_QUESTIONS,
      ...ENGLISH_GT_S6_QUESTIONS,
      ...ENGLISH_GT_S7_QUESTIONS,
    };

    expect(grammarSeed).toHaveLength(114);
    expect(trackNodes).toHaveLength(21);
    expect(Object.keys(trackQuestions)).toHaveLength(2120);
    expect(Math.max(...trackNodes.map((node) => node.section))).toBe(7);
  });
});
