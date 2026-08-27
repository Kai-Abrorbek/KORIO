type GradingMode = 'exact' | 'semantic' | 'targetExpression';

interface SeedGrading {
  mode: GradingMode;
  expectedMeaning: string;
  targetExpressions?: string[];
  requiredRegister?: string;
  acceptedAnswers?: string[];
  notes?: string[];
  tolerance?: {
    punctuation?: boolean;
    spacing?: boolean;
    minorTypos?: boolean;
  };
}

interface SeedQuestionLike {
  type?: string;
  answer?: string;
  blankAnswers?: string[];
  answerTranslation?: {
    ko?: string;
    en?: string;
  };
  grading?: SeedGrading;
}

const TYPING_TYPES = new Set([
  'type_answer',
  'translate_type',
  'listen_type',
  'listen_fill',
]);

const exactTolerance = {
  punctuation: true,
  spacing: false,
  minorTypos: false,
};

const productiveTolerance = {
  punctuation: true,
  spacing: true,
  minorTypos: true,
};

function expectedMeaningOf(code: string, question: SeedQuestionLike): string {
  const expectedMeaning =
    question.answerTranslation?.en?.trim() ||
    question.answerTranslation?.ko?.trim() ||
    question.answer?.trim();

  if (!expectedMeaning) {
    throw new Error(
      `[section3 grading] ${code} needs answerTranslation.en or a canonical answer`,
    );
  }

  return expectedMeaning;
}

function targetExpressionsOf(
  code: string,
  question: SeedQuestionLike,
): string[] {
  const targetExpressions = (question.blankAnswers?.length
    ? question.blankAnswers
    : [question.answer]
  )
    .map((value) => value?.trim() ?? '')
    .filter(Boolean);

  if (targetExpressions.length === 0) {
    throw new Error(
      `[section3 grading] ${code} needs blankAnswers or a canonical answer`,
    );
  }

  return [...new Set(targetExpressions)];
}

function gradingOf(code: string, question: SeedQuestionLike): SeedGrading {
  const expectedMeaning = expectedMeaningOf(code, question);

  if (question.type === 'listen_type' || question.type === 'listen_fill') {
    return {
      mode: 'exact',
      expectedMeaning,
      acceptedAnswers: [],
      notes: [
        'This is a Korean dictation exercise. Require the dictated wording rather than a meaning-equivalent paraphrase.',
      ],
      tolerance: exactTolerance,
    };
  }

  if (question.type === 'translate_type') {
    return {
      mode: 'semantic',
      expectedMeaning,
      acceptedAnswers: [],
      notes: [
        'Accept a natural Korean paraphrase only when every meaning detail is preserved.',
      ],
      tolerance: productiveTolerance,
    };
  }

  return {
    mode: 'targetExpression',
    expectedMeaning,
    targetExpressions: targetExpressionsOf(code, question),
    acceptedAnswers: [],
    notes: [
      'The completed sentence must preserve the intended meaning and use every target expression.',
    ],
    tolerance: productiveTolerance,
  };
}

/**
 * Section 3의 모든 타이핑 문항에 문항별 채점 rubric을 붙인다.
 * 명시적으로 작성된 grading은 그대로 보존해 예외 문항이 기본값을 덮어쓸 수 있다.
 */
export function withTypedAnswerGrading<
  T extends Record<string, SeedQuestionLike>,
>(questions: T): T {
  return Object.fromEntries(
    Object.entries(questions).map(([code, question]) => {
      if (!TYPING_TYPES.has(question.type ?? '') || question.grading) {
        return [code, question];
      }

      return [code, { ...question, grading: gradingOf(code, question) }];
    }),
  ) as T;
}
