import type { LessonSession } from "@/types/lesson";

export type ExpressionSpeechLevel = "polite" | "casual" | "formal";
export type ExpressionReviewResult = "again" | "hard" | "good" | "easy";

export interface ExpressionPackMedia {
  emoji: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ExpressionPackInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  media: ExpressionPackMedia;
  order: number;
}

export interface ExpressionPackSummary extends ExpressionPackInfo {
  count: number;
  viewed: number;
  mastered: number;
  saved: number;
  due: number;
  resumeExpressionId: string | null;
}

export interface ExpressionProgress {
  state: "new" | "learning" | "review" | "mastered";
  viewedCount: number;
  correctCount: number;
  incorrectCount: number;
  consecutiveCorrect: number;
  easeFactor: number;
  intervalDays: number;
  isSaved: boolean;
  savedAt: string | null;
  firstViewedAt: string | null;
  lastViewedAt: string | null;
  learnedAt: string | null;
  nextReviewAt: string | null;
  lastReviewedAt: string | null;
  masteredAt: string | null;
  isDue: boolean;
}

export interface StudyExpression {
  id: string;
  code: string;
  korean: string;
  meaning: string;
  context: string;
  speaker: string;
  usageNote: string;
  speechLevel: ExpressionSpeechLevel;
  pronunciation: {
    romanization: string;
    ttsText: string;
    audioUrl: string;
  };
  media: ExpressionPackMedia;
  placement: {
    section: number;
    unit: number;
    order: number;
    isCore: boolean;
  } | null;
  placements: Array<{
    section: number;
    unit: number;
    order: number;
    isCore: boolean;
  }>;
  tags: string[];
  difficulty: number;
  practiceQuestionCount: number;
  pack: ExpressionPackInfo;
  progress: ExpressionProgress;
}

export interface ExpressionOverview {
  scope: { section: number | null; unit: number | null };
  summary: {
    total: number;
    viewed: number;
    mastered: number;
    saved: number;
    due: number;
  };
  continuePackCode: string | null;
  packs: ExpressionPackSummary[];
}

export interface ExpressionListResponse {
  pack: ExpressionPackInfo | null;
  items: StudyExpression[];
  total: number;
  nextCursor: string | null;
}

export interface ExpressionPracticeSession extends LessonSession {
  packCode: string;
  expressionIds: string[];
}

export type ExpressionRoadmapNodeStatus =
  | "completed"
  | "current"
  | "locked";

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
  status: ExpressionRoadmapNodeStatus;
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

export interface ExpressionLearningItem {
  id: string;
  code: string;
  korean: string;
  meaning: string;
  context: string;
  speaker: string;
  usageNote: string;
  speechLevel: ExpressionSpeechLevel;
  pronunciation: {
    romanization: string;
    ttsText: string;
    audioUrl: string;
  };
  media: ExpressionPackMedia;
  placements: StudyExpression["placements"];
  tags: string[];
  difficulty: number;
  pack: ExpressionPackInfo;
  progress: Pick<
    ExpressionProgress,
    | "state"
    | "viewedCount"
    | "isSaved"
    | "firstViewedAt"
    | "lastViewedAt"
    | "learnedAt"
  >;
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
