"use client";

import type { CSSProperties } from "react";

import { HomeIcon } from "../../home/ui/home-icon";
import { LearningIcon } from "../../learning/ui/learning-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { RoadmapNode, RoadmapUnit } from "../model/roadmap";
import styles from "../../study-path/ui/study-path.module.css";

export function RoadmapNodeIcon({ node }: { node: RoadmapNode }) {
  if (node.type === "hangul" || node.iconName === "language") {
    return <LearningIcon name="text" size={27} />;
  }
  if (node.iconName === "headset") {
    return <LearningIcon name="headset" size={27} />;
  }
  if (node.iconName === "book") return <LearningIcon name="book" size={27} />;
  if (node.iconName === "construct") {
    return <LearningIcon name="construct" size={27} />;
  }
  if (node.iconName === "flag") return <HomeIcon name="ribbon" size={27} />;
  if (node.iconName === "refresh") return <HomeIcon name="refresh" size={27} />;
  if (node.iconName === "create" || node.iconName === "pencil") {
    return <MobileIcon name="create-outline" size={27} />;
  }
  return <HomeIcon name="sparkles" size={27} />;
}

export function RoadmapBanner({
  onOpen,
  unit,
}: {
  onOpen: () => void;
  unit: RoadmapUnit;
}) {
  return (
    <section
      className={styles.roadmapBanner}
      style={{ "--banner-color": unit.color } as CSSProperties}
    >
      <button onClick={onOpen} type="button">
        <span className={styles.mapBadge}>⌁</span>
        <span>
          <small>
            Bo&apos;lim {unit.sectionNumber}, Birlik {unit.unitNumber}
          </small>
          <strong>{unit.title}</strong>
        </span>
      </button>
      <button aria-label="Barcha bo'limlar" onClick={onOpen} type="button">
        <LearningIcon name="book" size={24} />
      </button>
    </section>
  );
}

interface RoadmapPopoverProps {
  canJump: boolean;
  node: RoadmapNode;
  onClaim: () => void;
  onClose: () => void;
  onJump: () => void;
  onLegend: () => void;
  onReview: () => void;
  onStart: () => void;
  unit: RoadmapUnit;
}

export function RoadmapPopover({
  canJump,
  node,
  onClaim,
  onClose,
  onJump,
  onLegend,
  onReview,
  onStart,
  unit,
}: RoadmapPopoverProps) {
  const popupStyle = { "--node-color": unit.color } as CSSProperties;
  const lockedClass =
    node.status === "completed" ? "" : styles.roadmapPopoverLocked;

  if (node.type === "score") {
    return (
      <article
        className={`${styles.roadmapPopover} ${lockedClass}`}
        style={popupStyle}
      >
        <span className={styles.popoverArrow} />
        <strong>Daraja - {node.scoreValue ?? 0} takrorlash</strong>
        <p>
          {node.status === "completed"
            ? "Barcha Legend bosqichlarini tugatib, yakuniy sovrinni qo'lga kiriting!"
            : "Bu bo'limni tugatsangiz ochiladi."}
        </p>
        {node.status === "completed" ? (
          <button className={styles.legendAction} onClick={onLegend} type="button">
            Legend bosqichiga o&apos;tish
          </button>
        ) : null}
      </article>
    );
  }

  if (node.type === "chest") {
    return (
      <article
        className={`${styles.roadmapPopover} ${
          node.chestClaimable ? styles.chestPopover : styles.roadmapPopoverLocked
        }`}
        style={popupStyle}
      >
        <span className={styles.popoverArrow} />
        {node.chestClaimable ? (
          <>
            <strong>Sizni mukofot kutmoqda!</strong>
            <button className={styles.legendAction} onClick={onClaim} type="button">
              Sandiqni ochish
            </button>
          </>
        ) : (
          <p>Bu bo&apos;limni tugatsangiz, olmos olasiz!</p>
        )}
      </article>
    );
  }

  if (node.status === "locked") {
    return (
      <article
        className={`${styles.roadmapPopover} ${styles.roadmapPopoverLocked}`}
        style={popupStyle}
      >
        <span className={styles.popoverArrow} />
        <strong>{unit.title}</strong>
        <p>
          {canJump
            ? "Bu testdan o'tsangiz, shu yerga o'tishingiz mumkin!"
            : "Ushbu darajani ochish uchun avvalgi darajalarni tugating!"}
        </p>
        <button
          className={canJump ? styles.jumpTestAction : styles.lockedAction}
          onClick={canJump ? onJump : onClose}
          type="button"
        >
          {canJump ? "Testni boshlash" : "Yopiq"}
        </button>
      </article>
    );
  }

  const completed = node.status === "completed";
  const legend = Boolean(node.legendCompleted);
  return (
    <article
      className={`${styles.roadmapPopover} ${legend ? styles.legendPopover : ""}`}
      style={popupStyle}
    >
      <span className={styles.popoverArrow} />
      <strong>{node.title || unit.title}</strong>
      <p>
        {legend
          ? "Siz bu darajada afsona darajasiga yetdingiz!"
          : completed
            ? "Legend darajasiga yetib, mahoratingizni isbotlang."
            : `Dars ${node.completedLessons ?? 0}/${node.totalLessons ?? 1}`}
      </p>
      {completed ? (
        <>
          <button className={styles.reviewAction} onClick={onReview} type="button">
            Takrorlash <span>⚡ 5 XP</span>
          </button>
          {!legend ? (
            <button className={styles.legendAction} onClick={onLegend} type="button">
              Legend <span>⚡ 40 XP</span>
            </button>
          ) : null}
        </>
      ) : (
        <button className={styles.reviewAction} onClick={onStart} type="button">
          Davom etish <span>⚡ {node.xpReward ?? 0} XP</span>
        </button>
      )}
    </article>
  );
}
