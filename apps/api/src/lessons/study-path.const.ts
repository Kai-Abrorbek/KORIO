import { LEVEL_EXAM_XP } from './economy.const';

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
  /**
   * 기회(하트). 이만큼 틀리면 그 자리에서 시험이 끝나고 불합격이다.
   * 5 → 25문제 중 4개까지 틀려도 통과 (84%).
   *
   * 예전엔 틀린 문제를 복습 라운드에서 다시 풀게 해서 사실상 무한 기회였다.
   * **이 숫자 하나만 바꾸면 된다** — 앱·텔레그램은 시험을 받을 때 이 값을 같이
   * 받아서 하트 수로 쓴다 (앱 업데이트 없이 서버 배포만으로 바뀐다).
   */
  hearts: 5,
  /** 통과 보상 (급수당 1회) */
  gems: 50,
  /** economy.const.ts 에서 가져온다 — XP 조정은 전부 거기서 */
  xp: LEVEL_EXAM_XP,
} as const;
