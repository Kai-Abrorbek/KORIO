/**
 * 듣기 이야기(Stories) — "틀어 놓고 보는" 듣기. 언어를 가리지 않는다.
 *
 * 한 편 = 주인공 한 명이 1인칭으로 말하는 8~10문장짜리 짧은 글. 내레이션 오디오는
 * 미리 만들어 앱에 번들하고(apps/mobile/assets/audio/stories), 문장·단어 타이밍은
 * 시드가 들고 있다. 그래서 앱이 말하는 단어에 정확히 불을 켤 수 있다.
 *
 * 코스(배우는 언어)마다 다른 것 — 레벨 이름, 번역이 꼭 있어야 하는 언어 — 은
 * story-courses.ts 한 곳에 있다. 새 언어는 거기 한 칸 + 시드 데이터면 된다.
 *
 * 읽기 레슨(reading-lessons)과 따로 둔 이유: 그쪽은 한국어 교재 구조(급수 1~6,
 * 활용형 사전, 쓰기 활동)가 박혀 있고, 이쪽은 문장 단위 번역과 오디오 타이밍이
 * 중심이다. 한 스키마에 넣으면 둘 다 반쯤 빈 칸이 된다.
 */

/**
 * 번역·뜻·제목을 적는 언어 (앱의 설명 언어). 원문 언어와 같은 칸은 비워 둔다 —
 * 영어 이야기의 en 칸, 한국어 이야기의 ko 칸.
 */
export const STORY_CONTENT_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
export type StoryContentLanguage = (typeof STORY_CONTENT_LANGUAGES)[number];

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
