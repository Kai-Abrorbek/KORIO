import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type QueryFilter } from 'mongoose';
import { PRACTICE_BASE_XP } from '../lessons/economy.const';
import { LessonsService } from '../lessons/lessons.service';
import { CompleteExpressionPracticeDto } from './dto/complete-expression-practice.dto';
import { ExpressionLanguageQueryDto } from './dto/expression-language-query.dto';
import { ExpressionScopeQueryDto } from './dto/expression-scope-query.dto';
import { ListExpressionsQueryDto } from './dto/list-expressions-query.dto';
import { ExpressionReviewResult } from './dto/review-expression.dto';
import {
  ExpressionPack,
  ExpressionPackDocument,
  type ExpressionLanguage,
  type LocalizedExpressionText,
} from './schemas/expression-pack.schema';
import {
  Expression,
  ExpressionDocument,
  type ExpressionPlacement,
} from './schemas/expression.schema';
import {
  UserExpressionProgress,
  UserExpressionProgressDocument,
  UserExpressionState,
} from './schemas/user-expression-progress.schema';

type ExpressionPackRecord = ExpressionPack & { _id: Types.ObjectId };
type ExpressionRecord = Expression & { _id: Types.ObjectId };
type ProgressRecord = UserExpressionProgress & { _id: Types.ObjectId };

@Injectable()
export class ExpressionsService {
  constructor(
    @InjectModel(ExpressionPack.name)
    private readonly packModel: Model<ExpressionPackDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    @InjectModel(UserExpressionProgress.name)
    private readonly progressModel: Model<UserExpressionProgressDocument>,
    private readonly lessonsService: LessonsService,
  ) {}

  async getOverview(userId: string, query: ExpressionScopeQueryDto) {
    const expressions = (await this.expressionModel
      .find(this.buildScopeFilter(query.section, query.unit))
      .lean()) as ExpressionRecord[];
    const packIds = [...new Set(expressions.map((item) => item.packId.toString()))]
      .map((id) => new Types.ObjectId(id));
    const packs = (await this.packModel
      .find({ _id: { $in: packIds }, isActive: true })
      .sort({ order: 1 })
      .lean()) as ExpressionPackRecord[];
    const progressMap = await this.getProgressMap(
      userId,
      expressions.map((item) => item._id),
    );
    const now = new Date();
    const byPack = new Map<string, ExpressionRecord[]>();

    for (const expression of expressions) {
      const packId = expression.packId.toString();
      const items = byPack.get(packId) ?? [];
      items.push(expression);
      byPack.set(packId, items);
    }

    const packItems = packs.map((pack) => {
      const items = this.sortExpressions(
        byPack.get(pack._id.toString()) ?? [],
        query.section,
        query.unit,
      );
      const progress = items
        .map((item) => progressMap.get(item._id.toString()))
        .filter((item): item is ProgressRecord => Boolean(item));
      const lastViewed = [...progress]
        .filter((item) => item.lastViewedAt)
        .sort(
          (a, b) =>
            (b.lastViewedAt?.getTime() ?? 0) -
            (a.lastViewedAt?.getTime() ?? 0),
        )[0];

      return {
        ...this.serializePack(pack, query.lang),
        count: items.length,
        viewed: progress.filter((item) => item.viewedCount > 0).length,
        mastered: progress.filter(
          (item) => item.state === UserExpressionState.MASTERED,
        ).length,
        saved: progress.filter((item) => item.isSaved).length,
        due: progress.filter((item) => this.isDue(item, now)).length,
        resumeExpressionId:
          lastViewed?.expressionId.toString() ?? items[0]?._id.toString() ?? null,
      };
    });

    const progress = [...progressMap.values()];
    const mostRecent = [...progress]
      .filter((item) => item.lastViewedAt)
      .sort(
        (a, b) =>
          (b.lastViewedAt?.getTime() ?? 0) -
          (a.lastViewedAt?.getTime() ?? 0),
      )[0];
    const recentExpression = mostRecent
      ? expressions.find(
          (item) => item._id.toString() === mostRecent.expressionId.toString(),
        )
      : expressions[0];
    const recentPack = recentExpression
      ? packs.find(
          (pack) => pack._id.toString() === recentExpression.packId.toString(),
        )
      : packs[0];

    return {
      scope: {
        section: query.section ?? null,
        unit: query.unit ?? null,
      },
      summary: {
        total: expressions.length,
        viewed: progress.filter((item) => item.viewedCount > 0).length,
        mastered: progress.filter(
          (item) => item.state === UserExpressionState.MASTERED,
        ).length,
        saved: progress.filter((item) => item.isSaved).length,
        due: progress.filter((item) => this.isDue(item, now)).length,
      },
      continuePackCode: recentPack?.code ?? null,
      packs: packItems,
    };
  }

  async getExpressions(userId: string, query: ListExpressionsQueryDto) {
    const pack = query.pack ? await this.findPack(query.pack) : null;
    const filter = this.buildScopeFilter(query.section, query.unit);
    if (pack) filter.packId = pack._id;

    const expressions = (await this.expressionModel
      .find(filter)
      .lean()) as ExpressionRecord[];
    const sorted = this.sortExpressions(
      expressions,
      query.section,
      query.unit,
    );
    let startIndex = 0;

    if (query.cursor) {
      const cursorIndex = sorted.findIndex(
        (expression) => expression.code === query.cursor,
      );
      if (cursorIndex === -1) {
        throw new BadRequestException('INVALID_EXPRESSION_CURSOR');
      }
      startIndex = cursorIndex + 1;
    }

    const limit = query.limit ?? 50;
    const page = sorted.slice(startIndex, startIndex + limit);
    const progressMap = await this.getProgressMap(
      userId,
      page.map((item) => item._id),
    );
    const packMap = await this.getPackMap(page);
    const hasNextPage = startIndex + page.length < sorted.length;

    return {
      pack: pack ? this.serializePack(pack, query.lang) : null,
      items: page.map((expression) =>
        this.serializeExpression(
          expression,
          packMap.get(expression.packId.toString()),
          query.lang,
          progressMap.get(expression._id.toString()),
          query.section,
          query.unit,
        ),
      ),
      total: sorted.length,
      nextCursor: hasNextPage ? page.at(-1)?.code ?? null : null,
    };
  }

  async getExpression(
    userId: string,
    id: string,
    query: ExpressionLanguageQueryDto,
  ) {
    const expression = await this.findExpression(id);
    const pack = await this.findPack(expression.packId.toString());
    const progress = (await this.progressModel
      .findOne({
        userId: new Types.ObjectId(userId),
        expressionId: expression._id,
      })
      .lean()) as ProgressRecord | null;

    return this.serializeExpression(
      expression,
      pack,
      query.lang,
      progress,
    );
  }

  async getSaved(userId: string, query: ExpressionScopeQueryDto) {
    const userObjectId = new Types.ObjectId(userId);
    const savedProgress = (await this.progressModel
      .find({ userId: userObjectId, isSaved: true })
      .sort({ savedAt: -1 })
      .lean()) as ProgressRecord[];
    const expressionIds = savedProgress.map((item) => item.expressionId);
    const filter = this.buildScopeFilter(query.section, query.unit);
    filter._id = { $in: expressionIds };
    const expressions = (await this.expressionModel
      .find(filter)
      .lean()) as ExpressionRecord[];
    const expressionMap = new Map(
      expressions.map((item) => [item._id.toString(), item]),
    );
    const packMap = await this.getPackMap(expressions);

    return {
      items: savedProgress
        .map((progress) => {
          const expression = expressionMap.get(progress.expressionId.toString());
          if (!expression) return null;
          return this.serializeExpression(
            expression,
            packMap.get(expression.packId.toString()),
            query.lang,
            progress,
            query.section,
            query.unit,
          );
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    };
  }

  async getReviewQueue(userId: string, query: ExpressionScopeQueryDto) {
    const now = new Date();
    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        state: { $in: [UserExpressionState.LEARNING, UserExpressionState.REVIEW] },
        nextReviewAt: { $ne: null, $lte: now },
      })
      .sort({ nextReviewAt: 1 })
      .lean()) as ProgressRecord[];
    const filter = this.buildScopeFilter(query.section, query.unit);
    filter._id = { $in: progress.map((item) => item.expressionId) };
    const expressions = (await this.expressionModel
      .find(filter)
      .lean()) as ExpressionRecord[];
    const expressionMap = new Map(
      expressions.map((item) => [item._id.toString(), item]),
    );
    const packMap = await this.getPackMap(expressions);

    return {
      items: progress
        .map((item) => {
          const expression = expressionMap.get(item.expressionId.toString());
          if (!expression) return null;
          return this.serializeExpression(
            expression,
            packMap.get(expression.packId.toString()),
            query.lang,
            item,
            query.section,
            query.unit,
          );
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    };
  }

  async recordView(userId: string, id: string) {
    const expression = await this.findExpression(id);
    const userObjectId = new Types.ObjectId(userId);
    const current = (await this.progressModel
      .findOne({ userId: userObjectId, expressionId: expression._id })
      .lean()) as ProgressRecord | null;
    const now = new Date();
    const progress = await this.progressModel.findOneAndUpdate(
      { userId: userObjectId, expressionId: expression._id },
      {
        $setOnInsert: {
          userId: userObjectId,
          expressionId: expression._id,
        },
        $set: {
          state:
            current?.state && current.state !== UserExpressionState.NEW
              ? current.state
              : UserExpressionState.LEARNING,
          firstViewedAt: current?.firstViewedAt ?? now,
          learnedAt: current?.learnedAt ?? now,
          lastViewedAt: now,
        },
        $inc: { viewedCount: 1 },
      },
      { upsert: true, returnDocument: 'after' },
    );

    return {
      expressionId: expression._id.toString(),
      progress: this.serializeProgress(progress),
    };
  }

  async setSaved(userId: string, id: string, isSaved: boolean) {
    const expression = await this.findExpression(id);
    const userObjectId = new Types.ObjectId(userId);
    const progress = await this.progressModel.findOneAndUpdate(
      { userId: userObjectId, expressionId: expression._id },
      {
        $setOnInsert: { userId: userObjectId, expressionId: expression._id },
        $set: { isSaved, savedAt: isSaved ? new Date() : null },
      },
      { upsert: true, returnDocument: 'after' },
    );

    return {
      expressionId: expression._id.toString(),
      progress: this.serializeProgress(progress),
    };
  }

  async reviewExpression(
    userId: string,
    id: string,
    result: ExpressionReviewResult,
  ) {
    const expression = await this.findExpression(id);
    const progress = await this.applyReview(
      new Types.ObjectId(userId),
      expression,
      result,
      result === ExpressionReviewResult.AGAIN ? 0 : 1,
      result === ExpressionReviewResult.AGAIN ? 1 : 0,
    );

    return {
      expressionId: expression._id.toString(),
      progress: this.serializeProgress(progress),
    };
  }

  async getPractice(
    packCode: string,
    query: ExpressionScopeQueryDto,
  ) {
    const pack = await this.findPack(packCode);
    const filter = this.buildScopeFilter(query.section, query.unit);
    filter.packId = pack._id;
    const expressions = this.sortExpressions(
      (await this.expressionModel.find(filter).lean()) as ExpressionRecord[],
      query.section,
      query.unit,
    );
    const questionIds = expressions.flatMap(
      (item) => item.practiceQuestionIds ?? [],
    );
    const questions = await this.lessonsService.getQuestionsByIds(
      questionIds,
      query.lang,
    );

    if (!questions.length) {
      throw new NotFoundException('EXPRESSION_PRACTICE_NOT_FOUND');
    }

    return {
      lessonId: `expression-pack-${pack.code}`,
      lessonTitle: this.localize(pack.title, query.lang, pack.code),
      category: 'expression',
      totalXp: PRACTICE_BASE_XP.expressionPractice,
      questions,
      packCode: pack.code,
      expressionIds: expressions.map((item) => item._id.toString()),
    };
  }

  async completePractice(
    userId: string,
    packCode: string,
    dto: CompleteExpressionPracticeDto,
  ) {
    const pack = await this.findPack(packCode);
    const expressions = (await this.expressionModel
      .find({ packId: pack._id, isActive: true })
      .lean()) as ExpressionRecord[];
    const allowedQuestionIds = new Set(
      expressions.flatMap((item) =>
        (item.practiceQuestionIds ?? []).map((id) => id.toString()),
      ),
    );
    const questionIds = [...new Set(dto.questionIds)].filter((id) =>
      allowedQuestionIds.has(id),
    );

    if (!questionIds.length) {
      throw new BadRequestException('NO_EXPRESSION_PRACTICE_QUESTIONS');
    }

    const submitted = new Set(questionIds);
    const wrongQuestionIds = [...new Set(dto.wrongQuestionIds ?? [])].filter(
      (id) => submitted.has(id),
    );
    const wrong = new Set(wrongQuestionIds);
    const userObjectId = new Types.ObjectId(userId);
    const updatedProgress: Array<{
      expressionId: string;
      progress: ReturnType<ExpressionsService['serializeProgress']>;
    }> = [];

    for (const expression of expressions) {
      const attempted = (expression.practiceQuestionIds ?? []).filter((id) =>
        submitted.has(id.toString()),
      );
      if (!attempted.length) continue;

      const incorrectCount = attempted.filter((id) =>
        wrong.has(id.toString()),
      ).length;
      const correctCount = attempted.length - incorrectCount;
      const result = incorrectCount
        ? ExpressionReviewResult.AGAIN
        : ExpressionReviewResult.GOOD;
      const progress = await this.applyReview(
        userObjectId,
        expression,
        result,
        correctCount,
        incorrectCount,
      );
      updatedProgress.push({
        expressionId: expression._id.toString(),
        progress: this.serializeProgress(progress),
      });
    }

    const practice = await this.lessonsService.completePractice(userId, {
      mode: 'expressionPractice',
      questionIds,
      wrongQuestionIds,
      speedSeconds: dto.speedSeconds,
      combo: dto.combo,
    });

    return { ...practice, progress: updatedProgress };
  }

  private buildScopeFilter(
    section?: number,
    unit?: number,
  ): QueryFilter<Expression> {
    if (unit && !section) {
      throw new BadRequestException('EXPRESSION_SECTION_REQUIRED_WITH_UNIT');
    }

    const filter: QueryFilter<Expression> = { isActive: true };
    if (section && unit) {
      filter.placements = { $elemMatch: { section, unit } };
    } else if (section) {
      filter['placements.section'] = section;
    }
    return filter;
  }

  private async findPack(idOrCode: string): Promise<ExpressionPackRecord> {
    const identity = Types.ObjectId.isValid(idOrCode)
      ? { _id: new Types.ObjectId(idOrCode) }
      : { code: idOrCode };
    const pack = (await this.packModel
      .findOne({ ...identity, isActive: true })
      .lean()) as ExpressionPackRecord | null;
    if (!pack) throw new NotFoundException('EXPRESSION_PACK_NOT_FOUND');
    return pack;
  }

  private async findExpression(idOrCode: string): Promise<ExpressionRecord> {
    const identity = Types.ObjectId.isValid(idOrCode)
      ? { _id: new Types.ObjectId(idOrCode) }
      : { code: idOrCode };
    const expression = (await this.expressionModel
      .findOne({ ...identity, isActive: true })
      .lean()) as ExpressionRecord | null;
    if (!expression) throw new NotFoundException('EXPRESSION_NOT_FOUND');
    return expression;
  }

  private async getPackMap(expressions: ExpressionRecord[]) {
    const ids = [...new Set(expressions.map((item) => item.packId.toString()))]
      .map((id) => new Types.ObjectId(id));
    if (!ids.length) return new Map<string, ExpressionPackRecord>();
    const packs = (await this.packModel
      .find({ _id: { $in: ids }, isActive: true })
      .lean()) as ExpressionPackRecord[];
    return new Map(packs.map((pack) => [pack._id.toString(), pack]));
  }

  private async getProgressMap(
    userId: string,
    expressionIds: Types.ObjectId[],
  ) {
    if (!expressionIds.length) return new Map<string, ProgressRecord>();
    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        expressionId: { $in: expressionIds },
      })
      .lean()) as ProgressRecord[];
    return new Map(
      progress.map((item) => [item.expressionId.toString(), item]),
    );
  }

  private sortExpressions(
    expressions: ExpressionRecord[],
    section?: number,
    unit?: number,
  ) {
    return [...expressions].sort((a, b) => {
      const aPlacement = this.findPlacement(a, section, unit);
      const bPlacement = this.findPlacement(b, section, unit);
      if (section || unit) {
        const sectionDiff =
          (aPlacement?.section ?? Number.MAX_SAFE_INTEGER) -
          (bPlacement?.section ?? Number.MAX_SAFE_INTEGER);
        if (sectionDiff) return sectionDiff;
        const unitDiff =
          (aPlacement?.unit ?? Number.MAX_SAFE_INTEGER) -
          (bPlacement?.unit ?? Number.MAX_SAFE_INTEGER);
        if (unitDiff) return unitDiff;
        const placementDiff =
          (aPlacement?.order ?? Number.MAX_SAFE_INTEGER) -
          (bPlacement?.order ?? Number.MAX_SAFE_INTEGER);
        if (placementDiff) return placementDiff;
      }
      return a.order - b.order || a.korean.localeCompare(b.korean, 'ko');
    });
  }

  private findPlacement(
    expression: ExpressionRecord,
    section?: number,
    unit?: number,
  ): ExpressionPlacement | undefined {
    const placements = expression.placements ?? [];
    return (
      placements.find(
        (placement) =>
          (!section || placement.section === section) &&
          (!unit || placement.unit === unit),
      ) ??
      [...placements].sort(
        (a, b) =>
          a.section - b.section || a.unit - b.unit || a.order - b.order,
      )[0]
    );
  }

  private serializePack(pack: ExpressionPackRecord, lang: ExpressionLanguage) {
    return {
      id: pack._id.toString(),
      code: pack.code,
      title: this.localize(pack.title, lang, pack.code),
      description: this.localize(pack.description, lang),
      media: {
        emoji: pack.media?.emoji ?? '',
        imageUrl: pack.media?.imageUrl ?? '',
        imageAlt: this.localize(pack.media?.imageAlt, lang),
      },
      order: pack.order,
    };
  }

  private serializeExpression(
    expression: ExpressionRecord,
    pack: ExpressionPackRecord | undefined,
    lang: ExpressionLanguage,
    progress?: ProgressRecord | UserExpressionProgressDocument | null,
    section?: number,
    unit?: number,
  ) {
    return {
      id: expression._id.toString(),
      code: expression.code,
      korean: expression.korean,
      meaning: this.localize(expression.meaning, lang, expression.korean),
      context: this.localize(expression.context, lang),
      usageNote: this.localize(expression.usageNote, lang),
      speechLevel: expression.speechLevel,
      pronunciation: {
        romanization: expression.pronunciation?.romanization ?? '',
        ttsText: expression.pronunciation?.ttsText || expression.korean,
        audioUrl: expression.pronunciation?.audioUrl ?? '',
      },
      media: {
        emoji: expression.media?.emoji ?? '',
        imageUrl: expression.media?.imageUrl ?? '',
        imageAlt: this.localize(expression.media?.imageAlt, lang),
      },
      placement: this.findPlacement(expression, section, unit) ?? null,
      placements: expression.placements ?? [],
      tags: expression.tags ?? [],
      difficulty: expression.difficulty,
      practiceQuestionCount: expression.practiceQuestionIds?.length ?? 0,
      pack: pack ? this.serializePack(pack, lang) : null,
      progress: this.serializeProgress(progress),
    };
  }

  private serializeProgress(
    progress?: ProgressRecord | UserExpressionProgressDocument | null,
  ) {
    if (!progress) {
      return {
        state: UserExpressionState.NEW,
        viewedCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        consecutiveCorrect: 0,
        easeFactor: 2.5,
        intervalDays: 0,
        isSaved: false,
        savedAt: null,
        firstViewedAt: null,
        lastViewedAt: null,
        learnedAt: null,
        nextReviewAt: null,
        lastReviewedAt: null,
        masteredAt: null,
        isDue: false,
      };
    }

    return {
      state: progress.state,
      viewedCount: progress.viewedCount,
      correctCount: progress.correctCount,
      incorrectCount: progress.incorrectCount,
      consecutiveCorrect: progress.consecutiveCorrect,
      easeFactor: progress.easeFactor,
      intervalDays: progress.intervalDays,
      isSaved: progress.isSaved,
      savedAt: progress.savedAt,
      firstViewedAt: progress.firstViewedAt,
      lastViewedAt: progress.lastViewedAt,
      learnedAt: progress.learnedAt,
      nextReviewAt: progress.nextReviewAt,
      lastReviewedAt: progress.lastReviewedAt,
      masteredAt: progress.masteredAt,
      isDue: this.isDue(progress, new Date()),
    };
  }

  private async applyReview(
    userId: Types.ObjectId,
    expression: ExpressionRecord,
    result: ExpressionReviewResult,
    correctIncrement: number,
    incorrectIncrement: number,
  ) {
    const current = (await this.progressModel
      .findOne({ userId, expressionId: expression._id })
      .lean()) as ProgressRecord | null;
    const now = new Date();
    const next = this.calculateReview(current, result, now);
    const progress = await this.progressModel.findOneAndUpdate(
      { userId, expressionId: expression._id },
      {
        $setOnInsert: {
          userId,
          expressionId: expression._id,
        },
        $set: {
          ...next,
          firstViewedAt: current?.firstViewedAt ?? now,
          learnedAt: current?.learnedAt ?? now,
          lastViewedAt: now,
          correctCount: (current?.correctCount ?? 0) + correctIncrement,
          incorrectCount:
            (current?.incorrectCount ?? 0) + incorrectIncrement,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
    return progress;
  }

  private calculateReview(
    current: ProgressRecord | null,
    result: ExpressionReviewResult,
    now: Date,
  ) {
    const currentInterval = current?.intervalDays ?? 0;
    const currentEase = current?.easeFactor ?? 2.5;
    const wasCorrect = result !== ExpressionReviewResult.AGAIN;
    let easeFactor = currentEase;
    let intervalDays = currentInterval;
    let shortRetry = false;

    switch (result) {
      case ExpressionReviewResult.AGAIN:
        easeFactor = Math.max(1.3, currentEase - 0.2);
        intervalDays = 0;
        shortRetry = true;
        break;
      case ExpressionReviewResult.HARD:
        easeFactor = Math.max(1.3, currentEase - 0.15);
        intervalDays =
          currentInterval <= 0
            ? 1
            : Math.max(1, Math.round(currentInterval * 1.2));
        break;
      case ExpressionReviewResult.EASY:
        easeFactor = Math.min(3, currentEase + 0.15);
        intervalDays =
          currentInterval <= 0
            ? 4
            : Math.max(4, Math.round(currentInterval * easeFactor * 1.5));
        break;
      case ExpressionReviewResult.GOOD:
      default:
        intervalDays =
          currentInterval <= 0
            ? 1
            : currentInterval === 1
              ? 3
              : Math.round(currentInterval * easeFactor);
        break;
    }

    intervalDays = Math.min(intervalDays, 3650);
    const nextReviewAt = shortRetry
      ? new Date(now.getTime() + 10 * 60 * 1000)
      : this.addDays(now, intervalDays);
    const consecutiveCorrect = wasCorrect
      ? (current?.consecutiveCorrect ?? 0) + 1
      : 0;
    const mastered = consecutiveCorrect >= 5 && intervalDays >= 21;

    return {
      state: mastered
        ? UserExpressionState.MASTERED
        : intervalDays <= 1
          ? UserExpressionState.LEARNING
          : UserExpressionState.REVIEW,
      consecutiveCorrect,
      easeFactor,
      intervalDays,
      nextReviewAt: mastered ? null : nextReviewAt,
      lastReviewedAt: now,
      masteredAt: mastered ? now : current?.masteredAt ?? null,
    };
  }

  private isDue(
    progress: ProgressRecord | UserExpressionProgressDocument,
    now: Date,
  ) {
    if (progress.state === UserExpressionState.MASTERED) return false;
    if (!progress.nextReviewAt) return false;
    return progress.nextReviewAt.getTime() <= now.getTime();
  }

  private localize(
    value: Partial<Record<ExpressionLanguage, string>> | undefined,
    lang: ExpressionLanguage,
    fallback = '',
  ) {
    return (
      value?.[lang] ||
      value?.uz ||
      value?.en ||
      value?.ru ||
      value?.ko ||
      fallback
    );
  }

  private addDays(date: Date, days: number) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}
