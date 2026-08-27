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
 * 공개 기출 음원과 비교하기 위한 초기 보정값이다.
 * 공식 문항별 속도표가 공개된 값은 아니므로 실제 음원 측정 후 여기만 바꾼다.
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
