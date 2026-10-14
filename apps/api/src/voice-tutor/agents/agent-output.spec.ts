import { parseLessonReply, parsePlan, parseProgress } from './agent-output';

describe('voice tutor agent output', () => {
  it('normalizes newly taught items identically for JSON and stream metadata', () => {
    expect(
      parseLessonReply({
        text: '한 잔 주세요',
        taught: [' 한 잔 ', null, 4, '', '한 잔', '주세요'],
      })?.taught,
    ).toEqual(['한 잔', '주세요']);
    expect(parseLessonReply({ text: '좋아' })?.taught).toEqual([]);
    const taught = parseLessonReply({
      text: '좋아',
      taught: Array.from({ length: 20 }, (_, i) => `${i}${'가'.repeat(70)}`),
    })!.taught;
    expect(taught).toHaveLength(6);
    expect(taught.every((item) => item.length === 60)).toBe(true);
  });
  it('rejects an empty teacher turn and bounds model output', () => {
    expect(parseLessonReply({ text: ' ' })).toBeNull();
    expect(
      parseLessonReply({ text: '안녕하세요', language: 'invalid' }),
    ).toMatchObject({
      text: '안녕하세요',
      language: 'ko',
      correction: null,
    });
  });

  it('accepts a subtitle and speech response without the legacy text field', () => {
    expect(
      parseLessonReply({
        displayText: '배고파라고 말해 봐.',
        speechText: '배.고.파. 다시 말해 봐.',
        language: 'ko',
      }),
    ).toMatchObject({
      text: '배고파라고 말해 봐.',
      displayText: '배고파라고 말해 봐.',
      speechText: '배.고.파. 다시 말해 봐.',
    });
  });

  it('keeps progress memory structured and bounded', () => {
    const progress = parseProgress({
      grammarMistakes: [
        '-는데요',
        1,
        '',
        ...Array.from({ length: 20 }, () => 'extra'),
      ],
      estimatedLevel: 'beginner',
    });
    expect(progress.grammarMistakes).toHaveLength(8);
    expect(progress.estimatedLevel).toBe('beginner');
    expect(progress.weakVocabulary).toEqual([]);
  });

  it('requires a goal for the next lesson plan', () => {
    expect(parsePlan({ newTopics: ['shopping'] })).toBeNull();
    expect(
      parsePlan({ lessonGoal: '시장 주문', reviewTopics: ['숫자'] }),
    ).toMatchObject({
      lessonGoal: '시장 주문',
      reviewTopics: ['숫자'],
      difficulty: '',
    });
  });
});
