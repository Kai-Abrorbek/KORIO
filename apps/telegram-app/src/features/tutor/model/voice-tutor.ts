/** 모바일 features/voice-tutor/services/voice-tutor.api.ts 와 같은 모양 */

export interface VoiceTutorVoice {
  id: string;
  name: string;
  description?: string;
  gender?: string;
  previewUrl?: string | null;
  supportedLanguages?: string[];
  enabled?: boolean;
}

export type VoiceTutorPersonality = "friendly" | "close_friend" | "savage" | "chaotic_savage";
export type VoiceTutorCharacterId = "female_01" | "male_01";

export type VoiceTutorEmotion =
  | "neutral"
  | "happy"
  | "laughing"
  | "shocked"
  | "angry"
  | "mocking"
  | "disbelief"
  | "excited"
  | "explaining";

export interface VoiceTutorSettings {
  voiceId: string;
  speechStyle: string;
  explanationLanguage: string;
  koreanLevel: string;
  personality: VoiceTutorPersonality;
  characterId: VoiceTutorCharacterId;
}

export interface VoiceTutorOptions {
  voices: VoiceTutorVoice[];
  explanationLanguages: { id: string; name: string; enabled?: boolean }[];
  speechStyles: string[];
  personalities?: VoiceTutorPersonality[];
  characters?: { id: VoiceTutorCharacterId; name: string; enabled?: boolean }[];
  koreanLevels?: string[];
  defaults: VoiceTutorSettings;
}

export interface VoiceTutorMessage {
  id: string;
  role: "user" | "teacher";
  text: string;
  displayText?: string;
  speechText?: string;
  emotion?: VoiceTutorEmotion;
  correction?: { wrong?: string; correct?: string; explanation?: string };
  language: string;
  audioUrl?: string | null;
  timestamp: string;
}

export interface VoiceTutorPlan {
  lessonGoal?: string;
  reviewTopics?: string[];
  newTopics?: string[];
  targetVocabulary?: string[];
  grammarFocus?: string[];
  conversationScenario?: string;
  difficulty?: string;
}

export interface VoiceTutorProgress {
  grammarMistakes?: string[];
  repeatedMistakes?: string[];
  learnedVocabulary?: string[];
  weakVocabulary?: string[];
  strongPoints?: string[];
  weakPoints?: string[];
  estimatedLevel?: string;
  notes?: string;
}

export interface VoiceTutorSession {
  sessionId: string;
  status: string;
  settings: VoiceTutorSettings;
  plan: VoiceTutorPlan;
  initialMessage: VoiceTutorMessage | null;
  livekit: { serverUrl: string; roomName: string; participantToken: string };
  /** 이 수업 최대 길이(초). 서버 한도에서 나온다 */
  maxDurationSec?: number;
}

export interface VoiceTutorEnd {
  sessionId: string;
  status: "ending" | "ended";
  progress: VoiceTutorProgress | null;
  plan: VoiceTutorPlan | null;
}

export interface VoiceTutorSessionDetail {
  sessionId: string;
  status: "active" | "ended";
  settings: VoiceTutorSettings;
  plan: VoiceTutorPlan;
  progress: VoiceTutorProgress | null;
  messages: VoiceTutorMessage[];
}

export interface VoiceTutorTopicCard {
  id: string;
  category: "daily" | "korea";
  level: string;
  icon: string;
  color: string;
  title: string;
  blurb: string;
  expressionCount: number;
}

/** 서버 voice-tutor-quota.service.ts */
export interface VoiceTutorQuota {
  tier: "free" | "super" | "max";
  isMax: boolean;
  /** trial = 평생 한 번 맛보기 (free 10분·super 30분), daily = 매일 (max 60분) */
  kind: "trial" | "daily";
  limitMin: number;
  usedMin: number;
  monthlyLimitMin: number;
  /** 지금 시작하면 쓸 수 있는 최대 길이(초). 0 이면 못 쓴다 */
  allowedSec: number;
}

/** 통화 화면·마스코트 상태 */
export type TutorState = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "error";

export type VoiceTutorPhase =
  | "setup"
  | "starting"
  | "connecting"
  | "ready"
  | "thinking"
  | "speaking"
  | "ending"
  | "finished";
