import api from "@/services/api";
import { getContentLang } from "@/store/settings.store";
import type { LearnMode, StudyMode, TopikLevel } from "@/store/settings.store";
import type { LearnCourse } from "@/constants/learnCourses";

/** api learn-progress.types 와 같은 모양 */
export type LearnProgressScope = "section" | "level" | "topic" | "topik";
export type LearnProgressUnit =
  | "lesson"
  | "day"
  | "grammar"
  | "expression"
  | "sentence"
  | "reading"
  | "exam";

export interface LearnProgress {
  course: LearnCourse;
  mode: LearnMode;
  scope: LearnProgressScope;
  /** 섹션·급 번호, TOPIK 1|2, 주제 순번 */
  scopeNumber: number;
  /** 주제 이름 (topic 만) */
  title: string | null;
  unit: LearnProgressUnit;
  done: number;
  total: number;
  /** 링 값 0~100 */
  percent: number;
}

export const LearnProgressService = {
  /**
   * 홈 카드 진행도. 화면에 띄운 코스·모드를 같이 보낸다 — 모드를 막 바꾼 직후엔
   * 서버 저장이 뒤따라오는 중일 수 있다. 셀 게 없는 모드면 progress: null.
   */
  get: (params: {
    course: LearnCourse;
    mode: LearnMode;
    studyMode: StudyMode;
    topikLevel: TopikLevel;
  }): Promise<{ progress: LearnProgress | null }> => {
    const query = new URLSearchParams({ ...params, lang: getContentLang() });
    return api.get(`/learn-progress?${query.toString()}`);
  },
};
