import api from "./api";
import i18n from "@/locales/i18n";
import {
  PeriodStats,
  CategoryStats,
  StudyCategory,
  StudyPeriod,
} from "@/types/stats";

export interface CalendarData {
  year: number;
  month: number;
  completedDays: number[];
}

export interface DayStats {
  date: string;
  studyTimeSeconds: number;
  totalQuestions: number;
  correctQuestions: number;
  xpEarned: number;
  vocabularyCount: number;
  grammarCount: number;
  expressionCount: number;
  conversationCount: number;
  listeningCount: number;
}

export interface WeeklyData {
  days: DayStats[];
}

const getLang = () => i18n.language?.split("-")[0] || "uz";

export const StatsService = {
  getCalendar: (year: number, month: number): Promise<CalendarData> =>
    api.get(`/users/me/calendar?year=${year}&month=${month}`),

  getWeekly: (date?: string): Promise<WeeklyData> =>
    api.get(`/users/me/stats/weekly${date ? `?date=${date}` : ""}`),

  getPeriod: (
    range: StudyPeriod = "week",
    endDate?: string,
  ): Promise<PeriodStats> => {
    const params = new URLSearchParams({ lang: getLang(), range });
    if (endDate) params.append("endDate", endDate);
    return api.get(`/users/me/stats/period?${params}`);
  },

  getCategory: (
    category: StudyCategory,
    range: StudyPeriod = "week",
    endDate?: string,
  ): Promise<CategoryStats> => {
    const params = new URLSearchParams({
      category,
      lang: getLang(),
      range,
    });
    if (endDate) params.append("endDate", endDate);
    return api.get(`/users/me/stats/category?${params}`);
  },
};

// 프론트 카테고리 키와 백엔드 카테고리 키가 동일하면 이 매핑 불필요
const categoryMap: Record<StudyCategory, string> = {
  vocab: "vocab",
  grammar: "grammar",
  expression: "expression",
  conversation: "conversation",
  listening: "listening",
};
