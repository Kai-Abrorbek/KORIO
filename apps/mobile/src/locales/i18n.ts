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
});

export default i18n;
