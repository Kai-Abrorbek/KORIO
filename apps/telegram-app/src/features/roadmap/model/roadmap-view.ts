import { STUDY_PATH_COLORS } from "../../study-path/model/study-path";
import type { RoadmapNode, RoadmapUnit } from "./roadmap";

const GRAMMAR_ICONS = ["book", "construct", "pencil"] as const;

function expandGrammarUnit(unit: RoadmapUnit): RoadmapUnit {
  const nodes = unit.nodes.flatMap((node) => {
    if (!node.lessons?.length) return [node];
    const currentIndex =
      node.status === "current"
        ? node.lessons.findIndex((lesson) => !lesson.isCompleted)
        : -1;
    return node.lessons.map((lesson, index): RoadmapNode => {
      const completed = node.status === "completed" || lesson.isCompleted;
      return {
        ...node,
        type: "star",
        completedLessons: completed ? 1 : 0,
        iconName: GRAMMAR_ICONS[index % GRAMMAR_ICONS.length],
        id: `grammar-lesson-${lesson.lessonId}`,
        legendCompleted: false,
        lessonId: lesson.lessonId,
        lessons: undefined,
        status: completed
          ? "completed"
          : index === currentIndex
            ? "current"
            : "locked",
        title: lesson.title || node.title,
        totalLessons: 1,
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
          : (GRAMMAR_ICONS[index % GRAMMAR_ICONS.length] ?? "book"),
    })),
  };
}

/**
 * 레슨 노드 3개마다 상자를 끼운다 (앱 roadmap.utils injectChests).
 * 상자는 **위치만** 화면이 정한다 — 실제 보상은 서버가 쌓아 두고, 어느 상자를 눌러도
 * 그동안 쌓인 걸 한꺼번에 가져간다.
 */
export function injectChests(unit: RoadmapUnit): RoadmapUnit {
  const nodes: RoadmapNode[] = [];
  let lessonCount = 0;
  let chestIndex = 0;

  unit.nodes.forEach((node, index) => {
    nodes.push(node);
    if (node.type === "chest" || node.type === "boss") return;
    lessonCount += 1;
    // 바로 다음이 이미 상자면 또 끼우지 않는다
    if (lessonCount % 3 === 0 && index < unit.nodes.length - 1 && unit.nodes[index + 1]?.type !== "chest") {
      chestIndex += 1;
      nodes.push({
        id: `${unit.id}-auto-chest-${chestIndex}`,
        status: node.status === "completed" ? "completed" : "locked",
        type: "chest",
      });
    }
  });
  return { ...unit, nodes };
}

/** 유닛 끝 스코어 배지 (앱 appendScoreNode) */
function appendScoreNode(unit: RoadmapUnit): RoadmapUnit {
  if (unit.nodes.at(-1)?.type === "score") return unit;
  return {
    ...unit,
    nodes: [
      ...unit.nodes,
      {
        id: `${unit.id}-score`,
        scoreValue: unit.scoreValue ?? unit.unitNumber,
        status: unit.status === "completed" ? "completed" : "locked",
        type: "score",
      },
    ],
  };
}

/**
 * 받을 수 있는 상자 하나만 표시한다 — 끝낸 구간의 **제일 마지막** 상자 (앱 markClaimableChest).
 * 전부 빛나면 어디를 눌러야 할지 모른다. 유닛 하나만 봐서는 못 고르니 전체를 받는다.
 */
export function markClaimableChest(units: RoadmapUnit[], hasPending: boolean): RoadmapUnit[] {
  if (!hasPending) return units;
  let target: { unit: number; node: number } | null = null;
  units.forEach((unit, unitIndex) => {
    unit.nodes.forEach((node, nodeIndex) => {
      if (node.type === "chest" && node.status === "completed") target = { node: nodeIndex, unit: unitIndex };
    });
  });
  const hit = target as { unit: number; node: number } | null;
  if (!hit) return units;
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

export function prepareRoadmapUnits(
  units: RoadmapUnit[],
  category: string | null,
  hasPendingChest: boolean,
): RoadmapUnit[] {
  const colored = units.map((unit, index) => ({
    ...unit,
    color: STUDY_PATH_COLORS[index % STUDY_PATH_COLORS.length] ?? "#776ee2",
  }));
  // 문법 문제 트랙은 유닛마다 문법 노드만 둔다 (상자·스코어를 끼우지 않는다)
  if (category === "grammar") return colored.map(expandGrammarUnit);
  return markClaimableChest(colored.map((unit) => appendScoreNode(injectChests(unit))), hasPendingChest);
}
