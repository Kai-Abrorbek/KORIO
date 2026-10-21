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

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 3 seed', () => {
  it('covers source units 26-38 in three app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S3).toHaveLength(13);
    expect(ENGLISH_GT_S3_NODES).toHaveLength(3);
    expect(ENGLISH_GT_S3_NODES.map((node) => node.lessons.length)).toEqual([
      5, 5, 3,
    ]);
    expect(
      ENGLISH_GRAMMAR_SEED_S3.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 13 }, (_, index) => index + 26));
    expect(ENGLISH_GRAMMAR_SEED_S3.map((grammar) => grammar.code)).toEqual([
      'en-general:grammar:u026-present-continuous-future',
      'en-general:grammar:u027-going-to',
      'en-general:grammar:u028-will-shall-predictions',
      'en-general:grammar:u029-will-shall-decisions',
      'en-general:grammar:u030-might',
      'en-general:grammar:u031-can-could',
      'en-general:grammar:u032-must-mustnt-neednt',
      'en-general:grammar:u033-should',
      'en-general:grammar:u034-have-to',
      'en-general:grammar:u035-would-like',
      'en-general:grammar:u036-there-is-are',
      'en-general:grammar:u037-there-tenses',
      'en-general:grammar:u038-it',
    ]);
  });

  it('keeps stable node, lesson, and question positions', () => {
    ENGLISH_GT_S3_NODES.forEach((node, unitIndex) => {
      const unit = unitIndex + 1;
      expect(node.code).toBe(`en-general:gt_s3_u${unit}_o1`);
      node.lessons.forEach((lesson, grammarIndex) => {
        const prefix = `en-general:gp_s3_u${unit}_g${grammarIndex + 1}`;
        expect(lesson.questions).toHaveLength(20);
        expect(lesson.questions[0]).toBe(`${prefix}_01`);
        expect(lesson.questions[1]).toBe(`${prefix}_11`);
        expect(lesson.questions[18]).toBe(`${prefix}_10`);
        expect(lesson.questions[19]).toBe(`${prefix}_20`);
      });
    });
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S3) {
      expect(grammar.section).toBe(3);
      expect(grammar.courseId).toBe('en-general');
      expect(grammar.targetLanguage).toBe('en');
      expect(grammar.examples).toHaveLength(10);
      expect(grammar.quiz).toHaveLength(5);
      expect(grammar.dialogue.length).toBeGreaterThanOrEqual(4);
      expect(grammar.cautions.length).toBeGreaterThanOrEqual(3);

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
        expect(example.gloss.en).toBe(example.text);
      }
      for (const quiz of grammar.quiz) {
        expect(quiz.prompt).toContain('___');
        expect(quiz.options).toHaveLength(3);
        expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      }
    }
  });

  it('provides ten blanks and ten builds for every grammar', () => {
    expect(Object.keys(ENGLISH_GT_S3_QUESTIONS)).toHaveLength(260);

    for (const node of ENGLISH_GT_S3_NODES) {
      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S3_QUESTIONS[code],
        );
        expect(
          questions.filter((question) => question.type === 'grammar_blank'),
        ).toHaveLength(10);
        expect(
          questions.filter((question) => question.type === 'grammar_build'),
        ).toHaveLength(10);

        questions.forEach((question, index) => {
          expect(question.type).toBe(
            index % 2 === 0 ? 'grammar_blank' : 'grammar_build',
          );
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
            expect(
              `${question.sentencePrefix}${question.answer}${question.sentenceSuffix}`,
            ).toBe(question.answerTranslation.en);
          } else {
            expect(question.buildRows.map((row) => row.correct).join(' ')).toBe(
              question.answer,
            );
            for (const row of question.buildRows) {
              expect(row.options).toHaveLength(3);
              expect(new Set(row.options).size).toBe(3);
              expect(row.options).toContain(row.correct);
            }
          }
        });
      }
    }
  });

  it('accepts natural full forms in both blank and sentence-building drills', () => {
    const questions = Object.values(ENGLISH_GT_S3_QUESTIONS);
    const blank = questions.find(
      (question) =>
        question.type === 'grammar_blank' && question.answer === "There's",
    );
    const build = questions.find(
      (question) =>
        question.type === 'grammar_build' &&
        question.answer === "There's a message for you.",
    );
    const negativeBuild = questions.find(
      (question) =>
        question.type === 'grammar_build' && question.answer.includes("can't"),
    );

    expect(blank?.acceptedAnswers).toContain('There is');
    expect(build?.acceptedAnswers).toContain('There is a message for you.');
    expect(negativeBuild).toBeDefined();
    expect(
      negativeBuild?.acceptedAnswers.some((answer) =>
        answer.includes('cannot'),
      ),
    ).toBe(true);
  });

  it('registers all three English sections as one 38-page, 760-question course', () => {
    expect([
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
    ]).toHaveLength(38);
    expect([
      ...ENGLISH_GT_S1_NODES,
      ...ENGLISH_GT_S2_NODES,
      ...ENGLISH_GT_S3_NODES,
    ]).toHaveLength(9);
    expect(
      Object.keys({
        ...ENGLISH_GT_S1_QUESTIONS,
        ...ENGLISH_GT_S2_QUESTIONS,
        ...ENGLISH_GT_S3_QUESTIONS,
      }),
    ).toHaveLength(760);
  });
});
