"use client";

import {
  useAppLanguage,
} from "../../../shared/i18n/language-context";
import type { AppLanguage } from "../../../shared/i18n/language";

export type { AppLanguage } from "../../../shared/i18n/language";

export const LANGUAGES = [
  { code: "uz", flag: "🇺🇿", greeting: "Salom", name: "O'zbek" },
  { code: "ko", flag: "🇰🇷", greeting: "안녕하세요", name: "한국어" },
  { code: "en", flag: "🇬🇧", greeting: "Hello", name: "English" },
  { code: "ru", flag: "🇷🇺", greeting: "Привет", name: "Русский" },
] as const;

export const LANGUAGE_COPY: Record<
  AppLanguage,
  { back: string; subtitle: string; title: string }
> = {
  uz: { back: "Orqaga", subtitle: "Ilova tilini tanlang", title: "Til" },
  ko: { back: "뒤로", subtitle: "앱에서 사용할 언어를 선택하세요", title: "언어" },
  en: { back: "Back", subtitle: "Choose your app language", title: "Language" },
  ru: { back: "Назад", subtitle: "Выберите язык приложения", title: "Язык" },
};

export function useLanguagePreference() {
  return useAppLanguage();
}
