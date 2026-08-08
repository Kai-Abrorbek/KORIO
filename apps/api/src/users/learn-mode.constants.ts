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
