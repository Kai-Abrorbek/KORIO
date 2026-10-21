import {
  ENGLISH_GRAMMAR_SEED_S2,
  ENGLISH_GT_S2_NODES,
  ENGLISH_GT_S2_QUESTIONS,
} from './data/english-grammar/section2';
import {
  ENGLISH_GRAMMAR_SEED_S1,
  ENGLISH_GT_S1_NODES,
  ENGLISH_GT_S1_QUESTIONS,
} from './data/english-grammar/section1';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 2 seed', () => {
  it('covers source units 13-25 in three app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S2).toHaveLength(13);
    expect(ENGLISH_GT_S2_NODES).toHaveLength(3);
    expect(ENGLISH_GT_S2_NODES.map((node) => node.lessons.length)).toEqual([
      4, 4, 5,
    ]);
    expect(
      ENGLISH_GRAMMAR_SEED_S2.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 13 }, (_, index) => index + 13));
    expect(ENGLISH_GRAMMAR_SEED_S2.map((grammar) => grammar.code)).toEqual([
      'en-general:grammar:u013-past-continuous',
      'en-general:grammar:u014-past-continuous-vs-past-simple',
      'en-general:grammar:u015-present-perfect',
      'en-general:grammar:u016-present-perfect-just-already-yet',
      'en-general:grammar:u017-present-perfect-ever-never',
      'en-general:grammar:u018-present-perfect-how-long',
      'en-general:grammar:u019-for-since-ago',
      'en-general:grammar:u020-present-perfect-vs-past-simple',
      'en-general:grammar:u021-passive-present-past',
      'en-general:grammar:u022-passive-continuous-perfect',
      'en-general:grammar:u023-be-have-do-present-past',
      'en-general:grammar:u024-regular-irregular-verbs',
      'en-general:grammar:u025-used-to',
    ]);
  });

  it('keeps stable node, lesson, and question positions', () => {
    ENGLISH_GT_S2_NODES.forEach((node, unitIndex) => {
      const unit = unitIndex + 1;
      expect(node.code).toBe(`en-general:gt_s2_u${unit}_o1`);
      node.lessons.forEach((lesson, grammarIndex) => {
        const prefix = `en-general:gp_s2_u${unit}_g${grammarIndex + 1}`;
        expect(lesson.questions).toHaveLength(20);
        expect(lesson.questions[0]).toBe(`${prefix}_01`);
        expect(lesson.questions[1]).toBe(`${prefix}_11`);
        expect(lesson.questions[18]).toBe(`${prefix}_10`);
        expect(lesson.questions[19]).toBe(`${prefix}_20`);
      });
    });
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S2) {
      expect(grammar.section).toBe(2);
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
    expect(Object.keys(ENGLISH_GT_S2_QUESTIONS)).toHaveLength(260);

    for (const node of ENGLISH_GT_S2_NODES) {
      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S2_QUESTIONS[code],
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

  it('accepts full negative forms as well as contractions', () => {
    const blanks = Object.values(ENGLISH_GT_S2_QUESTIONS).filter(
      (question) => question.type === 'grammar_blank',
    );
    const expectedAlternatives = [
      ["weren't sleeping", 'were not sleeping'],
      ["haven't chosen", 'have not chosen'],
      ["hasn't replied", 'has not replied'],
      ["hasn't arrived", 'has not arrived'],
      ["haven't been printed", 'have not been printed'],
      ["didn't use to wear", 'did not use to wear'],
    ] as const;

    for (const [answer, alternative] of expectedAlternatives) {
      const question = blanks.find((candidate) => candidate.answer === answer);
      expect(question).toBeDefined();
      expect(question?.acceptedAnswers).toContain(alternative);
    }
  });

  it('registers both English sections as one 25-page, 500-question course', () => {
    expect([
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
    ]).toHaveLength(25);
    expect([...ENGLISH_GT_S1_NODES, ...ENGLISH_GT_S2_NODES]).toHaveLength(6);
    expect(
      Object.keys({
        ...ENGLISH_GT_S1_QUESTIONS,
        ...ENGLISH_GT_S2_QUESTIONS,
      }),
    ).toHaveLength(500);
  });
});
