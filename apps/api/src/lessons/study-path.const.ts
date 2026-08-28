/**
 * 학습 로드 모드 — 하루(=유닛) 노드에서 뽑는 문제 수.
 *
 * 시간 목표는 두지 않는다(천천히 해도 된다). 다만 유닛 하나에 어휘 문제가
 * 340~470개씩 있어서 상한 없이 내주면 한 노드가 끝나지 않는다. 여기 숫자는
 * "한 자리에서 끝낼 만한 분량"이지 목표 시간이 아니다.
 */
export const STUDY_QUIZ_SIZE = {
  /** 전날 복습 — 시작부터 지치면 안 된다 */
  review: 12,
  /** 오늘 어휘 문제 */
  vocabQuiz: 20,
  /** 오늘 문법 문제 — 문법 하나당 12문제라 두세 개면 이 정도 */
  grammarQuiz: 24,
  /** 마무리 — 오늘 틀린 것 우선 */
  final: 15,
} as const;

/**
 * 결석 복습 범위. 오래 쉬었을수록 더 거슬러 올라간다.
 * (쉰 날 수 → 되돌아볼 유닛 개수)
 */
export const CATCH_UP_UNITS = [
  { days: 4, units: 3 },
  { days: 2, units: 2 },
  { days: 0, units: 1 },
] as const;

/** 마무리·졸업 시험에서 "어려운 문제"로 보는 기준 (difficulty 1~5) */
export const UNIT_FINAL_MIN_DIFFICULTY = 3;

/** 급수 졸업 시험 문항 수와 통과 기준 */
export const LEVEL_EXAM = {
  questions: 25,
  /** 통과 비율. 떨어져도 다음 급은 열린다 — 시험은 졸업식이지 관문이 아니다 */
  passRatio: 0.8,
  /** 통과 보상 (급수당 1회) */
  gems: 50,
  xp: 450,
} as const;
