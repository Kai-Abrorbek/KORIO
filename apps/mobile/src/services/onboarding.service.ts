import api from "./api";
import {
  LearningGoal,
  LearningStyle,
  HangulLevel,
  SelfReportedLevel,
  Interest,
} from "../types/enums";

interface SurveyData {
  sessionId: string;
  targetLanguage: string;
  learningGoals: LearningGoal[];
  learningStyle: LearningStyle;
  dailyGoalMinutes: number;
  hangulLevel: HangulLevel;
  interests: Interest[];
  selfReportedLevel: SelfReportedLevel;
  reminderHour?: number;
  reminderEnabled?: boolean;
}

interface LevelTestData {
  sessionId: string;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  wrongQuestionIds: string[];
}

export interface LevelTestPlacementResult {
  success: true;
  detectedLevel: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  placementLevel: number;
  recommendedSection: number;
}

export const onboardingService = {
  saveSurvey: (data: SurveyData) => api.post("/onboarding/survey", data),

  saveLevelTest: (
    data: LevelTestData,
  ): Promise<LevelTestPlacementResult | null> =>
    api.post("/onboarding/level-test", data),

  // updateGuestProgress: (sessionId: string) =>
  //   api.patch(`/onboarding/guest-progress/${sessionId}`),

  getSessionData: (sessionId: string) =>
    api.get(`/onboarding/session/${sessionId}`),
};
