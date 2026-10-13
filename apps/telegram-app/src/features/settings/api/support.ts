import type { SupportCategory, SupportTicket, SupportTicketList } from "../model/support";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/** 내 문의 (최근 30건) + 답장이 오는 곳 */
export function getSupportTickets(request: AuthenticatedRequest) {
  return request<SupportTicketList>("/support/tickets");
}

export function createSupportTicket(
  request: AuthenticatedRequest,
  input: { category: SupportCategory; subject: string; message: string },
) {
  return request<SupportTicket>("/support/tickets", { body: JSON.stringify(input), method: "POST" });
}
