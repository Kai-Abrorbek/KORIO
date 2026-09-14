import {
  GRAMMAR_QUESTIONS_PER_NODE,
  splitGrammarLessonParts,
} from './grammar-track.util';

describe('splitGrammarLessonParts', () => {
  const lesson = (count: number) => ({
    title: '문법',
    questions: Array.from({ length: count }, (_, index) => `q${index + 1}`),
  });

  it('20문항을 15문항과 나머지 5문항으로 나눈다', () => {
    const parts = splitGrammarLessonParts([lesson(20)]);

    expect(parts.map((part) => part.lesson.questions.length)).toEqual([15, 5]);
    expect(parts.flatMap((part) => part.lesson.questions)).toEqual(
      lesson(20).questions,
    );
  });

  it('모든 파트를 최대 문항 수 이하로 유지한다', () => {
    const parts = splitGrammarLessonParts([lesson(31)]);

    expect(parts.map((part) => part.lesson.questions.length)).toEqual([
      15, 15, 1,
    ]);
    expect(
      parts.every(
        (part) => part.lesson.questions.length <= GRAMMAR_QUESTIONS_PER_NODE,
      ),
    ).toBe(true);
  });

  it('15문항 이하는 기존 레슨 하나를 유지한다', () => {
    const parts = splitGrammarLessonParts([lesson(15)]);

    expect(parts).toHaveLength(1);
    expect(parts[0]).toMatchObject({
      sourceIndex: 0,
      partIndex: 0,
      partCount: 1,
    });
  });
});
