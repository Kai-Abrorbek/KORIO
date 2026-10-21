import {
  elevenLabsPerformance,
  performLaughNotation,
  stripAudioTags,
} from './speech-performance';

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
      elevenLabsPerformance('아니 ㅋㅋㅋㅋ 배구리', 'eleven_v4_turbo', calm)
        .text,
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

  it('passes the teacher’s own audio tags to an expressive voice without doubling the opening', () => {
    const loud = { ...calm, delivery: 'shout' as const, intensity: 0.9 };
    expect(
      elevenLabsPerformance(
        '[gasps] 진짜? [laughs] 미쳤다',
        'eleven_v4_turbo',
        loud,
      ).text,
    ).toBe('[gasps] 진짜? [laughs] 미쳤다');
    expect(
      elevenLabsPerformance('진짜? [laughs] 미쳤다', 'eleven_v3', loud).text,
    ).toBe('[shouts] 진짜? [laughs] 미쳤다');
  });

  it('removes every audio tag for a model that would read it aloud', () => {
    expect(
      elevenLabsPerformance(
        '[sighs] 아이고, [fake crying] 또 라면이야?',
        'eleven_multilingual_v2',
        calm,
      ).text,
    ).toBe('아이고, 또 라면이야?');
  });

  it('keeps subtitle punctuation tidy where a tag was removed', () => {
    expect(stripAudioTags('진짜 [laughs]? 대박 [gasps]!')).toBe('진짜? 대박!');
  });
});
