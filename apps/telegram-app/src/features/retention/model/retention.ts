import uz from "../../../shared/i18n/locales/uz";

/**
 * 리텐션 — 복구펜 · 일일 퀘스트 · 복귀 보상 · 첫 7일 출석 · 연속 목표 (앱과 같은 서버 API).
 * 숫자(보석·목표·상한)는 전부 서버 retention.config.ts 가 정해서 내려준다.
 */

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

/** 칸 — 쉬움·보통·어려움 + SUPER 보너스 (앱 services/retention.service 와 같다) */
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

export type QuestEventType = "shareProgress" | "shareInvite";

export interface QuestSlot {
  id: QuestSlotId;
  slot: QuestSlotId;
  kind: QuestKind;
  category: string | null;
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
  slots?: QuestSlot[];
  rerolls?: { used: number; max: number; left: number };
  chest: { gems: number; ready: boolean; claimed: boolean };
}

export interface MonthlyView {
  month: string;
  count: number;
  target: number;
  daysLeft: number;
  milestones: { at: number; gems: number; badge: boolean; reached: boolean; claimed: boolean }[];
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
  active: { days: number; gems: number; progress: number; startDay: string } | null;
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

export interface CheckinView {
  count: number;
  canClaim: boolean;
  rewards: { day: number; gems: number; superDays: number }[];
}

export interface RetentionSummary {
  gems: number;
  streak: number;
  freeze: FreezeView;
  quests: QuestsView;
  /** 옛 서버는 안 보낸다 */
  monthly?: MonthlyView;
  checkin: CheckinView | null;
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

type Tree = { readonly [key: string]: string | Tree };

/**
 * 화면 글자 — **우즈벡어 원문**을 locales/uz.ts 의 retention 블록에서 꺼낸다.
 *
 * 이 미니앱은 화면에 우즈벡어를 그리고, 번역기(language-context)가 같은 키의
 * en/ru/ko 로 바꿔 끼운다. 그래서 원문이 locale 파일과 **글자 하나까지 같아야**
 * 번역이 붙는다 — 컴포넌트에 손으로 다시 쓰지 않고 여기서 꺼내 쓴다.
 * {{n}} 같은 값은 채워서 한 덩어리 문자열로 돌려준다 (번역기가 템플릿으로 맞춘다).
 */
export function rt(path: string, vars?: Record<string, string | number>): string {
  const value = path
    .split(".")
    .reduce<Tree | string | undefined>(
      (node, key) => (node && typeof node === "object" ? node[key] : undefined),
      (uz as unknown as { retention: Tree }).retention,
    );
  if (typeof value !== "string") return path;
  if (!vars) return value;
  return value.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}

/** 3 → "3 kunlik", 7 → "1 haftalik", 30 → "1 oylik" */
export function goalLength(days: number): string {
  const fixed = rt(`goal.len${days}`);
  return fixed === `goal.len${days}` ? rt("goal.lenDays", { n: days }) : fixed;
}

export function haptic(kind: "light" | "success" | "warning" | "select") {
  const feedback = window.Telegram?.WebApp.HapticFeedback;
  if (!feedback) return;
  if (kind === "light") feedback.impactOccurred?.("light");
  else if (kind === "select") feedback.selectionChanged?.();
  else feedback.notificationOccurred?.(kind);
}
