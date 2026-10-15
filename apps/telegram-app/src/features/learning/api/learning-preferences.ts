import type { KorioTelegramUser } from "../../auth/api/telegram-auth";
import type { LearnCourse, LearnMode, StudyMode } from "../model/learning-options";

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

/**
 * course: 어느 언어 코스의 모드인지. 모드 이름은 코스끼리 겹칠 수 있어서(어휘·문법…)
 * 고른 화면이 코스를 알면 넘긴다. 안 넘기면 서버가 모드로 정한다.
 */
export async function saveLearnMode(
  request: AuthenticatedRequest,
  learnMode: LearnMode,
  topikLevel?: "1" | "2",
  course?: LearnCourse,
): Promise<Partial<KorioTelegramUser>> {
  const result = await request<{
    learnMode: LearnMode;
    topikLevel: "1" | "2";
    learnCourse?: LearnCourse;
  }>("/users/me/learn-mode", {
    body: JSON.stringify({
      learnMode,
      ...(topikLevel ? { topikLevel } : {}),
      ...(course ? { course } : {}),
    }),
    method: "PATCH",
  });
  return result;
}
