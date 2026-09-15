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
  level: number;
  sections: [number, number];
  title: string;
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

export const STUDY_NODE_COPY: Record<
  StudyNodeKind,
  { count: "grammar" | "questions" | "words"; description: string; title: string }
> = {
  review: {
    title: "O'tgan darsni takrorlash",
    description: "Avval o'tgan darsni eslab olamiz.",
    count: "questions",
  },
  words: {
    title: "Bugungi so'zlar",
    description: "Bugungi so'zlarni kartochkalarda o'rganing.",
    count: "words",
  },
  grammar: {
    title: "Bugungi grammatika",
    description: "Bugungi grammatika qoidasini o'rganing.",
    count: "grammar",
  },
  vocabQuiz: {
    title: "Leksika mashqi",
    description: "O'rgangan so'zlarni mashqda sinang.",
    count: "questions",
  },
  recap: {
    title: "Kechagi takrorlash",
    description: "Kecha o'rganganingizni yana bir ko'ring.",
    count: "questions",
  },
  grammarQuiz: {
    title: "Grammatika mashqi",
    description: "Bugungi grammatikani mashqda sinang.",
    count: "questions",
  },
  final: {
    title: "Yakuniy tekshiruv",
    description: "Xatolaringizni ko'rib, bu darsni yakunlang.",
    count: "questions",
  },
};

export function studyNodeTitle(node: StudyNode): string {
  const base = STUDY_NODE_COPY[node.kind].title;
  return node.groupCount > 1
    ? `${base} ${node.group}/${node.groupCount}`
    : base;
}

export function studyCountLabel(node: StudyNode): string {
  const unit = STUDY_NODE_COPY[node.kind].count;
  if (unit === "words") return `${node.count} ta so'z`;
  if (unit === "grammar") return `${node.count} ta grammatika`;
  return `${node.count} ta savol`;
}
