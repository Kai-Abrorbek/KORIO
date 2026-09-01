import {
  normalizeSpeechText,
  speechTextSimilarity,
  speechTextSimilarityThreshold,
} from './speech-text-match.util';

describe('speech text match', () => {
  it('ignores spacing and punctuation', () => {
    expect(normalizeSpeechText('안녕 하세요!')).toBe('안녕하세요');
    expect(speechTextSimilarity('안녕하세요.', '안녕 하세요')).toBe(100);
  });

  it('rejects a clearly unrelated Korean sentence', () => {
    const reference = '지하철역이 어디예요?';
    const heard = '오늘 날씨가 정말 좋아요.';
    expect(speechTextSimilarity(reference, heard)).toBeLessThan(
      speechTextSimilarityThreshold(reference),
    );
  });

  it('allows one recognition error in a short expression', () => {
    const reference = '안녕하세요';
    expect(
      speechTextSimilarity(reference, '안녕하세오'),
    ).toBeGreaterThanOrEqual(speechTextSimilarityThreshold(reference));
  });

  it('requires an exact match for a one or two character expression', () => {
    expect(speechTextSimilarityThreshold('네')).toBe(100);
    expect(speechTextSimilarity('네', '내')).toBe(0);
  });

  it('returns zero when Azure produced no transcript', () => {
    expect(speechTextSimilarity('감사합니다', '')).toBe(0);
  });
});
