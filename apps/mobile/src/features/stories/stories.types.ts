import type { StudyCelebration } from "@/utils/streak-chest-route";
import type { SceneKey } from "./scenes";

/** 서버 stories 모듈의 응답 모양 (apps/api/src/stories/stories.service.ts) */

/** 코스의 레벨 key ("A1", "B1+"). 어떤 레벨이 있는지는 서버가 정한다 */
export type StoryLevel = string;

export interface StoryProgressSummary {
  completed: boolean;
  completions: number;
  bestQuizCorrect: number;
  quizTotal: number;
}

export interface StorySummary {
  code: string;
  /** 이야기 언어 ("en") — 설명 언어를 고를 때 */
  targetLanguage: string;
  level: StoryLevel;
  order: number;
  /** 원문(배우는 언어) 제목 */
  title: string;
  /** 설명 언어 제목 */
  topic: string;
  scene: SceneKey;
  narrator: { name: string };
  /** key 가 비었거나 이 앱에 그 낭독 파일이 없으면 잠근다 (storyAudio.ts) */
  audio: { key: string; durationMs: number };
  sentenceCount: number;
  progress: StoryProgressSummary;
}

export interface StoryWord {
  text: string;
  startMs: number;
  endMs: number;
}

export interface StorySentence {
  id: string;
  text: string;
  translation: string;
  startMs: number;
  endMs: number;
  /** 오디오가 없으면 비어 온다 (그 이야기는 잠긴다) */
  words: StoryWord[];
}

export interface StoryQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
}

export interface StoryDetail extends StorySummary {
  sentences: StorySentence[];
  vocabulary: { word: string; meaning: string }[];
  questions: StoryQuestion[];
  shadowedSentenceIds: string[];
  nextCode: string | null;
}

export interface StoryLevelGroup {
  level: StoryLevel;
  /** 설명 언어로 된 레벨 이름 ("Boshlang‘ich") */
  label: string;
  /** 아직 데이터가 없는 레벨은 비어 온다 — 탭은 그대로 보인다 */
  stories: StorySummary[];
}

export interface StoryLibraryResponse {
  courseId: string;
  targetLanguage: string;
  levels: StoryLevelGroup[];
}

export interface CompleteStoryResult {
  success: boolean;
  xpEarned: number;
  totalXP: number | null;
  quizCorrect: number;
  quizTotal: number;
  repeat: boolean;
  completions: number;
  nextCode: string | null;
  celebration?: StudyCelebration | null;
}
