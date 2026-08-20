/**
 * 한국어 TTS 재생 진행률(0~1)을 "지금 몇 번째 글자를 읽고 있나"로 옮기기 위한
 * 가중 타임라인.
 *
 * 글자마다 같은 시간이 걸린다고 보면 하이라이트가 실제 발음과 어긋난다.
 * 받침이 있는 음절은 눈에 띄게 길고, 공백·문장부호는 소리가 아니라 쉼이며,
 * 발화 끝에는 무음 꼬리가 붙기 때문이다.
 */

export interface SpokenSegment {
  char: string;
  /** 전체 발화에서 이 글자가 차지하는 구간 (0~1) */
  start: number;
  end: number;
  /** 소리가 나는 글자인지. 공백·문장부호는 강조하지 않는다 */
  voiced: boolean;
}

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;
const JONGSEONG_COUNT = 28;

const WEIGHT = {
  /** 어절 사이 짧은 쉼 */
  space: 0.34,
  /** 쉼표류 — 공백보다 확실히 쉰다 */
  comma: 0.62,
  /** 문장 끝 — 가장 길게 쉰다 */
  sentenceEnd: 1.05,
  /** 받침 없는 음절 (기준값) */
  syllable: 1,
  /** 받침 있는 음절은 종성을 닫는 시간이 더 든다 */
  syllableWithFinal: 1.3,
  /** 숫자·영문 등 */
  other: 0.82,
} as const;

/** 발화 끝 무음. 이게 없으면 마지막 글자가 실제보다 늦게까지 강조된다. */
const TAIL_WEIGHT = 0.75;

function weightOf(char: string): { weight: number; voiced: boolean } {
  if (/\s/u.test(char)) return { weight: WEIGHT.space, voiced: false };
  if (/[.!?…]/u.test(char)) return { weight: WEIGHT.sentenceEnd, voiced: false };
  if (/[,·~;:]/u.test(char)) return { weight: WEIGHT.comma, voiced: false };

  const code = char.codePointAt(0) ?? 0;
  if (code >= HANGUL_BASE && code <= HANGUL_LAST) {
    const hasFinal = (code - HANGUL_BASE) % JONGSEONG_COUNT !== 0;
    return {
      weight: hasFinal ? WEIGHT.syllableWithFinal : WEIGHT.syllable,
      voiced: true,
    };
  }
  return { weight: WEIGHT.other, voiced: true };
}

/** 글자별 재생 구간을 만든다. 소리 나는 글자가 없으면 빈 배열. */
export function buildSpokenTimeline(text: string): SpokenSegment[] {
  const chars = Array.from(text ?? "");
  if (chars.length === 0) return [];

  const weights = chars.map(weightOf);
  const total =
    weights.reduce((sum, w) => sum + w.weight, 0) + TAIL_WEIGHT;
  if (total <= 0) return [];

  let cursor = 0;
  return chars.map((char, index) => {
    const start = cursor / total;
    cursor += weights[index]!.weight;
    return {
      char,
      start,
      end: cursor / total,
      voiced: weights[index]!.voiced,
    };
  });
}
