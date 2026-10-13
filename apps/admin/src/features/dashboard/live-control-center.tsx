"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { Donut, Legend, LineChart } from "@/shared/ui/charts";
import { ErrorState } from "@/shared/ui/primitives";
import { useConsole } from "@/widgets/console-context";
import { CohortTable } from "./cohort-table";
import { Funnel } from "./funnel";
import { liveTrends, previousRange } from "./live-metrics";
import { MetricSparkCard } from "./metric-spark-card";
import { formatMetric } from "./mock-source";
import type { ActiveUsersResponse, FunnelResponse, OverviewResponse, RetentionResponse, SubscriptionsResponse } from "./types";

const KPI_LABELS: Record<string, string> = {
  activeLearners: "선택 기간 학습자",
  newUsers: "신규 가입",
  studiedToday: "최근 24시간 학습자",
  lessonsCompleted: "완료한 레슨",
  avgStudyMinutes: "평균 학습 시간",
  premiumUsers: "유료 Premium 사용자",
  freeUsers: "현재 유료 이용권 없음",
  premiumRate: "유료 Premium 비율",
};

export function LiveControlCenter() {
  const { range } = useConsole();
  const [breakdownPeriod, setBreakdownPeriod] = useState<"today" | "yesterday" | "selected">("selected");
  const localDate = new Date();
  const selectedDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate() - (breakdownPeriod === "yesterday" ? 1 : 0));
  const dayLabel = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`;
  const previous = previousRange(range);
  const currentSuffix = qs({ from: range.from, to: range.to });
  const previousSuffix = qs(previous);
  const overview = useQuery<OverviewResponse>(`/admin/analytics/overview${currentSuffix}`);
  const dayOverview = useQuery<OverviewResponse>(breakdownPeriod === "selected" ? null : `/admin/analytics/overview${qs({ from: dayLabel, to: dayLabel })}`);
  const active = useQuery<ActiveUsersResponse>(`/admin/analytics/active-users${currentSuffix}`);
  const priorOverview = useQuery<OverviewResponse>(`/admin/analytics/overview${previousSuffix}`, { refreshMs: 120_000 });
  const priorActive = useQuery<ActiveUsersResponse>(`/admin/analytics/active-users${previousSuffix}`, { refreshMs: 120_000 });
  const funnel = useQuery<FunnelResponse>("/admin/analytics/funnel", { refreshMs: 120_000 });
  const subscriptions = useQuery<SubscriptionsResponse>(`/admin/analytics/subscriptions${currentSuffix}`, { refreshMs: 60_000 });
  const retention = useQuery<RetentionResponse>("/admin/analytics/retention?weeks=8", { refreshMs: 300_000 });
  const [selected, setSelected] = useState<{ key: string; date: string } | null>(null);
  const trends = useMemo(() => overview.data && active.data && priorOverview.data && priorActive.data
    ? liveTrends(active.data, overview.data, priorActive.data, priorOverview.data)
    : null, [overview.data, active.data, priorOverview.data, priorActive.data]);
  const trendError = overview.error || active.error || priorOverview.error || priorActive.error;
  const trendLoading = overview.loading || active.loading || priorOverview.loading || priorActive.loading;
  const reloadTrends = () => { overview.reload(); active.reload(); priorOverview.reload(); priorActive.reload(); };
  const selectedMetric = selected && trends?.find(metric => metric.key === selected.key);
  const selectedIndex = selectedMetric && selected ? selectedMetric.labels.indexOf(selected.date) : -1;
  const selectedPrevious = selectedMetric && selectedIndex > 0 ? selectedMetric.values[selectedIndex - 1] : null;
  const breakdownData = breakdownPeriod === "selected" ? overview : dayOverview;
  const kpi = (key: string) => breakdownData.data?.kpis.find(item => item.key === key);
  const currentSignup = overview.data?.kpis.find(item => item.key === "newUsers");

  return <div className="admin-page bm-control">
    <div className="bm-control-layout">
      <div className="bm-metric-grid">
        {trendError ? <div className="admin-card"><ErrorState code={trendError} onRetry={reloadTrends}/></div>
          : !trendLoading && trends ? trends.map(metric => <MetricSparkCard key={metric.key} metric={metric} onDay={index => { const date = metric.labels[index]; if (date) setSelected({ key: metric.key, date }); }}/>)
          : Array.from({ length: 4 }, (_, index) => <div key={index} className="admin-card skeleton" style={{ height: 350 }}/>) }
      </div>
      <aside className="bm-side-column">
        <section className="admin-card"><div className="admin-card-head"><h3>Breakdown</h3><select aria-label="Breakdown 기간" value={breakdownPeriod} onChange={event => setBreakdownPeriod(event.target.value as typeof breakdownPeriod)}><option value="selected">선택 기간</option><option value="today">오늘</option><option value="yesterday">어제</option></select></div><div className="bm-breakdown">
          {["activeLearners", "newUsers", "lessonsCompleted", "premiumUsers"].map(key => { const item = kpi(key); return item && <Link href={key === "newUsers" ? "/metrics?metric=signups" : key === "premiumUsers" ? "/subscriptions" : "/analytics"} key={key}><span><b>{item.value.toLocaleString("ko-KR")}</b> {KPI_LABELS[key]}</span>{item.deltaPct !== null && <strong className={item.deltaPct >= 0 ? "bm-positive" : "bm-negative"}>{item.deltaPct >= 0 ? "+" : ""}{item.deltaPct}%</strong>}</Link>; })}
          {breakdownData.loading && <div className="admin-empty">불러오는 중…</div>}
          {!breakdownData.loading && !breakdownData.data && <div className="admin-empty">데이터를 불러오지 못했습니다.</div>}
        </div></section>
        <section className="admin-card"><div className="admin-card-head"><h3>지금 확인할 문제</h3></div><div className="admin-empty">문제 품질 경고 API가 아직 없습니다. 임의의 경고는 표시하지 않습니다.</div></section>
        <section className="admin-card"><div className="admin-card-head"><h3>전체 기간 학습 퍼널</h3></div>{funnel.error ? <ErrorState code={funnel.error} onRetry={funnel.reload}/> : funnel.data ? <div className="bm-side-stat-list">{funnel.data.steps.filter(item => ["signup", "firstLessonStart", "firstLessonComplete", "premium"].includes(item.key)).map(item => <div className="bm-side-stat" key={item.key}><span>{({ signup: "가입", firstLessonStart: "첫 레슨 시작", firstLessonComplete: "첫 레슨 완료", premium: "유료 Premium" } as Record<string,string>)[item.key]}{item.partial ? " · 부분 계측" : ""}</span><strong>{item.users.toLocaleString("ko-KR")}</strong></div>)}</div> : <div className="admin-empty">불러오는 중…</div>}</section>
      </aside>
    </div>

    <div className="admin-page-head"><div><h2>활동과 성장</h2><p>{range.label} · 실제 학습·가입·구독 데이터입니다. 제공되지 않는 지표는 추정하지 않습니다.</p></div><Link className="btn btn-ghost" href="/metrics">지표 상세 보기 →</Link></div>
    {overview.data && <div className="admin-grid three">{overview.data.kpis.filter(item => !["newUsers"].includes(item.key)).map(item => <div className="admin-card admin-kpi" key={item.key}><div className="admin-kpi-label">{KPI_LABELS[item.key] ?? item.key}</div><div className="admin-kpi-value">{item.unit === "percent" ? `${item.value}%` : item.key === "avgStudyMinutes" ? `${item.value}분` : item.value.toLocaleString("ko-KR")}</div><div className="admin-kpi-note">{item.deltaPct === null ? "직전 기간 비교 없음" : `직전 기간 대비 ${item.deltaPct >= 0 ? "+" : ""}${item.deltaPct}%`}</div></div>)}</div>}
    {overview.data?.unavailable.map(item => <p className="bm-data-note" key={item.key}>{item.key.toUpperCase()}: {item.detail}</p>)}
    <div className="admin-grid">
      <section className="admin-card"><div className="admin-card-head"><h3>DAU / WAU / MAU</h3><Legend items={[{ key: "dau", label: "DAU", color: "var(--series-1)" }, { key: "wau", label: "WAU", color: "var(--series-2)" }, { key: "mau", label: "MAU", color: "var(--series-4)" }]}/></div><div className="admin-card-body">{active.error ? <ErrorState code={active.error} onRetry={active.reload}/> : active.data ? <LineChart labels={active.data.series.map(item => item.date)} series={[{ key: "dau", label: "DAU", color: "var(--series-1)", values: active.data.series.map(item => item.dau) }, { key: "wau", label: "WAU", color: "var(--series-2)", values: active.data.series.map(item => item.wau) }, { key: "mau", label: "MAU", color: "var(--series-4)", values: active.data.series.map(item => item.mau) }]} height={270}/> : <div className="skeleton" style={{ height: 270 }}/>}<p className="bm-data-note">학습 기록이 있는 고유 계정 수입니다. 같은 날 여러 번 학습해도 DAU는 1명이며, 날짜는 각 사용자 시간대 기준입니다.</p></div></section>
      <section className="admin-card"><div className="admin-card-head"><h3>신규 가입</h3></div><div className="admin-card-body">{overview.error ? <ErrorState code={overview.error} onRetry={overview.reload}/> : active.data && currentSignup ? <LineChart labels={active.data.series.map(item => item.date)} series={[{ key: "signups", label: "신규 가입", color: "var(--series-1)", values: currentSignup.sparkline }]} area height={270}/> : <div className="skeleton" style={{ height: 270 }}/>}</div></section>
    </div>
    <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>학습 퍼널 · 전체 기간</h3><Link href="/analytics?tab=funnel">상세 분석 →</Link></div><div className="admin-card-body">{funnel.error ? <ErrorState code={funnel.error} onRetry={funnel.reload}/> : funnel.data ? <Funnel steps={funnel.data.steps}/> : <div className="skeleton" style={{ height: 220 }}/>}</div></section><section className="admin-card"><div className="admin-card-head"><h3>현재 유료 이용권 구성</h3><Link href="/subscriptions">구독 상세 →</Link></div><div className="admin-card-body">{subscriptions.error ? <ErrorState code={subscriptions.error} onRetry={subscriptions.reload}/> : subscriptions.data ? <Donut parts={[{ key: "premium", label: "유료 Premium", value: subscriptions.data.active, color: "var(--series-1)" }, { key: "free", label: "유료 이용권 없음", value: subscriptions.data.free, color: "var(--border-strong)" }]} height={210}/> : <div className="skeleton" style={{ height: 210 }}/>}<p className="bm-data-note">퀘스트·연속 학습·관리자 보상·보석 이용권은 유료 Premium에서 제외됩니다. MRR·매출은 결제 금액 원장이 준비될 때까지 표시하지 않습니다.</p></div></section></div>
    <section className="admin-card"><div className="admin-card-head"><h3>가입 주차별 코호트 리텐션</h3><Link href="/analytics?tab=retention">전체 보기 →</Link></div><div className="admin-card-body">{retention.error ? <ErrorState code={retention.error} onRetry={retention.reload}/> : retention.data ? <CohortTable cohorts={retention.data.cohorts}/> : <div className="skeleton" style={{ height: 230 }}/>}</div></section>
    {selectedMetric && selectedIndex >= 0 && <div className="admin-modal-backdrop" onMouseDown={() => setSelected(null)}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="날짜별 지표 상세" onMouseDown={event => event.stopPropagation()}><h3>{selectedMetric.label}</h3><p>{selectedMetric.labels[selectedIndex]} · 실제 API 데이터</p><div className="admin-detail-grid"><div><small>해당 날짜</small><strong>{formatMetric(selectedMetric, selectedMetric.values[selectedIndex] ?? 0)}</strong></div><div><small>전일</small><strong>{selectedPrevious == null ? "비교할 날짜 없음" : formatMetric(selectedMetric, selectedPrevious)}</strong></div><div><small>선택 기간</small><strong>{range.from} ~ {range.to}</strong></div></div><div className="admin-modal-actions"><button className="btn btn-ghost" onClick={() => setSelected(null)}>닫기</button><Link className="btn btn-primary" href={`/metrics?metric=${selectedMetric.key}`}>지표 상세로 이동</Link></div></section></div>}
  </div>;
}
