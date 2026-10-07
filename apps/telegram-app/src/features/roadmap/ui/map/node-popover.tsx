import type { CSSProperties, ReactNode } from "react";

import { uzt } from "../../../../shared/i18n/uz-text";
import type { RoadmapNode, RoadmapUnit } from "../../model/roadmap";
import { darken } from "./color";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

const LEGEND_GOLD = "#FFD900";
const LEGEND_INK = "#8A6D00";

function Bubble({
  arrowX,
  bg,
  children,
  locked = false,
  shadow,
}: {
  arrowX: number;
  bg?: string;
  children: ReactNode;
  locked?: boolean;
  shadow?: string;
}) {
  const style = {
    "--arrow-x": `${arrowX}px`,
    ...(bg ? { "--bubble": bg } : {}),
    ...(shadow ? { "--bubble-shadow": shadow } : {}),
  } as CSSProperties;
  return (
    <div
      className={`${styles.bubble} ${locked ? styles.bubbleLocked : ""}`}
      data-node-popover
      onClick={(event) => event.stopPropagation()}
      style={style}
    >
      <i className={styles.arrow} />
      {children}
    </div>
  );
}

function Xp({ amount, color }: { amount: number; color: string }) {
  return (
    <em style={{ color }}>
      <AppIcon name="flash" size={15} />
      <span data-no-translate>{amount} XP</span>
    </em>
  );
}

/**
 * 노드를 누르면 아래로 펼쳐지는 말풍선 (앱 NodePopover).
 * 스코어 · 상자(받기/안내) · 잠금(건너뛰기 테스트) · 레전드 완료 · 완료(복습+레전드) · 진행 중(계속하기).
 */
export function NodePopover({
  canJump,
  node,
  onClaimChest,
  onClose,
  onGoLegend,
  onJumpTest,
  onLegend,
  onReview,
  onStart,
  triangleOffsetX,
  unit,
}: {
  canJump: boolean;
  node: RoadmapNode;
  onClaimChest: () => void;
  onClose: () => void;
  onGoLegend: () => void;
  onJumpTest: () => void;
  onLegend: () => void;
  onReview: () => void;
  onStart: () => void;
  triangleOffsetX: number;
  unit: RoadmapUnit;
}) {
  const unitStyle = { "--unit": unit.color } as CSSProperties;

  if (node.type === "score") {
    const done = node.status === "completed";
    return (
      <Bubble arrowX={triangleOffsetX} bg={done ? unit.color : "var(--locked-main)"} shadow={done ? darken(unit.color, 60) : "#000"}>
        <strong className={styles.bubbleTitle}>{uzt("roadmap.scoreReview", { score: node.scoreValue ?? 0 })}</strong>
        <span className={styles.bubbleSub} style={{ opacity: 0.85 }}>
          {done ? uzt("roadmap.scoreDesc") : uzt("roadmap.scoreLocked")}
        </span>
        {done ? (
          <button className={styles.ctaBtn} onClick={onGoLegend} type="button">
            <i />
            <span>{uzt("roadmap.goToLegend")}</span>
          </button>
        ) : null}
      </Bubble>
    );
  }

  if (node.type === "chest") {
    if (node.chestClaimable) {
      return (
        <Bubble arrowX={triangleOffsetX} bg={LEGEND_GOLD} shadow="#E5AE00">
          <strong className={styles.bubbleTitle} style={{ color: "#7A5C00" }}>
            {uzt("roadmap.chestReady")}
          </strong>
          <button className={styles.ctaBtn} onClick={onClaimChest} type="button">
            <i />
            <span>{uzt("roadmap.chestOpen")}</span>
          </button>
        </Bubble>
      );
    }
    return (
      <Bubble arrowX={triangleOffsetX} locked>
        <span className={styles.lockedText}>{uzt("roadmap.chestHint")}</span>
      </Bubble>
    );
  }

  if (node.status === "locked") {
    return (
      <Bubble arrowX={triangleOffsetX} locked>
        <strong className={styles.lockedTitle}>{unit.title}</strong>
        <span className={styles.lockedText}>
          {canJump ? uzt("roadmap.jumpDescription") : uzt("roadmap.lockedDescription")}
        </span>
        {canJump ? (
          <button className={`${styles.popBtn} ${styles.jumpTestBtn}`} onClick={onJumpTest} type="button">
            {uzt("roadmap.jumpStart")}
          </button>
        ) : (
          <button className={`${styles.popBtn} ${styles.lockedBtn}`} onClick={onClose} type="button">
            {uzt("roadmap.locked")}
          </button>
        )}
      </Bubble>
    );
  }

  if (node.status === "completed" && node.legendCompleted) {
    return (
      <Bubble arrowX={triangleOffsetX} bg={LEGEND_GOLD} shadow="#E5AE00">
        <strong className={styles.bubbleTitle} style={{ color: LEGEND_INK }}>
          {unit.title}
        </strong>
        <span className={styles.bubbleSub} style={{ color: LEGEND_INK, opacity: 0.8 }}>
          {uzt("roadmap.legendDone")}
        </span>
        <button
          className={`${styles.popBtn} ${styles.reviewBtn}`}
          onClick={onReview}
          style={{ color: LEGEND_INK, marginBottom: 0 }}
          type="button"
        >
          {uzt("roadmap.review")}
          <Xp amount={5} color={LEGEND_INK} />
        </button>
      </Bubble>
    );
  }

  if (node.status === "completed") {
    return (
      <Bubble arrowX={triangleOffsetX} bg={unit.color} shadow={darken(unit.color, 60)}>
        <strong className={styles.bubbleTitle}>{unit.title}</strong>
        <span className={styles.bubbleSub}>{uzt("roadmap.legendSubtitle")}</span>
        <button className={`${styles.popBtn} ${styles.reviewBtn}`} onClick={onReview} style={unitStyle} type="button">
          {uzt("roadmap.review")}
          <Xp amount={5} color={unit.color} />
        </button>
        <button className={`${styles.popBtn} ${styles.legendBtn}`} onClick={onLegend} type="button">
          {uzt("roadmap.legend")}
          <Xp amount={40} color={LEGEND_INK} />
        </button>
      </Bubble>
    );
  }

  return (
    <Bubble arrowX={triangleOffsetX} bg={unit.color} shadow={darken(unit.color, 60)}>
      <strong className={styles.bubbleTitle}>{unit.title}</strong>
      <span className={styles.bubbleSub}>
        {uzt("roadmap.lessonProgress", {
          current: node.completedLessons ?? 0,
          total: node.totalLessons ?? 4,
        })}
      </span>
      <button className={`${styles.popBtn} ${styles.continueBtn}`} onClick={onStart} style={unitStyle} type="button">
        {uzt("roadmap.continue")}
        <em style={{ color: unit.color }}>
          <AppIcon name="flash" size={16} />
          <span data-no-translate>{node.xpReward ?? 0} XP</span>
        </em>
      </button>
    </Bubble>
  );
}
