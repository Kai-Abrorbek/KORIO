import api from "./api";

export type QuestId = "xp" | "correct" | "minutes";

/** 옛 모양 (서버가 옛 앱용으로 같이 보낸다) */
export interface QuestItem {
  id: QuestId;
  target: number;
  progress: number;
  done: boolean;
  claimed: boolean;
  gems: number;
}

/** 칸 — 쉬움·보통·어려움 + SUPER 보너스 */
export type QuestSlotId = "easy" | "normal" | "hard" | "bonus";

export type QuestKind =
  | "xp"
  | "correct"
  | "minutes"
  | "sessions"
  | "accurate"
  | "perfect"
  | "mistakes"
  | "category"
  | "follow"
  | "shareProgress"
  | "shareInvite";

/** 앱이 알려 주는 행동 (서버가 직접 못 보는 것) */
export type QuestEventType = "shareProgress" | "shareInvite";

export interface QuestSlot {
  id: QuestSlotId;
  slot: QuestSlotId;
  kind: QuestKind;
  /** kind = category 일 때 분야 (vocab · grammar · listening · ...) */
  category: string | null;
  /** 홍보 퀘스트 (공유·초대·팔로우) */
  promo: boolean;
  target: number;
  progress: number;
  done: boolean;
  claimed: boolean;
  gems: number;
}

export interface QuestsView {
  day: string;
  items: QuestItem[];
  /** 옛 서버는 안 보낸다 */
  slots?: QuestSlot[];
  rerolls?: { used: number; max: number; left: number };
  chest: { gems: number; ready: boolean; claimed: boolean };
}

export interface MonthlyView {
  /** "2026-10" */
  month: string;
  count: number;
  target: number;
  daysLeft: number;
  milestones: {
    at: number;
    gems: number;
    badge: boolean;
    reached: boolean;
    claimed: boolean;
  }[];
  /** 모은 배지 (달 키, 최근 순) */
  badges: string[];
}

export type QuestChestResult =
  | { type: "gems"; gems: number }
  | { type: "xpBoost"; minutes: number; multiplier: number }
  | { type: "freeze"; owned: number };

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
  quests: QuestsView;
  /** 옛 서버는 안 보낸다 */
  monthly?: MonthlyView;
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
    id: QuestSlotId | QuestId | "chest",
  ): Promise<{
    gems: number;
    reward: number;
    /** 칸을 받았을 때 — 월간 챌린지 갱신 */
    monthly?: MonthlyView;
    /** 상자를 열었을 때 — 뭐가 나왔나 */
    chest?: QuestChestResult;
    xpBoost?: { until: string; multiplier: number } | null;
  }> => api.post("/retention/quests/claim", { id }),

  /** 한 칸 바꾸기 */
  rerollQuest: (slot: QuestSlotId): Promise<{ quests: QuestsView }> =>
    api.post("/retention/quests/reroll", { slot }),

  /** 공유·초대 같은 행동을 알린다 (퀘스트 진행도) */
  questEvent: (type: QuestEventType): Promise<{ quests: QuestsView }> =>
    api.post("/retention/quests/event", { type }),

  /** 월간 챌린지 칸 보상 */
  claimMonthly: (
    at: number,
  ): Promise<{
    gems: number;
    reward: number;
    badge: string | null;
    monthly: MonthlyView;
  }> => api.post("/retention/monthly/claim", { at }),

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
