import type { ExpressionLearningItem } from "@/types/expression";

export interface ExpressionLearningQueueItem {
  key: string;
  expression: ExpressionLearningItem;
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

/**
 * 한 노드의 모든 표현을 먼저 한 번씩 본 다음 다시 섞는다.
 * 서버의 viewedCount를 반영하므로 중간에 나갔다 들어와도 남은 노출만 이어진다.
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
  const reviewOnly = maxRemaining === 0;
  const rounds = reviewOnly ? 1 : maxRemaining;
  const queue: ExpressionLearningQueueItem[] = [];
  let previousExpressionId: string | null = null;

  for (let round = 0; round < rounds; round += 1) {
    const eligible = reviewOnly
      ? expressions
      : expressions.filter(
          (expression) => (remainingById.get(expression.id) ?? 0) > round,
        );
    const shuffled = avoidRoundBoundaryRepeat(
      shuffle(eligible),
      previousExpressionId,
    );

    for (const expression of shuffled) {
      queue.push({
        key: `${expression.id}-${round}-${queue.length}`,
        expression,
      });
      previousExpressionId = expression.id;
    }
  }

  return queue;
}
