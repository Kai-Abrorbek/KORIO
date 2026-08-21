/**
 * 학습 로드 모드 — 하루 = 한 유닛 = 교재 1과.
 * 서버(`/study-path`) 응답 모양 그대로. 라벨은 앱이 t() 로 만든다.
 */
export type StudyNodeKind =
  | "review"
  | "words"
  | "grammar"
  | "vocabQuiz1"
  | "vocabQuiz2"
  | "grammarQuiz"
  | "final";

/** 완료를 서버에 남기는 노드 — 일곱 자리 전부 */
export type StudyCompletableKind = StudyNodeKind;

/** 레슨 화면에서 문제를 푸는 노드들 */
export type StudyQuizKind =
  | "review"
  | "vocabQuiz1"
  | "vocabQuiz2"
  | "grammarQuiz"
  | "final";

export const STUDY_QUIZ_KINDS: StudyQuizKind[] = [
  "review",
  "vocabQuiz1",
  "vocabQuiz2",
  "grammarQuiz",
  "final",
];

export type StudyNodeStatus = "completed" | "current" | "locked";

export interface StudyNode {
  id: StudyNodeKind;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  done: boolean;
  /** 그 노드가 다루는 항목 수 (단어 76개, 문제 170개…) */
  count: number;
  /** 몇 개 레슨으로 나뉘는지 */
  lessonCount: number;
  /** 끝낸 레슨 수 */
  lessonsDone: number;
  /** 다음에 열 레슨 번호 (1-based) */
  nextLesson: number;
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

/**
 * 전체를 lessonCount 조각으로 나눌 때 lessonIndex(0-based) 조각의 구간.
 * 서버(study-path.types.ts)와 같은 규칙이어야 한다 — 단어는 앱에서 자른다.
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
