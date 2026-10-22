"use client";

import { useContext } from "react";
import { LearningLanguageContext } from "../i18n/learning-language-context";
import { cinemaLanguageOf, type CinemaLanguage } from "../model/cinema";

/** 연출의 목소리·글자 언어 = 지금 배우는 코스. 영어 코스면 영어 (앱 useCinemaLanguage 와 같다) */
export function useCinemaLanguage(): CinemaLanguage {
  return cinemaLanguageOf(useContext(LearningLanguageContext));
}
