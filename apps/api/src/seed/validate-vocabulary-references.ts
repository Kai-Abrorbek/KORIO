interface VocabularyLessonReference {
  title: { ko: string };
  questions: readonly string[];
}

interface VocabularyNodeReference {
  title: { ko: string };
  section: number;
  unit: number;
  order: number;
  lessons: readonly VocabularyLessonReference[];
}

/** Reject broken lesson references before any vocabulary seed writes reach MongoDB. */
export function findVocabularyReferenceErrors(
  questions: Record<string, unknown>,
  nodes: readonly VocabularyNodeReference[],
): string[] {
  const errors: string[] = [];

  for (const node of nodes) {
    const nodeCode = `s${node.section}_u${node.unit}_o${node.order}`;

    for (const [index, lesson] of node.lessons.entries()) {
      const lessonCode = `${nodeCode}_l${index + 1}`;
      if (lesson.questions.length === 0) {
        errors.push(`${lessonCode}: 문제 참조가 없습니다`);
      }

      for (const key of lesson.questions) {
        if (!Object.prototype.hasOwnProperty.call(questions, key)) {
          errors.push(`${lessonCode}: 없는 키 ${key}`);
        }
      }
    }
  }

  return errors;
}
