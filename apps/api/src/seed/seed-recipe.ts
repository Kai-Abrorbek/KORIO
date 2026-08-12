import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  TopikExamType,
  TopikPublishStatus,
  TopikResponseType,
  TopikSection,
  TopikTextBlock,
  TopikTextBlockType,
  TopikTextSegment,
  TopikTextSegmentType,
} from '../topik/schemas/topik-content.schema';
import { TopikExam } from '../topik/schemas/topik-exam.schema';
import { TopikQuestionGroup } from '../topik/schemas/topik-question-group.schema';
import { TopikQuestion } from '../topik/schemas/topik-question.schema';
import { TopikRecipe } from '../topik/schemas/topik-recipe.schema';
import { TopikModule } from '../topik/topik.module';
import { RECIPE_READING_01_02 } from './data/recipe/reading-01-02';
import {
  RecipeSeed,
  RecipeSeedQuestion,
} from './data/recipe/recipe-seed.types';

/** 레시피 문항을 담아두는 전용 시험지 */
const BANK_CODE = 'recipe-bank-reading';

/** 기출은 1번대, 예상문제는 11번대부터 — 같은 시험지 안에서 번호가 겹치지 않게 */
const EXAMPLE_NUMBER_BASE = 0;
const PRACTICE_NUMBER_BASE = 10;

const RECIPES: RecipeSeed[] = [RECIPE_READING_01_02];

/**
 * '휴대 전화를 ___ 내려야 할 역을 지나쳤다.' 를
 * [텍스트, 빈칸, 텍스트] 세그먼트로 쪼갠다.
 */
function promptBlocks(text: string): TopikTextBlock[] {
  const parts = text.split(/_{3,}/);
  const segments: TopikTextSegment[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      segments.push({
        type: TopikTextSegmentType.TEXT,
        text: parts[i],
        key: '',
        label: '',
      });
    }
    if (i < parts.length - 1) {
      segments.push({
        type: TopikTextSegmentType.BLANK,
        text: '(          )',
        key: `blank-${i}`,
        label: '',
      });
    }
  }

  return [{ type: TopikTextBlockType.PARAGRAPH, segments }];
}

function buildQuestion(
  q: RecipeSeedQuestion,
  examId: Types.ObjectId,
  groupId: Types.ObjectId,
  numberBase: number,
) {
  const choices = q.choices.map((c, i) => ({
    key: `c${i + 1}`,
    text: c.text,
    order: i + 1,
    imageAssetKey: '',
    imageAlt: '',
  }));

  const answerIndex = q.choices.findIndex((c) => c.correct);
  if (answerIndex < 0) {
    throw new Error(`정답이 지정되지 않은 문항: ${q.code}`);
  }

  const choiceNotes = (q.solution?.choiceNotes ?? []).map((note, i) => ({
    choiceKey: `c${i + 1}`,
    note,
  }));

  return {
    code: q.code,
    examId,
    groupId,
    number: numberBase + q.number,
    order: numberBase + q.number,
    type: q.type,
    responseType: TopikResponseType.MULTIPLE_CHOICE,
    points: 2,
    prompt: promptBlocks(q.prompt),
    choices,
    correctChoiceKey: `c${answerIndex + 1}`,
    difficulty: q.difficulty ?? 3,
    tags: q.source ? [q.source] : [],
    solution: {
      explanation: q.solution?.explanation ?? {},
      strategy: q.solution?.strategy ?? {},
      keyClues: [],
      steps: [],
      hints: [],
      choiceNotes,
    },
    version: 1,
    isActive: true,
  };
}

async function seedRecipes() {
  const app = await NestFactory.createApplicationContext(
    (() => {
      @Module({
        imports: [
          ConfigModule.forRoot({ isGlobal: true }),
          MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              uri: config.get<string>('MONGODB_URI'),
            }),
          }),
          TopikModule,
        ],
      })
      class SeedRecipeModule {}
      return SeedRecipeModule;
    })(),
  );

  const examModel = app.get<Model<TopikExam>>(getModelToken(TopikExam.name));
  const groupModel = app.get<Model<TopikQuestionGroup>>(
    getModelToken(TopikQuestionGroup.name),
  );
  const questionModel = app.get<Model<TopikQuestion>>(
    getModelToken(TopikQuestion.name),
  );
  const recipeModel = app.get<Model<TopikRecipe>>(
    getModelToken(TopikRecipe.name),
  );

  console.log('🍳 합격 레시피 시딩 시작...');

  // ── 레시피 문항 전용 시험지 (한 번만 만든다)
  const exam = await examModel.findOneAndUpdate(
    { code: BANK_CODE },
    {
      $set: {
        code: BANK_CODE,
        title: {
          ko: '합격 레시피 문항',
          uz: 'Retsept savollari',
          en: 'Recipe question bank',
          ru: 'Банк заданий «Рецепт»',
        },
        description: {},
        examType: TopikExamType.TOPIK_II,
        section: TopikSection.READING,
        durationMinutes: 0,
        status: TopikPublishStatus.PUBLISHED,
        version: 1,
        isActive: true,
        // 시험 목록에 노출되면 안 된다 (문항 번호가 연속이 아님)
        isQuestionBank: true,
      },
    },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  );

  let totalQuestions = 0;

  for (const recipe of RECIPES) {
    const sets: Array<{
      kind: 'example' | 'practice';
      items: RecipeSeedQuestion[];
      base: number;
    }> = [
      {
        kind: 'example',
        items: recipe.examples,
        base: EXAMPLE_NUMBER_BASE,
      },
      {
        kind: 'practice',
        items: recipe.practice,
        base: PRACTICE_NUMBER_BASE,
      },
    ];

    const idsByKind: Record<string, Types.ObjectId[]> = {
      example: [],
      practice: [],
    };

    for (const set of sets) {
      if (!set.items.length) continue;

      const groupCode = `${recipe.groupCode}-${set.kind}`;
      const numbers = set.items.map((q) => set.base + q.number);

      const group = await groupModel.findOneAndUpdate(
        { code: groupCode },
        {
          $set: {
            code: groupCode,
            examId: exam._id,
            order: set.kind === 'example' ? 1 : 2,
            startNumber: Math.min(...numbers),
            endNumber: Math.max(...numbers),
            instruction: [],
            pointsPerQuestion: 2,
            version: 1,
            isActive: true,
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      );

      for (const item of set.items) {
        const doc = buildQuestion(
          item,
          exam._id as Types.ObjectId,
          group._id as Types.ObjectId,
          set.base,
        );
        const saved = await questionModel.findOneAndUpdate(
          { code: item.code },
          { $set: doc },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        );
        idsByKind[set.kind].push(saved._id as Types.ObjectId);
        totalQuestions += 1;
      }
    }

    await recipeModel.findOneAndUpdate(
      { groupCode: recipe.groupCode },
      {
        $set: {
          groupCode: recipe.groupCode,
          section: recipe.section,
          label: recipe.label,
          title: recipe.title,
          intro: recipe.intro,
          targetLevel: recipe.targetLevel,
          order: recipe.order,
          goldenRecipe: recipe.goldenRecipe.map((text, i) => ({
            order: i + 1,
            text,
          })),
          grammarSections: recipe.grammarSections,
          exampleQuestionIds: idsByKind.example,
          practiceQuestionIds: idsByKind.practice,
          isActive: true,
        },
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    );

    const grammarCount = recipe.grammarSections.reduce(
      (n, g) => n + g.entries.length,
      0,
    );
    console.log(
      `  ✅ ${recipe.groupCode} — 레시피 ${recipe.goldenRecipe.length} / 문법 ${grammarCount} / 기출 ${recipe.examples.length} / 예상 ${recipe.practice.length}`,
    );
  }

  console.log(`🍳 완료: 레시피 ${RECIPES.length}개, 문항 ${totalQuestions}개`);
  await app.close();
}

seedRecipes().catch((error) => {
  console.error('❌ 레시피 시딩 실패:', error);
  process.exit(1);
});
