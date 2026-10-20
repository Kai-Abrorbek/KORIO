import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/settings.store";
import type { LearnCourse } from "@/constants/learnCourses";

/**
 * 코스(배우는 언어)에 따라 문구가 달라지는 화면용 t.
 *
 * 학습 로드·급수·졸업 시험은 한국어와 영어가 같은 화면을 쓴다. 그런데 몇몇 문구가
 * 한국어 전제다 — "지금 한국어 수준에 맞게", 한국어 UI 의 "1급"(영어는 "1단계").
 * i18next context 로 푼다: 코스가 en 이면 `key_en` 을 먼저 찾고, 없으면 원래 key.
 * 그래서 코스마다 다른 문구만 `_en` 으로 추가하면 되고, 나머지는 손대지 않는다.
 */
export function courseCopyContext(course: LearnCourse): string | undefined {
  return course === "ko" ? undefined : course;
}

export function useCourseTranslation() {
  const { t, i18n } = useTranslation();
  const course = useSettingsStore((state) => state.learnCourse);
  const context = courseCopyContext(course);
  const courseT = useCallback(
    (key: string, options?: Record<string, unknown>): string =>
      t(key, { ...options, context } as never) as unknown as string,
    [t, context],
  );
  return { t: courseT, i18n, course };
}
