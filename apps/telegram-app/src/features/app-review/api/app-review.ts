type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

const post = (body: unknown = {}): RequestInit => ({
  body: JSON.stringify(body),
  method: "POST",
});

export interface AppReviewPrompt {
  /** 지금 띄울까 — 7일 주기·하루 보지 않기·닫은 횟수는 서버가 본다 */
  show: boolean;
  /** 평가하면 받는 보석 */
  reward: number;
}

export function getAppReviewPrompt(request: AuthenticatedRequest) {
  return request<AppReviewPrompt>("/app-reviews/prompt");
}

/** close = 다음 실행에 다시, snooze = 24시간 뒤에 */
export function dismissAppReview(request: AuthenticatedRequest, mode: "close" | "snooze") {
  return request<{ ok: boolean }>("/app-reviews/prompt/dismiss", post({ mode }));
}

export function submitAppReview(
  request: AuthenticatedRequest,
  input: { rating: number; comment?: string; locale: string },
) {
  return request<{ reward: number; gems: number }>(
    "/app-reviews",
    post({ ...input, platform: "telegram" }),
  );
}
