export type HangulMastery = 0 | 1 | 2 | 3;

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export interface HangulCharacterProgress {
  characterId: string;
  correctCount: number;
  mastery: HangulMastery;
  score: number;
  wrongCount: number;
}

export interface HangulProgressResponse {
  hangulCompletedAt: string | null;
  justCompleted: boolean;
  learnedCount: number;
  progress: HangulCharacterProgress[];
  total: number;
}

export function getHangulProgress(
  request: AuthenticatedRequest,
): Promise<HangulProgressResponse> {
  return request("/hangul/progress");
}

export function completeHangul(
  request: AuthenticatedRequest,
): Promise<{ hangulCompletedAt: string }> {
  return request("/users/me/hangul-complete", {
    body: JSON.stringify({}),
    method: "POST",
  });
}
