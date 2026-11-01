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
import {
  ENGLISH_GRAMMAR_SEED_S8,
  ENGLISH_GT_S8_NODES,
  ENGLISH_GT_S8_QUESTIONS,
} from './data/english-grammar/section8';
import {
  ENGLISH_GRAMMAR_SEED_S9,
  ENGLISH_GT_S9_NODES,
  ENGLISH_GT_S9_QUESTIONS,
} from './data/english-grammar/section9';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 9 seed', () => {
  it('adds thirteen Navigate-based grammar pages in three planned units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S9).toHaveLength(13);
    expect(
      ENGLISH_GRAMMAR_SEED_S9.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 13 }, (_, index) => index + 115));
    expect(
      [1, 2, 3].map(
        (unit) =>
          ENGLISH_GRAMMAR_SEED_S9.filter((grammar) => grammar.unit === unit)
            .length,
      ),
    ).toEqual([4, 4, 5]);
    expect(
      new Set(ENGLISH_GRAMMAR_SEED_S9.map((grammar) => grammar.code)).size,
    ).toBe(ENGLISH_GRAMMAR_SEED_S9.length);
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S9) {
      expect(grammar.courseId).toBe('en-general');
      expect(grammar.targetLanguage).toBe('en');
      expect(grammar.section).toBe(9);
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
  });

  it('generates a complete mixed practice set without publishing it yet', () => {
    expect(ENGLISH_GT_S9_NODES).toHaveLength(3);
    expect(Object.keys(ENGLISH_GT_S9_QUESTIONS)).toHaveLength(260);

    for (const node of ENGLISH_GT_S9_NODES) {
      expect(node.section).toBe(9);

      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S9_QUESTIONS[code],
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
              expect(rebuilt).toBe(question.answer);
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

    const registeredGrammar = [
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
      ...ENGLISH_GRAMMAR_SEED_S4,
      ...ENGLISH_GRAMMAR_SEED_S5,
      ...ENGLISH_GRAMMAR_SEED_S6,
      ...ENGLISH_GRAMMAR_SEED_S7,
      ...ENGLISH_GRAMMAR_SEED_S8,
      ...ENGLISH_GRAMMAR_SEED_S9,
    ];
    const publishedTrackNodes = [
      ...ENGLISH_GT_S1_NODES,
      ...ENGLISH_GT_S2_NODES,
      ...ENGLISH_GT_S3_NODES,
      ...ENGLISH_GT_S4_NODES,
      ...ENGLISH_GT_S5_NODES,
      ...ENGLISH_GT_S6_NODES,
      ...ENGLISH_GT_S7_NODES,
      ...ENGLISH_GT_S8_NODES,
    ];
    const publishedTrackQuestions = {
      ...ENGLISH_GT_S1_QUESTIONS,
      ...ENGLISH_GT_S2_QUESTIONS,
      ...ENGLISH_GT_S3_QUESTIONS,
      ...ENGLISH_GT_S4_QUESTIONS,
      ...ENGLISH_GT_S5_QUESTIONS,
      ...ENGLISH_GT_S6_QUESTIONS,
      ...ENGLISH_GT_S7_QUESTIONS,
      ...ENGLISH_GT_S8_QUESTIONS,
    };

    expect(registeredGrammar).toHaveLength(127);
    expect(registeredGrammar.slice(-13).map((grammar) => grammar.code)).toEqual(
      ENGLISH_GRAMMAR_SEED_S9.map((grammar) => grammar.code),
    );
    expect(publishedTrackNodes).toHaveLength(24);
    expect(Object.keys(publishedTrackQuestions)).toHaveLength(2280);
    expect(Math.max(...publishedTrackNodes.map((node) => node.section))).toBe(
      8,
    );
  });
});
