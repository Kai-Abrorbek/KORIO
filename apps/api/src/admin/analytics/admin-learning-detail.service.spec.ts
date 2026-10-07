import { AdminLearningDetailService } from './admin-learning-detail.service';

jest.mock('../../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../../lessons/schemas/lesson.schema', () => ({
  Lesson: class Lesson {},
}));
jest.mock('../../lessons/schemas/node.schema', () => ({
  LessonNode: class LessonNode {},
}));
jest.mock('../../lessons/schemas/question.schema', () => ({
  Question: class Question {},
}));
jest.mock('../../analytics/schemas/lesson-attempt.schema', () => ({
  LessonAttempt: class LessonAttempt {},
}));
jest.mock('../../analytics/schemas/question-attempt.schema', () => ({
  QuestionAttempt: class QuestionAttempt {},
}));

const query = (value: unknown) => ({
  select: jest
    .fn()
    .mockReturnValue({ lean: jest.fn().mockResolvedValue(value) }),
});
const first = (value: unknown) => ({
  sort: jest.fn().mockReturnValue(query(value)),
});

describe('AdminLearningDetailService', () => {
  it('keeps lessons with no attempts and does not turn missing accuracy into zero', async () => {
    const users = { collection: { name: 'users' } };
    const lessons = {
      find: jest.fn().mockReturnValue(
        query([
          {
            _id: 'lesson-1',
            code: 'L1',
            title: { ko: '기초' },
            nodeId: 'node-1',
            section: 1,
            unit: 2,
            order: 1,
          },
          {
            _id: 'lesson-2',
            code: 'L2',
            title: { ko: '복습' },
            nodeId: 'node-1',
            section: 1,
            unit: 2,
            order: 2,
          },
        ]),
      ),
    };
    const nodes = {
      find: jest
        .fn()
        .mockReturnValue(
          query([
            { _id: 'node-1', title: { ko: '첫 노드' }, section: 1, unit: 2 },
          ]),
        ),
    };
    const attempts = {
      aggregate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          {
            _id: 'lesson-1',
            starts: 3,
            completes: 2,
            durationSeconds: 180,
            timedCompletions: 2,
          },
        ]),
      }),
      findOne: jest
        .fn()
        .mockReturnValue(
          first({ startedAt: new Date('2026-10-01T00:00:00Z') }),
        ),
    };
    const answers = {
      aggregate: jest.fn().mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValue([
            { _id: 'lesson-1', answered: 4, correct: 3, skipped: 1 },
          ]),
      }),
    };
    const service = new AdminLearningDetailService(
      users as never,
      lessons as never,
      nodes as never,
      {} as never,
      attempts as never,
      answers as never,
    );
    const result = await service.hierarchy('2026-10-01', '2026-10-07');
    expect(result.lessons[0]).toEqual(
      expect.objectContaining({
        title: '기초',
        nodeTitle: '첫 노드',
        starts: 3,
        completes: 2,
        completionRate: 66.7,
        accuracy: 75,
        avgMinutes: 1.5,
      }),
    );
    expect(result.lessons[1]).toEqual(
      expect.objectContaining({
        starts: 0,
        completes: 0,
        completionRate: null,
        accuracy: null,
        avgMinutes: null,
      }),
    );
    const calls = attempts.aggregate.mock.calls as unknown as Array<[unknown]>;
    const pipeline = JSON.stringify(calls[0]?.[0]);
    expect(pipeline).toContain('"_user.isBot"');
    expect(pipeline).toContain('"timezone":"$_adminTimezone"');
    expect(pipeline).toContain('"_adminLocalDay"');
  });
});
