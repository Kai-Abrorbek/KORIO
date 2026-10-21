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

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 4 seed', () => {
  it('covers source units 39-57 in three app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S4).toHaveLength(19);
    expect(ENGLISH_GT_S4_NODES).toHaveLength(3);
    expect(ENGLISH_GT_S4_NODES.map((node) => node.lessons.length)).toEqual([
      6, 6, 7,
    ]);
    expect(
      ENGLISH_GRAMMAR_SEED_S4.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 19 }, (_, index) => index + 39));
    expect(ENGLISH_GRAMMAR_SEED_S4.map((grammar) => grammar.code)).toEqual([
      'en-general:grammar:u039-short-responses',
      'en-general:grammar:u040-echo-questions-and-tags',
      'en-general:grammar:u041-too-either-so-neither',
      'en-general:grammar:u042-negative-forms',
      'en-general:grammar:u043-question-forms',
      'en-general:grammar:u044-subject-object-questions',
      'en-general:grammar:u045-preposition-questions',
      'en-general:grammar:u046-what-which-how',
      'en-general:grammar:u047-how-long-does-it-take',
      'en-general:grammar:u048-indirect-questions',
      'en-general:grammar:u049-reported-speech',
      'en-general:grammar:u050-verb-forms',
      'en-general:grammar:u051-infinitive-or-ing',
      'en-general:grammar:u052-object-to-infinitive',
      'en-general:grammar:u053-purpose-with-to',
      'en-general:grammar:u054-go-patterns',
      'en-general:grammar:u055-get',
      'en-general:grammar:u056-do-make',
      'en-general:grammar:u057-have',
    ]);
  });

  it('keeps stable node, lesson, and question positions', () => {
    ENGLISH_GT_S4_NODES.forEach((node, unitIndex) => {
      const unit = unitIndex + 1;
      expect(node.code).toBe(`en-general:gt_s4_u${unit}_o1`);
      node.lessons.forEach((lesson, grammarIndex) => {
        const prefix = `en-general:gp_s4_u${unit}_g${grammarIndex + 1}`;
        expect(lesson.questions).toHaveLength(20);
        expect(lesson.questions[0]).toBe(`${prefix}_01`);
        expect(lesson.questions[1]).toBe(`${prefix}_11`);
        expect(lesson.questions[18]).toBe(`${prefix}_10`);
        expect(lesson.questions[19]).toBe(`${prefix}_20`);
      });
    });
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S4) {
      expect(grammar.section).toBe(4);
      expect(grammar.courseId).toBe('en-general');
      expect(grammar.targetLanguage).toBe('en');
      expect(grammar.examples).toHaveLength(10);
      expect(grammar.quiz).toHaveLength(5);
      expect(grammar.dialogue).toHaveLength(4);
      expect(grammar.cautions).toHaveLength(3);

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
      for (const line of grammar.dialogue) {
        for (const language of LANGUAGES) {
          expect(line.gloss[language].trim()).not.toBe('');
        }
        if (line.highlight) expect(line.text).toContain(line.highlight);
      }
      for (const quiz of grammar.quiz) {
        expect(quiz.prompt).toContain('___');
        expect(quiz.options).toHaveLength(3);
        expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      }
    }

    const sentences = ENGLISH_GRAMMAR_SEED_S4.flatMap((grammar) =>
      grammar.examples.map((example) => example.text),
    );
    expect(new Set(sentences).size).toBe(sentences.length);
  });

  it('provides ten blanks and ten builds for every grammar', () => {
    expect(Object.keys(ENGLISH_GT_S4_QUESTIONS)).toHaveLength(380);

    for (const node of ENGLISH_GT_S4_NODES) {
      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S4_QUESTIONS[code],
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
          expect(question.level).toBe('4');
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

  it('registers all four English sections as one 57-page, 1,140-question course', () => {
    expect([
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
      ...ENGLISH_GRAMMAR_SEED_S4,
    ]).toHaveLength(57);
    expect([
      ...ENGLISH_GT_S1_NODES,
      ...ENGLISH_GT_S2_NODES,
      ...ENGLISH_GT_S3_NODES,
      ...ENGLISH_GT_S4_NODES,
    ]).toHaveLength(12);
    expect(
      Object.keys({
        ...ENGLISH_GT_S1_QUESTIONS,
        ...ENGLISH_GT_S2_QUESTIONS,
        ...ENGLISH_GT_S3_QUESTIONS,
        ...ENGLISH_GT_S4_QUESTIONS,
      }),
    ).toHaveLength(1140);
  });
});
