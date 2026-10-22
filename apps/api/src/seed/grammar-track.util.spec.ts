import { splitGrammarLessonParts } from './grammar-track.util';

const lesson = (count: number) => ({
  questions: Array.from({ length: count }, (_, index) => `q${index + 1}`),
});

describe('splitGrammarLessonParts', () => {
  it('balances a twenty-question grammar lesson as ten and ten', () => {
    const parts = splitGrammarLessonParts([lesson(20)]);

    expect(parts.map((part) => part.lesson.questions.length)).toEqual([10, 10]);
    expect(parts.map((part) => part.partIndex)).toEqual([0, 1]);
    expect(parts.every((part) => part.partCount === 2)).toBe(true);
  });

  it('keeps order while balancing larger lessons within the maximum', () => {
    const source = lesson(31);
    const parts = splitGrammarLessonParts([source]);

    expect(parts.map((part) => part.lesson.questions.length)).toEqual([
      11, 10, 10,
    ]);
    expect(parts.flatMap((part) => part.lesson.questions)).toEqual(
      source.questions,
    );
    expect(
      Math.max(...parts.map((part) => part.lesson.questions.length)),
    ).toBeLessThanOrEqual(15);
  });
});
