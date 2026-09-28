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

export const VoiceTutorApi = {
  options: () => api.get<VoiceTutorOptions>("/voice-tutor/options"),
  settings: () => api.get<VoiceTutorSettings>("/voice-tutor/settings"),
  updateSettings: (settings: VoiceTutorSettings) =>
    api.patch<VoiceTutorSettings>("/voice-tutor/settings", settings),
  createSession: (settings: VoiceTutorSettings) =>
    api.post<VoiceTutorSession>("/voice-tutor/sessions", { settings }),
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
