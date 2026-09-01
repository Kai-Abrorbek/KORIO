/**
 * 학습 로드 모드 — 교재 1과를 이틀에 나눠 배운다.
 * 첫날은 새 내용(단어·문법), 둘째 날은 문제로 굳히기.
 * 서버(`/study-path`) 응답 모양 그대로. 라벨은 앱이 t() 로 만든다.
 */
export type StudyNodeKind =
  | "review"
  | "words"
  | "grammar"
  | "vocabQuiz"
  | "recap"
  | "grammarQuiz"
  | "final";

/** 완료를 서버에 남기는 노드 — 전부 */
export type StudyCompletableKind = StudyNodeKind;

/** 레슨 화면에서 문제를 푸는 노드들 */
export type StudyQuizKind =
  | "review"
  | "vocabQuiz"
  | "recap"
  | "grammarQuiz"
  | "final";

export const STUDY_QUIZ_KINDS: StudyQuizKind[] = [
  "review",
  "vocabQuiz",
  "recap",
  "grammarQuiz",
  "final",
];

export type StudyNodeStatus = "completed" | "current" | "locked";

export interface StudyNode {
  /** 하루 안에서 유일한 키 ("vocabQuiz.2") */
  id: string;
  kind: StudyNodeKind;
  /** 같은 종류가 여럿일 때 몇 번째인지 (1-based) */
  group: number;
  /** 그 종류가 이 유닛에 몇 개인지 — 라벨 "어휘 문제 2/4" 용 */
  groupCount: number;
  status: StudyNodeStatus;
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
  dayNumber: number;
  section: number;
  unit: number;
  /** 1 = 배우기, 2 = 익히기 */
  phase: 1 | 2;
  /** 섹션이 바뀌는 첫날. 위에 구분선을 세운다 */
  sectionStart: boolean;
  title: string;
  status: StudyNodeStatus;
  nodes: StudyNode[];
}

export interface StudyPathResponse {
  /** 아직 안 받은 상자 수 */
  pendingChests?: number;
  /** 학습 로드 모드 스코어 = 완주한 '하루' 수. 자유 학습 스코어와 다른 값이다 */
  score: number;
  currentSection: number;
  /** 지금 배우는 급수 */
  currentLevel: number;
  currentDayIndex: number;
  days: StudyDay[];
  /** 졸업 시험 상태. 그 급을 전부 끝내야 열린다 */
  levelExam: { available: boolean; passed: boolean };
  /** 이 급을 끝냈을 때 넘어갈 다음 급. 콘텐츠가 없으면 null */
  nextLevel: {
    level: number;
    title: string;
    description: string;
  } | null;
}

/**
 * 전체를 count 조각으로 나눌 때 index(0-based) 조각의 구간.
 * 서버(study-path.types.ts)와 같은 규칙이어야 한다 — 단어는 앱에서 자른다.
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

/** 고를 수 있는 급수 하나 */
export interface StudyLevel {
  level: number;
  /** 그 급이 맡은 섹션 범위 */
  sections: [number, number];
  title: string;
  description: string;
  /** 콘텐츠가 준비된 급인지. false 면 잠긴 카드로 보여준다 */
  available: boolean;
}

export interface StudyLevelsResponse {
  /** 지금 유저의 급수 */
  current: number;
  levels: StudyLevel[];
}

/** 급수 졸업 시험 결과 */
export interface LevelExamResult {
  passed: boolean;
  correct: number;
  total: number;
  level: number;
  /** 다음 급수. 떨어져도 열린다 */
  nextLevel: number | null;
  /** 틀린 문제가 몰린 영역 (lessonCategory). 최대 2개 */
  weakAreas: string[];
  gemsEarned: number;
  xpEarned: number;
  totalXP: number;
}
