import { create } from "zustand";
import i18n from "../locales/i18n";

type Language = "uz" | "ko" | "en" | "ru";
export type Theme = "light" | "dark" | "system"; // 나중에 'purple' | 'mint' 등 추가 가능

interface SettingsState {
  language: Language;
  theme: Theme;

  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: "uz",
  theme: "system", // 기본은 시스템 따라가기

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },

  setTheme: (theme) => set({ theme }),
}));
