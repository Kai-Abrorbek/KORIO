import type {
  QuestId,
  RetentionSummary,
  StreakGoalPage,
} from "../model/retention";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

const post = (body: unknown = {}): RequestInit => ({
  body: JSON.stringify(body),
  method: "POST",
});

export function getRetentionSummary(request: AuthenticatedRequest) {
  return request<RetentionSummary>("/retention/summary");
}

export function buyStreakFreeze(request: AuthenticatedRequest) {
  return request<{ gems: number; owned: number; max: number }>(
    "/retention/freeze/buy",
    post(),
  );
}

export function ackFreezeNotice(request: AuthenticatedRequest) {
  return request<{ success: boolean }>("/retention/freeze/notice/ack", post());
}

export function claimQuest(request: AuthenticatedRequest, id: QuestId | "chest") {
  return request<{ gems: number; reward: number }>(
    "/retention/quests/claim",
    post({ id }),
  );
}

export function claimComeback(request: AuthenticatedRequest) {
  return request<{
    energy: number;
    xpBoost: { until: string; multiplier: number };
  }>("/retention/comeback/claim", post());
}

export function claimCheckin(request: AuthenticatedRequest) {
  return request<{
    day: number;
    gems: number;
    reward: { gems: number; superDays: number };
    superGranted: boolean;
  }>("/retention/checkin/claim", post());
}

export function getStreakGoal(request: AuthenticatedRequest) {
  return request<StreakGoalPage>("/retention/streak-goal");
}

export function startStreakGoal(request: AuthenticatedRequest, days: number) {
  return request<StreakGoalPage>("/retention/streak-goal", post({ days }));
}

export function ackStreakGoal(request: AuthenticatedRequest) {
  return request<{ success: boolean }>("/retention/streak-goal/ack", post());
}

/** 틀린 문제 수 — 에너지 모달의 "복습으로 벌기" 를 보여줄지 */
export function getMistakeCount(request: AuthenticatedRequest) {
  return request<{ count: number }>("/lessons/mistakes");
}
