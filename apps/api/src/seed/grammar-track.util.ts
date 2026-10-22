export const GRAMMAR_QUESTIONS_PER_NODE = 15;

export interface GrammarLessonPart<T> {
  lesson: T;
  sourceIndex: number;
  partIndex: number;
  partCount: number;
}

/**
 * 한 문법의 문제를 순서대로 최대 15문항씩, 파트 간 차이가 한 문제를 넘지
 * 않도록 고르게 나눈다. 20문항을 15+5로 나누면 두 번째 노드가 지나치게 짧아지므로
 * 10+10으로 배분한다.
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
    const baseSize = Math.floor(lesson.questions.length / partCount);
    const largerParts = lesson.questions.length % partCount;
    return Array.from({ length: partCount }, (_, partIndex) => {
      const size = baseSize + (partIndex < largerParts ? 1 : 0);
      const start = partIndex * baseSize + Math.min(partIndex, largerParts);
      const questions = lesson.questions.slice(start, start + size);

      return {
        lesson: { ...lesson, questions },
        sourceIndex,
        partIndex,
        partCount,
      };
    });
  });
}
