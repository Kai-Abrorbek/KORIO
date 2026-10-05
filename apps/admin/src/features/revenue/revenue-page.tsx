"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/features/auth/session";
import { LineChart, Legend } from "@/shared/ui/charts";
import { useConsole } from "@/widgets/console-context";
import {
  CHANNEL_LABEL, EXPENSE_CATEGORIES, EXPENSE_LABEL, compactWon, formatWon,
  mockRevenueSource, revenueBuckets, summarizeRevenue,
  type PaymentStatus, type RevenueChannel, type RevenueGrain, type RevenueReport,
  type RevenueTotals, type RevenueTransaction,
} from "./mock-source";

type Tab = "overview" | "transactions" | "expenses";
const DAY = 86_400_000;
const GRAINS: { key: RevenueGrain; label: string; detail: string }[] = [
  { key: "day", label: "일", detail: "최근 30일" },
  { key: "week", label: "주", detail: "최근 12주" },
  { key: "month", label: "월", detail: "최근 12개월" },
  { key: "year", label: "년", detail: "최근 4년" },
];
const STATUS_LABEL: Record<PaymentStatus, string> = { paid: "결제 완료", refunded: "환불", failed: "결제 실패" };
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

function periodStart(grain: RevenueGrain, date: string): string {
  const day = new Date(`${date}T00:00:00.000Z`);
  if (grain === "week") day.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  if (grain === "month") day.setUTCDate(1);
  if (grain === "year") { day.setUTCMonth(0); day.setUTCDate(1); }
  return day.toISOString().slice(0, 10);
}

function previousPeriodStart(grain: RevenueGrain, start: string): string {
  const day = new Date(`${start}T00:00:00.000Z`);
  if (grain === "day") day.setUTCDate(day.getUTCDate() - 1);
  if (grain === "week") day.setUTCDate(day.getUTCDate() - 7);
  if (grain === "month") day.setUTCMonth(day.getUTCMonth() - 1);
  if (grain === "year") day.setUTCFullYear(day.getUTCFullYear() - 1);
  return day.toISOString().slice(0, 10);
}

function periodComparison(report: RevenueReport, grain: RevenueGrain, through: string) {
  const from = periodStart(grain, through);
  const previousFrom = previousPeriodStart(grain, from);
  const elapsed = (Date.parse(`${through}T00:00:00.000Z`) - Date.parse(`${from}T00:00:00.000Z`)) / DAY;
  const previousTo = iso(Math.min(Date.parse(`${from}T00:00:00.000Z`) - DAY, Date.parse(`${previousFrom}T00:00:00.000Z`) + elapsed * DAY));
  const current = summarizeRevenue(report, from, through);
  const previous = summarizeRevenue(report, previousFrom, previousTo);
  return { current, previous, change: previous.gross ? (current.gross - previous.gross) / previous.gross * 100 : null };
}

function bucketLabel(key: string, grain: RevenueGrain) {
  if (grain === "year") return `${key.slice(0, 4)}년`;
  if (grain === "month") return `${Number(key.slice(5, 7))}월`;
  if (grain === "week") return `${Number(key.slice(5, 7))}.${Number(key.slice(8, 10))} 주`;
  return `${Number(key.slice(5, 7))}.${Number(key.slice(8, 10))}`;
}

function PeriodCard({ label, totals, change, selected, onClick }: { label: string; totals: RevenueTotals; change: number | null; selected: boolean; onClick: () => void }) {
  const spend = totals.fees + totals.operatingExpenses;
  return <button type="button" className={`rev-period-card admin-card${selected ? " is-selected" : ""}`} onClick={onClick}>
    <span className="rev-period-label">{label} 누적 매출 <span aria-hidden>↗</span></span>
    <strong>{compactWon(totals.gross)}</strong>
    <span className="rev-period-change">{change === null ? "비교 기간 없음" : <><b className={change >= 0 ? "bm-positive" : "bm-negative"}>{change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%</b> 이전 동일 경과 기간</>}</span>
    <span className="rev-period-footer"><span>지출 {compactWon(spend)}</span><span>순이익 <b className={totals.profit >= 0 ? "bm-positive" : "bm-negative"}>{compactWon(totals.profit)}</b></span></span>
  </button>;
}

function Reconciliation({ totals }: { totals: RevenueTotals }) {
  const rows = [
    { label: "총 결제 매출", value: totals.gross, kind: "gross" },
    { label: "환불", value: -totals.refunds, kind: "deduction" },
    { label: "결제 수수료", value: -totals.fees, kind: "deduction" },
    { label: "운영 지출", value: -totals.operatingExpenses, kind: "deduction" },
    { label: "순이익", value: totals.profit, kind: "final" },
  ];
  return <section className="admin-card"><div className="admin-card-head"><h3>매출에서 순이익까지</h3><span className="admin-pill blue">선택 기간</span></div><div className="rev-reconcile">{rows.map(row => <div className={`rev-reconcile-row ${row.kind}`} key={row.label}><span>{row.label}</span><strong>{row.value < 0 ? "−" : ""}{formatWon(Math.abs(row.value))}</strong></div>)}</div><p className="rev-card-note">매출 − 환불 − 수수료 − 운영 지출 = 순이익</p></section>;
}

function Health({ totals }: { totals: RevenueTotals }) {
  const attempted = totals.paidOrders + totals.refundedOrders + totals.failedOrders;
  const approved = totals.paidOrders + totals.refundedOrders;
  const refundRate = totals.gross ? totals.refunds / totals.gross * 100 : 0;
  const approvalRate = attempted ? approved / attempted * 100 : 0;
  const margin = totals.gross ? totals.profit / totals.gross * 100 : 0;
  const averageOrder = approved ? totals.gross / approved : 0;
  return <section className="admin-card"><div className="admin-card-head"><h3>매출 건전성</h3><span className="admin-pill blue">선택 기간</span></div><div className="rev-health-grid">
    <div><span>순이익률</span><strong className={margin >= 0 ? "bm-positive" : "bm-negative"}>{margin.toFixed(1)}%</strong><small>총 매출 대비</small></div>
    <div><span>환불률</span><strong>{refundRate.toFixed(1)}%</strong><small>{totals.refundedOrders.toLocaleString("ko-KR")}건 환불</small></div>
    <div><span>결제 승인율</span><strong>{approvalRate.toFixed(1)}%</strong><small>{totals.failedOrders.toLocaleString("ko-KR")}건 실패</small></div>
    <div><span>평균 주문 금액</span><strong>{compactWon(averageOrder)}</strong><small>승인된 결제 기준</small></div>
  </div></section>;
}

function ChannelMix({ transactions }: { transactions: RevenueTransaction[] }) {
  const channels = Object.entries(CHANNEL_LABEL).map(([key, label]) => ({ key: key as RevenueChannel, label, value: transactions.filter(item => item.channel === key).reduce((sum, item) => sum + item.gross, 0) })).sort((a, b) => b.value - a.value);
  const total = channels.reduce((sum, item) => sum + item.value, 0);
  return <section className="admin-card"><div className="admin-card-head"><h3>결제 채널별 매출</h3><span className="admin-pill blue">선택 기간</span></div><div className="admin-card-body rev-channel-list">{channels.map(item => <div className="rev-channel-row" key={item.key}><div><strong>{item.label}</strong><span>{formatWon(item.value)}</span></div><div className="rev-channel-bar"><span style={{ width: `${total ? item.value / total * 100 : 0}%` }}/></div><small>{total ? (item.value / total * 100).toFixed(1) : "0"}%</small></div>)}</div></section>;
}

function ExpenseMix({ totals }: { totals: RevenueTotals }) {
  const full = totals.operatingExpenses + totals.fees;
  return <section className="admin-card"><div className="admin-card-head"><h3>지출 구성</h3><span className="admin-pill blue">선택 기간</span></div><div className="admin-card-body rev-channel-list">{[...EXPENSE_CATEGORIES.map(key => ({ label: EXPENSE_LABEL[key], value: totals.costs[key] })), { label: "결제 수수료", value: totals.fees }].sort((a, b) => b.value - a.value).map(item => <div className="rev-channel-row" key={item.label}><div><strong>{item.label}</strong><span>{formatWon(item.value)}</span></div><div className="rev-channel-bar is-expense"><span style={{ width: `${full ? item.value / full * 100 : 0}%` }}/></div><small>{full ? (item.value / full * 100).toFixed(1) : "0"}%</small></div>)}</div></section>;
}

function DownloadCsv({ rows }: { rows: RevenueTransaction[] }) {
  const download = () => {
    const head = ["ID", "날짜", "사용자", "상품", "채널", "상태", "총매출(KRW)", "환불(KRW)", "수수료(KRW)", "정산액(KRW)"];
    const body = rows.map(row => [row.id, row.date, row.customer, row.product, CHANNEL_LABEL[row.channel], STATUS_LABEL[row.status], row.gross, row.refund, row.fee, row.payout]);
    const csv = "\uFEFF" + [head, ...body].map(values => values.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "korio-mock-revenue.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
  };
  return <button type="button" className="btn btn-ghost" onClick={download} disabled={!rows.length}>CSV 내려받기</button>;
}

function TransactionTable({ rows, preview = false }: { rows: RevenueTransaction[]; preview?: boolean }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PaymentStatus | "all">("all");
  const [channel, setChannel] = useState<RevenueChannel | "all">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<RevenueTransaction | null>(null);
  const filtered = useMemo(() => rows.filter(row => (status === "all" || row.status === status) && (channel === "all" || row.channel === channel) && `${row.id} ${row.customer} ${row.product}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)), [rows, query, status, channel]);
  const pageSize = preview ? 6 : 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  return <section className="admin-card"><div className="admin-card-head"><div><h3>{preview ? "최근 거래" : "거래 내역"}</h3><p className="rev-section-sub">{rows.length.toLocaleString("ko-KR")}건 · 선택 기간의 mock 결제 원장</p></div>{!preview && <DownloadCsv rows={filtered}/>}</div>
    {!preview && <div className="admin-toolbar rev-table-toolbar"><input aria-label="거래 검색" placeholder="거래 ID · 사용자 · 상품 검색" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }}/><select aria-label="거래 상태" value={status} onChange={event => { setStatus(event.target.value as PaymentStatus | "all"); setPage(1); }}><option value="all">모든 상태</option><option value="paid">결제 완료</option><option value="refunded">환불</option><option value="failed">결제 실패</option></select><select aria-label="결제 채널" value={channel} onChange={event => { setChannel(event.target.value as RevenueChannel | "all"); setPage(1); }}><option value="all">모든 채널</option>{Object.entries(CHANNEL_LABEL).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><span className="rev-filter-count">{filtered.length.toLocaleString("ko-KR")}건 표시</span></div>}
    <div className="admin-table-wrap"><table className="admin-table rev-transaction-table"><thead><tr><th>거래 ID / 날짜</th><th>사용자</th><th>상품</th><th>채널</th><th>상태</th><th>정산</th><th className="right">매출</th><th className="right">환불</th><th className="right">순정산액</th></tr></thead><tbody>{visible.map(row => <tr key={row.id} onClick={() => setSelected(row)} tabIndex={0} onKeyDown={event => { if (event.key === "Enter") setSelected(row); }}><td><strong>{row.id}</strong><small>{row.date}</small></td><td>{row.customer}</td><td>{row.product}</td><td>{CHANNEL_LABEL[row.channel]}</td><td><span className={`admin-pill ${row.status === "paid" ? "good" : row.status === "refunded" ? "warn" : "bad"}`}>{STATUS_LABEL[row.status]}</span></td><td>{row.settlement === "settled" ? "정산 완료" : row.settlement === "scheduled" ? "정산 예정" : "—"}</td><td className="right">{formatWon(row.gross)}</td><td className="right bm-negative">{row.refund ? `−${formatWon(row.refund)}` : "—"}</td><td className="right"><strong>{formatWon(row.payout)}</strong></td></tr>)}</tbody></table>{!visible.length && <div className="admin-empty">조건에 맞는 거래가 없습니다.</div>}</div>
    {!preview && <div className="admin-pagination"><span>{safePage} / {totalPages} 페이지</span><div><button type="button" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>이전</button><button type="button" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>다음</button></div></div>}
    {selected && <div className="admin-modal-backdrop" onMouseDown={() => setSelected(null)}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="거래 상세" onMouseDown={event => event.stopPropagation()}><div className="rev-modal-head"><div><h3>거래 상세</h3><p>{selected.id} · {selected.date}</p></div><span className={`admin-pill ${selected.status === "paid" ? "good" : selected.status === "refunded" ? "warn" : "bad"}`}>{STATUS_LABEL[selected.status]}</span></div><div className="admin-detail-grid">{[["사용자", selected.customer], ["상품", selected.product], ["채널", CHANNEL_LABEL[selected.channel]], ["정산 상태", selected.settlement === "settled" ? "정산 완료" : selected.settlement === "scheduled" ? "정산 예정" : "해당 없음"], ["총매출", formatWon(selected.gross)], ["환불", formatWon(selected.refund)], ["수수료", formatWon(selected.fee)], ["순정산액", formatWon(selected.payout)]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><p className="rev-card-note">이 기록은 mock이며 실제 결제 거래와 연결되지 않습니다.</p><div className="admin-modal-actions"><button type="button" className="btn btn-primary" onClick={() => setSelected(null)}>닫기</button></div></section></div>}
  </section>;
}

export function RevenuePage() {
  const { can } = useSession();
  const { range } = useConsole();
  const [report, setReport] = useState<RevenueReport | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [grain, setGrain] = useState<RevenueGrain>("month");
  const [cumulative, setCumulative] = useState(false);
  useEffect(() => { const selected = new URLSearchParams(window.location.search).get("tab"); if (selected === "transactions" || selected === "expenses") setTab(selected); }, []);
  useEffect(() => { let alive = true; mockRevenueSource.load(range.to).then(value => { if (alive) { setReport(value); setError(""); } }).catch(() => { if (alive) setError("매출 데이터를 불러오지 못했습니다."); }); return () => { alive = false; }; }, [range.to]);
  const summary = report ? summarizeRevenue(report, range.from, range.to) : null;
  const lifetime = report ? summarizeRevenue(report, report.days[0]?.date ?? range.to, range.to) : null;
  const periods = report ? GRAINS.map(item => ({ ...item, ...periodComparison(report, item.key, range.to) })) : [];
  const buckets = report ? revenueBuckets(report, grain) : [];
  const seriesValues = (field: "gross" | "spend" | "profit") => {
    let running = 0;
    return buckets.map(bucket => { const value = field === "spend" ? bucket.fees + bucket.operatingExpenses : bucket[field]; running += value; return cumulative ? running : value; });
  };
  const transactions = report?.transactions.filter(item => item.date >= range.from && item.date <= range.to) ?? [];
  const setActiveTab = (next: Tab) => { setTab(next); window.history.replaceState(null, "", next === "overview" ? "/revenue" : `/revenue?tab=${next}`); };
  if (!can("subscription:read")) return <div className="admin-card admin-empty">매출 화면에 접근할 권한이 없습니다.</div>;

  return <div className="admin-page rev-page">
    <div className="admin-page-head"><div><h2>Revenue Center</h2><p>매출, 지출, 순이익과 정산 흐름을 한 화면에서 확인합니다.</p></div><span className="admin-pill warn">MOCK FINANCIAL DATA · KRW 환산 예시</span></div>
    {error && <div className="admin-card admin-empty">{error}</div>}
    {!report || !summary || !lifetime ? <div className="admin-card skeleton" style={{ height: 360 }} /> : <>
      <section className="rev-hero"><div className="rev-hero-main"><span className="rev-hero-kicker">전체 누적 매출</span><strong>{formatWon(lifetime.gross)}</strong><span>2023.01.01 — {range.to} · 결제 총액 기준</span><p>아래 수치는 실제 결제·환율·정산 데이터가 아닌 화면 검증용 예시입니다.</p></div><div className="rev-hero-stats"><div><span>선택 기간 매출</span><strong>{compactWon(summary.gross)}</strong></div><div><span>총 지출</span><strong>{compactWon(summary.fees + summary.operatingExpenses)}</strong></div><div><span>순이익</span><strong>{compactWon(summary.profit)}</strong></div><div><span>정산 예정</span><strong>{compactWon(summary.scheduledPayout)}</strong></div></div></section>
      <div className="rev-period-grid">{periods.map(item => <PeriodCard key={item.key} label={item.label} totals={item.current} change={item.change} selected={grain === item.key} onClick={() => setGrain(item.key)}/>)}</div>
      <div className="admin-tabs rev-tabs"><button type="button" className={tab === "overview" ? "is-active" : ""} onClick={() => setActiveTab("overview")}>매출 개요</button><button type="button" className={tab === "transactions" ? "is-active" : ""} onClick={() => setActiveTab("transactions")}>거래 내역</button><button type="button" className={tab === "expenses" ? "is-active" : ""} onClick={() => setActiveTab("expenses")}>지출 · 정산</button></div>
      {tab === "overview" && <>
        <section className="admin-card"><div className="admin-card-head rev-chart-head"><div><h3>매출 · 지출 · 순이익 추이</h3><p className="rev-section-sub">{GRAINS.find(item => item.key === grain)?.detail} · 상단 종료 날짜 {range.to} 기준 · 마지막 구간은 진행 중인 부분 집계</p></div><div className="rev-chart-controls"><div className="rev-segment">{GRAINS.map(item => <button type="button" key={item.key} className={grain === item.key ? "is-active" : ""} onClick={() => setGrain(item.key)}>{item.label}</button>)}</div><div className="rev-segment"><button type="button" className={!cumulative ? "is-active" : ""} onClick={() => setCumulative(false)}>기간별</button><button type="button" className={cumulative ? "is-active" : ""} onClick={() => setCumulative(true)}>누적</button></div></div></div><div className="admin-card-body"><LineChart labels={buckets.map(bucket => grain === "month" ? `${bucket.key}-01` : grain === "year" ? `${bucket.key}-01-01` : bucket.key)} series={[{ key: "gross", label: "매출", color: "var(--series-1)", values: seriesValues("gross") }, { key: "spend", label: "지출", color: "var(--series-3)", values: seriesValues("spend") }, { key: "profit", label: "순이익", color: "var(--series-2)", values: seriesValues("profit") }]} height={300} formatValue={formatWon} formatAxis={compactWon} formatLabel={key => bucketLabel(key, grain)} formatDate={key => bucketLabel(key, grain)}/><div className="rev-chart-legend"><Legend items={[{ key: "gross", label: "총매출", color: "var(--series-1)" }, { key: "spend", label: "총지출", color: "var(--series-3)" }, { key: "profit", label: "순이익", color: "var(--series-2)" }]}/></div></div></section>
        <div className="admin-grid"><Reconciliation totals={summary}/><Health totals={summary}/></div>
        <div className="admin-grid"><ChannelMix transactions={transactions}/><ExpenseMix totals={summary}/></div>
        <TransactionTable rows={transactions} preview/>
      </>}
      {tab === "transactions" && <><div className="admin-grid four"><div className="admin-card admin-kpi"><span className="admin-kpi-label">총 결제 건수</span><div className="admin-kpi-value">{(summary.paidOrders + summary.refundedOrders).toLocaleString("ko-KR")}</div><span className="admin-kpi-note">선택 기간 승인 기준</span></div><div className="admin-card admin-kpi"><span className="admin-kpi-label">총매출</span><div className="admin-kpi-value">{compactWon(summary.gross)}</div><span className="admin-kpi-note">환불 차감 전</span></div><div className="admin-card admin-kpi"><span className="admin-kpi-label">환불액</span><div className="admin-kpi-value bm-negative">{compactWon(summary.refunds)}</div><span className="admin-kpi-note">{summary.refundedOrders}건 환불</span></div><div className="admin-card admin-kpi"><span className="admin-kpi-label">정산 가능액</span><div className="admin-kpi-value">{compactWon(summary.payout)}</div><span className="admin-kpi-note">매출 − 환불 − 수수료</span></div></div><TransactionTable rows={transactions}/></>}
      {tab === "expenses" && <><div className="admin-grid"><ExpenseMix totals={summary}/><Reconciliation totals={summary}/></div><div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>정산 현황</h3><span className="admin-pill blue">선택 기간</span></div><div className="admin-card-body rev-settlement"><div><span>정산 완료</span><strong>{formatWon(summary.settledPayout)}</strong><small>mock 지급 완료</small></div><div><span>정산 예정</span><strong>{formatWon(summary.scheduledPayout)}</strong><small>최근 결제의 지급 대기액</small></div><p>정산 가능액 {formatWon(summary.payout)} = 완료 {formatWon(summary.settledPayout)} + 예정 {formatWon(summary.scheduledPayout)}. 환불 거래는 정산액 0으로 표시합니다.</p></div></section><section className="admin-card"><div className="admin-card-head"><h3>실제 데이터 연결 시 필요한 원장</h3></div><div className="admin-card-body rev-needed"><p>현재 구독 스키마에는 가격·통화가 저장되지 않아 MRR과 실제 매출을 계산할 수 없습니다.</p><ul><li>승인/환불 결제 거래 ID, 상품·가격·통화·결제 시점</li><li>채널별 수수료, 환율 적용일, 정산 지급액과 지급일</li><li>마케팅·인프라 등 운영 지출 원장과 분류</li></ul><p>실제 연동 전에는 이 화면의 금액을 재무 보고나 운영 판단에 사용하지 마세요.</p></div></section></div></>}
      <p className="rev-disclaimer">모든 금액은 KRW 환산 mock 예시입니다. 실제 결제·세금·환율·회계 처리와 연결되지 않습니다. MRR/ARR은 실제 가격·갱신 원장이 없어 표시하지 않습니다.</p>
    </>}
  </div>;
}
