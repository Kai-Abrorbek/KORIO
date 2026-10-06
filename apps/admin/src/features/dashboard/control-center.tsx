"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useConsole } from "@/widgets/console-context";
import { isMockMode } from "@/features/auth/session";
import { LineChart, Donut, Legend } from "@/shared/ui/charts";
import { CohortTable } from "./cohort-table";
import { Funnel } from "./funnel";
import { LiveControlCenter } from "./live-control-center";
import { METRICS, formatMetric, mockDashboardSource, type DashboardAlert, type DashboardBreakdown, type MetricSeries } from "./mock-source";
import type { FunnelStep } from "./types";

interface SelectedDay { metric: MetricSeries; index: number; }

function MetricCard({ metric, onDay }: { metric: MetricSeries; onDay: (index: number) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const n = metric.values.length;
  const width = 490;
  const height = 154;
  const left = 47;
  const right = 16;
  const top = 13;
  const bottom = 28;
  const minimum = Math.min(...metric.values) * .96;
  const maximum = Math.max(...metric.values) * 1.025;
  const span = Math.max(1, maximum - minimum);
  const x = (i: number) => left + i * (width - left - right) / Math.max(1, n - 1);
  const y = (v: number) => top + (1 - (v - minimum) / span) * (height - top - bottom);
  const line = metric.values.map((value, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
  const ticks = Array.from({length: 5}, (_, i) => minimum + (span / 4) * i);
  const deltaGood = metric.favorable === "neutral" ? null : (metric.delta >= 0) === (metric.favorable === "up");
  const query = `metric=${metric.key}`;

  return <article className="bm-metric admin-card">
    <Link href={`/metrics?${query}`} className="bm-metric-title">{metric.label}</Link>
    <div className="bm-metric-numbers"><strong>{formatMetric(metric,metric.current)}</strong><span>이전 {formatMetric(metric,metric.previous)}</span><b className={deltaGood === null ? "neutral" : deltaGood ? "positive" : "negative"}>{metric.delta >= 0 ? "↑" : "↓"} {Math.abs(metric.delta)}%</b></div>
    <div className="bm-mini-plot" onMouseLeave={() => setHover(null)} onMouseMove={event => {const rect=event.currentTarget.getBoundingClientRect();const fraction=(event.clientX-rect.left)/rect.width;setHover(Math.max(0,Math.min(n-1,Math.round((fraction-.1)*n/0.9))));}} onClick={() => hover !== null && onDay(hover)} role="button" tabIndex={0} aria-label={`${metric.label} 날짜별 상세 보기`} onKeyDown={event => {if(event.key === "Enter") onDay(hover ?? n-1);}}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`${metric.label} 추이`}>
        {ticks.map((tick,i) => <g key={i}><line x1={left} x2={width-right} y1={y(tick)} y2={y(tick)} stroke="var(--grid)"/><text x={left-6} y={y(tick)+3} textAnchor="end" fill="var(--ink-3)" fontSize="10">{metric.unit === "percent" ? `${tick.toFixed(1)}%` : Math.round(tick).toLocaleString("ko-KR")}</text></g>)}
        <path d={line} fill="none" stroke="var(--brand)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
        {hover !== null && <g><line x1={x(hover)} x2={x(hover)} y1={top} y2={height-bottom} stroke="var(--border-strong)" strokeWidth="1"/><circle cx={x(hover)} cy={y(metric.values[hover] ?? 0)} r="5" fill="var(--brand)"/></g>}
        {[0,Math.floor((n-1)/3),Math.floor((n-1)*2/3),n-1].map((i,k) => <text key={k} x={x(i)} y={height-4} textAnchor={k===0?"start":k===3?"end":"middle"} fill="var(--ink-3)" fontSize="10">{metric.labels[i]?.slice(5).replace("-",".")}</text>)}
      </svg>
      {hover !== null && <div className="bm-mini-tip" style={{ left:`${Math.min(82,Math.max(17,(x(hover)/width)*100))}%` }}><span>{metric.labels[hover]}</span><b>● {formatMetric(metric, metric.values[hover] ?? 0)}</b><small>클릭하여 날짜 상세 보기</small></div>}
    </div>
  </article>;
}

function DayModal({ selection, close }: { selection: SelectedDay; close: () => void }) {
  const { metric, index } = selection;
  const value = metric.values[index] ?? 0;
  const previous = metric.values[index-1] ?? value;
  const delta = previous ? Math.round(((value-previous)/previous)*1000)/10 : 0;
  return <div className="admin-modal-backdrop" onMouseDown={close}><section className="admin-modal" role="dialog" aria-modal="true" aria-label="날짜별 지표 상세" onMouseDown={e=>e.stopPropagation()}><h3>{metric.label}</h3><p>{metric.labels[index]} · mock 데이터</p><div className="admin-detail-grid"><div><small>해당 날짜</small><strong>{formatMetric(metric,value)}</strong></div><div><small>전일</small><strong>{formatMetric(metric,previous)}</strong></div><div><small>전일 대비</small><strong className={delta >= 0 ? "bm-positive" : "bm-negative"}>{delta >= 0 ? "+" : ""}{delta}%</strong></div><div><small>선택 기간</small><strong>{metric.labels[0]} ~ {metric.labels.at(-1)}</strong></div></div><div className="admin-modal-actions"><button className="btn btn-ghost" onClick={close}>닫기</button><Link className="btn btn-primary" href={`/metrics?metric=${metric.key}`}>지표 상세로 이동</Link></div></section></div>;
}

export function ControlCenter() {
  if (!isMockMode) return <LiveControlCenter/>;
  return <MockControlCenter/>;
}

function MockControlCenter() {
  const { range } = useConsole();
  const [metrics,setMetrics] = useState<MetricSeries[] | null>(null);
  const [breakdown,setBreakdown] = useState<DashboardBreakdown[]>([]);
  const [alerts,setAlerts] = useState<DashboardAlert[]>([]);
  const [selected,setSelected] = useState<SelectedDay | null>(null);
  const [breakdownPeriod,setBreakdownPeriod] = useState<"selected"|"today">("selected");

  useEffect(() => { let alive=true; mockDashboardSource.metrics(range).then(result=>{if(alive)setMetrics(result);});mockDashboardSource.breakdown(range).then(result=>{if(alive)setBreakdown(result);});mockDashboardSource.alerts(range).then(result=>{if(alive)setAlerts(result);});return()=>{alive=false;}; },[range]);
  const byKey = (key:string) => metrics?.find(metric=>metric.key===key);
  const signup = byKey("signups");
  const active = byKey("dau");
  const premium = byKey("premium");
  const free = byKey("free");
  const funnelCounts=[10540,8260,6410,5090,4110,3200,1890,1080];
  const funnelKeys=["signup","onboarding","placement","firstLessonStart","firstLessonComplete","firstUnitComplete","return7d","premium"];
  const steps:FunnelStep[]=funnelCounts.map((users,i)=>({key:funnelKeys[i]!,users,conversionFromPrev:i?Math.round(users/funnelCounts[i-1]!*1000)/10:null,conversionFromStart:Math.round(users/funnelCounts[0]!*1000)/10}));
  const cohorts=[{week:"2026-W36",size:184,d1:52,d7:34,d30:null},{week:"2026-W37",size:206,d1:54,d7:32,d30:null},{week:"2026-W38",size:193,d1:49,d7:31,d30:null},{week:"2026-W39",size:210,d1:56,d7:38,d30:null},{week:"2026-W40",size:178,d1:53,d7:null,d30:null}];

  return <div className="admin-page bm-control">
    <div className="bm-control-layout">
      <div className="bm-metric-grid">{metrics ? metrics.map(metric=><MetricCard key={metric.key} metric={metric} onDay={index=>setSelected({metric,index})}/>) : METRICS.map(metric=><div key={metric.key} className="admin-card skeleton" style={{height:350}}/>)}</div>
      <aside className="bm-side-column">
        <section className="admin-card"><div className="admin-card-head"><h3>Breakdown</h3><select aria-label="분석 기간" value={breakdownPeriod} onChange={e=>setBreakdownPeriod(e.target.value as "selected"|"today")}><option value="selected">선택 기간</option><option value="today">오늘</option></select></div><div className="bm-breakdown">{breakdown.map(item=><Link href={item.href} key={item.label}><span><b>{breakdownPeriod==="today" ? Math.round(item.count/Math.max(1,range.days)) : item.count}</b> {item.label}</span>{item.change !== undefined && <strong className={item.change>=0?"bm-positive":"bm-negative"}>{item.change>=0?"+":"−"} {Math.abs(item.change)}</strong>}</Link>)}</div></section>
        <section className="admin-card"><div className="admin-card-head"><h3>지금 확인할 문제</h3><Link href="/content?tab=quality">모두 보기 →</Link></div>{alerts.map(alert=><Link key={alert.id} className="bm-alert" href={alert.href}><span className={`admin-pill ${alert.severity==="critical"?"bad":alert.severity==="warning"?"warn":"blue"}`}>{alert.severity.toUpperCase()}</span><strong>{alert.title}</strong><small>{alert.detail}</small></Link>)}</section>
        <section className="admin-card"><div className="admin-card-head"><h3>오늘의 흐름</h3></div><div className="bm-side-stat"><span>신규 가입 → 첫 레슨</span><strong>60.0%</strong></div><div className="bm-side-stat"><span>첫 레슨 → 완료</span><strong>80.7%</strong></div><div className="bm-side-stat"><span>Premium 전환</span><strong>{premium ? formatMetric({unit:"count"},premium.current) : "—"}</strong></div></section>
      </aside>
    </div>

    <div className="admin-page-head"><div><h2>활동과 성장</h2><p>{range.label} · 날짜를 바꾸면 모든 mock 지표가 함께 갱신됩니다.</p></div><Link className="btn btn-ghost" href="/metrics">지표 상세 보기 →</Link></div>
    <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>DAU / WAU / MAU</h3><Legend items={[{key:"dau",label:"DAU",color:"var(--series-1)"},{key:"wau",label:"WAU",color:"var(--series-2)"},{key:"mau",label:"MAU",color:"var(--series-4)"}]}/></div><div className="admin-card-body">{active && byKey("wau") && byKey("mau") && <LineChart labels={active.labels} series={[{key:"dau",label:"DAU",color:"var(--series-1)",values:active.values},{key:"wau",label:"WAU",color:"var(--series-2)",values:byKey("wau")!.values},{key:"mau",label:"MAU",color:"var(--series-4)",values:byKey("mau")!.values}]} height={270}/>}</div></section><section className="admin-card"><div className="admin-card-head"><h3>신규 가입 → 온보딩 → 첫 레슨</h3><Link href="/analytics?tab=funnel">퍼널 보기 →</Link></div><div className="admin-card-body">{signup && <LineChart labels={signup.labels} series={[{key:"signups",label:"신규 가입",color:"var(--series-1)",values:signup.values},{key:"onboarding",label:"온보딩 완료",color:"var(--series-2)",values:signup.values.map(value=>Math.round(value*.82))},{key:"firstLesson",label:"첫 레슨 시작",color:"var(--series-4)",values:signup.values.map(value=>Math.round(value*.61))}]} height={270}/>}</div></section></div>
    <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>학습 퍼널</h3><Link href="/analytics?tab=funnel">상세 분석 →</Link></div><div className="admin-card-body"><Funnel steps={steps}/></div></section><section className="admin-card"><div className="admin-card-head"><h3>구독 구성</h3><Link href="/subscriptions">구독 상세 →</Link></div><div className="admin-card-body">{premium && free && <Donut parts={[{key:"premium",label:"Premium",value:premium.current,color:"var(--series-1)"},{key:"free",label:"Free",value:free.current,color:"var(--border-strong)"}]} height={210}/>}<p className="bm-data-note">MRR은 실제 가격 데이터가 준비될 때까지 표시하지 않습니다.</p></div></section></div>
    <section className="admin-card"><div className="admin-card-head"><h3>가입 주차별 코호트 리텐션</h3><Link href="/analytics?tab=retention">전체 보기 →</Link></div><div className="admin-card-body"><CohortTable cohorts={cohorts}/></div></section>
    {selected && <DayModal selection={selected} close={()=>setSelected(null)}/>}
  </div>;
}
