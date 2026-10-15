import { getContentLang } from "../../../shared/i18n/content-language";
import type { LearnCourse, LearnMode, StudyMode } from "../../learning/model/learning-options";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/** api learn-progress.types · 앱 services/learn-progress.service 와 같은 모양 */
export interface LearnProgress {
  course: LearnCourse;
  mode: LearnMode;
  scope: "section" | "level" | "topic" | "topik";
  /** 섹션·급 번호, TOPIK 1|2, 주제 순번 */
  scopeNumber: number;
  /** 주제 이름 (topic 만) */
  title: string | null;
  unit: "lesson" | "day" | "grammar" | "expression" | "sentence" | "reading" | "exam";
  done: number;
  total: number;
  /** 링 값 0~100 */
  percent: number;
}

/**
 * 홈 카드 진행도. 화면에 띄운 코스·모드를 같이 보낸다 — 모드를 막 바꾼 직후엔
 * 서버 저장이 뒤따라오는 중일 수 있다. 셀 게 없는 모드면 progress: null.
 */
export function getLearnProgress(
  request: AuthenticatedRequest,
  params: { course: LearnCourse; mode: string; studyMode: StudyMode; topikLevel: "1" | "2" },
) {
  const query = new URLSearchParams({ ...params, lang: getContentLang() });
  return request<{ progress: LearnProgress | null }>(`/learn-progress?${query.toString()}`);
}
