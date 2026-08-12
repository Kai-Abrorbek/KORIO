import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  TopikRecipe,
  TopikRecipeDocument,
} from './schemas/topik-recipe.schema';
import {
  TopikQuestion,
  TopikQuestionDocument,
} from './schemas/topik-question.schema';
import { TopikSection } from './schemas/topik-content.schema';
import { recipeBlueprintFor } from './topik-recipe-blueprint';

type RecipeQuestionView = Pick<
  TopikQuestion,
  | 'code'
  | 'number'
  | 'type'
  | 'responseType'
  | 'points'
  | 'prompt'
  | 'stimulus'
  | 'audio'
  | 'writingConfig'
  | 'presentation'
  | 'choices'
  | 'tags'
  | 'difficulty'
  | 'correctChoiceKey'
  | 'solution'
> & { _id: Types.ObjectId };

type RecipeSolutionView = Pick<
  TopikQuestion,
  'correctChoiceKey' | 'solution'
> & { _id: Types.ObjectId };

@Injectable()
export class TopikRecipeService {
  constructor(
    @InjectModel(TopikRecipe.name)
    private readonly recipeModel: Model<TopikRecipeDocument>,
    @InjectModel(TopikQuestion.name)
    private readonly questionModel: Model<TopikQuestionDocument>,
  ) {}

  /**
   * 유형 목록.
   *
   * blueprint 에 정의된 문항 그룹(읽기 1~2번, 3~4번 …)을 전부 내려준다.
   * 아직 레시피 콘텐츠가 없는 유형도 목록에는 보이되 ready: false 로 표시해
   * 어떤 유형이 준비됐는지 한눈에 보이게 한다.
   */
  async list(section?: string) {
    const blueprint = recipeBlueprintFor(section);
    if (blueprint.length === 0) return [];
    const targetSection = blueprint[0].section;

    const recipes = await this.recipeModel
      .find({ isActive: true, section: targetSection })
      .select(
        'groupCode label title targetLevel order practiceQuestionIds exampleQuestionIds grammarSections',
      )
      .lean();

    const byCode = new Map(recipes.map((r) => [r.groupCode, r]));

    return blueprint
      .map((group, index) => {
        const recipe = byCode.get(group.code);
        const grammarCount = (recipe?.grammarSections ?? []).reduce(
          (n, grammarSection) => n + grammarSection.entries.length,
          0,
        );

        return {
          groupCode: group.code,
          section: group.section,
          // 콘텐츠가 아직 없으면 문항 번호로 라벨을 만들어 둔다
          label: recipe?.label ?? this.fallbackLabel(group),
          title: recipe?.title ?? { ko: '', uz: '', en: '', ru: '' },
          fromNumber: group.from,
          toNumber: group.to,
          targetLevel: recipe?.targetLevel ?? 0,
          order: recipe?.order ?? index + 1,
          ready: !!recipe,
          exampleCount: recipe?.exampleQuestionIds?.length ?? 0,
          practiceCount: recipe?.practiceQuestionIds?.length ?? 0,
          grammarCount,
        };
      })
      .sort((a, b) => a.order - b.order);
  }

  /**
   * 학습 페이지 본문.
   * 기출문제는 해설을 붙여서 내려준다 (앱에서 '해설 보기' 로 펼침).
   */
  async detail(groupCode: string) {
    const recipe = await this.recipeModel
      .findOne({ groupCode, isActive: true })
      .lean();
    if (!recipe) throw new NotFoundException('Recipe not found');

    const examples = await this.loadQuestions(recipe.exampleQuestionIds, true);

    return {
      groupCode: recipe.groupCode,
      section: recipe.section,
      label: recipe.label,
      title: recipe.title,
      intro: recipe.intro,
      targetLevel: recipe.targetLevel,
      goldenRecipe: (recipe.goldenRecipe ?? [])
        .slice()
        .sort((a, b) => a.order - b.order),
      grammarSections: recipe.grammarSections ?? [],
      examples,
      practiceCount: recipe.practiceQuestionIds?.length ?? 0,
    };
  }

  /**
   * 예상문제.
   * 채점 전이므로 정답과 해설은 빼고 내려준다.
   */
  async practice(groupCode: string) {
    const recipe = await this.recipeModel
      .findOne({ groupCode, isActive: true })
      .select('groupCode label title practiceQuestionIds')
      .lean();
    if (!recipe) throw new NotFoundException('Recipe not found');

    const questions = await this.loadQuestions(
      recipe.practiceQuestionIds,
      false,
    );

    return {
      groupCode: recipe.groupCode,
      label: recipe.label,
      title: recipe.title,
      questions,
    };
  }

  /** 채점 후 정답·해설 (예상문제 제출 시점에 한 번에 받아간다) */
  async practiceSolutions(groupCode: string) {
    const recipe = await this.recipeModel
      .findOne({ groupCode, isActive: true })
      .select('practiceQuestionIds')
      .lean();
    if (!recipe) throw new NotFoundException('Recipe not found');

    const questions = await this.questionModel
      .find({ _id: { $in: recipe.practiceQuestionIds ?? [] } })
      .select('_id correctChoiceKey solution')
      .lean<RecipeSolutionView[]>();

    return questions.map((q) => ({
      id: q._id.toString(),
      correctChoiceKey: q.correctChoiceKey ?? '',
      solution: q.solution ?? null,
    }));
  }

  /**
   * 문항을 순서대로 로드한다.
   * $in 은 순서를 보장하지 않으므로 id 배열 순서로 다시 정렬한다.
   */
  private async loadQuestions(
    ids: Types.ObjectId[] | undefined,
    withSolution: boolean,
  ) {
    if (!ids?.length) return [];

    const base =
      '_id code number type responseType points prompt stimulus audio writingConfig presentation choices tags difficulty';
    const select = withSolution ? `${base} correctChoiceKey solution` : base;

    const docs = await this.questionModel
      .find({ _id: { $in: ids } })
      .select(select)
      .lean<RecipeQuestionView[]>();

    const byId = new Map(docs.map((doc) => [doc._id.toString(), doc]));

    return ids
      .map((id) => byId.get(id.toString()))
      .filter((question): question is RecipeQuestionView => !!question)
      .map((q) => ({
        id: q._id.toString(),
        code: q.code,
        number: q.number,
        type: q.type,
        responseType: q.responseType,
        points: q.points,
        prompt: q.prompt,
        stimulus: q.stimulus ?? null,
        audio: q.audio ?? null,
        writingConfig: q.writingConfig ?? null,
        presentation: q.presentation ?? null,
        choices: [...q.choices]
          .sort((a, b) => a.order - b.order)
          .map((choice) => ({
            key: choice.key,
            text: choice.text,
            order: choice.order,
            imageAssetKey: choice.imageAssetKey ?? '',
            imageAlt: choice.imageAlt ?? '',
          })),
        tags: q.tags ?? [],
        difficulty: q.difficulty,
        // 정답과 해설은 기출(해설 노출)에서만 내려준다
        ...(withSolution
          ? {
              correctChoiceKey: q.correctChoiceKey ?? '',
              solution: q.solution ?? null,
            }
          : {}),
      }));
  }

  private fallbackLabel(group: {
    section: TopikSection;
    from: number;
    to: number;
  }) {
    const range =
      group.from === group.to ? `${group.from}` : `${group.from}~${group.to}`;
    const section = {
      [TopikSection.READING]: {
        ko: '읽기',
        uz: "O'qish",
        en: 'Reading',
        ru: 'Чтение',
      },
      [TopikSection.LISTENING]: {
        ko: '듣기',
        uz: 'Tinglash',
        en: 'Listening',
        ru: 'Аудирование',
      },
      [TopikSection.WRITING]: {
        ko: '쓰기',
        uz: 'Yozish',
        en: 'Writing',
        ru: 'Письмо',
      },
    }[group.section];

    return {
      ko: `${section.ko} ${range}번`,
      uz: `${section.uz} ${range}-savol`,
      en: `${section.en} ${range}`,
      ru: `${section.ru} ${range}`,
    };
  }
}
