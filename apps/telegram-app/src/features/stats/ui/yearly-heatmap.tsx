"use client";

import { useMemo, useState } from "react";

import type { HeatmapDay } from "../model/stats";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { StatsCard } from "./stats-screen";
import styles from "./yearly-heatmap.module.css";

const ACTIVE_COLORS = ["#D9D2F5", "#B7ABEC", "#9587E0", "#776ee2"];
const MONTHS = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "No'y",
  "Dek",
];
const DAY_LABELS = ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"];

function dateKey(date: Date) {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

function yearStart(today: Date, offset: number) {
  return {
    year:
      (today.getMonth() >= 5
        ? today.getFullYear()
        : today.getFullYear() - 1) + offset,
    month: 5,
  };
}

function getMonths(start: { month: number; year: number }) {
  const months: Array<{ month: number; year: number }> = [];
  let year = start.year;
  let month = start.month;
  for (let index = 0; index < 12; index += 1) {
    months.push({ month, year });
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
  return months;
}

function MonthBlock({
  dateMap,
  month,
  today,
  year,
}: {
  dateMap: Map<string, number>;
  month: number;
  today: Date;
  year: number;
}) {
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return (
    <div className={styles.month}>
      <strong>{MONTHS[month]}</strong>
      <div>
        {Array.from({ length: 5 }, (_, column) => (
          <span key={column}>
            {Array.from({ length: 7 }, (__, row) => {
              const dayNumber = column * 7 + row - firstDay + 1;
              if (dayNumber < 1 || dayNumber > daysInMonth) {
                return <i key={row} />;
              }
              const date = new Date(year, month, dayNumber);
              const intensity = dateMap.get(dateKey(date)) ?? 0;
              return (
                <i
                  key={row}
                  style={{
                    backgroundColor:
                      date > today
                        ? "transparent"
                        : intensity === 0
                          ? "#ECEAF6"
                          : ACTIVE_COLORS[intensity - 1],
                  }}
                />
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeatmapRow({
  dateMap,
  months,
  today,
}: {
  dateMap: Map<string, number>;
  months: Array<{ month: number; year: number }>;
  today: Date;
}) {
  return (
    <div className={styles.row}>
      <span className={styles.days}>
        <i />
        {DAY_LABELS.map((day) => (
          <small key={day}>{day}</small>
        ))}
      </span>
      {months.map((month) => (
        <MonthBlock
          dateMap={dateMap}
          key={month.year + "-" + month.month}
          month={month.month}
          today={today}
          year={month.year}
        />
      ))}
    </div>
  );
}

export function YearlyHeatmap({ days }: { days: HeatmapDay[] }) {
  const [offset, setOffset] = useState(0);
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  const start = yearStart(today, offset);
  const months = getMonths(start);
  const dateMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const day of days) map.set(day.date, day.intensity);
    return map;
  }, [days]);

  return (
    <div>
      <h2 className={styles.sectionTitle}>Davriy o&apos;qish ma&apos;lumotlari</h2>
      <StatsCard>
        <div className={styles.header}>
          <strong>Yillik o&apos;qish</strong>
          <span>
            <button onClick={() => setOffset((value) => value - 1)} type="button">
              <MobileIcon name="chevron-back" size={18} />
            </button>
            <b>{offset === 0 ? "Yaqin" : start.year + "-" + (start.year + 1)}</b>
            <button
              disabled={offset >= 0}
              onClick={() => setOffset((value) => Math.min(0, value + 1))}
              type="button"
            >
              <MobileIcon name="chevron-forward" size={18} />
            </button>
          </span>
        </div>
        <div className={styles.legend}>
          <span>Less</span>
          {["#ECEAF6", ...ACTIVE_COLORS].map((color) => (
            <i key={color} style={{ backgroundColor: color }} />
          ))}
          <span>More</span>
        </div>
        <HeatmapRow
          dateMap={dateMap}
          months={months.slice(0, 6)}
          today={today}
        />
        <div className={styles.gap} />
        <HeatmapRow
          dateMap={dateMap}
          months={months.slice(6)}
          today={today}
        />
      </StatsCard>
    </div>
  );
}
