import type { ExpressionNodeLearningResponse, ExpressionRoadmapResponse } from "../model/expressions";
import { getContentLang } from "../../../shared/i18n/content-language";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getExpressionRoadmap(request: AuthenticatedRequest) {
  return request<ExpressionRoadmapResponse>(`/expressions/roadmap?lang=${getContentLang()}`);
}

export function getExpressionNode(request: AuthenticatedRequest, nodeCode: string) {
  return request<ExpressionNodeLearningResponse>(`/expressions/nodes/${encodeURIComponent(nodeCode)}/learning?lang=${getContentLang()}`);
}

export function recordExpressionView(request: AuthenticatedRequest, expressionId: string) {
  return request(`/expressions/${encodeURIComponent(expressionId)}/views`, { method: "POST" });
}
