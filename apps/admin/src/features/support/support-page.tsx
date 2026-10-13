"use client";

import { useState } from "react";
import { api, qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { useSession } from "@/features/auth/session";
import { ErrorState } from "@/shared/ui/primitives";

type Status = "open" | "sending" | "answered";
type TicketSummary = { id: string; userId: string; email: string; category: string; subject: string; status: Status; createdAt: string | null; updatedAt: string | null; repliedAt: string | null };
type Channel = "email" | "telegram" | "app";
type Ticket = TicketSummary & { message: string; reply: string | null; replyAdminEmail: string | null; replyAttemptedAt: string | null; replyChannel?: Channel; repliedVia?: Channel | null; replyDelivered?: boolean | null };
type TicketPage = { items: TicketSummary[]; total: number; page: number; pageSize: number };
const statusLabel: Record<Status, string> = { open: "답변 대기", sending: "메일 발송 중 · 확인 필요", answered: "답변 완료" };
/** 답장이 가는 곳 — 텔레그램 미니앱 유저는 이메일이 없어 봇 메시지로 간다 */
const channelLabel: Record<Channel, string> = { email: "이메일", telegram: "텔레그램 봇 메시지", app: "앱 '내 문의' + 푸시만" };
const channelTarget = (ticket: Ticket) => ticket.replyChannel === "telegram" ? "텔레그램 봇 메시지" : ticket.replyChannel === "app" ? "앱 '내 문의' 화면(이메일·텔레그램 없음)" : (ticket.email || "사용자 계정 이메일");
const categoryLabel: Record<string, string> = { general: "일반", learning: "학습", billing: "결제", bug: "오류", other: "기타" };
const when = (value: string | null) => value ? new Date(value).toLocaleString("ko-KR") : "—";

export function SupportPage() {
  const { can } = useSession();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const tickets = useQuery<TicketPage>(`/admin/support/tickets${qs({ status, page, pageSize: 20 })}`);
  const selected = useQuery<Ticket>(selectedId ? `/admin/support/tickets/${selectedId}` : null);

  async function sendReply() {
    if (!selectedId || sending || reply.trim().length < 2 || selected.data?.status !== "open") return;
    if (!window.confirm(`답변을 ${channelTarget(selected.data)}로 보낼까요?`)) return;
    setSending(true); setNotice("");
    try {
      const done = await api.post<Ticket>(`/admin/support/tickets/${selectedId}/reply`, { message: reply.trim() });
      setNotice(done.repliedVia === "telegram" && done.replyDelivered === false
        ? "텔레그램 봇 전송은 실패했어요(유저가 봇을 막았을 수 있음). 답변은 앱 '내 문의'에 저장됐어요."
        : `답변을 ${channelLabel[done.repliedVia ?? "email"]}(으)로 보냈고, 답변 완료로 기록됐어요.`);
      setReply(""); selected.reload(); tickets.reload();
    } catch (error) { setNotice(`발송 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}. 답변 상태를 확인해 주세요.`); selected.reload(); tickets.reload(); }
    finally { setSending(false); }
  }

  if (!can("users:write")) return <div className="admin-card admin-empty">문의 처리 권한이 없습니다.</div>;
  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>사용자 문의함</h2><p>앱·텔레그램에서 접수한 문의에 답변합니다. 이메일이 있으면 메일로, 텔레그램 유저는 봇 메시지로 가고, 앱 '내 문의'에도 항상 남습니다.</p></div><span className="admin-pill blue">{tickets.data ? `${tickets.data.total}건` : "실데이터"}</span></div>
    <div className="admin-toolbar"><select aria-label="문의 상태" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="">전체</option><option value="open">답변 대기</option><option value="sending">발송 중 · 확인 필요</option><option value="answered">답변 완료</option></select><button type="button" onClick={tickets.reload}>새로고침</button></div>
    <section className="admin-card">{tickets.error ? <ErrorState code={tickets.error} onRetry={tickets.reload}/> : tickets.loading || !tickets.data ? <div className="skeleton" style={{ height: 300 }}/> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>제목</th><th>분류</th><th>이메일</th><th>접수</th><th>상태</th></tr></thead><tbody>{tickets.data.items.map(item => <tr key={item.id} onClick={() => { setSelectedId(item.id); setReply(""); setNotice(""); }} style={{ cursor: "pointer" }}><td><strong>{item.subject}</strong><br/><small>{item.userId}</small></td><td>{categoryLabel[item.category] ?? item.category}</td><td>{item.email || "—"}</td><td>{when(item.createdAt)}</td><td><span className={`admin-pill ${item.status === "answered" ? "good" : item.status === "sending" ? "warn" : "blue"}`}>{statusLabel[item.status]}</span></td></tr>)}</tbody></table>{!tickets.data.items.length && <div className="admin-empty">일치하는 문의가 없습니다.</div>}</div><div className="admin-toolbar"><span>{page} / {Math.max(1, Math.ceil(tickets.data.total / tickets.data.pageSize))}페이지</span><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page * tickets.data.pageSize >= tickets.data.total} onClick={() => setPage(value => value + 1)}>다음</button></div></>}</section>
    {selectedId && <div className="admin-drawer-backdrop" onMouseDown={() => setSelectedId(null)}><aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}><button type="button" className="btn btn-ghost" onClick={() => setSelectedId(null)}>← 닫기</button>{selected.error ? <ErrorState code={selected.error} onRetry={selected.reload}/> : selected.loading || !selected.data ? <div className="skeleton" style={{ height: 300, marginTop: 20 }}/> : <><h3 style={{ marginTop: 20 }}>{selected.data.subject}</h3><p className="page-sub">{categoryLabel[selected.data.category] ?? selected.data.category} · {statusLabel[selected.data.status]} · {when(selected.data.createdAt)}</p><p className="page-sub">사용자: {selected.data.userId}<br/>계정 이메일: {selected.data.email || "없음"}<br/>답변 경로: {channelLabel[selected.data.replyChannel ?? "email"]}</p><section className="admin-card" style={{ padding: 18, whiteSpace: "pre-wrap", marginTop: 20 }}>{selected.data.message}</section>{selected.data.reply && <section className="admin-card" style={{ padding: 18, whiteSpace: "pre-wrap", marginTop: 18 }}><strong>보낸 답변 · {selected.data.replyAdminEmail} · {when(selected.data.repliedAt)} · {channelLabel[selected.data.repliedVia ?? "email"]}{selected.data.replyDelivered === false ? " (전송 실패 · 앱에만 표시)" : ""}</strong><p>{selected.data.reply}</p></section>}{selected.data.status === "open" && <section style={{ marginTop: 20 }}><h4>답변 · {channelLabel[selected.data.replyChannel ?? "email"]}</h4><textarea aria-label="답변 내용" value={reply} onChange={event => setReply(event.target.value)} maxLength={4000} style={{ width: "100%", minHeight: 180 }} placeholder="사용자에게 보낼 답변을 입력하세요"/><button type="button" className="btn btn-primary" onClick={() => void sendReply()} disabled={sending || reply.trim().length < 2} style={{ marginTop: 10 }}>{sending ? "발송 중…" : "답변 보내기"}</button></section>}{selected.data.status === "sending" && <p className="admin-pill warn">발송 도중 중단된 건일 수 있습니다. 메일 제공자 기록을 확인한 뒤 조치해 주세요. 중복 발송 방지를 위해 자동 재전송하지 않습니다.</p>}</>}{notice && <p role="status" className="page-sub" style={{ marginTop: 12 }}>{notice}</p>}</aside></div>}
  </div>;
}
