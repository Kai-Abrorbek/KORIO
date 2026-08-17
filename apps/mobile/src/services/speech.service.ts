import type { AudioSource } from "expo-audio";
import api, { BASE_URL } from "@/services/api";

export type SpeechGender = "female" | "male";

interface PrepareSpeechRequest {
  text: string;
  language: "ko-KR";
  rate: number;
  gender: SpeechGender;
}

interface PrepareSpeechResponse {
  audioId: string;
  expiresAt: number;
}

export async function prepareAzureSpeechSource(
  request: PrepareSpeechRequest,
): Promise<AudioSource> {
  const { audioId } = await api.post<PrepareSpeechResponse>(
    "/tts/speech",
    request,
  );
  return `${BASE_URL}/tts/speech/${encodeURIComponent(audioId)}`;
}
