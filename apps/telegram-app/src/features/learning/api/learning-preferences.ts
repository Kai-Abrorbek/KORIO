import type { KorioTelegramUser } from "../../auth/api/telegram-auth";
import type { LearnMode, StudyMode } from "../model/learning-options";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export async function saveStudyMode(
  request: AuthenticatedRequest,
  studyMode: StudyMode,
): Promise<void> {
  await request<{ studyMode: StudyMode }>("/users/me/study-mode", {
    body: JSON.stringify({ studyMode }),
    method: "PATCH",
  });
}

export async function saveLearnMode(
  request: AuthenticatedRequest,
  learnMode: LearnMode,
  topikLevel?: "1" | "2",
): Promise<Partial<KorioTelegramUser>> {
  const result = await request<{
    learnMode: LearnMode;
    topikLevel: "1" | "2";
  }>("/users/me/learn-mode", {
    body: JSON.stringify({ learnMode, ...(topikLevel ? { topikLevel } : {}) }),
    method: "PATCH",
  });
  return result;
}
