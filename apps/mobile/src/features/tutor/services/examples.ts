/**
 * 자막에서 "따라 해볼 문장"을 뽑는다.
 *
 * 튜터는 교정할 때 자연스러운 표현을 작은따옴표로 감싸서 말한다
 * ("'친구를 만나서 영화를 봤어요' 라고 하면 더 자연스러워요").
 * 그 부분이 바로 학습자가 정확한 발음으로 들어야 하는 자리다.
 *
 * 대화 모델의 목소리는 영어 우선이라 한국어 발음이 정확하지 않다. 그래서
 * 이 문장들만 따로 뽑아, 이미 쓰고 있는 Azure ko-KR 목소리로 들려준다.
 */
const QUOTE = /['‘"“]([^'’"”]{2,60})['’"”]/g;

/** 한글이 실제로 들어있는 따옴표 구간만 (영어·우즈벡어 인용은 제외) */
const HAS_HANGUL = /[가-힣]/;

export function extractExamples(caption: string): string[] {
  if (!caption) return [];
  const found: string[] = [];
  for (const m of caption.matchAll(QUOTE)) {
    const text = m[1].trim();
    if (!HAS_HANGUL.test(text)) continue;
    // 문법 조각 인용("'-아서'", "'~는데'")은 따라 할 문장이 아니다
    if (/^[-~–—]/.test(text)) continue;
    // 너무 짧은 것도 문장이 아니다 (조사·어미 설명일 가능성이 크다)
    if (text.replace(/[^가-힣]/g, "").length < 4) continue;
    if (!found.includes(text)) found.push(text);
  }
  return found.slice(0, 3);
}
