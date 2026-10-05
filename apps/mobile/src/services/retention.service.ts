import api from "./api";

export type QuestId = "xp" | "correct" | "minutes";

export interface QuestItem {
  id: QuestId;
  target: number;
  progress: number;
  done: boolean;
  claimed: boolean;
  gems: number;
}

export interface StreakGoalOption {
  days: number;
  gems: number;
}

export interface StreakGoalView {
  options: StreakGoalOption[];
  streakChest: { everyDays: number; gems: number };
  active: {
    days: number;
    gems: number;
    progress: number;
    startDay: string;
  } | null;
  result: {
    status: "completed" | "failed";
    days: number;
    gems: number;
    progress: number;
  } | null;
}

export interface FreezeView {
  owned: number;
  max: number;
  price: number;
  superWeekly: number;
  notice: { used: number; at: string } | null;
}

export interface RetentionSummary {
  gems: number;
  streak: number;
  freeze: FreezeView;
  quests: {
    day: string;
    items: QuestItem[];
    chest: { gems: number; ready: boolean; claimed: boolean };
  };
  checkin: {
    count: number;
    canClaim: boolean;
    rewards: { day: number; gems: number; superDays: number }[];
  } | null;
  comeback: {
    idleDays: number;
    energy: number;
    boostMinutes: number;
    multiplier: number;
  } | null;
  xpBoost: { until: string; multiplier: number } | null;
  streakGoal: StreakGoalView;
}

export type StreakGoalPage = StreakGoalView & {
  gems: number;
  streak: number;
  freeze: FreezeView;
};

/**
 * 리텐션 장치 — 복구펜 · 일일 퀘스트 · 복귀 보상 · 첫 7일 출석 · 연속 목표.
 * 숫자(보석·목표·상한)는 전부 서버가 정해서 내려준다. 앱은 그리기만 한다.
 */
export const RetentionService = {
  summary: (): Promise<RetentionSummary> => api.get("/retention/summary"),

  buyFreeze: (): Promise<{ gems: number; owned: number; max: number }> =>
    api.post("/retention/freeze/buy", {}),
  ackFreezeNotice: (): Promise<{ success: boolean }> =>
    api.post("/retention/freeze/notice/ack", {}),

  claimQuest: (
    id: QuestId | "chest",
  ): Promise<{ gems: number; reward: number }> =>
    api.post("/retention/quests/claim", { id }),

  claimComeback: (): Promise<{
    energy: number;
    xpBoost: { until: string; multiplier: number };
  }> => api.post("/retention/comeback/claim", {}),

  claimCheckin: (): Promise<{
    day: number;
    gems: number;
    reward: { gems: number; superDays: number };
    superGranted: boolean;
  }> => api.post("/retention/checkin/claim", {}),

  getGoal: (): Promise<StreakGoalPage> => api.get("/retention/streak-goal"),
  startGoal: (days: number): Promise<StreakGoalPage> =>
    api.post("/retention/streak-goal", { days }),
  ackGoal: (): Promise<{ success: boolean }> =>
    api.post("/retention/streak-goal/ack", {}),
};
