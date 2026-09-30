import type {
  RoadmapResponse,
  RoadmapScoreResponse,
} from "../model/roadmap";
import { getContentLang } from "../../../shared/i18n/content-language";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getRoadmap(
  request: AuthenticatedRequest,
  options?: { category?: string; viewSection?: number },
): Promise<RoadmapResponse> {
  const query = new URLSearchParams({ lang: getContentLang() });
  if (options?.category) query.set("category", options.category);
  if (options?.viewSection) {
    query.set("viewSection", String(options.viewSection));
  }
  return request<RoadmapResponse>(`/lessons/roadmap?${query.toString()}`);
}

/** category 를 안 주면 어휘. 문법 로드맵이면 "grammar" — 섹션 수·진도가 트랙마다 다르다 */
export function getRoadmapScore(
  request: AuthenticatedRequest,
  category?: string | null,
): Promise<RoadmapScoreResponse> {
  const query = new URLSearchParams({ lang: getContentLang() });
  if (category && category !== "vocabulary") query.set("category", category);
  return request<RoadmapScoreResponse>(`/lessons/score?${query.toString()}`);
}

/**
 * 학습 로드(가이드) 모드의 스코어. 자유 학습(/lessons/score)과 **다른 값**이다 —
 * 두 모드는 진도를 다른 곳에 쌓는다 (앱 StudyPathService.getScore).
 */
export function getStudyPathScore(
  request: AuthenticatedRequest,
): Promise<RoadmapScoreResponse> {
  return request<RoadmapScoreResponse>(`/study-path/score?lang=${getContentLang()}`);
}
