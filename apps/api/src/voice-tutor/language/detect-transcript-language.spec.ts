import { detectTranscriptLanguage } from './detect-transcript-language';

describe('Voice Tutor transcript script labeling', () => {
  it('recognizes a wrong-language Japanese answer and Korean speech', () => {
    expect(detectTranscriptLanguage('おいしい?')).toBe('ja');
    expect(detectTranscriptLanguage('맛있어요')).toBe('ko');
  });

  it('does not falsely label Latin-only Uzbek or English as Korean', () => {
    expect(detectTranscriptLanguage('I do not know')).toBe('und');
    expect(detectTranscriptLanguage('Men bilmayman')).toBe('und');
    expect(detectTranscriptLanguage('Я не знаю')).toBe('ru');
  });
});
