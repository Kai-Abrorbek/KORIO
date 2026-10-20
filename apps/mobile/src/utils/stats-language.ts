import {
  LEARN_COURSE_IDS,
  type LearnCourse,
} from "@/constants/learnCourses";

/**
 * 통계 화면 언어 전환에 보일 언어 (텔레그램 features/stats/model/stats.ts 와 같다).
 *
 * 지금 배우는 코스 + 지금 보고 있는 언어 + 최근 1년에 공부한 언어. 등록 순서대로.
 * 하나뿐이면 전환을 안 그린다 — 한국어만 하는 사람에게 빈 영어 통계를 내밀 이유가 없다.
 */
export function statsLanguageOptions(
  current: LearnCourse,
  selected: LearnCourse,
  studied: readonly string[] = [],
): LearnCourse[] {
  return LEARN_COURSE_IDS.filter(
    (course) =>
      course === current || course === selected || studied.includes(course),
  );
}
