"use client";

import { useCallback, useEffect, useState } from "react";

export const LANGUAGES = [
  { code: "uz", flag: "🇺🇿", greeting: "Salom", name: "O'zbek" },
  { code: "ko", flag: "🇰🇷", greeting: "안녕하세요", name: "한국어" },
  { code: "en", flag: "🇬🇧", greeting: "Hello", name: "English" },
  { code: "ru", flag: "🇷🇺", greeting: "Привет", name: "Русский" },
] as const;

export type AppLanguage = (typeof LANGUAGES)[number]["code"];

export const LANGUAGE_COPY: Record<
  AppLanguage,
  { back: string; subtitle: string; title: string }
> = {
  uz: { back: "Orqaga", subtitle: "Ilova tilini tanlang", title: "Til" },
  ko: { back: "뒤로", subtitle: "앱에서 사용할 언어를 선택하세요", title: "언어" },
  en: { back: "Back", subtitle: "Choose your app language", title: "Language" },
  ru: { back: "Назад", subtitle: "Выберите язык приложения", title: "Язык" },
};

const STORAGE_KEY = "korio-language";

function isLanguage(value: string | null): value is AppLanguage {
  return LANGUAGES.some((language) => language.code === value);
}

export function useLanguagePreference() {
  const [language, setLanguageState] = useState<AppLanguage>("uz");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next = isLanguage(saved) ? saved : "uz";
    document.documentElement.lang = next;
    setLanguageState(next);
    setReady(true);
  }, []);

  const setLanguage = useCallback((next: AppLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    setLanguageState(next);
  }, []);

  return { language, ready, setLanguage };
}
