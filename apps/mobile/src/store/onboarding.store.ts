import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  /**
   * 가입 전에 설문 + 진단을 끝까지 봤는지.
   *
   * 이게 켜져 있으면 앱을 껐다 켜도 처음부터 다시 시키지 않는다 —
   * 스플래시가 곧장 요금제 화면으로 보낸다. 진단까지 다 해놓고 로그인만
   * 안 한 사람에게 설문을 또 시키면 그 자리에서 앱을 지운다.
   */
  guestOnboardingDone: boolean;

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

  /** 진단을 건너뛰는 완전초보용 — 설문만으로 온보딩을 마감한다 */
  markGuestOnboardingDone: () => void;

  incrementGuestCount: () => void;
  reset: () => void;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

const emptyState = () => ({
  targetLanguage: "korean",
  learningGoals: [] as LearningGoal[],
  learningStyle: "",
  dailyGoalMinutes: 10,
  levelTestScore: 0,
  detectedLevel: "",
  correctAnswers: 0,
  totalQuestions: 0,
  wrongQuestionIds: [] as string[],
  placementLevel: 1,
  recommendedSection: 1,
  sessionId: generateSessionId(),
  guestQuestionCount: 0,
  guestOnboardingDone: false,
  hangulLevel: "" as HangulLevel | "",
  interests: [] as Interest[],
  selfReportedLevel: "" as SelfReportedLevel | "",
  reminderHour: null as number | null,
  reminderEnabled: false,
});

/**
 * 가입 전 온보딩 상태.
 *
 * ⚠️ 반드시 persist 여야 한다. sessionId 가 앱을 껐다 켤 때마다 새로 생기면,
 * 설문·진단을 sessionId 로 저장해 둔 서버 문서를 가입할 때 못 찾는다
 * (auth.service 의 attachOnboarding 이 sessionId 로만 붙인다).
 * 그러면 로그인해도 레벨이 초기화된 채로 시작한다.
 */
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...emptyState(),

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
          guestOnboardingDone: true,
        })),

      markGuestOnboardingDone: () => set({ guestOnboardingDone: true }),

      incrementGuestCount: () =>
        set((state) => ({ guestQuestionCount: state.guestQuestionCount + 1 })),

      reset: () => set(emptyState()),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/**
 * 저장된 온보딩 상태가 복원됐는지.
 *
 * 복원 전에는 sessionId 가 방금 만든 새 값이라, 그걸로 로그인하면 가입 전
 * 진단 결과가 통째로 날아간다. 스플래시가 이 값을 기다린다.
 */
export function useOnboardingHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() =>
    useOnboardingStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (hydrated) return;
    return useOnboardingStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
  }, [hydrated]);

  return hydrated;
}
