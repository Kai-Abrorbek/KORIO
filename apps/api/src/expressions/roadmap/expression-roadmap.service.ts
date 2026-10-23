import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  courseContentFilter,
  type CourseScope,
  resolveCourseScope,
  DEFAULT_COURSE_ID,
} from '../../common/learning-course';
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
import { Expression, ExpressionDocument } from '../schemas/expression.schema';
import {
  UserExpressionProgress,
  UserExpressionProgressDocument,
} from '../schemas/user-expression-progress.schema';
import {
  UserExpressionPath,
  UserExpressionPathDocument,
} from '../schemas/user-expression-path.schema';

type PackRecord = ExpressionPack & { _id: Types.ObjectId };
type NodeRecord = ExpressionNode & { _id: Types.ObjectId };
type ExpressionRecord = Pick<Expression, 'nodeId'> & { _id: Types.ObjectId };
type ProgressRecord = Pick<
  UserExpressionProgress,
  'expressionId' | 'viewedCount' | 'lastViewedAt'
>;

type NodeStatus = 'completed' | 'current' | 'locked';

/**
 * 노드 열림/잠김. 앞에서부터 길을 따라가며 처음 만나는 안 끝낸 노드 하나만 'current' 다.
 * focusIndex(사용자가 고른 주제)가 있으면 길은 그 주제의 처음에서 열린다 — 그 앞의 안 끝낸
 * 노드는 잠기고(다시 고르면 돌아간다), 다 익힌 노드는 어디 있든 'completed' (다시 보기 가능).
 * 표현이 하나도 없는 노드는 열 수 없어서 길을 막는다 (예전과 같다).
 */
export function assignNodeStatuses(
  topics: Array<{
    nodes: Array<{ completed: boolean; expressionCount: number }>;
  }>,
  focusIndex: number,
): NodeStatus[][] {
  let pathOpen = focusIndex < 0;
  return topics.map((topic, topicIndex) => {
    if (topicIndex === focusIndex) pathOpen = true;
    return topic.nodes.map((node): NodeStatus => {
      if (node.completed) return 'completed';
      if (pathOpen && node.expressionCount > 0) {
        pathOpen = false;
        return 'current';
      }
      pathOpen = false;
      return 'locked';
    });
  });
}

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
    @InjectModel(UserExpressionPath.name)
    private readonly pathModel: Model<UserExpressionPathDocument>,
  ) {}

  /**
   * 목록이나 "이 주제로 넘어갈까요?" 로 고른 주제부터 길을 다시 연다 (시험 없이 바로).
   * 진도는 그대로라 다시 고르면 언제든 돌아간다.
   */
  async focusTopic(
    userId: string,
    packCode: string,
    scope: CourseScope = resolveCourseScope(),
  ) {
    const pack = await this.packModel
      .findOne({
        code: packCode,
        isActive: true,
        ...courseContentFilter(scope),
      })
      .select({ _id: 1 })
      .lean();
    if (!pack) throw new NotFoundException('EXPRESSION_TOPIC_NOT_FOUND');
    await this.pathModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set:
          scope.courseId === DEFAULT_COURSE_ID
            ? { focusPackId: pack._id }
            : { [`courseFocusPackIds.${scope.courseId}`]: pack._id },
      },
      { upsert: true },
    );
  }

  async getRoadmap(
    userId: string,
    lang: ExpressionLanguage,
    scope: CourseScope = resolveCourseScope(),
  ) {
    const packs = (await this.packModel
      .find({ isActive: true, ...courseContentFilter(scope) })
      .sort({ order: 1 })
      .lean()) as PackRecord[];
    const packIds = packs.map((pack) => pack._id);
    const nodes = (await this.nodeModel
      .find({ packId: { $in: packIds }, isActive: true })
      .sort({ order: 1 })
      .lean()) as NodeRecord[];
    const nodeIds = nodes.map((node) => node._id);
    const expressions = (await this.expressionModel
      .find({
        nodeId: { $in: nodeIds },
        isActive: true,
        ...courseContentFilter(scope),
      })
      .select({ _id: 1, nodeId: 1 })
      .lean()) as ExpressionRecord[];
    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        expressionId: { $in: expressions.map((item) => item._id) },
      })
      .select({ expressionId: 1, viewedCount: 1, lastViewedAt: 1 })
      .lean()) as ProgressRecord[];
    const path = (await this.pathModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .select({ focusPackId: 1, courseFocusPackIds: 1 })
      .lean()) as Pick<
      UserExpressionPath,
      'focusPackId' | 'courseFocusPackIds'
    > | null;

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

    // 노드마다 진도부터 센다 — 열림/잠김은 아래에서 따로 정한다 (고른 주제가 있으면 거기부터 다시 열어야 해서)
    const measured = packs
      .map((pack) => ({
        pack,
        nodes: (nodesByPack.get(pack._id.toString()) ?? [])
          .sort((a, b) => a.order - b.order)
          .map((node) => {
            const expressionIds =
              expressionIdsByNode.get(node._id.toString()) ?? [];
            const requiredExposures = node.requiredExposures;
            const viewedOf = (expressionId: Types.ObjectId) =>
              progressByExpression.get(expressionId.toString())?.viewedCount ??
              0;
            const exposureDone = expressionIds.reduce(
              (sum, expressionId) =>
                sum + Math.min(viewedOf(expressionId), requiredExposures),
              0,
            );
            const learnedCount = expressionIds.filter(
              (expressionId) => viewedOf(expressionId) >= requiredExposures,
            ).length;
            return {
              node,
              expressionCount: expressionIds.length,
              learnedCount,
              exposureTotal: expressionIds.length * requiredExposures,
              exposureDone,
              completed:
                expressionIds.length > 0 &&
                learnedCount === expressionIds.length,
            };
          }),
      }))
      .filter((topic) => topic.nodes.length > 0);

    const courseFocus = path?.courseFocusPackIds as
      | Map<string, Types.ObjectId>
      | Record<string, Types.ObjectId>
      | undefined;
    const focusPackId =
      scope.courseId === DEFAULT_COURSE_ID
        ? path?.focusPackId
        : courseFocus instanceof Map
          ? courseFocus.get(scope.courseId)
          : courseFocus?.[scope.courseId];
    const focusIndex = focusPackId
      ? measured.findIndex((topic) =>
          topic.pack._id.equals(focusPackId as Types.ObjectId),
        )
      : -1;
    let statuses = assignNodeStatuses(measured, focusIndex);
    // 고른 주제부터 끝까지 다 익혔는데 앞에 남은 게 있으면 처음부터 다시 연다 (갈 곳이 없어지지 않게)
    if (focusIndex > 0 && !statuses.flat().includes('current')) {
      statuses = assignNodeStatuses(measured, -1);
    }

    let continueNodeCode: string | null = null;
    let totalExpressions = 0;
    let learnedExpressions = 0;
    let totalExposures = 0;
    let completedExposures = 0;

    const topics = measured.map(
      ({ pack, nodes: measuredNodes }, topicIndex) => {
        const topicNodes = measuredNodes.map((item, nodeIndex) => {
          const { node } = item;
          const status = statuses[topicIndex]?.[nodeIndex] ?? 'locked';
          if (status === 'current') continueNodeCode ??= node.code;

          totalExpressions += item.expressionCount;
          learnedExpressions += item.learnedCount;
          totalExposures += item.exposureTotal;
          completedExposures += item.exposureDone;

          return {
            id: node._id.toString(),
            code: node.code,
            title: this.localize(node.title, lang, node.code),
            description: this.localize(node.description, lang),
            icon: node.icon,
            order: node.order,
            requiredExposures: node.requiredExposures,
            expressionCount: item.expressionCount,
            learnedExpressionCount: item.learnedCount,
            completedExposures: item.exposureDone,
            totalExposures: item.exposureTotal,
            progress: item.exposureTotal
              ? item.exposureDone / item.exposureTotal
              : 0,
            status,
          };
        });

        const completedNodes = topicNodes.filter(
          (node) => node.status === 'completed',
        ).length;

        return {
          id: pack._id.toString(),
          code: pack.code,
          courseId: pack.courseId || 'ko-general',
          targetLanguage: pack.targetLanguage || 'ko',
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
      },
    );

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
    value:
      | Partial<Record<ExpressionLanguage, string>>
      | LocalizedExpressionText,
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
