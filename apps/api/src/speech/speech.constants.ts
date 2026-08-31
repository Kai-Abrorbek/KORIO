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

/**
 * 유저당 호출 제한.
 *
 * 80 → 160 으로 올렸다. 읽기 연습이 마이크를 안 끄고 이어 읽는 방식으로
 * 바뀌면서, 지문 한 편에 30~45회를 정상적으로 호출한다. 80 이면 두 편째에
 * 멀쩡한 유저가 막혔다.
 *
 * ⚠️ 사실 제대로 된 제한 기준은 **호출 수가 아니라 오디오 총 길이**다.
 * Azure 발음 평가는 오디오 시간으로 과금하는데 이 제한은 횟수만 센다. 지금은
 * 요청당 길이가 앱에서 12초로 묶여 있어서 간접적으로만 통제된다. 실제 사용량을
 * 보고 나서 초 단위 제한으로 바꾸는 게 맞다.
 */
export const SPEECH_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 160 };

/**
 * 읽기 연습 단어 통과 기준.
 *
 * ⚠️ Speaking 문제의 SPEAKING_THRESHOLDS 를 그대로 쓰면 안 된다. 저건 "문장
 * 하나를 제대로 말했나" 를 보는 값이고, 여기는 본문을 이어 읽는 중에 **단어
 * 하나** 를 보는 값이다. 성격이 다르다.
 *
 * 한국어 짧은 어절(조사가 붙은 1음절, "말", "그", "내")은 Azure 점수가 특히
 * 들쭉날쭉하다. 소리가 짧아서 판단할 음소가 적기 때문이다. 잘 읽어도 40점대가
 * 나오는 일이 있어서, 짧은 단어는 기준을 따로 둔다.
 *
 * 이 두 숫자가 체감을 좌우한다. 너무 높으면 잘 읽어도 빨간불이 뜨고, 너무
 * 낮으면 아무거나 읽어도 넘어가서 연습이 안 된다. 서버 로그에 단어별 실제
 * 점수를 찍어두니 그걸 보고 조정하면 된다.
 */
export const READING_WORD_ACCURACY = 55;
/** 2음절 미만 단어에 적용하는 완화된 기준 */
export const READING_SHORT_WORD_ACCURACY = 42;
/** 이 글자 수 미만이면 짧은 단어로 본다 */
export const READING_SHORT_WORD_LENGTH = 2;
