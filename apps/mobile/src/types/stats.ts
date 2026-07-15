export type StatsTab = "period" | "category";
export type StudyCategory =
  | "vocab"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening";
export type StudyPeriod = "week" | "month" | "year" | "all";

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
}

export interface CategoryChartPoint {
  date: string;
  label: string;
  newWords: number;
  knownWords: number;
  reviewWords: number;
}

export interface CategoryStats {
  trophyLevel: number | null;
  totalProblems: number;
  todayTime: string;
  totalTime: string;
  newWordsToday: number | null;
  knownWordsToday: number | null;
  reviewWordsToday: number | null;
  reviewAccuracy: number | null;
  chart: CategoryChartPoint[]; // weekChart → chart
}

export interface TodaySummary {
  studyTimeLabel: string;
  totalQuestions: number;
  categories: {
    category: StudyCategory;
    total: number;
    newCount: number;
    reviewCount: number;
    reviewAccuracy: number | null;
  }[];
  weekdayIndex: number;
  avgTimeLabel: string;
  avgProblems: number;
}

export interface PeriodStats {
  range: StudyPeriod;
  todayHasData: boolean;
  today: TodaySummary; // 추가
  heatmap: HeatmapDay[];
  studyTime: {
    avgPerDayLabel: string;
    rangeLabel: string;
    points: TimePoint[];
  };
  studyVolume: {
    avgPerDay: number;
    points: VolumePoint[];
  };
}
