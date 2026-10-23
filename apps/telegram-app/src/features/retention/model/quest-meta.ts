import type { IoniconName } from "../../../shared/ui/mobile-icon";
import {
  rt,
  type QuestKind,
  type QuestSlot,
  type QuestSlotId,
  type RetentionSummary,
} from "./retention";

/**
 * 퀘스트 아이콘·색·문구 — 앱 features/retention/questMeta.ts 와 같다.
 */
export const QUEST_KIND_META: Record<QuestKind, { icon: IoniconName; color: string }> = {
  xp: { icon: "flash", color: "#FFB020" },
  correct: { icon: "checkmark-done", color: "#2BB673" },
  minutes: { icon: "time", color: "#776ee2" },
  sessions: { icon: "book", color: "#4A90D9" },
  accurate: { icon: "locate", color: "#26A69A" },
  perfect: { icon: "star", color: "#E2A83A" },
  mistakes: { icon: "refresh-circle", color: "#E25C5C" },
  category: { icon: "albums", color: "#AB47BC" },
  follow: { icon: "person-add", color: "#42A5F5" },
  shareProgress: { icon: "share-social", color: "#EC407A" },
  shareInvite: { icon: "gift", color: "#FF7043" },
};

export const CATEGORY_META: Record<string, { icon: IoniconName; color: string }> = {
  vocab: { icon: "text", color: "#776ee2" },
  grammar: { icon: "construct", color: "#5C6BC0" },
  listening: { icon: "headset", color: "#42A5F5" },
  expression: { icon: "chatbubble-ellipses", color: "#26A69A" },
  conversation: { icon: "mic", color: "#EC407A" },
  topik: { icon: "ribbon", color: "#AB47BC" },
};

export const TIER_META: Record<QuestSlotId, { color: string; dark: string }> = {
  easy: { color: "#2BB673", dark: "#1E8F59" },
  normal: { color: "#4A90D9", dark: "#3A77B5" },
  hard: { color: "#E25C5C", dark: "#B94545" },
  bonus: { color: "#FFB020", dark: "#D48A00" },
};

/** 옛 서버(slots 없음)면 옛 3종을 칸 모양으로 */
export function slotsOf(quests: RetentionSummary["quests"]): QuestSlot[] {
  if (quests.slots?.length) return quests.slots;
  return quests.items.map((item) => ({
    ...item,
    category: null,
    id: item.id as unknown as QuestSlotId,
    kind: item.id,
    promo: false,
    slot: item.id as unknown as QuestSlotId,
  }));
}

/**
 * 홈 바로가기 "Vazifalar" 에 붙는 한눈 요약 — 오늘 몇 개 끝냈나, 지금 받을 게 있나
 * (끝낸 퀘스트 보상 · 상자 · 월간 보상 칸)
 */
export function questsGlance(summary: RetentionSummary | null) {
  if (!summary) return null;
  const slots = slotsOf(summary.quests);
  const base = slots.filter((q) => q.slot !== "bonus");
  const claimable =
    slots.some((q) => q.done && !q.claimed) ||
    (summary.quests.chest.ready && !summary.quests.chest.claimed) ||
    !!summary.monthly?.milestones.some((m) => m.reached && !m.claimed);
  return { done: base.filter((q) => q.done).length, total: base.length, claimable };
}

export function questIcon(q: Pick<QuestSlot, "kind" | "category">) {
  if (q.kind === "category" && q.category && CATEGORY_META[q.category]) {
    return CATEGORY_META[q.category]!;
  }
  return QUEST_KIND_META[q.kind] ?? QUEST_KIND_META.xp;
}

/** 우즈벡어 원문 — 번역기가 같은 키의 en/ru/ko 로 바꾼다 */
export function questTitle(q: Pick<QuestSlot, "kind" | "category" | "target">): string {
  if (q.kind === "category") return rt(`quests.catQuest.${q.category ?? "vocab"}`, { n: q.target });
  return rt(`quests.kind.${q.kind}`, { n: q.target });
}

export function questTitleKey(q: Pick<QuestSlot, "kind" | "category">): string {
  return q.kind === "category"
    ? `retention.quests.catQuest.${q.category ?? "vocab"}`
    : `retention.quests.kind.${q.kind}`;
}

export type QuestAction = "share" | "invite" | "find" | "review";

export function questAction(kind: QuestKind): QuestAction | null {
  switch (kind) {
    case "shareProgress":
      return "share";
    case "shareInvite":
      return "invite";
    case "follow":
      return "find";
    case "mistakes":
      return "review";
    default:
      return null;
  }
}

/** 월간 챌린지 배지 — 달마다 모양이 다르다 */
export const MONTH_BADGES: Record<number, { icon: IoniconName; color: string; dark: string }> = {
  1: { icon: "snow", color: "#45B7D1", dark: "#2C8FA8" },
  2: { icon: "heart", color: "#E25C5C", dark: "#B94545" },
  3: { icon: "flower", color: "#EC407A", dark: "#C2185B" },
  4: { icon: "leaf", color: "#2BB673", dark: "#1E8F59" },
  5: { icon: "sunny", color: "#FFB020", dark: "#D48A00" },
  6: { icon: "rainy", color: "#4A90D9", dark: "#3A77B5" },
  7: { icon: "boat", color: "#26A69A", dark: "#1B7C72" },
  8: { icon: "flame", color: "#FF7043", dark: "#D84315" },
  9: { icon: "school", color: "#776ee2", dark: "#5B52C4" },
  10: { icon: "moon", color: "#AB47BC", dark: "#7B1FA2" },
  11: { icon: "cafe", color: "#8D6E63", dark: "#5D4037" },
  12: { icon: "gift", color: "#E53935", dark: "#B71C1C" },
};

export function monthOf(key: string): number {
  const m = Number(key.slice(5, 7));
  return m >= 1 && m <= 12 ? m : 1;
}

export function monthName(key: string): string {
  return rt(`monthly.months.${monthOf(key)}`);
}
