export type StatsTab = "period" | "category";
export type StudyCategory =
  | "vocab"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik"
  | "other";
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

// ─────────────────── 스킬 레이더 ───────────────────

export type RadarCategory =
  | "vocab"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik";

export interface SkillScore {
  category: RadarCategory;
  attempted: number;
  /** null = 이 분야의 정답 기록이 없다 (옛 기록). 0 과 다르다 */
  correct: number | null;
  /** 0~1. 표본이 없으면 null */
  accuracy: number | null;
  /** 0~100. 레이더 축 길이 */
  score: number;
  /** 진단 문구를 붙일 만큼 표본이 있나 */
  reliable: boolean;
  daysSinceLast: number | null;
}

export type DiagnosisKey =
  | "noData"
  | "balanced"
  | "weakSpot"
  | "untouched"
  | "accuracyDrop";

export interface SkillRadar {
  rangeDays: number;
  totalAttempted: number;
  skills: SkillScore[];
  diagnosis: {
    key: DiagnosisKey;
    category: RadarCategory | null;
    strongest: RadarCategory | null;
    weakest: RadarCategory | null;
    /** 축 사이 편차 0~100. 클수록 편식 */
    spread: number;
  };
}
