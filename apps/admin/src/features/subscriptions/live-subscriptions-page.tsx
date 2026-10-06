"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { BarChart } from "@/shared/ui/charts";
import { ErrorState } from "@/shared/ui/primitives";
import { useConsole } from "@/widgets/console-context";
import { useSession } from "@/features/auth/session";
import type { SubscriptionsResponse } from "@/features/dashboard/types";

interface LiveSubscription {
  id: string; userId: string; email: string; nickname: string; provider: string; platform: string;
  country: string; tier: string; plan: string; productId: string; status: string;
  startedAt: string | null; expiresAt: string | null; autoRenew: boolean;
  lastVerifiedAt: string | null; revokedAt: string | null;
  priceMicros: number | null; currency: string; trialStartedAt: string | null; entitledNow: boolean;
}
interface SubscriptionPageResponse { items: LiveSubscription[]; total: number; page: number; pageSize: number }
const date = (value: string | null) => value ? new Date(value).toLocaleDateString("ko-KR") : "—";
const statusLabel: Record<string, string> = { active: "활성", cancelled: "해지 예정", grace_period: "결제 유예", on_hold: "보류", expired: "만료" };

export function LiveSubscriptionsPage() {
  const params = useSearchParams();
  const customersMode = params.get("tab") === "customers";
  const { can } = useSession();
  const { range } = useConsole();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tier, setTier] = useState("");
  const [provider, setProvider] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const list = useQuery<SubscriptionPageResponse>(`/admin/subscriptions${qs({ search, status, tier, provider, page, pageSize: 20 })}`);
  const selected = useQuery<LiveSubscription>(selectedId ? `/admin/subscriptions/${selectedId}` : null);
  const summary = useQuery<SubscriptionsResponse>(`/admin/analytics/subscriptions${qs({ from: range.from, to: range.to })}`);
  if (!can("subscription:read")) return <div className="admin-card admin-empty">구독 조회 권한이 없습니다.</div>;

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>{customersMode ? "구독자 관리" : "구독 현황"}</h2><p>Subscription 컬렉션과 상태 변경 이벤트의 실제 데이터입니다. 금액은 결제 원장이 준비되기 전까지 집계하지 않습니다.</p></div><span className="admin-pill blue">실데이터</span></div>
    <div className="admin-tabs"><Link href="/subscriptions" className={!customersMode ? "is-active" : ""}>구독 현황</Link><Link href="/subscriptions?tab=customers" className={customersMode ? "is-active" : ""}>구독자 관리</Link></div>
    {!customersMode && <>{summary.error ? <section className="admin-card"><ErrorState code={summary.error} onRetry={summary.reload}/></section> : summary.loading || !summary.data ? <div className="admin-card skeleton" style={{ height: 145 }}/> : <><div className="admin-grid four"><div className="admin-card admin-kpi"><div className="admin-kpi-label">Premium 이용 중</div><div className="admin-kpi-value">{summary.data.active.toLocaleString("ko-KR")}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">Free 사용자</div><div className="admin-kpi-value">{summary.data.free.toLocaleString("ko-KR")}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">체험 시작 이력</div><div className="admin-kpi-value">{summary.data.trials.toLocaleString("ko-KR")}</div></div><div className="admin-card admin-kpi"><div className="admin-kpi-label">Premium 비율</div><div className="admin-kpi-value">{summary.data.premiumRate}%</div></div></div><section className="admin-card"><div className="admin-card-head"><h3>신규 / 이탈 · {range.label}</h3></div><div className="admin-card-body"><BarChart labels={summary.data.newSeries.map(item => item.date)} series={[{ key: "new", label: "신규", color: "var(--series-2)", values: summary.data.newSeries.map(item => item.value) }, { key: "churn", label: "이탈", color: "var(--series-3)", values: summary.data.churnSeries.map(item => item.value) }]} height={245}/><p className="bm-data-note">{summary.data.eventsSince ? `이벤트 계측 시작: ${date(summary.data.eventsSince)}` : "구독 상태 변경 이벤트가 아직 없습니다."} 갱신은 이탈로 세지 않습니다.</p></div></section></>}</>}
    <div className="admin-toolbar"><input aria-label="구독 검색" placeholder="사용자·상품 검색" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }}/><select aria-label="상태" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="">모든 상태</option>{Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select aria-label="등급" value={tier} onChange={event => { setTier(event.target.value); setPage(1); }}><option value="">모든 등급</option><option value="super">Super</option><option value="max">Max</option></select><select aria-label="결제 수단" value={provider} onChange={event => { setProvider(event.target.value); setPage(1); }}><option value="">모든 결제 수단</option>{["google_play", "toss", "uzum", "click", "payme", "gems"].map(item => <option key={item} value={item}>{item}</option>)}</select><button type="button" onClick={list.reload}>새로고침</button></div>
    <section className="admin-card">{list.error ? <ErrorState code={list.error} onRetry={list.reload}/> : list.loading || !list.data ? <div className="skeleton" style={{ height: 360 }}/> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>사용자</th><th>등급 · 기간</th><th>결제 수단</th><th>상태</th><th>시작</th><th>만료</th><th>현재 이용</th></tr></thead><tbody>{list.data.items.map(item => <tr key={item.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(item.id)}><td><strong>{item.nickname || item.email || item.userId}</strong><br/><small>{item.email}</small></td><td>{item.tier} · {item.plan}</td><td>{item.provider}</td><td><span className={`admin-pill ${item.status === "active" ? "good" : item.status === "expired" ? "bad" : "warn"}`}>{statusLabel[item.status] ?? item.status}</span></td><td>{date(item.startedAt)}</td><td>{date(item.expiresAt)}</td><td>{item.entitledNow ? "이용 중" : "이용 불가"}</td></tr>)}</tbody></table>{!list.data.items.length && <div className="admin-empty">일치하는 구독이 없습니다.</div>}</div><div className="admin-toolbar"><span>{list.data.total.toLocaleString("ko-KR")}건 · {page}페이지</span><button type="button" disabled={page <= 1} onClick={() => setPage(value => value - 1)}>이전</button><button type="button" disabled={page * list.data.pageSize >= list.data.total} onClick={() => setPage(value => value + 1)}>다음</button></div></>}</section>
    <p className="page-sub">구독 상태·등급을 강제로 바꾸는 작업은 결제사 검증과 사용자 권한 투영을 함께 처리해야 합니다. 안전한 서버 조치 경로가 준비되기 전까지 여기서는 읽기만 제공합니다.</p>
    {selectedId && <div className="admin-drawer-backdrop" onMouseDown={() => setSelectedId(null)}><aside className="admin-drawer" onMouseDown={event => event.stopPropagation()}><button className="btn btn-ghost" onClick={() => setSelectedId(null)}>← 닫기</button>{selected.error ? <ErrorState code={selected.error} onRetry={selected.reload}/> : selected.loading || !selected.data ? <div className="skeleton" style={{ height: 300, marginTop: 20 }}/> : <><h3 style={{ marginTop: 18 }}>{selected.data.nickname || selected.data.email || selected.data.id}</h3><p className="page-sub">{selected.data.productId}</p><div className="admin-detail-grid" style={{ marginTop: 20 }}>{[["상태", statusLabel[selected.data.status] ?? selected.data.status], ["등급", selected.data.tier], ["기간", selected.data.plan], ["결제 수단", selected.data.provider], ["시작", date(selected.data.startedAt)], ["만료", date(selected.data.expiresAt)], ["자동 갱신", selected.data.autoRenew ? "예" : "아니요"], ["최종 검증", date(selected.data.lastVerifiedAt)], ["환불 회수", date(selected.data.revokedAt)], ["체험 시작", date(selected.data.trialStartedAt)]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><p className="page-sub">{selected.data.priceMicros === null ? "결제 금액 미수집 · 매출 계산 불가" : `저장 금액: ${selected.data.priceMicros / 1_000_000} ${selected.data.currency || "통화 미상"}`}</p></>}</aside></div>}
  </div>;
}
