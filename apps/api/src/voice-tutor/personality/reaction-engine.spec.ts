import { performTutorReaction } from './reaction-engine';
import { elevenLabsPerformance } from './speech-performance';
import type { TutorSettings } from '../voice-tutor.types';

const settings: TutorSettings = {
  voiceId: 'test',
  speechStyle: 'casual',
  explanationLanguage: 'en',
  koreanLevel: 'beginner',
  personality: 'chaotic_savage',
  characterId: 'female_01',
};

describe('voice tutor reaction engine', () => {
  it('keeps display and speech distinct while preserving a teachable correction', () => {
    const result = performTutorReaction(
      {
        text: '배구리가 뭐야? 배고파야. 다시 말해 봐.',
        speechText: '아니이이이! 배구리가 뭐야? 배고파야. 다시 말해 봐.',
        language: 'ko',
        correction: { original: '배구리', corrected: '배고파' },
        emotion: 'disbelief',
        delivery: 'shout',
        intensity: 0.95,
        gesture: 'hand_raise_3',
      },
      settings,
    );
    expect(result.displayText).toContain('배고파');
    expect(result.speechText).toContain('아니이이이');
    expect(result.correction).toEqual({ wrong: '배구리', correct: '배고파' });
    expect(result.gesture).toBe('hand_raise_3');
  });

  it('caps friendly intensity and never shouts', () => {
    const result = performTutorReaction(
      {
        text: '다시 해 볼까요?',
        language: 'ko',
        correction: null,
        delivery: 'shout',
        intensity: 1,
      },
      { ...settings, personality: 'friendly' },
    );
    expect(result.intensity).toBe(0.4);
    expect(result.delivery).toBe('normal');
  });

  it('only sends expressive audio tags to Eleven v3', () => {
    const reaction = performTutorReaction(
      {
        text: '야아아!',
        language: 'ko',
        correction: null,
        delivery: 'shout',
        intensity: 0.9,
      },
      settings,
    );
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

  it('turns a laughing emotion into a v3 laugh even with normal delivery', () => {
    const reaction = performTutorReaction(
      {
        text: '배구리? 너무 웃기다! 배고파라고 해.',
        language: 'ko',
        correction: { original: '배구리', corrected: '배고파' },
        emotion: 'laughing',
        delivery: 'normal',
        intensity: 0.7,
      },
      settings,
    );
    expect(
      elevenLabsPerformance(reaction.speechText, 'eleven_v3', reaction).text,
    ).toBe('[laughs] 배구리? 너무 웃기다! 배고파라고 해.');
  });

  it('shouts only for strong surprise and respects an explicit whisper', () => {
    const shocked = performTutorReaction(
      {
        text: '어제가 오늘이 됐어? 다시 말해 봐.',
        language: 'ko',
        correction: null,
        emotion: 'disbelief',
        delivery: 'normal',
        intensity: 0.9,
      },
      settings,
    );
    expect(
      elevenLabsPerformance(shocked.speechText, 'eleven_v3', shocked).text,
    ).toBe('[shouts] 어제가 오늘이 됐어? 다시 말해 봐.');
    expect(
      elevenLabsPerformance(shocked.speechText, 'eleven_v3', {
        ...shocked,
        intensity: 0.4,
      }).text,
    ).toBe('어제가 오늘이 됐어? 다시 말해 봐.');
    expect(
      elevenLabsPerformance(shocked.speechText, 'eleven_v3', {
        ...shocked,
        delivery: 'whisper',
      }).text,
    ).toBe('[whispers] 어제가 오늘이 됐어? 다시 말해 봐.');
  });
});
