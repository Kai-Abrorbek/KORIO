import { NodeType, RoadmapUnit } from "@/types/roadmap";

/**
 * 로드맵 유닛 가공 로직과 레이아웃 상수. 화면에서 분리해 Day 모드 뷰에서도
 * 같은 규칙(보물상자 삽입, 점수 노드, 유닛 색)을 재사용한다.
 */
export const UNIT_COLORS = [
  "#776ee2",
  "#1D9E75",
  "#E2A83A",
  "#E25C5C",
  "#45B7D1",
  "#6e1cf2",
  "#FF7A00",
  "#2ECC71",
];

// ⚠️ UnitRoadmap.tsx 의 값과 반드시 동일하게 유지 (높이 추정용)
export const ROW_HEIGHT = 130; // NODE_WRAP_HEIGHT(80) + NODE_GAP(50)
export const DIVIDER_HEIGHT = 54; // SectionTitleDivider 대략 높이
export const UNIT_PADDING = 16;

export function getUnitColor(index: number): string {
  return UNIT_COLORS[index % UNIT_COLORS.length];
}

export function injectChests(unit: RoadmapUnit): RoadmapUnit {
  const nodes = [...unit.nodes];
  const result: typeof nodes = [];
  let lessonCount = 0;
  let chestIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    result.push(node);
    if (node.type !== "chest" && node.type !== "boss") {
      lessonCount++;
      if (lessonCount % 4 === 0 && i < nodes.length - 1) {
        const nextIsChest = nodes[i + 1]?.type === "chest";
        if (!nextIsChest) {
          chestIndex++;
          const chestStatus: "locked" | "completed" =
            node.status === "completed" ? "completed" : "locked";
          result.push({
            id: `${unit.id}-auto-chest-${chestIndex}`,
            type: "chest" as NodeType,
            status: chestStatus,
            chestLessonsRemaining: 0,
          });
        }
      }
    }
  }
  return { ...unit, nodes: result };
}

export function appendScoreNode(unit: RoadmapUnit): RoadmapUnit {
  const last = unit.nodes[unit.nodes.length - 1];
  if (last?.type === "score") return unit; // 중복 방지
  return {
    ...unit,
    nodes: [
      ...unit.nodes,
      {
        id: `${unit.id}-score`,
        type: "score" as NodeType,
        status: unit.status === "completed" ? "completed" : "locked",
        scoreValue: unit.unitNumber,
      },
    ],
  };
}
