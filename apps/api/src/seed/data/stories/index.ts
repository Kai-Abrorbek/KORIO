import type {
  GeneratedStoryAudioMap,
  StorySeedSet,
} from '../../../stories/story-content.util';
import { EN_GENERAL_STORIES } from './en-general';
import { STORY_AUDIO_GENERATED } from './story-audio.generated';

export { STORY_NARRATORS } from './narrators';

/**
 * 코스별 이야기 묶음. **새 언어는 폴더 하나(<courseId>/)를 만들어 여기 더한다**
 * — 그 코스의 레벨·번역 언어는 stories/story-courses.ts 에 먼저 등록한다.
 */
export const STORY_SEED_SETS: StorySeedSet[] = [EN_GENERAL_STORIES];

/**
 * 오디오 생성기(src/scripts/generate-story-audio.ts)가 쓰는 파일. code 로 찾는다.
 * 손으로 고치지 않는다 — 본문을 바꾸면 생성기를 다시 돌린다.
 */
export const STORY_AUDIO: GeneratedStoryAudioMap = STORY_AUDIO_GENERATED;
