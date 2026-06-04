import { LearningGoal } from "@/types/enums";
import { create } from "zustand";

interface OnboardingState {
  // 설문조사
  targetLanguage: string;
  learningGoals: LearningGoal[];
  learningStyle: string;
  dailyGoalMinutes: number;

  // 레벨 테스트
  levelTestScore: number;
  detectedLevel: string;
  correctAnswers: number;
  wrongQuestionIds: string[];

  // 비로그인 세션
  sessionId: string;
  guestQuestionCount: number;

  // 액션
  setSurvey: (data: {
    targetLanguage: string;
    learningGoals: LearningGoal[];
    learningStyle: string;
    dailyGoalMinutes: number;
  }) => void;
  setLevelTestResult: (data: {
    score: number;
    detectedLevel: string;
    correctAnswers: number;
    wrongQuestionIds: string[];
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
  wrongQuestionIds: [],
  sessionId: generateSessionId(),
  guestQuestionCount: 0,

  setSurvey: (data) => set((state) => ({ ...state, ...data })),
  setLevelTestResult: (data) =>
    set((state) => ({
      ...state,
      levelTestScore: data.score,
      detectedLevel: data.detectedLevel,
      correctAnswers: data.correctAnswers,
      wrongQuestionIds: data.wrongQuestionIds,
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
      wrongQuestionIds: [],
      sessionId: generateSessionId(),
      guestQuestionCount: 0,
    }),
}));
