import type { LessonQuestion } from "../model/lesson";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getLevelExam(
  request: AuthenticatedRequest,
): Promise<{ level: number; questions: LessonQuestion[] }> {
  return request("/study-path/level-exam?lang=uz");
}

export function completeLevelExam(
  request: AuthenticatedRequest,
  body: {
    questionIds: string[];
    wrongQuestionIds: string[];
    speedSeconds: number;
  },
): Promise<{
  correct: number;
  gemsEarned: number;
  level: number;
  nextLevel?: number;
  passed: boolean;
  total: number;
  totalXP: number;
  weakAreas: string[];
  xpEarned: number;
}> {
  return request("/study-path/level-exam/complete", {
    body: JSON.stringify({ ...body, lang: "uz" }),
    method: "POST",
  });
}
