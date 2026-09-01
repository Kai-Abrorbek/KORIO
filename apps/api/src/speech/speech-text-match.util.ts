/** 공백·문장부호 차이는 발음 내용 비교에서 제외한다. */
export function normalizeSpeechText(value: string): string {
  return (value ?? '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
}

/** 참조 문장과 Azure가 실제로 인식한 문장의 문자 편집 유사도(0~100). */
export function speechTextSimilarity(
  referenceText: string,
  transcript: string,
): number {
  const reference = Array.from(normalizeSpeechText(referenceText));
  const heard = Array.from(normalizeSpeechText(transcript));
  if (!reference.length || !heard.length) return 0;

  let previous = Array.from({ length: heard.length + 1 }, (_, index) => index);
  for (let refIndex = 1; refIndex <= reference.length; refIndex += 1) {
    const current = [refIndex];
    for (let heardIndex = 1; heardIndex <= heard.length; heardIndex += 1) {
      const substitutionCost =
        reference[refIndex - 1] === heard[heardIndex - 1] ? 0 : 1;
      current[heardIndex] = Math.min(
        (previous[heardIndex] ?? 0) + 1,
        (current[heardIndex - 1] ?? 0) + 1,
        (previous[heardIndex - 1] ?? 0) + substitutionCost,
      );
    }
    previous = current;
  }

  const distance =
    previous[heard.length] ?? Math.max(reference.length, heard.length);
  const longest = Math.max(reference.length, heard.length);
  return Math.max(0, Math.round((1 - distance / longest) * 100));
}

/**
 * 짧은 표현은 한두 음절만 달라도 뜻이 바뀌므로 더 엄격하게, 긴 문장은
 * Azure가 조사 한두 개를 다르게 인식할 여지를 둔다.
 */
export function speechTextSimilarityThreshold(referenceText: string): number {
  const length = Array.from(normalizeSpeechText(referenceText)).length;
  if (length <= 2) return 100;
  if (length <= 5) return 75;
  if (length <= 10) return 65;
  return 60;
}
