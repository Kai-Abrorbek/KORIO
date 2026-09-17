import type {
  TopikAttempt,
  TopikAttemptMode,
  TopikAttemptResult,
  TopikCompletedExam,
  TopikExam,
  TopikExamSession,
  TopikLearningSupport,
  TopikRevealedSolution,
  TopikSaveAnswer,
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

export function getTopikSession(request: AuthenticatedRequest, examCode: string) {
  return request<TopikExamSession>(
    `/topik/exams/${encodeURIComponent(examCode)}/session`,
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
