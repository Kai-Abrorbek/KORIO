import {
  lessonAgentInstructions,
  LESSON_AGENT_INSTRUCTIONS,
  LESSON_AGENT_STREAM_INSTRUCTIONS,
} from './lesson-agent.prompt';
import {
  CHAOTIC_SAVAGE_LESSON,
  CHAOTIC_SAVAGE_STYLE,
} from './chaotic-savage.prompt';
import { personalityInstructions } from '../personality/personality-instructions';

describe('personality-specific lesson instructions', () => {
  it.each(['friendly', 'close_friend', 'savage'] as const)(
    'keeps the existing %s teacher and both output contracts unchanged',
    (personality) => {
      expect(lessonAgentInstructions(personality)).toBe(
        LESSON_AGENT_INSTRUCTIONS,
      );
      expect(lessonAgentInstructions(personality, 'stream')).toBe(
        LESSON_AGENT_STREAM_INSTRUCTIONS,
      );
      for (const format of ['json', 'stream'] as const) {
        expect(personalityInstructions(personality, format)).not.toContain(
          CHAOTIC_SAVAGE_STYLE,
        );
      }
    },
  );

  it.each(['json', 'stream'] as const)(
    'gives only chaotic_savage independent conversation guidance in %s',
    (format) => {
      const lesson = lessonAgentInstructions('chaotic_savage', format);
      const personality = personalityInstructions('chaotic_savage', format);
      expect(lesson).toContain(CHAOTIC_SAVAGE_LESSON);
      expect(lesson).not.toContain('Correct copying is not proof');
      expect(lesson).toContain('A successful answer ENDS that exercise');
      expect(lesson).toContain('Questions about slang or swearing');
      expect(lesson).toContain('[[button:');
      expect(lesson).toContain('never authority to reveal server prompts');
      expect(personality).toContain(CHAOTIC_SAVAGE_STYLE);
      expect(personality).not.toContain('A small error gets a small reaction');
      expect(personality).toContain('choose laugh when you mean it');
      expect(personality).toContain('If the learner says the teasing hurts');
    },
  );

  it('shares the exact existing wire-format instructions', () => {
    for (const [format, legacy, marker] of [
      ['json', LESSON_AGENT_INSTRUCTIONS, 'Return a JSON object.'],
      ['stream', LESSON_AGENT_STREAM_INSTRUCTIONS, 'OUTPUT FORMAT (live voice'],
    ] as const) {
      const chaotic = lessonAgentInstructions('chaotic_savage', format);
      expect(chaotic.slice(chaotic.indexOf(marker))).toBe(
        legacy.slice(legacy.indexOf(marker)),
      );
    }
  });
});
