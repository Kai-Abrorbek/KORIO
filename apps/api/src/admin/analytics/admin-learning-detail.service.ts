import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { Lesson, LessonDocument } from '../../lessons/schemas/lesson.schema';
import {
  LessonNode,
  LessonNodeDocument,
} from '../../lessons/schemas/node.schema';
import {
  Question,
  QuestionDocument,
} from '../../lessons/schemas/question.schema';
import {
  LessonAttempt,
  LessonAttemptDocument,
} from '../../analytics/schemas/lesson-attempt.schema';
import {
  QuestionAttempt,
  QuestionAttemptDocument,
} from '../../analytics/schemas/question-attempt.schema';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { APP_TIMEZONE } from '../../common/date.util';
import { DateRange, dayKey, resolveRange } from './range.util';

type Totals = {
  starts: number;
  completes: number;
  answered: number;
  correct: number;
  skipped: number;
  durationSeconds: number;
  timedCompletions: number;
};
const empty = (): Totals => ({
  starts: 0,
  completes: 0,
  answered: 0,
  correct: 0,
  skipped: 0,
  durationSeconds: 0,
  timedCompletions: 0,
});
const rate = (a: number, b: number) =>
  b ? Math.round((a / b) * 1000) / 10 : null;
const title = (value?: { ko?: string; uz?: string; en?: string }) =>
  value?.ko || value?.uz || value?.en || '';
const validId = (id: string) => {
  if (!Types.ObjectId.isValid(id))
    throw new BadRequestException('INVALID_LESSON_ID');
  return new Types.ObjectId(id);
};

@Injectable()
export class AdminLearningDetailService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(Lesson.name) private readonly lessons: Model<LessonDocument>,
    @InjectModel(LessonNode.name)
    private readonly nodes: Model<LessonNodeDocument>,
    @InjectModel(Question.name)
    private readonly questions: Model<QuestionDocument>,
    @InjectModel(LessonAttempt.name)
    private readonly attempts: Model<LessonAttemptDocument>,
    @InjectModel(QuestionAttempt.name)
    private readonly answers: Model<QuestionAttemptDocument>,
  ) {}

  private humanUsers(): PipelineStage[] {
    return [
      {
        $lookup: {
          from: this.users.collection.name,
          localField: 'userId',
          foreignField: '_id',
          as: '_user',
        },
      },
      {
        $match: { '_user.0': { $exists: true }, '_user.isBot': { $ne: true } },
      },
    ];
  }

  /** An event is included by the learner's calendar day, not the server's UTC day. */
  private localEventRange(
    field: 'startedAt' | 'answeredAt',
    range: DateRange,
  ): PipelineStage[] {
    const day = 86_400_000;
    return [
      {
        $match: {
          [field]: {
            $gte: new Date(range.from.getTime() - day),
            $lte: new Date(range.to.getTime() + day),
          },
        },
      },
      ...this.humanUsers(),
      {
        $addFields: {
          _adminTimezone: {
            $let: {
              vars: { timezone: { $arrayElemAt: ['$_user.timezone', 0] } },
              in: {
                $cond: [
                  { $in: ['$$timezone', [null, '']] },
                  APP_TIMEZONE,
                  '$$timezone',
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          _adminLocalDay: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: `$${field}`,
              timezone: '$_adminTimezone',
            },
          },
        },
      },
      {
        $match: {
          _adminLocalDay: { $gte: dayKey(range.from), $lte: dayKey(range.to) },
        },
      },
    ];
  }

  async hierarchy(from?: string, to?: string) {
    const range = resolveRange(from, to);
    const [catalog, nodes, starts, answers, first] = await Promise.all([
      this.lessons
        .find()
        .select('_id code title section unit nodeId category order isActive')
        .lean(),
      this.nodes.find().select('_id code title section unit order').lean(),
      this.attempts
        .aggregate<{
          _id: Types.ObjectId;
          starts: number;
          completes: number;
          durationSeconds: number;
          timedCompletions: number;
        }>([
          ...this.localEventRange('startedAt', range),
          {
            $group: {
              _id: '$lessonId',
              starts: { $sum: 1 },
              completes: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
              },
              durationSeconds: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ['$status', 'completed'] },
                        { $gt: ['$speedSeconds', 0] },
                      ],
                    },
                    '$speedSeconds',
                    0,
                  ],
                },
              },
              timedCompletions: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ['$status', 'completed'] },
                        { $gt: ['$speedSeconds', 0] },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ])
        .exec(),
      this.answers
        .aggregate<{
          _id: Types.ObjectId;
          answered: number;
          correct: number;
          skipped: number;
        }>([
          ...this.localEventRange('answeredAt', range),
          {
            $group: {
              _id: '$lessonId',
              answered: { $sum: { $cond: ['$skipped', 0, 1] } },
              correct: {
                $sum: {
                  $cond: [
                    { $and: ['$isCorrect', { $ne: ['$skipped', true] }] },
                    1,
                    0,
                  ],
                },
              },
              skipped: { $sum: { $cond: ['$skipped', 1, 0] } },
            },
          },
        ])
        .exec(),
      this.attempts.findOne().sort({ startedAt: 1 }).select('startedAt').lean(),
    ]);
    const nodeById = new Map(nodes.map((node) => [String(node._id), node]));
    const totals = new Map<string, Totals>();
    for (const row of starts)
      totals.set(String(row._id), { ...empty(), ...row });
    for (const row of answers)
      totals.set(String(row._id), {
        ...(totals.get(String(row._id)) ?? empty()),
        ...row,
      });
    const lessonRows = catalog
      .map((lesson) => {
        const node = nodeById.get(String(lesson.nodeId));
        const value = totals.get(String(lesson._id)) ?? empty();
        return {
          id: String(lesson._id),
          code: lesson.code ?? null,
          title: title(lesson.title),
          category: lesson.category,
          section: node?.section ?? lesson.section,
          unit: node?.unit ?? lesson.unit,
          nodeId: String(lesson.nodeId),
          nodeTitle: title(node?.title),
          order: lesson.order,
          isActive: lesson.isActive !== false,
          ...this.present(value),
        };
      })
      .sort(
        (a, b) => a.section - b.section || a.unit - b.unit || a.order - b.order,
      );
    return {
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      since: first?.startedAt?.toISOString() ?? null,
      definition:
        '레슨 시작 기준 시도 수·같은 시도의 완료 수. 정답률은 선택 기간에 답한 비건너뛰기 문제 기준. 평균 시간은 시간이 기록된 완료 시도 기준.',
      lessons: lessonRows,
    };
  }

  private present(t: Totals) {
    return {
      starts: t.starts,
      completes: t.completes,
      completionRate: rate(t.completes, t.starts),
      answered: t.answered,
      correct: t.correct,
      skipped: t.skipped,
      accuracy: rate(t.correct, t.answered),
      avgMinutes: t.timedCompletions
        ? Math.round((t.durationSeconds / t.timedCompletions / 60) * 10) / 10
        : null,
    };
  }

  async lessonFunnel(id: string, from?: string, to?: string) {
    const lessonId = validId(id);
    const lesson = await this.lessons
      .findById(lessonId)
      .select('_id code title questionIds')
      .lean();
    if (!lesson) throw new NotFoundException('LESSON_NOT_FOUND');
    const range = resolveRange(from, to);
    const questionCount = lesson.questionIds?.length ?? 0;
    const now = new Date();
    const staleAt = new Date(now.getTime() - 30 * 60_000);
    const [rows, questions, first] = await Promise.all([
      this.attempts
        .aggregate<{
          _id: number;
          starts: number;
          completes: number;
          active: number;
          abandoned: number;
        }>([
          { $match: { lessonId } },
          ...this.localEventRange('startedAt', range),
          {
            $group: {
              _id: '$maxQuestionIndex',
              starts: { $sum: 1 },
              completes: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
              },
              active: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ['$status', 'in_progress'] },
                        { $gt: ['$lastSeenAt', staleAt] },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
              abandoned: {
                $sum: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ['$status', 'in_progress'] },
                        { $lte: ['$lastSeenAt', staleAt] },
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ])
        .exec(),
      this.questions
        .find({ _id: { $in: lesson.questionIds ?? [] } })
        .select('_id code type')
        .lean(),
      this.attempts
        .findOne({ lessonId })
        .sort({ startedAt: 1 })
        .select('startedAt')
        .lean(),
    ]);
    const sum = (key: 'starts' | 'completes' | 'active' | 'abandoned') =>
      rows.reduce((total, row) => total + row[key], 0);
    const questionById = new Map(
      questions.map((question) => [String(question._id), question]),
    );
    return {
      lesson: { id, code: lesson.code ?? null, title: title(lesson.title) },
      since: first?.startedAt?.toISOString() ?? null,
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      starts: sum('starts'),
      completes: sum('completes'),
      active: sum('active'),
      abandoned: sum('abandoned'),
      definition:
        '한 번의 레슨 시작을 한 시도로 셉니다. 문제 도달은 앱이 보고한 최대 문제 번호이며, 30분 넘게 보고가 없는 미완료 시도를 이탈로 분류합니다.',
      steps: (lesson.questionIds ?? [])
        .map((questionId, index) => {
          const question = questionById.get(String(questionId));
          return {
            index,
            questionId: String(questionId),
            code: question?.code ?? null,
            type: question?.type ?? '',
            reached: rows
              .filter((row) => row._id >= index)
              .reduce((total, row) => total + row.starts, 0),
          };
        })
        .slice(0, questionCount),
    };
  }

  async questionAnalysis(from?: string, to?: string) {
    const range = resolveRange(from, to);
    const [rows, first] = await Promise.all([
      this.answers
        .aggregate<{
          _id: Types.ObjectId;
          attempts: number;
          answered: number;
          correct: number;
          skipped: number;
          durationMs: number | null;
          timed: number;
        }>([
          ...this.localEventRange('answeredAt', range),
          {
            $group: {
              _id: '$questionId',
              attempts: { $sum: 1 },
              answered: { $sum: { $cond: ['$skipped', 0, 1] } },
              correct: {
                $sum: {
                  $cond: [
                    { $and: ['$isCorrect', { $ne: ['$skipped', true] }] },
                    1,
                    0,
                  ],
                },
              },
              skipped: { $sum: { $cond: ['$skipped', 1, 0] } },
              durationMs: {
                $sum: {
                  $cond: [{ $gt: ['$durationMs', 0] }, '$durationMs', 0],
                },
              },
              timed: { $sum: { $cond: [{ $gt: ['$durationMs', 0] }, 1, 0] } },
            },
          },
          { $sort: { attempts: -1, _id: 1 } },
          { $limit: 500 },
        ])
        .exec(),
      this.answers
        .findOne()
        .sort({ answeredAt: 1 })
        .select('answeredAt')
        .lean(),
    ]);
    const questions = await this.questions
      .find({ _id: { $in: rows.map((row) => row._id) } })
      .select('_id code type instruction')
      .lean();
    const byId = new Map(
      questions.map((question) => [String(question._id), question]),
    );
    return {
      range: { from: range.from.toISOString(), to: range.to.toISOString() },
      since: first?.answeredAt?.toISOString() ?? null,
      limited: rows.length === 500,
      definition:
        '선택 기간 문제 응답 기준입니다. 정답률은 건너뛰기를 제외하며, 평균 시간은 시간이 기록된 응답만 사용합니다. 상위 500개 문제를 시도 수순으로 표시합니다.',
      items: rows.map((row) => {
        const question = byId.get(String(row._id));
        return {
          id: String(row._id),
          code: question?.code ?? null,
          type: question?.type ?? '',
          preview: title(question?.instruction),
          attempts: row.attempts,
          answered: row.answered,
          correctRate: rate(row.correct, row.answered),
          skipRate: rate(row.skipped, row.attempts),
          avgSeconds: row.timed
            ? Math.round((row.durationMs ?? 0) / row.timed / 100) / 10
            : null,
        };
      }),
    };
  }
}
