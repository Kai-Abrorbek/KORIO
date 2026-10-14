import type { SpeechLanguage } from "@/services/tts.service";

export const DEFAULT_SPEECH_VOICE = "ko-KR-SunHiNeural";
export const DEFAULT_ENGLISH_SPEECH_VOICE = "en-US-JennyNeural";

interface SpeechVoicePreferences {
  speechVoice?: string;
  englishSpeechVoice?: string;
}

/** 모든 학습 TTS가 공유한다. 미리듣기 등 명시적인 목소리 요청은 우선한다. */
export function resolveSpeechVoice(
  language: SpeechLanguage,
  preferences: SpeechVoicePreferences,
  requestedVoice?: string,
): string | undefined {
  if (requestedVoice?.trim()) return requestedVoice.trim();

  const selected =
    language === "ko-KR"
      ? preferences.speechVoice
      : language === "en-US"
        ? preferences.englishSpeechVoice
        : undefined;
  if (typeof selected === "string" && selected.startsWith(`${language}-`)) {
    return selected;
  }
  if (language === "ko-KR") return DEFAULT_SPEECH_VOICE;
  if (language === "en-US") return DEFAULT_ENGLISH_SPEECH_VOICE;
  return undefined;
}
