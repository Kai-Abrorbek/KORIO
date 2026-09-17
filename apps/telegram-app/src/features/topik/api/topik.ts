import type {
  TopikCompletedExam,
  TopikExam,
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
