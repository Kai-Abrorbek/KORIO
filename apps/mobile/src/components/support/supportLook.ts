import type { Ionicons } from "@expo/vector-icons";
import type { SupportCategory } from "@/services/support.service";

/** 문의하기 — api dto 와 같은 한도 (텔레그램 model/support.ts 와 같다) */
export const SUPPORT_LIMITS = {
  subjectMin: 4,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 4000,
  /** 하루에 보낼 수 있는 문의 (api MAX_DAILY_TICKETS) */
  perDay: 5,
} as const;

export const SUPPORT_CATEGORY_LOOK: Record<
  SupportCategory,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  general: { icon: "chatbubbles", color: "#776ee2" },
  learning: { icon: "school", color: "#1DBB7F" },
  billing: { icon: "card", color: "#E2A83A" },
  bug: { icon: "bug", color: "#FF4B4B" },
  other: { icon: "ellipsis-horizontal", color: "#8C8CA1" },
};
