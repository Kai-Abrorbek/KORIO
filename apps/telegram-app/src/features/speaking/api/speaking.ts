import type { AssessResult, ExpressionListResponse, ExpressionOverview, ExpressionProgress, SpeakingProgress } from "../model/speaking";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getExpressionOverview(request: AuthenticatedRequest) {
  return request<ExpressionOverview>("/expressions/overview?lang=uz");
}

export async function getPackExpressions(request: AuthenticatedRequest, packCode: string) {
  const items: ExpressionListResponse["items"] = [];
  let cursor: string | null = null;
  let pack: ExpressionListResponse["pack"] = null;
  let total = 0;
  do {
    const query = new URLSearchParams({ lang: "uz", limit: "100", pack: packCode });
    if (cursor) query.set("cursor", cursor);
    const page = await request<ExpressionListResponse>(`/expressions?${query.toString()}`);
    items.push(...page.items);
    pack = page.pack;
    total = page.total;
    cursor = page.nextCursor;
  } while (cursor);
  return { items, nextCursor: null, pack, total } satisfies ExpressionListResponse;
}

export function getSpeakingProgress(request: AuthenticatedRequest, packCode: string) {
  return request<SpeakingProgress>(`/expressions/packs/${encodeURIComponent(packCode)}/speaking-progress`);
}

export function saveSpeakingProgress(request: AuthenticatedRequest, packCode: string, index: number, total: number) {
  return request<SpeakingProgress>(`/expressions/packs/${encodeURIComponent(packCode)}/speaking-progress`, {
    body: JSON.stringify({ index, total }), method: "PATCH",
  });
}

export function setExpressionSaved(request: AuthenticatedRequest, expressionId: string, isSaved: boolean) {
  return request<{ expressionId: string; progress: ExpressionProgress }>(`/expressions/${encodeURIComponent(expressionId)}/saved`, {
    body: JSON.stringify({ isSaved }), method: "PATCH",
  });
}

export function assessExpression(request: AuthenticatedRequest, expressionId: string, wav: ArrayBuffer) {
  return request<AssessResult>(`/speech/assess-expression?expressionId=${encodeURIComponent(expressionId)}`, {
    body: wav, headers: { "Content-Type": "audio/wav" }, method: "POST",
  });
}
