import { TopikMasteryState } from './schemas/topik-user-question-performance.schema';

interface TopikMasteryInput {
  attemptCount: number;
  correctCount: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  isCorrect: boolean;
  answeredAt: Date;
}

export interface TopikMasteryResult {
  masteryState: TopikMasteryState;
  nextReviewAt: Date;
}

export function calculateTopikMastery(
  input: TopikMasteryInput,
): TopikMasteryResult {
  const accuracy = input.correctCount / input.attemptCount;
  let masteryState = TopikMasteryState.LEARNING;

  if (
    input.attemptCount >= 3 &&
    input.consecutiveCorrect >= 3 &&
    accuracy >= 0.8
  ) {
    masteryState = TopikMasteryState.MASTERED;
  } else if (input.consecutiveWrong >= 2) {
    masteryState = TopikMasteryState.WEAK;
  } else if (input.attemptCount >= 3 && accuracy < 0.8) {
    masteryState = TopikMasteryState.UNSTABLE;
  }

  const reviewDays = input.isCorrect
    ? input.consecutiveCorrect >= 3
      ? 14
      : input.consecutiveCorrect === 2
        ? 7
        : 3
    : input.consecutiveWrong >= 2
      ? 1
      : 2;
  const nextReviewAt = new Date(input.answeredAt);
  nextReviewAt.setDate(nextReviewAt.getDate() + reviewDays);

  return { masteryState, nextReviewAt };
}
