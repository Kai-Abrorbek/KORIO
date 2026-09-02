import { create } from "zustand";
import {
  LearningGoal,
  HangulLevel,
  SelfReportedLevel,
  Interest,
} from "@/types/enums";

interface OnboardingState {
  // 설문조사
  targetLanguage: string;
  learningGoals: LearningGoal[];
  learningStyle: string;
  dailyGoalMinutes: number;
  hangulLevel: HangulLevel | "";
  interests: Interest[];
  selfReportedLevel: SelfReportedLevel | "";
  reminderHour: number | null;
  reminderEnabled: boolean;

  // 레벨 테스트
  levelTestScore: number;
  detectedLevel: string;
  correctAnswers: number;
  totalQuestions: number;
  wrongQuestionIds: string[];
  placementLevel: number;
  recommendedSection: number;

  // 비로그인 세션
  sessionId: string;
  guestQuestionCount: number;

  // 액션
  setSurvey: (data: {
    targetLanguage: string;
    learningGoals: LearningGoal[];
    learningStyle: string;
    dailyGoalMinutes: number;
    hangulLevel: HangulLevel;
    interests: Interest[];
    selfReportedLevel: SelfReportedLevel;
    reminderHour?: number;
    reminderEnabled?: boolean;
  }) => void;

  setLevelTestResult: (data: {
    score: number;
    detectedLevel: string;
    correctAnswers: number;
    totalQuestions: number;
    wrongQuestionIds: string[];
    placementLevel: number;
    recommendedSection: number;
  }) => void;

  incrementGuestCount: () => void;
  reset: () => void;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useOnboardingStore = create<OnboardingState>((set) => ({
  targetLanguage: "korean",
  learningGoals: [],
  learningStyle: "",
  dailyGoalMinutes: 10,
  levelTestScore: 0,
  detectedLevel: "",
  correctAnswers: 0,
  totalQuestions: 0,
  wrongQuestionIds: [],
  placementLevel: 1,
  recommendedSection: 1,
  sessionId: generateSessionId(),
  guestQuestionCount: 0,
  hangulLevel: "",
  interests: [],
  selfReportedLevel: "",
  reminderHour: null,
  reminderEnabled: false,

  setSurvey: (data) => set((state) => ({ ...state, ...data })),

  setLevelTestResult: (data) =>
    set((state) => ({
      ...state,
      levelTestScore: data.score,
      detectedLevel: data.detectedLevel,
      correctAnswers: data.correctAnswers,
      totalQuestions: data.totalQuestions,
      wrongQuestionIds: data.wrongQuestionIds,
      placementLevel: data.placementLevel,
      recommendedSection: data.recommendedSection,
    })),

  incrementGuestCount: () =>
    set((state) => ({ guestQuestionCount: state.guestQuestionCount + 1 })),

  reset: () =>
    set({
      targetLanguage: "korean",
      learningGoals: [],
      learningStyle: "",
      dailyGoalMinutes: 10,
      levelTestScore: 0,
      detectedLevel: "",
      correctAnswers: 0,
      totalQuestions: 0,
      wrongQuestionIds: [],
      placementLevel: 1,
      recommendedSection: 1,
      sessionId: generateSessionId(),
      guestQuestionCount: 0,
      hangulLevel: "",
      interests: [],
      selfReportedLevel: "",
      reminderHour: null,
      reminderEnabled: false,
    }),
}));
