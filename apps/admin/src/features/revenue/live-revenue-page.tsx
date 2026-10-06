"use client";

import { useState } from "react";
import { useSession } from "@/features/auth/session";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { LineChart } from "@/shared/ui/charts";
import { ErrorState } from "@/shared/ui/primitives";
import { useConsole } from "@/widgets/console-context";

type Grain = "day" | "week" | "month" | "year";
type AmountKey = "grossMinor" | "refundsMinor" | "googleFeesMinor" | "taxMinor" | "netMinor";
type Amounts = Record<AmountKey, number>;
type DailyRevenue = Amounts & { date: string; hasEstimatedData: boolean; hasEarningsData: boolean };
interface RevenueSummary {
  status: "unconfigured" | "no_reports" | "ready";
  currencies: string[];
  selectedCurrency: string | null;
  coverage: { estimatedThrough: string | null; earningsThrough: string | null; lastImportedAt: string | null };
  totals: Amounts & { orders: number; refunds: number };
  hasEstimatedData: boolean;
  hasEarningsData: boolean;
  series: DailyRevenue[];
  provenance: { gross: "estimated_sales"; settlement: "earnings" };
  syncWarning?: string | null;
}
const PERIODS: { grain: Grain; label: string }[] = [{ grain: "day", label: "일" }, { grain: "week", label: "주" }, { grain: "month", label: "월" }, { grain: "year", label: "년" }];
const DAY_MS = 86_400_000;
const iso = (date: Date) => date.toISOString().slice(0, 10);

function periodStart(grain: Grain, through: string) {
  const date = new Date(`${through}T00:00:00.000Z`);
  if (grain === "week") date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  if (grain === "month") date.setUTCDate(1);
  if (grain === "year") date.setUTCMonth(0, 1);
  return iso(date);
}

function amount(minor: number, currency: string, compact = false) {
  try {
    const digits = new Intl.NumberFormat("ko-KR", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency, ...(compact ? { notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 } : {}) }).format(minor / 10 ** digits);
  } catch {
    return `${minor.toLocaleString("ko-KR")} ${currency}`;
  }
}

function grouped(rows: RevenueSummary["series"], grain: Grain) {
  const map = new Map<string, Amounts & { hasEstimatedData: boolean; hasEarningsData: boolean }>();
  for (const row of rows) {
    const date = periodStart(grain, row.date);
    const total = map.get(date) ?? { grossMinor: 0, refundsMinor: 0, googleFeesMinor: 0, taxMinor: 0, netMinor: 0, hasEstimatedData: false, hasEarningsData: false };
    for (const key of ["grossMinor", "refundsMinor", "googleFeesMinor", "taxMinor", "netMinor"] as const) total[key] += row[key];
    total.hasEstimatedData ||= row.hasEstimatedData;
    total.hasEarningsData ||= row.hasEarningsData;
    map.set(date, total);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, totals]) => ({ date, ...totals }));
}

function PeriodCard({ label, from, to, result, selected, onSelect }: {
  label: string; from: string; to: string;
  result: { data: RevenueSummary | null; loading: boolean; error: string | null };
  selected: boolean; onSelect: () => void;
}) {
  const data = result.data;
  const available = data?.hasEstimatedData && !!data.selectedCurrency;
  return <button type="button" className={`rev-period-card admin-card${selected ? " is-selected" : ""}`} onClick={onSelect}>
    <span className="rev-period-label">{label} 누적 매출 <span aria-hidden>↗</span></span>
    <strong>{result.loading ? "불러오는 중…" : result.error ? "조회 실패" : available ? amount(data.totals.grossMinor, data.selectedCurrency!, true) : "자료 없음"}</strong>
    <span className="rev-period-change">{from === to ? to : `${from} — ${to}`} · 예상 판매 실적</span>
    <span className="rev-period-footer"><span>Google Play 보고서 기준</span><span>{available ? `${data.totals.orders.toLocaleString("ko-KR")}건` : "—"}</span></span>
  </button>;
}

export function LiveRevenuePage() {
  const { can } = useSession();
  const { range } = useConsole();
  const [currency, setCurrency] = useState("");
  const [grain, setGrain] = useState<Grain>("month");
  const [cumulative, setCumulative] = useState(false);
  const permitted = can("subscription:read");
  const chartFrom = iso(new Date(Math.max(Date.parse(`${range.from}T00:00:00.000Z`), Date.parse(`${range.to}T00:00:00.000Z`) - 365 * DAY_MS)));
  const path = (from: string) => permitted ? `/admin/revenue/summary${qs({ from, to: range.to, currency })}` : null;
  const chart = useQuery<RevenueSummary>(path(chartFrom));
  const daily = useQuery<RevenueSummary>(path(periodStart("day", range.to)));
  const weekly = useQuery<RevenueSummary>(path(periodStart("week", range.to)));
  const monthly = useQuery<RevenueSummary>(path(periodStart("month", range.to)));
  const yearly = useQuery<RevenueSummary>(path(periodStart("year", range.to)));
  const periods = [daily, weekly, monthly, yearly];
  const data = chart.data;
  const selectedCurrency = data?.selectedCurrency ?? currency;
  const ready = data?.status === "ready";
  const hasSales = ready && data.hasEstimatedData && !!selectedCurrency;
  const hasEarnings = ready && data.hasEarningsData && !!selectedCurrency;
  const rows = data ? grouped(data.series, grain) : [];
  let running: Amounts = { grossMinor: 0, refundsMinor: 0, googleFeesMinor: 0, taxMinor: 0, netMinor: 0 };
  const chartRows = cumulative ? rows.map(row => {
    running = { grossMinor: running.grossMinor + row.grossMinor, refundsMinor: running.refundsMinor + row.refundsMinor, googleFeesMinor: running.googleFeesMinor + row.googleFeesMinor, taxMinor: running.taxMinor + row.taxMinor, netMinor: running.netMinor + row.netMinor };
    return { date: row.date, ...running, hasEstimatedData: row.hasEstimatedData, hasEarningsData: row.hasEarningsData };
  }) : rows;
  const salesChartRows = chartRows.filter(row => row.hasEstimatedData);
  const earningsChartRows = chartRows.filter(row => row.hasEarningsData);
  const format = (minor: number) => amount(minor, selectedCurrency);
  const chartLabel = (date: string) => grain === "year" ? `${date.slice(0, 4)}년` : grain === "month" ? `${date.slice(0, 4)}.${date.slice(5, 7)}` : date.slice(5);

  if (!permitted) return <div className="admin-card admin-empty">매출 조회 권한이 없습니다.</div>;
  return <div className="admin-page rev-page">
    <div className="admin-page-head"><div><h2>Revenue Center</h2><p>Google Play 보고서의 실제 수치만 표시합니다. 보고서가 없으면 매출을 0으로 확정하지 않습니다.</p></div><span className="admin-pill blue">Google Play · 실데이터</span></div>
    {chart.error ? <section className="admin-card"><ErrorState code={chart.error} onRetry={chart.reload}/></section> : chart.loading || !data ? <div className="admin-card skeleton" style={{ height: 300 }}/> : <>
      <section className="rev-hero"><div className="rev-hero-main"><span className="rev-hero-kicker">선택 기간 예상 판매 총액 · {chartFrom} — {range.to}</span><strong>{hasSales ? format(data.totals.grossMinor) : "자료 없음"}</strong><span>{hasSales ? `${selectedCurrency} · 예상 판매 실적 보고서 기준` : data.status === "unconfigured" ? "Google Play 재무 보고서 연결 대기" : ready ? "선택 기간 예상 판매 자료 없음" : "사용 가능한 Google Play 재무 보고서 없음"}</span><p>예상 판매 실적은 확정 정산액이나 순이익이 아닙니다. 월별 수익 보고서와 합산하지 않습니다.</p></div><div className="rev-hero-stats"><div><span>예상 환불액</span><strong>{hasSales ? format(data.totals.refundsMinor) : "자료 없음"}</strong></div><div><span>예상 결제 건수</span><strong>{hasSales ? data.totals.orders.toLocaleString("ko-KR") : "자료 없음"}</strong></div><div><span>수익 보고서 순액</span><strong>{hasEarnings ? format(data.totals.netMinor) : "자료 없음"}</strong></div><div><span>Google 수수료</span><strong>{hasEarnings ? format(data.totals.googleFeesMinor) : "자료 없음"}</strong></div></div></section>
      <div className="admin-toolbar"><label htmlFor="revenue-currency">통화</label><select id="revenue-currency" value={selectedCurrency} disabled={!data.currencies.length} onChange={event => setCurrency(event.target.value)}><option value="">보고서 없음</option>{data.currencies.map(item => <option key={item} value={item}>{item}</option>)}</select><button type="button" onClick={() => { chart.reload(); daily.reload(); weekly.reload(); monthly.reload(); yearly.reload(); }}>새로고침</button><span className="page-sub">통화별 금액은 합산하지 않습니다.</span></div>
      {data.syncWarning && <section className="admin-card admin-empty"><h3>최근 보고서 수집 실패</h3><p>Google Play 보고서 접근 권한과 서버 설정을 확인해 주세요. 표시된 기존 자료도 최신이 아닐 수 있습니다.</p></section>}
      <div className="rev-period-grid">{PERIODS.map((item, index) => <PeriodCard key={item.grain} {...item} from={periodStart(item.grain, range.to)} to={range.to} result={periods[index]!} selected={grain === item.grain} onSelect={() => setGrain(item.grain)}/>)}</div>
      {(!ready || (!hasSales && !hasEarnings)) && <section className="admin-card admin-empty"><h3>{data.status === "unconfigured" ? "Google Play 보고서 연결 대기" : ready ? "선택 기간에 보고서 자료가 없습니다" : "아직 재무 보고서가 없습니다"}</h3><p>{data.status === "unconfigured" ? "보고서 버킷과 접근 권한을 서버에 설정하면 수집 상태가 여기에 표시됩니다." : "실제 보고서가 생성되고 이 기간의 거래가 수집되면 매출 추이가 나타납니다."}</p><p>원본 자료가 없는 기간은 매출 0원이 아닌 자료 없음으로 표시합니다.</p></section>}
      {ready && (hasSales || hasEarnings) && <>
        <section className="admin-card"><div className="admin-card-head rev-chart-head"><div><h3>예상 판매 실적 추이</h3><p className="rev-section-sub">{chartFrom} — {range.to} · 선택 기간 내 {grain === "day" ? "일" : grain === "week" ? "주" : grain === "month" ? "월" : "년"}별 묶음 · 확정 정산액 아님</p></div><div className="rev-chart-controls"><div className="rev-segment">{PERIODS.map(item => <button type="button" key={item.grain} className={grain === item.grain ? "is-active" : ""} onClick={() => setGrain(item.grain)}>{item.label}</button>)}</div><div className="rev-segment"><button type="button" className={!cumulative ? "is-active" : ""} onClick={() => setCumulative(false)}>기간별</button><button type="button" className={cumulative ? "is-active" : ""} onClick={() => setCumulative(true)}>누적</button></div></div></div><div className="admin-card-body">{hasSales && salesChartRows.length ? <LineChart labels={salesChartRows.map(item => item.date)} series={[{ key: "gross", label: "총 판매액", color: "var(--series-1)", values: salesChartRows.map(item => item.grossMinor) }, { key: "refunds", label: "환불액", color: "var(--series-3)", values: salesChartRows.map(item => item.refundsMinor) }]} height={290} formatValue={format} formatAxis={value => amount(value, selectedCurrency, true)} formatLabel={chartLabel} formatDate={chartLabel}/> : <div className="admin-empty">선택 기간의 예상 판매 실적 보고서가 없습니다.</div>}</div></section>
        <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>예상 판매 실적</h3><span className="admin-pill blue">구매자 통화 · 선택 기간</span></div><div className="rev-reconcile"><div className="rev-reconcile-row"><span>총 판매액</span><strong>{hasSales ? format(data.totals.grossMinor) : "자료 없음"}</strong></div><div className="rev-reconcile-row"><span>환불액</span><strong>{hasSales ? format(data.totals.refundsMinor) : "자료 없음"}</strong></div><div className="rev-reconcile-row"><span>환불 건수</span><strong>{hasSales ? `${data.totals.refunds.toLocaleString("ko-KR")}건` : "자료 없음"}</strong></div></div><p className="rev-card-note">예상 판매 실적 보고서 기준 · 최종 정산액과 차이가 날 수 있습니다.</p></section><section className="admin-card"><div className="admin-card-head"><h3>월별 수익 보고서</h3><span className="admin-pill blue">판매자 통화 · 선택 기간</span></div><div className="rev-reconcile"><div className="rev-reconcile-row"><span>보고서 순액</span><strong>{hasEarnings ? format(data.totals.netMinor) : "자료 없음"}</strong></div><div className="rev-reconcile-row"><span>Google 수수료</span><strong>{hasEarnings ? format(data.totals.googleFeesMinor) : "자료 없음"}</strong></div><div className="rev-reconcile-row"><span>보고서 세금</span><strong>{hasEarnings ? format(data.totals.taxMinor) : "자료 없음"}</strong></div></div><p className="rev-card-note">수익 보고서 기준 · 운영비·입금 내역이 없어 순이익/지급 완료로 표시하지 않습니다.</p></section></div>
        {hasEarnings && earningsChartRows.length > 0 && <section className="admin-card"><div className="admin-card-head"><h3>수익 보고서 순액 추이</h3></div><div className="admin-card-body">{earningsChartRows.every(item => item.netMinor >= 0) ? <LineChart labels={earningsChartRows.map(item => item.date)} series={[{ key: "net", label: "보고서 순액", color: "var(--series-2)", values: earningsChartRows.map(item => item.netMinor) }]} height={230} formatValue={format} formatAxis={value => amount(value, selectedCurrency, true)} formatLabel={chartLabel} formatDate={chartLabel}/> : <p className="bm-data-note">순액에 음수 구간이 있어 차트 대신 아래 표의 정확한 값을 표시합니다.</p>}</div></section>}
        {rows.length > 0 && <section className="admin-card"><div className="admin-card-head"><h3>기간별 보고 금액</h3><span className="admin-pill blue">{grain === "day" ? "일" : grain === "week" ? "주" : grain === "month" ? "월" : "년"}별</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>기간 시작</th><th className="right">예상 총 판매액</th><th className="right">예상 환불액</th><th className="right">수익 보고서 순액</th></tr></thead><tbody>{rows.map(row => <tr key={row.date}><td>{chartLabel(row.date)}</td><td className="right">{row.hasEstimatedData ? format(row.grossMinor) : "자료 없음"}</td><td className="right">{row.hasEstimatedData ? format(row.refundsMinor) : "자료 없음"}</td><td className="right">{row.hasEarningsData ? format(row.netMinor) : "자료 없음"}</td></tr>)}</tbody></table></div></section>}
      </>}
      <p className="rev-disclaimer">예상 판매 실적·월별 수익 보고서는 서로 다른 원천과 날짜 기준입니다. 같은 통화를 선택해도 두 금액을 빼서 순이익이나 정산액을 계산하지 않습니다. 차트는 해당 원본 기록이 있는 날짜만 연결합니다. 예상 판매 자료: {data.coverage.estimatedThrough ?? "없음"} · 수익 보고서: {data.coverage.earningsThrough ?? "없음"} · 마지막 수집: {data.coverage.lastImportedAt ? new Date(data.coverage.lastImportedAt).toLocaleString("ko-KR") : "없음"}</p>
    </>}
  </div>;
}
