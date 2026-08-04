import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";

type Language = "uz" | "ko" | "en" | "ru";
export type Theme = "light" | "dark" | "system";
export type LearningTheme = "skyBlue" | "purple";
export type LearnMode =
  | "vocabulary"
  | "grammar"
  | "expression"
  | "conversation"
  | "listening"
  | "topik";
export interface NotificationPrefs {
  master: boolean;
  daily: boolean;
  dailyHour: number; // 0-23
  streak: boolean;
  league: boolean;
  friends: boolean;
  events: boolean;
}

interface SettingsState {
  language: Language;
  theme: Theme;
  learningTheme: LearningTheme;
  learnMode: LearnMode; // 현재 진행 중인 학습 모드
  notifications: NotificationPrefs;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setLearningTheme: (t: LearningTheme) => void;
  setLearnMode: (m: LearnMode) => void;
  setNotifications: (patch: Partial<NotificationPrefs>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "uz",
      theme: "system",
      learningTheme: "skyBlue",
      learnMode: "vocabulary",
      notifications: {
        master: true,
        daily: true,
        dailyHour: 20,
        streak: true,
        league: true,
        friends: true,
        events: false,
      },
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
      setTheme: (theme) => set({ theme }),
      setLearningTheme: (learningTheme) => set({ learningTheme }),
      setLearnMode: (learnMode) => set({ learnMode }),
      setNotifications: (patch) =>
        set((s) => ({ notifications: { ...s.notifications, ...patch } })),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // persist는 상태만 복원하고 사이드이펙트는 안 탐 → 저장된 언어로 i18n 재동기화
        if (state?.language) i18n.changeLanguage(state.language);
      },
    },
  ),
);
