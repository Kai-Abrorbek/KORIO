import { create } from "zustand";
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,

  setUser: (user, token) =>
    set({
      user,
      accessToken: token,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),
}));
