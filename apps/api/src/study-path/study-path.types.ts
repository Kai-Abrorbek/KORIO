/**
 * 학습 로드 모드(가이드) — 하루 = 한 유닛 = 교재 1과.
 *
 * 학원 수업 순서를 그대로 옮겼다. 시간 제한은 두지 않는다 — 하루치를 며칠에
 * 걸쳐 천천히 해도 순서만 지키면 된다.
 *
 *   1. review      전날(또는 쉰 기간) 배운 어휘 다시 풀기
 *   2. words       오늘 단어 배우기        → 단어장
 *   3. grammar     오늘 문법 배우기        → 문법 설명 + 퀴즈
 *   4. vocabQuiz   오늘 어휘 문제 풀기     → 레슨 화면
 *   5. grammarQuiz 오늘 문법 문제 풀기     → 레슨 화면(문법 트랙 문제)
 *   6. final       마무리 — 오늘 틀린 것 우선으로 확인
 */
export const STUDY_NODE_KINDS = [
  'review',
  'words',
  'grammar',
  'vocabQuiz',
  'grammarQuiz',
  'final',
] as const;

export type StudyNodeKind = (typeof STUDY_NODE_KINDS)[number];

/**
 * 완료를 유저 문서에 기록하는 노드 — 여섯 자리 전부.
 *
 * 예전엔 단어·문법을 각자 진행도(단어 state, completedGrammar)로만 판정했다.
 * 그러면 "그 유닛 문법 8개를 전부 퀴즈까지 통과" 해야 다음이 열려서, 끝까지
 * 보고 나온 사람도 막혔다. 노드를 끝냈다는 사실은 유저의 행동으로 남긴다.
 */
export type StudyCompletableKind = StudyNodeKind;

export const STUDY_COMPLETABLE_KINDS: readonly StudyCompletableKind[] = [
  ...STUDY_NODE_KINDS,
];

/** 레슨 화면으로 문제를 받아 가는 노드들 */
export const STUDY_QUIZ_KINDS = [
  'review',
  'vocabQuiz',
  'grammarQuiz',
  'final',
] as const;

export type StudyQuizKind = (typeof STUDY_QUIZ_KINDS)[number];

export function isStudyQuizKind(value: unknown): value is StudyQuizKind {
  return STUDY_QUIZ_KINDS.includes(value as StudyQuizKind);
}

/** "1-3:vocabQuiz" — 섹션·유닛·종류를 한 문자열로. 배열 하나로 조회가 끝난다 */
export function studyNodeKey(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
): string {
  return `${section}-${unit}:${kind}`;
}

export type StudyNodeStatus = 'completed' | 'current' | 'locked';

export interface StudyNode {
  id: StudyNodeKind;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  /** 완료했는지. 링을 안 그리므로 진행률이 아니라 참/거짓만 쓴다 */
  done: boolean;
  /** 그 노드가 다룰 항목 수 (단어 12개, 문법 3개, 문제 20개…). 0 이면 안 만든다 */
  count: number;
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
