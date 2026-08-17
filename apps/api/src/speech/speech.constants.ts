/** Azure 발음 평가가 요구하는 오디오 규격. 클라이언트가 이대로 WAV 를 만든다. */
export const SPEECH_SAMPLE_RATE = 16000;
export const SPEECH_CHANNELS = 1;
export const SPEECH_BITS_PER_SAMPLE = 16;

/** 발음 평가는 30초, 일반 STT 는 60초가 Azure 한계. 여유를 두고 자른다. */
export const SPEECH_MAX_SECONDS = 20;
export const SPEECH_MIN_SECONDS = 0.4;
export const SPEECH_MAX_BYTES =
  SPEECH_SAMPLE_RATE * SPEECH_CHANNELS * (SPEECH_BITS_PER_SAMPLE / 8) *
    SPEECH_MAX_SECONDS +
  1024; // WAV 헤더 여유

export const AZURE_TIMEOUT_MS = 20_000;
export const SPEECH_LANGUAGE = 'ko-KR';

export type SpeakingTier = 'lenient' | 'normal' | 'strict';

/**
 * 섹션이 올라갈수록 통과 기준을 올린다.
 * 섹션 1~3 관대 / 4~7 보통 / 8+ 빡셈.
 *
 * completeness 를 같이 보는 이유: 참조 문장의 일부만 짧게 말해도
 * 정확도(accuracy)는 높게 나올 수 있어서, 그것만으로는 "다 말했는지"를 못 막는다.
 */
export interface SpeakingThreshold {
  minSection: number;
  tier: SpeakingTier;
  pron: number;
  completeness: number;
}

// 위에서부터 검사하므로 minSection 내림차순으로 둔다
export const SPEAKING_THRESHOLDS: SpeakingThreshold[] = [
  { minSection: 8, tier: 'strict', pron: 80, completeness: 90 },
  { minSection: 4, tier: 'normal', pron: 70, completeness: 85 },
  { minSection: 0, tier: 'lenient', pron: 60, completeness: 80 },
];

export function thresholdForSection(section?: number): SpeakingThreshold {
  const s = Number.isFinite(section) ? (section as number) : 0;
  return (
    SPEAKING_THRESHOLDS.find((t) => s >= t.minSection) ??
    SPEAKING_THRESHOLDS[SPEAKING_THRESHOLDS.length - 1]
  );
}

/** 유저당 호출 제한. Azure 는 호출당 과금이라 무한 재시도를 막아야 한다. */
export const SPEECH_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 80 };
