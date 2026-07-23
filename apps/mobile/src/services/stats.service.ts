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
  /** 현재 연속 구간에 포함된 이번 달 날짜 */
  streakDays: number[];
  /** 현재 연속 학습일 */
  streak: number;
  /** 역대 최장 연속 학습일 */
  longestStreak: number;
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
  categories: Record<StudyCategory, number>;
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
