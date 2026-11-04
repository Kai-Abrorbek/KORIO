import type {
  GeneratedStoryAudioMap,
  StorySeed,
} from '../../../stories/story-content.util';
import { ENGLISH_STORIES_A1 } from './english-stories-a1.data';
import { ENGLISH_STORIES_A2 } from './english-stories-a2.data';
import { ENGLISH_STORIES_B1 } from './english-stories-b1.data';
import { STORY_AUDIO_GENERATED } from './story-audio.generated';

/** 영어 듣기 이야기 전체. 레벨 → 순서 */
export const ENGLISH_STORY_SEEDS: StorySeed[] = [
  ...ENGLISH_STORIES_A1,
  ...ENGLISH_STORIES_A2,
  ...ENGLISH_STORIES_B1,
];

/**
 * 오디오 생성기(src/scripts/generate-story-audio.ts)가 쓰는 파일.
 * 손으로 고치지 않는다 — 본문을 바꾸면 생성기를 다시 돌린다.
 */
export const ENGLISH_STORY_AUDIO: GeneratedStoryAudioMap =
  STORY_AUDIO_GENERATED;
