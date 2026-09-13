import type { ExpressionLearningItem } from "@/types/expression";
import type { ExpressionPracticeStage } from "./expression-practice";

export interface ExpressionLearningQueueItem {
  key: string;
  expression: ExpressionLearningItem;
  stage: ExpressionPracticeStage;
  exposure: number;
  kind: "exposure" | "quiz" | "retry";
  recordsView: boolean;
}

function stageForLearningRound(round: number): ExpressionPracticeStage {
  return round === 0 ? "learn" : "guided";
}

function shuffle<T>(items: readonly T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = result[index];
    const replacement = result[swapIndex];
    if (current === undefined || replacement === undefined) continue;
    result[index] = replacement;
    result[swapIndex] = current;
  }
  return result;
}

/**
 * 라운드가 바뀌는 지점에서 같은 표현이 연속으로 나오지 않게 첫 항목을 뒤로 민다.
 * 인자는 건드리지 않고 새 배열을 돌려준다 — 큐 생성이 순수해야 같은 세션에서
 * 같은 결과가 나온다.
 */
function avoidRoundBoundaryRepeat(
  items: readonly ExpressionLearningItem[],
  previousExpressionId: string | null,
): ExpressionLearningItem[] {
  if (
    items.length < 2 ||
    !previousExpressionId ||
    items[0]?.id !== previousExpressionId
  ) {
    return [...items];
  }

  const replacementIndex = items.findIndex(
    (item) => item.id !== previousExpressionId,
  );
  if (replacementIndex <= 0) return [...items];

  const first = items[0];
  const replacement = items[replacementIndex];
  if (!first || !replacement) return [...items];

  const result = [...items];
  result[0] = replacement;
  result[replacementIndex] = first;
  return result;
}

export function buildExpressionRecallQueue(
  expressions: ExpressionLearningItem[],
  requiredExposures: number,
  previousExpressionId?: string,
) {
  const shuffled = avoidRoundBoundaryRepeat(
    shuffle(expressions),
    previousExpressionId ?? null,
  );
  return shuffled.map(
    (expression, index): ExpressionLearningQueueItem => ({
      key: `${expression.id}-quiz-${index}`,
      expression,
      stage: "recall",
      exposure: Math.max(0, requiredExposures),
      kind: "quiz",
      recordsView: false,
    }),
  );
}

/**
 * 표현을 섞어 최소 두 번씩 익히는 기존 반복 학습 라운드를 만든다.
 * 문제 카드는 모든 학습 라운드가 끝난 뒤 사용자가 연습을 시작할 때 별도로 붙인다.
 */
export function buildExpressionLearningQueue(
  expressions: ExpressionLearningItem[],
  requiredExposures: number,
) {
  const safeRequired = Math.max(1, requiredExposures);
  const remainingById = new Map(
    expressions.map((expression) => [
      expression.id,
      Math.max(0, safeRequired - expression.progress.viewedCount),
    ]),
  );
  const maxRemaining = Math.max(0, ...remainingById.values());
  const rounds = Math.max(2, maxRemaining);
  const learningQueue: ExpressionLearningQueueItem[] = [];
  let previousExpressionId: string | null = null;

  for (let round = 0; round < rounds; round += 1) {
    const eligible = expressions.filter(
      (expression) =>
        round < 2 || (remainingById.get(expression.id) ?? 0) > round,
    );
    const shuffled = avoidRoundBoundaryRepeat(
      shuffle(eligible),
      previousExpressionId,
    );

    for (const expression of shuffled) {
      const remaining = remainingById.get(expression.id) ?? 0;
      learningQueue.push({
        key: `${expression.id}-learn-${round}-${learningQueue.length}`,
        expression,
        stage: stageForLearningRound(round),
        exposure: expression.progress.viewedCount + round,
        kind: "exposure",
        recordsView: remaining > round,
      });
      previousExpressionId = expression.id;
    }
  }

  return learningQueue;
}
