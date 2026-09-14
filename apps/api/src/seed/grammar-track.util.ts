export const GRAMMAR_QUESTIONS_PER_NODE = 15;

export interface GrammarLessonPart<T> {
  lesson: T;
  sourceIndex: number;
  partIndex: number;
  partCount: number;
}

/**
 * 한 문법의 문제를 순서대로 최대 15문항씩 나눈다.
 * 첫 파트가 기존 레슨 코드를 이어받으므로 기존 완료 기록도 최대한 보존된다.
 */
export function splitGrammarLessonParts<T extends { questions: string[] }>(
  lessons: readonly T[],
  maxQuestions = GRAMMAR_QUESTIONS_PER_NODE,
): GrammarLessonPart<T>[] {
  if (!Number.isInteger(maxQuestions) || maxQuestions < 1) {
    throw new Error('maxQuestions must be a positive integer');
  }

  return lessons.flatMap((lesson, sourceIndex) => {
    const partCount = Math.max(
      1,
      Math.ceil(lesson.questions.length / maxQuestions),
    );
    return Array.from({ length: partCount }, (_, partIndex) => {
      const start = partIndex * maxQuestions;
      const questions = lesson.questions.slice(start, start + maxQuestions);

      return {
        lesson: { ...lesson, questions },
        sourceIndex,
        partIndex,
        partCount,
      };
    });
  });
}
