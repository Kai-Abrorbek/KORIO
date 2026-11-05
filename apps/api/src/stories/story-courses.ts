import type { StoryContentLanguage } from './stories.const';

/**
 * 이야기가 있는 코스. **새 언어는 여기 한 칸 + 시드 데이터(seed/data/stories/<courseId>/)면 된다.**
 *
 * 앱은 이 표를 모른다 — 목록 API 가 레벨 탭(이름까지)을 그대로 내려 주고, 앱은 받은
 * 대로 그린다. 앱에서 할 일은 그 코스 분야 화면에 카드를 켜는 한 줄뿐이다
 * (apps/mobile/src/constants/learnCourses.ts 의 STORY_COURSES).
 *
 * 레벨은 데이터가 아직 없어도 탭으로 보인다 ("곧 추가돼요"). 순서 = 탭 순서.
 */

export type LocalizedLabel = Record<StoryContentLanguage, string>;

export interface StoryLevelConfig {
  /** 화면·DB 에 쓰는 이름 ("B1+") */
  key: string;
  /** 이야기 code 에 들어가는 이름 ("b1p") — en-story-b1p-01 */
  slug: string;
  /** 탭 아래 작은 설명 */
  label: LocalizedLabel;
  /** 내레이션 말 빠르기 (ElevenLabs speed). 앱에서 0.75배로 더 늦출 수 있다 */
  narrationSpeed: number;
}

export interface StoryCourseConfig {
  courseId: string;
  targetLanguage: string;
  /** 번역·뜻·제목이 꼭 있어야 하는 설명 언어. 첫째가 기본값 (모르는 언어로 물으면 이걸 준다) */
  translationLanguages: StoryContentLanguage[];
  levels: StoryLevelConfig[];
}

/** 유럽 공통 기준(CEFR). 영어·러시아어 같은 언어가 같이 쓴다 */
export const CEFR_STORY_LEVELS: StoryLevelConfig[] = [
  {
    key: 'A1',
    slug: 'a1',
    label: { ko: '입문', uz: 'Boshlang‘ich', en: 'Starter', ru: 'Начальный' },
    narrationSpeed: 0.9,
  },
  {
    key: 'A2',
    slug: 'a2',
    label: {
      ko: '기초',
      uz: 'Elementar',
      en: 'Elementary',
      ru: 'Элементарный',
    },
    narrationSpeed: 0.95,
  },
  {
    key: 'B1',
    slug: 'b1',
    label: { ko: '중급', uz: 'O‘rta', en: 'Intermediate', ru: 'Средний' },
    narrationSpeed: 1,
  },
  {
    key: 'B1+',
    slug: 'b1p',
    label: { ko: '중급+', uz: 'O‘rta+', en: 'Intermediate+', ru: 'Средний+' },
    narrationSpeed: 1,
  },
  {
    key: 'B2',
    slug: 'b2',
    label: {
      ko: '중상급',
      uz: 'O‘rtadan yuqori',
      en: 'Upper-intermediate',
      ru: 'Выше среднего',
    },
    narrationSpeed: 1,
  },
  {
    key: 'C1',
    slug: 'c1',
    label: { ko: '고급', uz: 'Yuqori', en: 'Advanced', ru: 'Продвинутый' },
    narrationSpeed: 1,
  },
];

export const STORY_COURSES: StoryCourseConfig[] = [
  {
    courseId: 'en-general',
    targetLanguage: 'en',
    translationLanguages: ['uz', 'ru', 'ko'],
    levels: CEFR_STORY_LEVELS,
  },
  // 예) 한국어 이야기를 열 때:
  // { courseId: 'ko-general', targetLanguage: 'ko',
  //   translationLanguages: ['uz', 'ru', 'en'], levels: TOPIK_STORY_LEVELS },
];

export function storyCourseOf(courseId: string): StoryCourseConfig | undefined {
  return STORY_COURSES.find((course) => course.courseId === courseId);
}

/** 이 이야기의 code 앞부분 — en-story-b1p-01 */
export function storyCodePrefix(
  course: Pick<StoryCourseConfig, 'targetLanguage'>,
  level: Pick<StoryLevelConfig, 'slug'>,
): string {
  return `${course.targetLanguage}-story-${level.slug}-`;
}
