/**
 * 학습 모드는 계정 데이터다.
 *
 * 예전엔 앱 로컬(AsyncStorage)에만 있어서 한 폰에서 계정을 바꾸면
 * 앞사람의 학습 모드가 그대로 보였고, 폰을 바꾸면 초기화됐다.
 * 이제 유저 문서에 저장한다.
 */
export const LEARN_MODES = [
  'vocabulary',
  'grammarPractice',
  'grammar',
  'expression',
  'conversation',
  'listening',
  'topik',
] as const;

export type LearnMode = (typeof LEARN_MODES)[number];

/** TOPIK I / II */
export const TOPIK_LEVELS = ['1', '2'] as const;

export type TopikLevel = (typeof TOPIK_LEVELS)[number];

/**
 * 가이드 모드는 "학원처럼 순서대로" — 하루(=한 유닛) 분량을 서버가 짜준다.
 * 자율 모드는 기존 로드맵 그대로 원하는 노드를 찍어서 간다.
 * learnMode 와 직교한다: 어휘 트랙이든 문법 트랙이든 두 방식 다 가능.
 */
export const STUDY_MODES = ['guided', 'free'] as const;

export type StudyMode = (typeof STUDY_MODES)[number];
