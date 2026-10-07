import { BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AdminContentPathService } from './admin-content-path.service';
import type { LessonNodeDocument } from '../../lessons/schemas/node.schema';
import type { LessonDocument } from '../../lessons/schemas/lesson.schema';
import type { QuestionDocument } from '../../lessons/schemas/question.schema';

jest.mock('../../lessons/schemas/node.schema', () => ({
  LessonNode: class LessonNode {},
}));
jest.mock('../../lessons/schemas/lesson.schema', () => ({
  Lesson: class Lesson {},
}));
jest.mock('../../lessons/schemas/question.schema', () => ({
  Question: class Question {},
}));

describe('AdminContentPathService', () => {
  const nodeAggregate = jest.fn();
  const lessonAggregate = jest.fn();
  const questionAggregate = jest.fn();
  const nodes = {
    aggregate: nodeAggregate,
    collection: { name: 'lessonnodes' },
  } as unknown as Model<LessonNodeDocument>;
  const lessons = {
    aggregate: lessonAggregate,
    collection: { name: 'lessons' },
  } as unknown as Model<LessonDocument>;
  const questions = {
    aggregate: questionAggregate,
    collection: { name: 'questions' },
  } as unknown as Model<QuestionDocument>;
  const service = new AdminContentPathService(nodes, lessons, questions);
  const returned = (rows: unknown) => ({
    exec: jest.fn().mockResolvedValue(rows),
  });

  beforeEach(() => jest.clearAllMocks());

  it('groups section/unit and tracks without hiding orphan-only location', async () => {
    nodeAggregate.mockReturnValueOnce(
      returned([
        {
          _id: { section: 1, unit: 2, category: 'vocabulary' },
          nodeCount: 2,
          activeNodeCount: 2,
        },
        {
          _id: { section: 1, unit: 2, category: 'grammar' },
          nodeCount: 1,
          activeNodeCount: 1,
        },
      ]),
    );
    lessonAggregate.mockReturnValueOnce(
      returned([
        {
          _id: { section: 1, unit: 2, category: 'vocabulary' },
          lessonCount: 2,
          activeLessonCount: 2,
        },
        {
          _id: { section: 1, unit: 2, category: 'grammar' },
          lessonCount: 1,
          activeLessonCount: 1,
        },
        {
          _id: { section: 0, unit: 0, category: 'expression' },
          lessonCount: 1,
          activeLessonCount: 1,
        },
      ]),
    );
    const result = await service.overview();
    expect(result.totals).toEqual({
      sections: 2,
      units: 2,
      nodes: 3,
      lessons: 4,
    });
    expect(result.sections[0].units[0]).toMatchObject({
      section: 0,
      unit: 0,
      nodeCount: 0,
      lessonCount: 1,
    });
    expect(result.sections[1].units[0].tracks).toEqual([
      { category: 'grammar', nodeCount: 1, lessonCount: 1 },
      { category: 'vocabulary', nodeCount: 2, lessonCount: 2 },
    ]);
  });

  it('preserves lessonIds order and exposes both-direction and missing-reference issues', async () => {
    const nodeId = new Types.ObjectId();
    const otherNodeId = new Types.ObjectId();
    const lessonAId = new Types.ObjectId();
    const lessonBId = new Types.ObjectId();
    const lessonCId = new Types.ObjectId();
    const orphanId = new Types.ObjectId();
    const missingLessonId = new Types.ObjectId();
    const questionId = new Types.ObjectId();
    const missingQuestionId = new Types.ObjectId();
    const node = {
      _id: nodeId,
      section: 0,
      unit: 0,
      order: 1,
      nodeType: 'lesson',
      isActive: true,
      lessonIds: [lessonAId, missingLessonId, lessonAId, lessonCId],
    };
    const lessonA = {
      _id: lessonAId,
      nodeId,
      section: 0,
      unit: 0,
      order: 2,
      category: 'vocabulary',
      questionIds: [questionId, missingQuestionId, 'not-an-object-id'],
      isActive: true,
    };
    const lessonB = {
      _id: lessonBId,
      nodeId,
      section: 3,
      unit: 4,
      order: 3,
      category: 'vocabulary',
      questionIds: [questionId],
      isActive: true,
    };
    const lessonC = {
      _id: lessonCId,
      nodeId: otherNodeId,
      section: 1,
      unit: 1,
      order: 4,
      questionIds: [],
      isActive: true,
    };
    const orphan = {
      _id: orphanId,
      nodeId: new Types.ObjectId(),
      section: 0,
      unit: 0,
      order: 5,
      questionIds: [],
      isActive: true,
    };
    nodeAggregate.mockReturnValueOnce(
      returned([{ items: [node], count: [{ value: 1 }] }]),
    );
    lessonAggregate.mockReturnValueOnce(
      returned([{ items: [orphan], count: [{ value: 1 }] }]),
    );
    lessonAggregate.mockReturnValueOnce(returned([lessonA, lessonB, lessonC]));
    questionAggregate.mockReturnValueOnce(returned([{ _id: questionId }]));
    nodeAggregate.mockReturnValueOnce(returned([]));
    const result = await service.unit({ section: '0', unit: '0' });
    expect(result.total).toBe(1);
    expect(result.orphanTotal).toBe(1);
    expect(result.items[0].lessons.map((lesson) => lesson.id)).toEqual([
      String(lessonAId),
      String(lessonCId),
      String(lessonBId),
    ]);
    expect(result.items[0].lessonCount).toBe(2);
    expect(result.items[0].issues.map((issue) => issue.code)).toEqual(
      expect.arrayContaining([
        'missing_lesson_refs',
        'wrong_node_refs',
        'duplicate_lesson_refs',
      ]),
    );
    expect(result.items[0].lessons[0]).toMatchObject({
      questionCount: 1,
      declaredQuestionCount: 3,
    });
    expect(
      result.items[0].lessons[0].issues.map((issue) => issue.code),
    ).toContain('missing_question_refs');
    expect(
      result.items[0].lessons[1].issues.map((issue) => issue.code),
    ).toContain('wrong_node_reference');
    expect(
      result.items[0].lessons[2].issues.map((issue) => issue.code),
    ).toContain('not_listed_in_node');
    expect(
      result.items[0].lessons[2].issues.map((issue) => issue.code),
    ).toContain('lesson_location_mismatch');
    expect(result.orphanLessons[0]).toMatchObject({
      id: String(orphanId),
      questionCount: 0,
    });
    expect(result.orphanLessons[0].issues.map((issue) => issue.code)).toContain(
      'missing_node',
    );
    expect(questionAggregate).toHaveBeenCalledWith([
      { $match: { _id: { $in: [questionId, missingQuestionId] } } },
      { $project: { _id: 1 } },
    ]);
  });

  it('does not call an intentionally empty chest node a broken lesson node', async () => {
    const node = {
      _id: new Types.ObjectId(),
      section: 1,
      unit: 1,
      order: 1,
      nodeType: 'chest',
      lessonIds: [],
    };
    nodeAggregate.mockReturnValueOnce(
      returned([{ items: [node], count: [{ value: 1 }] }]),
    );
    lessonAggregate.mockReturnValueOnce(returned([{ items: [], count: [] }]));
    lessonAggregate.mockReturnValueOnce(returned([]));
    nodeAggregate.mockReturnValueOnce(returned([]));
    const result = await service.unit({ section: '1', unit: '1' });
    expect(result.items[0].issues).toEqual([]);
  });

  it('rejects invalid locations and page sizes', async () => {
    await expect(
      service.unit({ section: '-1', unit: '1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      service.unit({ section: '1.2', unit: '1' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      service.unit({ section: '1', unit: '1', pageSize: '100' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
