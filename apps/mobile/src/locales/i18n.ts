import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./ko";
import uz from "./uz";
import en from "./en";
import ru from "./ru";

const resources = {
  ko: { translation: ko },
  uz: { translation: uz },
  en: { translation: en },
  ru: { translation: ru },
};

/** 앱이 지원하는 언어. resources 의 키와 같아야 한다 */
export const APP_LANGUAGES = ["uz", "ru", "en", "ko"] as const;
export type AppLanguage = (typeof APP_LANGUAGES)[number];

/** 기기 언어가 넷 중 아무것도 아닐 때 */
const FALLBACK_LANGUAGE: AppLanguage = "en";

const isAppLanguage = (v: string): v is AppLanguage =>
  (APP_LANGUAGES as readonly string[]).includes(v);

/**
 * expo-localization 에서 우리가 쓰는 부분만.
 * (56.0.6 실제 타입: getLocales(): [Locale, ...Locale[]],
 *  Locale.languageCode: string | null)
 */
type LocalizationModule = {
  getLocales: () => { languageCode: string | null }[];
};

/**
 * 기기에 설정된 언어들. 유저가 기기 설정에서 정한 **우선순위 순서**다.
 *
 * ⚠️ expo-localization 을 파일 맨 위에서 import 하면 안 된다.
 *
 *    그 패키지는 import 되는 순간 requireNativeModule('ExpoLocalization') 을
 *    부른다. 이 파일은 앱이 켜지자마자 로드되므로, 네이티브 모듈이 없는
 *    바이너리에서는 **앱이 시작도 못 하고 죽는다.** 그런 바이너리는 실제로 있다:
 *      · 패키지만 설치하고 아직 네이티브 재빌드를 안 한 개발 빌드
 *      · runtimeVersion 이 appVersion 정책이라, 버전을 안 올리고 OTA 를
 *        내보내면 이 JS 가 expo-localization 이 없는 기존 스토어 빌드에도 간다
 *    그래서 쓰는 순간에 require 하고, 실패하면 Intl 로 읽는다
 *    (안드로이드는 Intl 도 시스템 언어를 돌려준다).
 */
function deviceLanguageCodes(): string[] {
  try {
    const loc = require("expo-localization") as LocalizationModule;
    return loc.getLocales().map((l) => l.languageCode ?? "");
  } catch {
    try {
      return [Intl.DateTimeFormat().resolvedOptions().locale];
    } catch {
      return [];
    }
  }
}

let detected: AppLanguage | null = null;

/**
 * 첫 실행 언어 = 기기 언어.
 *
 * 예전엔 무조건 우즈벡어로 시작해서, 러시아어·영어 폰 유저가 첫 설문부터
 * 못 읽는 언어로 봤다. 설정에서 바꿀 수는 있지만 그건 설문을 지난 뒤다.
 *
 * 우선순위 목록을 **위에서부터** 본다. [카자흐어, 러시아어] 인 폰이면
 * 카자흐어는 없으니 러시아어로 간다 — 첫 번째만 보면 바로 영어로 떨어진다.
 *
 * 한 번 정하면 실행 중엔 다시 안 읽는다 (첫 실행 기본값에만 쓰니까).
 * 유저가 설정에서 고른 언어는 settings.store 가 저장했다가 덮어쓴다.
 */
export function detectDeviceLanguage(): AppLanguage {
  if (detected) return detected;
  detected = FALLBACK_LANGUAGE;
  for (const raw of deviceLanguageCodes()) {
    // "uz-Latn-UZ", "ru_RU" 둘 다 앞부분만 본다
    const code = raw.toLowerCase().split(/[-_]/)[0];
    if (isAppLanguage(code)) {
      detected = code;
      break;
    }
  }
  return detected;
}

i18n.use(initReactI18next).init({
  resources,
  // 첫 실행은 기기 언어. 설정에서 고르면 settings.store 가 저장·복원한다
  lng: detectDeviceLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  /**
   * 값이 안 넘어온 자리는 지운다.
   * 기본 동작은 "{{message}}" 를 그대로 화면에 뱉는 것이라, params 하나
   * 빠지면 유저가 템플릿 원문을 보게 된다 (실제로 초대 알림에서 났다).
   */
  missingInterpolationHandler: (text: string, match: any) => {
    if (__DEV__) {
      console.warn(`[i18n] 보간값 누락: ${String(match?.[1] ?? match)} — "${text}"`);
    }
    return "";
  },
});

export default i18n;
