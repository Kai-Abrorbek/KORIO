import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ExpressionNode,
  ExpressionNodeDocument,
} from '../schemas/expression-node.schema';
import {
  ExpressionPack,
  ExpressionPackDocument,
  type ExpressionLanguage,
  type LocalizedExpressionText,
} from '../schemas/expression-pack.schema';
import {
  Expression,
  ExpressionDocument,
} from '../schemas/expression.schema';
import {
  UserExpressionProgress,
  UserExpressionProgressDocument,
  UserExpressionState,
} from '../schemas/user-expression-progress.schema';
import { ExpressionRoadmapService } from '../roadmap/expression-roadmap.service';

type PackRecord = ExpressionPack & { _id: Types.ObjectId };
type NodeRecord = ExpressionNode & { _id: Types.ObjectId };
type ExpressionRecord = Expression & { _id: Types.ObjectId };
type ProgressRecord = UserExpressionProgress & { _id: Types.ObjectId };

@Injectable()
export class ExpressionLearningService {
  constructor(
    @InjectModel(ExpressionPack.name)
    private readonly packModel: Model<ExpressionPackDocument>,
    @InjectModel(ExpressionNode.name)
    private readonly nodeModel: Model<ExpressionNodeDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    @InjectModel(UserExpressionProgress.name)
    private readonly progressModel: Model<UserExpressionProgressDocument>,
    private readonly roadmapService: ExpressionRoadmapService,
  ) {}

  async getNodeLearning(
    userId: string,
    nodeCode: string,
    lang: ExpressionLanguage,
  ) {
    const roadmap = await this.roadmapService.getRoadmap(userId, lang);
    const roadmapNode = roadmap.topics
      .flatMap((topic) => topic.nodes)
      .find((item) => item.code === nodeCode);
    if (!roadmapNode) {
      throw new NotFoundException('EXPRESSION_NODE_NOT_FOUND');
    }
    if (roadmapNode.status === 'locked') {
      throw new ForbiddenException('EXPRESSION_NODE_LOCKED');
    }

    const node = (await this.nodeModel
      .findOne({ code: nodeCode, isActive: true })
      .lean()) as NodeRecord | null;
    if (!node) throw new NotFoundException('EXPRESSION_NODE_NOT_FOUND');

    const [pack, expressions] = await Promise.all([
      this.packModel.findOne({ _id: node.packId, isActive: true }).lean(),
      this.expressionModel
        .find({ nodeId: node._id, isActive: true })
        .sort({ order: 1 })
        .lean(),
    ]);
    if (!pack) throw new NotFoundException('EXPRESSION_TOPIC_NOT_FOUND');

    const expressionRecords = expressions as ExpressionRecord[];
    if (!expressionRecords.length) {
      throw new NotFoundException('EXPRESSION_NODE_EMPTY');
    }

    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        expressionId: { $in: expressionRecords.map((item) => item._id) },
      })
      .lean()) as ProgressRecord[];
    const progressMap = new Map(
      progress.map((item) => [item.expressionId.toString(), item]),
    );
    const packRecord = pack as PackRecord;

    return {
      topic: this.serializePack(packRecord, lang),
      node: {
        id: node._id.toString(),
        code: node.code,
        title: this.localize(node.title, lang, node.code),
        description: this.localize(node.description, lang),
        icon: node.icon,
        order: node.order,
        requiredExposures: node.requiredExposures,
      },
      items: expressionRecords.map((expression) =>
        this.serializeExpression(
          expression,
          packRecord,
          lang,
          progressMap.get(expression._id.toString()),
        ),
      ),
    };
  }

  private serializePack(pack: PackRecord, lang: ExpressionLanguage) {
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
    pack: PackRecord,
    lang: ExpressionLanguage,
    progress?: ProgressRecord,
  ) {
    return {
      id: expression._id.toString(),
      code: expression.code,
      korean: expression.korean,
      meaning: this.localize(expression.meaning, lang, expression.korean),
      context: this.localize(expression.context, lang),
      speaker: this.localize(expression.speaker, lang),
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
      placements: expression.placements ?? [],
      tags: expression.tags ?? [],
      difficulty: expression.difficulty,
      pack: this.serializePack(pack, lang),
      progress: this.serializeProgress(progress),
    };
  }

  private serializeProgress(progress?: ProgressRecord) {
    if (!progress) {
      return {
        state: UserExpressionState.NEW,
        viewedCount: 0,
        isSaved: false,
        firstViewedAt: null,
        lastViewedAt: null,
        learnedAt: null,
      };
    }

    return {
      state: progress.state,
      viewedCount: progress.viewedCount,
      isSaved: progress.isSaved,
      firstViewedAt: progress.firstViewedAt,
      lastViewedAt: progress.lastViewedAt,
      learnedAt: progress.learnedAt,
    };
  }

  private localize(
    value:
      | Partial<Record<ExpressionLanguage, string>>
      | LocalizedExpressionText
      | undefined,
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
}
