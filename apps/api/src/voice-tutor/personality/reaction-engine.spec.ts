import { performTutorReaction } from './reaction-engine';
import { elevenLabsPerformance } from './speech-performance';

describe('voice tutor reaction engine', () => {
  it('keeps display and speech distinct while preserving a teachable correction', () => {
    const result = performTutorReaction({
      text: '배구리가 뭐야? 배고파야. 다시 말해 봐.',
      speechText: '아니이이이! 배구리가 뭐야? 배고파야. 다시 말해 봐.',
      language: 'ko',
      correction: { original: '배구리', corrected: '배고파' },
      emotion: 'disbelief',
      delivery: 'shout',
      intensity: 0.95,
      gesture: 'hand_raise_3',
    });
    expect(result.displayText).toContain('배고파');
    expect(result.speechText).toContain('아니이이이');
    expect(result.correction).toEqual({ wrong: '배구리', correct: '배고파' });
    expect(result.gesture).toBe('hand_raise_3');
  });

  it('leaves the size of the reaction to the teacher, whatever the personality', () => {
    const result = performTutorReaction({
      text: '대박! 진짜 맞혔어요!',
      language: 'ko',
      correction: null,
      delivery: 'shout',
      intensity: 1,
    });
    expect(result.intensity).toBe(1);
    expect(result.delivery).toBe('shout');
  });

  it('keeps inline audio tags for the voice and out of the subtitle', () => {
    const result = performTutorReaction({
      text: '[gasps] 진짜? [laughs] 또 라면이야?',
      language: 'ko',
      correction: null,
    });
    expect(result.displayText).toBe('진짜? 또 라면이야?');
    expect(result.speechText).toBe('[gasps] 진짜? [laughs] 또 라면이야?');
  });

  it('only sends expressive audio tags to Eleven v3', () => {
    const reaction = performTutorReaction({
      text: '야아아!',
      language: 'ko',
      correction: null,
      delivery: 'shout',
      intensity: 0.9,
    });
    expect(
      elevenLabsPerformance(
        '[shouting] 야아아!',
        'eleven_multilingual_v2',
        reaction,
      ).text,
    ).toBe('야아아!');
    expect(elevenLabsPerformance('야아아!', 'eleven_v3', reaction).text).toBe(
      '[shouts] 야아아!',
    );
  });

  it.each(['laughing', 'shocked', 'disbelief'] as const)(
    'honors normal delivery for a strong %s reaction',
    (emotion) => {
      const reaction = performTutorReaction({
        text: '배고파라고 해. 다시 해 봐.',
        language: 'ko',
        correction: { original: '배구리', corrected: '배고파' },
        emotion,
        delivery: 'normal',
        intensity: 0.95,
      });
      expect(
        elevenLabsPerformance(reaction.speechText, 'eleven_v4_turbo', reaction)
          .text,
      ).toBe('배고파라고 해. 다시 해 봐.');
    },
  );

  it.each([
    ['shout', '[shouts]'],
    ['whisper', '[whispers]'],
    ['laugh', '[laughs]'],
    ['dramatic', '[dramatic]'],
  ] as const)('preserves explicit %s delivery', (delivery, tag) => {
    const reaction = performTutorReaction({
      text: '다시 말해 봐.',
      language: 'ko',
      correction: null,
      emotion: 'laughing',
      delivery,
      intensity: 0.95,
    });
    expect(
      elevenLabsPerformance(reaction.speechText, 'eleven_v4_turbo', reaction)
        .text,
    ).toBe(`${tag} 다시 말해 봐.`);
  });

  it('does not add an opening tag without reaction metadata', () => {
    expect(elevenLabsPerformance('다시 말해 봐.', 'eleven_v4_turbo').text).toBe(
      '다시 말해 봐.',
    );
  });
});
