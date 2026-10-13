"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { formatMetric, type MetricSeries } from "./mock-source";

const WIDTH = 490;
const HEIGHT = 154;
const LEFT = 47;
const RIGHT = 16;
const TOP = 13;
const BOTTOM = 28;

export function MetricSparkCard({ metric, onDay }: { metric: MetricSeries; onDay: (index: number) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const count = metric.values.length;
  const minimum = Math.min(...metric.values) * .96;
  const maximum = Math.max(...metric.values) * 1.025;
  const span = Math.max(1, maximum - minimum);
  const x = (index: number) => LEFT + index * (WIDTH - LEFT - RIGHT) / Math.max(1, count - 1);
  const y = (value: number) => TOP + (1 - (value - minimum) / span) * (HEIGHT - TOP - BOTTOM);
  const line = metric.values.map((value, index) => `${index ? "L" : "M"}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
  const ticks = Array.from({ length: 5 }, (_, index) => minimum + span * index / 4);
  const deltaGood = metric.favorable === "neutral" ? null : (metric.delta >= 0) === (metric.favorable === "up");
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!count) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const chartX = (event.clientX - bounds.left) / bounds.width * WIDTH;
    const ratio = (chartX - LEFT) / (WIDTH - LEFT - RIGHT);
    setHover(Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1)))));
  };
  const tickLabel = (value: number) => metric.unit === "percent" ? `${value.toFixed(1)}%` : value >= 1000 ? `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}k` : Math.round(value).toLocaleString("ko-KR");

  return <article className="bm-metric admin-card">
    <Link href={`/metrics?metric=${metric.key}`} className="bm-metric-title">{metric.label}</Link>
    <div className="bm-metric-numbers"><strong>{formatMetric(metric, metric.current)}</strong><span>직전 기간 {formatMetric(metric, metric.previous)}</span><b className={deltaGood === null ? "neutral" : deltaGood ? "positive" : "negative"}><i aria-hidden>{metric.delta >= 0 ? "↑" : "↓"}</i> {Math.abs(metric.delta)}%</b></div>
    <div className="bm-mini-plot" role="button" tabIndex={0} aria-label={`${metric.label} 날짜별 상세 보기`} onMouseMove={move} onMouseLeave={() => setHover(null)} onClick={() => hover !== null && onDay(hover)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onDay(hover ?? count - 1); } }}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label={`${metric.label} 추이`}>
        {ticks.map((tick, index) => <g key={index}><line x1={LEFT} x2={WIDTH - RIGHT} y1={y(tick)} y2={y(tick)} stroke="var(--grid)"/><text x={LEFT - 7} y={y(tick) + 3} textAnchor="end" className="bm-mini-axis">{tickLabel(tick)}</text></g>)}
        <path d={line} fill="none" stroke="var(--brand)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
        {hover !== null && <g className="bm-mini-cursor" style={{ transform: `translateX(${x(hover)}px)` }}><line y1={TOP} y2={HEIGHT - BOTTOM} stroke="var(--brand)" strokeOpacity=".18" strokeWidth="2"/><circle cy={y(metric.values[hover] ?? 0)} r="5.5" fill="var(--brand)" stroke="var(--surface)" strokeWidth="2"/></g>}
        {[0, Math.floor((count - 1) / 3), Math.floor((count - 1) * 2 / 3), count - 1].map((index, position) => <text key={position} x={x(index)} y={HEIGHT - 4} textAnchor={position === 0 ? "start" : position === 3 ? "end" : "middle"} className="bm-mini-axis">{metric.labels[index]?.slice(5).replace("-", ".")}</text>)}
      </svg>
      {hover !== null && <div className="bm-mini-tip" role="tooltip" style={{ left: `${Math.max(17, Math.min(83, x(hover) / WIDTH * 100))}%` }}><small>{metric.labels[hover]}</small><strong><span aria-hidden>●</span> {formatMetric(metric, metric.values[hover] ?? 0)}</strong><em>클릭하여 날짜 상세 보기</em></div>}
    </div>
  </article>;
}
