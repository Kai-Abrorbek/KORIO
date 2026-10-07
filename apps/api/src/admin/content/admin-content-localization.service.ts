import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import {
  LessonNode,
  LessonNodeDocument,
} from '../../lessons/schemas/node.schema';
import { Lesson, LessonDocument } from '../../lessons/schemas/lesson.schema';
import {
  Question,
  QuestionDocument,
} from '../../lessons/schemas/question.schema';
import { Grammar, GrammarDocument } from '../../grammer/schemas/grammar.schema';
import {
  ExpressionPack,
  ExpressionPackDocument,
} from '../../expressions/schemas/expression-pack.schema';
import {
  ExpressionNode,
  ExpressionNodeDocument,
} from '../../expressions/schemas/expression-node.schema';
import {
  Expression,
  ExpressionDocument,
} from '../../expressions/schemas/expression.schema';

const ENTITIES = [
  'node',
  'lesson',
  'question',
  'grammar',
  'expressionPack',
  'expressionNode',
  'expression',
] as const;
type Entity = (typeof ENTITIES)[number];
type Language = 'uz' | 'en' | 'ru';
type Status = 'missing' | 'complete' | 'all';
type Query = {
  page?: string;
  pageSize?: string;
  entity?: string;
  language?: string;
  status?: string;
};
type FieldRule = { field: string; required: boolean };
type Missing = { field: string; language: Language; reason: string };
type Raw = Record<string, unknown> & {
  missing?: Missing[];
  checkedFieldCount?: number;
  lessons?: Raw[];
  nodes?: Raw[];
  node?: Raw[];
  expressions?: Raw[];
};
type Location = {
  section: number | null;
  unit: number | null;
  node: {
    id: string;
    code: string | null;
    title: string;
    order: number | null;
  } | null;
  lesson: {
    id: string;
    code: string | null;
    title: string;
    order: number | null;
  } | null;
  question: { id: string; code: string | null } | null;
};

// Optional fields are checked only when at least one learner-language value exists.
// A Korean-only source sentence/answer is intentional and must not be reported as
// a missing Uzbek/English/Russian translation.
const FIELDS: Record<Entity, FieldRule[]> = {
  node: [{ field: 'title', required: true }],
  lesson: [
    { field: 'title', required: true },
    { field: 'description', required: false },
  ],
  question: [
    { field: 'instruction', required: true },
    { field: 'hint', required: false },
    { field: 'explanation', required: false },
    { field: 'answerTranslation', required: false },
    { field: 'npcTextI18n', required: false },
  ],
  grammar: [
    { field: 'summary', required: true },
    { field: 'explanation', required: false },
    { field: 'conjugationRule', required: false },
  ],
  expressionPack: [
    { field: 'title', required: true },
    { field: 'description', required: false },
  ],
  expressionNode: [
    { field: 'title', required: true },
    { field: 'description', required: false },
  ],
  expression: [
    { field: 'meaning', required: true },
    { field: 'context', required: true },
    { field: 'speaker', required: false },
    { field: 'usageNote', required: false },
  ],
};

function positiveInt(value: string | undefined, fallback: number, max: number) {
  if (value === undefined || value === '') return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > max)
    throw new BadRequestException('INVALID_PAGINATION');
  return parsed;
}

function nonEmpty(path: string) {
  return {
    $ne: [
      {
        $trim: {
          input: {
            $convert: {
              input: `$${path}`,
              to: 'string',
              onError: '',
              onNull: '',
            },
          },
        },
      },
      '',
    ],
  };
}

function issueFields(entity: Entity, languages: Language[]): PipelineStage[] {
  const missing = FIELDS[entity].flatMap(({ field, required }) => {
    const applicable = required
      ? true
      : {
          $or: (['uz', 'en', 'ru'] as const).map((lang) =>
            nonEmpty(`${field}.${lang}`),
          ),
        };
    return languages.map((language) => ({
      $cond: [
        { $and: [applicable, { $not: [nonEmpty(`${field}.${language}`)] }] },
        [
          {
            field,
            language,
            reason: required
              ? '필수 번역이 비어 있습니다.'
              : '다른 학습자 언어에는 내용이 있지만 이 번역이 비어 있습니다.',
          },
        ],
        [],
      ],
    }));
  });
  const checked = FIELDS[entity].map(({ field, required }) =>
    required
      ? languages.length
      : {
          $cond: [
            {
              $or: (['uz', 'en', 'ru'] as const).map((lang) =>
                nonEmpty(`${field}.${lang}`),
              ),
            },
            languages.length,
            0,
          ],
        },
  );
  return [
    {
      $addFields: {
        missing: { $concatArrays: missing },
        checkedFieldCount: { $add: checked },
      },
    },
    { $addFields: { missingCount: { $size: '$missing' } } },
  ];
}

function string(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function id(value: unknown): string {
  if (value instanceof Types.ObjectId) return value.toHexString();
  return typeof value === 'string' ? value : '';
}

function number(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function object(value: unknown): Raw {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Raw)
    : {};
}

function array(value: unknown): Raw[] {
  return Array.isArray(value) ? (value as Raw[]) : [];
}

function preview(value: unknown): string {
  const text = object(value);
  return (
    (['ko', 'uz', 'en', 'ru'] as const)
      .map((language) => string(text[language]).trim())
      .find(Boolean) ?? ''
  );
}

function part(value: Raw | null): Location['node'] {
  if (!value) return null;
  return {
    id: id(value._id),
    code: string(value.code) || null,
    title: preview(value.title),
    order: number(value.order),
  };
}

@Injectable()
export class AdminContentLocalizationService {
  constructor(
    @InjectModel(LessonNode.name)
    private readonly nodes: Model<LessonNodeDocument>,
    @InjectModel(Lesson.name) private readonly lessons: Model<LessonDocument>,
    @InjectModel(Question.name)
    private readonly questions: Model<QuestionDocument>,
    @InjectModel(Grammar.name) private readonly grammar: Model<GrammarDocument>,
    @InjectModel(ExpressionPack.name)
    private readonly packs: Model<ExpressionPackDocument>,
    @InjectModel(ExpressionNode.name)
    private readonly expressionNodes: Model<ExpressionNodeDocument>,
    @InjectModel(Expression.name)
    private readonly expressions: Model<ExpressionDocument>,
  ) {}

  async list(query: Query) {
    const page = positiveInt(query.page, 1, 1_000_000);
    const pageSize = positiveInt(query.pageSize, 20, 50);
    const entity = query.entity || 'all';
    const language = query.language || 'all';
    const status = (query.status || 'missing') as Status;
    if (entity !== 'all' && !ENTITIES.includes(entity as Entity))
      throw new BadRequestException('INVALID_ENTITY');
    if (!['all', 'uz', 'en', 'ru'].includes(language))
      throw new BadRequestException('INVALID_LANGUAGE');
    if (!['all', 'missing', 'complete'].includes(status))
      throw new BadRequestException('INVALID_STATUS');
    const languages: Language[] =
      language === 'all' ? ['uz', 'en', 'ru'] : [language as Language];
    const selected: Entity[] =
      entity === 'all' ? [...ENTITIES] : [entity as Entity];
    const counts = await Promise.all(
      selected.map(async (kind) => {
        const rows = await this.model(kind)
          .aggregate<{ total: number }>([
            ...issueFields(kind, languages),
            ...this.statusMatch(status),
            { $count: 'total' },
          ])
          .exec();
        return rows[0]?.total ?? 0;
      }),
    );
    const total = counts.reduce((sum, count) => sum + count, 0);
    let skip = (page - 1) * pageSize;
    let remaining = pageSize;
    const items: ReturnType<AdminContentLocalizationService['present']>[] = [];
    for (let index = 0; index < selected.length && remaining > 0; index++) {
      const count = counts[index];
      if (skip >= count) {
        skip -= count;
        continue;
      }
      const kind = selected[index];
      const rows = await this.model(kind)
        .aggregate<Raw>([
          ...issueFields(kind, languages),
          ...this.statusMatch(status),
          { $sort: { code: 1, _id: 1 } },
          { $skip: skip },
          { $limit: remaining },
          ...this.locationLookups(kind),
        ])
        .exec();
      items.push(...rows.map((row) => this.present(kind, row)));
      remaining -= rows.length;
      skip = 0;
    }
    return { page, pageSize, total, items };
  }

  private model(kind: Entity): Model<unknown> {
    const models = {
      node: this.nodes,
      lesson: this.lessons,
      question: this.questions,
      grammar: this.grammar,
      expressionPack: this.packs,
      expressionNode: this.expressionNodes,
      expression: this.expressions,
    };
    return models[kind] as unknown as Model<unknown>;
  }

  private statusMatch(status: Status): PipelineStage[] {
    if (status === 'all') return [];
    return [
      { $match: { missingCount: status === 'missing' ? { $gt: 0 } : 0 } },
    ];
  }

  private locationLookups(kind: Entity): PipelineStage[] {
    if (kind === 'question')
      return [
        {
          $lookup: {
            from: this.lessons.collection.name,
            localField: '_id',
            foreignField: 'questionIds',
            as: 'lessons',
          },
        },
        {
          $lookup: {
            from: this.nodes.collection.name,
            localField: 'lessons.nodeId',
            foreignField: '_id',
            as: 'nodes',
          },
        },
      ];
    if (kind === 'lesson')
      return [
        {
          $lookup: {
            from: this.nodes.collection.name,
            localField: 'nodeId',
            foreignField: '_id',
            as: 'node',
          },
        },
      ];
    if (kind === 'grammar')
      return [
        {
          $lookup: {
            from: this.lessons.collection.name,
            localField: 'code',
            foreignField: 'grammarCode',
            as: 'lessons',
          },
        },
        {
          $lookup: {
            from: this.nodes.collection.name,
            localField: 'lessons.nodeId',
            foreignField: '_id',
            as: 'nodes',
          },
        },
      ];
    if (kind === 'expression')
      return [
        {
          $lookup: {
            from: this.expressionNodes.collection.name,
            localField: 'nodeId',
            foreignField: '_id',
            as: 'node',
          },
        },
      ];
    if (kind === 'expressionNode')
      return [
        {
          $lookup: {
            from: this.expressions.collection.name,
            let: { nodeId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$nodeId', '$$nodeId'] } } },
              { $project: { placements: 1 } },
            ],
            as: 'expressions',
          },
        },
      ];
    return [];
  }

  private present(kind: Entity, row: Raw) {
    const locations = this.locations(kind, row);
    const missing = array(row.missing).map((item) => ({
      field: string(item.field),
      language: item.language as Language,
      reason: string(item.reason),
    }));
    const label =
      kind === 'question'
        ? preview(row.instruction)
        : kind === 'grammar'
          ? string(row.pattern)
          : kind === 'expression'
            ? string(row.korean)
            : preview(row.title);
    return {
      id: id(row._id),
      entity: kind,
      code: string(row.code) || null,
      label,
      active: row.isActive !== false,
      location: locations[0] ?? null,
      locations,
      missing,
      missingCount: missing.length,
      checkedFieldCount: number(row.checkedFieldCount) ?? 0,
      status: missing.length ? ('missing' as const) : ('complete' as const),
    };
  }

  private locations(kind: Entity, row: Raw): Location[] {
    const simple = (
      section: unknown,
      unit: unknown,
      node: Raw | null,
      lesson: Raw | null,
      question: Raw | null,
    ): Location => ({
      section: number(section),
      unit: number(unit),
      node: part(node),
      lesson: lesson ? part(lesson) : null,
      question: question
        ? { id: id(question._id), code: string(question.code) || null }
        : null,
    });
    if (kind === 'node')
      return [simple(row.section, row.unit, row, null, null)];
    if (kind === 'lesson') {
      const node = array(row.node)[0] ?? null;
      return [
        simple(
          node?.section ?? row.section,
          node?.unit ?? row.unit,
          node,
          row,
          null,
        ),
      ];
    }
    if (kind === 'question') {
      const nodes = array(row.nodes);
      return array(row.lessons).map((lesson) => {
        const node =
          nodes.find((candidate) => id(candidate._id) === id(lesson.nodeId)) ??
          null;
        return simple(
          node?.section ?? lesson.section,
          node?.unit ?? lesson.unit,
          node,
          lesson,
          row,
        );
      });
    }
    if (kind === 'grammar') {
      const nodes = array(row.nodes);
      const grammarLessons = array(row.lessons);
      if (!grammarLessons.length)
        return [simple(row.section, row.unit, null, null, null)];
      return grammarLessons.map((lesson) => {
        const node =
          nodes.find((candidate) => id(candidate._id) === id(lesson.nodeId)) ??
          null;
        return simple(
          node?.section ?? lesson.section ?? row.section,
          node?.unit ?? lesson.unit ?? row.unit,
          node,
          lesson,
          null,
        );
      });
    }
    if (kind === 'expression') {
      const node = array(row.node)[0] ?? null;
      const placements = array(row.placements);
      return placements.map((placement) =>
        simple(placement.section, placement.unit, node, null, null),
      );
    }
    if (kind === 'expressionNode') {
      const seen = new Set<string>();
      const locations = array(row.expressions)
        .flatMap((expression) => array(expression.placements))
        .map((placement) =>
          simple(placement.section, placement.unit, row, null, null),
        )
        .filter((location) => {
          const key = `${location.section}/${location.unit}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      return locations.length
        ? locations
        : [simple(null, null, row, null, null)];
    }
    return [];
  }
}
