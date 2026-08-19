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
