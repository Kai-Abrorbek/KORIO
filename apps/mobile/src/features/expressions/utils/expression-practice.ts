import { isAnswerCorrect } from "@/utils/answer-check";

export type ExpressionPracticeStage = "learn" | "guided" | "recall";

export interface ExpressionTypingPlan {
  kind: "full" | "cloze";
  tokens: string[];
  blankStart: number;
  blankCount: number;
  answer: string;
}

function hashOf(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

/**
 * 짧은 표현은 통째로 회상하고, 긴 표현은 문장 가운데의 작은 구간만 쓴다.
 * 빈칸 위치는 표현과 노출 횟수로 고정되므로 렌더링 때마다 흔들리지 않지만
 * 다음 노출에서는 다른 구간을 연습한다.
 */
export function buildExpressionTypingPlan(
  korean: string,
  expressionId: string,
  stage: ExpressionPracticeStage,
  exposure: number,
): ExpressionTypingPlan {
  const tokens = korean.trim().split(/\s+/).filter(Boolean);
  if (tokens.length <= 3) {
    return {
      kind: "full",
      tokens,
      blankStart: 0,
      blankCount: tokens.length,
      answer: tokens.join(" "),
    };
  }

  const blankCount = stage === "guided" ? 1 : tokens.length >= 8 ? 2 : 1;
  const firstCandidate = 1;
  const lastCandidate = Math.max(
    firstCandidate,
    tokens.length - blankCount - 1,
  );
  const candidateCount = lastCandidate - firstCandidate + 1;
  const blankStart =
    firstCandidate +
    (hashOf(`${expressionId}:${stage}:${exposure}`) % candidateCount);

  return {
    kind: "cloze",
    tokens,
    blankStart,
    blankCount,
    answer: tokens.slice(blankStart, blankStart + blankCount).join(" "),
  };
}

export function isExpressionTypingCorrect(
  input: string,
  plan: ExpressionTypingPlan,
) {
  return isAnswerCorrect(input, plan.answer);
}
