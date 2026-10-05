"use client";

import { useId, useState, type MouseEvent } from "react";
import { useWidth } from "@/shared/ui/use-width";
import { formatMetric, type MetricDefinition } from "./mock-source";

const HEIGHT = 318;
const TOP = 18;
const BOTTOM = 38;
const LEFT = 76;
const RIGHT = 20;

interface Props {
  labels: string[];
  values: number[];
  previous: number[];
  periodDays: number;
  metric: MetricDefinition;
  compare: boolean;
  trendline: boolean;
  benchmark: boolean;
  annotations: Record<string, string>;
  showAnnotations: boolean;
  onAnnotate: (date: string) => void;
}

function dateLabel(date: string, monthly: boolean) {
  const value = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("ko-KR", { month: "short", ...(monthly ? { year: "2-digit" as const } : { day: "numeric" as const }), timeZone: "UTC" }).format(value);
}

export function MetricDetailChart({ labels, values, previous, periodDays, metric, compare, trendline, benchmark, annotations, showAnnotations, onAnnotate }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const gradientId = useId();
  const count = labels.length;
  const innerWidth = Math.max(1, width - LEFT - RIGHT);
  const innerHeight = HEIGHT - TOP - BOTTOM;
  const all = compare ? [...values, ...previous] : benchmark ? [...values, previous.at(-1) ?? 0] : values;
  const smallest = Math.min(...all, 0);
  const largest = Math.max(...all, 1);
  const padding = Math.max((largest - smallest) * 0.1, largest * 0.015, 0.1);
  const minimum = Math.max(0, Math.min(...all) - padding);
  const maximum = largest + padding;
  const span = Math.max(0.001, maximum - minimum);
  const x = (index: number) => LEFT + (count < 2 ? innerWidth / 2 : index / (count - 1) * innerWidth);
  const y = (value: number) => TOP + innerHeight - (value - minimum) / span * innerHeight;
  const pointPath = (items: number[]) => items.map((value, index) => `${index ? "L" : "M"} ${x(index)},${y(value)}`).join(" ");
  const active = hover !== null && labels[hover] ? hover : null;
  const activeValue = active !== null ? values[active] ?? 0 : 0;
  const priorValue = active !== null ? previous[active] ?? 0 : 0;
  const difference = priorValue ? (activeValue - priorValue) / priorValue * 100 : 0;
  const ticks = Array.from({ length: 5 }, (_, index) => minimum + span * index / 4);
  const tickEvery = Math.max(1, Math.ceil(count / Math.max(1, Math.floor(innerWidth / 80))));
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!count) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left - LEFT) / innerWidth;
    setHover(Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1)))));
  };
  const visibleCount = Math.min(count, 10);
  const firstColumn = active === null ? Math.max(0, count - visibleCount) : Math.max(0, Math.min(count - visibleCount, active - Math.floor(visibleCount / 2)));
  const columns = labels.slice(firstColumn, firstColumn + visibleCount);
  const format = (value: number) => formatMetric(metric, metric.unit === "count" ? Math.round(value) : Math.round(value * 10) / 10);

  return <>
    <div className="bm-detail-plot" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHover(null)} style={{ height: HEIGHT }}>
      {width > 0 && count > 0 && <svg width={width} height={HEIGHT} role="img" aria-label={`${metric.label} 날짜별 추이`}>
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--brand)" stopOpacity=".15"/><stop offset="100%" stopColor="var(--brand)" stopOpacity=".04"/></linearGradient></defs>
        {ticks.map((tick, index) => <g key={index}><line x1={LEFT} x2={width - RIGHT} y1={y(tick)} y2={y(tick)} stroke="var(--grid)"/><text x={LEFT - 12} y={y(tick) + 4} textAnchor="end" className="bm-detail-axis">{format(tick)}</text></g>)}
        {labels.map((label, index) => index === count - 1 || (index % tickEvery === 0 && count - 1 - index >= tickEvery / 2) ? <text key={label} x={x(index)} y={HEIGHT - 9} textAnchor="middle" className="bm-detail-axis">{dateLabel(label, count > 1 && labels[0]?.slice(0, 7) !== labels[1]?.slice(0, 7) && label.endsWith("-01"))}</text> : null)}
        {benchmark && <g><line x1={LEFT} x2={width - RIGHT} y1={y(previous.at(-1) ?? values[0] ?? 0)} y2={y(previous.at(-1) ?? values[0] ?? 0)} stroke="var(--series-3)" strokeDasharray="5 5"/><text x={width - RIGHT - 3} y={y(previous.at(-1) ?? values[0] ?? 0) - 6} textAnchor="end" className="bm-detail-axis">이전 기준</text></g>}
        <path d={`${pointPath(values)} L ${x(count - 1)},${TOP + innerHeight} L ${x(0)},${TOP + innerHeight} Z`} fill={`url(#${gradientId})`}/>
        {compare && <path d={pointPath(previous)} fill="none" stroke="var(--series-4)" strokeWidth="2.5" strokeDasharray="7 5" strokeLinecap="round" strokeLinejoin="round"/>}
        {trendline && <path d={`M ${x(0)},${y(values[0] ?? 0)} L ${x(count - 1)},${y(values.at(-1) ?? 0)}`} fill="none" stroke="var(--series-3)" strokeWidth="2" strokeDasharray="4 5"/>}
        <path d={pointPath(values)} fill="none" stroke="var(--brand)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round"/>
        {showAnnotations && labels.map((label, index) => annotations[label] ? <circle key={label} cx={x(index)} cy={y(values[index] ?? 0)} r="5" fill="var(--series-3)" stroke="white" strokeWidth="2"/> : null)}
        {active !== null && <>
          <g className="bm-detail-moving" style={{ transform: `translateX(${x(active)}px)` }}><line x1={0} x2={0} y1={TOP} y2={TOP + innerHeight} stroke="var(--brand)" strokeOpacity=".2" strokeWidth="2"/><circle cx={0} cy={TOP + innerHeight} r="5" fill="white" stroke="var(--brand)" strokeOpacity=".35"/></g>
          <circle className="bm-detail-moving" cx={0} cy={0} r="9" fill="white" stroke="var(--brand)" strokeWidth="2.5" style={{ transform: `translate(${x(active)}px, ${y(activeValue)}px)` }}/>
        </>}
      </svg>}
      {active !== null && <div className="bm-detail-tooltip" role="tooltip" style={{ left: Math.max(96, Math.min(width - 96, x(active))), top: Math.max(6, y(activeValue) - 149) }} onMouseMove={event => event.stopPropagation()}>
        <span className="bm-detail-tooltip-date">{dateLabel(labels[active]!, false)}</span>
        <strong>{format(activeValue)}</strong>
        <span className={difference >= 0 ? "bm-positive" : "bm-negative"}>{difference >= 0 ? "↑" : "↓"} {Math.abs(difference).toFixed(1)}% <small>{periodDays}일 전 대비</small></span>
        {showAnnotations && annotations[labels[active]!] && <p>{annotations[labels[active]!]}</p>}
        <button type="button" onClick={() => onAnnotate(labels[active]!)}>{annotations[labels[active]!] ? "주석 수정" : "+ 주석 추가"}</button>
      </div>}
    </div>
    <div className="bm-detail-breakout" aria-label="날짜별 지표 표"><table><thead><tr><th>BREAKOUT</th>{columns.map((label, index) => <th className={active === firstColumn + index ? "selected" : ""} key={label}>{dateLabel(label, false)}</th>)}</tr></thead><tbody>
      <tr><th>현재 값</th>{columns.map((label, index) => <td className={active === firstColumn + index ? "selected" : ""} key={label}>{format(values[firstColumn + index] ?? 0)}</td>)}</tr>
      <tr><th>이전 기간</th>{columns.map((label, index) => <td className={active === firstColumn + index ? "selected" : ""} key={label}>{format(previous[firstColumn + index] ?? 0)}</td>)}</tr>
      <tr><th>차이</th>{columns.map((label, index) => { const current = values[firstColumn + index] ?? 0; const prior = previous[firstColumn + index] ?? 0; return <td className={`${active === firstColumn + index ? "selected" : ""} ${current >= prior ? "bm-positive" : "bm-negative"}`} key={label}>{current >= prior ? "+" : "−"}{format(Math.abs(current - prior))}</td>; })}</tr>
      <tr><th>변화율</th>{columns.map((label, index) => { const current = values[firstColumn + index] ?? 0; const prior = previous[firstColumn + index] ?? 0; const percent = prior ? (current - prior) / prior * 100 : 0; return <td className={`${active === firstColumn + index ? "selected" : ""} ${percent >= 0 ? "bm-positive" : "bm-negative"}`} key={label}>{percent >= 0 ? "+" : ""}{percent.toFixed(1)}%</td>; })}</tr>
    </tbody></table></div>
  </>;
}
