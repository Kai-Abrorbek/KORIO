import { Ionicons } from "@expo/vector-icons";
import { getUnitColor } from "@/components/roadmap/roadmap.utils";
import type { RoadmapIconName, RoadmapUnit } from "@/types/roadmap";
import type {
  ExpressionRoadmapNode,
  ExpressionRoadmapResponse,
} from "@/types/expression";

const RING_STEPS = 4;

export interface ExpressionRoadmapViewModel {
  units: RoadmapUnit[];
  nodeCodeById: Map<string, string>;
  nodeDetailsById: Map<string, ExpressionRoadmapNode>;
  currentUnitIndex: number;
}

function toRoadmapIconName(icon: string): RoadmapIconName {
  return Object.prototype.hasOwnProperty.call(Ionicons.glyphMap, icon)
    ? (icon as RoadmapIconName)
    : "chatbubble-ellipses-outline";
}

/**
 * 표현 API 모델을 기존 로드맵의 표시 모델로만 변환한다.
 * 일반 레슨 로드맵에는 표현의 주제·노출 횟수·노드 code를 노출하지 않는다.
 */
export function buildExpressionRoadmapViewModel(
  roadmap: ExpressionRoadmapResponse,
): ExpressionRoadmapViewModel {
  const nodeCodeById = new Map<string, string>();
  const nodeDetailsById = new Map<string, ExpressionRoadmapNode>();
  const units = roadmap.topics.map((topic, topicIndex): RoadmapUnit => {
    const nodes = topic.nodes.map((node) => {
      nodeCodeById.set(node.id, node.code);
      nodeDetailsById.set(node.id, node);
      const completedSteps =
        node.status === "completed"
          ? RING_STEPS
          : Math.min(
              RING_STEPS - 1,
              Math.floor(Math.max(0, node.progress) * RING_STEPS),
            );

      return {
        id: node.id,
        type: "speech" as const,
        status: node.status,
        title: node.title,
        iconName: toRoadmapIconName(node.icon),
        completedLessons: completedSteps,
        totalLessons: RING_STEPS,
        progress: node.progress,
      };
    });
    const status = nodes.some((node) => node.status === "current")
      ? "current"
      : nodes.length > 0 && nodes.every((node) => node.status === "completed")
        ? "completed"
        : "locked";

    return {
      id: topic.id,
      sectionNumber: 1,
      unitNumber: topicIndex + 1,
      title: topic.title,
      color: getUnitColor(topicIndex),
      status,
      nodes,
    };
  });
  const firstCurrentIndex = units.findIndex((unit) => unit.status === "current");

  return {
    units,
    nodeCodeById,
    nodeDetailsById,
    currentUnitIndex:
      firstCurrentIndex >= 0 ? firstCurrentIndex : Math.max(0, units.length - 1),
  };
}
