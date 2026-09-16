"use client";

import { useEffect, useState, type CSSProperties } from "react";

import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  CATEGORY_LIST,
  type CategoryChartPoint,
  type CategoryStats,
  type StudyCategory,
  type StudyPeriod,
} from "../model/stats";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import {
  PeriodSelector,
  Spinner,
  StatsCard,
  type AuthenticatedRequest,
} from "./stats-screen";
import styles from "./category-view.module.css";

function getCategory(
  request: AuthenticatedRequest,
  category: StudyCategory,
  range: StudyPeriod,
): Promise<CategoryStats> {
  return request<CategoryStats>(
    "/users/me/stats/category?category=" +
      category +
      "&lang=uz&range=" +
      range,
  );
}

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

function shade(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const dim = (channel: number) => Math.max(0, Math.round(channel * 0.72));
  const red = dim((value >> 16) & 255);
  const green = dim((value >> 8) & 255);
  const blue = dim(value & 255);
  return (
    "#" +
    ((1 << 24) | (red << 16) | (green << 8) | blue)
      .toString(16)
      .slice(1)
  );
}

function CategoryTabs({
  onChange,
  value,
}: {
  onChange: (category: StudyCategory) => void;
  value: StudyCategory;
}) {
  return (
    <div className={styles.tabs}>
      {CATEGORY_LIST.map((category) => {
        const active = category === value;
        const color = CATEGORY_COLORS[category];
        return (
          <button
            className={active ? styles.tabActive : ""}
            key={category}
            onClick={() => onChange(category)}
            style={
              active
                ? {
                    backgroundColor: color,
                    borderColor: color,
                    borderBottomColor: shade(color),
                  }
                : undefined
            }
            type="button"
          >
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}

function CategorySummary({
  category,
  stats,
}: {
  category: StudyCategory;
  stats: CategoryStats;
}) {
  const color = CATEGORY_COLORS[category];
  const tiles: Array<{
    background: string;
    icon: IoniconName;
    label: string;
    tint: string;
    value: string;
  }> = [
    {
      icon: "trophy",
      tint: "#F4B860",
      background: "#F4B86022",
      label: CATEGORY_LABELS[category] + " sovrini",
      value: stats.trophyLevel === null ? "--" : String(stats.trophyLevel),
    },
    {
      icon: "star",
      tint: "#7DC3F8",
      background: "#7DC3F822",
      label: "Jami mashqlar",
      value: String(stats.totalProblems),
    },
    {
      icon: "time",
      tint: "#F7A8C0",
      background: "#F7A8C022",
      label: "Bugungi o'qish vaqti",
      value: stats.todayTime,
    },
    {
      icon: "hourglass",
      tint: color,
      background: color + "22",
      label: "Jami o'qish vaqti",
      value: stats.totalTime,
    },
  ];
  return (
    <StatsCard className={styles.summary}>
      <i style={{ backgroundColor: color }} />
      <div>
        {tiles.map((tile) => (
          <span key={tile.label}>
            <i style={{ backgroundColor: tile.background, color: tile.tint }}>
              <MobileIcon name={tile.icon} size={15} />
            </i>
            <strong>{tile.value}</strong>
            <small>{tile.label}</small>
          </span>
        ))}
      </div>
    </StatsCard>
  );
}

function total(point: CategoryChartPoint) {
  return point.newWords + point.knownWords + point.reviewWords;
}

function Legend({
  color,
  label,
  outline = false,
  value,
}: {
  color: string;
  label: string;
  outline?: boolean;
  value: string;
}) {
  return (
    <span className={styles.legendRow}>
      <i
        style={
          outline
            ? { borderColor: color, backgroundColor: "transparent" }
            : { backgroundColor: color }
        }
      />
      <strong>{label}</strong>
      <b>{value}</b>
    </span>
  );
}

function StudyInfoChart({
  category,
  request,
}: {
  category: StudyCategory;
  request: AuthenticatedRequest;
}) {
  const [period, setPeriod] = useState<StudyPeriod>("week");
  const [data, setData] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getCategory(request, category, period)
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category, period, request]);

  if (!data) {
    return (
      <StatsCard>
        <PeriodSelector onChange={setPeriod} value={period} />
        <div className={styles.loading}>
          <Spinner />
        </div>
      </StatsCard>
    );
  }

  const color = CATEGORY_COLORS[category];
  const colors = {
    newWords: color,
    knownWords: color + "99",
    reviewWords: color + "4D",
    accuracy: color,
  };
  const maximum = Math.max(1, ...data.chart.map(total));
  const grandTotal = data.chart.reduce(
    (sum, point) => sum + total(point),
    0,
  );
  const labels = visibleLabels(period, data.chart.length);
  const today = new Date().toISOString().split("T")[0];
  const format = (value: number | null) =>
    value === null ? "-" : String(value);

  return (
    <StatsCard>
      <div className={styles.controls}>
        <PeriodSelector onChange={setPeriod} value={period} />
        {loading ? <Spinner compact /> : null}
      </div>
      <h3>O&apos;qish ma&apos;lumotlari</h3>
      <div className={styles.chart}>
        {data.chart.map((point, index) => {
          const pointTotal = total(point);
          const isToday =
            point.date === today || index === data.chart.length - 1;
          return (
            <span
              className={styles.barSlot}
              key={category + "-" + period + "-" + point.date}
            >
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
                  {(
                    [
                      ["newWords", point.newWords],
                      ["knownWords", point.knownWords],
                      ["reviewWords", point.reviewWords],
                    ] as const
                  ).map(([key, value]) =>
                    value > 0 ? (
                      <b
                        key={key}
                        style={{
                          backgroundColor: colors[key],
                          flexGrow: value,
                        }}
                      />
                    ) : null,
                  )}
                </i>
              )}
              {labels.includes(index) ? (
                <small className={isToday ? styles.labelActive : ""}>
                  {point.label}
                </small>
              ) : null}
            </span>
          );
        })}
      </div>
      <div className={styles.totals}>
        <div>
          <span>Total</span>
          <strong>{grandTotal}</strong>
        </div>
        <div>
          <Legend
            color={colors.newWords}
            label="Yangi so'zlar"
            value={format(data.newWordsToday)}
          />
          <Legend
            color={colors.knownWords}
            label="Bilingan so'zlar"
            value={format(data.knownWordsToday)}
          />
          <Legend
            color={colors.reviewWords}
            label="Takror so'zlar"
            value={format(data.reviewWordsToday)}
          />
          <Legend
            color={colors.accuracy}
            label="Takror to'g'rilik foizi"
            outline
            value={
              data.reviewAccuracy === null
                ? "-"
                : data.reviewAccuracy + "%"
            }
          />
        </div>
      </div>
    </StatsCard>
  );
}

export function CategoryView({ request }: { request: AuthenticatedRequest }) {
  const [category, setCategory] = useState<StudyCategory>("vocab");
  const [data, setData] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    void getCategory(request, category, "week")
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [category, request]);

  return (
    <div>
      <CategoryTabs onChange={setCategory} value={category} />
      {!data && loading ? (
        <div className={styles.pageLoading}>
          <Spinner />
        </div>
      ) : data ? (
        <>
          <CategorySummary category={category} stats={data} />
          <StudyInfoChart category={category} request={request} />
        </>
      ) : null}
    </div>
  );
}
