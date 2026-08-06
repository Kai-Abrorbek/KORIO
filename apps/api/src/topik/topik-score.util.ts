export interface TopikScoringQuestion {
  id: string;
  correctChoiceKey: string;
  points: number;
}

export interface TopikScoringAnswer {
  questionId: string;
  selectedChoiceKey: string;
}

export interface TopikScoringResult {
  correctCount: number;
  score: number;
  results: Map<string, boolean>;
}

export function scoreTopikAnswers(
  questions: TopikScoringQuestion[],
  answers: TopikScoringAnswer[],
): TopikScoringResult {
  const answerByQuestion = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedChoiceKey]),
  );
  const results = new Map<string, boolean>();
  let correctCount = 0;
  let score = 0;

  for (const question of questions) {
    const isCorrect =
      answerByQuestion.get(question.id) === question.correctChoiceKey;

    results.set(question.id, isCorrect);

    if (isCorrect) {
      correctCount += 1;
      score += question.points;
    }
  }

  return { correctCount, score, results };
}
