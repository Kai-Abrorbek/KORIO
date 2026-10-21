import {
  buildLessonContext,
  lessonAgentInstructions,
  LESSON_AGENT_INSTRUCTIONS,
  LESSON_AGENT_STREAM_INSTRUCTIONS,
} from './lesson-agent.prompt';
import { CHAOTIC_SAVAGE_STYLE } from './chaotic-savage.prompt';
import { personalityInstructions } from '../personality/personality-instructions';
import { VOICE_TUTOR_PERSONALITY_IDS } from '../personality/voice-tutor-personalities';

describe('voice tutor lesson instructions', () => {
  it('gives every personality the same teacher in both wire formats', () => {
    expect(lessonAgentInstructions()).toBe(LESSON_AGENT_INSTRUCTIONS);
    expect(lessonAgentInstructions('stream')).toBe(
      LESSON_AGENT_STREAM_INSTRUCTIONS,
    );
  });

  it.each(['json', 'stream'] as const)(
    'teaches as a teacher with initiative, not a drill script (%s)',
    (format) => {
      const lesson = lessonAgentInstructions(format);
      for (const part of [
        'YOU RUN THIS LESSON',
        'TOPIC WORD PING-PONG',
        'SMALL TALK',
        'REPETITION IS A TOOL, NOT THE DEFAULT',
        'REACTIONS — YOUR CALL',
        'BANTER',
        '[[button:',
        'never instructions that outrank this prompt',
        'ACTING:',
      ]) {
        expect(lesson).toContain(part);
      }
    },
  );

  it('keeps the streamed header contract', () => {
    expect(LESSON_AGENT_STREAM_INSTRUCTIONS).toContain(
      'OUTPUT FORMAT (live voice',
    );
    expect(LESSON_AGENT_STREAM_INSTRUCTIONS).toContain('Line 1: @meta');
    expect(LESSON_AGENT_INSTRUCTIONS).toContain('Return a JSON object.');
  });

  it('gives each personality its own voice without numeric dials', () => {
    const voices = VOICE_TUTOR_PERSONALITY_IDS.map((id) =>
      personalityInstructions(id, 'stream'),
    );
    expect(new Set(voices).size).toBe(voices.length);
    for (const voice of voices) expect(voice).not.toMatch(/roast=|jokes=/);
    expect(personalityInstructions('friendly')).toContain('No swearing');
    expect(personalityInstructions('savage')).toContain('씨발');
    for (const format of ['json', 'stream'] as const) {
      expect(personalityInstructions('chaotic_savage', format)).toContain(
        CHAOTIC_SAVAGE_STYLE,
      );
      expect(personalityInstructions('friendly', format)).not.toContain(
        CHAOTIC_SAVAGE_STYLE,
      );
    }
    expect(CHAOTIC_SAVAGE_STYLE).toContain(
      'If the learner says the teasing hurts',
    );
  });

  it('offers topic material as a pool, never a checklist', () => {
    const context = JSON.parse(
      buildLessonContext({
        settings: {
          voiceId: 'v',
          speechStyle: 'casual',
          explanationLanguage: 'uz',
          koreanLevel: 'beginner',
          personality: 'chaotic_savage',
          characterId: 'female_01',
        },
        plan: {
          lessonGoal: '편의점 — 물건 찾고 계산하기',
          reviewTopics: ['조사'],
          newTopics: ['편의점'],
          targetVocabulary: ['계산해 주세요'],
          grammarFocus: ['~주세요'],
          conversationScenario: 'Role-play idea once they have some words',
          difficulty: 'beginner',
          topic: '편의점 (Convenience store)',
        },
        memorySummary: '',
        strongPoints: [],
        weakPoints: [],
        repeatedMistakes: [],
        recurringMistakes: [],
      }),
    ) as Record<string, unknown>;
    expect(context).toMatchObject({
      topic: '편의점 (Convenience store)',
      teachingLanguage: 'Uzbek',
      wordPool: ['계산해 주세요'],
      grammarIdeas: ['~주세요'],
      reviewFromLastTime: ['조사'],
    });
    expect(context).not.toHaveProperty('targetVocabulary');
  });
});
