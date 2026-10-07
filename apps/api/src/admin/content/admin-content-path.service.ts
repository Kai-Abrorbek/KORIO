import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lesson, LessonDocument } from '../../lessons/schemas/lesson.schema';
import {
  LessonNode,
  LessonNodeDocument,
} from '../../lessons/schemas/node.schema';
import {
  Question,
  QuestionDocument,
} from '../../lessons/schemas/question.schema';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;
const ORPHAN_PAGE_SIZE = 20;

type UnitQuery = {
  section?: string;
  unit?: string;
  page?: string;
  pageSize?: string;
  orphanPage?: string;
};
type GroupRow = {
  _id: { section: number; unit: number; category: string };
  nodeCount?: number;
  activeNodeCount?: number;
  lessonCount?: number;
  activeLessonCount?: number;
};
type Text = { uz?: string; en?: string; ko?: string; ru?: string };
type NodeRow = {
  _id: Types.ObjectId;
  code?: string;
  title?: Text;
  order: number;
  section: number;
  unit: number;
  nodeType?: string;
  category?: string;
  isActive?: boolean;
  lessonIds?: Types.ObjectId[];
};
type LessonRow = {
  _id: Types.ObjectId;
  nodeId: Types.ObjectId;
  code?: string;
  title?: Text;
  order: number;
  section: number;
  unit: number;
  category?: string;
  level?: string;
  isActive?: boolean;
  questionIds?: Types.ObjectId[];
};
type Facet<T> = { items: T[]; count: Array<{ value: number }> };
type Issue = {
  code: string;
  severity: 'warning' | 'critical';
  label: string;
  evidence: string;
};

function issue(
  code: string,
  severity: Issue['severity'],
  label: string,
  evidence: string,
): Issue {
  return { code, severity, label, evidence };
}

function positiveInt(
  value: string | undefined,
  name: string,
  fallback?: number,
) {
  if (value === undefined || value === '') {
    if (fallback !== undefined) return fallback;
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  if (!/^\d+$/.test(value)) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 1 || number > 100_000) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  return number;
}

function locationInt(value: string | undefined, name: string) {
  if (value === undefined || !/^\d+$/.test(value)) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number > 999) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  return number;
}

function title(text?: Text) {
  return text?.uz || text?.en || text?.ko || text?.ru || '';
}

function category(value?: string) {
  return value || 'vocabulary';
}

function key(id: Types.ObjectId) {
  return String(id);
}

@Injectable()
export class AdminContentPathService {
  constructor(
    @InjectModel(LessonNode.name)
    private readonly nodes: Model<LessonNodeDocument>,
    @InjectModel(Lesson.name)
    private readonly lessons: Model<LessonDocument>,
    @InjectModel(Question.name)
    private readonly questions: Model<QuestionDocument>,
  ) {}

  async overview() {
    const [nodeGroups, lessonGroups] = await Promise.all([
      this.nodes
        .aggregate<GroupRow>([
          {
            $group: {
              _id: {
                section: '$section',
                unit: '$unit',
                category: { $ifNull: ['$category', 'vocabulary'] },
              },
              nodeCount: { $sum: 1 },
              activeNodeCount: {
                $sum: { $cond: [{ $ne: ['$isActive', false] }, 1, 0] },
              },
            },
          },
        ])
        .exec(),
      this.lessons
        .aggregate<GroupRow>([
          {
            $lookup: {
              from: this.nodes.collection.name,
              localField: 'nodeId',
              foreignField: '_id',
              as: '_node',
            },
          },
          { $addFields: { _pathNode: { $arrayElemAt: ['$_node', 0] } } },
          {
            $group: {
              _id: {
                section: { $ifNull: ['$_pathNode.section', '$section'] },
                unit: { $ifNull: ['$_pathNode.unit', '$unit'] },
                category: {
                  $cond: [
                    { $ifNull: ['$_pathNode._id', false] },
                    { $ifNull: ['$_pathNode.category', 'vocabulary'] },
                    { $ifNull: ['$category', 'vocabulary'] },
                  ],
                },
              },
              lessonCount: { $sum: 1 },
              activeLessonCount: {
                $sum: { $cond: [{ $ne: ['$isActive', false] }, 1, 0] },
              },
            },
          },
        ])
        .exec(),
    ]);
    const groups = new Map<string, Required<GroupRow>>();
    for (const row of [...nodeGroups, ...lessonGroups]) {
      if (!Number.isFinite(row._id.section) || !Number.isFinite(row._id.unit))
        continue;
      const normalized = {
        section: row._id.section,
        unit: row._id.unit,
        category: category(row._id.category),
      };
      const groupKey = `${normalized.section}:${normalized.unit}:${normalized.category}`;
      const group = groups.get(groupKey) ?? {
        _id: normalized,
        nodeCount: 0,
        activeNodeCount: 0,
        lessonCount: 0,
        activeLessonCount: 0,
      };
      group.nodeCount += row.nodeCount ?? 0;
      group.activeNodeCount += row.activeNodeCount ?? 0;
      group.lessonCount += row.lessonCount ?? 0;
      group.activeLessonCount += row.activeLessonCount ?? 0;
      groups.set(groupKey, group);
    }
    type Unit = {
      section: number;
      unit: number;
      nodeCount: number;
      lessonCount: number;
      activeNodeCount: number;
      activeLessonCount: number;
      tracks: Array<{
        category: string;
        nodeCount: number;
        lessonCount: number;
      }>;
    };
    const units = new Map<string, Unit>();
    for (const group of groups.values()) {
      const { section, unit, category: track } = group._id;
      const unitKey = `${section}:${unit}`;
      const item = units.get(unitKey) ?? {
        section,
        unit,
        nodeCount: 0,
        lessonCount: 0,
        activeNodeCount: 0,
        activeLessonCount: 0,
        tracks: [],
      };
      item.nodeCount += group.nodeCount;
      item.lessonCount += group.lessonCount;
      item.activeNodeCount += group.activeNodeCount;
      item.activeLessonCount += group.activeLessonCount;
      item.tracks.push({
        category: track,
        nodeCount: group.nodeCount,
        lessonCount: group.lessonCount,
      });
      units.set(unitKey, item);
    }
    const sections = new Map<
      number,
      {
        section: number;
        unitCount: number;
        nodeCount: number;
        lessonCount: number;
        units: Unit[];
      }
    >();
    for (const item of units.values()) {
      item.tracks.sort((a, b) => a.category.localeCompare(b.category));
      const section = sections.get(item.section) ?? {
        section: item.section,
        unitCount: 0,
        nodeCount: 0,
        lessonCount: 0,
        units: [],
      };
      section.unitCount++;
      section.nodeCount += item.nodeCount;
      section.lessonCount += item.lessonCount;
      section.units.push(item);
      sections.set(item.section, section);
    }
    const result = [...sections.values()].sort((a, b) => a.section - b.section);
    for (const section of result) {
      section.units.sort((a, b) => a.unit - b.unit);
    }
    return {
      sections: result,
      totals: {
        sections: result.length,
        units: units.size,
        nodes: result.reduce((sum, section) => sum + section.nodeCount, 0),
        lessons: result.reduce((sum, section) => sum + section.lessonCount, 0),
      },
    };
  }

  async unit(query: UnitQuery) {
    const section = locationInt(query.section, 'section');
    const unit = locationInt(query.unit, 'unit');
    const page = positiveInt(query.page, 'page', 1);
    const pageSize = positiveInt(query.pageSize, 'pagesize', DEFAULT_PAGE_SIZE);
    const orphanPage = positiveInt(query.orphanPage, 'orphanpage', 1);
    if (pageSize > MAX_PAGE_SIZE) {
      throw new BadRequestException('INVALID_PAGESIZE');
    }
    const [nodeFacet] = await this.nodes
      .aggregate<Facet<NodeRow>>([
        { $match: { section, unit } },
        {
          $facet: {
            items: [
              { $sort: { category: 1, order: 1, _id: 1 } },
              { $skip: (page - 1) * pageSize },
              { $limit: pageSize },
            ],
            count: [{ $count: 'value' }],
          },
        },
      ])
      .exec();
    const nodes = nodeFacet?.items ?? [];
    const nodeIds = nodes.map((node) => node._id);
    const refIds = nodes.flatMap((node) => node.lessonIds ?? []);
    const [orphanFacet] = await this.lessons
      .aggregate<Facet<LessonRow>>([
        { $match: { section, unit } },
        {
          $lookup: {
            from: this.nodes.collection.name,
            localField: 'nodeId',
            foreignField: '_id',
            as: '_node',
          },
        },
        { $match: { _node: { $size: 0 } } },
        {
          $facet: {
            items: [
              { $sort: { category: 1, order: 1, _id: 1 } },
              { $skip: (orphanPage - 1) * ORPHAN_PAGE_SIZE },
              { $limit: ORPHAN_PAGE_SIZE },
            ],
            count: [{ $count: 'value' }],
          },
        },
      ])
      .exec();
    const orphanRows = orphanFacet?.items ?? [];
    const linkedRows = nodeIds.length
      ? await this.lessons
          .aggregate<LessonRow>([
            {
              $match: {
                $or: [{ _id: { $in: refIds } }, { nodeId: { $in: nodeIds } }],
              },
            },
          ])
          .exec()
      : [];
    const allLessons = [...linkedRows, ...orphanRows];
    const questionIds = [
      ...new Set(
        allLessons.flatMap((lesson) => (lesson.questionIds ?? []).map(key)),
      ),
    ]
      .filter((id) => /^[0-9a-fA-F]{24}$/.test(id))
      .map((id) => new Types.ObjectId(id));
    const existingQuestions = questionIds.length
      ? await this.questions
          .aggregate<{
            _id: Types.ObjectId;
          }>([
            { $match: { _id: { $in: questionIds } } },
            { $project: { _id: 1 } },
          ])
          .exec()
      : [];
    const existingQuestionIds = new Set(
      existingQuestions.map((question) => key(question._id)),
    );
    const byId = new Map(linkedRows.map((lesson) => [key(lesson._id), lesson]));
    const byNode = new Map<string, LessonRow[]>();
    for (const lesson of linkedRows) {
      const nodeKey = key(lesson.nodeId);
      const list = byNode.get(nodeKey) ?? [];
      list.push(lesson);
      byNode.set(nodeKey, list);
    }
    const duplicateNodeOrders = await this.nodes
      .aggregate<{ _id: { category: string; order: number }; count: number }>([
        { $match: { section, unit, isActive: { $ne: false } } },
        {
          $group: {
            _id: {
              category: { $ifNull: ['$category', 'vocabulary'] },
              order: '$order',
            },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
      ])
      .exec();
    const duplicateOrderKeys = new Set(
      duplicateNodeOrders.map((row) => `${row._id.category}:${row._id.order}`),
    );
    const presentLesson = (lesson: LessonRow, extraIssues: Issue[] = []) => {
      const declared = lesson.questionIds ?? [];
      const actual = new Set(
        declared.filter((id) => existingQuestionIds.has(key(id))).map(key),
      );
      const missing = declared.filter(
        (id) => !existingQuestionIds.has(key(id)),
      );
      const issues = [...extraIssues];
      if (lesson.isActive !== false && actual.size === 0) {
        issues.push(
          issue(
            'empty_active_lesson',
            'critical',
            '활성 레슨에 문제 없음',
            '실제 존재하는 문제 문서가 0개입니다.',
          ),
        );
      }
      if (lesson.isActive !== false && missing.length > 0) {
        issues.push(
          issue(
            'missing_question_refs',
            'critical',
            '문제 참조 누락',
            `questionIds ${declared.length}개 중 ${missing.length}개에 해당하는 Question 문서가 없습니다.`,
          ),
        );
      }
      const duplicateQuestionRefs =
        declared.length - new Set(declared.map(key)).size;
      if (lesson.isActive !== false && duplicateQuestionRefs > 0) {
        issues.push(
          issue(
            'duplicate_question_refs',
            'warning',
            '문제 참조 중복',
            `questionIds에서 같은 Question ID가 ${duplicateQuestionRefs}회 반복됩니다.`,
          ),
        );
      }
      return {
        id: key(lesson._id),
        code: lesson.code ?? null,
        title: title(lesson.title),
        order: lesson.order ?? 0,
        category: category(lesson.category),
        level: lesson.level ?? '',
        isActive: lesson.isActive !== false,
        questionCount: actual.size,
        declaredQuestionCount: declared.length,
        issues,
      };
    };
    const items = nodes.map((node) => {
      const id = key(node._id);
      const referenced = node.lessonIds ?? [];
      const seen = new Set<string>();
      const nodeIssues: Issue[] = [];
      const lessonItems: ReturnType<typeof presentLesson>[] = [];
      let missingRefs = 0;
      let wrongNodeRefs = 0;
      let duplicateRefs = 0;
      const locationIssues = (lesson: LessonRow): Issue[] =>
        lesson.isActive !== false &&
        (lesson.section !== node.section || lesson.unit !== node.unit)
          ? [
              issue(
                'lesson_location_mismatch',
                'warning',
                '레슨 위치 정보 불일치',
                `Lesson.section/unit=${lesson.section}/${lesson.unit}, Node.section/unit=${node.section}/${node.unit}입니다.`,
              ),
            ]
          : [];
      for (const ref of referenced) {
        const refId = key(ref);
        if (seen.has(refId)) {
          duplicateRefs++;
          continue;
        }
        seen.add(refId);
        const lesson = byId.get(refId);
        if (!lesson) {
          missingRefs++;
          continue;
        }
        const belongsHere = key(lesson.nodeId) === id;
        if (!belongsHere) wrongNodeRefs++;
        lessonItems.push(
          presentLesson(
            lesson,
            belongsHere
              ? locationIssues(lesson)
              : [
                  issue(
                    'wrong_node_reference',
                    'critical',
                    '다른 노드의 레슨 참조',
                    `Lesson.nodeId=${key(lesson.nodeId)}로 현재 Node.id=${id}와 다릅니다.`,
                  ),
                ],
          ),
        );
      }
      const unlisted = (byNode.get(id) ?? [])
        .filter((lesson) => !seen.has(key(lesson._id)))
        .sort(
          (a, b) => a.order - b.order || key(a._id).localeCompare(key(b._id)),
        );
      for (const lesson of unlisted) {
        lessonItems.push(
          presentLesson(lesson, [
            ...locationIssues(lesson),
            issue(
              'not_listed_in_node',
              'critical',
              '노드 레슨 목록에서 누락',
              'Lesson.nodeId는 이 노드를 가리키지만 Node.lessonIds에는 없습니다.',
            ),
          ]),
        );
      }
      if (node.isActive !== false) {
        if (
          node.nodeType !== 'chest' &&
          node.nodeType !== 'boss' &&
          (byNode.get(id) ?? []).length === 0
        ) {
          nodeIssues.push(
            issue(
              'empty_lesson_node',
              'critical',
              '활성 학습 노드에 레슨 없음',
              '이 노드에 연결된 Lesson.nodeId 문서가 없습니다. Chest/Boss 노드는 제외합니다.',
            ),
          );
        }
        if (missingRefs)
          nodeIssues.push(
            issue(
              'missing_lesson_refs',
              'critical',
              '레슨 참조 누락',
              `Node.lessonIds 중 ${missingRefs}개에 해당하는 Lesson 문서가 없습니다.`,
            ),
          );
        if (wrongNodeRefs)
          nodeIssues.push(
            issue(
              'wrong_node_refs',
              'critical',
              '다른 노드의 레슨 참조',
              `Node.lessonIds 중 ${wrongNodeRefs}개의 Lesson.nodeId가 다른 노드를 가리킵니다.`,
            ),
          );
        if (duplicateRefs)
          nodeIssues.push(
            issue(
              'duplicate_lesson_refs',
              'warning',
              '중복 레슨 참조',
              `Node.lessonIds에서 같은 Lesson ID가 ${duplicateRefs}회 반복됩니다.`,
            ),
          );
        if (
          duplicateOrderKeys.has(`${category(node.category)}:${node.order}`)
        ) {
          nodeIssues.push(
            issue(
              'duplicate_node_order',
              'warning',
              '노드 순서 중복',
              `같은 유닛·트랙(${category(node.category)})의 활성 노드에 order=${node.order}가 중복됩니다.`,
            ),
          );
        }
      }
      const orderCounts = new Map<number, number>();
      const ownLessonIds = new Set(
        (byNode.get(id) ?? []).map((lesson) => key(lesson._id)),
      );
      for (const lesson of byNode.get(id) ?? []) {
        if (lesson.isActive !== false)
          orderCounts.set(
            lesson.order,
            (orderCounts.get(lesson.order) ?? 0) + 1,
          );
      }
      for (const lesson of lessonItems) {
        if (
          lesson.isActive &&
          ownLessonIds.has(lesson.id) &&
          (orderCounts.get(lesson.order) ?? 0) > 1
        ) {
          lesson.issues.push(
            issue(
              'duplicate_lesson_order',
              'warning',
              '레슨 순서 중복',
              `같은 노드의 활성 레슨에서 order=${lesson.order}가 중복됩니다.`,
            ),
          );
        }
      }
      return {
        id,
        code: node.code ?? null,
        title: title(node.title),
        order: node.order,
        nodeType: node.nodeType ?? 'lesson',
        category: category(node.category),
        isActive: node.isActive !== false,
        lessonCount: (byNode.get(id) ?? []).length,
        issues: nodeIssues,
        lessons: lessonItems,
      };
    });
    const orphanLessons = orphanRows.map((lesson) => ({
      ...presentLesson(
        lesson,
        lesson.isActive === false
          ? []
          : [
              issue(
                'missing_node',
                'critical',
                '학습 노드 누락',
                `Lesson.nodeId=${key(lesson.nodeId)}에 해당하는 Node 문서가 없습니다.`,
              ),
            ],
      ),
      nodeId: key(lesson.nodeId),
    }));
    return {
      section,
      unit,
      items,
      total: nodeFacet?.count?.[0]?.value ?? 0,
      page,
      pageSize,
      orphanLessons,
      orphanTotal: orphanFacet?.count?.[0]?.value ?? 0,
      orphanPage,
      orphanPageSize: ORPHAN_PAGE_SIZE,
    };
  }
}
