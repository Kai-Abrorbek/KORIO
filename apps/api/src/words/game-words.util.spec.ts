import { isPlayable } from './game-words.util';

const meaning = { ko: '사과', uz: 'olma', en: 'apple', ru: 'яблоко' };

describe('game word selection', () => {
  it('preserves Korean as the default alphabet', () => {
    expect(isPlayable('사과', 5, meaning)).toBe(true);
    expect(isPlayable('apple', 5, meaning)).toBe(false);
    expect(isPlayable('사과주스', 3, meaning)).toBe(false);
  });

  it('uses the same length and meaning rules for English single words', () => {
    expect(isPlayable('apple', 5, meaning, 'en')).toBe(true);
    expect(isPlayable('English', 8, meaning, 'en')).toBe(true);
    expect(isPlayable('a', 5, meaning, 'en')).toBe(true);
    expect(isPlayable('apple', 4, meaning, 'en')).toBe(false);
    expect(isPlayable('사과', 8, meaning, 'en')).toBe(false);
    expect(isPlayable('apple', 8, { ko: '사과', uz: ' ' }, 'en')).toBe(false);
  });

  it.each(['', 'ice cream', 'good-bye', "don't", 'hello!', 'word2', 'café'])(
    'does not put phrases or unsupported characters on an English game card: %s',
    (word) => expect(isPlayable(word, 8, meaning, 'en')).toBe(false),
  );

  it('does not silently treat an unsupported language as Korean', () => {
    expect(isPlayable('사과', 8, meaning, 'fr')).toBe(false);
  });
});
