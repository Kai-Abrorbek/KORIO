import { GRAMMAR_SEED_S7, SECTION7_UNITS } from './data/grammar/section7';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
const hasFourLanguages = (value: Record<string, unknown>) =>
  LANGUAGES.every((language) => {
    const text = value[language];
    return typeof text === 'string' && text.trim().length > 0;
  });

describe('Korean grammar section 7 seed', () => {
  it('keeps the nine textbook units and all 36 grammar pages in order', () => {
    expect(SECTION7_UNITS.map((unit) => unit.unit)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(SECTION7_UNITS.map((unit) => unit.grammars.length)).toEqual([
      4, 4, 4, 4, 4, 4, 4, 4, 4,
    ]);
    expect(GRAMMAR_SEED_S7).toHaveLength(36);
    expect(GRAMMAR_SEED_S7.map((grammar) => grammar.pattern)).toEqual([
      'A-다면서(요)?, V-ㄴ/는다면서(요)?',
      'V-다 보면',
      'N은/는 A-다는 것이다[점이다], N은/는 V-ㄴ/는다는 것이다[점이다]',
      'V-는 대로, N대로',
      '어찌나[얼마나] A-(으)ㄴ지, 어찌나[얼마나] V-는지',
      'A/V-(으)ㄹ 정도로, A/V-(으)ㄹ 정도이다',
      'V-다가는',
      'A/V-(으)ㄹ 뿐만 아니라, N뿐만 아니라',
      'V-(으)나 마나',
      'V-는 바람에',
      'N(이)라는 N',
      'N에 비해(서)',
      'A/V-기는커녕, N은/는커녕',
      'A/V-(으)ㄹ 게 뻔하다',
      'A-(으)ㄴ 반면(에), V-는 반면(에)',
      'A/V-(으)ㄹ 수밖에 없다',
      'A/V-고 해서',
      'A-다더니, V-ㄴ/는다더니',
      'A/V-기 마련이다',
      'V-다 보니(까)',
      'A/V-거든(요)',
      'A/V-든(지) A/V-든(지), N(이)든(지) N(이)든(지)',
      'N(이)야말로',
      '여간 A-(으)ㄴ 것이 아니다, 여간 V-는 것이 아니다, 여간 A/V-지 않다',
      'A/V-더라도',
      'A-다고 보다, V-ㄴ/는다고 보다',
      'V-(으)ㄴ 채(로)',
      'A-(으)ㄴ지 A-(으)ㄴ지, V-는지 V-는지',
      'V-아다(가)/어다(가)',
      'A-다는 N, V-ㄴ/는다는 N',
      'N을/를 비롯해서[비롯한]',
      'A/V-(으)며',
      'A/V-거든',
      'A/V-았더라면/었더라면',
      'A/V-(으)ㅁ',
      'A-(으)ㄴ 듯하다, V-는 듯하다',
    ]);
  });

  it('uses unique codes and complete localized page content', () => {
    const codes = GRAMMAR_SEED_S7.map((grammar) => grammar.code);
    expect(new Set(codes).size).toBe(codes.length);

    for (const grammar of GRAMMAR_SEED_S7) {
      expect(grammar.section).toBe(7);
      expect(grammar.sourceUnit).toBe(grammar.unit);
      expect(hasFourLanguages(grammar.summary)).toBe(true);
      expect(hasFourLanguages(grammar.explanation)).toBe(true);
      expect(hasFourLanguages(grammar.conjugationRule)).toBe(true);
      expect(grammar.conjugations.length).toBeGreaterThanOrEqual(4);
      expect(grammar.cautions.length).toBeGreaterThanOrEqual(2);
      expect(grammar.cautions.every(hasFourLanguages)).toBe(true);
      expect(grammar.examples).toHaveLength(10);
      expect(grammar.dialogue).toHaveLength(2);
      expect(grammar.quiz).toHaveLength(5);

      for (const example of grammar.examples) {
        expect(example.ko).toContain(example.highlight);
        expect(hasFourLanguages(example.gloss)).toBe(true);
      }
      for (const quiz of grammar.quiz) {
        expect(hasFourLanguages(quiz.question)).toBe(true);
        expect(quiz.options).toHaveLength(3);
        expect(new Set(quiz.options.map((option) => option.text)).size).toBe(3);
        expect(quiz.options.filter((option) => option.correct)).toHaveLength(1);
      }
    }
  });
});
