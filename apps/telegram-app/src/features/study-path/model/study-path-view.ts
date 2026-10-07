import { uzt } from "../../../shared/i18n/uz-text";
import { injectChests, markClaimableChest } from "../../roadmap/model/roadmap-view";
import type { RoadmapUnit } from "../../roadmap/model/roadmap";
import { STUDY_PATH_COLORS, type StudyDay, type StudyNode, type StudyNodeKind } from "./study-path";

/** 종류별 아이콘 — 하루의 흐름이 아이콘만 봐도 읽혀야 한다 (앱 study-path.adapter) */
export const STUDY_NODE_ICON: Record<StudyNodeKind, string> = {
  final: "flag",
  grammar: "book",
  grammarQuiz: "construct",
  recap: "refresh",
  review: "refresh",
  vocabQuiz: "create",
  words: "albums",
};

export function studyNodeLabel(node: StudyNode): string {
  const base = uzt(`studyPath.node.${node.kind}`);
  return node.groupCount > 1
    ? uzt("studyPath.nodeGroup", { n: node.group, name: base, total: node.groupCount })
    : base;
}

export function studyDayTitle(day: StudyDay): string {
  return uzt(day.phase === 1 ? "studyPath.dayLearn" : "studyPath.dayPractice", {
    n: day.dayNumber,
    title: day.title,
  });
}

export interface StudyPathViewModel {
  units: RoadmapUnit[];
  /** 표시 노드 id → 원본 노드 + 그 하루. 탭 처리에 필요하다 */
  nodeById: Map<string, { node: StudyNode; day: StudyDay; step: number }>;
}

/**
 * 서버의 하루(StudyDay)를 로드맵 지도 모델로 옮긴다 (앱 buildStudyPathViewModel).
 * 노드 id 는 하루를 접두로 붙인다 — 'grammar' 같은 키는 매일 똑같이 있어서,
 * 그대로 쓰면 한 노드를 눌렀을 때 다른 날 노드까지 열린다.
 * 진행 링은 그 노드의 레슨 진행도다 (단어 5레슨처럼 노드 하나가 여러 번에 끝난다).
 */
export function buildStudyPathViewModel(days: StudyDay[], hasPendingChest: boolean): StudyPathViewModel {
  const nodeById = new Map<string, { node: StudyNode; day: StudyDay; step: number }>();
  const units = days.map((day): RoadmapUnit => {
    const nodes = day.nodes.map((node, index) => {
      const id = `${day.id}:${node.id}`;
      nodeById.set(id, { day, node, step: index + 1 });
      return {
        completedLessons: node.lessonsDone,
        iconName: STUDY_NODE_ICON[node.kind],
        id,
        status: node.status,
        title: studyNodeLabel(node),
        totalLessons: Math.max(1, node.lessonCount),
        type: "star" as const,
      };
    });
    return injectChests({
      color: STUDY_PATH_COLORS[(day.dayNumber - 1) % STUDY_PATH_COLORS.length] ?? "#776ee2",
      id: day.id,
      nodes,
      sectionNumber: day.section,
      status: day.status,
      title: studyDayTitle(day),
      unitNumber: day.unit,
    });
  });
  return { nodeById, units: markClaimableChest(units, hasPendingChest) };
}
