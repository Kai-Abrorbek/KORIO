import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import {
  Question,
  QuestionDocument,
  QuestionType,
} from '../../lessons/schemas/question.schema';
import { Lesson, LessonDocument } from '../../lessons/schemas/lesson.schema';
import {
  LessonNode,
  LessonNodeDocument,
} from '../../lessons/schemas/node.schema';
import {
  QuestionAttempt,
  QuestionAttemptDocument,
} from '../../analytics/schemas/question-attempt.schema';

const WINDOW_DAYS = 30;
const MIN_SIGNAL_ANSWERS = 20;
const LOW_CORRECT_RATE = 0.3;
const MAX_PAGE_SIZE = 50;

type Query = {
  page?: string;
  pageSize?: string;
  search?: string;
  section?: string;
  unit?: string;
  type?: string;
  active?: string;
  onlyIssues?: string;
};

type LocationLesson = Partial<Lesson> & {
  _id: Types.ObjectId;
  nodeId: Types.ObjectId;
};
type LocationNode = Partial<LessonNode> & { _id: Types.ObjectId };
type AttemptSummary = {
  attempts: number;
  answered: number;
  correct: number;
  skipped: number;
  avgDurationMs: number | null;
};
type IssueFlag =
  | 'unlinked'
  | 'missingNode'
  | 'missingInstruction'
  | 'readingShape'
  | 'errorHuntShape'
  | 'clozeShape'
  | 'dialogShape'
  | 'verbShape'
  | 'lowCorrectRate';
type QuestionRow = Partial<Question> & {
  _id: Types.ObjectId;
  lessons?: LocationLesson[];
  nodes?: LocationNode[];
  _flags?: Partial<Record<IssueFlag, boolean>>;
  _metrics?: Partial<AttemptSummary>;
};

function numberFilter(value: string | undefined, name: string) {
  if (value === undefined || value === '') return undefined;
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > 999) {
    throw new BadRequestException(`INVALID_${name.toUpperCase()}`);
  }
  return number;
}

function trimmed(path: string) {
  return { $trim: { input: { $ifNull: [path, ''] } } };
}

function blank(path: string) {
  return { $eq: [trimmed(path), ''] };
}

function length(path: string) {
  return { $size: { $ifNull: [path, []] } };
}

function issueFlags() {
  const active = { $ne: ['$isActive', false] };
  const missingInstruction = {
    $and: [blank('$instruction.uz'), blank('$instruction.en')],
  };
  const missingNode = {
    $gt: [
      {
        $size: {
          $setDifference: [
            {
              $map: {
                input: '$lessons',
                as: 'lesson',
                in: '$$lesson.nodeId',
              },
            },
            '$nodes._id',
          ],
        },
      },
      0,
    ],
  };
  const readingShape = {
    $and: [
      { $eq: ['$type', QuestionType.READING_QUIZ] },
      {
        $or: [
          blank('$passage'),
          { $lt: [length('$options'), 3] },
          blank('$answer'),
          { $not: [{ $in: ['$answer', { $ifNull: ['$options', []] }] }] },
        ],
      },
    ],
  };
  const errorHuntShape = {
    $and: [
      { $eq: ['$type', QuestionType.ERROR_HUNT] },
      {
        $or: [
          blank('$npcText'),
          blank('$wrongWord'),
          {
            $not: [
              {
                $in: [
                  '$wrongWord',
                  { $split: [{ $ifNull: ['$npcText', ''] }, ' '] },
                ],
              },
            ],
          },
          { $lt: [length('$options'), 2] },
          blank('$answer'),
          { $not: [{ $in: ['$answer', { $ifNull: ['$options', []] }] }] },
        ],
      },
    ],
  };
  const clozeShape = {
    $and: [
      { $eq: ['$type', QuestionType.CLOZE_PASSAGE] },
      {
        $or: [
          blank('$passage'),
          {
            $lt: [
              {
                $size: {
                  $split: [{ $ifNull: ['$passage', ''] }, '___'],
                },
              },
              2,
            ],
          },
          {
            $ne: [
              {
                $subtract: [
                  {
                    $size: {
                      $split: [{ $ifNull: ['$passage', ''] }, '___'],
                    },
                  },
                  1,
                ],
              },
              length('$blankAnswers'),
            ],
          },
          {
            $not: [
              {
                $setIsSubset: [
                  { $ifNull: ['$blankAnswers', []] },
                  { $ifNull: ['$options', []] },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const dialogShape = {
    $and: [
      { $eq: ['$type', QuestionType.DIALOG_ORDER] },
      {
        $or: [
          { $lt: [length('$dialogLines'), 3] },
          { $ne: ['$answer', 'all_correct'] },
        ],
      },
    ],
  };
  const verbShape = {
    $and: [
      { $eq: ['$type', QuestionType.VERB_TRANSFORM] },
      {
        $or: [blank('$baseWord'), blank('$targetForm'), blank('$answer')],
      },
    ],
  };
  const lowCorrectRate = {
    $cond: [
      { $gte: ['$_metrics.answered', MIN_SIGNAL_ANSWERS] },
      {
        $lte: [
          { $divide: ['$_metrics.correct', '$_metrics.answered'] },
          LOW_CORRECT_RATE,
        ],
      },
      false,
    ],
  };
  return {
    unlinked: { $and: [active, { $eq: [length('$lessons'), 0] }] },
    missingNode: { $and: [active, missingNode] },
    missingInstruction: { $and: [active, missingInstruction] },
    readingShape: { $and: [active, readingShape] },
    errorHuntShape: { $and: [active, errorHuntShape] },
    clozeShape: { $and: [active, clozeShape] },
    dialogShape: { $and: [active, dialogShape] },
    verbShape: { $and: [active, verbShape] },
    lowCorrectRate: { $and: [active, lowCorrectRate] },
  };
}

function issue(
  code: string,
  severity: 'warning' | 'critical',
  kind: 'structural' | 'signal',
  label: string,
  evidence: string,
) {
  return { code, severity, kind, label, evidence };
}

function diagnostics(row: QuestionRow) {
  const flags = row._flags ?? {};
  const issues: ReturnType<typeof issue>[] = [];
  if (flags.unlinked) {
    issues.push(
      issue(
        'unlinked',
        'warning',
        'structural',
        '레슨 연결 확인',
        '현재 어떤 레슨의 questionIds에도 연결되지 않았습니다. 의도적인 문제 풀 구성인지 확인하세요.',
      ),
    );
  }
  if (flags.missingNode) {
    issues.push(
      issue(
        'missing_node',
        'critical',
        'structural',
        '학습 노드 누락',
        '연결된 레슨의 nodeId에 해당하는 학습 노드를 찾을 수 없습니다.',
      ),
    );
  }
  if (flags.missingInstruction) {
    issues.push(
      issue(
        'missing_instruction',
        'warning',
        'structural',
        '지시문 확인',
        '우즈벡어·영어 지시문이 모두 비어 있습니다. 해당 언어의 표시와 폴백을 확인하세요.',
      ),
    );
  }
  if (flags.readingShape) {
    issues.push(
      issue(
        'reading_shape',
        'critical',
        'structural',
        '읽기 문제 구성 확인',
        `지문 ${row.passage ? '있음' : '없음'} · 보기 ${(row.options ?? []).length}개 · 정답이 보기 안에 ${(row.options ?? []).includes(row.answer ?? '') ? '있음' : '없음'}`,
      ),
    );
  }
  if (flags.errorHuntShape) {
    issues.push(
      issue(
        'error_hunt_shape',
        'critical',
        'structural',
        '오류 찾기 구성 확인',
        `오류 어절 '${row.wrongWord || '(없음)'}' · 문장 안 일치 ${(row.npcText ?? '').split(' ').includes(row.wrongWord ?? '') ? '예' : '아니오'} · 보기 ${(row.options ?? []).length}개 · 정답 포함 ${(row.options ?? []).includes(row.answer ?? '') ? '예' : '아니오'}`,
      ),
    );
  }
  if (flags.clozeShape) {
    const blanks = (row.passage?.match(/___/g) ?? []).length;
    const missingOptions = (row.blankAnswers ?? []).filter(
      (answer: string) => !(row.options ?? []).includes(answer),
    );
    issues.push(
      issue(
        'cloze_shape',
        'critical',
        'structural',
        '빈칸 문제 구성 확인',
        `지문 ${row.passage ? '있음' : '없음'} · 빈칸 ${blanks}개 · blankAnswers ${(row.blankAnswers ?? []).length}개 · 보기에서 누락된 정답 ${missingOptions.length}개`,
      ),
    );
  }
  if (flags.dialogShape) {
    issues.push(
      issue(
        'dialog_shape',
        'critical',
        'structural',
        '대화 순서 구성 확인',
        `대화 ${(row.dialogLines ?? []).length}줄 · answer=${row.answer || '(없음)'} (기대: all_correct)`,
      ),
    );
  }
  if (flags.verbShape) {
    const missing = [
      ['baseWord', row.baseWord],
      ['targetForm', row.targetForm],
      ['answer', row.answer],
    ]
      .filter(([, value]) => !String(value ?? '').trim())
      .map(([field]) => field);
    issues.push(
      issue(
        'verb_shape',
        'critical',
        'structural',
        '동사 변형 필드 누락',
        `누락: ${missing.join(', ')}`,
      ),
    );
  }
  if (flags.lowCorrectRate) {
    const answered = row._metrics?.answered ?? 0;
    const correct = row._metrics?.correct ?? 0;
    issues.push(
      issue(
        'low_correct_rate',
        'warning',
        'signal',
        '낮은 정답률 후보',
        `최근 ${WINDOW_DAYS}일 비건너뛰기 응답 ${answered}회 중 정답 ${correct}회 (${Math.round((correct / answered) * 1000) / 10}%). 문제 난이도 또는 정답 기준을 점검해 보세요.`,
      ),
    );
  }
  return issues;
}

function publicRow(row: QuestionRow, withDetail = false) {
  const nodes = new Map<string, LocationNode>(
    (row.nodes ?? []).map((node) => [String(node._id), node]),
  );
  const total = row._metrics?.attempts ?? 0;
  const answered = row._metrics?.answered ?? 0;
  const locations = (row.lessons ?? []).map((lesson) => {
    const node = nodes.get(String(lesson.nodeId));
    return {
      section: node?.section ?? lesson.section ?? null,
      unit: node?.unit ?? lesson.unit ?? null,
      node: node
        ? {
            id: String(node._id),
            code: node.code ?? null,
            title: node.title?.uz || node.title?.en || node.title?.ko || '',
            order: node.order ?? null,
            isActive: node.isActive !== false,
          }
        : null,
      lesson: {
        id: String(lesson._id),
        code: lesson.code ?? null,
        title: lesson.title?.uz || lesson.title?.en || lesson.title?.ko || '',
        order: lesson.order ?? null,
        isActive: lesson.isActive !== false,
      },
    };
  });
  const preview = String(
    row.instruction?.uz ||
      row.instruction?.en ||
      row.instruction?.ko ||
      row.npcText ||
      row.passage ||
      '',
  ).slice(0, 180);
  const result = {
    id: String(row._id),
    code: row.code ?? null,
    type: row.type ?? '',
    level: row.level ?? '',
    isActive: row.isActive !== false,
    preview,
    locations,
    issues: diagnostics(row),
    metrics: {
      windowDays: WINDOW_DAYS,
      sampleSize: total,
      answeredCount: answered,
      correctRate: answered
        ? Math.round(((row._metrics?.correct ?? 0) / answered) * 1000) / 10
        : null,
      skipRate: total
        ? Math.round(((row._metrics?.skipped ?? 0) / total) * 1000) / 10
        : null,
      avgDurationMs:
        row._metrics?.avgDurationMs == null
          ? null
          : Math.round(row._metrics.avgDurationMs),
    },
  };
  if (!withDetail) return result;
  return {
    ...result,
    detail: {
      instruction: row.instruction ?? {},
      answer: row.answer ?? '',
      answerI18n: row.answerI18n ?? {},
      answerTranslation: row.answerTranslation ?? {},
      acceptedAnswers: row.acceptedAnswers ?? [],
      grading: row.grading ?? null,
      options: row.options ?? [],
      optionsI18n: row.optionsI18n ?? {},
      choices: row.choices ?? [],
      npcText: row.npcText ?? '',
      npcTextI18n: row.npcTextI18n ?? {},
      sentencePrefix: row.sentencePrefix ?? '',
      sentenceSuffix: row.sentenceSuffix ?? '',
      sentenceTemplate: row.sentenceTemplate ?? '',
      blankAnswers: row.blankAnswers ?? [],
      dialogLines: row.dialogLines ?? [],
      pairs: row.pairs ?? [],
      passage: row.passage ?? '',
      passageTitle: row.passageTitle ?? '',
      wrongWord: row.wrongWord ?? '',
      baseWord: row.baseWord ?? '',
      targetForm: row.targetForm ?? '',
      buildRows: row.buildRows ?? [],
      audioText: row.audioText ?? '',
      audioUrl: row.audioUrl ?? '',
      imageUrl: row.imageUrl ?? '',
      hint: row.hint ?? {},
      explanation: row.explanation ?? {},
      tags: row.tags ?? [],
      difficulty: row.difficulty ?? null,
    },
  };
}

@Injectable()
export class AdminContentService {
  constructor(
    @InjectModel(Question.name)
    private readonly questions: Model<QuestionDocument>,
    @InjectModel(Lesson.name)
    private readonly lessons: Model<LessonDocument>,
    @InjectModel(LessonNode.name)
    private readonly nodes: Model<LessonNodeDocument>,
    @InjectModel(QuestionAttempt.name)
    private readonly attempts: Model<QuestionAttemptDocument>,
  ) {}

  private pipeline(
    match: Record<string, unknown>,
    location?: { section?: number; unit?: number },
  ): PipelineStage[] {
    const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000);
    const flags = issueFlags();
    const stages: PipelineStage[] = [
      { $match: match },
      {
        $lookup: {
          from: this.lessons.collection.name,
          localField: '_id',
          foreignField: 'questionIds',
          as: 'lessons',
        },
      },
    ];
    stages.push({
      $lookup: {
        from: this.nodes.collection.name,
        localField: 'lessons.nodeId',
        foreignField: '_id',
        as: 'nodes',
      },
    });
    if (location?.section !== undefined || location?.unit !== undefined) {
      const condition: Record<string, number> = {};
      if (location.section !== undefined) condition.section = location.section;
      if (location.unit !== undefined) condition.unit = location.unit;
      const fallbackMatches = Object.entries(condition).map(([key, value]) => ({
        $eq: [`$$lesson.${key}`, value],
      }));
      stages.push({
        $match: {
          $or: [
            { nodes: { $elemMatch: condition } },
            {
              $expr: {
                $anyElementTrue: {
                  $map: {
                    input: '$lessons',
                    as: 'lesson',
                    in: {
                      $and: [
                        {
                          $not: [{ $in: ['$$lesson.nodeId', '$nodes._id'] }],
                        },
                        ...fallbackMatches,
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
      });
    }
    stages.push(
      {
        $lookup: {
          from: this.attempts.collection.name,
          let: { question: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$questionId', '$$question'] },
                answeredAt: { $gte: since },
              },
            },
            {
              $group: {
                _id: null,
                attempts: { $sum: 1 },
                answered: {
                  $sum: { $cond: [{ $eq: ['$skipped', true] }, 0, 1] },
                },
                correct: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $eq: ['$isCorrect', true] },
                          { $ne: ['$skipped', true] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
                skipped: {
                  $sum: { $cond: [{ $eq: ['$skipped', true] }, 1, 0] },
                },
                avgDurationMs: {
                  $avg: {
                    $cond: [{ $gt: ['$durationMs', 0] }, '$durationMs', null],
                  },
                },
              },
            },
          ],
          as: '_attemptStats',
        },
      },
      {
        $addFields: {
          _metrics: {
            $ifNull: [
              { $arrayElemAt: ['$_attemptStats', 0] },
              {
                attempts: 0,
                answered: 0,
                correct: 0,
                skipped: 0,
                avgDurationMs: null,
              },
            ],
          },
        },
      },
      { $addFields: { _flags: flags } },
      {
        $addFields: {
          _flagged: { $or: Object.keys(flags).map((key) => `$_flags.${key}`) },
        },
      },
    );
    return stages;
  }

  async list(query: Query) {
    const page = Number(query.page ?? '1');
    const pageSize = Number(query.pageSize ?? '20');
    const search = query.search?.trim() ?? '';
    const section = numberFilter(query.section, 'section');
    const unit = numberFilter(query.unit, 'unit');
    const active = query.active ?? 'all';
    const onlyIssues = query.onlyIssues ?? 'false';
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > 100_000 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > MAX_PAGE_SIZE ||
      search.length > 80 ||
      !['all', 'true', 'false'].includes(active) ||
      !['true', 'false'].includes(onlyIssues) ||
      (query.type &&
        !Object.values(QuestionType).includes(query.type as QuestionType))
    ) {
      throw new BadRequestException('INVALID_CONTENT_FILTER');
    }
    const match: Record<string, unknown> = {};
    if (query.type) match.type = query.type;
    if (active !== 'all') match.isActive = active === 'true';
    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escaped, 'i');
      match.$or = [
        { code: pattern },
        { 'instruction.uz': pattern },
        { 'instruction.en': pattern },
      ];
      if (Types.ObjectId.isValid(search)) {
        (match.$or as Record<string, unknown>[]).push({
          _id: new Types.ObjectId(search),
        });
      }
    }
    const stages = this.pipeline(match, { section, unit });
    if (onlyIssues === 'true') stages.push({ $match: { _flagged: true } });
    stages.push({
      $facet: {
        items: [
          { $sort: { _flagged: -1, code: 1, _id: 1 } },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ],
        count: [{ $count: 'value' }],
      },
    });
    const [result] = (await this.questions
      .aggregate(stages)
      .allowDiskUse(true)
      .exec()) as Array<{
      items: QuestionRow[];
      count: Array<{ value: number }>;
    }>;
    return {
      items: (result?.items ?? []).map((row) => publicRow(row)),
      total: result?.count?.[0]?.value ?? 0,
      page,
      pageSize,
    };
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_QUESTION_ID');
    const stages = this.pipeline({ _id: new Types.ObjectId(id) });
    const [row] = (await this.questions
      .aggregate(stages)
      .exec()) as QuestionRow[];
    if (!row) throw new NotFoundException('QUESTION_NOT_FOUND');
    return publicRow(row, true);
  }
}
