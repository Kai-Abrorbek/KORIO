import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLevel, AuthProvider } from "../types/enums";
import type { AvatarConfig } from "@/types/avatar";
import {
  useSettingsStore,
  type LearnMode,
  type StudyMode,
  type TopikLevel,
} from "./settings.store";
import { useOnboardingStore } from "./onboarding.store";

export interface User {
  id: string;
  email: string;
  nickname: string;
  username?: string;
  profileImage?: string;
  avatar?: AvatarConfig;
  bio?: string;
  level: UserLevel;
  totalXP: number;
  streak: number;
  longestStreak?: number;
  league?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isSuper?: boolean;
  /** "trial" 이면 무료 체험 중. 결제 구독이면 상품 id */
  superPlan?: string | null;
  superExpiresAt?: string | null;
  streakFreeze?: number;
  gems?: number;
  energy?: number;
  followingCount?: number;
  followersCount?: number;
  completedLessons?: number;
  country?: string;
  hangulLevel?: "none" | "partial" | "fluent"; // 온보딩 자가응답
  hangulCompletedAt?: string; // 로드맵 첫 노드(한글) 완료 시각
  coursePrimaryFlag?: string; // 주 코스 국기 (백엔드 getMe)
  courseExtraCount?: number; // 주 코스 외 추가 코스 수 (코스수 - 1)
  provider: AuthProvider;
  isOnboardingCompleted: boolean;
  currentUnitProgress?: number;
  /** 배치 테스트가 정한 학습 급수(1~6) */
  languageLevel?: number;
  /** 배치 테스트 또는 직접 선택으로 시작 급수가 확정됐는지 */
  hasPickedLevel?: boolean;
  /** 현재 학습 중인 모드 — 기기가 아니라 계정에 붙는다 */
  learnMode?: LearnMode;
  /** 순서대로(guided) 인지 자율(free) 인지 */
  studyMode?: StudyMode;
  /** 토픽 학습 중이면 어느 급수인지 */
  topikLevel?: TopikLevel;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  setUser: (user: User, token: string) => void;
  updateUser: (partial: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setUserData: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isLoading: false,

      setUser: (user, token) => {
        // 가입 전 온보딩은 여기서 수명이 끝난다. 서버가 sessionId 로 이미
        // 계정에 붙였고(attachOnboarding), 남겨두면 로그아웃한 다음 앱을
        // 켤 때 "게스트가 진단을 끝낸 상태"로 오인해 요금제 화면에 떨군다.
        useOnboardingStore.getState().reset();
        set({ user, accessToken: token, isLoggedIn: true });
      },

      logout: () => {
        // 학습 모드는 계정 데이터라 로컬 거울에 남겨두면 안 된다.
        // 안 지우면 다음 사람이 앞사람 모드로 시작한다.
        useSettingsStore.getState().setLearnMode("vocabulary");
        useSettingsStore.getState().setTopikLevel("1");
        // 로그인한 사람이 레벨 테스트를 다시 보면 guestOnboardingDone 이
        // 켜진다. 안 비우면 로그아웃 뒤 앱을 켤 때 웰컴이 아니라 요금제로
        // 떨어지고, 남의 진단 결과가 그대로 보인다.
        useOnboardingStore.getState().reset();
        set({ user: null, accessToken: null, isLoggedIn: false });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : (partial as User), // null이면 받은 걸로 통째 세팅
        })),
      setUserData: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
