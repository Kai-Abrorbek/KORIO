import {
  TopikI18nText,
  TopikResponseType,
  TopikSection,
} from '../topik/schemas/topik-content.schema';
import { TOPIK_RECIPE_BLUEPRINT } from '../topik/topik-recipe-blueprint';
import { RECIPE_READING_01_02 } from './data/recipe/reading-01-02';
import { RECIPE_CATALOG } from './data/recipe/recipe-catalog';
import { RecipeSeed } from './data/recipe/recipe-seed.types';
import {
  TOPIK_LISTENING_MOCK_1_SEED,
  TOPIK_LISTENING_MOCK_2_SEED,
  TOPIK_READING_MOCK_1_SEED,
  TOPIK_READING_MOCK_2_SEED,
  TOPIK_WRITING_MOCK_1_SEED,
  TOPIK_WRITING_MOCK_2_SEED,
  TopikExamSeed,
} from './data/topik';

const RECIPES = [RECIPE_READING_01_02, ...RECIPE_CATALOG];
const LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;

const SOURCE_SEEDS: Record<
  TopikSection,
  { example: TopikExamSeed; practice: TopikExamSeed }
> = {
  [TopikSection.READING]: {
    example: TOPIK_READING_MOCK_1_SEED,
    practice: TOPIK_READING_MOCK_2_SEED,
  },
  [TopikSection.LISTENING]: {
    example: TOPIK_LISTENING_MOCK_1_SEED,
    practice: TOPIK_LISTENING_MOCK_2_SEED,
  },
  [TopikSection.WRITING]: {
    example: TOPIK_WRITING_MOCK_1_SEED,
    practice: TOPIK_WRITING_MOCK_2_SEED,
  },
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertI18n(value: TopikI18nText, path: string) {
  for (const language of LANGUAGES) {
    assert(
      typeof value[language] === 'string' && value[language].trim().length > 0,
      `${path}.${language}: 번역이 비어 있습니다.`,
    );
  }
}

type SolutionChoiceNote =
  | TopikI18nText
  | {
      note: TopikI18nText;
    };

function assertSolution(
  solution: {
    strategy?: TopikI18nText;
    explanation?: TopikI18nText;
    choiceNotes?: SolutionChoiceNote[];
  },
  path: string,
  expectedChoiceNotes: number,
) {
  assert(solution.strategy, `${path}.strategy: 풀이 전략이 없습니다.`);
  assertI18n(solution.strategy, `${path}.strategy`);
  assert(solution.explanation, `${path}.explanation: 정답 해설이 없습니다.`);
  assertI18n(solution.explanation, `${path}.explanation`);

  if (expectedChoiceNotes > 0) {
    assert(
      solution.choiceNotes?.length === expectedChoiceNotes,
      `${path}.choiceNotes: 선택지 ${expectedChoiceNotes}개의 해설이 모두 필요합니다.`,
    );
    solution.choiceNotes.forEach((rawNote, index) => {
      const note = 'note' in rawNote ? rawNote.note : rawNote;
      assertI18n(note, `${path}.choiceNotes[${index}]`);
    });
  }
}

function validateRecipe(recipe: RecipeSeed) {
  assertI18n(recipe.label, `${recipe.groupCode}.label`);
  assertI18n(recipe.title, `${recipe.groupCode}.title`);
  assertI18n(recipe.intro, `${recipe.groupCode}.intro`);
  assert(
    recipe.sourceReference?.trim(),
    `${recipe.groupCode}: PDF 출처 범위가 없습니다.`,
  );
  assert(
    recipe.targetLevel >= 3 && recipe.targetLevel <= 6,
    `${recipe.groupCode}: 목표 급수는 3~6이어야 합니다.`,
  );
  assert(
    recipe.goldenRecipe.length >= 3,
    `${recipe.groupCode}: 황금 레시피는 최소 3개여야 합니다.`,
  );
  recipe.goldenRecipe.forEach((tip, index) =>
    assertI18n(tip, `${recipe.groupCode}.goldenRecipe[${index}]`),
  );
  assert(
    recipe.grammarSections.length > 0,
    `${recipe.groupCode}: Ranking 데이터가 없습니다.`,
  );
  for (const [sectionIndex, section] of recipe.grammarSections.entries()) {
    assertI18n(
      section.title,
      `${recipe.groupCode}.grammarSections[${sectionIndex}].title`,
    );
    assert(
      section.entries.length > 0,
      `${recipe.groupCode}: Ranking 항목이 없습니다.`,
    );
    section.tips.forEach((tip, index) =>
      assertI18n(
        tip,
        `${recipe.groupCode}.grammarSections[${sectionIndex}].tips[${index}]`,
      ),
    );
    for (const [entryIndex, entry] of section.entries.entries()) {
      const path = `${recipe.groupCode}.grammarSections[${sectionIndex}].entries[${entryIndex}]`;
      assert(entry.form.trim().length > 0, `${path}.form: 값이 없습니다.`);
      assert(entry.meanings.length > 0, `${path}.meanings: 값이 없습니다.`);
      entry.meanings.forEach((meaning, index) =>
        assertI18n(meaning, `${path}.meanings[${index}]`),
      );
      assert(
        entry.examples.length === entry.highlights.length,
        `${path}: examples와 highlights 개수가 다릅니다.`,
      );
    }
  }

  if (recipe.questionSource) {
    const expectedCount =
      recipe.questionSource.to - recipe.questionSource.from + 1;
    for (const kind of ['example', 'practice'] as const) {
      const seed = SOURCE_SEEDS[recipe.section][kind];
      const groupByCode = new Map(
        seed.groups.map((group) => [group.code, group]),
      );
      const questions = seed.questions.filter(
        (question) =>
          question.number >= recipe.questionSource!.from &&
          question.number <= recipe.questionSource!.to,
      );
      assert(
        questions.length === expectedCount,
        `${recipe.groupCode}: ${kind} 원천 문항이 ${expectedCount}개가 아닙니다.`,
      );
      for (const question of questions) {
        const responseType =
          question.responseType ?? TopikResponseType.MULTIPLE_CHOICE;
        const expectedChoiceNotes =
          responseType === TopikResponseType.WRITTEN
            ? 0
            : question.choices.length;

        assert(
          responseType === TopikResponseType.WRITTEN ||
            question.choices.length === 4,
          `${recipe.groupCode}: ${kind} ${question.number}번은 객관식 4지선다여야 합니다.`,
        );
        assert(
          question.source.reference.trim().length > 0,
          `${recipe.groupCode}: ${kind} ${question.number}번 출처가 없습니다.`,
        );
        assertSolution(
          question.solution,
          `${recipe.groupCode}.${kind}[${question.number}].solution`,
          expectedChoiceNotes,
        );

        if (recipe.section === TopikSection.LISTENING) {
          const audio =
            question.audio ??
            groupByCode.get(question.groupCode)?.sharedAudio;
          assert(
            audio?.transcript.some((line) => line.text.trim().length > 0),
            `${recipe.groupCode}: ${kind} ${question.number}번 듣기 대본이 없습니다.`,
          );
        }
      }
    }
    assert(
      expectedCount <= 10,
      `${recipe.groupCode}: 문제은행 저장 번호 범위를 초과합니다.`,
    );
    return expectedCount * 2;
  }

  assert(
    recipe.examples.length > 0,
    `${recipe.groupCode}: 풀이 예제가 없습니다.`,
  );
  assert(
    recipe.practice.length > 0,
    `${recipe.groupCode}: 예상문제가 없습니다.`,
  );
  for (const question of [...recipe.examples, ...recipe.practice]) {
    const responseType =
      question.responseType ?? TopikResponseType.MULTIPLE_CHOICE;

    assert(
      question.source?.trim(),
      `${question.code}: PDF 또는 기출 출처가 없습니다.`,
    );
    assert(
      question.solution,
      `${question.code}: 풀이 전략과 해설이 없습니다.`,
    );

    if (responseType === TopikResponseType.WRITTEN) {
      assert(
        question.choices.length === 0,
        `${question.code}: 직접 쓰기 문항에는 객관식 선택지가 없어야 합니다.`,
      );
      assert(
        question.writingConfig?.fields.length,
        `${question.code}: 쓰기 입력 필드 설정이 없습니다.`,
      );
      assertI18n(
        question.writingConfig!.guide,
        `${question.code}.writingConfig.guide`,
      );
      assert(
        question.solution!.rubric?.length === 3,
        `${question.code}: 쓰기 채점 기준은 내용·구성·언어 3개가 필요합니다.`,
      );
      question.solution!.rubric!.forEach((rubric, index) =>
        assertI18n(rubric, `${question.code}.rubric[${index}]`),
      );
      assertSolution(question.solution!, `${question.code}.solution`, 0);
      continue;
    }

    assert(
      question.choices.length === 4,
      `${question.code}: 객관식 문항은 선택지 4개가 필요합니다.`,
    );
    assert(
      question.choices.filter((choice) => choice.correct).length === 1,
      `${question.code}: 정답은 정확히 1개여야 합니다.`,
    );
    assertSolution(
      question.solution!,
      `${question.code}.solution`,
      question.choices.length,
    );
  }
  const lastStoredNumber =
    Math.max(...recipe.examples.map((question) => question.number)) +
    recipe.practice.length;
  assert(
    lastStoredNumber <= 70,
    `${recipe.groupCode}: 문항 저장 번호 70을 초과합니다.`,
  );
  return recipe.examples.length + recipe.practice.length;
}

function main() {
  const recipeCodes = RECIPES.map((recipe) => recipe.groupCode);
  const blueprintCodes = TOPIK_RECIPE_BLUEPRINT.map((group) => group.code);

  assert(
    new Set(recipeCodes).size === recipeCodes.length,
    '중복된 레시피 groupCode가 있습니다.',
  );
  assert(
    recipeCodes.length === blueprintCodes.length,
    `레시피 ${recipeCodes.length}개와 설계도 ${blueprintCodes.length}개가 일치하지 않습니다.`,
  );
  for (const code of blueprintCodes) {
    assert(recipeCodes.includes(code), `${code}: 레시피 데이터가 없습니다.`);
  }

  const reading0304 = RECIPES.find(
    (recipe) => recipe.groupCode === 'reading-03-04',
  );
  assert(reading0304, 'reading-03-04: 레시피 데이터가 없습니다.');
  assert(
    reading0304.grammarSections.reduce(
      (sum, section) => sum + section.entries.length,
      0,
    ) === 40,
    'reading-03-04: PDF 기준 유사 문법 Ranking 40개가 필요합니다.',
  );
  assert(
    reading0304.examples.length === 2 && reading0304.practice.length === 10,
    'reading-03-04: PDF 기준 기출 2문항과 예상문제 10문항이 필요합니다.',
  );

  const reading0508 = RECIPES.find(
    (recipe) => recipe.groupCode === 'reading-05-08',
  );
  assert(reading0508, 'reading-05-08: 레시피 데이터가 없습니다.');
  assert(
    reading0508.grammarSections
      .map((section) => section.entries.length)
      .join(',') === '50,40,20,20',
    'reading-05-08: PDF 기준 광고 Ranking 50·40·20·20개가 필요합니다.',
  );
  assert(
    reading0508.examples.length === 4 && reading0508.practice.length === 40,
    'reading-05-08: PDF 기준 기출 4문항과 예상문제 40문항이 필요합니다.',
  );

  const exactReadingCounts: Record<
    string,
    { examples: number; practice: number }
  > = {
    'reading-09-12': { examples: 6, practice: 8 },
    'reading-13-15': { examples: 3, practice: 6 },
    'reading-16-18': { examples: 4, practice: 4 },
    'reading-19-20': { examples: 4, practice: 4 },
    'reading-21-22': { examples: 2, practice: 8 },
    'reading-23-24': { examples: 2, practice: 4 },
    'reading-25-27': { examples: 3, practice: 9 },
    'reading-28-31': { examples: 2, practice: 4 },
    'reading-32-34': { examples: 3, practice: 3 },
    'reading-35-38': { examples: 4, practice: 4 },
    'reading-39-41': { examples: 3, practice: 3 },
    'reading-42-43': { examples: 2, practice: 4 },
    'reading-44-45': { examples: 2, practice: 4 },
    'reading-46-47': { examples: 2, practice: 4 },
    'reading-48-50': { examples: 3, practice: 6 },
  };
  for (const [code, expected] of Object.entries(exactReadingCounts)) {
    const recipe = RECIPES.find((item) => item.groupCode === code);
    assert(recipe, `${code}: 레시피 데이터가 없습니다.`);
    assert(
      !recipe.questionSource &&
        recipe.examples.length === expected.examples &&
        recipe.practice.length === expected.practice,
      `${code}: PDF 기준 기출 ${expected.examples}문항과 예상문제 ${expected.practice}문항이 필요합니다.`,
    );
  }

  const exactWritingCounts: Record<
    string,
    { examples: number; practice: number }
  > = {
    'writing-51': { examples: 3, practice: 4 },
    'writing-52': { examples: 4, practice: 2 },
    'writing-53': { examples: 2, practice: 2 },
    'writing-54': { examples: 1, practice: 3 },
  };
  for (const [code, expected] of Object.entries(exactWritingCounts)) {
    const recipe = RECIPES.find((item) => item.groupCode === code);
    assert(recipe, `${code}: 레시피 데이터가 없습니다.`);
    assert(
      !recipe.questionSource &&
        recipe.examples.length === expected.examples &&
        recipe.practice.length === expected.practice,
      `${code}: 교재 기준 기출 ${expected.examples}개와 학습·예상문제 ${expected.practice}개가 필요합니다.`,
    );
  }
  const exactListeningRankingCounts: Record<string, number> = {
    'listening-01-02': 40,
    'listening-04-08': 20,
    'listening-09-12': 10,
    'listening-14': 20,
    'listening-15': 10,
    'listening-17-19': 10,
    'listening-21-22': 10,
    'listening-23-24': 9,
    'listening-25-26': 10,
    'listening-27-28': 7,
    'listening-31-32': 13,
    'listening-37-38': 10,
    'listening-41-42': 10,
    'listening-43-44': 10,
    'listening-45-46': 5,
    'listening-47-48': 5,
    'listening-49-50': 5,
  };
  for (const [code, expectedCount] of Object.entries(
    exactListeningRankingCounts,
  )) {
    const recipe = RECIPES.find((item) => item.groupCode === code);
    assert(recipe, `${code}: 레시피 데이터가 없습니다.`);
    const actualCount = recipe.grammarSections.reduce(
      (sum, section) => sum + section.entries.length,
      0,
    );
    assert(
      actualCount === expectedCount,
      `${code}: 교재 기준 Ranking ${expectedCount}개가 필요합니다.`,
    );
  }

  const expectedSectionCounts: Record<TopikSection, number> = {
    [TopikSection.READING]: 18,
    [TopikSection.LISTENING]: 25,
    [TopikSection.WRITING]: 4,
  };

  for (const section of Object.values(TopikSection)) {
    const sectionRecipes = RECIPES.filter(
      (recipe) => recipe.section === section,
    );
    assert(
      sectionRecipes.length === expectedSectionCounts[section],
      `${section}: 레시피 ${expectedSectionCounts[section]}개가 필요합니다.`,
    );
    const orders = sectionRecipes.map((recipe) => recipe.order);
    assert(
      new Set(orders).size === orders.length,
      `${section}: 중복된 표시 순서가 있습니다.`,
    );
  }

  const customCodes = RECIPES.flatMap((recipe) => [
    ...recipe.examples.map((question) => question.code),
    ...recipe.practice.map((question) => question.code),
  ]);
  assert(
    new Set(customCodes).size === customCodes.length,
    '직접 작성한 레시피 문항 코드가 중복됩니다.',
  );

  const totalQuestions = RECIPES.reduce(
    (sum, recipe) => sum + validateRecipe(recipe),
    0,
  );
  const sectionCounts = Object.fromEntries(
    Object.values(TopikSection).map((section) => [
      section,
      RECIPES.filter((recipe) => recipe.section === section).length,
    ]),
  );

  console.log('✅ 합격 레시피 시드 검증 완료');
  console.log(`  레시피: ${RECIPES.length}개`, sectionCounts);
  console.log(`  풀이 예제 + 예상문제: ${totalQuestions}개`);
}

main();
