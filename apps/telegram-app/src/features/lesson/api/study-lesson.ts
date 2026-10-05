import type { LessonQuestion } from "../model/lesson";
import { getContentLang } from "../../../shared/i18n/content-language";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/** 급수 졸업 시험 문제. level 이 있으면 그 급 시험 (잠긴 급을 열 때) */
export function getLevelExam(
  request: AuthenticatedRequest,
  level?: number,
): Promise<{ level: number; questions: LessonQuestion[] }> {
  return request(`/study-path/level-exam?lang=${getContentLang()}${level ? `&level=${level}` : ""}`);
}

export function completeLevelExam(
  request: AuthenticatedRequest,
  body: {
    questionIds: string[];
    wrongQuestionIds: string[];
    speedSeconds: number;
    /** 어느 급의 시험인가. 없으면 지금 급 */
    level?: number;
  },
): Promise<{
  correct: number;
  gemsEarned: number;
  /** 지급 후 보석 잔액 (옛 서버는 안 보낸다) */
  gems?: number;
  level: number;
  /** 합격해서 열린 다음 급. 떨어졌으면 null */
  nextLevel?: number | null;
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
