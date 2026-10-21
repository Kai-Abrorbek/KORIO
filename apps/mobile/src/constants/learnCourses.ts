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
  // conversation = AI 음성 튜터 (영어 튜터)
  en: { key: "english", flag: "🇺🇸", modes: ["alphabet", "vocabulary", "grammarPractice", "grammar", "conversation"] },
};

/** UI language selection and curriculum identity are different axes. */
export const DEFAULT_LEARNING_COURSES = {
  ko: { courseId: "ko-general", targetLanguage: "ko", speechLocale: "ko-KR" },
  en: { courseId: "en-general", targetLanguage: "en", speechLocale: "en-US" },
} as const;

export function learningScopePath(path: string, course: LearnCourse): string {
  if (!isCourseScopedRequest(path)) return path;
  const [pathname, search = ""] = path.split("?");
  const query = new URLSearchParams(search);
  const scope = query.has("courseId")
    ? Object.values(DEFAULT_LEARNING_COURSES).find((entry) => entry.courseId === query.get("courseId"))
    : query.has("targetLanguage")
      ? Object.values(DEFAULT_LEARNING_COURSES).find((entry) => entry.targetLanguage === query.get("targetLanguage"))
      : DEFAULT_LEARNING_COURSES[course];
  if (scope && !query.has("courseId")) query.set("courseId", scope.courseId);
  if (scope && !query.has("targetLanguage")) query.set("targetLanguage", scope.targetLanguage);
  return `${pathname}?${query.toString()}`;
}

export const isLearningRequest = (path: string): boolean =>
  /^\/(words|lessons|grammar|study-path|learn-progress|speech)(?:[/?]|$)/.test(path);

// 일일 퀘스트도 지금 코스를 붙여 보낸다 — 문제 퀘스트는 코스마다 따로 센다 (공통 퀘스트는 그대로).
// 학습 요청은 아니라서 코스가 바뀌어도 응답을 버리지 않는다 (보상 받기는 이미 서버에 반영됐다).
export const isCourseScopedRequest = (path: string): boolean =>
  isLearningRequest(path) || /^\/retention(?:[/?]|$)/.test(path);

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
