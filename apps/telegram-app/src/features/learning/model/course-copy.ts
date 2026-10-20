import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { learnCourseOf, type LearnCourse } from "./learning-options";

/**
 * 코스(배우는 언어)마다 다른 문구 키 (앱 hooks/useCourseTranslation 과 같은 규칙).
 *
 * 학습 로드·급수·졸업 시험은 한국어와 영어가 같은 화면을 쓴다. 그런데 몇몇 문구가
 * 한국어 전제다 — "Hozirgi koreys tili darajangiz…", 한국어 화면의 "1급"(영어는 "1단계").
 * 영어 코스는 `key_en` 을 쓴다. locales 네 언어 모두에 있고, 화면은 data-i18n 으로
 * 그 키를 콕 집는다 — 우즈벡어 원문이 같아도 번역기가 엉뚱한 쪽을 붙이지 않게.
 *
 * ⚠️ `_en` 이 있는 키에만 쓴다 (locales 의 "영어 코스용" 묶음). 없는 키에 쓰면 키 이름이 그대로 보인다.
 */
export function courseCopyKey(key: string, course: LearnCourse): string {
  return course === "ko" ? key : `${key}_${course}`;
}

/** 지금 코스로 키를 고르는 함수 */
export function useCourseCopyKey(): (key: string) => string {
  const { user } = useTelegramAuth();
  const course = learnCourseOf(user?.learnCourse);
  return (key: string) => courseCopyKey(key, course);
}
