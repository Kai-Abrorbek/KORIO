import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AdminContentService } from './admin-content.service';
import type { QuestionDocument } from '../../lessons/schemas/question.schema';
import type { LessonDocument } from '../../lessons/schemas/lesson.schema';
import type { LessonNodeDocument } from '../../lessons/schemas/node.schema';
import type { QuestionAttemptDocument } from '../../analytics/schemas/question-attempt.schema';

type PipelineProbe = {
  $match?: {
    _flagged?: boolean;
    $or?: Array<{ nodes?: { $elemMatch?: { section?: number } } }>;
  };
  $facet?: unknown;
  $lookup?: { from?: string };
  $addFields?: {
    _flags?: { readingShape?: unknown; clozeShape?: unknown };
  };
};

jest.mock('../../lessons/schemas/question.schema', () => ({
  Question: class Question {},
  QuestionType: {
    READING_QUIZ: 'reading_quiz',
    ERROR_HUNT: 'error_hunt',
    CLOZE_PASSAGE: 'cloze_passage',
    DIALOG_ORDER: 'dialog_order',
    VERB_TRANSFORM: 'verb_transform',
  },
}));
jest.mock('../../lessons/schemas/lesson.schema', () => ({
  Lesson: class Lesson {},
}));
jest.mock('../../lessons/schemas/node.schema', () => ({
  LessonNode: class LessonNode {},
}));

describe('AdminContentService', () => {
  const questionId = new Types.ObjectId();
  const lessonA = new Types.ObjectId();
  const lessonB = new Types.ObjectId();
  const nodeA = new Types.ObjectId();
  const nodeB = new Types.ObjectId();
  const row = {
    _id: questionId,
    code: 'Q-100',
    type: 'reading_quiz',
    level: '3',
    isActive: true,
    instruction: { uz: 'Matnni o‘qing' },
    answer: 'B',
    options: ['A', 'B', 'C'],
    passage: 'Test passage',
    lessons: [
      {
        _id: lessonA,
        nodeId: nodeA,
        code: 'L-1',
        title: { uz: 'One' },
        section: 0,
        unit: 0,
        order: 1,
      },
      {
        _id: lessonB,
        nodeId: nodeB,
        code: 'L-2',
        title: { uz: 'Two' },
        section: 0,
        unit: 0,
        order: 2,
      },
    ],
    nodes: [
      {
        _id: nodeA,
        code: 'N-1',
        title: { uz: 'Node one' },
        section: 2,
        unit: 3,
        order: 1,
      },
      {
        _id: nodeB,
        code: 'N-2',
        title: { uz: 'Node two' },
        section: 4,
        unit: 5,
        order: 2,
      },
    ],
    _flags: { lowCorrectRate: true },
    _metrics: {
      attempts: 25,
      answered: 25,
      correct: 5,
      skipped: 0,
      avgDurationMs: 1234.5,
    },
  };
  const exec = jest.fn();
  const allowDiskUse = jest.fn().mockReturnValue({ exec });
  const aggregate = jest.fn().mockReturnValue({ exec, allowDiskUse });
  const questions = {
    aggregate,
    collection: { name: 'questions' },
  } as unknown as Model<QuestionDocument>;
  const lessons = {
    collection: { name: 'lessons' },
  } as unknown as Model<LessonDocument>;
  const nodes = {
    collection: { name: 'lessonnodes' },
  } as unknown as Model<LessonNodeDocument>;
  const attempts = {
    collection: { name: 'questionattempts' },
  } as unknown as Model<QuestionAttemptDocument>;
  const service = new AdminContentService(questions, lessons, nodes, attempts);

  beforeEach(() => jest.clearAllMocks());

  it('returns every linked lesson and only evidence-backed performance issues', async () => {
    exec.mockResolvedValue([{ items: [row], count: [{ value: 1 }] }]);
    const result = await service.list({
      page: '1',
      pageSize: '20',
      onlyIssues: 'true',
      section: '2',
      unit: '3',
    });
    expect(result.total).toBe(1);
    expect(result.items[0]).toMatchObject({
      id: questionId.toString(),
      code: 'Q-100',
      metrics: {
        sampleSize: 25,
        answeredCount: 25,
        correctRate: 20,
        skipRate: 0,
        avgDurationMs: 1235,
      },
    });
    expect(result.items[0].locations).toHaveLength(2);
    expect(result.items[0].locations[0]).toMatchObject({ section: 2, unit: 3 });
    expect(result.items[0].locations[1]).toMatchObject({ section: 4, unit: 5 });
    expect(result.items[0].issues).toEqual([
      expect.objectContaining({ code: 'low_correct_rate', kind: 'signal' }),
    ]);
    expect(result.items[0]).not.toHaveProperty('answer');
    const pipeline = (
      aggregate.mock.calls as unknown as Array<[PipelineProbe[]]>
    )[0][0];
    const filtered = pipeline.findIndex(
      (stage) => stage.$match?._flagged === true,
    );
    const facet = pipeline.findIndex((stage) => stage.$facet);
    expect(filtered).toBeGreaterThan(-1);
    expect(filtered).toBeLessThan(facet);
    expect(
      pipeline.some((stage) =>
        stage.$match?.$or?.some(
          (branch) => branch.nodes?.$elemMatch?.section === 2,
        ),
      ),
    ).toBe(true);
    expect(
      pipeline.some((stage) => stage.$lookup?.from === 'questionattempts'),
    ).toBe(true);
    const flags = pipeline.find((stage) => stage.$addFields?._flags)?.$addFields
      ?._flags;
    expect(JSON.stringify(flags?.readingShape)).not.toContain('$split');
    expect(JSON.stringify(flags?.clozeShape)).toContain('$split');
    expect(JSON.stringify(flags?.clozeShape)).toContain('$setIsSubset');
    expect(allowDiskUse).toHaveBeenCalledWith(true);
  });

  it('represents no attempt data as unknown, not a zero-percent result', async () => {
    exec.mockResolvedValue([
      {
        items: [
          {
            ...row,
            _flags: {},
            _metrics: {
              attempts: 0,
              answered: 0,
              correct: 0,
              skipped: 0,
              avgDurationMs: null,
            },
          },
        ],
        count: [{ value: 1 }],
      },
    ]);
    const result = await service.list({});
    expect(result.items[0].metrics).toMatchObject({
      sampleSize: 0,
      correctRate: null,
      skipRate: null,
      avgDurationMs: null,
    });
    expect(result.items[0].issues).toEqual([]);
  });

  it('filters by exact lesson membership before calculating global count', async () => {
    exec.mockResolvedValue([{ items: [], count: [] }]);
    await service.list({ lessonId: lessonA.toString() });
    const pipeline = (
      aggregate.mock.calls as unknown as Array<
        [Array<{ $match?: Record<string, unknown> }>]
      >
    )[0][0];
    expect(
      pipeline.some(
        (stage) => String(stage.$match?.['lessons._id']) === String(lessonA),
      ),
    ).toBe(true);
    await expect(
      service.list({ lessonId: 'not-an-id' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('keeps a lesson visible when its node has been removed', async () => {
    exec.mockResolvedValue([
      {
        ...row,
        lessons: [row.lessons[0]],
        nodes: [],
        _flags: { missingNode: true },
        _metrics: {
          attempts: 0,
          answered: 0,
          correct: 0,
          skipped: 0,
          avgDurationMs: null,
        },
      },
    ]);
    const detail = await service.get(questionId.toString());
    expect(detail.locations).toHaveLength(1);
    expect(detail.locations[0]).toMatchObject({
      section: 0,
      unit: 0,
      node: null,
    });
    expect(detail.locations[0].lesson.id).toBe(lessonA.toString());
    expect(detail.issues[0]).toMatchObject({
      code: 'missing_node',
      severity: 'critical',
    });
  });

  it('returns the read-only question composition on detail', async () => {
    exec.mockResolvedValue([row]);
    const detail = await service.get(questionId.toString());
    expect(detail).toMatchObject({
      detail: {
        answer: 'B',
        options: ['A', 'B', 'C'],
        passage: 'Test passage',
      },
    });
    expect(detail).not.toHaveProperty('userId');
  });

  it('rejects unsafe filters and unknown question IDs', async () => {
    await expect(service.list({ pageSize: '1000' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.list({ onlyIssues: 'yes' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.list({ type: 'unknown' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.get('not-an-id')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    exec.mockResolvedValue([]);
    await expect(service.get(questionId.toString())).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
