import { GRAMMAR_SEED_S6, SECTION6_UNITS } from './data/grammar/section6';

const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

const hasFourLanguages = (value: Record<string, unknown>) =>
  LANGUAGES.every((language) => {
    const text = value[language];
    return typeof text === 'string' && text.trim().length > 0;
  });

describe('Korean grammar section 6 seed', () => {
  it('keeps the nine textbook units and all 33 grammar pages in order', () => {
    expect(SECTION6_UNITS.map((unit) => unit.unit)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
    expect(SECTION6_UNITS.map((unit) => unit.grammars.length)).toEqual([
      4, 3, 4, 4, 4, 4, 4, 4, 2,
    ]);
    expect(GRAMMAR_SEED_S6).toHaveLength(33);
    expect(GRAMMAR_SEED_S6.map((grammar) => grammar.pattern)).toEqual([
      'A/V-던',
      'A/V-잖아(요)',
      'V-(으)ㄹ 생각[계획, 예정]이다',
      'V-(으)려면 멀었다',
      'V-이/히/리/기/우- (사동)',
      'A-다면, V-ㄴ다면/는다면, N(이)라면',
      '무엇이든(지), 무슨 N(이)든(지)',
      'V-았더니/었더니',
      '얼마나 A-(으)ㄴ지/V-는지 모르다',
      'A-(으)ㄴ 모양이다, V-는 모양이다, N인 모양이다',
      'A/V-아야/어야, N이어야/여야',
      'A/V-(으)ㄹ까 봐',
      'V-고 있다',
      'A/V-았어야/었어야 했는데',
      'V-도록',
      '하도 A/V-아서/어서',
      'A/V-았던/었던',
      'A-아/어하다',
      'A/V-(으)면 A/V-(으)ㄹ수록',
      'V-게 하다',
      'A/V-(으)ㄹ걸(요)',
      'A/V-지 않으면 안 되다',
      'V-는 길에',
      'N만 하다',
      'V-(으)ㄹ 생각도 못 하다',
      'V-(으)ㄹ 만하다',
      'A/V-기로 유명하다, N(으)로 유명하다',
      'V-고 보니',
      'A-(으)ㄴ/V-는 척하다',
      'A/V-다니(요), N(이)라니(요)',
      'N(이)라고 (해서) 다 A-(으)ㄴ/V-는 것은 아니다',
      'A-다니까(요), V-ㄴ다니까(요)/는다니까(요), N(이)라니까(요)',
      'V-고 말다',
    ]);
  });

  it('uses unique codes and complete page content', () => {
    const codes = GRAMMAR_SEED_S6.map((grammar) => grammar.code);
    expect(new Set(codes).size).toBe(codes.length);

    for (const grammar of GRAMMAR_SEED_S6) {
      expect(grammar.section).toBe(6);
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
