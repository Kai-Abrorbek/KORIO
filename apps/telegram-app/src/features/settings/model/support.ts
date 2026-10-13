import type { IoniconName } from "../../../shared/ui/mobile-icon";

/** 문의하기 — api support 모듈과 같은 모양. 모바일 services/support.service.ts 와 같다 */
export type SupportCategory = "general" | "learning" | "billing" | "bug" | "other";
export type SupportStatus = "open" | "sending" | "answered";
/** 답장이 오는 곳 — 텔레그램 유저는 봇 메시지 */
export type SupportReplyChannel = "email" | "telegram" | "app";

export interface SupportTicket {
  id: string;
  category: SupportCategory;
  subject: string;
  message: string;
  status: SupportStatus;
  reply: string | null;
  repliedAt: string | null;
  createdAt: string | null;
}

export interface SupportTicketList {
  items: SupportTicket[];
  /** 서버가 아직 안 올라갔으면 없다 */
  replyTo?: { channel: SupportReplyChannel; email: string | null };
}

export const SUPPORT_CATEGORIES: SupportCategory[] = ["general", "learning", "billing", "bug", "other"];

/** api dto 와 같은 한도 */
export const SUPPORT_LIMITS = {
  subjectMin: 4,
  subjectMax: 120,
  messageMin: 10,
  messageMax: 4000,
  /** 하루에 보낼 수 있는 문의 (api MAX_DAILY_TICKETS) */
  perDay: 5,
} as const;

export const SUPPORT_CATEGORY_LOOK: Record<SupportCategory, { icon: IoniconName; color: string }> = {
  general: { icon: "chatbubbles", color: "#776ee2" },
  learning: { icon: "school", color: "#1DBB7F" },
  billing: { icon: "card", color: "#E2A83A" },
  bug: { icon: "bug", color: "#FF4B4B" },
  other: { icon: "ellipsis-horizontal", color: "#8C8CA1" },
};

export const SUPPORT_STATUS_LOOK: Record<SupportStatus, { icon: IoniconName; color: string }> = {
  open: { icon: "time", color: "#E2A83A" },
  sending: { icon: "paper-plane", color: "#1899D6" },
  answered: { icon: "checkmark-circle", color: "#1DBB7F" },
};

export const SUPPORT_REPLY_LOOK: Record<SupportReplyChannel, IoniconName> = {
  email: "mail",
  telegram: "paper-plane",
  app: "chatbubble-ellipses",
};

/** 2026.10.14 — 문의 카드 날짜 */
export function supportDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}
