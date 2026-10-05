import api from "./api";
import { getContentLang } from "@/store/settings.store";
import {
  PeriodStats,
  CategoryStats,
  SkillRadar,
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
  /** 복구펜으로 메운 이번 달 날짜 (옛 서버는 안 준다) */
  frozenDays?: number[];
}

export interface DayStats {
  date: string;
  studyTimeSeconds: number;
  totalQuestions: number;
  correctQuestions: number;
  xpEarned: number;
  categories: Record<StudyCategory, number>;
}

export interface WeeklyData {
  days: DayStats[];
}

// 서버에 보내는 lang 은 UI 언어가 아니라 **설명 언어**다 (한국어 UI 면 따로 고른 말)
const getLang = getContentLang;

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

  /** 스킬 레이더 — 분야별 강점·약점 (기본 90일) */
  getSkills: (days = 90): Promise<SkillRadar> =>
    api.get(`/users/me/stats/skills?days=${days}`),

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
