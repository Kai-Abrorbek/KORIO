"use client";

import { useEffect, useMemo, useState } from "react";
import { qs } from "@/shared/api/client";
import { useQuery } from "@/shared/api/use-query";
import { ErrorState } from "@/shared/ui/primitives";
import { useConsole } from "@/widgets/console-context";
import { liveTrends, LIVE_TREND_KEYS, previousRange, priorValues, type LiveTrendKey } from "./live-metrics";
import { MetricDetailChart } from "./metric-detail-chart";
import { formatMetric } from "./mock-source";
import type { ActiveUsersResponse, OverviewResponse } from "./types";

type Grain = "day" | "week" | "month";
const DAY = 86_400_000;

function aggregate(labels: string[], values: number[], grain: Grain) {
  if (grain === "day") return { labels, values };
  const groups = new Map<string, { total: number; count: number }>();
  labels.forEach((label, index) => {
    const date = new Date(`${label}T00:00:00.000Z`);
    const key = grain === "month" ? `${label.slice(0, 7)}-01` : new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * DAY).toISOString().slice(0, 10);
    const group = groups.get(key) ?? { total: 0, count: 0 };
    group.total += values[index] ?? 0;
    group.count++;
    groups.set(key, group);
  });
  return { labels: [...groups.keys()], values: [...groups.values()].map(group => Math.round(group.total / group.count * 10) / 10) };
}

export function LiveMetricExplorer() {
  const { range } = useConsole();
  const prior = previousRange(range);
  const currentSuffix = qs({ from: range.from, to: range.to });
  const priorSuffix = qs(prior);
  const overview = useQuery<OverviewResponse>(`/admin/analytics/overview${currentSuffix}`);
  const active = useQuery<ActiveUsersResponse>(`/admin/analytics/active-users${currentSuffix}`);
  const priorOverview = useQuery<OverviewResponse>(`/admin/analytics/overview${priorSuffix}`);
  const priorActive = useQuery<ActiveUsersResponse>(`/admin/analytics/active-users${priorSuffix}`);
  const [key, setKey] = useState<LiveTrendKey>("dau");
  const [unsupported, setUnsupported] = useState<string | null>(null);
  const [grain, setGrain] = useState<Grain>("day");
  const [compare, setCompare] = useState(false);
  const [trendline, setTrendline] = useState(false);
  const [benchmark, setBenchmark] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [annotations, setAnnotations] = useState<Record<string, string>>({});
  const [annotationTarget, setAnnotationTarget] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("metric");
    if (!requested) return;
    if (LIVE_TREND_KEYS.some(item => item === requested)) setKey(requested as LiveTrendKey);
    else setUnsupported(requested);
  }, []);
  useEffect(() => { try { setAnnotations(JSON.parse(window.localStorage.getItem(`korio.metric-annotations.${key}`) ?? "{}") as Record<string, string>); } catch { setAnnotations({}); } }, [key]);

  const trends = useMemo(() => overview.data && active.data && priorOverview.data && priorActive.data
    ? liveTrends(active.data, overview.data, priorActive.data, priorOverview.data)
    : [], [overview.data, active.data, priorOverview.data, priorActive.data]);
  const metric = trends.find(item => item.key === key);
  const comparison = priorActive.data && priorOverview.data ? priorValues(key, priorActive.data, priorOverview.data) : [];
  const grouped = metric ? aggregate(metric.labels, metric.values, grain) : null;
  const priorGrouped = metric ? aggregate(metric.labels, comparison, grain) : null;
  const first = grouped?.values[0] ?? 0;
  const last = grouped?.values.at(-1) ?? 0;
  const delta = first ? Math.round((last - first) / first * 1000) / 10 : null;
  const error = overview.error || active.error || priorOverview.error || priorActive.error;
  const loading = overview.loading || active.loading || priorOverview.loading || priorActive.loading;
  const reload = () => { overview.reload(); active.reload(); priorOverview.reload(); priorActive.reload(); };
  const openAnnotation = (date: string) => { setAnnotationTarget(date); setAnnotationText(annotations[date] ?? ""); };
  const saveAnnotation = () => { if (!annotationTarget) return; const next = { ...annotations }; if (annotationText.trim()) next[annotationTarget] = annotationText.trim(); else delete next[annotationTarget]; setAnnotations(next); try { window.localStorage.setItem(`korio.metric-annotations.${key}`, JSON.stringify(next)); } catch { /* In-memory annotation still works. */ } setAnnotationTarget(null); };

  return <div className="admin-page bm-explorer">
    <div className="admin-page-head"><div><h2>지표 상세</h2><p>실제 학습·가입 데이터의 날짜별 흐름입니다. 없는 시계열은 만들어 표시하지 않습니다.</p></div><select className="bm-metric-select" aria-label="지표 선택" value={key} onChange={event => { setKey(event.target.value as LiveTrendKey); setUnsupported(null); }}>{LIVE_TREND_KEYS.map(item => <option key={item} value={item}>{({ dau: "DAU · 일간 학습자", wau: "WAU · 주간 학습자", mau: "MAU · 월간 학습자", signups: "신규 가입" } as Record<LiveTrendKey, string>)[item]}</option>)}</select></div>
    {unsupported && <p className="bm-data-note">{unsupported}의 날짜별 시계열 API가 아직 없어 DAU를 표시합니다.</p>}
    {error ? <section className="admin-card"><ErrorState code={error} onRetry={reload}/></section> : loading ? <div className="admin-card skeleton" style={{ height: 480 }}/> : !metric || !grouped || !priorGrouped ? <section className="admin-card admin-empty">이 기간에 표시할 시계열 데이터가 없습니다.</section> : <>
      <section className="admin-card bm-detail-card">
        <div className="bm-explorer-toolbar"><button type="button" disabled title="요금제별 시계열 API가 아직 없습니다">Compare Plans</button><button type="button" disabled title="세그먼트별 시계열 API가 아직 없습니다">Compare Segments</button><button type="button" onClick={() => setCompare(!compare)} className={compare ? "is-on" : ""} aria-pressed={compare}>Compare Dates</button><button type="button" onClick={() => setTrendline(!trendline)} className={trendline ? "is-on" : ""} aria-pressed={trendline}>Trendlines</button><button type="button" onClick={() => setShowAnnotations(!showAnnotations)} className={showAnnotations ? "is-on" : ""} aria-pressed={showAnnotations}>Annotations</button><button type="button" onClick={() => setBenchmark(!benchmark)} className={benchmark ? "is-on" : ""} aria-pressed={benchmark}>Benchmark</button><div className="spacer"/><span>{range.from} — {range.to}</span></div>
        <div className="bm-explorer-summary"><small>{metric.label}</small><strong>{formatMetric(metric, last)}</strong><span className={delta === null ? "" : delta >= 0 ? "bm-positive" : "bm-negative"}>{delta === null ? "비교 불가" : `${delta >= 0 ? "↑" : "↓"} ${Math.abs(delta)}%`} <em>선택 기간</em></span><select aria-label="차트 간격" value={grain} onChange={event => setGrain(event.target.value as Grain)}><option value="day">Days</option><option value="week">Weeks</option><option value="month">Months</option></select></div>
        <div className="bm-explorer-chart"><MetricDetailChart labels={grouped.labels} values={grouped.values} previous={priorGrouped.values} periodDays={range.days} metric={metric} compare={compare} trendline={trendline} benchmark={benchmark} annotations={annotations} showAnnotations={showAnnotations} onAnnotate={openAnnotation}/></div>
      </section>
      <section className="admin-card"><div className="admin-card-head"><h3>데이터 읽는 법</h3></div><div className="admin-card-body bm-insight"><div><span className="admin-pill blue">현재</span><strong>{formatMetric(metric, metric.current)}</strong><small>{key === "signups" ? "선택 기간 가입 합계" : "선택 기간 마지막 날"}</small></div><div><span className="admin-pill">직전</span><strong>{formatMetric(metric, metric.previous)}</strong><small>{key === "signups" ? "직전 기간 가입 합계" : "직전 기간 마지막 날"}</small></div><div><span className="admin-pill good">변화</span><strong>{metric.previous ? `${metric.delta >= 0 ? "+" : ""}${metric.delta}%` : "—"}</strong><small>직전 기간 대비</small></div><p>학습자는 앱 실행이 아닌 실제 학습 기록 기준입니다. 주석은 현재 브라우저에만 저장됩니다.</p></div></section>
    </>}
    {annotationTarget && <div className="bm-annotation-backdrop" role="presentation" onMouseDown={() => setAnnotationTarget(null)}><div className="bm-annotation-dialog" role="dialog" aria-modal="true" aria-labelledby="bm-live-annotation-title" onMouseDown={event => event.stopPropagation()}><h3 id="bm-live-annotation-title">지표 주석 · {annotationTarget}</h3><p>이 메모는 현재 브라우저에만 저장됩니다.</p><textarea aria-label="주석 내용" autoFocus value={annotationText} onChange={event => setAnnotationText(event.target.value)} placeholder="이 날짜에 있었던 일을 기록하세요"/><div><button type="button" onClick={() => setAnnotationTarget(null)}>취소</button><button type="button" className="is-primary" onClick={saveAnnotation}>저장</button></div></div></div>}
  </div>;
}
