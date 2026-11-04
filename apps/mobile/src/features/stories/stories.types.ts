import type { StudyCelebration } from "@/utils/streak-chest-route";
import type { SceneKey } from "./scenes";

/** 서버 stories 모듈의 응답 모양 (apps/api/src/stories/stories.service.ts) */

export type StoryLevel = "A1" | "A2" | "B1";

export interface StoryProgressSummary {
  completed: boolean;
  completions: number;
  bestQuizCorrect: number;
  quizTotal: number;
}

export interface StorySummary {
  code: string;
  level: StoryLevel;
  order: number;
  /** 영어 원문 제목 */
  title: string;
  /** 설명 언어 제목 */
  topic: string;
  scene: SceneKey;
  narrator: { name: string };
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
  /** 오디오가 없으면 비어 온다 (TTS 로 읽는다) */
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

export interface StoryLibraryResponse {
  courseId: string;
  levels: { level: StoryLevel; stories: StorySummary[] }[];
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
