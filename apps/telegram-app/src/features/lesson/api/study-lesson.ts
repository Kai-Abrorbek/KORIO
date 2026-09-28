import type { LessonQuestion } from "../model/lesson";
import { getContentLang } from "../../../shared/i18n/content-language";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getLevelExam(
  request: AuthenticatedRequest,
): Promise<{ level: number; questions: LessonQuestion[] }> {
  return request(`/study-path/level-exam?lang=${getContentLang()}`);
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
  /** 지급 후 보석 잔액 (옛 서버는 안 보낸다) */
  gems?: number;
  level: number;
  nextLevel?: number;
  passed: boolean;
  total: number;
  totalXP: number;
  weakAreas: string[];
  xpEarned: number;
}> {
  return request("/study-path/level-exam/complete", {
    body: JSON.stringify({ ...body, lang: getContentLang() }),
    method: "POST",
  });
}
