import {
  ENGLISH_GRAMMAR_SEED_S1,
  ENGLISH_GT_S1_NODES,
  ENGLISH_GT_S1_QUESTIONS,
} from './data/english-grammar/section1';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 1 seed', () => {
  it('covers source units 1-12 as 12 grammar pages and 3 app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S1).toHaveLength(12);
    expect(ENGLISH_GT_S1_NODES).toHaveLength(3);
    expect(
      ENGLISH_GRAMMAR_SEED_S1.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
  });

  it('gives every page ten examples, five quizzes, dialogue, and cautions', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S1) {
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

  it('provides ten blanks and ten sentence builds for every grammar', () => {
    expect(Object.keys(ENGLISH_GT_S1_QUESTIONS)).toHaveLength(240);

    for (const node of ENGLISH_GT_S1_NODES) {
      expect(node.courseId).toBe('en-general');
      expect(node.targetLanguage).toBe('en');

      for (const lesson of node.lessons) {
        expect(lesson.questions).toHaveLength(20);
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S1_QUESTIONS[code],
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
          expect(question.courseId).toBe('en-general');
          expect(question.targetLanguage).toBe('en');
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

  it('accepts standard full forms when a typed answer uses a contraction', () => {
    const blanks = Object.values(ENGLISH_GT_S1_QUESTIONS).filter(
      (question) => question.type === 'grammar_blank',
    );
    const expectedAlternatives = [
      ["don't like", 'do not like'],
      ["doesn't drive", 'does not drive'],
      ["hasn't got", 'has not got'],
      ["wasn't", 'was not'],
      ["weren't", 'were not'],
      ["didn't go", 'did not go'],
    ] as const;

    for (const [answer, alternative] of expectedAlternatives) {
      const question = blanks.find((candidate) => candidate.answer === answer);
      expect(question).toBeDefined();
      expect(question?.acceptedAnswers).toContain(alternative);
    }
  });
});
