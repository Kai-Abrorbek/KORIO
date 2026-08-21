/**
 * 학습 로드 모드 — 하루 = 한 유닛 = 교재 1과.
 * 서버(`/study-path`) 응답 모양 그대로. 라벨은 앱이 t() 로 만든다.
 */
export type StudyNodeKind =
  | "review"
  | "words"
  | "grammar"
  | "vocabQuiz"
  | "grammarQuiz"
  | "final";

/** 레슨 화면에서 문제를 풀고 완료를 서버에 남기는 노드 */
export type StudyCompletableKind =
  | "review"
  | "vocabQuiz"
  | "grammarQuiz"
  | "final";

export const STUDY_QUIZ_KINDS: StudyCompletableKind[] = [
  "review",
  "vocabQuiz",
  "grammarQuiz",
  "final",
];

export type StudyNodeStatus = "completed" | "current" | "locked";

export interface StudyNode {
  id: StudyNodeKind;
  kind: StudyNodeKind;
  status: StudyNodeStatus;
  done: boolean;
  /** 그 노드가 다룰 항목 수 (단어 12개, 문법 3개, 문제 20개…) */
  count: number;
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
