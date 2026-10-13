import type { ExpressionNodeLearningResponse, ExpressionRoadmapResponse } from "../model/expressions";
import { getContentLang } from "../../../shared/i18n/content-language";
import type { StudyCelebration } from "../../misc/model/streak-chest-route";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getExpressionRoadmap(request: AuthenticatedRequest) {
  return request<ExpressionRoadmapResponse>(`/expressions/roadmap?lang=${getContentLang()}`);
}

/**
 * 주제를 골라 바로 넘어간다 (목록 / "이 주제로 넘어갈까요?") — 그 주제부터 길을 다시 연다.
 * 바뀐 로드맵을 그대로 돌려준다
 */
export function focusExpressionTopic(request: AuthenticatedRequest, topicCode: string) {
  return request<ExpressionRoadmapResponse>(
    `/expressions/packs/${encodeURIComponent(topicCode)}/focus?lang=${getContentLang()}`,
    { method: "POST" },
  );
}

export function getExpressionNode(request: AuthenticatedRequest, nodeCode: string) {
  return request<ExpressionNodeLearningResponse>(`/expressions/nodes/${encodeURIComponent(nodeCode)}/learning?lang=${getContentLang()}`);
}

/** 표현 카드 학습(노드) 완료 — 하루 학습으로 남기고 도장·상자를 받는다 */
export function completeExpressionNode(request: AuthenticatedRequest, nodeCode: string) {
  return request<{ celebration: StudyCelebration | null; success: boolean }>(`/expressions/nodes/${encodeURIComponent(nodeCode)}/complete`, { method: "POST" });
}

export function recordExpressionView(request: AuthenticatedRequest, expressionId: string) {
  return request(`/expressions/${encodeURIComponent(expressionId)}/views`, { method: "POST" });
}
