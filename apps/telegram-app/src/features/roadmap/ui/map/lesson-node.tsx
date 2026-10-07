import type { CSSProperties } from "react";

import { hasIonicon, type IoniconName } from "../../../../shared/ui/mobile-icon";
import type { RoadmapNodeStatus, RoadmapNodeType } from "../../model/roadmap";
import { darken } from "./color";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/** 노드 종류별 기본 아이콘 (앱 LessonNode ICON_MAP). 서버 iconName 이 있으면 그게 먼저다 */
const ICON_MAP: Record<RoadmapNodeType, IoniconName> = {
  boss: "trophy",
  chest: "gift",
  hangul: "language",
  headphone: "headset",
  "play-forward": "play-forward",
  review: "refresh",
  score: "trophy",
  speech: "flag",
  star: "star",
};

const RING_SIZE = 102;
const STROKE = 9;
const R = (RING_SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const GAP = (20 / 360) * C;

/** 현재 노드 둘레의 진행 링 — 레슨 수만큼 칸을 나눠 끝낸 칸만 진하게 (앱 AnimatedNodeRing) */
function NodeRing({ color, completed, total }: { color: string; completed: number; total: number }) {
  const count = Math.max(1, total);
  const arc = (C - GAP * count) / count;
  return (
    <svg aria-hidden="true" className={styles.ring} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} width={RING_SIZE}>
      {Array.from({ length: count }, (_, index) => (
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          fill="none"
          key={index}
          opacity={index < completed ? 1 : 0.5}
          r={R}
          stroke={color}
          strokeDasharray={`${arc} ${C - arc}`}
          strokeDashoffset={-index * (arc + GAP)}
          strokeLinecap="round"
          strokeWidth={STROKE}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      ))}
    </svg>
  );
}

/**
 * 로드맵 노드 하나 (앱 LessonNode).
 * 입체 원판(그림자·두께·윗면 광택) + 상태별 색 + 아이콘. 현재 노드는 진행 링·둥실·반짝이,
 * 완료 노드는 가끔 광택이 지나간다.
 */
export function LessonNode({
  completedSteps = 0,
  hideRing = false,
  iconName,
  index,
  isLegendDone = false,
  onPress,
  status,
  totalSteps = 2,
  type,
  unitColor,
  label,
}: {
  completedSteps?: number;
  hideRing?: boolean;
  iconName?: string;
  index: number;
  isLegendDone?: boolean;
  onPress: () => void;
  status: RoadmapNodeStatus;
  totalSteps?: number;
  type: RoadmapNodeType;
  unitColor: string;
  label: string;
}) {
  const isCurrent = status === "current";
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  let main = unitColor;
  let dark = darken(unitColor, 40);
  let icon = "#fff";
  if (isLocked && index !== 0) {
    main = "var(--locked-main)";
    dark = "var(--locked-dark)";
    icon = "var(--muted)";
  }
  if (isLegendDone && !isLocked) {
    main = "#FFD900";
    dark = "#E5AE00";
    icon = "#8A6D00";
  }

  const name: IoniconName = isLegendDone
    ? "star"
    : hasIonicon(iconName)
      ? iconName
      : ICON_MAP[type];
  const iconSize = type === "chest" || type === "boss" ? 34 : 30;
  // 노드마다 흔들·광택 박자를 엇갈리게 (한꺼번에 움직이면 기계 같다)
  const seed = (index * 37) % 10;
  const style = {
    "--dark": dark,
    "--icon": icon,
    "--main": main,
    "--shine-cycle": `${3.5 + seed * 0.25}s`,
    "--shine-delay": `${seed * 0.4}s`,
    "--wiggle-cycle": `${4 + seed * 0.4}s`,
    "--wiggle-delay": `${seed * 0.3}s`,
  } as CSSProperties;

  return (
    <div className={styles.lessonNode} style={style}>
      {/* 링은 진행도다. 한 조각짜리 링은 아무것도 알려주지 않으므로 그리지 않는다 */}
      {isCurrent && !hideRing && totalSteps > 1 ? (
        <NodeRing color={unitColor} completed={completedSteps} total={totalSteps} />
      ) : null}

      <button aria-label={label} className={styles.nodeButton} onClick={onPress} type="button">
        <i className={styles.ground} />
        {!isLocked ? <i className={styles.aura} /> : null}
        <i className={styles.depth} />
        <span className={styles.faceWrap}>
          <span className={`${styles.floatWrap} ${isCurrent ? styles.floating : ""}`}>
          <span className={`${styles.face} ${!isLocked ? styles.wiggle : ""}`}>
            <i className={styles.lowerShade} />
            <i className={styles.innerBorder} />
            {!isLocked ? <i className={styles.gloss} /> : null}
            {isCompleted ? <i className={styles.shine} /> : null}

            {/* 잠긴 노드도 자기 아이콘을 보여준다 (흐리게). 유닛 첫 노드만 "여기서 시작" 재생 아이콘 */}
            <span className={`${styles.nodeIcon} ${isLocked && index !== 0 ? styles.nodeIconLocked : ""}`}>
              {isLocked && index === 0 ? (
                <AppIcon name="play-forward" size={iconSize + 1} />
              ) : type === "chest" ? (
                <AppIcon family="material-community" name="treasure-chest" size={iconSize + 4} />
              ) : (
                <AppIcon name={name} size={isLocked ? iconSize - 3 : iconSize} />
              )}
            </span>

            {isCurrent ? (
              <>
                <i className={`${styles.spark} ${styles.sparkTR}`}>✦</i>
                <i className={`${styles.spark} ${styles.sparkBL}`}>✦</i>
              </>
            ) : null}
          </span>
          </span>
        </span>
      </button>
    </div>
  );
}
