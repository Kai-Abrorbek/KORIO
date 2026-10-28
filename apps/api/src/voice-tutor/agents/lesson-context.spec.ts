import {
  buildLessonInput,
  lastTargetPhrase,
  repeatedAsk,
} from './lesson-context';

describe('voice tutor lesson context', () => {
  it('bounds conversation history to the last twenty-four messages', () => {
    const input = JSON.parse(
      buildLessonInput(
        {
          settings: {
            voiceId: 'teacher',
            speechStyle: 'polite',
            explanationLanguage: 'ru',
            koreanLevel: 'beginner',
            personality: 'friendly',
            characterId: 'female_01',
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
          recurringMistakes: [],
        },
        Array.from({ length: 30 }, (_, index) => ({
          role: index % 2 ? ('teacher' as const) : ('user' as const),
          text: String(index),
        })),
      ),
    ) as {
      recent: { role: string; text: string }[];
      student: { explanationLanguage: string };
      recentTeacherOpenings: string[];
    };
    expect(input.recent).toHaveLength(24);
    expect(input.recent[0].text).toBe('6');
    expect(input.student.explanationLanguage).toBe('ru');
    expect(input.recentTeacherOpenings).toEqual(['23', '25', '27', '29']);
  });

  it('flags a line the teacher asked for in both of its last two turns', () => {
    const teacher = (text: string) => ({ role: 'teacher' as const, text });
    const learner = (text: string) => ({ role: 'user' as const, text });
    // The gpt-5.6-terra eval run: "네, 매워요" four turns in a row.
    expect(
      repeatedAsk(
        [
          teacher(
            'Endi achchiq: 매워요. Kimchi achchiqmi? “네, 매워요” deb ayt.',
          ),
          learner('저는 학생이에요'),
          teacher('[laughs] Qochding. 네, 매워요 deb ayt.'),
        ],
        'ko',
      ),
    ).toBe('네, 매워요');
    // Same cue, different lines: not stuck.
    expect(
      repeatedAsk(
        [
          teacher('맛있게 먹었어요. Qani, ayt.'),
          teacher('저는 어제 학교에 갔어요. Qani, ayt.'),
        ],
        'ko',
      ),
    ).toBeUndefined();
    expect(lastTargetPhrase('좋아! 배고파요. 다시 말해 봐!', 'ko')).toBe(
      '배고파요',
    );
    expect(
      repeatedAsk(
        [teacher("Say: “I'm sorry.”"), teacher("Almost! Say “I'm sorry.”")],
        'en',
      ),
    ).toBe("I'm sorry.");
  });
});
