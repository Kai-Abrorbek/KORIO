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

type TopikStatsExamType = "topik_i" | "topik_ii";
type TopikStatsSection = "listening" | "reading" | "writing";

function topikStatsQuery(
  examType: TopikStatsExamType,
  section?: TopikStatsSection,
  limit?: number,
) {
  const params = new URLSearchParams({ examType });
  if (section) params.set("section", section);
  if (limit !== undefined) params.set("limit", String(limit));
  return params.toString();
}

export const TopikService = {
  listExams: (): Promise<TopikExam[]> => api.get("/topik/exams"),

  getCompletedExams: (): Promise<TopikCompletedExam[]> =>
    api.get("/topik/exams/completed"),

  getSession: (
    examCode: string,
    from?: number,
    to?: number,
  ): Promise<TopikExamSession> => {
    const params = new URLSearchParams();
    if (from !== undefined) params.set("from", String(from));
    if (to !== undefined) params.set("to", String(to));
    const query = params.toString();
    return api.get(
      `/topik/exams/${encodeURIComponent(examCode)}/session${query ? `?${query}` : ""}`,
    );
  },

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

  getStatsSummary: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
  ): Promise<TopikStatsSummary> =>
    api.get(`/topik/stats/summary?${topikStatsQuery(examType, section)}`),

  getQuestionTypeStats: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
  ): Promise<TopikTypePerformance[]> =>
    api.get(
      `/topik/stats/question-types?${topikStatsQuery(examType, section)}`,
    ),

  getWeakQuestions: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
    limit = 10,
  ): Promise<TopikQuestionPerformance[]> =>
    api.get(
      `/topik/stats/weak-questions?${topikStatsQuery(examType, section, limit)}`,
    ),

  getMasteredQuestions: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
    limit = 10,
  ): Promise<TopikQuestionPerformance[]> =>
    api.get(
      `/topik/stats/mastered-questions?${topikStatsQuery(examType, section, limit)}`,
    ),

  getReviewQueue: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
    limit = 10,
  ): Promise<TopikQuestionPerformance[]> =>
    api.get(
      `/topik/stats/review-queue?${topikStatsQuery(examType, section, limit)}`,
    ),

  getHistory: (
    examType: TopikStatsExamType,
    section?: TopikStatsSection,
    limit = 10,
  ): Promise<TopikHistoryItem[]> =>
    api.get(
      `/topik/stats/history?${topikStatsQuery(examType, section, limit)}`,
    ),
};
