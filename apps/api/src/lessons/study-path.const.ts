/**
 * 학습 로드 모드 — 하루(=유닛) 노드에서 뽑는 문제 수.
 *
 * 하루 전체가 18분 안에 끝나야 완료율이 유지된다(모바일 학습 기준).
 * 노드 하나가 길어지면 중간에 이탈하므로 여기서 상한을 정한다.
 */
export const UNIT_PRACTICE_SIZE = {
  /** 실전 연습 — 어휘·문법·표현 섞어서 */
  practice: 15,
  /** 마무리 확인 — 짧게 끊어야 "오늘 끝냈다"는 느낌이 남는다 */
  final: 8,
  /** 복습 — 지난 오답. 너무 많으면 시작부터 지친다 */
  review: 10,
} as const;

/** 마무리 노드에서 "어려운 문제"로 보는 기준 (difficulty 1~5) */
export const UNIT_FINAL_MIN_DIFFICULTY = 3;
