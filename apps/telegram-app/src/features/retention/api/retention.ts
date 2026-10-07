import type {
  MonthlyView,
  QuestChestResult,
  QuestEventType,
  QuestId,
  QuestSlotId,
  QuestsView,
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

export function claimQuest(
  request: AuthenticatedRequest,
  id: QuestSlotId | QuestId | "chest",
) {
  return request<{
    gems: number;
    reward: number;
    monthly?: MonthlyView;
    chest?: QuestChestResult;
    xpBoost?: { until: string; multiplier: number } | null;
  }>("/retention/quests/claim", post({ id }));
}

/** 한 칸 바꾸기 */
export function rerollQuest(request: AuthenticatedRequest, slot: QuestSlotId) {
  return request<{ quests: QuestsView }>("/retention/quests/reroll", post({ slot }));
}

/** 공유·초대처럼 서버가 못 보는 행동을 알린다 (실패해도 조용히) */
export async function reportQuestEvent(
  request: AuthenticatedRequest,
  type: QuestEventType,
): Promise<QuestsView | null> {
  try {
    const res = await request<{ quests: QuestsView }>("/retention/quests/event", post({ type }));
    return res.quests;
  } catch {
    return null;
  }
}

/** 월간 챌린지 칸 보상 */
export function claimMonthly(request: AuthenticatedRequest, at: number) {
  return request<{ gems: number; reward: number; badge: string | null; monthly: MonthlyView }>(
    "/retention/monthly/claim",
    post({ at }),
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
