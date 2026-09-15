import type {
  RoadmapResponse,
  RoadmapScoreResponse,
} from "../model/roadmap";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getRoadmap(
  request: AuthenticatedRequest,
  options?: { category?: string; viewSection?: number },
): Promise<RoadmapResponse> {
  const query = new URLSearchParams({ lang: "uz" });
  if (options?.category) query.set("category", options.category);
  if (options?.viewSection) {
    query.set("viewSection", String(options.viewSection));
  }
  return request<RoadmapResponse>(`/lessons/roadmap?${query.toString()}`);
}

export function getRoadmapScore(
  request: AuthenticatedRequest,
): Promise<RoadmapScoreResponse> {
  return request<RoadmapScoreResponse>("/lessons/score?lang=uz");
}
