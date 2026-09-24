export const APP_LANGUAGES = ["uz", "ru", "en", "ko"] as const;

export type AppLanguage = (typeof APP_LANGUAGES)[number];

export function isAppLanguage(value: string | null): value is AppLanguage {
  return APP_LANGUAGES.some((language) => language === value);
}
