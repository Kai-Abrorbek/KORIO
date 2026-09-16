import type { ExpressionNodeLearningResponse, ExpressionRoadmapResponse } from "../model/expressions";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getExpressionRoadmap(request: AuthenticatedRequest) {
  return request<ExpressionRoadmapResponse>("/expressions/roadmap?lang=uz");
}

export function getExpressionNode(request: AuthenticatedRequest, nodeCode: string) {
  return request<ExpressionNodeLearningResponse>(`/expressions/nodes/${encodeURIComponent(nodeCode)}/learning?lang=uz`);
}

export function recordExpressionView(request: AuthenticatedRequest, expressionId: string) {
  return request(`/expressions/${encodeURIComponent(expressionId)}/views`, { method: "POST" });
}
