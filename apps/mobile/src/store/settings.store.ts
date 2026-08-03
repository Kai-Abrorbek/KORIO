import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";

type Language = "uz" | "ko" | "en" | "ru";
export type Theme = "light" | "dark" | "system";
export type LearningTheme = "skyBlue" | "purple";

interface SettingsState {
  language: Language;
  theme: Theme;
  learningTheme: LearningTheme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setLearningTheme: (t: LearningTheme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "uz",
      theme: "system",
      learningTheme: "skyBlue",
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
      setTheme: (theme) => set({ theme }),
      setLearningTheme: (learningTheme) => set({ learningTheme }),
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
