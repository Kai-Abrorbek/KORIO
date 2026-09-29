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

  it('walks a topic lesson through its stages and never runs out', () => {
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
    expect(plan.curriculum?.length).toBe(7);
    expect(lessonProgress(plan, 1, []).stage).toBe('1/7');
    expect(lessonProgress(plan, 5, []).stage).toBe('2/7');
    const late = lessonProgress(plan, 60, ['배고파']);
    expect(late.stage).toBe('7/7');
    expect(late.nextStage).toBeNull();
    expect(late.currentStage).toContain('deeper');
    expect(late.alreadyTaught).toEqual(['배고파']);
  });

  it('builds default stages for a planner plan without a curriculum', () => {
    const progress = lessonProgress(
      {
        lessonGoal: '카페 주문',
        reviewTopics: ['-고 싶어요'],
        newTopics: [],
        targetVocabulary: ['아메리카노'],
        grammarFocus: [],
        conversationScenario: '',
        difficulty: '',
      },
      1,
      [],
    );
    expect(progress.currentStage).toContain('-고 싶어요');
  });
});
