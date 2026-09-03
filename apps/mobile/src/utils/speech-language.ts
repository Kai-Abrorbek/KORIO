import type { SpeechLanguage } from "@/services/tts.service";

/**
 * i18n 언어 코드 → TTS 언어.
 *
 * 문제 지문이 학습자 언어일 때(번역·타이핑 문제의 뜻 문장) 한국어 음성으로
 * 읽으면 발음이 뭉개진다. 지문이 어느 언어인지에 따라 갈라 써야 한다.
 * 모르는 코드는 한국어로 둔다 — 이 앱의 학습 대상 언어다.
 */
export function speechLanguageOf(language?: string): SpeechLanguage {
  const base = language?.toLowerCase().split("-")[0];
  if (base === "uz") return "uz-UZ";
  if (base === "en") return "en-US";
  if (base === "ru") return "ru-RU";
  return "ko-KR";
}
