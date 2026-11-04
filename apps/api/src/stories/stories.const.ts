/**
 * 듣기 이야기(Stories) — "틀어 놓고 보는" 영어 듣기.
 *
 * 한 편 = 주인공 한 명이 1인칭으로 말하는 8~10문장짜리 짧은 글. 내레이션 오디오는
 * 미리 만들어 앱에 번들하고(apps/mobile/assets/audio/stories), 문장·단어 타이밍은
 * 시드가 들고 있다. 그래서 앱이 말하는 단어에 정확히 불을 켤 수 있다.
 *
 * 읽기 레슨(reading-lessons)과 따로 둔 이유: 그쪽은 한국어 교재 구조(급수 1~6,
 * 활용형 사전, 쓰기 활동)가 박혀 있고, 이쪽은 문장 단위 번역과 오디오 타이밍이
 * 중심이다. 한 스키마에 넣으면 둘 다 반쯤 빈 칸이 된다.
 */

/** CEFR 레벨. 목록 화면의 탭 순서이기도 하다 */
export const STORY_LEVELS = ['A1', 'A2', 'B1'] as const;
export type StoryLevel = (typeof STORY_LEVELS)[number];

/**
 * 번역 언어. 영어를 배우는 사람의 설명 언어다 (영어 자체는 원문이라 없다).
 * 앱이 lang=en 으로 물어도(설명 언어가 영어로 잡힌 드문 경우) uz 로 돌려준다.
 */
export const STORY_TRANSLATION_LANGUAGES = ['uz', 'ru', 'ko'] as const;
export type StoryTranslationLanguage =
  (typeof STORY_TRANSLATION_LANGUAGES)[number];
export const STORY_QUERY_LANGUAGES = [
  ...STORY_TRANSLATION_LANGUAGES,
  'en',
] as const;
export type StoryQueryLanguage = (typeof STORY_QUERY_LANGUAGES)[number];

/**
 * 앱이 코드로 그리는 배경 장면. 앱의 features/stories/scenes.ts 와 같은 목록이다.
 * 새 장면은 거기 그림을 먼저 만들고 여기 이름을 더한다.
 */
export const STORY_SCENES = [
  'autumn',
  'sunset',
  'morning',
  'bazaar',
  'rain',
  'spring',
  'night',
  'snow',
  'summer',
] as const;
export type StoryScene = (typeof STORY_SCENES)[number];

/** 확인 문제 수 (한 편당). 끝나고 바로 푸는 가벼운 세 문제 */
export const STORY_QUESTION_COUNT = 3;
export const STORY_OPTION_COUNT = 4;

// XP 숫자(STORY_*_XP)는 lessons/economy.const.ts 에 있다 (XP 조정은 전부 그 파일에서).
// 여기서 다시 내보내지 않는다 — 이 파일은 DB 를 모르는 시드·스펙도 읽어서,
// economy.const 를 끌어오면 스키마 데코레이터까지 따라 들어온다.
