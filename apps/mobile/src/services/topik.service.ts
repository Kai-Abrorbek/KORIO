import api from "./api";
import type {
  TopikAttempt,
  TopikAttemptMode,
  TopikAttemptResult,
  TopikCompletedExam,
  TopikExam,
  TopikExamSession,
  TopikHistoryItem,
  TopikLearningSupport,
  TopikQuestionPerformance,
  TopikRevealedHint,
  TopikRevealedSolution,
  TopikSaveAnswer,
  TopikSaveProgressResponse,
  TopikStatsSummary,
  TopikSubmission,
  TopikTypePerformance,
} from "@/types/topik";

export const TopikService = {
  listExams: (): Promise<TopikExam[]> => api.get("/topik/exams"),

  getCompletedExams: (): Promise<TopikCompletedExam[]> =>
    api.get("/topik/exams/completed"),

  getSession: (
    examCode: string,
    from = 1,
    to = 50,
  ): Promise<TopikExamSession> =>
    api.get(
      `/topik/exams/${encodeURIComponent(examCode)}/session?from=${from}&to=${to}`,
    ),

  startAttempt: (
    examCode: string,
    mode: TopikAttemptMode,
    resume = true,
  ): Promise<TopikAttempt> =>
    api.post(`/topik/exams/${encodeURIComponent(examCode)}/attempts`, {
      mode,
      resume,
    }),

  getAttempt: (attemptId: string): Promise<TopikAttempt> =>
    api.get(`/topik/attempts/${attemptId}`),

  saveAnswers: (
    attemptId: string,
    answers: TopikSaveAnswer[],
    currentQuestionNumber?: number,
    elapsedSeconds?: number,
  ): Promise<TopikSaveProgressResponse> =>
    api.patch(`/topik/attempts/${attemptId}/answers`, {
      answers,
      currentQuestionNumber,
      elapsedSeconds,
    }),

  submitAttempt: (attemptId: string): Promise<TopikSubmission> =>
    api.post(`/topik/attempts/${attemptId}/submit`, {}),

  getResult: (attemptId: string): Promise<TopikAttemptResult> =>
    api.get(`/topik/attempts/${attemptId}/result`),

  getLearningSupport: (
    attemptId: string,
    questionId: string,
  ): Promise<TopikLearningSupport> =>
    api.get(
      `/topik/attempts/${attemptId}/questions/${questionId}/learning-support`,
    ),

  revealHint: (
    attemptId: string,
    questionId: string,
    hintKey: string,
  ): Promise<TopikRevealedHint> =>
    api.post(
      `/topik/attempts/${attemptId}/questions/${questionId}/hints/${encodeURIComponent(hintKey)}/reveal`,
      {},
    ),

  revealSolution: (
    attemptId: string,
    questionId: string,
  ): Promise<TopikRevealedSolution> =>
    api.post(
      `/topik/attempts/${attemptId}/questions/${questionId}/solution/reveal`,
      {},
    ),

  getStatsSummary: (): Promise<TopikStatsSummary> =>
    api.get("/topik/stats/summary"),

  getQuestionTypeStats: (): Promise<TopikTypePerformance[]> =>
    api.get("/topik/stats/question-types"),

  getWeakQuestions: (limit = 10): Promise<TopikQuestionPerformance[]> =>
    api.get(`/topik/stats/weak-questions?limit=${limit}`),

  getMasteredQuestions: (limit = 10): Promise<TopikQuestionPerformance[]> =>
    api.get(`/topik/stats/mastered-questions?limit=${limit}`),

  getReviewQueue: (limit = 10): Promise<TopikQuestionPerformance[]> =>
    api.get(`/topik/stats/review-queue?limit=${limit}`),

  getHistory: (limit = 10): Promise<TopikHistoryItem[]> =>
    api.get(`/topik/stats/history?limit=${limit}`),
};
