import api, { ApiError, BASE_URL, TokenStorage } from "@/services/api";
import { Platform } from "react-native";

export interface VoiceTutorVoice {
  id: string;
  name: string;
  description?: string;
  gender?: string;
  previewUrl?: string | null;
  supportedLanguages?: string[];
  enabled?: boolean;
}

export type VoiceTutorPersonality =
  | "friendly"
  | "close_friend"
  | "savage"
  | "chaotic_savage";
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

export type VoiceTutorDelivery =
  | "normal"
  | "shout"
  | "whisper"
  | "laugh"
  | "dramatic";

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
  delivery?: VoiceTutorDelivery;
  intensity?: number;
  correction?: {
    wrong?: string;
    correct?: string;
    explanation?: string;
  };
  gesture?: "none" | "hand_raise_1" | "hand_raise_2" | "hand_raise_3" | "both_explain_1" | "both_explain_2" | "both_compare";
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
  livekit: {
    serverUrl: string;
    roomName: string;
    participantToken: string;
  };
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

/** 회화 주제 카드 (서버 topics/voice-tutor-topics.ts). 제목·설명은 요청한 언어로 온다 */
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

/** 오늘·이번 달 한도 (서버 voice-tutor-quota.service.ts) */
export interface VoiceTutorQuota {
  tier: "free" | "super" | "max";
  isMax: boolean;
  dailyLimitMin: number;
  monthlyLimitMin: number;
  dailyUsedMin: number;
  monthlyUsedMin: number;
  /** 지금 시작하면 쓸 수 있는 최대 길이(초). 0 이면 못 쓴다 */
  allowedSec: number;
}

export const VoiceTutorApi = {
  quota: () => api.get<VoiceTutorQuota>("/voice-tutor/quota"),
  topics: (lang: string) =>
    api.get<{ topics: VoiceTutorTopicCard[] }>(
      `/voice-tutor/topics?lang=${encodeURIComponent(lang)}`,
    ),
  options: () => api.get<VoiceTutorOptions>("/voice-tutor/options"),
  settings: () => api.get<VoiceTutorSettings>("/voice-tutor/settings"),
  updateSettings: (settings: VoiceTutorSettings) =>
    api.patch<VoiceTutorSettings>("/voice-tutor/settings", settings),
  createSession: (settings: VoiceTutorSettings, topicId?: string) =>
    api.post<VoiceTutorSession>("/voice-tutor/sessions", {
      settings,
      ...(topicId ? { topicId } : {}),
    }),
  getSession: (sessionId: string) =>
    api.get<VoiceTutorSessionDetail>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}`,
    ),
  getMessages: async (sessionId: string): Promise<VoiceTutorMessage[]> => {
    const result = await VoiceTutorApi.getSession(sessionId);
    return result.messages;
  },
  replay: (sessionId: string, messageId: string) =>
    api.post<VoiceTutorMessage>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}/audio`,
      {},
    ),
  endSession: (sessionId: string) =>
    api.post<VoiceTutorEnd>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}/end`,
      {},
    ),
  audioSource: async (url: string) => {
    const token = await TokenStorage.get();
    if (!token) throw new ApiError("UNAUTHORIZED", 401);
    const path = url.startsWith(BASE_URL) ? url.slice(BASE_URL.length) : url;
    if (!/^\/voice-tutor\/audio\/[A-Za-z0-9_-]+$/.test(path)) {
      throw new ApiError("INVALID_AUDIO_URL");
    }
    const uri = `${BASE_URL}${path}`;
    if (Platform.OS === "web") {
      const response = await fetch(uri, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new ApiError("AUDIO_PLAYBACK_FAILED", response.status);
      const blob = await response.blob();
      return { uri: URL.createObjectURL(blob), objectUrl: true };
    }
    return { uri, headers: { Authorization: `Bearer ${token}` }, objectUrl: false };
  },
};
