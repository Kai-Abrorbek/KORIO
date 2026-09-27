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
}

export interface VoiceTutorTurn {
  userMessage: VoiceTutorMessage;
  teacherMessage: VoiceTutorMessage;
  progress?: VoiceTutorProgress;
  warning?: string | null;
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

async function uploadTurn(sessionId: string, uri: string, signal?: AbortSignal): Promise<VoiceTutorTurn> {
  const token = await TokenStorage.get();
  if (!token) throw new ApiError("UNAUTHORIZED", 401);
  if (signal?.aborted) throw new ApiError("VOICE_TUTOR_CANCELLED");

  const form = new FormData();
  const isWebm = uri.toLowerCase().endsWith(".webm");
  if (Platform.OS === "web") {
    const recording = await fetch(uri).then((result) => result.blob());
    if (recording.size > 10 * 1024 * 1024) throw new ApiError("AUDIO_TOO_LARGE", 413);
    form.append("audio", recording, recording.type.includes("webm") ? "utterance.webm" : "utterance.m4a");
  } else {
    form.append("audio", {
      uri,
      name: isWebm ? "utterance.webm" : "utterance.m4a",
      type: isWebm ? "audio/webm" : "audio/mp4",
    } as unknown as Blob);
  }

  let response: Response;
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  try {
    response = await fetch(
      `${BASE_URL}/voice-tutor/sessions/${encodeURIComponent(sessionId)}/turns`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
        signal: controller.signal,
      },
    );
  } catch {
    throw new ApiError(signal?.aborted ? "VOICE_TUTOR_CANCELLED" : "NETWORK_ERROR");
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(data?.message ?? "VOICE_TUTOR_TURN_FAILED", response.status);
  }
  return data as VoiceTutorTurn;
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
  turn: uploadTurn,
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
