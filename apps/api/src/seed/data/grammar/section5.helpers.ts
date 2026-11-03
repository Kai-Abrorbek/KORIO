import type {
  Section5GrammarDefinition,
  Section5LocalizedText,
  Section5UnitDefinition,
} from './section5.types';

const INTERMEDIATE_TAG: Section5LocalizedText = {
  ko: '중급',
  uz: "O'rta daraja",
  en: 'Intermediate',
  ru: 'Средний уровень',
};

function assertDefinition(
  unit: Section5UnitDefinition,
  grammar: Section5GrammarDefinition,
) {
  const label = `section 5 unit ${unit.unit} grammar ${grammar.code}`;

  if (grammar.examples.length !== 10) {
    throw new Error(`${label}: examples must contain exactly 10 items`);
  }
  if (grammar.cautions.length < 2) {
    throw new Error(`${label}: cautions must contain at least 2 items`);
  }
  if (grammar.conjugations.length < 4) {
    throw new Error(`${label}: conjugations must contain at least 4 items`);
  }
  if (grammar.quizDistractors.length < 2) {
    throw new Error(`${label}: quizDistractors must contain at least 2 items`);
  }

  for (const [index, example] of grammar.examples.entries()) {
    if (!example.ko.includes(example.highlight)) {
      throw new Error(
        `${label}: examples[${index}] does not contain highlight '${example.highlight}'`,
      );
    }
  }
}

function quizQuestion(sentence: string, answer: string): Section5LocalizedText {
  const masked = sentence.replace(answer, '___');

  return {
    ko: `다음 문장의 빈칸에 알맞은 표현을 고르세요: ${masked}`,
    uz: `Quyidagi gapdagi bo'sh joyga mos ifodani tanlang: ${masked}`,
    en: `Choose the expression that best completes the sentence: ${masked}`,
    ru: `Выберите выражение, которое лучше всего заполняет пропуск: ${masked}`,
  };
}

function quizOptions(
  grammar: Section5GrammarDefinition,
  answer: string,
  quizIndex: number,
) {
  const choices = [
    answer,
    ...grammar.quizDistractors.filter((choice) => choice !== answer),
  ];
  const uniqueChoices = [...new Set(choices)].slice(0, 3);

  if (uniqueChoices.length !== 3) {
    throw new Error(
      `${grammar.code}: quiz options must contain 3 unique items`,
    );
  }

  const offset = quizIndex % uniqueChoices.length;
  const orderedChoices = [
    ...uniqueChoices.slice(offset),
    ...uniqueChoices.slice(0, offset),
  ];

  return orderedChoices.map((text) => ({ text, correct: text === answer }));
}

export function buildSection5GrammarSeed(
  units: readonly Section5UnitDefinition[],
) {
  return units.flatMap((unit) =>
    unit.grammars.map((grammar, grammarIndex) => {
      assertDefinition(unit, grammar);

      return {
        code: grammar.code,
        pattern: grammar.pattern,
        sourceUnit: unit.unit,
        section: 5,
        unit: unit.unit,
        order: grammarIndex + 1,
        isActive: true,
        summary: grammar.summary,
        tags: [INTERMEDIATE_TAG, unit.title, grammar.usageTag],
        explanation: grammar.explanation,
        conjugationRule: grammar.conjugationRule,
        conjugations: grammar.conjugations,
        examples: grammar.examples.map((example) => ({
          ko: example.ko,
          highlight: example.highlight,
          gloss: {
            ko: example.ko,
            ...example.translations,
          },
        })),
        dialogue: grammar.examples.slice(0, 2).map((example, index) => ({
          speaker: index === 0 ? 'A' : 'B',
          side: index === 0 ? 'left' : 'right',
          ko: example.ko,
          highlight: example.highlight,
          gloss: {
            ko: example.ko,
            ...example.translations,
          },
        })),
        similar: grammar.similar ?? null,
        cautions: grammar.cautions,
        quiz: grammar.examples.slice(0, 5).map((example, quizIndex) => ({
          question: quizQuestion(example.ko, example.highlight),
          options: quizOptions(grammar, example.highlight, quizIndex),
        })),
      };
    }),
  );
}
