"use client";

import { useEffect, useMemo, useState } from "react";
import { useConsole } from "@/widgets/console-context";
import { isMockMode } from "@/features/auth/session";
import { METRICS, formatMetric, mockSeries, type MetricKey } from "./mock-source";
import { MetricDetailChart } from "./metric-detail-chart";
import { MetricChangeChart } from "./metric-change-chart";
import { LiveMetricExplorer } from "./live-metric-explorer";

const DAY = 86_400_000;
type Grain = "day" | "week" | "month";

function aggregate(labels: string[], values: number[], grain: Grain) {
  if (grain === "day") return { labels, values };
  const groups = new Map<string, { total: number; count: number }>();
  labels.forEach((label, i) => {
    const date = new Date(`${label}T00:00:00.000Z`);
    const key = grain === "month" ? label.slice(0, 7) + "-01" : new Date(date.getTime() - date.getUTCDay() * DAY).toISOString().slice(0, 10);
    const entry = groups.get(key) ?? { total: 0, count: 0 };
    entry.total += values[i] ?? 0; entry.count++;
    groups.set(key, entry);
  });
  return { labels:[...groups.keys()], values:[...groups.values()].map(v => Math.round(v.total / v.count * 10) / 10) };
}

export function MetricExplorer() {
  return isMockMode ? <MockMetricExplorer/> : <LiveMetricExplorer/>;
}

function MockMetricExplorer() {
  const {range}=useConsole();
  const [key,setKey]=useState<MetricKey>("dau");
  const [grain,setGrain]=useState<Grain>("day");
  const [compare,setCompare]=useState(false);
  const [trendline,setTrendline]=useState(false);
  const [benchmark,setBenchmark]=useState(false);
  const [showAnnotations,setShowAnnotations]=useState(true);
  const [annotations,setAnnotations]=useState<Record<string,string>>({});
  const [annotationTarget,setAnnotationTarget]=useState<string|null>(null);
  const [annotationText,setAnnotationText]=useState("");
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get("metric");if(METRICS.some(metric=>metric.key===value))setKey(value as MetricKey);},[]);
  useEffect(()=>{try { setAnnotations(JSON.parse(window.localStorage.getItem(`korio.metric-annotations.${key}`)??"{}") as Record<string,string>); } catch { setAnnotations({}); }},[key]);
  const definition=METRICS.find(metric=>metric.key===key)!;
  const metric=useMemo(()=>mockSeries(definition,range),[definition,range]);
  const grouped=useMemo(()=>aggregate(metric.labels,metric.values,grain),[metric,grain]);
  const priorEnd=new Date(`${range.from}T00:00:00.000Z`).getTime()-DAY;
  const priorRange={...range,from:new Date(priorEnd-(range.days-1)*DAY).toISOString().slice(0,10),to:new Date(priorEnd).toISOString().slice(0,10)};
  const prior=mockSeries(definition,priorRange);
  const comparison=aggregate(metric.labels,prior.values,grain).values;
  const start=grouped.values[0]??0;
  const end=grouped.values.at(-1)??0;
  const delta=start?Math.round((end-start)/start*1000)/10:0;
  const openAnnotation=(date:string)=>{setAnnotationTarget(date);setAnnotationText(annotations[date]??"");};
  const saveAnnotation=()=>{if(!annotationTarget)return;const next={...annotations};if(annotationText.trim())next[annotationTarget]=annotationText.trim();else delete next[annotationTarget];setAnnotations(next);try{window.localStorage.setItem(`korio.metric-annotations.${key}`,JSON.stringify(next));}catch{ /* Storage may be unavailable; keep the in-memory note. */ }setAnnotationTarget(null);};

  return <div className="admin-page bm-explorer">
    <div className="admin-page-head"><div><h2>지표 상세</h2><p>Control Center 카드에서 더 깊은 날짜별 흐름을 확인합니다. 모든 값은 mock 데이터입니다.</p></div><select className="bm-metric-select" aria-label="지표 선택" value={key} onChange={e=>setKey(e.target.value as MetricKey)}>{METRICS.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select></div>
    <section className="admin-card bm-detail-card">
      <div className="bm-explorer-toolbar">
        <button type="button" disabled title="요금제별 데이터 연결 후 제공됩니다">Compare Plans</button>
        <button type="button" disabled title="세그먼트 데이터 연결 후 제공됩니다">Compare Segments</button>
        <button type="button" onClick={()=>setCompare(!compare)} className={compare?"is-on":""} aria-pressed={compare}>Compare Dates</button>
        <button type="button" onClick={()=>setTrendline(!trendline)} className={trendline?"is-on":""} aria-pressed={trendline}>Trendlines</button>
        <button type="button" onClick={()=>setShowAnnotations(!showAnnotations)} className={showAnnotations?"is-on":""} aria-pressed={showAnnotations}>Annotations</button>
        <button type="button" onClick={()=>setBenchmark(!benchmark)} className={benchmark?"is-on":""} aria-pressed={benchmark}>Benchmark</button>
        <div className="spacer"/><span>{range.from} — {range.to}</span>
      </div>
      <div className="bm-explorer-summary">
        <small>{definition.label}</small>
        <strong>{formatMetric(definition,end)}</strong>
        <span className={delta>=0?"bm-positive":"bm-negative"}>{delta>=0?"↑":"↓"} {Math.abs(delta)}% <em>선택 기간</em></span>
        <select aria-label="차트 간격" value={grain} onChange={e=>setGrain(e.target.value as Grain)}><option value="day">Days</option><option value="week">Weeks</option><option value="month">Months</option></select>
      </div>
      <div className="bm-explorer-chart"><MetricDetailChart labels={grouped.labels} values={grouped.values} previous={comparison} periodDays={range.days} metric={definition} compare={compare} trendline={trendline} benchmark={benchmark} annotations={annotations} showAnnotations={showAnnotations} onAnnotate={openAnnotation}/></div>
    </section>
    <section className="admin-card"><div className="admin-card-head"><h3>{grain === "month" ? "월별" : grain === "week" ? "주별" : "일별"} 변화</h3><span className="bm-data-note">이전 구간 대비 지표 차이 · mock 데이터</span></div><MetricChangeChart labels={grouped.labels} values={grouped.values} metric={definition}/></section>
    <section className="admin-card"><div className="admin-card-head"><h3>데이터 읽는 법</h3></div><div className="admin-card-body bm-insight"><div><span className="admin-pill blue">현재</span><strong>{formatMetric(definition,metric.current)}</strong><small>선택 기간 마지막 날</small></div><div><span className="admin-pill">직전</span><strong>{formatMetric(definition,metric.previous)}</strong><small>직전 비교 기준</small></div><div><span className="admin-pill good">변화</span><strong>{metric.delta>0?"+":""}{metric.delta}%</strong><small>선택 기간 대비</small></div><p>차트의 점에 마우스를 올리면 날짜와 값을 볼 수 있습니다. 표에는 같은 수치가 일별로 표시됩니다.</p></div></section>
    {annotationTarget && <div className="bm-annotation-backdrop" role="presentation" onMouseDown={()=>setAnnotationTarget(null)}><div className="bm-annotation-dialog" role="dialog" aria-modal="true" aria-labelledby="bm-annotation-title" onMouseDown={event=>event.stopPropagation()}><h3 id="bm-annotation-title">지표 주석 · {annotationTarget}</h3><p>차트에서 해당 날짜를 다시 확인할 수 있습니다. 이 메모는 현재 브라우저에만 저장됩니다.</p><textarea aria-label="주석 내용" autoFocus value={annotationText} onChange={event=>setAnnotationText(event.target.value)} placeholder="이 날짜에 있었던 일을 기록하세요"/><div><button type="button" onClick={()=>setAnnotationTarget(null)}>취소</button><button type="button" className="is-primary" onClick={saveAnnotation}>저장</button></div></div></div>}
  </div>;
}
