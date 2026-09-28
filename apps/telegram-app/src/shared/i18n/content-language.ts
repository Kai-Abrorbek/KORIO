import { isAppLanguage, type AppLanguage } from "./language";

/**
 * 뜻·설명(학습 콘텐츠) 언어. 모바일 앱의 settings.store getContentLang 과 같은 규칙.
 *
 *   UI 가 uz/ru/en → 그대로 (UI 언어 = 설명 언어)
 *   UI 가 ko       → 따로 고른 값, 안 골랐으면 기기(텔레그램) 언어에서 추정, 없으면 uz
 *
 * 한국어는 배우는 말이라 설명 언어가 될 수 없다.
 *
 * 선 긋기:
 *   · 화면 문구(버튼·안내)                → UI 언어 (카탈로그 번역)
 *   · 서버에 보내는 lang, 뜻·번역·해설    → 설명 언어 (이것)
 */
export const CONTENT_LANGUAGES = ["uz", "ru", "en"] as const;
export type ContentLanguage = (typeof CONTENT_LANGUAGES)[number];

export const CONTENT_LANGUAGE_KEY = "korio-content-language";

export function isContentLanguage(value: unknown): value is ContentLanguage {
  return (
    typeof value === "string" &&
    (CONTENT_LANGUAGES as readonly string[]).includes(value)
  );
}

/** 텔레그램 앱 언어가 먼저, 그다음 브라우저 언어 목록 (우선순위 순) */
export function deviceLanguageCodes(): string[] {
  const codes: string[] = [];
  try {
    const telegram = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
    if (telegram) codes.push(telegram);
  } catch {
    // SDK 가 아직 없을 수 있다
  }
  try {
    codes.push(...(navigator.languages ?? [navigator.language]));
  } catch {
    // 무시
  }
  return codes.map((code) => code.toLowerCase().split(/[-_]/)[0] ?? "");
}

/** 첫 실행 UI 언어. 모바일의 detectDeviceLanguage 와 같다 (없으면 uz) */
export function detectDeviceLanguage(): AppLanguage {
  for (const code of deviceLanguageCodes()) {
    if (isAppLanguage(code)) return code;
  }
  return "uz";
}

export function detectDeviceContentLanguage(): ContentLanguage {
  for (const code of deviceLanguageCodes()) {
    if (isContentLanguage(code)) return code;
  }
  return "uz";
}

export function readSavedContentLanguage(): ContentLanguage | null {
  try {
    const saved = window.localStorage.getItem(CONTENT_LANGUAGE_KEY);
    return isContentLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function saveContentLanguage(language: ContentLanguage) {
  try {
    window.localStorage.setItem(CONTENT_LANGUAGE_KEY, language);
  } catch {
    // 저장이 막힌 환경 — 이번 실행 동안만 적용된다
  }
}

export function resolveContentLanguage(
  uiLanguage: string | undefined,
  saved: ContentLanguage | null,
): ContentLanguage {
  const base = (uiLanguage ?? "").toLowerCase().split(/[-_]/)[0];
  if (isContentLanguage(base)) return base;
  return saved ?? detectDeviceContentLanguage();
}

/**
 * 컴포넌트 밖(API 모듈)용. 호출 시점의 값을 읽는다.
 * UI 언어는 LanguageProvider 가 <html data-language> 에 적어 둔 값.
 */
export function getContentLang(): ContentLanguage {
  if (typeof document === "undefined") return "uz";
  return resolveContentLanguage(
    document.documentElement.dataset.language,
    readSavedContentLanguage(),
  );
}
