import type { KorioTelegramUser } from "../../auth/api/telegram-auth";

export const HOME_CATEGORIES = [
  { key: "vocab", label: "So'zlar", color: "#776ee2" },
  { key: "grammar", label: "Grammatika", color: "#45b7d1" },
  { key: "expression", label: "Iboralar", color: "#ff6b6b" },
  { key: "conversation", label: "Suhbat", color: "#1d9e75" },
  { key: "listening", label: "Tinglash", color: "#fac775" },
  { key: "topik", label: "TOPIK", color: "#e2a83a" },
  { key: "other", label: "Boshqa", color: "#9aa0a6" },
] as const;

export type HomeCategory = (typeof HOME_CATEGORIES)[number]["key"];

export interface HomeDayStats {
  categories?: Partial<Record<HomeCategory, number>>;
  correctQuestions?: number;
  date: string;
  studyTimeSeconds?: number;
  totalQuestions?: number;
  xpEarned?: number;
}

export interface HomeCalendarData {
  completedDays: number[];
  longestStreak: number;
  month: number;
  streak: number;
  streakDays: number[];
  year: number;
}

export interface HomeUser extends KorioTelegramUser {
  dailyGoalMinutes?: number;
}

export const HOME_MODE_LABELS: Record<string, string> = {
  conversation: "Suhbat",
  expression: "Iboralar",
  grammar: "Grammatika",
  grammarPractice: "Grammatika mashqlari",
  listening: "Tinglash",
  speaking: "Gapirish",
  topik: "TOPIK",
  vocabulary: "So'z o'rganish",
};

export const WEEKDAY_LABELS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fallbackWeek(): HomeDayStats[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return { date: dateKey(date) };
  });
}

export function weekdayLabel(dateValue: string): string {
  const day = new Date(`${dateValue}T12:00:00`).getDay();
  return WEEKDAY_LABELS[(day + 6) % 7] ?? "";
}

export function dayTotal(day: HomeDayStats): number {
  return HOME_CATEGORIES.reduce(
    (sum, category) => sum + (day.categories?.[category.key] ?? 0),
    0,
  );
}

export function formatStudyTime(seconds: number): string {
  if (seconds <= 0) return "-";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return minutes > 0 ? `${hours} soat ${minutes} daqiqa` : `${hours} soat`;
  }
  return `${Math.max(1, minutes)} daqiqa`;
}
