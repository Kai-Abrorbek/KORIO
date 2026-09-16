"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  PERIOD_LABELS,
  type StatsTab,
  type StudyPeriod,
} from "../model/stats";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { CategoryView } from "./category-view";
import { PeriodView } from "./period-view";
import styles from "./stats-screen.module.css";

export type AuthenticatedRequest = <T>(
  path: string,
  init?: RequestInit,
) => Promise<T>;

const PERIODS: StudyPeriod[] = ["week", "month", "year", "all"];

export function Spinner({ compact = false }: { compact?: boolean }) {
  return <i className={compact ? styles.spinnerSmall : styles.spinner} />;
}

export function StatsCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={styles.card + (className ? " " + className : "")}>
      {children}
    </section>
  );
}

export function PeriodSelector({
  onChange,
  value,
}: {
  onChange: (period: StudyPeriod) => void;
  value: StudyPeriod;
}) {
  return (
    <div className={styles.periodSelector}>
      {PERIODS.map((period) => (
        <button
          className={value === period ? styles.periodActive : ""}
          key={period}
          onClick={() => onChange(period)}
          type="button"
        >
          {PERIOD_LABELS[period]}
        </button>
      ))}
    </div>
  );
}

function BottomTabs() {
  const router = useRouter();
  return (
    <nav aria-label="Asosiy navigatsiya" className={styles.bottomNav}>
      <button onClick={() => router.push("/home")} type="button">
        <MobileIcon name="home" size={23} />
        <span>Asosiy</span>
      </button>
      <button aria-current="page" className={styles.navActive} type="button">
        <MobileIcon name="bar-chart" size={23} />
        <span>Statistika</span>
      </button>
      <button type="button">
        <MobileIcon name="trophy-outline" size={23} />
        <span>Liga</span>
      </button>
      <button onClick={() => router.push("/premium")} type="button">
        <MobileIcon name="ribbon-outline" size={23} />
        <span>Premium</span>
      </button>
    </nav>
  );
}

function TopTabs({
  onChange,
  value,
}: {
  onChange: (value: StatsTab) => void;
  value: StatsTab;
}) {
  return (
    <div className={styles.topTabs}>
      <div>
        <button onClick={() => onChange("period")} type="button">
          <span className={value === "period" ? styles.topTabActive : ""}>
            Davriy
          </span>
        </button>
        <button onClick={() => onChange("category")} type="button">
          <span className={value === "category" ? styles.topTabActive : ""}>
            Toifa
          </span>
        </button>
      </div>
      <i
        className={styles.topIndicator}
        style={{
          transform:
            "translateX(" + (value === "period" ? 0 : 70) + "px)",
        }}
      />
    </div>
  );
}

export function StatsScreen() {
  const { request } = useTelegramAuth();
  const [tab, setTab] = useState<StatsTab>("period");
  return (
    <main className={styles.statsPage}>
      <TopTabs onChange={setTab} value={tab} />
      <div className={styles.scroll}>
        {tab === "period" ? (
          <PeriodView request={request} />
        ) : (
          <CategoryView request={request} />
        )}
      </div>
      <BottomTabs />
    </main>
  );
}
