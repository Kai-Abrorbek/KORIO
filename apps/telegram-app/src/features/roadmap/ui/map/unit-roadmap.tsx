import type { ReactNode } from "react";

import { uzt } from "../../../../shared/i18n/uz-text";
import type { AvatarConfig } from "../../../../shared/model/avatar";
import type { RoadmapNode, RoadmapUnit } from "../../model/roadmap";
import { CharacterMarker } from "./character-marker";
import { darken } from "./color";
import { LessonNode } from "./lesson-node";
import styles from "./roadmap-map.module.css";
import { ScoreNode } from "./score-node";

/** 앱 UnitRoadmap 과 같은 배치 — 가운데에서 이만큼(px) 좌우로 지그재그 */
export const ZIGZAG_OFFSETS = [55, -20, -50, -10] as const;
const NODE_GAP = 50;
const NODE_SIZE = 72;
const NODE_WRAP_HEIGHT = NODE_SIZE + 8;
export const ROW_HEIGHT = NODE_WRAP_HEIGHT + NODE_GAP;
/** 길 SVG 폭 (가운데 기준) — CSS .route 와 같게 */
const ROUTE_WIDTH = 400;
const CENTER_X = ROUTE_WIDTH / 2;

export function zigzagOffset(index: number): number {
  return ZIGZAG_OFFSETS[index % ZIGZAG_OFFSETS.length] ?? 0;
}

type Point = { x: number; y: number };

function segment(from: Point, to: Point): string {
  const middle = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} C ${from.x} ${middle}, ${to.x} ${middle}, ${to.x} ${to.y}`;
}

export interface NodePopoverContext {
  node: RoadmapNode;
  unit: RoadmapUnit;
  index: number;
  triangleOffsetX: number;
  onClose: () => void;
}

/**
 * 유닛 하나의 지도 (앱 UnitRoadmap) — 제목 구분선 + 하얀 지도길 + 지그재그 노드.
 * 현재 노드 옆엔 내 아바타, 유닛 첫 노드가 잠겨 있으면 "여기로 건너뛸래요?" 말풍선.
 */
export function UnitRoadmap({
  avatar,
  directStart = false,
  hideNodeRing = false,
  customPopover = false,
  nodeLabel,
  onNodeStart,
  onNodeTap,
  renderPopover,
  selectedNodeId,
  unit,
}: {
  avatar?: Partial<AvatarConfig> | null;
  /** 열린 노드를 누르면 팝오버 없이 바로 시작 (문법 트랙) */
  directStart?: boolean;
  /** 노드 주변 진행 링을 감춘다 */
  hideNodeRing?: boolean;
  /**
   * 트랙 전용 말풍선을 쓰는 화면(학습 로드). 이때는 "여기로 건너뛸래요?" 가 없고,
   * 잠긴 첫 노드도 다른 잠긴 노드처럼 회색이다 (앱 usesCustomPopover)
   */
  customPopover?: boolean;
  nodeLabel?: (node: RoadmapNode) => string;
  onNodeStart?: (node: RoadmapNode) => void;
  onNodeTap: (nodeId: string) => void;
  renderPopover: (context: NodePopoverContext) => ReactNode;
  selectedNodeId: string | null;
  unit: RoadmapUnit;
}) {
  const points = unit.nodes.map((_, index) => ({
    x: CENTER_X + zigzagOffset(index),
    y: index * ROW_HEIGHT + NODE_WRAP_HEIGHT / 2,
  }));
  const fullPath = points
    .slice(1)
    .map((point, index) => segment(points[index] ?? point, point))
    .join(" ");
  const segments = points.slice(1).map((point, index) => ({
    active: unit.nodes[index]?.status !== "locked",
    d: segment(points[index] ?? point, point),
  }));
  const svgHeight = Math.max((unit.nodes.length - 1) * ROW_HEIGHT + NODE_WRAP_HEIGHT, 100);

  return (
    <div className={styles.unit}>
      <div className={styles.divider}>
        <i />
        <span>{unit.title}</span>
        <i />
      </div>

      <div className={styles.nodes}>
        <svg
          aria-hidden="true"
          className={styles.route}
          height={svgHeight}
          viewBox={`0 0 ${ROUTE_WIDTH} ${svgHeight}`}
          width={ROUTE_WIDTH}
        >
          {/* 길 아래쪽 깊은 그림자 */}
          <path
            d={fullPath}
            fill="none"
            opacity={0.13}
            stroke={darken(unit.color, 50)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
            transform="translate(0 7)"
          />
          {/* 하얀 지도길 바닥 */}
          <path d={fullPath} fill="none" opacity={0.98} stroke="var(--surface)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={18} />
          {/* 유닛 색 테두리 */}
          <path d={fullPath} fill="none" opacity={0.16} stroke={unit.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
          {/* 지나온 길은 유닛 색, 잠긴 길은 회색 */}
          {segments.map((part, index) => (
            <path
              d={part.d}
              fill="none"
              key={index}
              opacity={part.active ? 0.88 : 0.7}
              stroke={part.active ? unit.color : "var(--border)"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={6}
            />
          ))}
          {/* 지도길 위 작은 반짝임 */}
          <path d={fullPath} fill="none" opacity={0.92} stroke="var(--surface)" strokeDasharray="1 15" strokeLinecap="round" strokeWidth={2.5} />
        </svg>

        {unit.nodes.map((node, index) => {
          const offset = zigzagOffset(index);
          const isCurrent = node.status === "current";
          const isSelected = selectedNodeId === node.id;
          const characterOffset = offset > 0 ? offset - 115 : offset + 115;
          const jumpable = !customPopover && index === 0 && node.status === "locked";
          // 학습 로드의 잠긴 첫 노드는 "여기서 시작" 표시를 하지 않는다 (회색 + 자기 아이콘)
          const visualIndex = customPopover && node.status === "locked" ? Math.max(1, index) : index;
          const press = () => {
            if (directStart && node.status !== "locked" && node.lessonId && node.type !== "chest" && node.type !== "score") {
              onNodeStart?.(node);
              return;
            }
            onNodeTap(node.id);
          };
          // 현재 노드는 깃발로 강조한다 (선택하면 원래 아이콘으로). 서버 아이콘이 그 강조를 지우지 않게
          const type = isCurrent && !isSelected ? (jumpable ? "boss" : "speech") : node.type;
          const iconName = isCurrent && !isSelected ? undefined : node.iconName;

          return (
            <div className={`${styles.nodeRow} ${isSelected ? styles.nodeRowSelected : ""}`} key={node.id}>
              <div className={styles.nodePosition} style={{ transform: `translateX(${offset}px)` }}>
                {node.type === "score" ? (
                  <ScoreNode
                    locked={node.status !== "completed"}
                    onPress={press}
                    score={node.scoreValue ?? unit.unitNumber}
                    unitColor={unit.color}
                  />
                ) : (
                  <>
                    {jumpable ? (
                      <div className={styles.jumpBubble}>
                        <span style={{ color: unit.color }}>{uzt("roadmap.jumpHere")}</span>
                        <i />
                      </div>
                    ) : null}
                    <LessonNode
                      completedSteps={node.completedLessons ?? 0}
                      hideRing={hideNodeRing}
                      iconName={iconName}
                      index={visualIndex}
                      isLegendDone={Boolean(node.legendCompleted)}
                      label={nodeLabel?.(node) ?? node.title ?? unit.title}
                      onPress={press}
                      status={node.status}
                      totalSteps={node.totalLessons ?? 4}
                      type={type}
                      unitColor={unit.color}
                    />
                  </>
                )}
              </div>

              {isCurrent && !isSelected ? <CharacterMarker avatar={avatar} offsetX={characterOffset} /> : null}

              {isSelected ? (
                <div className={styles.popoverWrap}>
                  {renderPopover({
                    index,
                    node,
                    onClose: () => onNodeTap(node.id),
                    triangleOffsetX: offset,
                    unit,
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
