import type { LessonQuestion } from "../../lesson/model/lesson";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export interface OnboardingSurveyBody {
  completeNow: boolean;
  dailyGoalMinutes: number;
  hangulLevel: string;
  interests: string[];
  reminderHour?: number;
  selfReportedLevel: string;
  targetLanguage: "korean";
}

export function saveOnboardingSurvey(
  request: AuthenticatedRequest,
  body: OnboardingSurveyBody,
): Promise<{ success: boolean }> {
  return request("/users/me/onboarding-survey", {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export function getOnboardingLevelTest(
  request: AuthenticatedRequest,
  selfReportedLevel: string,
): Promise<LessonQuestion[]> {
  const query = new URLSearchParams({
    lang: "uz",
    self: selfReportedLevel,
  });
  return request<LessonQuestion[]>(`/lessons/level-test?${query.toString()}`);
}

export interface OnboardingLevelTestResult {
  correctAnswers: number;
  detectedLevel: string;
  placementLevel: number;
  recommendedSection: number;
  score: number;
  success: boolean;
  totalQuestions: number;
}

export function completeOnboardingLevelTest(
  request: AuthenticatedRequest,
  body: {
    correctAnswers: number;
    score: number;
    totalQuestions: number;
    wrongQuestionIds: string[];
  },
): Promise<OnboardingLevelTestResult> {
  return request("/users/me/level-test", {
    body: JSON.stringify(body),
    method: "POST",
  });
}
