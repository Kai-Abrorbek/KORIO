import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLevel, AuthProvider } from "../types/enums";

interface User {
  id: string;
  email: string;
  nickname: string;
  username?: string;
  level: UserLevel;
  totalXP: number;
  streak: number;
  longestStreak?: number;
  league?: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isSuper?: boolean;
  streakFreeze?: number;
  gems?: number;
  energy?: number;
  followingCount?: number;
  followersCount?: number;
  completedLessons?: number;
  profileImage?: string;
  bio?: string;
  country?: string;
  provider: AuthProvider;
  isOnboardingCompleted: boolean;
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isLoading: false,

      setUser: (user, token) =>
        set({ user, accessToken: token, isLoggedIn: true }),

      logout: () => set({ user: null, accessToken: null, isLoggedIn: false }),

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
