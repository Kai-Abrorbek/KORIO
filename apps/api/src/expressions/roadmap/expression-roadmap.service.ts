import { Injectable } from '@nestjs/common';
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
} from '../schemas/user-expression-progress.schema';

type PackRecord = ExpressionPack & { _id: Types.ObjectId };
type NodeRecord = ExpressionNode & { _id: Types.ObjectId };
type ExpressionRecord = Pick<Expression, 'nodeId'> & { _id: Types.ObjectId };
type ProgressRecord = Pick<
  UserExpressionProgress,
  'expressionId' | 'viewedCount' | 'lastViewedAt'
>;

type NodeStatus = 'completed' | 'current' | 'locked';

@Injectable()
export class ExpressionRoadmapService {
  constructor(
    @InjectModel(ExpressionPack.name)
    private readonly packModel: Model<ExpressionPackDocument>,
    @InjectModel(ExpressionNode.name)
    private readonly nodeModel: Model<ExpressionNodeDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    @InjectModel(UserExpressionProgress.name)
    private readonly progressModel: Model<UserExpressionProgressDocument>,
  ) {}

  async getRoadmap(userId: string, lang: ExpressionLanguage) {
    const packs = (await this.packModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .lean()) as PackRecord[];
    const packIds = packs.map((pack) => pack._id);
    const nodes = (await this.nodeModel
      .find({ packId: { $in: packIds }, isActive: true })
      .sort({ order: 1 })
      .lean()) as NodeRecord[];
    const nodeIds = nodes.map((node) => node._id);
    const expressions = (await this.expressionModel
      .find({ nodeId: { $in: nodeIds }, isActive: true })
      .select({ _id: 1, nodeId: 1 })
      .lean()) as ExpressionRecord[];
    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        expressionId: { $in: expressions.map((item) => item._id) },
      })
      .select({ expressionId: 1, viewedCount: 1, lastViewedAt: 1 })
      .lean()) as ProgressRecord[];

    const expressionIdsByNode = new Map<string, Types.ObjectId[]>();
    for (const expression of expressions) {
      const nodeId = expression.nodeId.toString();
      const ids = expressionIdsByNode.get(nodeId) ?? [];
      ids.push(expression._id);
      expressionIdsByNode.set(nodeId, ids);
    }

    const progressByExpression = new Map(
      progress.map((item) => [item.expressionId.toString(), item]),
    );
    const nodesByPack = new Map<string, NodeRecord[]>();
    for (const node of nodes) {
      const packId = node.packId.toString();
      const items = nodesByPack.get(packId) ?? [];
      items.push(node);
      nodesByPack.set(packId, items);
    }

    let pathOpen = true;
    let continueNodeCode: string | null = null;
    let totalExpressions = 0;
    let learnedExpressions = 0;
    let totalExposures = 0;
    let completedExposures = 0;

    const topics = packs
      .map((pack) => {
        const topicNodes = (nodesByPack.get(pack._id.toString()) ?? [])
          .sort((a, b) => a.order - b.order)
          .map((node) => {
            const expressionIds =
              expressionIdsByNode.get(node._id.toString()) ?? [];
            const requiredExposures = node.requiredExposures;
            const exposureTotal = expressionIds.length * requiredExposures;
            const exposureDone = expressionIds.reduce((sum, expressionId) => {
              const viewed =
                progressByExpression.get(expressionId.toString())?.viewedCount ??
                0;
              return sum + Math.min(viewed, requiredExposures);
            }, 0);
            const learnedCount = expressionIds.filter((expressionId) => {
              const viewed =
                progressByExpression.get(expressionId.toString())?.viewedCount ??
                0;
              return viewed >= requiredExposures;
            }).length;
            const completed =
              expressionIds.length > 0 && learnedCount === expressionIds.length;
            let status: NodeStatus = 'locked';

            if (pathOpen && completed) {
              status = 'completed';
            } else if (pathOpen && expressionIds.length > 0) {
              status = 'current';
              continueNodeCode ??= node.code;
              pathOpen = false;
            } else {
              status = 'locked';
              pathOpen = false;
            }

            totalExpressions += expressionIds.length;
            learnedExpressions += learnedCount;
            totalExposures += exposureTotal;
            completedExposures += exposureDone;

            return {
              id: node._id.toString(),
              code: node.code,
              title: this.localize(node.title, lang, node.code),
              description: this.localize(node.description, lang),
              icon: node.icon,
              order: node.order,
              requiredExposures,
              expressionCount: expressionIds.length,
              learnedExpressionCount: learnedCount,
              completedExposures: exposureDone,
              totalExposures: exposureTotal,
              progress: exposureTotal ? exposureDone / exposureTotal : 0,
              status,
            };
          });

        const completedNodes = topicNodes.filter(
          (node) => node.status === 'completed',
        ).length;

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
          completedNodes,
          totalNodes: topicNodes.length,
          progress: topicNodes.length ? completedNodes / topicNodes.length : 0,
          nodes: topicNodes,
        };
      })
      .filter((topic) => topic.nodes.length > 0);

    if (!continueNodeCode) {
      const lastCompletedNode = topics
        .flatMap((topic) => topic.nodes)
        .filter((node) => node.status === 'completed')
        .at(-1);
      continueNodeCode = lastCompletedNode?.code ?? null;
    }

    return {
      summary: {
        totalTopics: topics.length,
        totalNodes: topics.reduce((sum, topic) => sum + topic.totalNodes, 0),
        completedNodes: topics.reduce(
          (sum, topic) => sum + topic.completedNodes,
          0,
        ),
        totalExpressions,
        learnedExpressions,
        totalExposures,
        completedExposures,
        progress: totalExposures ? completedExposures / totalExposures : 0,
      },
      continueNodeCode,
      topics,
    };
  }

  private localize(
    value: Partial<Record<ExpressionLanguage, string>> | LocalizedExpressionText,
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
