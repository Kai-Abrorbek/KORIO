import type {
  EnglishGrammarNodeSeed,
  EnglishGrammarPageSeed,
  EnglishGrammarTrackQuestion,
  EnglishGrammarUnit,
  LocalizedText,
} from './english-grammar.types';

export const ENGLISH_GRAMMAR_COURSE = {
  courseId: 'en-general',
  targetLanguage: 'en',
} as const;

export const L = (
  ko: string,
  uz: string,
  en: string,
  ru: string,
): LocalizedText => ({ ko, uz, en, ru });

export function sentenceOf(template: string, answer: string): string {
  return template.replace('___', answer);
}

const NEGATIVE_CONTRACTIONS: readonly [RegExp, string][] = [
  [/\bdon't\b/gi, 'do not'],
  [/\bdoesn't\b/gi, 'does not'],
  [/\bdidn't\b/gi, 'did not'],
  [/\bisn't\b/gi, 'is not'],
  [/\baren't\b/gi, 'are not'],
  [/\bwasn't\b/gi, 'was not'],
  [/\bweren't\b/gi, 'were not'],
  [/\bhaven't\b/gi, 'have not'],
  [/\bhasn't\b/gi, 'has not'],
];

/**
 * 타이핑 문제에서는 축약형과 풀어 쓴 형태를 모두 정답으로 인정한다.
 * 문법을 맞게 썼는데 표기 방식 때문에 오답이 되는 일을 막기 위한 것이다.
 */
function acceptedAnswersFor(answer: string, authored: readonly string[] = []) {
  const expanded = NEGATIVE_CONTRACTIONS.reduce(
    (value, [contraction, full]) => value.replace(contraction, full),
    answer,
  );
  return [...new Set([...authored, expanded])].filter(
    (candidate) => candidate !== answer,
  );
}

function assertUnit(unit: EnglishGrammarUnit) {
  for (const spec of unit.specs) {
    if (spec.drills.length !== 10) {
      throw new Error(`${spec.code}: drills must contain exactly 10 items`);
    }
    if (spec.dialogue.length < 2) {
      throw new Error(`${spec.code}: dialogue needs at least two turns`);
    }
    if (spec.cautions.length < 2) {
      throw new Error(`${spec.code}: cautions need at least two items`);
    }
    const sentences = new Set<string>();
    const answers = new Set<string>();
    for (const [index, drill] of spec.drills.entries()) {
      if ((drill.template.match(/___/g) ?? []).length !== 1) {
        throw new Error(`${spec.code} drill ${index + 1}: expected one blank`);
      }
      if (
        ['ko', 'uz', 'en', 'ru'].some(
          (language) =>
            !drill.translation[language as keyof LocalizedText].trim(),
        )
      ) {
        throw new Error(`${spec.code} drill ${index + 1}: missing translation`);
      }
      const sentence = sentenceOf(drill.template, drill.answer);
      if (sentences.has(sentence)) {
        throw new Error(
          `${spec.code} drill ${index + 1}: duplicate practice sentence '${sentence}'`,
        );
      }
      sentences.add(sentence);
      answers.add(drill.answer);
      const built = drill.rows.map((row) => row[0]).join(' ');
      if (sentence !== built) {
        throw new Error(
          `${spec.code} drill ${index + 1}: build rows make '${built}', expected '${sentence}'`,
        );
      }
      for (const row of drill.rows) {
        if (new Set(row).size !== 3) {
          throw new Error(
            `${spec.code} drill ${index + 1}: build choices must be unique`,
          );
        }
      }
      const blankOptions =
        drill.blankOptions ?? drill.rows.find((row) => row[0] === drill.answer);
      if (!blankOptions || !blankOptions.includes(drill.answer)) {
        throw new Error(
          `${spec.code} drill ${index + 1}: blank choices do not contain the answer`,
        );
      }
      const focusRows = drill.rows.filter((row) => row[0] === drill.answer);
      if (focusRows.length !== 1) {
        throw new Error(
          `${spec.code} drill ${index + 1}: build must test the blank answer in exactly one row`,
        );
      }
    }
    if (answers.size < 3) {
      throw new Error(
        `${spec.code}: ten drills must practise at least three distinct answers`,
      );
    }
  }
}

function mix20(prefix: string): string[] {
  return Array.from({ length: 10 }, (_, index) => {
    const n = index + 1;
    return [
      `${prefix}_${String(n).padStart(2, '0')}`,
      `${prefix}_${String(n + 10).padStart(2, '0')}`,
    ];
  }).flat();
}

export function buildEnglishGrammarSeeds(units: readonly EnglishGrammarUnit[]) {
  units.forEach(assertUnit);

  const grammar: EnglishGrammarPageSeed[] = [];
  const questions: Record<string, EnglishGrammarTrackQuestion> = {};
  const nodes: EnglishGrammarNodeSeed[] = [];

  for (const unit of units) {
    const lessons: EnglishGrammarNodeSeed['lessons'] = [];

    unit.specs.forEach((spec, grammarIndex) => {
      const page: EnglishGrammarPageSeed = {
        ...ENGLISH_GRAMMAR_COURSE,
        sourceUnit: spec.sourceUnit,
        code: spec.code,
        pattern: spec.pattern,
        section: unit.section,
        unit: unit.unit,
        order: grammarIndex + 1,
        isActive: true,
        summary: spec.summary,
        tags: [
          L('초급', "Boshlang'ich", 'Beginner', 'Начальный'),
          spec.categoryTag,
        ],
        explanation: spec.explanation,
        conjugationRule: spec.rule,
        conjugations: spec.forms,
        examples: spec.drills.map((drill) => {
          const text = sentenceOf(drill.template, drill.answer);
          return {
            text,
            gloss: { ...drill.translation, en: text },
            highlight: drill.answer,
          };
        }),
        dialogue: spec.dialogue,
        similar: spec.similar,
        cautions: spec.cautions,
        quiz: spec.drills.slice(0, 5).map((drill) => {
          const choices =
            drill.blankOptions ??
            drill.rows.find((row) => row[0] === drill.answer)!;
          return {
            prompt: drill.template,
            options: choices.map((text) => ({
              text,
              correct: text === drill.answer,
            })),
          };
        }),
      };
      grammar.push(page);

      const prefix = `en-general:gp_s${unit.section}_u${unit.unit}_g${grammarIndex + 1}`;
      spec.drills.forEach((drill, drillIndex) => {
        const sentence = sentenceOf(drill.template, drill.answer);
        const blankCode = `${prefix}_${String(drillIndex + 1).padStart(2, '0')}`;
        const buildCode = `${prefix}_${String(drillIndex + 11).padStart(2, '0')}`;
        const [sentencePrefix, sentenceSuffix] = drill.template.split('___');

        questions[blankCode] = {
          ...ENGLISH_GRAMMAR_COURSE,
          type: 'grammar_blank',
          level: unit.level,
          lessonCategory: 'grammar',
          instruction: L(
            '빈칸에 알맞은 영어를 쓰세요',
            "Bo'sh joyga mos inglizcha qismni yozing",
            'Write the missing English part',
            'Впишите недостающую часть по-английски',
          ),
          sentencePrefix,
          sentenceSuffix,
          answer: drill.answer,
          answerTranslation: { ...drill.translation, en: sentence },
          hint: spec.rule,
          explanation: spec.summary,
          tags: [spec.code],
          acceptedAnswers: acceptedAnswersFor(
            drill.answer,
            drill.acceptedAnswers,
          ),
        };

        questions[buildCode] = {
          ...ENGLISH_GRAMMAR_COURSE,
          type: 'grammar_build',
          level: unit.level,
          lessonCategory: 'grammar',
          instruction: L(
            '순서에 맞게 영어 문장을 만드세요',
            "Inglizcha gapni to'g'ri tartibda tuzing",
            'Build the English sentence in order',
            'Составьте английское предложение по порядку',
          ),
          answer: sentence,
          buildRows: drill.rows.map((row) => ({
            options: [...row],
            correct: row[0],
          })),
          answerTranslation: { ...drill.translation, en: sentence },
          hint: spec.rule,
          explanation: spec.summary,
          tags: [spec.code],
          acceptedAnswers: [...(drill.acceptedAnswers ?? [])],
        };
      });

      lessons.push({
        ...ENGLISH_GRAMMAR_COURSE,
        title: L(spec.pattern, spec.pattern, spec.pattern, spec.pattern),
        description: spec.summary,
        category: 'grammar',
        level: unit.level,
        order: grammarIndex + 1,
        grammarCode: spec.code,
        questions: mix20(prefix),
      });
    });

    nodes.push({
      ...ENGLISH_GRAMMAR_COURSE,
      code: `en-general:gt_s${unit.section}_u${unit.unit}_o1`,
      title: unit.title,
      description: unit.description,
      section: unit.section,
      unit: unit.unit,
      order: 1,
      category: 'grammar',
      isActive: true,
      lessons,
    });
  }

  return { grammar, nodes, questions };
}
