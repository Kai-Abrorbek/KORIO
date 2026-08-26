/**
 * 학습 로드 모드(가이드).
 *
 * 교재 1과를 이틀에 나눠 배운다. 첫날은 새 내용을 넣고(단어·문법), 둘째 날은
 * 문제로 굳힌다. 학원 수업과 같은 흐름이고, 하루 노드가 4~5개로 줄어 실제로
 * 끝낼 수 있는 분량이 된다.
 *
 *   1일차 — 배우기 : 지난 과 복습 → 단어 → 문법 → 어휘 문제(앞쪽 노드들)
 *   2일차 — 익히기 : 어제 복습 → 어휘 문제(뒤쪽) → 문법 문제 → 마무리
 *
 * 노드 하나가 여러 레슨(=링)으로 나뉜다. 유닛 하나에 어휘 문제가 340~470개,
 * 단어가 최대 119개라 한 번에 다 줄 수 없고, 매번 20개만 랜덤으로 주면
 * 나머지를 영영 안 보기 때문이다.
 */
export const STUDY_NODE_KINDS = [
  'review',
  'words',
  'grammar',
  'vocabQuiz',
  'recap',
  'grammarQuiz',
  'final',
] as const;

export type StudyNodeKind = (typeof STUDY_NODE_KINDS)[number];

/** 완료를 유저 문서에 기록하는 노드 — 전부 */
export type StudyCompletableKind = StudyNodeKind;

export const STUDY_COMPLETABLE_KINDS: readonly StudyCompletableKind[] = [
  ...STUDY_NODE_KINDS,
];

/** 레슨 화면으로 문제를 받아 가는 노드들 */
export const STUDY_QUIZ_KINDS = [
  'review',
  'vocabQuiz',
  'recap',
  'grammarQuiz',
  'final',
] as const;

export type StudyQuizKind = (typeof STUDY_QUIZ_KINDS)[number];

export function isStudyQuizKind(value: unknown): value is StudyQuizKind {
  return STUDY_QUIZ_KINDS.includes(value as StudyQuizKind);
}

/** 하루 = 1과의 앞부분(배우기) 또는 뒷부분(익히기) */
export type StudyPhase = 1 | 2;

// ─────────────────────────────────────────────────────────
// 분할 규칙
// ─────────────────────────────────────────────────────────

/**
 * 노드를 몇 개 레슨(=링)으로 쪼갤지.
 *
 * - fixed      항목이 몇 개든 정해진 수로 (항목이 더 적으면 그만큼)
 * - perLesson  링 하나가 맡을 분량을 정하고, 넘치면 링을 늘린다
 *
 * 분량을 고정하는 쪽이 기본이다. 늘 5등분하면 유닛 크기에 따라 어떤 날은
 * 3개, 어떤 날은 24개를 하게 된다.
 */
type SplitRule =
  | { mode: 'fixed'; lessons: number }
  | { mode: 'perLesson'; size: number; max?: number };

/** 어휘 링 하나가 맡는 문제 수 */
export const VOCAB_ITEMS_PER_LESSON = 20;

/** 어휘 노드 하나가 갖는 최대 링 수 */
export const VOCAB_LESSONS_PER_NODE = 5;

/** 어휘 노드 하나가 맡는 문제 수 */
export const VOCAB_ITEMS_PER_NODE =
  VOCAB_ITEMS_PER_LESSON * VOCAB_LESSONS_PER_NODE;

const SPLIT_RULE: Record<StudyNodeKind, SplitRule> = {
  review: { mode: 'fixed', lessons: 1 },
  recap: { mode: 'fixed', lessons: 1 },
  grammar: { mode: 'fixed', lessons: 1 },
  final: { mode: 'fixed', lessons: 1 },
  /** 한 번에 외울 단어 수 */
  words: { mode: 'perLesson', size: 30 },
  /** 링 하나가 맡는 어휘 문제 수. 노드 하나는 최대 5링(=100문제) */
  vocabQuiz: {
    mode: 'perLesson',
    size: VOCAB_ITEMS_PER_LESSON,
    max: VOCAB_LESSONS_PER_NODE,
  },
  /** 문법은 유닛당 문제 수 편차가 커서 분량 기준으로 */
  grammarQuiz: { mode: 'perLesson', size: 8, max: 5 },
};

/** 어휘 문제 전체를 몇 개 노드로 나눌지 */
export function vocabNodeCount(totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.ceil(totalQuestions / VOCAB_ITEMS_PER_NODE);
}

/** 항목 수에 맞는 실제 레슨(링) 수 */
export function lessonCountFor(kind: StudyNodeKind, items: number): number {
  if (items <= 0) return 1;
  const rule = SPLIT_RULE[kind];

  if (rule.mode === 'fixed') {
    return Math.max(1, Math.min(rule.lessons, items));
  }

  const needed = Math.ceil(items / rule.size);
  return Math.max(1, rule.max ? Math.min(rule.max, needed) : needed);
}

/**
 * 전체를 count 조각으로 나눌 때 index(0-based) 조각의 구간.
 * 나머지는 앞쪽부터 한 개씩 더 가져간다 — 마지막만 유난히 길어지지 않게.
 */
export function lessonSlice(
  total: number,
  count: number,
  index: number,
): { start: number; end: number } {
  if (count <= 1) return { start: 0, end: total };
  const base = Math.floor(total / count);
  const extra = total % count;
  const start = base * index + Math.min(index, extra);
  const size = base + (index < extra ? 1 : 0);
  return { start, end: start + size };
}

// ─────────────────────────────────────────────────────────
// 완료 키
// ─────────────────────────────────────────────────────────

/**
 * "1-3:vocabQuiz.2#3" — 섹션-유닛:종류.묶음#링.
 * 같은 종류가 하나뿐이면 묶음은 1, 링을 안 쪼개면 링도 1이다.
 */
export function studyNodeKey(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
  group = 1,
  lesson = 1,
): string {
  return `${section}-${unit}:${kind}.${group}#${lesson}`;
}

/** 그 노드의 링 완료 키 접두사 */
export function studyNodePrefix(
  section: number,
  unit: number,
  kind: StudyCompletableKind,
  group = 1,
): string {
  return `${section}-${unit}:${kind}.${group}#`;
}

export type StudyNodeStatus = 'completed' | 'current' | 'locked';

export interface StudyNode {
  /** 하루 안에서 유일한 키 ("vocabQuiz.2") */
  id: string;
  kind: StudyNodeKind;
  /** 같은 종류가 여럿일 때 몇 번째인지 (1-based) */
  group: number;
  /** 그 종류가 이 유닛에 몇 개인지 — 라벨 "어휘 문제 2/4" 용 */
  groupCount: number;
  status: StudyNodeStatus;
  /** 링을 전부 끝냈는지 */
  done: boolean;
  /** 그 노드가 다루는 항목 수 */
  count: number;
  /** 링 개수 */
  lessonCount: number;
  /** 끝낸 링 수 */
  lessonsDone: number;
  /** 다음에 열 링 번호 (1-based) */
  nextLesson: number;
}

export interface StudyDay {
  id: string;
  /** 통산 일차. 1과당 이틀이라 유닛 번호와 1:1 이 아니다 */
  dayNumber: number;
  section: number;
  unit: number;
  /** 1 = 배우기, 2 = 익히기 */
  phase: StudyPhase;
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
