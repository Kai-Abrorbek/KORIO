import type { SpeechGender } from "@/services/tts.service";

/**
 * TOPIK 듣기 음성은 일반 학습 음성 설정과 분리해서 관리한다.
 * Azure 음성을 바꾸려면 이 ShortName만 수정하면 된다.
 */
export const TOPIK_LISTENING_VOICES = {
  female: "ko-KR-SunHiNeural",
  male: "ko-KR-InJoonNeural",
} as const satisfies Record<SpeechGender, string>;

/**
 * 특정 문항만 미세 조정할 때 여기에 `문항 번호: 속도`를 추가한다.
 * 예: { 14: 0.9, 43: 1.05 }
 */
export const TOPIK_LISTENING_QUESTION_RATE_OVERRIDES: Readonly<
  Partial<Record<number, number>>
> = {};

/**
 * 서버가 문항 음성마다 `speechRate`(원본 기출 음원에서 잰 빠르기)를 준다 — 그게 먼저다.
 * 이 표는 그 값이 없을 때(옛 서버 데이터)만 쓰는 예비값이다. 원본 음원(audioUrl)은
 * 속도를 바꾸지 않고 언제나 1.0배로 튼다 (useTopikListeningPlayback).
 * 측정값: apps/api/src/seed/data/topik/topik-listening-rates.generated.ts
 */
export const TOPIK_LISTENING_RATE_RANGES = [
  { from: 1, to: 20, rate: 0.82 },
  { from: 21, to: 30, rate: 0.9 },
  { from: 31, to: 40, rate: 1 },
  { from: 41, to: 50, rate: 1.03 },
] as const;

export const DEFAULT_TOPIK_LISTENING_RATE = 1;

export function getTopikListeningRate(questionNumber?: number) {
  if (!questionNumber || !Number.isFinite(questionNumber)) {
    return DEFAULT_TOPIK_LISTENING_RATE;
  }

  const normalizedNumber = Math.max(1, Math.floor(questionNumber));
  const override = TOPIK_LISTENING_QUESTION_RATE_OVERRIDES[normalizedNumber];
  if (override !== undefined) return override;

  return (
    TOPIK_LISTENING_RATE_RANGES.find(
      ({ from, to }) => normalizedNumber >= from && normalizedNumber <= to,
    )?.rate ?? DEFAULT_TOPIK_LISTENING_RATE
  );
}

export function getTopikListeningSpeakerVoice(speaker: string): {
  gender: SpeechGender;
  voice: string;
} {
  const normalizedSpeaker = speaker.trim();
  const gender: SpeechGender =
    normalizedSpeaker.includes("남자") || normalizedSpeaker.includes("남성")
      ? "male"
      : "female";

  return { gender, voice: TOPIK_LISTENING_VOICES[gender] };
}
