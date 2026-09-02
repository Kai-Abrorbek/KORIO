import type {
  NodeType,
  RoadmapUnit,
  RoadmapIconName,
  RoadmapNode,
} from "@/types/roadmap";

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

const GRAMMAR_NODE_ICONS: RoadmapIconName[] = [
  "book",
  "construct",
  "pencil",
];

/**
 * 문법 문제 트랙은 서버에서 노드 1개와 레슨 4개로 내려오지만, 화면에서는
 * 레슨 선택 단계를 없애고 각 문법을 독립 노드로 보여준다.
 *
 * 저장 구조는 건드리지 않아 기존 완료 기록을 그대로 쓰고, 첫 미완료 문법만
 * current로 둬서 이후 문법이 순서대로 열린다.
 */
export function expandGrammarLessonNodes(unit: RoadmapUnit): RoadmapUnit {
  const nodes = unit.nodes.flatMap((node) => {
    if (!node.lessons?.length) return [node];

    const currentLessonIndex =
      node.status === "current"
        ? node.lessons.findIndex((lesson) => !lesson.isCompleted)
        : -1;

    return node.lessons.map((lesson, lessonIndex): RoadmapNode => {
      // 배치 테스트로 건너뛴 섹션은 개별 진행 기록이 없어도 서버가 부모
      // 노드를 completed로 준다. 그 완료 상태도 각 문법 노드에 이어받는다.
      const isCompleted =
        node.status === "completed" || lesson.isCompleted;
      const status: RoadmapNode["status"] = isCompleted
        ? "completed"
        : lessonIndex === currentLessonIndex
          ? "current"
          : "locked";

      return {
        ...node,
        id: "grammar-lesson-" + lesson.lessonId,
        type: "star",
        status,
        title: lesson.title || node.title,
        lessonId: lesson.lessonId,
        lessons: undefined,
        completedLessons: isCompleted ? 1 : 0,
        totalLessons: 1,
        legendCompleted: false,
      };
    });
  });

  return {
    ...unit,
    nodes: nodes.map((node, index) => ({
      ...node,
      iconName:
        index === nodes.length - 1
          ? "flag"
          : GRAMMAR_NODE_ICONS[index % GRAMMAR_NODE_ICONS.length],
    })),
  };
}

/**
 * 몇 개의 레슨 노드마다 상자를 끼울지.
 *
 * 4 였을 때는 유닛(보통 5노드)당 상자가 끝에 하나 붙는 게 전부라, 내려가는
 * 내내 같은 모양이 이어지고 중간에 쉬어 가는 지점이 없었다. 3 이면 유닛
 * 중간에 놓인다.
 */
const NODES_PER_CHEST = 3;

/**
 * 상자를 중간에 끼운다.
 *
 * 이 상자들은 **위치만** 화면이 정한다. 실제 보상은 서버가 노드/하루를 끝낼 때
 * 적립해두고(PendingChest), 상자를 누르면 그동안 쌓인 걸 한 번에 가져간다.
 * 화면의 상자와 벌어들인 상자가 1:1 이 아니라서 그렇다 — 하나씩 짝지으려 하면
 * 짝 없는 상자가 영영 안 받아진 채로 남는다.
 *
 * 어느 상자를 눌러 받을지는 markClaimableChest 가 정한다 (유닛 하나만 봐서는
 * 못 정한다 — 로드맵 전체에서 하나여야 한다).
 */
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
      if (lessonCount % NODES_PER_CHEST === 0 && i < nodes.length - 1) {
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

/**
 * 받을 수 있는 상자 하나를 고른다.
 *
 * 끝낸 구간에 놓인 상자 중 **제일 마지막 것 하나만** 표시한다. 전부 빛나게
 * 하면 어디를 눌러야 할지 모르고, 하나만 빛나면 그게 곧 "여기서 받아라" 가
 * 된다. 어느 걸 누르든 서버는 쌓인 걸 다 주므로 표시는 안내일 뿐이다.
 *
 * 유닛 하나만 봐서는 못 고른다 — 완료한 유닛이 여럿이면 유닛마다 하나씩
 * 빛나 버린다. 그래서 로드맵 전체를 받아서 정한다.
 */
export function markClaimableChest(
  units: RoadmapUnit[],
  hasPending: boolean,
): RoadmapUnit[] {
  if (!hasPending) return units;

  let target: { unit: number; node: number } | null = null;
  units.forEach((unit, unitIndex) => {
    unit.nodes.forEach((node, nodeIndex) => {
      if (node.type === "chest" && node.status === "completed") {
        target = { unit: unitIndex, node: nodeIndex };
      }
    });
  });
  if (!target) return units;

  const hit = target as { unit: number; node: number };
  return units.map((unit, unitIndex) =>
    unitIndex !== hit.unit
      ? unit
      : {
          ...unit,
          nodes: unit.nodes.map((node, nodeIndex) =>
            nodeIndex === hit.node ? { ...node, chestClaimable: true } : node,
          ),
        },
  );
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
        // 서버가 준 전역 순번. 없으면(구버전 응답) 유닛 번호로 물러선다 —
        // 그 경우 섹션이 바뀌면 다시 1 부터 세는 예전 동작이 된다
        scoreValue: unit.scoreValue ?? unit.unitNumber,
      },
    ],
  };
}
