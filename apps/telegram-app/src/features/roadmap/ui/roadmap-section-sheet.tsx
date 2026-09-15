"use client";

import { useEffect, type CSSProperties } from "react";

import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { STUDY_PATH_COLORS } from "../../study-path/model/study-path";
import type { RoadmapScoreResponse } from "../model/roadmap";
import styles from "../../study-path/ui/study-path.module.css";

interface RoadmapSectionSheetProps {
  currentScore: number;
  onClose: () => void;
  onJump: (section: number, firstUnit: number) => void;
  onOpen: (section: number) => void;
  score: RoadmapScoreResponse | null;
  viewingSection?: number;
}

export function RoadmapSectionSheet({
  currentScore,
  onClose,
  onJump,
  onOpen,
  score,
  viewingSection,
}: RoadmapSectionSheetProps) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.roadmapSheetBackdrop} onClick={onClose} role="presentation">
      <section
        aria-label="Barcha bo'limlar"
        aria-modal="true"
        className={styles.roadmapSheet}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className={styles.sheetGrip} />
        <header>
          <h2>Barcha bo&apos;limlar</h2>
          <button aria-label="Yopish" onClick={onClose} type="button">
            ×
          </button>
        </header>
        <div className={styles.sectionRows}>
          {score ? (
            score.milestones.length > 0 ? (
              score.milestones.map((milestone, index) => {
                const color =
                  STUDY_PATH_COLORS[index % STUDY_PATH_COLORS.length] ??
                  "#776ee2";
                const completed = milestone.status === "completed";
                const current = milestone.status === "current";
                const locked = !completed && !current;
                const start = milestone.startScore ?? 0;
                const done = Math.max(
                  0,
                  Math.min(milestone.units, currentScore - start),
                );
                const progress =
                  milestone.units > 0 ? (done / milestone.units) * 100 : 0;
                return (
                  <button
                    className={
                      viewingSection === milestone.section
                        ? styles.sectionViewing
                        : ""
                    }
                    key={milestone.section}
                    onClick={() =>
                      locked
                        ? onJump(milestone.section, milestone.firstUnit ?? 1)
                        : onOpen(milestone.section)
                    }
                    style={{ "--section-color": color } as CSSProperties}
                    type="button"
                  >
                    <span className={styles.sectionIcon}>
                      {locked ? (
                        <LearningIcon name="lock" size={18} />
                      ) : completed ? (
                        <HomeIcon name="check" size={19} />
                      ) : (
                        <HomeIcon name="sparkles" size={19} />
                      )}
                    </span>
                    <span>
                      <strong>
                        {milestone.title || `Bo'lim ${milestone.section}`}
                      </strong>
                      {current ? (
                        <>
                          <i>
                            <b style={{ width: `${progress}%` }} />
                          </i>
                          <small>
                            {done} / {milestone.units} bo&apos;lim tugadi
                          </small>
                        </>
                      ) : (
                        <small>
                          {completed
                            ? `${milestone.units} bo'lim tugadi · qayta ko'rish uchun bosing`
                            : "Testdan o'tib, darrov o'tib ketishingiz mumkin"}
                        </small>
                      )}
                    </span>
                    <HomeIcon
                      name={completed ? "check" : "chevron"}
                      size={19}
                    />
                  </button>
                );
              })
            ) : (
              <p className={styles.sectionEmpty}>
                Hozircha bo&apos;lim ma&apos;lumoti yo&apos;q
              </p>
            )
          ) : (
            <p className={styles.sectionEmpty}>Yuklanmoqda…</p>
          )}
        </div>
      </section>
    </div>
  );
}
