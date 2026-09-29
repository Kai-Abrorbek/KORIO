import { elevenLabsPerformance, performLaughNotation } from './speech-performance';

describe('Voice Tutor speech performance', () => {
  const calm = {
    displayText: '',
    speechText: '',
    language: 'ko',
    emotion: 'neutral' as const,
    delivery: 'normal' as const,
    intensity: 0.2,
  };

  it('turns chat laughter into a real laugh instead of reading 크크크', () => {
    expect(
      elevenLabsPerformance('아니 ㅋㅋㅋㅋ 배구리', 'eleven_v4_turbo', calm).text,
    ).toBe('아니 [laughs] 배구리');
  });

  it('keeps spelled-out laughter and elongation for the voice to perform', () => {
    expect(performLaughNotation('AHAHAHA!!! 야아아아!!!', true)).toBe(
      'AHAHAHA!!! 야아아아!!!',
    );
  });

  it('drops laugh marks for a model without audio tags', () => {
    expect(performLaughNotation('좋아 ㅋㅋㅋ 다시', false)).toBe('좋아 다시');
  });
});
