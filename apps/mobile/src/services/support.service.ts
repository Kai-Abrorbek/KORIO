import api from "./api";

export type SupportCategory = "general" | "learning" | "billing" | "bug" | "other";
/** 답장이 오는 곳 — api replyChannelOf (텔레그램 유저는 봇, 이메일 없으면 앱 안) */
export type SupportReplyChannel = "email" | "telegram" | "app";
export type SupportTicket = {
  id: string;
  category: SupportCategory;
  subject: string;
  message: string;
  status: "open" | "sending" | "answered";
  reply: string | null;
  repliedAt: string | null;
  createdAt: string | null;
};

export type SupportTicketList = {
  items: SupportTicket[];
  /** 서버가 아직 안 올라갔으면 없다 */
  replyTo?: { channel: SupportReplyChannel; email: string | null };
};

export const SupportService = {
  list: () => api.get<SupportTicketList>("/support/tickets"),
  create: (input: { category: SupportCategory; subject: string; message: string }) =>
    api.post<SupportTicket>("/support/tickets", input),
};
