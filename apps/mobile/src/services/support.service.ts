import api from "./api";

export type SupportCategory = "general" | "learning" | "billing" | "bug" | "other";
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

export const SupportService = {
  list: () => api.get<{ items: SupportTicket[] }>("/support/tickets"),
  create: (input: { category: SupportCategory; subject: string; message: string }) =>
    api.post<SupportTicket>("/support/tickets", input),
};
