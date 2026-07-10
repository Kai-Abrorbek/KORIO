import api from "./api";
import { LessonSession } from "@/types/lesson";
import i18n from "@/locales/i18n";

// 현재 유저 언어 가져오기
const getLang = () => i18n.language?.split("-")[0] || "uz";

export const LessonService = {
  // 로드맵용 레슨 목록
  getLessons: (): Promise<any[]> => {
    return api.get(`/lessons?lang=${getLang()}`);
  },

  getRoadmap: (): Promise<{ units: any[] }> => {
    return api.get(`/lessons/roadmap?lang=${getLang()}`);
  },

  // 레슨 상세 + 문제들
  getLessonById: (lessonId: string): Promise<LessonSession> => {
    return api.get(`/lessons/${lessonId}?lang=${getLang()}`);
  },

  // 레슨 완료 저장
  completeLesson: (
    lessonId: string,
    data: {
      correctAnswers: number;
      totalAnswers: number;
      xpEarned: number;
      combo: number;
      speedSeconds: number;
      wrongQuestionIds: string[];
      isCompleted: boolean;
    },
  ): Promise<{ success: boolean; xpEarned: number }> => {
    return api.post(`/lessons/${lessonId}/complete`, data);
  },

  // 레벨 테스트 문제
  getLevelTestQuestions: (): Promise<any[]> => {
    return api.get(`/lessons/level-test?lang=${getLang()}`);
  },

  getMistakes: (): Promise<{ count: number; questions: any[] }> =>
    api.get(`/lessons/mistakes`),

  getLearnedWords: (): Promise<{
    count: number;
    words: { korean: string; native: string }[];
  }> => api.get(`/lessons/learned-words`),

  getWordPractice: (): Promise<{ questions: any[] }> =>
    api.get(`/lessons/word-practice`),

  getMistakeQuestions: (): Promise<{ questions: any[] }> =>
    api.get(`/lessons/mistake-questions`),

  resolveMistakes: (correctIds: string[]): Promise<{ removed: number }> =>
    api.post(`/lessons/mistakes/resolve`, { correctIds }),

  getNodeReview: (nodeId: string): Promise<{ questions: any[] }> =>
    api.get(`/lessons/node-review/${nodeId}`),

  addXp: (amount: number): Promise<{ added: number; totalXP: number }> =>
    api.post(`/lessons/add-xp`, { amount }),

  getJumpTest: (section: number, unit: number): Promise<{ questions: any[] }> =>
    api.get(`/lessons/jump-test?section=${section}&unit=${unit}`),

  completeJump: (
    section: number,
    unit: number,
  ): Promise<{ completed: number }> =>
    api.post(`/lessons/jump-complete`, { section, unit }),
};
