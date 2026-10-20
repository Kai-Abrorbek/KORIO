import { getContentLang } from "../../../shared/i18n/content-language";
import {
  DEFAULT_LEARNING_COURSES,
  LEARN_COURSES,
  type LearnCourse,
} from "../../learning/model/learning-options";

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
  /** 최근 1년에 한 번이라도 공부한 언어 (옛 서버는 안 준다) */
  studiedLanguages?: string[];
  /** 이 응답이 어느 언어 몫인가 (null = 모든 언어 합계) */
  targetLanguage?: string | null;
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

/** 다크 모드 색 — TOPIK 진갈색(#825707)은 어두운 카드 위에서 묻혀서 밝힌다 */
export const CATEGORY_COLORS_DARK: Record<StudyCategory, string> = {
  ...CATEGORY_COLORS,
  topik: "#C4943F",
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

/**
 * 통계 화면 언어 전환에 보일 언어 (앱 utils/stats-language 와 같다).
 * 지금 배우는 코스 + 지금 보고 있는 언어 + 최근 1년에 공부한 언어, 등록 순서대로.
 * 하나뿐이면 전환을 안 그린다.
 */
export function statsLanguageOptions(
  current: LearnCourse,
  selected: LearnCourse,
  studied: readonly string[] = [],
): LearnCourse[] {
  return (Object.keys(LEARN_COURSES) as LearnCourse[]).filter(
    (course) =>
      course === current || course === selected || studied.includes(course),
  );
}

/**
 * 통계 화면에서 고른 언어 몫으로 (앱 components/stats/StatsLanguage 와 같다).
 * 통계 API 엔 targetLanguage 를, 학습 로드엔 그 코스를 명시한다 — 명시한 코스는
 * 요청 래퍼가 지금 코스로 덮지 않는다. 학습 코스 자체는 안 바꾼다.
 */
export function statsLanguagePath(path: string, language: LearnCourse): string {
  const [pathname = "", search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  const scope = DEFAULT_LEARNING_COURSES[language];
  if (pathname.startsWith("/users/me/stats/")) {
    query.set("targetLanguage", scope.targetLanguage);
  } else if (pathname === "/study-path") {
    query.set("courseId", scope.courseId);
    query.set("targetLanguage", scope.targetLanguage);
    // 설명 언어도 그 코스 기준 (영어 코스 + 한국어 화면이면 따로 고른 말)
    query.set("lang", getContentLang(scope.targetLanguage));
  } else {
    return path;
  }
  return `${pathname}?${query.toString()}`;
}
