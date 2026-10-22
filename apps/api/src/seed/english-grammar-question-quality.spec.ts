import {
  ENGLISH_GT_S1_NODES,
  ENGLISH_GT_S1_QUESTIONS,
} from './data/english-grammar/section1';
import {
  ENGLISH_GT_S2_NODES,
  ENGLISH_GT_S2_QUESTIONS,
} from './data/english-grammar/section2';
import {
  ENGLISH_GT_S3_NODES,
  ENGLISH_GT_S3_QUESTIONS,
} from './data/english-grammar/section3';
import {
  ENGLISH_GT_S4_NODES,
  ENGLISH_GT_S4_QUESTIONS,
} from './data/english-grammar/section4';
import {
  ENGLISH_GT_S5_NODES,
  ENGLISH_GT_S5_QUESTIONS,
} from './data/english-grammar/section5';
import {
  ENGLISH_GT_S6_NODES,
  ENGLISH_GT_S6_QUESTIONS,
} from './data/english-grammar/section6';

const sections = [
  { nodes: ENGLISH_GT_S1_NODES, questions: ENGLISH_GT_S1_QUESTIONS },
  { nodes: ENGLISH_GT_S2_NODES, questions: ENGLISH_GT_S2_QUESTIONS },
  { nodes: ENGLISH_GT_S3_NODES, questions: ENGLISH_GT_S3_QUESTIONS },
  { nodes: ENGLISH_GT_S4_NODES, questions: ENGLISH_GT_S4_QUESTIONS },
  { nodes: ENGLISH_GT_S5_NODES, questions: ENGLISH_GT_S5_QUESTIONS },
  { nodes: ENGLISH_GT_S6_NODES, questions: ENGLISH_GT_S6_QUESTIONS },
] as const;

function visualKey(value: string) {
  return value.normalize('NFKC').replaceAll('’', "'").toLowerCase();
}

describe('English grammar question learning quality', () => {
  it('splits every sentence builder into one-token choices', () => {
    for (const { questions } of sections) {
      for (const question of Object.values(questions)) {
        if (question.type !== 'grammar_build') continue;

        expect(question.buildRows.map((row) => row.correct).join(' ')).toBe(
          question.answer,
        );
        for (const row of question.buildRows) {
          expect(row.correct).toMatch(/^\S+$/u);
          expect(row.options).toHaveLength(3);
          expect(new Set(row.options.map(visualKey)).size).toBe(3);
          for (const option of row.options) expect(option).toMatch(/^\S+$/u);
        }
      }
    }
  });

  it('mixes five grammar blanks with five contextual word blanks per lesson', () => {
    for (const { nodes, questions } of sections) {
      for (const node of nodes) {
        for (const lesson of node.lessons) {
          const blanks = lesson.questions
            .map((code) => questions[code])
            .filter((question) => question.type === 'grammar_blank');

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

          for (const question of blanks) {
            expect(
              `${question.sentencePrefix}${question.answer}${question.sentenceSuffix}`,
            ).toBe(question.answerTranslation.en);
            if (question.tags.includes('blank-focus-context')) {
              expect(question.answer).toMatch(/^\S+$/u);
            }
          }
        }
      }
    }
  });

  it('turns the reported keys example into six useful chips', () => {
    const question = ENGLISH_GT_S1_QUESTIONS['en-general:gp_s1_u1_g1_19'];

    expect(question.type).toBe('grammar_build');
    if (question.type !== 'grammar_build') return;
    expect(question.answer).toBe('The keys are on the table.');
    expect(question.buildRows.map((row) => row.correct)).toEqual([
      'The',
      'keys',
      'are',
      'on',
      'the',
      'table.',
    ]);
  });
});
