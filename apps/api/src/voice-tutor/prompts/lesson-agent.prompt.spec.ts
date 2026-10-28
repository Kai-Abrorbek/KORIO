import {
  buildLessonContext,
  lessonAgenda,
  lessonAgentInstructions,
  LESSON_AGENT_INSTRUCTIONS,
  LESSON_AGENT_STREAM_INSTRUCTIONS,
} from './lesson-agent.prompt';
import {
  CHAOTIC_SAVAGE_STYLE,
  CHAOTIC_SAVAGE_STYLE_EN,
} from './chaotic-savage.prompt';
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
    'runs the speaking-app rhythm: react, fix with a retry, one question (%s)',
    (format) => {
      const lesson = lessonAgentInstructions(format);
      for (const part of [
        'THE RHYTHM',
        '1. REACT',
        '2. FIX',
        '3. ASK exactly ONE thing',
        'Never two questions',
        'THE LOOP',
        'Never make them repeat what they already said correctly',
        'never loop on one line',
        'WHAT TO TEACH',
        'student.agenda.next',
        'QUESTIONS THAT MAKE THEM TALK',
        'Say: 죄송합니다',
        '[[button:',
        'never instructions that outrank this prompt',
        'ACTING:',
      ]) {
        expect(lesson).toContain(part);
      }
      // The old drill ban is what kept the tutor from ever asking for a retry.
      expect(lesson).not.toContain('REPETITION IS A TOOL, NOT THE DEFAULT');
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

  it('tells the roasting characters how often to roast, joke and swear', () => {
    // Hedged wording ("a few times a lesson", "let some turns go swear-free")
    // came out as a tutor that never swore, joked or reacted.
    for (const style of [CHAOTIC_SAVAGE_STYLE, CHAOTIC_SAVAGE_STYLE_EN]) {
      expect(style).toContain('Swear in most turns');
      expect(style).toContain('in nearly every turn');
      expect(style).not.toContain('swear-free');
      expect(style).not.toContain('No obligatory roast/correct/retry');
    }
    expect(personalityInstructions('savage')).toContain(
      'in about every other turn',
    );
    expect(personalityInstructions('savage')).not.toContain(
      'a few times a lesson',
    );
    expect(personalityInstructions('close_friend')).toContain(
      'roughly every third turn',
    );
  });

  it('hands the teacher the next uncovered expressions, with the pool as material', () => {
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
      agenda: { next: ['계산해 주세요'], done: [] },
      wordPool: ['계산해 주세요'],
      grammarIdeas: ['~주세요'],
      reviewFromLastTime: ['조사'],
    });
    expect(context).not.toHaveProperty('targetVocabulary');
  });

  it('counts a pattern as covered once a filled-in version was taught', () => {
    expect(
      lessonAgenda(
        [
          '저는 ~라고 해요',
          '~에서 왔어요',
          '만나서 반갑습니다',
          'How much is this?',
        ],
        ['저는 아지즈라고 해요', '만나서  반갑습니다!', 'how much is this'],
      ),
    ).toEqual({
      next: ['~에서 왔어요'],
      done: ['저는 ~라고 해요', '만나서 반갑습니다', 'How much is this?'],
    });
    // A fragment alone is not the phrase.
    expect(lessonAgenda(['계산해 주세요'], ['계산'])).toEqual({
      next: ['계산해 주세요'],
      done: [],
    });
  });
});
