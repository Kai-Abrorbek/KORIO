import { getUnitColor } from "@/components/roadmap/roadmap.utils";
import type { RoadmapIconName, RoadmapUnit } from "@/types/roadmap";
import type { StudyDay, StudyNode, StudyNodeKind } from "@/types/study-path";

/** 종류별 아이콘. 하루의 흐름이 아이콘만 봐도 읽혀야 한다 */
const NODE_ICON: Record<StudyNodeKind, RoadmapIconName> = {
  review: "refresh",
  words: "albums",
  grammar: "book",
  vocabQuiz: "create",
  grammarQuiz: "construct",
  final: "flag",
};

export interface StudyPathViewModel {
  units: RoadmapUnit[];
  /** 표시 노드 id → 원본 노드 + 그 하루. 탭 처리에 필요하다 */
  nodeById: Map<string, { node: StudyNode; day: StudyDay; step: number }>;
}

/**
 * 서버의 하루(StudyDay)를 기존 로드맵 표시 모델로 옮긴다.
 *
 * 노드 id 는 반드시 하루를 접두로 붙인다 — 'grammar' 같은 키는 모든 하루에
 * 똑같이 존재해서, 그대로 쓰면 한 노드를 눌렀을 때 다른 날 노드까지 열린다.
 *
 * 진행 링은 쓰지 않는다(노드 하나 = 할 일 하나). completedLessons/totalLessons
 * 는 1/1 로 고정해 링이 그려져도 조각나지 않게 둔다.
 */
export function buildStudyPathViewModel(
  days: StudyDay[],
  labelOf: (node: StudyNode) => string,
  dayTitleOf: (day: StudyDay) => string,
): StudyPathViewModel {
  const nodeById = new Map<
    string,
    { node: StudyNode; day: StudyDay; step: number }
  >();

  const units = days.map((day): RoadmapUnit => {
    const nodes = day.nodes.map((node, index) => {
      const id = `${day.id}:${node.id}`;
      nodeById.set(id, { node, day, step: index + 1 });

      return {
        id,
        type: "star" as const,
        status: node.status,
        title: labelOf(node),
        completedLessons: node.done ? 1 : 0,
        totalLessons: 1,
        iconName: NODE_ICON[node.kind],
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

  return { units, nodeById };
}

/** 그 하루에서 끝낸 노드 수 (진행 바용) */
export function countDone(day: StudyDay): number {
  return day.nodes.filter((node) => node.done).length;
}
