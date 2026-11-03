import { GT_S5_NODES, GT_S5_QUESTIONS } from './data/grammar-track/section5';

const questionNumber = (code: string) => Number(code.slice(-2));
const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

const expectFourLanguages = (
  value: Record<(typeof LANGUAGES)[number], string>,
) => {
  for (const language of LANGUAGES) {
    expect(value[language].trim().length).toBeGreaterThan(0);
  }
};

const rebuildBlank = (question: (typeof GT_S5_QUESTIONS)[string]) => {
  if (question.type !== 'grammar_blank') throw new Error('not a blank');
  if (!question.sentenceTemplate) {
    return `${question.sentencePrefix}${question.answer}${question.sentenceSuffix}`;
  }
  let answerIndex = 0;
  return question.sentenceTemplate.replace(
    /_{3,}/gu,
    () => question.blankAnswers?.[answerIndex++] ?? '',
  );
};

const rebuildSentence = (question: (typeof GT_S5_QUESTIONS)[string]) => {
  if (question.type !== 'grammar_build') throw new Error('not a build');
  return question.buildRows.map((row) => row.correct).join(' ');
};

describe('Korean grammar section 5 track', () => {
  it('registers 35 lessons and 700 stable question codes', () => {
    expect(GT_S5_NODES).toHaveLength(9);
    expect(GT_S5_NODES.map((node) => node.lessons.length)).toEqual([
      4, 4, 4, 4, 4, 3, 4, 4, 4,
    ]);
    expect(Object.keys(GT_S5_QUESTIONS)).toHaveLength(700);

    const lessonCodes = GT_S5_NODES.flatMap((node) =>
      node.lessons.flatMap((lesson) => lesson.questions),
    );
    expect(lessonCodes).toHaveLength(700);
    expect(new Set(lessonCodes).size).toBe(700);
    expect(new Set(lessonCodes)).toEqual(new Set(Object.keys(GT_S5_QUESTIONS)));
  });

  it('keeps types mixed and uses distinct blank and build sentences', () => {
    let multiBlankCount = 0;
    let threeBlankCount = 0;
    const allSentences = new Set<string>();

    for (const node of GT_S5_NODES) {
      for (const lesson of node.lessons) {
        expect(lesson.questions).toHaveLength(20);
        const numbers = lesson.questions.map(questionNumber);
        expect(numbers).not.toEqual([...numbers].sort((a, b) => a - b));

        const orderedTypes = lesson.questions.map(
          (code) => GT_S5_QUESTIONS[code].type,
        );
        let longestRun = 0;
        let currentRun = 0;
        let previous = '';
        for (const type of orderedTypes) {
          currentRun = type === previous ? currentRun + 1 : 1;
          previous = type;
          longestRun = Math.max(longestRun, currentRun);
        }
        expect(longestRun).toBeLessThanOrEqual(2);

        const blanks = lesson.questions
          .map((code) => GT_S5_QUESTIONS[code])
          .filter((question) => question.type === 'grammar_blank');
        const builds = lesson.questions
          .map((code) => GT_S5_QUESTIONS[code])
          .filter((question) => question.type === 'grammar_build');
        expect(blanks).toHaveLength(10);
        expect(builds).toHaveLength(10);
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

        const blankSentences = new Set(blanks.map(rebuildBlank));
        const buildSentences = new Set(builds.map(rebuildSentence));
        expect(blankSentences.size).toBe(10);
        expect(buildSentences.size).toBe(10);
        expect(
          [...blankSentences].filter((sentence) =>
            buildSentences.has(sentence),
          ),
        ).toEqual([]);
        for (const sentence of [...blankSentences, ...buildSentences]) {
          expect(allSentences.has(sentence)).toBe(false);
          allSentences.add(sentence);
        }

        const multiBlanks = blanks.filter(
          (question) =>
            question.type === 'grammar_blank' && question.sentenceTemplate,
        );
        expect(multiBlanks).toHaveLength(4);
        multiBlankCount += multiBlanks.length;
        const threeBlanks = multiBlanks.filter(
          (question) => question.blankAnswers?.length === 3,
        );
        expect(threeBlanks).toHaveLength(1);
        threeBlankCount += threeBlanks.length;
      }
    }

    expect(multiBlankCount).toBe(140);
    expect(threeBlankCount).toBe(35);
    expect(allSentences.size).toBe(700);
  });

  it('rebuilds every answer and keeps three unique choices per build row', () => {
    for (const question of Object.values(GT_S5_QUESTIONS)) {
      expectFourLanguages(question.instruction);
      expectFourLanguages(question.answerTranslation);
      expectFourLanguages(question.hint);
      expectFourLanguages(question.explanation);

      if (question.type === 'grammar_blank') {
        const rebuilt = rebuildBlank(question);
        expect(rebuilt).toBe(question.answerTranslation.ko);
        if (question.sentenceTemplate) {
          expect(question.answer).toBe(rebuilt);
          expect(question.sentenceTemplate.match(/_{3,}/gu)?.length).toBe(
            question.blankAnswers?.length,
          );
        }
        continue;
      }

      const rebuilt = rebuildSentence(question);
      expect(rebuilt).toBe(question.answer);
      expect(rebuilt).toBe(question.answerTranslation.ko);
      for (const row of question.buildRows) {
        expect(row.options).toHaveLength(3);
        expect(new Set(row.options).size).toBe(3);
        expect(row.options).toContain(row.correct);
        expect(row.options.every((option) => !/\s/u.test(option))).toBe(true);
      }
    }
  });
});
