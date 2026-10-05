"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/features/auth/session";
import { useConsole } from "@/widgets/console-context";
import { BarChart } from "@/shared/ui/charts";
import { mockSubscriptionRepository, type AdminSubscription, type SubscriptionEvent, type SubscriptionPage, type SubscriptionQuery, type SubscriptionStatus, type SubscriptionTier } from "./repository";
import styles from "./subscriptions.module.css";

const number = (value: number) => new Intl.NumberFormat("ko-KR").format(value);
const date = (value: string | null) => value ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(value)) : "—";
const labels: Record<SubscriptionStatus, string> = { active: "활성", cancelled: "해지 예정", grace_period: "결제 유예", on_hold: "보류", expired: "만료" };
const statusTone = (status: SubscriptionStatus) => status === "active" ? "good" : status === "cancelled" || status === "grace_period" ? "warn" : "bad";

function aggregate(events: SubscriptionEvent[], from: string, to: string) {
  const fromTime = new Date(`${from}T00:00:00.000Z`).getTime();
  const toTime = new Date(`${to}T00:00:00.000Z`).getTime();
  const spanDays = Math.max(1, Math.round((toTime - fromTime) / 86_400_000) + 1);
  const buckets = Math.min(10, spanDays);
  const steps = Array.from({ length: buckets }, (_, index) => {
    const fromDay = Math.floor(index * spanDays / buckets);
    const nextDay = Math.floor((index + 1) * spanDays / buckets);
    const minTime = fromTime + fromDay * 86_400_000;
    const maxTime = fromTime + nextDay * 86_400_000;
    const rows = events.filter(event => { const time = new Date(`${event.date}T00:00:00.000Z`).getTime(); return time >= minTime && time < maxTime; });
    return { label: new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(new Date(minTime)), newCount: rows.filter(row => row.type === "new").length, churnCount: rows.filter(row => row.type === "churn").length };
  });
  return { labels: steps.map(step => step.label), newValues: steps.map(step => step.newCount), churnValues: steps.map(step => step.churnCount) };
}

export function SubscriptionsPage() {
  const params = useSearchParams();
  const { can } = useSession();
  const { range } = useConsole();
  const customersMode = params.get("tab") === "customers";
  const [query, setQuery] = useState<SubscriptionQuery>({ status: "all", tier: "all", provider: "all", page: 1, pageSize: 12 });
  const [page, setPage] = useState<SubscriptionPage | null>(null);
  const [all, setAll] = useState<AdminSubscription[]>([]);
  const [events, setEvents] = useState<SubscriptionEvent[]>([]);
  const [selected, setSelected] = useState<AdminSubscription | null>(null);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<SubscriptionStatus>("active");
  const [nextTier, setNextTier] = useState<SubscriptionTier>("super");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    const [list, whole] = await Promise.all([mockSubscriptionRepository.list(query), mockSubscriptionRepository.list({ pageSize: 1000 })]);
    setPage(list);
    setAll(whole.items);
  }, [query]);
  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => { void mockSubscriptionRepository.events(range.from, range.to).then(setEvents); }, [range.from, range.to]);

  const updateQuery = (patch: Partial<SubscriptionQuery>) => setQuery(current => ({ ...current, ...patch, page: 1 }));
  const open = async (id: string) => setSelected(await mockSubscriptionRepository.get(id));
  const startOverride = () => {
    if (!selected) return;
    setNextStatus(selected.status);
    setNextTier(selected.tier);
    setReason("");
    setError("");
    setOverrideOpen(true);
  };
  const saveOverride = async () => {
    if (!selected || !reason.trim() || !can("subscription:override")) return;
    setBusy(true);
    setError("");
    try {
      const updated = await mockSubscriptionRepository.override({ subscriptionId: selected.id, status: nextStatus, tier: nextTier, reason });
      setSelected(updated);
      await refresh();
      setEvents(await mockSubscriptionRepository.events(range.from, range.to));
      setNotice(`${updated.nickname}님의 구독 상태가 mock 데이터에 반영됐습니다.`);
      setOverrideOpen(false);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "변경에 실패했습니다."); }
    finally { setBusy(false); }
  };

  const totals = useMemo(() => ({
    active: all.filter(item => ["active", "cancelled", "grace_period"].includes(item.status)).length,
    atRisk: all.filter(item => ["grace_period", "on_hold"].includes(item.status)).length,
    cancelled: all.filter(item => item.status === "cancelled").length,
    trials: all.filter(item => item.trialStartedAt !== null).length,
  }), [all]);
  const chart = useMemo(() => aggregate(events, range.from, range.to), [events, range.from, range.to]);
  const totalPages = page ? Math.max(1, Math.ceil(page.total / page.pageSize)) : 1;

  if (!can("subscription:read")) return <div className="admin-empty">구독 조회 권한이 없습니다.</div>;

  return <div className="admin-page">
    <div className="admin-page-head"><div><h2>{customersMode ? "구독자 관리" : "구독 현황"}</h2><p>구독 상태의 단일 기준은 Subscription · 현재 화면은 mock 데이터</p></div><span className="admin-pill blue">MOCK DATA</span></div>
    <div className="admin-tabs"><Link href="/subscriptions" className={!customersMode ? "is-active" : ""}>구독 현황</Link><Link href="/subscriptions?tab=customers" className={customersMode ? "is-active" : ""}>구독자 관리</Link></div>
    {notice && <div className={styles.notice} role="status">{notice}<button type="button" aria-label="알림 닫기" onClick={() => setNotice("")}>×</button></div>}
    {!customersMode && <>
      <div className="admin-grid four">
        <Kpi label="프리미엄 이용 중" value={totals.active} note="활성 · 해지 예정 · 결제 유예"/>
        <Kpi label="결제 위험" value={totals.atRisk} note="결제 유예 · 보류"/>
        <Kpi label="해지 예정" value={totals.cancelled} note="남은 기간 동안 이용 가능"/>
        <Kpi label="체험 시작 이력" value={totals.trials} note="중복 체험을 제외한 기록"/>
      </div>
      <div className="admin-grid">
        <section className="admin-card"><div className="admin-card-head"><div><h3>구독 신규 / 이탈</h3><p className={styles.subline}>{range.from} — {range.to} · 이탈은 만료·보류 전환</p></div></div><div className="admin-card-body"><div className={styles.legend}><span><i className={styles.newDot}/>신규</span><span><i className={styles.churnDot}/>이탈</span></div><BarChart labels={chart.labels} series={[{ key: "new", label: "신규", color: "var(--series-2)", values: chart.newValues }, { key: "churn", label: "이탈", color: "var(--series-3)", values: chart.churnValues }]} height={255}/></div></section>
        <section className="admin-card"><div className="admin-card-head"><h3>상태별 구독</h3></div><div className="admin-card-body">{(["active", "cancelled", "grace_period", "on_hold", "expired"] as SubscriptionStatus[]).map(status => { const count = all.filter(item => item.status === status).length; return <div className="admin-hbar" key={status}><span className="admin-hbar-label">{labels[status]}</span><span className="admin-hbar-track"><span style={{ width: `${all.length ? count / all.length * 100 : 0}%` }}/></span><span className="admin-hbar-value">{number(count)}</span></div>; })}<p className={styles.chartNote}>갱신으로 이전 결제가 만료된 건은 이탈로 해석하지 않습니다.</p></div></section>
      </div>
      <section className={`admin-card ${styles.unavailable}`}><span className={styles.unavailableIcon}>!</span><div><h3>MRR · 매출 지표를 계산할 수 없습니다</h3><p>현재 Subscription.priceMicros 값이 채워지지 않습니다. 가격·통화가 API에 기록되기 전까지 매출을 추정해 표시하지 않습니다.</p></div></section>
    </>}
    <div className="admin-toolbar"><input aria-label="구독자 검색" placeholder="이름, 이메일, 구독 ID 검색" value={query.search ?? ""} onChange={event => updateQuery({ search: event.target.value })}/><select aria-label="구독 상태" value={query.status} onChange={event => updateQuery({ status: event.target.value as SubscriptionQuery["status"] })}><option value="all">모든 상태</option>{(Object.keys(labels) as SubscriptionStatus[]).map(status => <option key={status} value={status}>{labels[status]}</option>)}</select><select aria-label="구독 등급" value={query.tier} onChange={event => updateQuery({ tier: event.target.value as SubscriptionQuery["tier"] })}><option value="all">모든 등급</option><option value="super">Super</option><option value="max">Max</option></select><select aria-label="결제사" value={query.provider} onChange={event => updateQuery({ provider: event.target.value as SubscriptionQuery["provider"] })}><option value="all">모든 결제사</option><option value="google_play">Google Play</option><option value="toss">Toss</option><option value="uzum">Uzum</option><option value="click">Click</option><option value="payme">Payme</option><option value="gems">보석</option></select></div>
    <section className="admin-card"><div className="admin-card-head"><h3>구독자</h3><span className="admin-pill blue">{page ? `${number(page.total)}건` : "불러오는 중"}</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>사용자</th><th>등급 / 요금제</th><th>결제사</th><th>시작일</th><th>만료일</th><th>자동 갱신</th><th>상태</th><th className="right">상세</th></tr></thead><tbody>{page?.items.map(item => <tr key={item.id}><td><strong>{item.nickname}</strong><div className={styles.secondary}>{item.email}</div></td><td><strong>{item.tier.toUpperCase()}</strong><div className={styles.secondary}>{item.plan}</div></td><td>{item.provider}</td><td>{date(item.startedAt)}</td><td>{date(item.expiresAt)}</td><td>{item.autoRenew ? "켜짐" : "꺼짐"}</td><td><span className={`admin-pill ${statusTone(item.status)}`}>{labels[item.status]}</span></td><td className="right"><button type="button" className="linklike" onClick={() => void open(item.id)}>보기 →</button></td></tr>)}</tbody></table>{page && !page.items.length && <div className="admin-empty">조건에 맞는 구독이 없습니다.</div>}</div><div className="admin-pagination"><span>{page ? `${number(page.total)}건 중 ${number(page.items.length)}건 표시` : "불러오는 중"}</span><div><button type="button" disabled={(query.page ?? 1) <= 1} onClick={() => setQuery(current => ({ ...current, page: (current.page ?? 1) - 1 }))}>이전</button><span className={styles.pageNumber}>{page?.page ?? 1} / {totalPages}</span><button type="button" disabled={(query.page ?? 1) >= totalPages} onClick={() => setQuery(current => ({ ...current, page: (current.page ?? 1) + 1 }))}>다음</button></div></div></section>
    {selected && <div className="admin-drawer-backdrop" onMouseDown={() => setSelected(null)}><aside className="admin-drawer" role="dialog" aria-modal="true" aria-label={`${selected.nickname} 구독 상세`} onMouseDown={event => event.stopPropagation()}><div className={styles.drawerHeader}><div><span className={styles.eyebrow}>SUBSCRIPTION · {selected.id}</span><h3>{selected.nickname}</h3><span className={styles.secondary}>{selected.email}</span></div><button type="button" className={styles.close} aria-label="상세 닫기" onClick={() => setSelected(null)}>×</button></div><span className={`admin-pill ${statusTone(selected.status)}`}>{labels[selected.status]}</span><div className={styles.detailBody}><div className="admin-detail-grid">{[["등급", selected.tier.toUpperCase()], ["요금제", selected.plan], ["결제사", selected.provider], ["플랫폼", selected.platform], ["국가", selected.country], ["상품 ID", selected.productId], ["시작일", date(selected.startedAt)], ["만료일", date(selected.expiresAt)], ["자동 갱신", selected.autoRenew ? "켜짐" : "꺼짐"], ["마지막 검증", date(selected.lastVerifiedAt)], ["체험 시작", date(selected.trialStartedAt)], ["결제 금액", "값 없음"]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div></div>{can("subscription:override") && <div className={styles.actions}><h4>구독 수동 변경</h4><p>운영 권한과 감사 기록이 필요한 작업입니다. 현재는 mock 상태에만 반영됩니다.</p><button type="button" className="btn btn-ghost" onClick={startOverride}>상태 변경…</button></div>}</aside></div>}
    {overrideOpen && selected && <div className="admin-modal-backdrop"><div className="admin-modal" role="alertdialog" aria-modal="true" aria-labelledby="override-title"><h3 id="override-title">구독 상태를 변경할까요?</h3><p>{selected.nickname} ({selected.email}) · 현재 mock 화면에만 적용됩니다.</p><label className="admin-field">등급<select value={nextTier} onChange={event => setNextTier(event.target.value as SubscriptionTier)}><option value="super">Super</option><option value="max">Max</option></select></label><label className="admin-field">상태<select value={nextStatus} onChange={event => setNextStatus(event.target.value as SubscriptionStatus)}>{(Object.keys(labels) as SubscriptionStatus[]).map(status => <option value={status} key={status}>{labels[status]}</option>)}</select></label><label className="admin-field">변경 사유<textarea autoFocus value={reason} onChange={event => setReason(event.target.value)} placeholder="운영 사유를 입력하세요"/></label>{error && <p className={styles.error} role="alert">{error}</p>}<div className="admin-modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setOverrideOpen(false)}>취소</button><button type="button" className="btn btn-primary" disabled={!reason.trim() || busy || (nextStatus === selected.status && nextTier === selected.tier)} onClick={() => void saveOverride()}>{busy ? "반영 중…" : "확인 후 적용"}</button></div></div></div>}
  </div>;
}

function Kpi({ label, value, note }: { label: string; value: number; note: string }) { return <div className="admin-card admin-kpi"><div className="admin-kpi-label">{label}</div><div className="admin-kpi-value">{number(value)}</div><div className="admin-kpi-note">{note}</div></div>; }
