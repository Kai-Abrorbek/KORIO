import { STUDY_PATH_COLORS } from "../../study-path/model/study-path";
import type {
  RoadmapNode,
  RoadmapNodeStatus,
  RoadmapUnit,
} from "./roadmap";

export const ROADMAP_NODE_OFFSETS = [64, 43, 34, 47] as const;
export const ROADMAP_NODE_ROW_HEIGHT = 126;
const GRAMMAR_ICONS = ["book", "construct", "create"] as const;

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
          : (node.iconName ??
            GRAMMAR_ICONS[index % GRAMMAR_ICONS.length] ??
            "book"),
    })),
  };
}

function addMapMarkers(unit: RoadmapUnit): RoadmapUnit {
  const nodes: RoadmapNode[] = [];
  let lessonCount = 0;
  let chestIndex = 0;

  unit.nodes.forEach((node, index) => {
    nodes.push(node);
    if (node.type === "chest" || node.type === "boss") return;
    lessonCount += 1;
    if (lessonCount % 3 === 0 && index < unit.nodes.length - 1) {
      chestIndex += 1;
      nodes.push({
        id: `${unit.id}-auto-chest-${chestIndex}`,
        status: node.status === "completed" ? "completed" : "locked",
        type: "chest",
      });
    }
  });

  nodes.push({
    id: `${unit.id}-score`,
    scoreValue: unit.scoreValue ?? unit.unitNumber,
    status: unit.status === "completed" ? "completed" : "locked",
    type: "score",
  });
  return { ...unit, nodes };
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
  if (category === "grammar") return colored.map(expandGrammarUnit);

  const processed = colored.map(addMapMarkers);
  if (!hasPendingChest) return processed;
  for (let index = processed.length - 1; index >= 0; index -= 1) {
    const chest = [...(processed[index]?.nodes ?? [])]
      .reverse()
      .find((node) => node.type === "chest" && node.status === "completed");
    if (chest) {
      chest.chestClaimable = true;
      break;
    }
  }
  return processed;
}

export function roadmapRoutePaths(nodes: RoadmapNode[]) {
  const points = nodes.map((_, index) => ({
    x:
      ROADMAP_NODE_OFFSETS[index % ROADMAP_NODE_OFFSETS.length] ??
      ROADMAP_NODE_OFFSETS[0],
    y: 44 + index * ROADMAP_NODE_ROW_HEIGHT,
  }));
  const segments = points.slice(1).map((point, index) => {
    const previous = points[index] ?? point;
    const middle = (previous.y + point.y) / 2;
    return {
      active: nodes[index]?.status !== "locked",
      d: `M ${previous.x} ${previous.y} C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${point.y}`,
    };
  });
  return {
    full: segments.map((segment) => segment.d).join(" "),
    height: Math.max(100, points.at(-1)?.y ?? 100),
    segments,
  };
}

export function roadmapStatusClass(
  styles: Record<string, string | undefined>,
  status: RoadmapNodeStatus,
): string {
  if (status === "completed") return styles.nodeCompleted ?? "";
  if (status === "current") return styles.nodeCurrent ?? "";
  return styles.nodeLocked ?? "";
}
