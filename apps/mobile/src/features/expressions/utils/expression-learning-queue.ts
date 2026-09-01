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

function mixQuizCards(
  learningQueue: ExpressionLearningQueueItem[],
  expressions: ExpressionLearningItem[],
  requiredExposures: number,
) {
  if (!learningQueue.length || !expressions.length) return learningQueue;

  const quizCount = expressions.length;
  const learningCount = learningQueue.length;
  // 첫 문제 전에는 반드시 일반 카드를 먼저 본다. 표현이 많을수록 최대 5장까지
  // 워밍업하고, 마지막 카드도 일반 카드로 남겨 재연습 카드와 붙지 않게 한다.
  const desiredWarmup = Math.min(5, Math.max(2, quizCount));
  const warmup = Math.min(
    desiredWarmup,
    Math.max(1, learningCount - quizCount),
  );
  const lastQuizSlot = Math.max(warmup, learningCount - 1);
  const quizSlots = new Set<number>();

  for (let quizIndex = 0; quizIndex < quizCount; quizIndex += 1) {
    const ratio = quizCount === 1 ? 0 : quizIndex / (quizCount - 1);
    quizSlots.add(
      warmup + Math.floor((lastQuizSlot - warmup) * ratio),
    );
  }

  const pending = shuffle(expressions);
  const seenIds = new Set<string>();
  const result: ExpressionLearningQueueItem[] = [];

  for (let index = 0; index < learningQueue.length; index += 1) {
    const learningItem = learningQueue[index];
    if (!learningItem) continue;
    result.push(learningItem);
    seenIds.add(learningItem.expression.id);

    const learnedCount = index + 1;
    if (!quizSlots.has(learnedCount)) continue;

    const currentId = learningItem.expression.id;
    const nextId = learningQueue[index + 1]?.expression.id;
    const preferredIndex = pending.findIndex(
      (expression) =>
        seenIds.has(expression.id) &&
        expression.id !== currentId &&
        expression.id !== nextId,
    );
    const fallbackIndex = pending.findIndex(
      (expression) =>
        seenIds.has(expression.id) && expression.id !== currentId,
    );
    const seenIndex = pending.findIndex((expression) =>
      seenIds.has(expression.id),
    );
    const selectedIndex =
      preferredIndex >= 0
        ? preferredIndex
        : fallbackIndex >= 0
          ? fallbackIndex
          : seenIndex;
    if (selectedIndex < 0) continue;

    const [expression] = pending.splice(selectedIndex, 1);
    if (!expression) continue;
    result.push({
      key: `${expression.id}-quiz-${result.length}`,
      expression,
      stage: "recall",
      exposure: Math.max(0, requiredExposures),
      kind: "quiz",
      recordsView: false,
    });
  }

  // learningQueue를 최소 두 번 구성하므로 정상 데이터에서는 비지 않는다.
  // 그래도 손상된 진도 데이터로 슬롯을 놓친 경우, 일반 카드 사이에 넣어
  // 모든 표현이 반드시 한 번은 문제로 나오게 보장한다.
  for (const expression of pending) {
    const separator =
      learningQueue.find((item) => item.expression.id !== expression.id) ??
      learningQueue[0];
    if (separator) {
      result.push({
        ...separator,
        key: `${separator.expression.id}-quiz-separator-${result.length}`,
        recordsView: false,
      });
    }
    result.push({
      key: `${expression.id}-quiz-fallback-${result.length}`,
      expression,
      stage: "recall",
      exposure: Math.max(0, requiredExposures),
      kind: "quiz",
      recordsView: false,
    });
  }

  return result;
}

/**
 * 원래의 반복 학습 라운드를 보존한 채 모든 표현의 문제 카드를 별도로 섞는다.
 * 일반 카드는 세션마다 최소 두 번 등장하고, 새 표현은 서버가 요구한 노출 횟수만큼
 * 더 본다. 문제 카드는 첫 카드에 나오지 않고 서로 붙지 않는다.
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

  return mixQuizCards(learningQueue, expressions, safeRequired);
}
