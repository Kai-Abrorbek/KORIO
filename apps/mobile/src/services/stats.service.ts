import api from "./api";

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

export const StatsService = {
  getCalendar: (year: number, month: number): Promise<CalendarData> =>
    api.get(`/users/me/calendar?year=${year}&month=${month}`),

  getWeekly: (date?: string): Promise<WeeklyData> =>
    api.get(`/users/me/stats/weekly${date ? `?date=${date}` : ""}`),
};
