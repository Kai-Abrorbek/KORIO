import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLevel, AuthProvider } from "../types/enums";

interface User {
  id: string;
  email: string;
  nickname: string;
  level: UserLevel;
  totalXP: number;
  streak: number;
  profileImage?: string;
  provider: AuthProvider;
  isOnboardingCompleted: boolean; // 추가
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  setUser: (user: User, token: string) => void;
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
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
