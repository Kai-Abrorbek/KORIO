import api from "./api";
import { LessonSession } from "@/types/lesson";
import i18n from "@/locales/i18n";

// 현재 유저 언어 가져오기
const getLang = () => i18n.language?.split("-")[0] || "uz";

export interface ScoreData {
  score: number;
  completedUnits: number;
  nextScore: number;
  progress: number;
  milestones: { score: number }[];
}

export const LessonService = {
  // 로드맵용 레슨 목록
  getLessons: (): Promise<any[]> => {
    return api.get(`/lessons?lang=${getLang()}`);
  },

  getRoadmap: (): Promise<{
    units: any[];
    score: number;
    currentSection: number;
    nextSection: {
      sectionNumber: number;
      title: string;
      description: string;
      firstUnitNumber: number;
    } | null;
  }> => {
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
      xpEarned: number; // 보내긴 하는데 서버가 무시함 (호환 유지)
      combo: number;
      speedSeconds: number;
      wrongQuestionIds: string[];
      isCompleted: boolean;
    },
  ): Promise<{
    success: boolean;
    xpEarned: number;
    totalXP: number;
    gems: number;
    energy: number;
    chest: { grade: "wood" | "silver" | "gold"; gems: number } | null;
  }> => {
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

  getNodeReview: (
    nodeId: string,
    limit?: number,
  ): Promise<{ questions: any[] }> =>
    api.get(`/lessons/node-review/${nodeId}${limit ? `?limit=${limit}` : ""}`),

  addXp: (amount: number): Promise<{ added: number; totalXP: number }> =>
    api.post(`/lessons/add-xp`, { amount }),

  getJumpTest: (section: number, unit: number): Promise<{ questions: any[] }> =>
    api.get(`/lessons/jump-test?section=${section}&unit=${unit}`),

  completeJump: (
    section: number,
    unit: number,
  ): Promise<{ completed: number }> =>
    api.post(`/lessons/jump-complete`, { section, unit }),

  getScore: (): Promise<ScoreData> => api.get(`/lessons/score`),

  completeLegend: (
    nodeId: string,
  ): Promise<{
    success: boolean;
    alreadyDone: boolean;
    xpEarned: number;
    totalXP: number;
  }> => api.post(`/lessons/nodes/${nodeId}/legend-complete`, {}),

  /** 복습·연습 완료. XP 는 서버가 모드로 결정하고 통계도 함께 기록됨 */
  completePractice: (body: {
    mode: "review" | "nodeReview" | "wordPractice";
    questionIds: string[];
    wrongQuestionIds?: string[];
    speedSeconds?: number;
    combo?: number;
  }): Promise<{ success: boolean; xpEarned: number; totalXP: number }> =>
    api.post(`/lessons/practice-complete`, body),
};
