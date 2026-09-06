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

i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // 기본 언어 우즈벡어
  fallbackLng: "en",
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
