"use client";

import { useId, useState } from "react";
import { useWidth } from "./use-width";
import { compact, full, longDate, niceMax, shortDate } from "./format";

/**
 * 차트.
 *
 * **라이브러리를 안 쓴다.** 모노레포에 UI 의존성이 하나도 없고, 퍼널·코호트
 * 히트맵처럼 여기서 필요한 모양은 어차피 라이브러리가 잘 못 그린다. 무엇보다
 * 검증한 팔레트를 그대로 쥐고 있을 수 있다.
 *
 * ⚠️ **축은 하나다.** 단위가 다른 두 값을 한 그림에 겹치지 않는다 — 두 y축
 *    차트는 축척을 어떻게 잡느냐로 결론이 바뀌어서, 사실상 결론을 먼저 정하고
 *    그리는 그림이 된다.
 * ⚠️ 색은 **개체를 따라간다.** 필터로 계열이 줄어도 남은 계열의 색은 안 바뀐다.
 */

export const SERIES = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
  "var(--series-5)",
  "var(--series-6)",
  "var(--series-7)",
  "var(--series-8)",
] as const;

export interface Series {
  key: string;
  label: string;
  color: string;
  values: number[];
}

/* ════════════════════════ 스파크라인 ════════════════════════ */

/**
 * KPI 카드 바닥에 깔리는 작은 추이.
 *
 * 눈금도 라벨도 없다 — **모양만 본다.** 정확한 값은 바로 위 숫자에 있다.
 * 가로로 늘려 쓰므로 선 굵기가 같이 늘어나지 않게 non-scaling-stroke 를 쓴다.
 */
export function Sparkline({
  values,
  color = "var(--brand)",
  height = 34,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  const gid = useId();
  if (values.length < 2) return null;

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const W = 100;
  const H = 30;
  const pt = (v: number, i: number) => [
    (i / (values.length - 1)) * W,
    H - ((v - min) / span) * (H - 3) - 1.5,
  ];

  const line = values.map((v, i) => pt(v, i).join(",")).join(" L ");
  const first = pt(values[0]!, 0);
  const last = pt(values[values.length - 1]!, values.length - 1);

  return (
    <svg
      className="kpi-spark"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.26" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M ${first.join(",")} L ${line} L ${last[0]},${H} L ${first[0]},${H} Z`} fill={`url(#${gid})`} />
      <path
        d={`M ${line}`}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ════════════════════════ 선 그래프 ════════════════════════ */

const PAD = { top: 10, right: 12, bottom: 22, left: 40 };
/** 끝점 라벨이 들어갈 자리 */
const END_LABEL_W = 52;

export function LineChart({
  labels,
  series,
  height = 220,
  area = false,
  endLabels = false,
  formatValue = full,
}: {
  labels: string[];
  series: Series[];
  height?: number;
  /** 계열이 하나일 때만 의미가 있다. 여러 개를 채우면 서로 가린다 */
  area?: boolean;
  /**
   * 선 끝에 이름을 직접 붙인다.
   *
   * 범례만 있으면 눈이 **색 → 범례 → 다시 선**을 왕복해야 한다. 계열이 4개
   * 이하면 이름을 선 옆에 두는 게 항상 빠르다. (글자는 잉크색을 쓰고 정체성은
   * 옆의 점이 나른다 — 글자에 계열색을 칠하면 색각이상에서 이름부터 안 읽힌다)
   */
  endLabels?: boolean;
  formatValue?: (n: number) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId();

  const W = Math.max(width, 0);
  const padRight = PAD.right + (endLabels ? END_LABEL_W : 0);
  const innerW = Math.max(W - PAD.left - padRight, 1);
  const innerH = height - PAD.top - PAD.bottom;

  const peak = Math.max(1, ...series.flatMap((s) => s.values));
  const max = niceMax(peak);
  const n = labels.length;

  const x = (i: number) => PAD.left + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => max * f);

  // 끝값이 가까우면 라벨끼리 겹친다. 위에서부터 최소 간격을 강제해 밀어낸다
  const endRows = (() => {
    if (!endLabels) return [];
    const rows = series
      .map((s2) => ({ s: s2, y: y(s2.values[n - 1] ?? 0) }))
      .sort((a, b) => a.y - b.y);
    for (let i = 1; i < rows.length; i++) {
      const prev = rows[i - 1]!;
      if (rows[i]!.y - prev.y < 13) rows[i]!.y = prev.y + 13;
    }
    return rows;
  })();
  // 30일치 날짜를 전부 쓰면 겹친다. 한 칸에 최소 46px 을 준다
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(innerW / 46))));
  // 마지막 날짜는 항상 보여주되, 직전 눈금에 붙어 있으면 그 눈금을 버린다
  const showTick = (i: number) =>
    i === n - 1 || (i % every === 0 && n - 1 - i >= every / 2);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const f = (e.clientX - rect.left - PAD.left) / innerW;
    setHover(Math.max(0, Math.min(n - 1, Math.round(f * (n - 1)))));
  };

  return (
    <div
      className="plot"
      ref={ref}
      style={{ height }}
      onMouseMove={onMove}
      onMouseLeave={() => setHover(null)}
    >
      {W > 0 && (
        <svg width={W} height={height} role="img" aria-label={series.map((s) => s.label).join(", ")}>
          <defs>
            {area && series[0] && (
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series[0].color} stopOpacity="0.26" />
                <stop offset="100%" stopColor={series[0].color} stopOpacity="0" />
              </linearGradient>
            )}
          </defs>

          {/* 격자 — 뒤로 물러나 있어야 한다 */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - padRight} y1={y(t)} y2={y(t)} stroke="var(--grid)" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="var(--ink-3)" className="tnum">
                {compact(Math.round(t))}
              </text>
            </g>
          ))}

          {labels.map((d, i) =>
            showTick(i) ? (
              <text key={d} x={x(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--ink-3)" className="tnum">
                {shortDate(d)}
              </text>
            ) : null,
          )}

          {area && series[0] && (
            <path
              d={`M ${x(0)},${y(series[0].values[0] ?? 0)} ${series[0].values
                .map((v, i) => `L ${x(i)},${y(v)}`)
                .join(" ")} L ${x(n - 1)},${PAD.top + innerH} L ${x(0)},${PAD.top + innerH} Z`}
              fill={`url(#${gid})`}
            />
          )}

          {series.map((s) => (
            <path
              key={s.key}
              d={`M ${s.values.map((v, i) => `${x(i)},${y(v)}`).join(" L ")}`}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {endRows.map((r) => (
            <g key={r.s.key}>
              <circle cx={x(n - 1) + 9} cy={r.y} r="3.5" fill={r.s.color} />
              <text x={x(n - 1) + 16} y={r.y + 3.5} fontSize="10.5" fontWeight="600" fill="var(--ink-2)">
                {r.s.label}
              </text>
            </g>
          ))}

          {/* 십자선 + 점. 마우스를 따라오되 데이터 점에 붙는다 */}
          {hover !== null && (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={PAD.top}
                y2={PAD.top + innerH}
                stroke="var(--border-strong)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {series.map((s) => (
                <circle
                  key={s.key}
                  cx={x(hover)}
                  cy={y(s.values[hover] ?? 0)}
                  r="4"
                  fill={s.color}
                  stroke="var(--surface)"
                  strokeWidth="2"
                />
              ))}
            </g>
          )}
        </svg>
      )}

      {hover !== null && labels[hover] && (
        <div
          className="tip"
          style={{ left: Math.min(Math.max(x(hover), 76), Math.max(W - 76, 76)), top: PAD.top + 4 }}
        >
          <div className="tip-date">{longDate(labels[hover]!)}</div>
          {series.map((s) => (
            <div className="tip-row" key={s.key}>
              <span className="legend-swatch" style={{ background: s.color }} />
              {s.label}
              <b>{formatValue(s.values[hover] ?? 0)}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════ 막대 그래프 ════════════════════════ */

export function BarChart({
  labels,
  series,
  height = 200,
  formatValue = full,
}: {
  labels: string[];
  series: Series[];
  height?: number;
  formatValue?: (n: number) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const W = Math.max(width, 0);
  const padRight = PAD.right;
  const innerW = Math.max(W - PAD.left - padRight, 1);
  const innerH = height - PAD.top - PAD.bottom;
  const n = labels.length;

  const peak = Math.max(1, ...series.flatMap((s) => s.values));
  const max = niceMax(peak);
  const slot = innerW / Math.max(n, 1);
  // 계열 사이 2px, 슬롯 사이 여백. 막대는 얇아야 한다
  const barW = Math.max(2, Math.min(14, (slot - 4) / series.length - 2));
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const slotX = (i: number) => PAD.left + i * slot;

  const ticks = [0, 0.5, 1].map((f) => max * f);
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(innerW / 46))));
  const showTick = (i: number) =>
    i === n - 1 || (i % every === 0 && n - 1 - i >= every / 2);

  return (
    <div className="plot" ref={ref} style={{ height }} onMouseLeave={() => setHover(null)}>
      {W > 0 && (
        <svg width={W} height={height} role="img" aria-label={series.map((s) => s.label).join(", ")}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - padRight} y1={y(t)} y2={y(t)} stroke="var(--grid)" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="var(--ink-3)" className="tnum">
                {compact(Math.round(t))}
              </text>
            </g>
          ))}

          {labels.map((d, i) => (
            <g key={d}>
              {/* 히트 영역은 막대보다 커야 한다 — 얇은 막대를 정확히 맞출 이유가 없다 */}
              <rect
                x={slotX(i)}
                y={PAD.top}
                width={slot}
                height={innerH}
                fill={hover === i ? "var(--surface-2)" : "transparent"}
                onMouseEnter={() => setHover(i)}
              />
              {series.map((s, si) => {
                const v = s.values[i] ?? 0;
                const h = Math.max(v > 0 ? 2 : 0, (v / max) * innerH);
                return (
                  <rect
                    key={s.key}
                    x={slotX(i) + slot / 2 - (series.length * (barW + 2) - 2) / 2 + si * (barW + 2)}
                    y={PAD.top + innerH - h}
                    width={barW}
                    height={h}
                    rx={Math.min(3, barW / 2)}
                    fill={s.color}
                    pointerEvents="none"
                  />
                );
              })}
              {showTick(i) && (
                <text
                  x={slotX(i) + slot / 2}
                  y={height - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--ink-3)"
                  className="tnum"
                  pointerEvents="none"
                >
                  {shortDate(d)}
                </text>
              )}
            </g>
          ))}
        </svg>
      )}

      {hover !== null && labels[hover] && (
        <div
          className="tip"
          style={{
            left: Math.min(Math.max(slotX(hover) + slot / 2, 76), Math.max(W - 76, 76)),
            top: PAD.top + 4,
          }}
        >
          <div className="tip-date">{longDate(labels[hover]!)}</div>
          {series.map((s) => (
            <div className="tip-row" key={s.key}>
              <span className="legend-swatch" style={{ background: s.color }} />
              {s.label}
              <b>{formatValue(s.values[hover] ?? 0)}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════ 도넛 ════════════════════════ */

/**
 * 비율 하나를 보여주는 도넛.
 *
 * 조각이 **둘뿐일 때만** 쓴다. 셋을 넘어가면 사람 눈은 각도를 비교하지
 * 못한다 — 그때는 막대가 정답이다.
 */
export function Donut({
  parts,
  height = 168,
}: {
  parts: { key: string; label: string; value: number; color: string }[];
  height?: number;
}) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const R = 58;
  const STROKE = 16;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height }}>
      <svg width={height} height={height} viewBox="0 0 140 140" style={{ flexShrink: 0 }} role="img">
        <g transform="rotate(-90 70 70)">
          <circle cx="70" cy="70" r={R} fill="none" stroke="var(--surface-2)" strokeWidth={STROKE} />
          {total > 0 &&
            parts.map((p) => {
              const len = (p.value / total) * C;
              const el = (
                <circle
                  key={p.key}
                  cx="70"
                  cy="70"
                  r={R}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={STROKE}
                  // 조각 사이에 표면색 틈 2px — 붙어 있으면 경계가 안 보인다
                  strokeDasharray={`${Math.max(0, len - 2)} ${C - Math.max(0, len - 2)}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
        </g>
        <text x="70" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)" className="tnum">
          {total ? `${Math.round((parts[0]!.value / total) * 1000) / 10}%` : "—"}
        </text>
        <text x="70" y="82" textAnchor="middle" fontSize="10" fill="var(--ink-3)">
          {parts[0]!.label}
        </text>
      </svg>

      <div className="legend" style={{ flexDirection: "column", gap: 9 }}>
        {parts.map((p) => (
          <div key={p.key} className="legend-item">
            <span className="legend-swatch" style={{ background: p.color }} />
            <span>{p.label}</span>
            <b className="tnum" style={{ marginLeft: 6, color: "var(--ink)" }}>
              {full(p.value)}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════ 범례 ════════════════════════ */

export function Legend({ items }: { items: { key: string; label: string; color: string }[] }) {
  return (
    <div className="legend">
      {items.map((i) => (
        <span key={i.key} className="legend-item">
          <span className="legend-swatch" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
