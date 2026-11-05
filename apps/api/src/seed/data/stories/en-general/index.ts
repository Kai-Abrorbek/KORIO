import type { StorySeedSet } from '../../../../stories/story-content.util';
import { EN_GENERAL_A1 } from './a1.data';
import { EN_GENERAL_A2 } from './a2.data';
import { EN_GENERAL_B1 } from './b1.data';
import { EN_GENERAL_B1P } from './b1p.data';
import { EN_GENERAL_B2 } from './b2.data';
import { EN_GENERAL_C1 } from './c1.data';

/**
 * 영어 코스(en-general) 이야기. 레벨 목록과 번역 언어는 stories/story-courses.ts.
 * 레벨 하나 = 파일 하나 (b1p = B1+). 레벨마다 10편.
 */
export const EN_GENERAL_STORIES: StorySeedSet = {
  courseId: 'en-general',
  stories: [
    ...EN_GENERAL_A1,
    ...EN_GENERAL_A2,
    ...EN_GENERAL_B1,
    ...EN_GENERAL_B1P,
    ...EN_GENERAL_B2,
    ...EN_GENERAL_C1,
  ],
};
