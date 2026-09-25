import type { AudioSource } from "expo-audio";
import api, { BASE_URL } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import { useOnboardingStore } from "@/store/onboarding.store";

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

  /**
   * 문장 하나를 소리로 준비시키고 재생용 URL 을 받는다.
   *
   * ⚠️ 온보딩(설문·레벨 테스트)은 **가입 전에** 돈다. 그래서 비로그인일 때는
   *    온보딩 sessionId 를 같이 보낸다 — 서버가 게스트 상한을 IP 가 아니라
   *    세션 단위로 걸 수 있게. 안 보내도 소리는 나지만, 같은 와이파이를 쓰는
   *    사람들이 서로의 몫을 깎아먹는다.
   */
  prepareSource: async (
    request: PrepareSpeechRequest,
  ): Promise<AudioSource> => {
    const { isLoggedIn } = useAuthStore.getState();
    const { audioId } = await api.post<PrepareSpeechResponse>("/tts/speech", {
      ...request,
      ...(isLoggedIn
        ? {}
        : { sessionId: useOnboardingStore.getState().sessionId }),
    });
    return `${BASE_URL}/tts/speech/${encodeURIComponent(audioId)}`;
  },
};
