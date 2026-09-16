"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

import {
  type HeatmapDay,
  type PeriodStats,
  type StudyPeriod,
  type TodaySummary,
} from "../model/stats";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import { HistoryCharts } from "./history-charts";
import { SkillRadarCard } from "./skill-radar-card";
import { StudyPathProgressCard } from "./study-path-progress-card";
import {
  Spinner,
  StatsCard,
  type AuthenticatedRequest,
} from "./stats-screen";
import styles from "./period-view.module.css";

export function getPeriod(
  request: AuthenticatedRequest,
  range: StudyPeriod,
): Promise<PeriodStats> {
  return request<PeriodStats>(
    "/users/me/stats/period?lang=uz&range=" + range,
  );
}

function IconBadge({
  background,
  color,
  name,
  size = 44,
}: {
  background: string;
  color: string;
  name: IoniconName;
  size?: number;
}) {
  return (
    <span
      className={styles.iconBadge}
      style={{
        backgroundColor: background,
        color,
        height: size,
        width: size,
      }}
    >
      <MobileIcon name={name} size={size * 0.52} />
    </span>
  );
}

function TodayInfoCard({
  hasData,
  today,
}: {
  hasData: boolean;
  today: TodaySummary | null;
}) {
  const weekdays = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  return (
    <div>
      <h2 className={styles.sectionTitle}>Bugungi o&apos;qish ma&apos;lumotlari</h2>
      {!hasData || !today ? (
        <StatsCard className={styles.todayEmptyCard}>
          <div className={styles.todayEmpty}>
            <MobileIcon name="document-text-outline" size={32} />
            <strong>Bugun hali yozuvlar yo&apos;q!</strong>
            <span>Darsni yakunlaganingizdan keyin yozuvlarni ko&apos;ring.</span>
          </div>
        </StatsCard>
      ) : (
        <>
          <div className={styles.todayTopRow}>
            <StatsCard className={styles.todayTopCard}>
              <IconBadge
                background="#E9F2FB"
                color="#4A97E0"
                name="time-outline"
                size={40}
              />
              <span>Jami o&apos;qish vaqti</span>
              <strong>{today.studyTimeLabel}</strong>
            </StatsCard>
            <StatsCard className={styles.todayTopCard}>
              <IconBadge
                background="#FEF2DE"
                color="#F5A623"
                name="pencil"
                size={40}
              />
              <span>Jami mashqlar</span>
              <strong>{today.totalQuestions}</strong>
            </StatsCard>
          </div>
          <StatsCard>
            <div className={styles.weekdayRow}>
              <IconBadge
                background="rgba(119,110,226,.10)"
                color="#776ee2"
                name="calendar-clear"
              />
              <div>
                <strong>
                  Odatda {weekdays[today.weekdayIndex] ?? weekdays[0]} kuni?
                </strong>
                <p>
                  O&apos;rtacha {today.avgTimeLabel} davomida {today.avgProblems} ta
                  mashq bajarasiz.
                </p>
              </div>
            </div>
          </StatsCard>
        </>
      )}
    </div>
  );
}

const MOMENTUM_COLORS = ["", "#D9D5F7", "#B9B1F1", "#948AEA", "#6C5FE0"];

function MomentumCard({ days }: { days: HeatmapDay[] }) {
  const recent = useMemo(
    () => [...days].sort((a, b) => a.date.localeCompare(b.date)).slice(-14),
    [days],
  );
  if (recent.length < 8) return null;

  const half = Math.ceil(recent.length / 2);
  const previous = recent.slice(0, half);
  const current = recent.slice(half);
  const studied = (items: HeatmapDay[]) =>
    items.filter((item) => item.intensity > 0).length;
  const thisWeek = studied(current);
  const lastWeek = studied(previous);
  const delta = thisWeek - lastWeek;
  const icon: IoniconName =
    delta > 0 ? "trending-up" : delta < 0 ? "trending-down" : "remove";
  const color =
    delta > 0 ? "#1D9E75" : delta < 0 ? "#FF6B6B" : "#55555F";
  const text =
    delta > 0
      ? "O'tgan haftadan +" + delta + " kun"
      : delta < 0
        ? "O'tgan haftadan -" + Math.abs(delta) + " kun"
        : "O'tgan hafta bilan bir xil";

  return (
    <StatsCard>
      <div className={styles.momentumHeader}>
        <strong>Oxirgi 2 hafta</strong>
        <span style={{ color }}>
          <MobileIcon name={icon} size={14} />
          {text}
        </span>
      </div>
      <h3 className={styles.momentumBig}>
        Bu hafta {thisWeek} kun shug&apos;ullandingiz
      </h3>
      <div className={styles.momentumBars}>
        {recent.map((day, index) => (
          <span className={styles.momentumSlot} key={day.date}>
            {index === half ? <i className={styles.momentumDivider} /> : null}
            <i
              className={styles.momentumBar}
              style={{
                backgroundColor:
                  day.intensity > 0
                    ? MOMENTUM_COLORS[day.intensity]
                    : "#ECEAF6",
                height:
                  (day.intensity > 0
                    ? 22 + (day.intensity / 4) * 78
                    : 8) + "%",
                "--bar-delay": index * 35 + "ms",
              } as CSSProperties}
            />
          </span>
        ))}
      </div>
      <div className={styles.momentumFoot}>
        <span>O&apos;tgan hafta</span>
        <strong>Bu hafta</strong>
      </div>
    </StatsCard>
  );
}

export function PeriodView({ request }: { request: AuthenticatedRequest }) {
  const [data, setData] = useState<PeriodStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    void getPeriod(request, "week")
      .then((result) => {
        if (active) setData(result);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [request]);

  if (!loaded) {
    return (
      <div className={styles.pageLoading}>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <TodayInfoCard
        hasData={data?.todayHasData ?? false}
        today={data?.today ?? null}
      />
      <StudyPathProgressCard request={request} />
      <MomentumCard days={data?.heatmap ?? []} />
      <SkillRadarCard request={request} />
      <HistoryCharts days={data?.heatmap ?? []} request={request} />
    </div>
  );
}
