export type TopikAttemptMode = "practice" | "guided" | "mock_exam";
export type TopikLevel = "1" | "2";
export type TopikSection = "reading" | "listening" | "writing";

export interface TopikI18nText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export interface TopikExam {
  id: string;
  code: string;
  title: TopikI18nText;
  description: TopikI18nText;
  examType: "topik_i" | "topik_ii";
  section: TopikSection;
  year?: number;
  round?: number;
  durationMinutes: number;
  totalQuestions: number;
  totalPoints: number;
  listeningAudioUrl: string;
  version: number;
}

export interface TopikCompletedExam {
  examId: string;
  latestAttemptId: string;
  latestMode: TopikAttemptMode;
  submittedAt: string | null;
}

export function topikUzText(value: TopikI18nText | null | undefined) {
  if (!value) return "";
  return value.uz || value.ko || value.en || value.ru || "";
}
