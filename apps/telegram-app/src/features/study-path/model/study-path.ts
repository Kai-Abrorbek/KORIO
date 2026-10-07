export type StudyNodeKind =
  | "review"
  | "words"
  | "grammar"
  | "vocabQuiz"
  | "recap"
  | "grammarQuiz"
  | "final";

export type StudyNodeStatus = "completed" | "current" | "locked";

export interface StudyNode {
  count: number;
  done: boolean;
  group: number;
  groupCount: number;
  id: string;
  kind: StudyNodeKind;
  lessonCount: number;
  lessonsDone: number;
  nextLesson: number;
  status: StudyNodeStatus;
}

export interface StudyDay {
  dayNumber: number;
  id: string;
  nodes: StudyNode[];
  phase: 1 | 2;
  section: number;
  sectionStart: boolean;
  status: StudyNodeStatus;
  title: string;
  unit: number;
}

export interface StudyPathResponse {
  currentDayIndex: number;
  currentLevel: number;
  currentSection: number;
  days: StudyDay[];
  levelExam: { available: boolean; passed: boolean };
  nextLevel: {
    description: string;
    level: number;
    title: string;
  } | null;
  pendingChests: number;
  score: number;
}

export interface StudyLevel {
  available: boolean;
  description: string;
  /** 잠겼으면 열기 위해 볼 시험의 급 (바로 아래 급) */
  examLevel?: number | null;
  level: number;
  sections: [number, number];
  title: string;
  /** 시험 없이 바로 갈 수 있나 (옛 서버는 안 보낸다 → 열린 것으로) */
  unlocked?: boolean;
}

export interface StudyLevelsResponse {
  current: number;
  levels: StudyLevel[];
}

export interface ChestClaimResult {
  chests: { gems: number; grade: string }[];
  claimed: number;
  gems: number;
  grade: "wood" | "silver" | "gold" | null;
  totalGems: number;
}

export const STUDY_PATH_COLORS = [
  "#776ee2",
  "#1d9e75",
  "#e2a83a",
  "#e25c5c",
  "#45b7d1",
  "#6e1cf2",
  "#ff7a00",
  "#2ecc71",
] as const;
