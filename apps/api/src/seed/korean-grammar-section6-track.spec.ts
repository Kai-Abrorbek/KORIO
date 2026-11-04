import { GT_S6_NODES, GT_S6_QUESTIONS } from './data/grammar-track/section6';

const questionNumber = (code: string) => Number(code.slice(-2));
const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

const expectFourLanguages = (
  value: Record<(typeof LANGUAGES)[number], string>,
) => {
  for (const language of LANGUAGES) {
    expect(value[language].trim().length).toBeGreaterThan(0);
  }
};

const rebuildBlank = (question: (typeof GT_S6_QUESTIONS)[string]) => {
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

const rebuildSentence = (question: (typeof GT_S6_QUESTIONS)[string]) => {
  if (question.type !== 'grammar_build') throw new Error('not a build');
  return question.buildRows.map((row) => row.correct).join(' ');
};

describe('Korean grammar section 6 track', () => {
  it('registers 33 lessons and 660 stable question codes', () => {
    expect(GT_S6_NODES).toHaveLength(9);
    expect(GT_S6_NODES.map((node) => node.lessons.length)).toEqual([
      4, 3, 4, 4, 4, 4, 4, 4, 2,
    ]);
    expect(Object.keys(GT_S6_QUESTIONS)).toHaveLength(660);

    const lessonCodes = GT_S6_NODES.flatMap((node) =>
      node.lessons.flatMap((lesson) => lesson.questions),
    );
    expect(lessonCodes).toHaveLength(660);
    expect(new Set(lessonCodes).size).toBe(660);
    expect(new Set(lessonCodes)).toEqual(new Set(Object.keys(GT_S6_QUESTIONS)));
  });

  it('keeps types mixed and uses globally distinct blank and build sentences', () => {
    let multiBlankCount = 0;
    let threeBlankCount = 0;
    const allSentences = new Set<string>();

    for (const node of GT_S6_NODES) {
      for (const lesson of node.lessons) {
        expect(lesson.questions).toHaveLength(20);
        const numbers = lesson.questions.map(questionNumber);
        expect(numbers).not.toEqual([...numbers].sort((a, b) => a - b));

        const orderedTypes = lesson.questions.map(
          (code) => GT_S6_QUESTIONS[code].type,
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
          .map((code) => GT_S6_QUESTIONS[code])
          .filter((question) => question.type === 'grammar_blank');
        const builds = lesson.questions
          .map((code) => GT_S6_QUESTIONS[code])
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

    expect(multiBlankCount).toBe(132);
    expect(threeBlankCount).toBe(33);
    expect(allSentences.size).toBe(660);
  });

  it('rebuilds every answer and keeps three unique choices per build row', () => {
    for (const question of Object.values(GT_S6_QUESTIONS)) {
      expect(question.level).toBe('6');
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
