export type KoreanGrammarLevel = '1' | '2' | '3' | '4' | '5' | '6';

export interface KoreanGrammarTrackQuestion {
  level: string;
  [key: string]: unknown;
}

export interface KoreanGrammarTrackLesson {
  level: string;
  questions: string[];
  [key: string]: unknown;
}

export interface KoreanGrammarTrackNode {
  section: number;
  lessons: KoreanGrammarTrackLesson[];
  [key: string]: unknown;
}

export function koreanGrammarLevelForSection(
  section: number,
): KoreanGrammarLevel {
  if (!Number.isInteger(section) || section < 1 || section > 12) {
    throw new Error(
      `Korean grammar section must be an integer from 1 to 12: ${section}`,
    );
  }

  return String(Math.ceil(section / 2)) as KoreanGrammarLevel;
}

export function normalizeKoreanGrammarTrackLevels(
  nodes: readonly KoreanGrammarTrackNode[],
  questions: Readonly<Record<string, KoreanGrammarTrackQuestion>>,
) {
  const normalizedQuestions: Record<string, KoreanGrammarTrackQuestion> = {
    ...questions,
  };
  const assignedQuestionCodes = new Set<string>();

  const normalizedNodes = nodes.map((node) => {
    const level: KoreanGrammarLevel = koreanGrammarLevelForSection(
      node.section,
    );
    return {
      ...node,
      lessons: node.lessons.map((lesson) => {
        for (const questionCode of lesson.questions) {
          const question = normalizedQuestions[questionCode];
          if (!question) {
            throw new Error(
              `Korean grammar lesson references missing question: ${questionCode}`,
            );
          }
          if (assignedQuestionCodes.has(questionCode)) {
            throw new Error(
              `Korean grammar question is assigned more than once: ${questionCode}`,
            );
          }
          assignedQuestionCodes.add(questionCode);
          normalizedQuestions[questionCode] = { ...question, level };
        }

        return { ...lesson, level };
      }),
    };
  });

  const unassignedQuestionCodes = Object.keys(normalizedQuestions).filter(
    (code) => !assignedQuestionCodes.has(code),
  );
  if (unassignedQuestionCodes.length > 0) {
    throw new Error(
      `Korean grammar questions are not assigned to lessons: ${unassignedQuestionCodes.join(', ')}`,
    );
  }

  return { nodes: normalizedNodes, questions: normalizedQuestions };
}
