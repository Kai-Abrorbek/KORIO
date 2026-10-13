"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import {
  PERIOD_LABELS,
  type StatsTab,
  type StudyPeriod,
} from "../model/stats";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { SwipePager } from "../../../shared/ui/swipe-pager";
import { CategoryView } from "./category-view";
import { PeriodView } from "./period-view";
import styles from "./stats-screen.module.css";

export type AuthenticatedRequest = <T>(
  path: string,
  init?: RequestInit,
) => Promise<T>;

const PERIODS: StudyPeriod[] = ["week", "month", "year", "all"];
/** 상단 탭 순서 = 옆으로 넘기는 순서 */
const TABS: StatsTab[] = ["period", "category"];

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
      <button onClick={() => router.push("/league")} type="button">
        <MobileIcon name="trophy" size={23} />
        <span>Liga</span>
      </button>
      <button onClick={() => router.push("/premium")} type="button">
        <MobileIcon name="ribbon" size={23} />
        <span>Premium</span>
      </button>
    </nav>
  );
}

/** 두 탭 글자의 자리·폭 — 밑줄이 그 사이를 미는 만큼 옮겨 간다 (언어마다 글자 길이가 달라서 잰다) */
function useTabMarks() {
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    const measure = () => {
      const first = firstRef.current;
      const second = secondRef.current;
      if (!first || !second) return;
      setMarks({
        "--tab-w0": first.offsetWidth + "px",
        "--tab-w1": second.offsetWidth + "px",
        "--tab-x0": first.offsetLeft + "px",
        "--tab-x1": second.offsetLeft + "px",
      } as CSSProperties);
    };
    measure();
    // 번역이 붙거나 폰트가 늦게 오면 글자 폭이 바뀐다 (인라인 span 은 관찰이 안 돼서 버튼을 본다)
    const observer = new ResizeObserver(measure);
    for (const label of [firstRef.current, secondRef.current]) {
      if (label?.parentElement) observer.observe(label.parentElement);
    }
    return () => observer.disconnect();
  }, []);

  return { firstRef, marks, secondRef };
}

function TopTabs({
  onChange,
  value,
}: {
  onChange: (value: StatsTab) => void;
  value: StatsTab;
}) {
  const { firstRef, marks, secondRef } = useTabMarks();
  return (
    <div className={styles.topTabs} style={marks}>
      <div>
        <button onClick={() => onChange("period")} type="button">
          <span className={value === "period" ? styles.topTabActive : ""} ref={firstRef}>
            Davriy
          </span>
        </button>
        <button onClick={() => onChange("category")} type="button">
          <span className={value === "category" ? styles.topTabActive : ""} ref={secondRef}>
            Toifa
          </span>
        </button>
      </div>
      <i className={styles.topIndicator} />
    </div>
  );
}

export function StatsScreen() {
  const { request } = useTelegramAuth();
  const [tab, setTab] = useState<StatsTab>("period");
  const mainRef = useRef<HTMLElement>(null);

  // 밀고 있는 위치를 상단 탭 밑줄·글자색에 바로 넘긴다 (매 프레임이라 리렌더 없이 style 로)
  const handleProgress = useCallback((progress: number, dragging: boolean) => {
    const main = mainRef.current;
    if (!main) return;
    main.style.setProperty("--tab-progress", String(progress));
    main.toggleAttribute("data-swiping", dragging);
  }, []);

  return (
    <main className={styles.statsPage} ref={mainRef}>
      <TopTabs onChange={setTab} value={tab} />
      <SwipePager
        index={TABS.indexOf(tab)}
        onIndexChange={(next) => setTab(TABS[next] ?? "period")}
        onProgress={handleProgress}
        paneClassName={styles.pane}
        pages={[
          <PeriodView key="period" request={request} />,
          <CategoryView key="category" request={request} />,
        ]}
      />
      <BottomTabs />
    </main>
  );
}
