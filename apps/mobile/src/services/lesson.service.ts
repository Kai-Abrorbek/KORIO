import api from "./api";
import { AnswerGradeResult, LessonSession } from "@/types/lesson";
import i18n from "@/locales/i18n";

/**
 * 연습 완료 모드. 서버 PRACTICE_BASE_XP 의 키와 1:1 로 맞아야 한다 —
 * 여기 없는 문자열을 보내면 XP 가 조용히 0 이 된다.
 */
export type PracticeMode =
  | "review"
  | "nodeReview"
  | "wordPractice"
  | "unitReview"
  | "unitRecap"
  | "unitVocab"
  | "unitGrammar"
  | "unitFinal";

// 현재 유저 언어 가져오기
const getLang = () => i18n.language?.split("-")[0] || "uz";

export interface ScoreMilestone {
  score: number; // 그 섹션 끝까지의 누적 유닛 수
  section: number;
  units: number; // 그 섹션의 유닛 수
  title?: string; // 섹션 제목 (유저 언어)
  startScore?: number; // 섹션 시작 시점 누적 유닛 수
  /** 그 섹션의 첫 유닛 번호. 잠긴 섹션으로 점프할 때 목표가 된다 */
  firstUnit?: number;
  status?: "completed" | "current" | "locked";
}

export interface ScoreData {
  score: number;
  completedUnits: number;
  nextScore: number;
  progress: number;
  milestones: ScoreMilestone[];
}

export interface ChestClaimResult {
  /** 받은 상자 개수. 0 이면 받을 게 없었다 */
  claimed: number;
  gems: number;
  /** 여러 개를 한 번에 받으면 그중 제일 좋은 등급 */
  grade: "wood" | "silver" | "gold" | null;
  totalGems: number;
  chests: { grade: string; gems: number }[];
}

export const LessonService = {
  /** 안 받은 상자 수 */
  getChests: (): Promise<{ count: number }> => api.get("/lessons/chests"),

  /**
   * 안 받은 상자를 전부 받는다.
   * 화면의 상자는 이정표라 벌어들인 상자와 1:1 이 아니다 — 어느 걸 누르든
   * 그동안 쌓인 걸 다 가져간다.
   */
  claimChests: (): Promise<ChestClaimResult> =>
    api.post("/lessons/chests/claim", {}),

  // 로드맵용 레슨 목록
  getLessons: (): Promise<any[]> => {
    return api.get(`/lessons?lang=${getLang()}`);
  },

  getRoadmap: (
    category?: string,
  ): Promise<{
    units: any[];
    score: number;
    /** 아직 안 받은 상자 수 */
    pendingChests?: number;
    currentSection: number;
    nextSection: {
      sectionNumber: number;
      title: string;
      description: string;
      firstUnitNumber: number;
    } | null;
  }> => {
    return api.get(
      `/lessons/roadmap?lang=${getLang()}${category ? `&category=${category}` : ""}`,
    );
  },

  // 레슨 상세 + 문제들
  getLessonById: (lessonId: string): Promise<LessonSession> => {
    return api.get(`/lessons/${lessonId}?lang=${getLang()}`);
  },

  gradeTypedAnswer: (
    questionId: string,
    answer: string,
  ): Promise<AnswerGradeResult> =>
    api.post(`/lessons/questions/${questionId}/grade`, {
      answer,
      lang: getLang(),
    }),

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
    /** 이 레슨으로 유닛을 통째로 끝냈으면 채워진다. 스코어가 오른 순간이다 */
    unitCompleted: { section: number; unit: number; score: number } | null;
  }> => {
    return api.post(`/lessons/${lessonId}/complete`, data);
  },

  // 레벨 테스트 문제
  getLevelTestQuestions: (self?: string): Promise<any[]> => {
    return api.get(`/lessons/level-test?lang=${getLang()}&self=${self ?? ""}`);
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

  /** 학습 로드 모드 — 그 하루(=유닛) 범위의 실전 · 복습 · 마무리 문제 */
  getUnitPractice: (
    section: number,
    unit: number,
    kind: "review" | "vocabQuiz" | "recap" | "grammarQuiz" | "final",
    group = 1,
    lesson = 1,
  ): Promise<{ questions: any[] }> =>
    api.get(
      `/lessons/unit-practice?section=${section}&unit=${unit}&kind=${kind}` +
        `&group=${group}&lesson=${lesson}&lang=${getLang()}`,
    ),

  getNodeReview: (
    nodeId: string,
    limit?: number,
  ): Promise<{ questions: any[] }> =>
    api.get(`/lessons/node-review/${nodeId}${limit ? `?limit=${limit}` : ""}`),


  /**
   * 점프 테스트. 서버가 응시(attemptId)를 발급하고 합격 기준(heartLimit)도 정한다.
   * 완료 요청은 이 attemptId 로만 처리되므로 값을 잃어버리면 다시 시험을 봐야 한다.
   */
  getJumpTest: (
    section: number,
    unit: number,
  ): Promise<{
    attemptId: string | null;
    heartLimit?: number;
    questions: any[];
  }> => api.get(`/lessons/jump-test?section=${section}&unit=${unit}`),

  /** 합격 여부는 서버가 판정한다. 여기선 틀린 문제만 보고한다 */
  completeJump: (
    attemptId: string,
    wrongQuestionIds: string[],
  ): Promise<{
    passed: boolean;
    wrongCount: number;
    heartLimit: number;
    completed?: number;
    /** 무엇이 열렸는지. 섹션 점프면 이 섹션이 통째로 열린 것이다 */
    section?: number;
    unit?: number;
  }> =>
    api.post(`/lessons/jump-complete`, { attemptId, wrongQuestionIds }),

  getScore: (): Promise<ScoreData> =>
    api.get(`/lessons/score?lang=${getLang()}`),

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
    mode: PracticeMode;
    questionIds: string[];
    wrongQuestionIds?: string[];
    speedSeconds?: number;
    combo?: number;
  }): Promise<{ success: boolean; xpEarned: number; totalXP: number }> =>
    api.post(`/lessons/practice-complete`, body),
};
