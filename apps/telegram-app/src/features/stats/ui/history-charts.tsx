"use client";

import { useEffect, useState, type CSSProperties } from "react";

import {
  ALL_CATEGORIES,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type HeatmapDay,
  type StudyPeriod,
  type TimePoint,
  type VolumePoint,
} from "../model/stats";
import { getPeriod } from "./period-view";
import {
  PeriodSelector,
  Spinner,
  StatsCard,
  type AuthenticatedRequest,
} from "./stats-screen";
import { YearlyHeatmap } from "./yearly-heatmap";
import styles from "./history-charts.module.css";

const CHART_WIDTH = 300;
const LINE_HEIGHT = 180;
const BAR_HEIGHT = 140;

function visibleLabels(period: StudyPeriod, count: number) {
  if (period === "week" || period === "year") {
    return Array.from({ length: count }, (_, index) => index);
  }
  if (period === "month") {
    const indices: number[] = [];
    for (let index = 4; index < count; index += 5) indices.push(index);
    if (indices[indices.length - 1] !== count - 1) indices.push(count - 1);
    return indices;
  }
  const step = Math.max(1, Math.floor(count / 6));
  const indices: number[] = [];
  for (let index = 0; index < count; index += step) indices.push(index);
  if (indices[indices.length - 1] !== count - 1) indices.push(count - 1);
  return indices;
}

function smoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";
  let path = "M " + points[0]!.x + " " + points[0]!.y;
  for (let index = 0; index < points.length - 1; index += 1) {
    const first = points[index]!;
    const second = points[index + 1]!;
    const control = (first.x + second.x) / 2;
    path +=
      " C " +
      control +
      " " +
      first.y +
      ", " +
      control +
      " " +
      second.y +
      ", " +
      second.x +
      " " +
      second.y;
  }
  return path;
}

function StudyTimeChart({ request }: { request: AuthenticatedRequest }) {
  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [points, setPoints] = useState<TimePoint[]>([]);
  const [average, setAverage] = useState("");
  const [range, setRange] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getPeriod(request, period)
      .then((data) => {
        if (!active) return;
        setPoints(data.studyTime.points);
        setAverage(data.studyTime.avgPerDayLabel);
        setRange(data.studyTime.rangeLabel);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [period, request]);

  const maximum = Math.max(...points.map((point) => point.minutes), 1);
  const step =
    points.length > 1 ? (CHART_WIDTH - 16) / (points.length - 1) : 0;
  const coordinates = points.map((point, index) => ({
    x: 8 + index * step,
    y: 166 - (point.minutes / maximum) * 134,
  }));
  const labels = visibleLabels(period, points.length);
  const [rangeStart, rangeEnd] = range.split(" - ");
  const prefix = {
    week: "Oxirgi haftada kunlik o'rtacha o'qish vaqti ",
    month: "Oxirgi oyda kunlik o'rtacha o'qish vaqti ",
    year: "Oxirgi yilda kunlik o'rtacha o'qish vaqti ",
    all: "Butun davr uchun kunlik o'rtacha o'qish vaqti ",
  }[period];

  return (
    <StatsCard>
      <div className={styles.controls}>
        <PeriodSelector onChange={setPeriod} value={period} />
        {loading ? <Spinner compact /> : null}
      </div>
      <h3>O&apos;qish vaqti</h3>
      <p className={styles.subtitle}>
        {prefix}<strong>{average}</strong>
      </p>
      <svg
        aria-label="O'qish vaqti"
        className={styles.lineChart}
        viewBox={"0 0 " + CHART_WIDTH + " " + LINE_HEIGHT}
      >
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={line}
            stroke="#ECEAF6"
            strokeOpacity=".5"
            x1="0"
            x2={CHART_WIDTH}
            y1={14 + line * 33.5}
            y2={14 + line * 33.5}
          />
        ))}
        <path
          className={styles.linePath}
          d={smoothPath(coordinates)}
          fill="none"
          key={period}
          stroke="#776ee2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        {coordinates.map((coordinate, index) =>
          points[index]!.minutes > 0 ? (
            <circle
              cx={coordinate.x}
              cy={coordinate.y}
              fill="#776ee2"
              key={points[index]!.date}
              r="3"
            />
          ) : null,
        )}
        {labels.map((index) =>
          points[index] ? (
            <text
              fill="#55555F"
              fontSize="10"
              fontWeight="600"
              key={points[index]!.date}
              textAnchor="middle"
              x={coordinates[index]!.x}
              y="178"
            >
              {points[index]!.label}
            </text>
          ) : null,
        )}
      </svg>
      <div className={styles.range}>
        <span>{rangeStart}</span>
        <span>{rangeEnd}</span>
      </div>
    </StatsCard>
  );
}

function total(point: VolumePoint) {
  return ALL_CATEGORIES.reduce(
    (sum, category) => sum + (point[category] ?? 0),
    0,
  );
}

function StudyVolumeChart({ request }: { request: AuthenticatedRequest }) {
  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [points, setPoints] = useState<VolumePoint[]>([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getPeriod(request, period)
      .then((data) => {
        if (!active) return;
        setPoints(data.studyVolume.points);
        setAverage(data.studyVolume.avgPerDay);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [period, request]);

  const maximum = Math.max(1, ...points.map(total));
  const labels = visibleLabels(period, points.length);
  const prefix = {
    week: "Oxirgi haftada kuniga o'rtacha ",
    month: "Oxirgi oyda kuniga o'rtacha ",
    year: "Oxirgi yilda kuniga o'rtacha ",
    all: "Butun davr uchun kuniga o'rtacha ",
  }[period];

  return (
    <StatsCard>
      <div className={styles.controls}>
        <PeriodSelector onChange={setPeriod} value={period} />
        {loading ? <Spinner compact /> : null}
      </div>
      <h3>O&apos;qish hajmi</h3>
      <p className={styles.subtitle}>
        {average > 0 ? (
          <>
            {prefix}<strong>{average} ta</strong> savol yechdingiz.
          </>
        ) : (
          "Hali o'qish yozuvi yo'q."
        )}
      </p>
      <div className={styles.legend}>
        {ALL_CATEGORIES.map((category) => (
          <span key={category}>
            <i style={{ backgroundColor: CATEGORY_COLORS[category] }} />
            {CATEGORY_LABELS[category]}
          </span>
        ))}
      </div>
      <div className={styles.barChart} style={{ height: BAR_HEIGHT }}>
        {points.map((point, index) => {
          const pointTotal = total(point);
          return (
            <span className={styles.barSlot} key={period + "-" + point.date}>
              {pointTotal === 0 ? (
                <i className={styles.emptyBar} />
              ) : (
                <i
                  className={styles.stack}
                  style={
                    {
                      height: (pointTotal / maximum) * 100 + "%",
                      "--bar-delay": index * 40 + "ms",
                    } as CSSProperties
                  }
                >
                  {ALL_CATEGORIES.map((category) =>
                    point[category] > 0 ? (
                      <b
                        key={category}
                        style={{
                          backgroundColor: CATEGORY_COLORS[category],
                          flexGrow: point[category],
                        }}
                      />
                    ) : null,
                  )}
                </i>
              )}
              {labels.includes(index) ? <small>{point.label}</small> : null}
            </span>
          );
        })}
      </div>
    </StatsCard>
  );
}

export function HistoryCharts({
  days,
  request,
}: {
  days: HeatmapDay[];
  request: AuthenticatedRequest;
}) {
  return (
    <>
      <YearlyHeatmap days={days} />
      <StudyTimeChart request={request} />
      <StudyVolumeChart request={request} />
    </>
  );
}
