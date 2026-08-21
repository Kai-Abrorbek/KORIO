/**
 * 학습 로드 모드(가이드) — 하루 = 한 유닛 = 교재 1과.
 *
 * 학원 수업 순서를 그대로 옮겼다. 시간 제한은 두지 않는다 — 하루치를 며칠에
 * 걸쳐 천천히 해도 순서만 지키면 된다.
 *
 *   1. review       지난 수업 복습
 *   2. words        오늘 단어              → 단어장 (5레슨)
 *   3. grammar      오늘 문법              → 문법 설명 + 퀴즈
 *   4. vocabQuiz1   오늘 어휘 문제 앞쪽    → 레슨 화면 (5레슨)
 *   5. vocabQuiz2   오늘 어휘 문제 뒤쪽    → 레슨 화면 (5레슨)
 *   6. grammarQuiz  오늘 문법 문제         → 레슨 화면 (문제 수만큼 나뉨)
 *   7. final        마무리 — 틀린 것 우선
 *
 * 노드 하나를 레슨 여러 개로 쪼개는 이유: 유닛 하나에 어휘 문제가 340~470개,
 * 단어가 최대 119개다. 한 번에 다 주면 끝나지 않고, 한 번에 20개만 주면
 * 나머지를 영영 안 본다. 고정 순서로 N등분해서 레슨 i 는 늘 i번째 조각만
 * 준다 — 그래야 전부 돌면 정확히 한 번씩 커버된다.
 */
export const STUDY_NODE_KINDS = [
  'review',
  'words',
  'grammar',
  'vocabQuiz1',
  'vocabQuiz2',
  'grammarQuiz',
  'final',
] as const;

export type StudyNodeKind = (typeof STUDY_NODE_KINDS)[number];

/** 완료를 유저 문서에 기록하는 노드 — 일곱 자리 전부 */
export type StudyCompletableKind = StudyNodeKind;

export const STUDY_COMPLETABLE_KINDS: readonly StudyCompletableKind[] = [
  ...STUDY_NODE_KINDS,
];

/** 레슨 화면으로 문제를 받아 가는 노드들 */
export const STUDY_QUIZ_KINDS = [
  'review',
  'vocabQuiz1',
  'vocabQuiz2',
  'grammarQuiz',
  'final',
] as const;

export type StudyQuizKind = (typeof STUDY_QUIZ_KINDS)[number];

export function isStudyQuizKind(value: unknown): value is StudyQuizKind {
  return STUDY_QUIZ_KINDS.includes(value as StudyQuizKind);
}

/** 노드별 레슨 수. 1 이면 쪼개지 않는다 */
export const NODE_LESSON_COUNT: Record<StudyNodeKind, number> = {
  review: 1,
  words: 5,
  grammar: 1,
  vocabQuiz1: 5,
  vocabQuiz2: 5,
  grammarQuiz: 5, // 문제가 적으면 아래에서 줄어든다
  final: 1,
};

/** 레슨 하나가 이보다 적어지면 레슨 수를 줄인다 (한 문제짜리 레슨 방지) */
export const MIN_ITEMS_PER_LESSON = 6;

/**
 * 항목 수에 맞는 실제 레슨 수. 항목이 적으면 쪼갤수록 어색해진다.
 */
export function lessonCountFor(kind: StudyNodeKind, items: number): number {
  const max = NODE_LESSON_COUNT[kind];
  if (max <= 1 || items <= 0) return 1;
  return Math.max(1, Math.min(max, Math.floor(items / MIN_ITEMS_PER_LESSON)));
}

/**
 * 전체를 lessonCount 조각으로 나눌 때 lessonIndex(0-based) 조각의 구간.
 * 나머지는 앞쪽 레슨부터 한 개씩 더 가져간다 — 마지막 레슨만 유난히 길어지지
 * 않게.
 */
export function lessonSlice(
  total: number,
  lessonCount: number,
  lessonIndex: number,
): { start: number; end: number } {
  if (lessonCount <= 1) return { start: 0, end: total };
  const base = Math.floor(total / lessonCount);
  const extra = total % lessonCount;
  const start = base * lessonIndex + Math.min(lessonIndex, extra);
  const size = base + (lessonIndex < extra ? 1 : 0);
  return { start, end: start + size };
}

/**
 * "1-3:vocabQuiz1#2" — 섹션·유닛·노드·레슨(1-based).
 * 레슨을 쪼개지 않는 노드는 항상 #1 이다.
 */
export function studyNodeKey(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
  lesson = 1,
): string {
  return `${section}-${unit}:${kind}#${lesson}`;
}

/** 그 노드의 레슨 완료 키 접두사 */
export function studyNodePrefix(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
): string {
  return `${section}-${unit}:${kind}#`;
}

export type StudyNodeStatus = 'completed' | 'current' | 'locked';

export interface StudyNode {
  id: StudyNodeKind;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  /** 레슨을 전부 끝냈는지 */
  done: boolean;
  /** 그 노드가 다루는 항목 수 (단어 76개, 문제 170개…) */
  count: number;
  /** 몇 개 레슨으로 나뉘는지 */
  lessonCount: number;
  /** 끝낸 레슨 수 */
  lessonsDone: number;
  /** 다음에 열 레슨 번호 (1-based). 다 끝냈으면 1 로 되돌아 다시 볼 수 있다 */
  nextLesson: number;
}

export interface StudyDay {
  id: string;
  /** 통산 일차. 섹션이 바뀌어도 이어진다 */
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
