import { STORY_AUDIO_FILES } from "./storyAudio.generated";

/**
 * 이야기 낭독은 미리 만들어 앱에 넣어 둔 mp3 만 쓴다. 들을 때 음성 합성 API 를
 * 부르지 않는다 — 낭독 파일이 없는 이야기는 잠가 둔다.
 *
 * - "ready":   이 앱에 낭독 파일이 있다
 * - "pending": 서버에도 낭독이 아직 없다 (녹음 전) → "곧 열려요"
 * - "update":  서버엔 있는데 이 앱에 없다 (앱이 옛 버전) → "업데이트하면 열려요"
 */
export type StoryAudioState = "ready" | "pending" | "update";

export function storyAudioSource(key: string | undefined): number | null {
  return key ? (STORY_AUDIO_FILES[key] ?? null) : null;
}

export function storyAudioState(story: { audio: { key: string } }): StoryAudioState {
  if (storyAudioSource(story.audio.key) !== null) return "ready";
  return story.audio.key ? "update" : "pending";
}
