import { getUnitColor } from "@/components/roadmap/roadmap.utils";
import type { RoadmapIconName, RoadmapUnit } from "@/types/roadmap";
import type { StudyDay, StudyNode, StudyNodeKind } from "@/types/study-path";

/** 종류별 아이콘. 하루의 흐름이 아이콘만 봐도 읽혀야 한다 */
const NODE_ICON: Record<Exclude<StudyNodeKind, "lesson">, RoadmapIconName> = {
  grammar: "book",
  words: "albums",
  practice: "barbell",
  review: "refresh",
  final: "flag",
};

export interface StudyPathViewModel {
  units: RoadmapUnit[];
  /** 표시 노드 id → 원본 노드 + 그 하루. 탭 처리에 필요하다 */
  nodeById: Map<string, { node: StudyNode; day: StudyDay }>;
  dayById: Map<string, StudyDay>;
}

/**
 * 서버의 하루(StudyDay)를 기존 로드맵 표시 모델로 옮긴다.
 *
 * 노드 id 는 반드시 하루를 접두로 붙인다 — 'grammar' 같은 키는 모든 하루에
 * 똑같이 존재해서, 그대로 쓰면 한 노드를 눌렀을 때 다른 날 노드까지 열린다.
 */
export function buildStudyPathViewModel(
  days: StudyDay[],
  labelOf: (node: StudyNode, day: StudyDay) => string,
  dayTitleOf: (day: StudyDay) => string,
): StudyPathViewModel {
  const nodeById = new Map<string, { node: StudyNode; day: StudyDay }>();
  const dayById = new Map<string, StudyDay>();

  const units = days.map((day): RoadmapUnit => {
    dayById.set(day.id, day);

    const nodes = day.nodes.map((node) => {
      const id = `${day.id}:${node.id}`;
      nodeById.set(id, { node, day });

      return {
        id,
        // UnitRoadmap 이 "지금 할 노드"를 boss 로 크게 그린다.
        // 여기서 타입을 따로 키우면 그 강조와 부딪히므로 star 로 통일하고
        // 종류는 아이콘으로만 구분한다.
        type:
          node.special === "hangul" ? ("hangul" as const) : ("star" as const),
        status: node.status,
        title: labelOf(node, day),
        completedLessons: node.completed,
        totalLessons: Math.max(1, node.total),
        xpReward: node.xpReward,
        legendCompleted: node.legendCompleted,
        ...(node.kind === "lesson" || node.special
          ? {}
          : { iconName: NODE_ICON[node.kind] }),
      };
    });

    return {
      id: day.id,
      sectionNumber: day.section,
      unitNumber: day.unit,
      title: dayTitleOf(day),
      color: getUnitColor(day.dayNumber - 1),
      status: day.status,
      nodes,
    };
  });

  return { units, nodeById, dayById };
}

/** 그 하루에서 끝낸 노드 수 (진행 바용) */
export function countDone(day: StudyDay): number {
  return day.nodes.filter((node) => node.completed >= node.total).length;
}
