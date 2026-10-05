"use client";

import { useEffect, useMemo, useState } from "react";
import { LineChart, Legend } from "@/shared/ui/charts";
import { useConsole } from "@/widgets/console-context";
import { METRICS, formatMetric, mockSeries, type MetricKey } from "./mock-source";

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

function GrowthChart({ labels, values }: { labels: string[]; values: number[] }) {
  const points = labels.slice(-12).map((label, i) => {
    const value = values[values.length - 12 + i] ?? 0;
    return { label, newValue: Math.max(0,Math.round(value * .57)), expansion:Math.max(0,Math.round(value * .2)), churn:Math.max(0,Math.round(value * .16)), contraction:Math.max(0,Math.round(value * .07)) };
  });
  const [hover,setHover]=useState<number|null>(null);
  const max=Math.max(1,...points.map(p=>p.newValue+p.expansion));
  return <div className="bm-growth-wrap"><div className="bm-growth-plot">{points.map((p,i)=><div key={p.label} className="bm-growth-col" onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}><div className="bm-growth-positive" style={{height:`${((p.newValue+p.expansion)/max)*43}%`}}><span style={{height:`${p.expansion/(p.newValue+p.expansion)*100}%`,background:"#b4e9c8"}}/><span style={{height:`${p.newValue/(p.newValue+p.expansion)*100}%`,background:"#2fc56f"}}/></div><div className="bm-growth-baseline"/><div className="bm-growth-negative" style={{height:`${((p.churn+p.contraction)/max)*43}%`}}><span style={{height:`${p.churn/(p.churn+p.contraction)*100}%`,background:"#e94885"}}/><span style={{height:`${p.contraction/(p.churn+p.contraction)*100}%`,background:"#f5abc8"}}/></div><small>{p.label.slice(5).replace("-","/")}</small></div>)}</div>{hover !== null && points[hover] && <div className="bm-growth-tooltip"><strong>{points[hover].label}</strong><span>신규 <b>+{points[hover].newValue}</b></span><span>확장 <b>+{points[hover].expansion}</b></span><span>이탈 <b>−{points[hover].churn}</b></span><span>감소 <b>−{points[hover].contraction}</b></span></div>}</div>;
}

export function MetricExplorer() {
  const {range}=useConsole();
  const [key,setKey]=useState<MetricKey>("dau");
  const [grain,setGrain]=useState<Grain>("day");
  const [compare,setCompare]=useState(true);
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get("metric");if(METRICS.some(metric=>metric.key===value))setKey(value as MetricKey);},[]);
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

  return <div className="admin-page bm-explorer">
    <div className="admin-page-head"><div><h2>지표 상세</h2><p>Control Center 카드에서 더 깊은 날짜별 흐름을 확인합니다. 모든 값은 mock 데이터입니다.</p></div><select className="bm-metric-select" aria-label="지표 선택" value={key} onChange={e=>setKey(e.target.value as MetricKey)}>{METRICS.map(item=><option key={item.key} value={item.key}>{item.label}</option>)}</select></div>
    <section className="admin-card"><div className="bm-explorer-toolbar"><button onClick={()=>setCompare(!compare)} className={compare?"is-on":""}>기간 비교</button><button onClick={()=>setGrain("day")} className={grain==="day"?"is-on":""}>일</button><button onClick={()=>setGrain("week")} className={grain==="week"?"is-on":""}>주</button><button onClick={()=>setGrain("month")} className={grain==="month"?"is-on":""}>월</button><div className="spacer"/><span>{range.from} — {range.to}</span></div><div className="bm-explorer-summary"><small>{definition.label}</small><strong>{formatMetric(definition,metric.current)}</strong><span className={delta>=0?"bm-positive":"bm-negative"}>{delta>=0?"↗":"↘"} {Math.abs(delta)}% 선택 기간</span></div><div className="bm-explorer-chart"><LineChart labels={grouped.labels} series={[{key,label:definition.label,color:"var(--series-1)",values:grouped.values},...(compare?[{key:"previous",label:"이전 기간",color:"var(--series-4)",values:comparison}]:[])]} height={310} area={!compare} zoom formatValue={value=>formatMetric(definition,value)} formatAxis={value=>formatMetric(definition,definition.unit==="count"?Math.round(value):Math.round(value*10)/10)}/></div><div className="bm-chart-legend"><Legend items={[{key,label:definition.label,color:"var(--series-1)"},...(compare?[{key:"previous",label:"이전 기간",color:"var(--series-4)"}]:[])]}/></div></section>
    <div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h3>기간별 변화 구성</h3><select value={grain} onChange={e=>setGrain(e.target.value as Grain)}><option value="day">일별</option><option value="week">주별</option><option value="month">월별</option></select></div><div className="admin-card-body"><GrowthChart labels={grouped.labels} values={grouped.values}/><p className="bm-data-note">막대의 구성은 차트 상호작용용 예시값입니다. 지표별 실제 이벤트 계약은 백엔드 연결 시 정의합니다.</p></div></section><section className="admin-card"><div className="admin-card-head"><h3>데이터 읽는 법</h3></div><div className="admin-card-body bm-insight"><div><span className="admin-pill blue">현재</span><strong>{formatMetric(definition,metric.current)}</strong><small>선택 기간 마지막 날</small></div><div><span className="admin-pill">직전</span><strong>{formatMetric(definition,metric.previous)}</strong><small>직전 비교 기준</small></div><div><span className="admin-pill good">변화</span><strong>{metric.delta>0?"+":""}{metric.delta}%</strong><small>선택 기간 대비</small></div><p>차트의 점에 마우스를 올리면 날짜와 값을 볼 수 있습니다. 표에는 같은 수치가 일별로 표시됩니다.</p></div></section></div>
    <section className="admin-card"><div className="admin-card-head"><h3>날짜별 데이터</h3><span className="admin-pill blue">{grouped.labels.length}개 구간</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>날짜</th><th className="right">{definition.label}</th><th className="right">전 구간</th><th className="right">변화</th></tr></thead><tbody>{grouped.labels.map((label,i)=>{const value=grouped.values[i]??0;const prev=grouped.values[i-1]??value;const d=prev?Math.round((value-prev)/prev*1000)/10:0;return <tr key={label}><td>{label}</td><td className="right"><strong>{formatMetric(definition,value)}</strong></td><td className="right">{formatMetric(definition,prev)}</td><td className={`right ${d>=0?"bm-positive":"bm-negative"}`}>{d>=0?"+":""}{d}%</td></tr>;})}</tbody></table></div></section>
  </div>;
}
