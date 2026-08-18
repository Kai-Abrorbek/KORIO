import type { AudioSource } from "expo-audio";
import api, { BASE_URL } from "@/services/api";

export type SpeechGender = "female" | "male";
export type SpeechLanguage = "ko-KR" | "uz-UZ" | "en-US" | "ru-RU";

export interface SpeechVoice {
  shortName: string;
  displayName: string;
  localName: string;
  gender: SpeechGender;
  voiceType: string;
  status: string;
  styles: string[];
}

interface PrepareSpeechRequest {
  text: string;
  language: SpeechLanguage;
  rate: number;
  gender: SpeechGender;
  voice?: string;
}

interface PrepareSpeechResponse {
  audioId: string;
  expiresAt: number;
}

export const TtsService = {
  getKoreanVoices: (): Promise<SpeechVoice[]> =>
    api.get<SpeechVoice[]>("/tts/voices"),

  prepareSource: async (
    request: PrepareSpeechRequest,
  ): Promise<AudioSource> => {
    const { audioId } = await api.post<PrepareSpeechResponse>(
      "/tts/speech",
      request,
    );
    return `${BASE_URL}/tts/speech/${encodeURIComponent(audioId)}`;
  },
};
