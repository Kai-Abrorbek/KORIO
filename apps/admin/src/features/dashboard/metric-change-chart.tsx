"use client";

import { useState } from "react";
import { formatMetric, type MetricDefinition } from "./mock-source";

const WIDTH = 1200;
const HEIGHT = 318;
const BASELINE = 145;

export function MetricChangeChart({ labels, values, metric }: { labels: string[]; values: number[]; metric: MetricDefinition }) {
  const [hover, setHover] = useState<number | null>(null);
  const points = labels.map((label, index) => ({ label, value: values[index] ?? 0, change: index ? (values[index] ?? 0) - (values[index - 1] ?? 0) : null })).slice(-12);
  const maxChange = Math.max(1, ...points.map(point => Math.abs(point.change ?? 0)));
  const columnWidth = WIDTH / Math.max(1, points.length);
  const heightFor = (change: number) => Math.abs(change) / maxChange * 92;
  const path = points.map((point, index) => `${index ? "L" : "M"} ${columnWidth * (index + .5)} ${BASELINE - (point.change ?? 0) / maxChange * 85}`).join(" ");
  const active = hover === null ? null : points[hover];

  return <div className="bm-change-wrap" onMouseLeave={() => setHover(null)}>
    <div className="bm-change-scroll"><svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label={`${metric.label} 기간별 값 변화`}>
      {[BASELINE - 92, BASELINE, BASELINE + 92].map((y, index) => <line key={index} x1="0" x2={WIDTH} y1={y} y2={y} stroke="var(--grid)" strokeWidth={index === 1 ? 2 : 1}/>)}
      {points.map((point, index) => { const x = columnWidth * (index + .5); const change = point.change ?? 0; const barHeight = heightFor(change); return <g key={point.label} className={hover === index ? "is-active" : ""} onMouseEnter={() => setHover(index)} onFocus={() => setHover(index)} onBlur={() => setHover(null)} onClick={() => setHover(index)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setHover(index); } }} tabIndex={0} role="button" aria-label={`${point.label} ${point.change === null ? "비교 불가" : change >= 0 ? "증가" : "감소"} ${formatMetric(metric, Math.abs(change))}`}>
        <rect x={index * columnWidth} y="25" width={columnWidth} height="240" fill="transparent"/>
        {point.change !== null && <rect x={x - Math.min(31, columnWidth * .28)} y={change >= 0 ? BASELINE - barHeight : BASELINE} width={Math.min(62, columnWidth * .56)} height={Math.max(2, barHeight)} rx="2" fill={change >= 0 ? "var(--growth-up)" : "var(--growth-down)"}/>}
        <text x={x} y="290" textAnchor="middle" className="bm-detail-axis">{point.label.slice(5).replace("-", ".")}</text>
      </g>; })}
      <path d={path} fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 5" opacity=".8"/>
      {points.map((point, index) => <circle key={point.label} cx={columnWidth * (index + .5)} cy={BASELINE - (point.change ?? 0) / maxChange * 85} r="3" fill="var(--ink)"/>)}
    </svg></div>
    {active && hover !== null && <div className="bm-change-tooltip" style={{ left: `${Math.max(14, Math.min(86, (hover + .5) / points.length * 100))}%` }}><strong>{active.label}</strong><span>지표 값 <b>{formatMetric(metric, active.value)}</b></span><span>이전 구간 대비 <b className={active.change === null ? "" : active.change >= 0 ? "bm-positive" : "bm-negative"}>{active.change === null ? "—" : `${active.change >= 0 ? "+" : "−"}${formatMetric(metric, Math.abs(active.change))}`}</b></span></div>}
  </div>;
}
