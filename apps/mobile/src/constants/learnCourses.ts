import type { LearnMode } from "@/store/settings.store";

/**
 * 학습 코스(= 배우는 언어). 학습 모드와 다른 축이다 — "무엇을" 배우느냐가 코스,
 * "어떻게" 배우느냐가 모드. api users/learn-mode.constants 의 COURSE_MODES 와 같은 표다.
 *
 * 코스를 늘릴 때: 여기 한 줄 + 서버 COURSE_MODES + courses.languages.<key> 번역.
 * 홈 카드(국기·언어 이름·모드)와 "이어서 학습하기" 가 이 표를 보고 따라간다.
 */
export type LearnCourse = "ko" | "en";

export interface LearnCourseMeta {
  /** courses.languages.<key> 번역 키 */
  key: "korean" | "english";
  flag: string;
  modes: readonly LearnMode[];
}

export const LEARN_COURSES: Record<LearnCourse, LearnCourseMeta> = {
  ko: {
    key: "korean",
    flag: "🇰🇷",
    modes: [
      "vocabulary",
      "grammarPractice",
      "grammar",
      "expression",
      "speaking",
      "conversation",
      "listening",
      "topik",
    ],
  },
  // 영어는 아직 글자 학습만 있다. 모드가 늘면 여기에 붙인다
  en: { key: "english", flag: "🇺🇸", modes: ["alphabet"] },
};

export const LEARN_COURSE_IDS = Object.keys(LEARN_COURSES) as LearnCourse[];

export const isLearnCourse = (v: unknown): v is LearnCourse =>
  typeof v === "string" && v in LEARN_COURSES;

export const courseHasMode = (course: LearnCourse, mode: LearnMode) =>
  LEARN_COURSES[course].modes.includes(mode);

/**
 * 모드를 고를 때 코스 정하기 (서버 resolveLearnCourse 와 같다).
 * 화면이 코스를 알면 그 코스, 모르면 지금 코스에 그 모드가 있으면 유지, 없으면 그 모드를 가진 첫 코스.
 */
export function resolveLearnCourse(
  mode: LearnMode,
  current: LearnCourse,
  requested?: LearnCourse,
): LearnCourse {
  if (requested && courseHasMode(requested, mode)) return requested;
  if (courseHasMode(current, mode)) return current;
  return LEARN_COURSE_IDS.find((course) => courseHasMode(course, mode)) ?? current;
}
