"use client";

import { useEffect, useState } from "react";

import { getStudyPath } from "../../study-path/api/study-path";
import type {
  StudyNodeKind,
  StudyPathResponse,
} from "../../study-path/model/study-path";
import {
  MobileIcon,
  type IoniconName,
} from "../../../shared/ui/mobile-icon";
import {
  Spinner,
  StatsCard,
  type AuthenticatedRequest,
} from "./stats-screen";
import styles from "./study-path-progress-card.module.css";

interface Progress {
  done: number;
  total: number;
}

const percent = (progress: Progress) =>
  progress.total > 0
    ? Math.round((progress.done / progress.total) * 100)
    : 0;

const GROUPS: Array<{
  color: string;
  icon: IoniconName;
  id: "words" | "grammar" | "review" | "quiz" | "final";
  kinds: StudyNodeKind[];
}> = [
  { id: "words", kinds: ["words"], color: "#A78BFA", icon: "book" },
  { id: "grammar", kinds: ["grammar"], color: "#7DC3F8", icon: "construct" },
  {
    id: "review",
    kinds: ["review", "recap"],
    color: "#7BD9A8",
    icon: "refresh",
  },
  {
    id: "quiz",
    kinds: ["vocabQuiz", "grammarQuiz"],
    color: "#F4B860",
    icon: "help-circle",
  },
  { id: "final", kinds: ["final"], color: "#F7A8C0", icon: "flag" },
];

const LABELS = {
  words: "So'zlar",
  grammar: "Grammatika",
  review: "Takrorlash",
  quiz: "Mashqlar",
  final: "Yakuniy",
};

export function StudyPathProgressCard({
  request,
}: {
  request: AuthenticatedRequest;
}) {
  const [data, setData] = useState<StudyPathResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void getStudyPath(request)
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
  }, [request]);

  if (loading && !data) {
    return (
      <StatsCard className={styles.loading}>
        <Spinner />
      </StatsCard>
    );
  }
  if (!data || data.days.length === 0) return null;

  const dayProgress = {
    done: data.days.filter((day) => day.status === "completed").length,
    total: data.days.length,
  };
  const dayPercent = percent(dayProgress);
  const sectionOrder: number[] = [];
  const bySection = new Map<number, Progress>();
  const byKind = new Map<StudyNodeKind, Progress>();

  for (const day of data.days) {
    if (!bySection.has(day.section)) {
      bySection.set(day.section, { done: 0, total: 0 });
      sectionOrder.push(day.section);
    }
    const section = bySection.get(day.section)!;
    section.total += 1;
    if (day.status === "completed") section.done += 1;

    for (const node of day.nodes) {
      const kind = byKind.get(node.kind) ?? { done: 0, total: 0 };
      const size = node.lessonCount > 0 ? node.lessonCount : 1;
      kind.total += size;
      kind.done += node.done ? size : Math.min(node.lessonsDone, size);
      byKind.set(node.kind, kind);
    }
  }

  const groups = GROUPS.map((group) => {
    const merged = group.kinds.reduce<Progress>(
      (value, kind) => {
        const progress = byKind.get(kind);
        if (progress) {
          value.done += progress.done;
          value.total += progress.total;
        }
        return value;
      },
      { done: 0, total: 0 },
    );
    return { ...group, ...merged };
  }).filter((group) => group.total > 0);

  let goalIcon: IoniconName = "flag";
  let goalColor = "#776ee2";
  let goalText = "Bu darajani tugatsangiz bitiruv imtihoni ochiladi";
  if (data.levelExam.passed) {
    goalIcon = "school";
    goalColor = "#1D9E75";
    goalText = data.nextLevel
      ? "Keyingi: " + data.nextLevel.title
      : "Bitiruv imtihoni topshirildi!";
  } else if (data.levelExam.available) {
    goalIcon = "school";
    goalColor = "#E2A83A";
    goalText = "Bitiruv imtihoni ochildi";
  }

  const radius = 54.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <StatsCard>
      <div className={styles.header}>
        <strong>O&apos;quv yo&apos;li</strong>
        <span>
          <MobileIcon name="ribbon" size={12} />
          {data.currentLevel}-daraja
        </span>
      </div>
      <div className={styles.ringRow}>
        <div className={styles.ring}>
          <svg aria-hidden="true" height="122" viewBox="0 0 122 122" width="122">
            <circle
              cx="61"
              cy="61"
              fill="none"
              r={radius}
              stroke="#ECEAF6"
              strokeWidth="11"
            />
            <circle
              className={styles.ringFill}
              cx="61"
              cy="61"
              fill="none"
              r={radius}
              stroke="#776ee2"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - dayPercent / 100)}
              strokeLinecap="round"
              strokeWidth="11"
              transform="rotate(-90 61 61)"
            />
          </svg>
          <span>
            <strong>{dayPercent}%</strong>
            <small>
              {dayProgress.done} / {dayProgress.total}
            </small>
          </span>
        </div>
        <div className={styles.summary}>
          <span>Tugatilgan kunlar</span>
          <strong>{dayProgress.done}</strong>
          <small>Hozir {data.currentSection}-bo&apos;lim</small>
          <div className={styles.goal} style={{ borderLeftColor: goalColor }}>
            <MobileIcon name={goalIcon} size={15} style={{ color: goalColor }} />
            <span>{goalText}</span>
          </div>
        </div>
      </div>

      <h3 className={styles.blockTitle}>BO&apos;LIMLAR BO&apos;YICHA</h3>
      <div className={styles.sectionRow}>
        {sectionOrder.map((number) => {
          const progress = bySection.get(number)!;
          const current = number === data.currentSection;
          return (
            <div key={number}>
              <span>
                <i
                  style={{
                    backgroundColor: current ? "#776ee2" : "#9C93EE",
                    width: percent(progress) + "%",
                  }}
                />
              </span>
              <small className={current ? styles.sectionActive : ""}>
                B{number}
              </small>
            </div>
          );
        })}
      </div>

      <h3 className={styles.blockTitle}>NIMANI QANCHA TUGATDINGIZ</h3>
      <div className={styles.kindList}>
        {groups.map((group) => (
          <div key={group.id}>
            <span
              className={styles.kindIcon}
              style={{
                backgroundColor: group.color + "22",
                color: group.color,
              }}
            >
              <MobileIcon name={group.icon} size={13} />
            </span>
            <strong>{LABELS[group.id]}</strong>
            <span className={styles.kindTrack}>
              <i
                style={{
                  backgroundColor: group.color,
                  width: Math.max(3, percent(group)) + "%",
                }}
              />
            </span>
            <b>
              {group.done}/{group.total}
            </b>
          </div>
        ))}
      </div>
    </StatsCard>
  );
}
