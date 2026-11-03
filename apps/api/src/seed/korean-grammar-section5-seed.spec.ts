import { GRAMMAR_SEED_S5, SECTION5_UNITS } from './data/grammar/section5';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

const hasFourLanguages = (value: Record<string, unknown>) =>
  LANGUAGES.every((language) => {
    const text = value[language];
    return typeof text === 'string' && text.trim().length > 0;
  });

describe('Korean grammar section 5 seed', () => {
  it('keeps the nine textbook units and all 35 grammar pages in order', () => {
    expect(SECTION5_UNITS.map((unit) => unit.unit)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(SECTION5_UNITS.map((unit) => unit.grammars.length)).toEqual([
      4, 4, 4, 4, 4, 3, 4, 4, 4,
    ]);
    expect(GRAMMAR_SEED_S5).toHaveLength(35);
    expect(GRAMMAR_SEED_S5.map((grammar) => grammar.pattern)).toEqual([
      'A-다고 / V-ㄴ다고·는다고 / N(이)라고 하다',
      'V-아야겠다/어야겠다',
      'A-다고 / V-ㄴ다고·는다고 / N(이)라고 들었다',
      'A-대(요) / V-ㄴ대·는대(요) / N(이)래(요)',
      'V-자마자',
      'V-(으)라고 하다',
      'V-느라고',
      '누구나·언제나·어디나·무엇이나·무슨 N(이)나',
      'A/V-(으)ㄹ 텐데',
      'A-(으)냐고 / V-느냐고 / N(이)냐고 하다·묻다',
      'A/V-(으)ㄹ 줄 몰랐다',
      'V-자고 하다',
      'A-(으)ㄴ가 보다, V-나 보다, N인가 보다',
      'N(이)나',
      'V-아/어 보니(까)',
      'A/V-던데(요)',
      'V-(으)ㄹ까 말까 (하다)',
      'V-지 그래(요)?',
      'V-(으)ㄹ걸 (그랬다)',
      'N(이)라도',
      'A/V-거든(요), N(이)거든(요)',
      '아무 N도',
      'V-이/히/리/기- (피동)',
      'V-았다가/었다가',
      'A-(으)ㄴ데도, V-는데도, N인데도',
      'A/V-더니',
      'V-도록 하다',
      'V-다(가)',
      'A-다고(요), V-ㄴ다고/는다고(요), N(이)라고(요)',
      '아무리 A/V-아도/어도',
      'A/V-아야/어야 할 텐데(요)',
      'N을/를 위해(서), V-기 위해(서)',
      'V-아지다/어지다',
      'A-(으)ㄴ데도 불구하고, V-는데도 불구하고, N인데도 불구하고',
      'N에 대해(서), N에 대한 N',
    ]);
  });

  it('uses unique codes and complete page content', () => {
    const codes = GRAMMAR_SEED_S5.map((grammar) => grammar.code);
    expect(new Set(codes).size).toBe(codes.length);

    for (const grammar of GRAMMAR_SEED_S5) {
      expect(grammar.section).toBe(5);
      expect(grammar.sourceUnit).toBe(grammar.unit);
      expect(hasFourLanguages(grammar.summary)).toBe(true);
      expect(hasFourLanguages(grammar.explanation)).toBe(true);
      expect(hasFourLanguages(grammar.conjugationRule)).toBe(true);
      expect(grammar.conjugations.length).toBeGreaterThanOrEqual(4);
      expect(grammar.cautions).toHaveLength(2);
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
