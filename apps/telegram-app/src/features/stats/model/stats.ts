export type StatsTab = "period" | "category";
export type StudyPeriod = "week" | "month" | "year" | "all";
export type StudyCategory =
  | "vocab"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik"
  | "other";

export interface HeatmapDay {
  date: string;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface TimePoint {
  date: string;
  label: string;
  minutes: number;
}

export interface VolumePoint {
  date: string;
  label: string;
  vocab: number;
  grammar: number;
  expression: number;
  conversation: number;
  listening: number;
  topik: number;
  other: number;
}

export interface CategoryChartPoint {
  date: string;
  label: string;
  newWords: number;
  knownWords: number;
  reviewWords: number;
}

export interface CategoryStats {
  chart: CategoryChartPoint[];
  knownWordsToday: number | null;
  newWordsToday: number | null;
  reviewAccuracy: number | null;
  reviewWordsToday: number | null;
  todayTime: string;
  totalProblems: number;
  totalTime: string;
  trophyLevel: number | null;
}

export interface TodaySummary {
  avgProblems: number;
  avgTimeLabel: string;
  categories: Array<{
    category: StudyCategory;
    newCount: number;
    reviewAccuracy: number | null;
    reviewCount: number;
    total: number;
  }>;
  studyTimeLabel: string;
  totalQuestions: number;
  weekdayIndex: number;
}

export interface PeriodStats {
  heatmap: HeatmapDay[];
  range: StudyPeriod;
  studyTime: {
    avgPerDayLabel: string;
    points: TimePoint[];
    rangeLabel: string;
  };
  studyVolume: {
    avgPerDay: number;
    points: VolumePoint[];
  };
  today: TodaySummary;
  todayHasData: boolean;
}

export type RadarCategory = Exclude<StudyCategory, "other">;

export interface SkillScore {
  accuracy: number | null;
  attempted: number;
  category: RadarCategory;
  correct: number | null;
  daysSinceLast: number | null;
  reliable: boolean;
  score: number;
}

export interface SkillRadar {
  diagnosis: {
    category: RadarCategory | null;
    key: "noData" | "balanced" | "weakSpot" | "untouched" | "accuracyDrop";
    spread: number;
    strongest: RadarCategory | null;
    weakest: RadarCategory | null;
  };
  rangeDays: number;
  skills: SkillScore[];
  totalAttempted: number;
}

export const CATEGORY_LIST: StudyCategory[] = [
  "vocab",
  "grammar",
  "expression",
  "conversation",
  "listening",
  "topik",
];

export const ALL_CATEGORIES: StudyCategory[] = [
  ...CATEGORY_LIST,
  "other",
];

export const CATEGORY_COLORS: Record<StudyCategory, string> = {
  vocab: "#A78BFA",
  grammar: "#7DC3F8",
  expression: "#F7A8C0",
  conversation: "#7BD9A8",
  listening: "#F4B860",
  topik: "#825707",
  other: "#9AA0A6",
};

export const CATEGORY_LABELS: Record<StudyCategory, string> = {
  vocab: "Lug'at",
  grammar: "Grammatika",
  expression: "Iboralar",
  conversation: "Suhbat",
  listening: "Tinglash",
  topik: "TOPIK",
  other: "Boshqa",
};

export const PERIOD_LABELS: Record<StudyPeriod, string> = {
  week: "Hafta",
  month: "Oy",
  year: "Yil",
  all: "Hammasi",
};
