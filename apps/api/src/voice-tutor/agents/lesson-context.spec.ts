import { buildLessonInput } from './lesson-context';

describe('voice tutor lesson context', () => {
  it('bounds conversation history to the last twelve messages', () => {
    const input = JSON.parse(
      buildLessonInput(
        {
          settings: {
            voiceId: 'teacher',
            speechStyle: 'polite',
            explanationLanguage: 'ru',
            koreanLevel: 'beginner',
          },
          plan: {
            lessonGoal: '시장 주문',
            reviewTopics: [],
            newTopics: [],
            targetVocabulary: [],
            grammarFocus: [],
            conversationScenario: '시장',
            difficulty: 'beginner',
          },
          memorySummary: '지난 수업에서 숫자를 배움',
          strongPoints: [],
          weakPoints: [],
          repeatedMistakes: [],
        },
        Array.from({ length: 20 }, (_, index) => ({
          role: index % 2 ? ('teacher' as const) : ('user' as const),
          text: String(index),
        })),
      ),
    ) as {
      recent: { role: string; text: string }[];
      student: { explanationLanguage: string };
    };
    expect(input.recent).toHaveLength(12);
    expect(input.recent[0].text).toBe('8');
    expect(input.student.explanationLanguage).toBe('ru');
  });
});
