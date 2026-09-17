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
  TopikRecipeDetail,
  TopikRecipePractice,
  TopikRecipeSolutionEntry,
  TopikRecipeSummary,
  TopikRevealedSolution,
  TopikSaveAnswer,
  TopikStatsSummary,
} from "../model/topik";

type AuthenticatedRequest = <T>(
  path: string,
  init?: RequestInit,
) => Promise<T>;

export function getTopikExams(request: AuthenticatedRequest) {
  return request<TopikExam[]>("/topik/exams");
}

export function getCompletedTopikExams(request: AuthenticatedRequest) {
  return request<TopikCompletedExam[]>("/topik/exams/completed");
}

export function getTopikSession(
  request: AuthenticatedRequest,
  examCode: string,
  from?: number,
  to?: number,
) {
  const params = new URLSearchParams();
  if (from !== undefined) params.set("from", String(from));
  if (to !== undefined) params.set("to", String(to));
  const query = params.toString();
  return request<TopikExamSession>(
    `/topik/exams/${encodeURIComponent(examCode)}/session${query ? `?${query}` : ""}`,
  );
}

export function startTopikAttempt(
  request: AuthenticatedRequest,
  examCode: string,
  mode: TopikAttemptMode,
  resume: boolean,
) {
  return request<TopikAttempt>(
    `/topik/exams/${encodeURIComponent(examCode)}/attempts`,
    {
      body: JSON.stringify({ mode, resume }),
      method: "POST",
    },
  );
}

export function getTopikAttempt(request: AuthenticatedRequest, attemptId: string) {
  return request<TopikAttempt>(`/topik/attempts/${encodeURIComponent(attemptId)}`);
}

export function saveTopikAnswers(
  request: AuthenticatedRequest,
  attemptId: string,
  answers: TopikSaveAnswer[],
  currentQuestionNumber: number,
  elapsedSeconds: number,
) {
  return request<{
    answeredCount: number;
    currentQuestionNumber: number;
    elapsedSeconds: number;
    lastSavedAt: string;
  }>(`/topik/attempts/${encodeURIComponent(attemptId)}/answers`, {
    body: JSON.stringify({ answers, currentQuestionNumber, elapsedSeconds }),
    method: "PATCH",
  });
}

export function submitTopikAttempt(request: AuthenticatedRequest, attemptId: string) {
  return request(`/topik/attempts/${encodeURIComponent(attemptId)}/submit`, {
    body: JSON.stringify({}),
    method: "POST",
  });
}

export function getTopikResult(request: AuthenticatedRequest, attemptId: string) {
  return request<TopikAttemptResult>(
    `/topik/attempts/${encodeURIComponent(attemptId)}/result`,
  );
}

export function getTopikLearningSupport(
  request: AuthenticatedRequest,
  attemptId: string,
  questionId: string,
) {
  return request<TopikLearningSupport>(
    `/topik/attempts/${encodeURIComponent(attemptId)}/questions/${encodeURIComponent(questionId)}/learning-support`,
  );
}

export function revealTopikHint(
  request: AuthenticatedRequest,
  attemptId: string,
  questionId: string,
  hintKey: string,
) {
  return request<{ revealedHintKeys: string[]; hintViewCount: number }>(
    `/topik/attempts/${encodeURIComponent(attemptId)}/questions/${encodeURIComponent(questionId)}/hints/${encodeURIComponent(hintKey)}/reveal`,
    { body: JSON.stringify({}), method: "POST" },
  );
}

export function revealTopikSolution(
  request: AuthenticatedRequest,
  attemptId: string,
  questionId: string,
) {
  return request<TopikRevealedSolution>(
    `/topik/attempts/${encodeURIComponent(attemptId)}/questions/${encodeURIComponent(questionId)}/solution/reveal`,
    { body: JSON.stringify({}), method: "POST" },
  );
}

function statsQuery(examType: "topik_i" | "topik_ii", section?: string, limit?: number) {
  const params = new URLSearchParams({ examType });
  if (section) params.set("section", section);
  if (limit !== undefined) params.set("limit", String(limit));
  return params.toString();
}

export function getTopikStatsSummary(
  request: AuthenticatedRequest,
  examType: "topik_i" | "topik_ii",
  section?: string,
) {
  return request<TopikStatsSummary>(`/topik/stats/summary?${statsQuery(examType, section)}`);
}

export function getTopikWeakQuestions(
  request: AuthenticatedRequest,
  examType: "topik_i" | "topik_ii",
  section?: string,
  limit = 6,
) {
  return request<TopikQuestionPerformance[]>(`/topik/stats/weak-questions?${statsQuery(examType, section, limit)}`);
}

export function getTopikHistory(
  request: AuthenticatedRequest,
  examType: "topik_i" | "topik_ii",
  section?: string,
  limit = 6,
) {
  return request<TopikHistoryItem[]>(`/topik/stats/history?${statsQuery(examType, section, limit)}`);
}

export function getTopikRecipes(request: AuthenticatedRequest, section: string) {
  return request<TopikRecipeSummary[]>(
    `/topik/recipes?section=${encodeURIComponent(section)}`,
  );
}

export function getTopikRecipe(
  request: AuthenticatedRequest,
  groupCode: string,
) {
  return request<TopikRecipeDetail>(
    `/topik/recipes/${encodeURIComponent(groupCode)}`,
  );
}

export function getTopikRecipePractice(
  request: AuthenticatedRequest,
  groupCode: string,
) {
  return request<TopikRecipePractice>(
    `/topik/recipes/${encodeURIComponent(groupCode)}/practice`,
  );
}

export function getTopikRecipePracticeSolutions(
  request: AuthenticatedRequest,
  groupCode: string,
) {
  return request<TopikRecipeSolutionEntry[]>(
    `/topik/recipes/${encodeURIComponent(groupCode)}/practice/solutions`,
  );
}
