/**
 * 학습 로드 모드(가이드) — 하루 = 한 유닛 = 교재 1과.
 *
 * 하루를 여는 순간 그날 할 일이 전부 보여야 한다. 순서는 학원 수업과 같다:
 * 문법으로 규칙을 알고 → 단어를 익히고 → 레슨으로 써보고 → 실전으로 굳히고
 * → 복습으로 구멍을 메우고 → 마무리로 확인한다.
 */
export const STUDY_NODE_KINDS = [
  'grammar',
  'words',
  'lesson',
  'practice',
  'review',
  'final',
] as const;

export type StudyNodeKind = (typeof STUDY_NODE_KINDS)[number];

/** 유저 문서에 쌓이는 완료 키. 레슨·문법·단어는 자기 진행도가 따로 있어 제외한다. */
export type StudyCompletableKind = Extract<
  StudyNodeKind,
  'practice' | 'review' | 'final'
>;

export const STUDY_COMPLETABLE_KINDS: readonly StudyCompletableKind[] = [
  'practice',
  'review',
  'final',
];

/** "1-3:practice" — 섹션·유닛·종류를 한 문자열로. 배열 하나로 조회가 끝난다. */
export function studyNodeKey(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
): string {
  return `${section}-${unit}:${kind}`;
}

export type StudyNodeStatus = 'completed' | 'current' | 'locked';

export interface StudyNode {
  /** 화면 키. 같은 Day 안에서 유일하다 */
  id: string;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  /** 링 진행도. 진행 개념이 없는 노드는 0/1 로 완료만 표현한다 */
  completed: number;
  total: number;
  /** kind === 'lesson' 일 때만: 콘텐츠에서 온 제목. 나머지는 앱이 t() 로 만든다 */
  title?: string;
  lessonId?: string;
  nodeId?: string;
  xpReward?: number;
  legendCompleted?: boolean;
  /** 한글 관문처럼 레슨이 아닌 특수 노드 구분용 */
  special?: 'hangul';
}

export interface StudyDay {
  id: string;
  /** 통산 일차. 섹션이 바뀌어도 이어진다 — "지금 12일차" 가 보여야 한다 */
  dayNumber: number;
  section: number;
  unit: number;
  title: string;
  status: StudyNodeStatus;
  nodes: StudyNode[];
}

export interface StudyPathResponse {
  currentSection: number;
  /** days 배열 안에서의 위치. 앱이 여기로 스크롤한다 */
  currentDayIndex: number;
  days: StudyDay[];
  nextSection: {
    sectionNumber: number;
    title: string;
    description: string;
    firstUnitNumber: number;
  } | null;
}
