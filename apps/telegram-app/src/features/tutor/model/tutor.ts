export type TutorMode =
  | "freeTalk"
  | "rolePlay"
  | "lesson"
  | "pronunciation"
  | "review";

export type TutorTier = "free" | "super" | "max";

export type TutorState =
  | "idle"
  | "connecting"
  | "listening"
  | "thinking"
  | "speaking"
  | "error";

export interface TutorQuota {
  tier: TutorTier;
  isSuper: boolean;
  isMax: boolean;
  dailyLimitMin: number;
  monthlyLimitMin: number;
  dailyUsedMin: number;
  monthlyUsedMin: number;
  allowedMin: number;
}

export interface TutorTopicCard {
  id: string;
  category: "daily" | "korea";
  level: "beginner" | "intermediate" | "advanced";
  icon: string;
  color: string;
  title: string;
  blurb: string;
  expressionCount: number;
}

export interface TutorTeacherCard {
  id: string;
  name: string;
  description: string;
  avatar: string;
  color: string;
  personality:
    | "calm"
    | "friendly"
    | "energetic"
    | "strict"
    | "pronunciation"
    | "teasing";
  recommendedModes: TutorMode[];
}

export interface TutorSessionGrant {
  sessionId: string;
  clientSecret: string;
  expiresAt: number | null;
  model: string;
  voice: string;
  topicId: string | null;
  targetExpressions: string[];
  teacher: {
    id: string;
    name: Record<string, string>;
    avatar: string;
    color: string;
    speechRate: number;
  };
  maxDurationSec: number;
  quota: TutorQuota;
}

export interface TranscriptTurn {
  role: "user" | "tutor";
  text: string;
}

export interface SessionMistake {
  original: string;
  corrected: string;
  type:
    | "particle"
    | "ending"
    | "vocabulary"
    | "wordOrder"
    | "honorific"
    | "tense"
    | "pronunciation"
    | "other";
  note?: string;
}

export interface SessionSummary {
  summary: string;
  mistakes: SessionMistake[];
  newVocabulary: string[];
  goodExpressions: string[];
  grammarPoints: string[];
  spokenTurns: number;
  durationSec: number;
}

export interface EndSessionResult {
  success: boolean;
  durationSec: number;
  quota: TutorQuota;
  summary: SessionSummary | null;
}

const QUOTED_KOREAN = /['‘"“]([^'’"”]{2,60})['’"”]/g;
const HAS_HANGUL = /[가-힣]/;

/** 모바일과 동일하게 자막에서 따라 읽을 한국어 문장만 고른다. */
export function extractTutorExamples(caption: string): string[] {
  if (!caption) return [];
  const found: string[] = [];
  for (const match of caption.matchAll(QUOTED_KOREAN)) {
    const value = match[1]?.trim() ?? "";
    if (!HAS_HANGUL.test(value)) continue;
    if (/^[-~–—]/.test(value)) continue;
    if (value.replace(/[^가-힣]/g, "").length < 4) continue;
    if (!found.includes(value)) found.push(value);
  }
  return found.slice(0, 3);
}
