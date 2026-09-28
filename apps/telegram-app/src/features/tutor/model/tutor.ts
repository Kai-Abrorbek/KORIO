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
  /**
   * 목소리 미리듣기 주소 (서버 상대경로). 에셋이 없으면 null.
   * 실제 통화 목소리로 미리 만든 파일이라 고를 때 들은 사람 = 수업에서 만나는 사람이다.
   */
  previewUrl?: string | null;
}

/** 튜터가 나에게 쓰는 말투. 가르치는 한국어의 존댓말/반말과는 다른 축이다 */
export type TutorAddressStyle = "polite" | "casual";

/** 설명을 들을 언어. 앱 UI 언어와 별개다 (서버에는 기존 lang 으로 간다) */
export type TutorTeachingLanguage = "uz" | "ru" | "en" | "ko";

export const TUTOR_TEACHING_LANGUAGES: TutorTeachingLanguage[] = ["uz", "ru", "en", "ko"];

export interface TutorSessionGrant {
  sessionId: string;
  /** LiveKit 접속 정보. 앱에는 이것뿐이다 — 모델 키는 서버/Agent 에만 있다 */
  livekit: {
    serverUrl: string;
    roomName: string;
    participantToken: string;
  };
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
