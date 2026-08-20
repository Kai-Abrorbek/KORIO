/**
 * 학습 로드 모드 — 하루 = 한 유닛 = 교재 1과.
 * 서버(`/study-path`) 응답 모양 그대로. 라벨은 앱이 t() 로 만든다
 * (레슨 제목만 콘텐츠라 서버가 준다).
 */
export type StudyNodeKind =
  | "grammar"
  | "words"
  | "lesson"
  | "practice"
  | "review"
  | "final";

/** 서버에 완료를 기록하는 노드 (나머지는 각자 진행도가 따로 있다) */
export type StudyCompletableKind = "practice" | "review" | "final";

export type StudyNodeStatus = "completed" | "current" | "locked";

export interface StudyNode {
  id: string;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  completed: number;
  total: number;
  title?: string;
  lessonId?: string;
  nodeId?: string;
  xpReward?: number;
  legendCompleted?: boolean;
  special?: "hangul";
}

export interface StudyDay {
  id: string;
  dayNumber: number;
  section: number;
  unit: number;
  title: string;
  status: StudyNodeStatus;
  nodes: StudyNode[];
}

export interface StudyPathResponse {
  currentSection: number;
  currentDayIndex: number;
  days: StudyDay[];
  nextSection: {
    sectionNumber: number;
    title: string;
    description: string;
    firstUnitNumber: number;
  } | null;
}
