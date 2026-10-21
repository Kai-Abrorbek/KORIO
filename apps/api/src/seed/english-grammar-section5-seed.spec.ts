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

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

describe('English grammar section 5 seed', () => {
  it('covers source units 58-74 in three app units', () => {
    expect(ENGLISH_GRAMMAR_SEED_S5).toHaveLength(17);
    expect(ENGLISH_GT_S5_NODES).toHaveLength(3);
    expect(ENGLISH_GT_S5_NODES.map((node) => node.lessons.length)).toEqual([
      6, 6, 5,
    ]);
    expect(
      ENGLISH_GRAMMAR_SEED_S5.map((grammar) => grammar.sourceUnit),
    ).toEqual(Array.from({ length: 17 }, (_, index) => index + 58));
    expect(ENGLISH_GRAMMAR_SEED_S5.map((grammar) => grammar.code)).toEqual([
      'en-general:grammar:u058-object-pronouns',
      'en-general:grammar:u059-possessive-adjectives',
      'en-general:grammar:u060-possessive-pronouns-whose',
      'en-general:grammar:u061-pronoun-possessive-comparison',
      'en-general:grammar:u062-reflexive-pronouns',
      'en-general:grammar:u063-possessive-s',
      'en-general:grammar:u064-a-an',
      'en-general:grammar:u065-singular-plural-nouns',
      'en-general:grammar:u066-countable-containers-uncountable',
      'en-general:grammar:u067-countable-uncountable-some',
      'en-general:grammar:u068-a-an-the',
      'en-general:grammar:u069-the',
      'en-general:grammar:u070-place-phrases',
      'en-general:grammar:u071-general-nouns',
      'en-general:grammar:u072-the-with-geographical-names',
      'en-general:grammar:u073-this-that-these-those',
      'en-general:grammar:u074-one-ones',
    ]);
  });

  it('keeps stable node, lesson, and question positions', () => {
    ENGLISH_GT_S5_NODES.forEach((node, unitIndex) => {
      const unit = unitIndex + 1;
      expect(node.code).toBe(`en-general:gt_s5_u${unit}_o1`);
      node.lessons.forEach((lesson, grammarIndex) => {
        const prefix = `en-general:gp_s5_u${unit}_g${grammarIndex + 1}`;
        expect(lesson.questions).toHaveLength(20);
        expect(lesson.questions[0]).toBe(`${prefix}_01`);
        expect(lesson.questions[1]).toBe(`${prefix}_11`);
        expect(lesson.questions[18]).toBe(`${prefix}_10`);
        expect(lesson.questions[19]).toBe(`${prefix}_20`);
      });
    });
  });

  it('gives every grammar a complete multilingual study page', () => {
    for (const grammar of ENGLISH_GRAMMAR_SEED_S5) {
      expect(grammar.section).toBe(5);
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

    const sentences = ENGLISH_GRAMMAR_SEED_S5.flatMap((grammar) =>
      grammar.examples.map((example) => example.text),
    );
    expect(new Set(sentences).size).toBe(sentences.length);
  });

  it('provides ten blanks and ten builds for every grammar', () => {
    expect(Object.keys(ENGLISH_GT_S5_QUESTIONS)).toHaveLength(340);

    for (const node of ENGLISH_GT_S5_NODES) {
      for (const lesson of node.lessons) {
        const questions = lesson.questions.map(
          (code) => ENGLISH_GT_S5_QUESTIONS[code],
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
          expect(question.level).toBe('5');
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

  it('registers all five English sections as one 74-page, 1,480-question course', () => {
    expect([
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
      ...ENGLISH_GRAMMAR_SEED_S4,
      ...ENGLISH_GRAMMAR_SEED_S5,
    ]).toHaveLength(74);
    expect([
      ...ENGLISH_GT_S1_NODES,
      ...ENGLISH_GT_S2_NODES,
      ...ENGLISH_GT_S3_NODES,
      ...ENGLISH_GT_S4_NODES,
      ...ENGLISH_GT_S5_NODES,
    ]).toHaveLength(15);
    expect(
      Object.keys({
        ...ENGLISH_GT_S1_QUESTIONS,
        ...ENGLISH_GT_S2_QUESTIONS,
        ...ENGLISH_GT_S3_QUESTIONS,
        ...ENGLISH_GT_S4_QUESTIONS,
        ...ENGLISH_GT_S5_QUESTIONS,
      }),
    ).toHaveLength(1480);
  });
});
