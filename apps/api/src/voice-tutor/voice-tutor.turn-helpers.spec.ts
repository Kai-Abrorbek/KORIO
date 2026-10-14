import {
  findPreemptivePhantom,
  lessonProgress,
  planForTopic,
  sttKeywordsFromPlan,
} from './voice-tutor-turn-helpers';
import { VOICE_TUTOR_TOPIC_BY_ID } from './topics/voice-tutor-topics';

describe('Voice Tutor turn helpers', () => {
  const now = new Date();
  it('finds the unheard preemptive draft when the learner kept talking', () => {
    const history = [
      { role: 'teacher', text: '안녕!', turnId: 'a', createdAt: now },
      { role: 'user', text: '저는', turnId: 'b', createdAt: now },
      { role: 'teacher', text: '오 좋아!', turnId: 'b', createdAt: now },
    ];
    expect(findPreemptivePhantom(history, '저는 학생이에요')).toEqual(
      history.slice(1),
    );
  });

  it('leaves a normal previous turn alone', () => {
    const history = [
      { role: 'user', text: '배고파', turnId: 'b', createdAt: now },
      { role: 'teacher', text: '좋아!', turnId: 'b', createdAt: now },
    ];
    expect(findPreemptivePhantom(history, '밥 먹자')).toBeNull();
    expect(findPreemptivePhantom(history, '배고파')).toBeNull();
  });

  it('keeps only short Hangul lesson words as recognizer keywords', () => {
    expect(
      sttKeywordsFromPlan({
        lessonGoal: '',
        reviewTopics: ['-는데요 표현'],
        newTopics: [],
        targetVocabulary: ['배고파', '맛있어요, 잘 가요', 'hungry', '배고파'],
        grammarFocus: [],
        conversationScenario: '',
        difficulty: '',
      }),
    ).toEqual(['배고파', '맛있어요', '잘 가요']);
  });

  it('keeps topic seed material without creating a fixed curriculum', () => {
    const base = {
      lessonGoal: '',
      reviewTopics: [],
      newTopics: [],
      targetVocabulary: [],
      grammarFocus: [],
      conversationScenario: '',
      difficulty: '',
    };
    const plan = planForTopic(base, VOICE_TUTOR_TOPIC_BY_ID.get('cafe')!);
    expect(plan.curriculum).toBeUndefined();
    expect(plan.targetVocabulary.length).toBeGreaterThan(0);
    expect(plan.lessonGoal).toContain('카페');
    expect(base.lessonGoal).toBe('');
  });

  it.each([0, 1, 5, 28, 60])(
    'reports coverage without scheduling a stage at turn %i',
    (turn) => {
      expect(lessonProgress(turn, ['배고파', '배고파', '맛있어요'])).toEqual({
        turn,
        alreadyTaught: ['배고파', '맛있어요'],
      });
    },
  );

  it('bounds coverage to forty distinct recent items', () => {
    const items = Array.from({ length: 60 }, (_, i) => `표현${i}`);
    expect(lessonProgress(60, items).alreadyTaught).toEqual(items.slice(-40));
  });
});
