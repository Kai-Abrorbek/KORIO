export type ExpressionSpeechLevel = "polite" | "casual" | "formal";
export type ExpressionNodeStatus = "completed" | "current" | "locked";
export type ExpressionPracticeStage = "learn" | "guided" | "recall";

export interface ExpressionPackInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  media: { emoji: string; imageUrl: string; imageAlt: string };
  order: number;
}

export interface ExpressionLearningItem {
  id: string;
  code: string;
  korean: string;
  meaning: string;
  context: string;
  speaker: string;
  usageNote: string;
  speechLevel: ExpressionSpeechLevel;
  pronunciation: { romanization: string; ttsText: string; audioUrl: string };
  media: { emoji: string; imageUrl: string; imageAlt: string };
  difficulty: number;
  pack: ExpressionPackInfo;
  progress: {
    state: "new" | "learning" | "review" | "mastered";
    viewedCount: number;
    isSaved: boolean;
    firstViewedAt: string | null;
    lastViewedAt: string | null;
    learnedAt: string | null;
  };
}

export interface ExpressionRoadmapNode {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  requiredExposures: number;
  expressionCount: number;
  learnedExpressionCount: number;
  completedExposures: number;
  totalExposures: number;
  progress: number;
  status: ExpressionNodeStatus;
}

export interface ExpressionRoadmapTopic extends ExpressionPackInfo {
  completedNodes: number;
  totalNodes: number;
  progress: number;
  nodes: ExpressionRoadmapNode[];
}

export interface ExpressionRoadmapResponse {
  summary: {
    totalTopics: number;
    totalNodes: number;
    completedNodes: number;
    totalExpressions: number;
    learnedExpressions: number;
    totalExposures: number;
    completedExposures: number;
    progress: number;
  };
  continueNodeCode: string | null;
  topics: ExpressionRoadmapTopic[];
}

export interface ExpressionNodeLearningResponse {
  topic: ExpressionPackInfo;
  node: {
    id: string;
    code: string;
    title: string;
    description: string;
    icon: string;
    order: number;
    requiredExposures: number;
  };
  items: ExpressionLearningItem[];
}

export interface ExpressionLearningQueueItem {
  key: string;
  expression: ExpressionLearningItem;
  stage: ExpressionPracticeStage;
  exposure: number;
  kind: "exposure" | "quiz" | "retry";
  recordsView: boolean;
}

export interface ExpressionTypingPlan {
  kind: "full" | "cloze";
  tokens: string[];
  blankStart: number;
  blankCount: number;
  answer: string;
}

export const EXPRESSION_COLORS = [
  "#776ee2", "#1d9e75", "#e2a83a", "#e25c5c",
  "#45b7d1", "#6e1cf2", "#ff7a00", "#2ecc71",
] as const;

export const EXPRESSION_PACK_THEMES: Record<string, { background: string; accent: string; accentDark: string }> = {
  greetings: { background: "#e7e2ff", accent: "#887be8", accentDark: "#5e52c9" },
  restaurant: { background: "#ddf7ef", accent: "#2bb69f", accentDark: "#178675" },
  shopping: { background: "#ffe8d3", accent: "#ef9a45", accentDark: "#c56c1b" },
  transport: { background: "#ddf1ff", accent: "#4d9fe8", accentDark: "#2a72b5" },
  directions: { background: "#fff1c9", accent: "#e8af2f", accentDark: "#a97910" },
  school: { background: "#ffe1ea", accent: "#e86d91", accentDark: "#b94267" },
};

export function expressionPackTheme(code?: string) {
  return EXPRESSION_PACK_THEMES[code ?? ""] ?? EXPRESSION_PACK_THEMES.greetings!;
}

function shuffle<T>(items: readonly T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target] as T, result[index] as T];
  }
  return result;
}

function avoidBoundary(items: readonly ExpressionLearningItem[], previousId: string | null) {
  const result = [...items];
  if (result.length < 2 || !previousId || result[0]?.id !== previousId) return result;
  const target = result.findIndex((item) => item.id !== previousId);
  if (target <= 0) return result;
  [result[0], result[target]] = [result[target] as ExpressionLearningItem, result[0] as ExpressionLearningItem];
  return result;
}

export function buildLearningQueue(items: ExpressionLearningItem[], requiredExposures: number) {
  const safeRequired = Math.max(1, requiredExposures);
  const remaining = new Map(items.map((item) => [item.id, Math.max(0, safeRequired - item.progress.viewedCount)]));
  const rounds = Math.max(2, ...remaining.values());
  const queue: ExpressionLearningQueueItem[] = [];
  let previousId: string | null = null;
  for (let round = 0; round < rounds; round += 1) {
    const eligible = items.filter((item) => round < 2 || (remaining.get(item.id) ?? 0) > round);
    for (const expression of avoidBoundary(shuffle(eligible), previousId)) {
      queue.push({
        key: `${expression.id}-learn-${round}-${queue.length}`,
        expression,
        stage: round === 0 ? "learn" : "guided",
        exposure: expression.progress.viewedCount + round,
        kind: "exposure",
        recordsView: (remaining.get(expression.id) ?? 0) > round,
      });
      previousId = expression.id;
    }
  }
  return queue;
}

export function buildRecallQueue(items: ExpressionLearningItem[], requiredExposures: number, previousId?: string) {
  return avoidBoundary(shuffle(items), previousId ?? null).map((expression, index): ExpressionLearningQueueItem => ({
    key: `${expression.id}-quiz-${index}`,
    expression,
    stage: "recall",
    exposure: Math.max(0, requiredExposures),
    kind: "quiz",
    recordsView: false,
  }));
}

function hashOf(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return hash;
}

export function buildTypingPlan(korean: string, id: string, stage: ExpressionPracticeStage, exposure: number): ExpressionTypingPlan {
  const tokens = korean.trim().split(/\s+/).filter(Boolean);
  if (tokens.length <= 3) return { kind: "full", tokens, blankStart: 0, blankCount: tokens.length, answer: tokens.join(" ") };
  const blankCount = stage === "guided" ? 1 : tokens.length >= 8 ? 2 : 1;
  const first = 1;
  const last = Math.max(first, tokens.length - blankCount - 1);
  const blankStart = first + (hashOf(`${id}:${stage}:${exposure}`) % (last - first + 1));
  return { kind: "cloze", tokens, blankStart, blankCount, answer: tokens.slice(blankStart, blankStart + blankCount).join(" ") };
}
