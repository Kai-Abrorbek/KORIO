import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  TopikChoiceLayout,
  TopikExamType,
  TopikPublishStatus,
  TopikResponseType,
  TopikSection,
  TopikTextBlock,
  TopikTextBlockType,
  TopikTextSegment,
  TopikTextSegmentType,
  TopikVisualTemplate,
} from '../topik/schemas/topik-content.schema';
import { TopikExam } from '../topik/schemas/topik-exam.schema';
import { TopikQuestionGroup } from '../topik/schemas/topik-question-group.schema';
import { TopikQuestion } from '../topik/schemas/topik-question.schema';
import { TopikRecipe } from '../topik/schemas/topik-recipe.schema';
import { TopikModule } from '../topik/topik.module';
import { RECIPE_READING_01_02 } from './data/recipe/reading-01-02';
import { RECIPE_CATALOG } from './data/recipe/recipe-catalog';
import {
  RecipeSeed,
  RecipeSeedQuestion,
} from './data/recipe/recipe-seed.types';
import {
  TOPIK_LISTENING_MOCK_1_SEED,
  TOPIK_LISTENING_MOCK_2_SEED,
  TOPIK_READING_MOCK_1_SEED,
  TOPIK_READING_MOCK_2_SEED,
  TOPIK_WRITING_MOCK_1_SEED,
  TOPIK_WRITING_MOCK_2_SEED,
  TopikExamSeed,
  TopikSeedGroup,
  TopikSeedQuestion,
} from './data/topik';

const RECIPES: RecipeSeed[] = [RECIPE_READING_01_02, ...RECIPE_CATALOG];

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

const presentationFor = (section: TopikSection) => ({
  template:
    section === TopikSection.LISTENING
      ? TopikVisualTemplate.EXAM_LISTENING
      : section === TopikSection.WRITING
        ? TopikVisualTemplate.EXAM_WRITING
        : TopikVisualTemplate.EXAM_PASSAGE,
  choiceLayout: TopikChoiceLayout.ONE_COLUMN,
  visualVariant: 'recipe',
  showBorder: true,
  preserveChoiceOrder: true,
});

/** `___`를 TOPIK 빈칸 세그먼트로 변환한다. */
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

function buildCustomQuestion(
  question: RecipeSeedQuestion,
  examId: Types.ObjectId,
  groupId: Types.ObjectId,
  storedNumber: number,
  order: number,
) {
  const choices = question.choices.map((choice, index) => ({
    key: `c${index + 1}`,
    text: choice.text,
    order: index + 1,
    imageAssetKey: choice.imageAssetKey ?? '',
    imageAlt: choice.imageAlt ?? '',
  }));
  const responseType =
    question.responseType ?? TopikResponseType.MULTIPLE_CHOICE;
  const answerIndex = question.choices.findIndex((choice) => choice.correct);

  if (
    responseType === TopikResponseType.MULTIPLE_CHOICE &&
    answerIndex < 0
  ) {
    throw new Error(`정답이 지정되지 않은 문항: ${question.code}`);
  }

  return {
    code: question.code,
    examId,
    groupId,
    number: storedNumber,
    order,
    type: question.type,
    responseType,
    points: question.points ?? 2,
    prompt: promptBlocks(question.prompt),
    stimulus: question.stimulus,
    audio: question.audio,
    writingConfig: question.writingConfig,
    choices,
    correctChoiceKey:
      responseType === TopikResponseType.MULTIPLE_CHOICE
        ? `c${answerIndex + 1}`
        : '',
    difficulty: question.difficulty ?? 3,
    tags: question.source ? [question.source] : [],
    solution: {
      explanation: question.solution?.explanation ?? {},
      strategy: question.solution?.strategy ?? {},
      keyClues: question.solution?.keyClues ?? [],
      steps: question.solution?.steps ?? [],
      hints: question.solution?.hints ?? [],
      choiceNotes: (question.solution?.choiceNotes ?? []).map(
        (note, index) => ({
          choiceKey: `c${index + 1}`,
          note,
        }),
      ),
      sampleAnswer: question.solution?.sampleAnswer ?? '',
      rubric: question.solution?.rubric ?? [],
    },
    presentation:
      question.presentation ?? {
        template:
          responseType === TopikResponseType.WRITTEN
            ? TopikVisualTemplate.EXAM_WRITING
            : question.audio
              ? TopikVisualTemplate.EXAM_LISTENING
              : TopikVisualTemplate.EXAM_SENTENCE,
        choiceLayout: TopikChoiceLayout.ONE_COLUMN,
        visualVariant: 'recipe',
        showBorder: true,
        preserveChoiceOrder: true,
      },
    source: { reference: question.source ?? '' },
    version: 1,
    isActive: true,
  };
}

function sourceItems(
  recipe: RecipeSeed,
  kind: 'example' | 'practice',
): Array<{ question: TopikSeedQuestion; group?: TopikSeedGroup }> {
  if (!recipe.questionSource) return [];

  const seed = SOURCE_SEEDS[recipe.section][kind];
  const groupByCode = new Map(seed.groups.map((group) => [group.code, group]));

  return seed.questions
    .filter(
      (question) =>
        question.number >= recipe.questionSource!.from &&
        question.number <= recipe.questionSource!.to,
    )
    .sort((a, b) => a.number - b.number)
    .map((question) => ({
      question,
      group: groupByCode.get(question.groupCode),
    }));
}

function cloneSourceQuestion(
  recipe: RecipeSeed,
  kind: 'example' | 'practice',
  source: TopikSeedQuestion,
  sourceGroup: TopikSeedGroup | undefined,
  examId: Types.ObjectId,
  groupId: Types.ObjectId,
  storedNumber: number,
  order: number,
) {
  const content: Partial<TopikSeedQuestion> = { ...source };
  delete content.groupCode;
  delete content.code;
  return {
    ...content,
    code: `recipe-${recipe.groupCode}-${kind === 'example' ? 'ex' : 'pr'}-${String(
      source.number,
    ).padStart(2, '0')}`,
    examId,
    groupId,
    number: storedNumber,
    order,
    stimulus: source.stimulus ?? sourceGroup?.sharedStimulus,
    audio: source.audio ?? sourceGroup?.sharedAudio,
    responseType: source.responseType ?? TopikResponseType.MULTIPLE_CHOICE,
    isActive: true,
  };
}

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

async function seedRecipes() {
  const app = await NestFactory.createApplicationContext(SeedRecipeModule);

  try {
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

    const activeRecipeCodes: string[] = [];
    const activeBankCodes: string[] = [];
    let totalQuestions = 0;

    for (const recipe of RECIPES) {
      const customExamples = recipe.examples;
      const customPractice = recipe.practice;
      const linkedExamples = sourceItems(recipe, 'example');
      const linkedPractice = sourceItems(recipe, 'practice');
      const exampleCount = recipe.questionSource
        ? linkedExamples.length
        : customExamples.length;
      const practiceCount = recipe.questionSource
        ? linkedPractice.length
        : customPractice.length;
      const totalPoints = recipe.questionSource
        ? [...linkedExamples, ...linkedPractice].reduce(
            (sum, item) => sum + item.question.points,
            0,
          )
        : [...customExamples, ...customPractice].reduce(
            (sum, question) => sum + (question.points ?? 2),
            0,
          );

      if (exampleCount === 0 || practiceCount === 0) {
        throw new Error(
          `${recipe.groupCode}: 풀이 예제와 예상문제는 각각 1개 이상이어야 합니다.`,
        );
      }

      const bankCode = `recipe-bank-${recipe.groupCode}`;
      activeRecipeCodes.push(recipe.groupCode);
      activeBankCodes.push(bankCode);

      const exam = await examModel.findOneAndUpdate(
        { code: bankCode },
        {
          $set: {
            code: bankCode,
            title: recipe.title,
            description: recipe.intro,
            examType: TopikExamType.TOPIK_II,
            section: recipe.section,
            durationMinutes: 1,
            totalQuestions: exampleCount + practiceCount,
            totalPoints: Math.max(1, totalPoints),
            status: TopikPublishStatus.PUBLISHED,
            version: 1,
            isActive: true,
            isQuestionBank: true,
            source: {
              title: 'TOPIK II 합격 레시피',
              edition: '2019',
              publisher: '한글파크',
              reference: recipe.sourceReference ?? '',
            },
          },
        },
        {
          upsert: true,
          returnDocument: 'after',
          setDefaultsOnInsert: true,
          runValidators: true,
        },
      );

      const idsByKind: Record<'example' | 'practice', Types.ObjectId[]> = {
        example: [],
        practice: [],
      };
      const activeGroupCodes: string[] = [];
      const activeQuestionCodes: string[] = [];

      // 레시피 구조나 저장 번호가 바뀌어도 기존 문항/그룹 _id를 최대한 유지한다.
      // 먼저 기존 고유 인덱스 슬롯을 임시 범위로 이동해야, code가 같은 문항의
      // number를 바꾸거나 새 code가 기존 number를 이어받을 때 E11000이 나지 않는다.
      const existingGroups = await groupModel
        .find({ examId: exam._id })
        .select('_id code order')
        .lean()
        .exec();
      const existingGroupsByCode = new Map(
        existingGroups.map((item) => [item.code, item]),
      );
      const existingGroupsByOrder = new Map(
        existingGroups.map((item) => [item.order, item]),
      );
      if (existingGroups.length > 0) {
        const temporaryOrderStart =
          Math.max(...existingGroups.map((item) => item.order), 100) + 100;
        await groupModel.bulkWrite(
          existingGroups.map((item, index) => ({
            updateOne: {
              filter: { _id: item._id },
              update: { $set: { order: temporaryOrderStart + index } },
            },
          })),
          { ordered: true },
        );
      }

      const existingQuestions = await questionModel
        .find({ examId: exam._id })
        .select('_id code number')
        .lean()
        .exec();
      const existingQuestionsByCode = new Map(
        existingQuestions.map((item) => [item.code, item]),
      );
      const existingQuestionsByNumber = new Map(
        existingQuestions.map((item) => [item.number, item]),
      );
      if (existingQuestions.length > 0) {
        const temporaryNumberStart =
          Math.max(...existingQuestions.map((item) => item.number), 100) + 100;
        await questionModel.bulkWrite(
          existingQuestions.map((item, index) => ({
            updateOne: {
              filter: { _id: item._id },
              update: {
                $set: {
                  number: temporaryNumberStart + index,
                  // (groupId, order) 고유 인덱스도 함께 비워 둔다.
                  order: temporaryNumberStart + index,
                },
              },
            },
          })),
          { ordered: true },
        );
      }

      const claimedGroupIds = new Set<string>();
      const claimedQuestionIds = new Set<string>();

      for (const kind of ['example', 'practice'] as const) {
        const customItems =
          kind === 'example' ? customExamples : customPractice;
        const linkedItems =
          kind === 'example' ? linkedExamples : linkedPractice;
        const count = recipe.questionSource
          ? linkedItems.length
          : customItems.length;
        const storedNumbers = Array.from({ length: count }, (_, index) =>
          kind === 'example'
            ? recipe.questionSource
              ? linkedItems[index].question.number
              : customItems[index].number
            : recipe.questionSource
              ? 61 + index
              : Math.max(...customExamples.map((item) => item.number)) +
                1 +
                index,
        );
        const pointsPerQuestion = recipe.questionSource
          ? linkedItems[0].question.points
          : 2;
        const groupCode = `${recipe.groupCode}-${kind}`;
        activeGroupCodes.push(groupCode);

        const desiredGroupOrder = kind === 'example' ? 1 : 2;
        const existingGroupByCode = existingGroupsByCode.get(groupCode);
        const existingGroupByOrder =
          existingGroupsByOrder.get(desiredGroupOrder);
        const reusableGroup = [existingGroupByCode, existingGroupByOrder].find(
          (item) => item && !claimedGroupIds.has(String(item._id)),
        );

        const group = await groupModel.findOneAndUpdate(
          reusableGroup
            ? { _id: reusableGroup._id }
            : { examId: exam._id, code: groupCode },
          {
            $set: {
              code: groupCode,
              examId: exam._id,
              order: desiredGroupOrder,
              startNumber: Math.min(...storedNumbers),
              endNumber: Math.max(...storedNumbers),
              instruction: promptBlocks(
                kind === 'example' ? '풀이 예제' : '예상문제',
              ),
              pointsPerQuestion,
              presentation: presentationFor(recipe.section),
              version: 1,
              isActive: true,
            },
          },
          {
            upsert: true,
            returnDocument: 'after',
            setDefaultsOnInsert: true,
            runValidators: true,
          },
        );
        claimedGroupIds.add(String(group._id));

        for (let index = 0; index < count; index++) {
          const storedNumber = storedNumbers[index];
          const doc = recipe.questionSource
            ? cloneSourceQuestion(
                recipe,
                kind,
                linkedItems[index].question,
                linkedItems[index].group,
                exam._id,
                group._id,
                storedNumber,
                index + 1,
              )
            : buildCustomQuestion(
                customItems[index],
                exam._id,
                group._id,
                storedNumber,
                index + 1,
              );

          const existingQuestionByCode = existingQuestionsByCode.get(doc.code);
          const existingQuestionByNumber =
            existingQuestionsByNumber.get(storedNumber);
          const reusableQuestion = [
            existingQuestionByCode,
            existingQuestionByNumber,
          ].find((item) => item && !claimedQuestionIds.has(String(item._id)));

          const saved = await questionModel.findOneAndUpdate(
            reusableQuestion
              ? { _id: reusableQuestion._id }
              : { code: doc.code },
            { $set: doc },
            {
              upsert: true,
              returnDocument: 'after',
              setDefaultsOnInsert: true,
              runValidators: true,
            },
          );
          claimedQuestionIds.add(String(saved._id));
          idsByKind[kind].push(saved._id);
          activeQuestionCodes.push(doc.code);
          totalQuestions += 1;
        }
      }

      await Promise.all([
        groupModel.deleteMany({
          examId: exam._id,
          code: { $nin: activeGroupCodes },
        }),
        questionModel.deleteMany({
          examId: exam._id,
          code: { $nin: activeQuestionCodes },
        }),
      ]);

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
            goldenRecipe: recipe.goldenRecipe.map((text, index) => ({
              order: index + 1,
              text,
            })),
            grammarSections: recipe.grammarSections,
            exampleQuestionIds: idsByKind.example,
            practiceQuestionIds: idsByKind.practice,
            isActive: true,
          },
        },
        {
          upsert: true,
          returnDocument: 'after',
          setDefaultsOnInsert: true,
          runValidators: true,
        },
      );

      const rankingCount = recipe.grammarSections.reduce(
        (sum, section) => sum + section.entries.length,
        0,
      );
      console.log(
        `  ✅ ${recipe.groupCode} — 전략 ${recipe.goldenRecipe.length} / Ranking ${rankingCount} / 예제 ${exampleCount} / 예상 ${practiceCount}`,
      );
    }

    const staleBanks = await examModel
      .find({
        $and: [
          { code: { $regex: /^recipe-bank-/ } },
          { code: { $nin: activeBankCodes } },
        ],
      })
      .select('_id')
      .lean();
    const staleBankIds = staleBanks.map((bank) => bank._id);

    if (staleBankIds.length > 0) {
      await Promise.all([
        questionModel.deleteMany({ examId: { $in: staleBankIds } }),
        groupModel.deleteMany({ examId: { $in: staleBankIds } }),
        examModel.deleteMany({ _id: { $in: staleBankIds } }),
      ]);
    }
    // 예전 단일 읽기 문제은행도 새 레시피별 문제은행으로 대체한다.
    const legacyBank = await examModel
      .findOne({ code: 'recipe-bank-reading' })
      .select('_id')
      .lean();
    if (legacyBank) {
      await Promise.all([
        questionModel.deleteMany({ examId: legacyBank._id }),
        groupModel.deleteMany({ examId: legacyBank._id }),
        examModel.deleteOne({ _id: legacyBank._id }),
      ]);
    }
    await recipeModel.deleteMany({ groupCode: { $nin: activeRecipeCodes } });

    console.log(
      `🍳 완료: 레시피 ${RECIPES.length}개, 레시피 문항 ${totalQuestions}개`,
    );
  } finally {
    await app.close();
  }
}

seedRecipes().catch((error) => {
  console.error('❌ 레시피 시딩 실패:', error);
  process.exit(1);
});
