import type {
  Grammar,
  GrammarCompleteResult,
  GrammarListResponse,
} from "../model/grammar";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getGrammarList(
  request: AuthenticatedRequest,
  scope?: { section: number; unit: number },
): Promise<GrammarListResponse> {
  const query = new URLSearchParams({ lang: "uz" });
  if (scope) {
    query.set("section", String(scope.section));
    query.set("unit", String(scope.unit));
  }
  return request(`/grammar?${query.toString()}`);
}

export function getGrammar(
  request: AuthenticatedRequest,
  id: string,
  scoped: boolean,
): Promise<Grammar> {
  const query = new URLSearchParams({ lang: "uz" });
  if (scoped) query.set("scoped", "1");
  return request(`/grammar/${encodeURIComponent(id)}?${query.toString()}`);
}

export function completeGrammar(
  request: AuthenticatedRequest,
  id: string,
): Promise<GrammarCompleteResult> {
  return request(`/grammar/${encodeURIComponent(id)}/complete`, {
    body: JSON.stringify({}),
    method: "POST",
  });
}
