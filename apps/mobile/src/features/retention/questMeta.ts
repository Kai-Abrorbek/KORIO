import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";
import type { TFunction } from "i18next";
import type {
  QuestKind,
  QuestSlot,
  QuestSlotId,
} from "@/services/retention.service";

type IconName = ComponentProps<typeof Ionicons>["name"];

/** 퀘스트 종류별 아이콘·색 */
export const QUEST_KIND_META: Record<
  QuestKind,
  { icon: IconName; color: string }
> = {
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

/** 분야 퀘스트는 분야 아이콘으로 */
export const CATEGORY_META: Record<string, { icon: IconName; color: string }> =
  {
    vocab: { icon: "text", color: "#776ee2" },
    grammar: { icon: "construct", color: "#5C6BC0" },
    listening: { icon: "headset", color: "#42A5F5" },
    expression: { icon: "chatbubble-ellipses", color: "#26A69A" },
    conversation: { icon: "mic", color: "#EC407A" },
    topik: { icon: "ribbon", color: "#AB47BC" },
  };

/** 난이도 칸 색 */
export const TIER_META: Record<QuestSlotId, { color: string; dark: string }> = {
  easy: { color: "#2BB673", dark: "#1E8F59" },
  normal: { color: "#4A90D9", dark: "#3A77B5" },
  hard: { color: "#E25C5C", dark: "#B94545" },
  bonus: { color: "#FFB020", dark: "#D48A00" },
};

export function questIcon(q: Pick<QuestSlot, "kind" | "category">) {
  if (q.kind === "category" && q.category && CATEGORY_META[q.category]) {
    return CATEGORY_META[q.category];
  }
  return QUEST_KIND_META[q.kind] ?? QUEST_KIND_META.xp;
}

export function questTitle(
  t: TFunction,
  q: Pick<QuestSlot, "kind" | "category" | "target">,
) {
  if (q.kind === "category") {
    return t(`retention.quests.catQuest.${q.category ?? "vocab"}`, {
      n: q.target,
    });
  }
  return t(`retention.quests.kind.${q.kind}`, { n: q.target });
}

/** 진행 막대 대신 바로가기 버튼이 붙는 퀘스트 */
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

/** 월간 챌린지 배지 — 달마다 모양이 다르다 (1월 ~ 12월) */
export const MONTH_BADGES: Record<
  number,
  { icon: IconName; color: string; dark: string }
> = {
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

/** "2026-10" → 10 */
export function monthOf(key: string): number {
  const m = Number(key.slice(5, 7));
  return m >= 1 && m <= 12 ? m : 1;
}

/** "2026-10" → "10월" / "Oktabr" … */
export function monthName(t: TFunction, key: string): string {
  return t(`retention.monthly.months.${monthOf(key)}`);
}
