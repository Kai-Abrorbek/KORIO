type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getPronunciationScores(request: AuthenticatedRequest) {
  return request<{ scores: Record<string, number> }>("/users/me/pronunciation");
}

export function savePronunciationScore(request: AuthenticatedRequest, body: {
  level: string;
  mode: "easy" | "hard";
  score: number;
  step: number;
  targetLanguage?: "ko" | "en";
}) {
  return request<{ scores: Record<string, number> }>("/users/me/pronunciation", {
    body: JSON.stringify(body),
    method: "POST",
  });
}
