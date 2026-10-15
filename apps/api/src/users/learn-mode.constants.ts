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
  'speaking',
  'conversation',
  'listening',
  'topik',
  // 글자부터 — 영어 코스의 알파벳. 한국어의 한글은 아직 단발 바로가기라 모드가 아니다
  'alphabet',
] as const;

export type LearnMode = (typeof LEARN_MODES)[number];

/**
 * 학습 코스(= 배우는 언어). 학습 모드와 다른 축이다 — "무엇을" 배우느냐가 코스,
 * "어떻게" 배우느냐가 모드. 코스마다 열린 모드가 다르다.
 *
 * 코스를 늘릴 때는 여기에 한 줄 + COURSE_MODES 에 그 코스의 모드만 넣으면 된다.
 * 홈 카드·진행도 계산이 이 표를 보고 따라간다.
 */
export const LEARN_COURSES = ['ko', 'en'] as const;

export type LearnCourse = (typeof LEARN_COURSES)[number];

export const COURSE_MODES: Record<LearnCourse, readonly LearnMode[]> = {
  ko: [
    'vocabulary',
    'grammarPractice',
    'grammar',
    'expression',
    'speaking',
    'conversation',
    'listening',
    'topik',
  ],
  en: ['alphabet'],
};

/**
 * 코스는 유저 문서의 targetLanguage 에 저장한다 (온보딩이 처음 채우는 "배우는 언어" 그 값).
 * 거기엔 코드가 아니라 단어('korean')로 들어가 있어서 쓸 때는 단어로 쓴다.
 */
export const COURSE_LANGUAGE: Record<LearnCourse, string> = {
  ko: 'korean',
  en: 'english',
};

const COURSE_BY_WORD: Record<string, LearnCourse> = {
  ko: 'ko',
  korean: 'ko',
  en: 'en',
  english: 'en',
};

/** targetLanguage → 코스. 비었거나 모르는 값이면 한국어 (KORIO 의 기본 코스) */
export function courseOf(targetLanguage?: string | null): LearnCourse {
  return COURSE_BY_WORD[(targetLanguage ?? '').trim().toLowerCase()] ?? 'ko';
}

export function courseHasMode(course: LearnCourse, mode: string): boolean {
  return COURSE_MODES[course].includes(mode as LearnMode);
}

/**
 * 모드를 저장할 때 코스를 정한다.
 * - 앱이 코스를 같이 보냈으면 그대로 (그 코스에 없는 모드면 null → 400)
 * - 안 보냈으면(예전 앱) 지금 코스에 그 모드가 있으면 유지, 없으면 그 모드를 가진 첫 코스.
 *   한국어 모드를 고른 예전 앱은 이렇게 늘 한국어 코스로 돌아온다.
 */
export function resolveLearnCourse(
  mode: LearnMode,
  current: LearnCourse,
  requested?: LearnCourse,
): LearnCourse | null {
  if (requested) return courseHasMode(requested, mode) ? requested : null;
  if (courseHasMode(current, mode)) return current;
  return LEARN_COURSES.find((course) => courseHasMode(course, mode)) ?? null;
}

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
