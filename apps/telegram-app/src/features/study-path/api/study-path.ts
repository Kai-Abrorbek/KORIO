import type {
  ChestClaimResult,
  StudyLevelsResponse,
  StudyPathResponse,
} from "../model/study-path";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getStudyLevels(
  request: AuthenticatedRequest,
): Promise<StudyLevelsResponse> {
  return request<StudyLevelsResponse>("/study-path/levels?lang=uz");
}

export function setStudyLevel(
  request: AuthenticatedRequest,
  level: number,
): Promise<{ placementLevel: number }> {
  return request<{ placementLevel: number }>("/study-path/levels", {
    body: JSON.stringify({ level }),
    method: "POST",
  });
}

export function getStudyPath(
  request: AuthenticatedRequest,
): Promise<StudyPathResponse> {
  return request<StudyPathResponse>("/study-path?lang=uz");
}

export function claimStudyPathChests(
  request: AuthenticatedRequest,
): Promise<ChestClaimResult> {
  return request<ChestClaimResult>("/lessons/chests/claim", {
    body: JSON.stringify({}),
    method: "POST",
  });
}
