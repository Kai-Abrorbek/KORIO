/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */

import { Types } from 'mongoose';
import { LessonsService } from './lessons.service';
import { AnswerGradingService } from './answer-grading.service';
import { resolveCourseScope } from '../common/learning-course';

const ko = resolveCourseScope();
const en = resolveCourseScope({ targetLanguage: 'en' });
const userId = new Types.ObjectId().toString();

function matches(row: any, filter: any): boolean {
  return Object.entries(filter).every(([key, condition]: [string, any]) => {
    if (key === '$and')
      return condition.every((item: any) => matches(row, item));
    if (key === '$or') return condition.some((item: any) => matches(row, item));
    const value = row[key];
    if (
      condition &&
      typeof condition === 'object' &&
      !(condition instanceof Types.ObjectId)
    ) {
      return Object.entries(condition).every(
        ([operator, expected]: [string, any]) => {
          if (operator === '$exists') return (value !== undefined) === expected;
          if (operator === '$in')
            return expected.some((item: any) => String(item) === String(value));
          if (operator === '$ne') return value !== expected;
          if (operator === '$lt') return value < expected;
          if (operator === '$gt') return value > expected;
          return true;
        },
      );
    }
    return condition === null
      ? value == null
      : String(value) === String(condition);
  });
}

function query(value: any) {
  const result = {
    select: jest.fn(),
    sort: jest.fn(),
    lean: jest.fn().mockResolvedValue(value),
  };
  result.select.mockReturnValue(result);
  result.sort.mockReturnValue(result);
  return result;
}

function model(rows: any[]) {
  return {
    find: jest.fn((filter) =>
      query(rows.filter((row) => matches(row, filter))),
    ),
    findById: jest.fn((id) =>
      query(rows.find((row) => String(row._id) === String(id))),
    ),
    bulkWrite: jest.fn().mockResolvedValue({}),
    aggregate: jest.fn().mockResolvedValue([]),
  };
}

function fixture() {
  const legacyLesson = new Types.ObjectId();
  const englishLesson = new Types.ObjectId();
  const legacyQuestion = new Types.ObjectId();
  const englishQuestion = new Types.ObjectId();
  const nodes = model([
    {
      _id: new Types.ObjectId(),
      section: 1,
      unit: 1,
      order: 1,
      isActive: true,
      title: { uz: 'Korean' },
      lessonIds: [legacyLesson],
    },
    {
      _id: new Types.ObjectId(),
      ...en,
      section: 1,
      unit: 1,
      order: 1,
      isActive: true,
      category: 'vocabulary',
      title: { uz: 'English' },
      lessonIds: [englishLesson],
    },
  ]);
  const lessons = model([
    {
      _id: legacyLesson,
      isActive: true,
      title: { uz: 'Korean lesson' },
      category: 'vocabulary',
      questionIds: [legacyQuestion],
    },
    {
      _id: englishLesson,
      ...en,
      isActive: true,
      title: { uz: 'English lesson' },
      category: 'vocabulary',
      questionIds: [englishQuestion],
    },
  ]);
  const questions = model([
    {
      _id: legacyQuestion,
      isActive: true,
      type: 'speaking',
      answer: '안녕하세요',
    },
    {
      _id: englishQuestion,
      ...en,
      isActive: true,
      type: 'speaking',
      answer: 'Hello',
    },
  ]);
  const progress = model([
    {
      userId: new Types.ObjectId(userId),
      lessonId: legacyLesson,
      isCompleted: true,
    },
  ]);
  const user = {
    placementLevel: 6,
    hangulLevel: 'none',
    legendNodes: [],
    courseProgress: {},
  };
  const users = { findById: jest.fn(() => query(user)) };
  const attempts = {
    create: jest
      .fn()
      .mockImplementation((value) => ({ ...value, _id: new Types.ObjectId() })),
  };
  const service: any = new (LessonsService as any)(
    lessons,
    nodes,
    { pendingCount: jest.fn().mockResolvedValue(0) },
    questions,
    progress,
    {},
    {},
    attempts,
    users,
    {},
    {},
    {},
    {},
    {},
  );
  return {
    service,
    nodes,
    lessons,
    questions,
    progress,
    users,
    attempts,
    legacyLesson,
    englishLesson,
    englishQuestion,
  };
}

describe('course-isolated lessons', () => {
  it('keeps legacy untagged Korean nodes visible and excludes English by default', async () => {
    const { service } = fixture();
    const result = await service.getLessons(userId);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ ...ko, title: { uz: 'Korean' } });
  });

  it('does not inherit Korean placement, completion, or Hangul gates in English roadmap', async () => {
    const { service, englishLesson } = fixture();
    const result = await service.getRoadmap(
      userId,
      'uz',
      'vocabulary',
      false,
      undefined,
      en,
    );
    expect(result).toMatchObject({ ...en, score: 0, currentSection: 1 });
    expect(result.units).toHaveLength(1);
    expect(result.units[0].title).toBe('English');
    expect(result.units[0].nodes).toHaveLength(1);
    expect(result.units[0].nodes[0]).toMatchObject({
      status: 'current',
      completedLessons: 0,
    });
    expect(result.units[0].nodes[0].lessons[0].lessonId).toBe(
      englishLesson.toString(),
    );
  });

  it('keeps free-roadmap score independent from Korean placement and progress', async () => {
    const { service } = fixture();
    const result = await service.getScore(userId, 'uz', 'vocabulary', en);
    expect(result.score).toBe(0);
  });

  it('scopes every level of the unit question pool and returns English speech metadata', async () => {
    const { service, englishQuestion } = fixture();
    const result = await service.getUnitPractice(
      userId,
      1,
      1,
      'vocabQuiz',
      'uz',
      1,
      1,
      en,
    );
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0]).toMatchObject({
      id: englishQuestion.toString(),
      ...en,
      speechLocale: 'en-US',
      answer: 'Hello',
    });
  });

  it('preserves jump-before-target condition when combining course filters', async () => {
    const { service, englishQuestion, attempts } = fixture();
    const empty = await service.getUnitJumpTest(
      userId,
      1,
      1,
      'uz',
      'vocabulary',
      25,
      en,
    );
    expect(empty.questions).toEqual([]);
    const result = await service.getUnitJumpTest(
      userId,
      1,
      2,
      'uz',
      'vocabulary',
      25,
      en,
    );
    expect(result.questions.map((q: any) => q.id)).toEqual([
      englishQuestion.toString(),
    ]);
    expect(attempts.create).toHaveBeenCalledWith(expect.objectContaining(en));
  });

  it('never marks Korean lessons complete when applying an English jump', async () => {
    const { service, englishLesson, progress } = fixture();
    await service.applyUnitJump(userId, 1, 2, 'vocabulary', en);
    const operations = progress.bulkWrite.mock.calls[0][0];
    expect(operations).toHaveLength(1);
    expect(operations[0].updateOne.filter.lessonId.toString()).toBe(
      englishLesson.toString(),
    );
  });

  it('filters a cross-course lesson reference before writing jump completion', async () => {
    const { service, nodes, englishLesson, legacyLesson, progress } = fixture();
    nodes.find.mockReturnValue(
      query([{ lessonIds: [legacyLesson, englishLesson] }]),
    );
    await service.applyUnitJump(userId, 1, 2, 'vocabulary', en);
    const operations = progress.bulkWrite.mock.calls[0][0];
    expect(operations).toHaveLength(1);
    expect(operations[0].updateOne.filter.lessonId.toString()).toBe(
      englishLesson.toString(),
    );
  });

  it('rejects a cross-course parent node before recording lesson completion', async () => {
    const { service, nodes, lessons, englishLesson, progress } = fixture();
    lessons.findById.mockReturnValue(
      query({
        _id: englishLesson,
        ...en,
        nodeId: new Types.ObjectId(),
        questionIds: [],
      }),
    );
    nodes.findById.mockReturnValue(query({ ...ko }));
    const save = jest.fn();
    Object.assign(progress, { findOneAndUpdate: save });
    await expect(
      service.completeLesson(englishLesson.toString(), userId, {}),
    ).rejects.toThrow('COURSE_CONTENT_MISMATCH');
    expect(save).not.toHaveBeenCalled();
  });

  it.each([ko, en])(
    'writes legend progress only inside its owning course: $courseId',
    async (scope) => {
      const { service, nodes, users, englishLesson } = fixture();
      const nodeId = new Types.ObjectId();
      nodes.findById.mockReturnValue(
        query({ _id: nodeId, ...scope, lessonIds: [englishLesson] }),
      );
      const save = jest.fn().mockResolvedValue({});
      Object.assign(users, {
        exists: jest.fn().mockResolvedValue(false),
        updateOne: save,
      });
      service.recordStudy = jest.fn().mockResolvedValue(undefined);
      service.addXp = jest.fn().mockResolvedValue({ totalXP: 10 });
      await service.completeLegend(userId, nodeId.toString());
      expect(save).toHaveBeenCalledWith(expect.anything(), {
        $addToSet:
          scope.courseId === ko.courseId
            ? { legendNodes: nodeId }
            : { 'courseProgress.en-general.legendNodes': nodeId.toString() },
      });
    },
  );

  it('allows Korean translations for English prompts and keeps neutral pair aliases', () => {
    const { service } = fixture();
    const result = service.formatQuestion(
      {
        _id: new Types.ObjectId(),
        ...en,
        type: 'type_answer',
        answer: 'Hello',
        answerTranslation: { ko: '안녕하세요', uz: 'Salom' },
        pairs: [{ text: 'hello', native: 'salom' }],
      },
      'ko',
    );
    expect(result.answerTranslation).toBe('안녕하세요');
    expect(result.pairs[0]).toEqual({
      text: 'hello',
      korean: 'hello',
      native: 'salom',
    });
  });

  it('does not expose target-language answers when learner UI equals target language', () => {
    const { service } = fixture();
    const result = service.formatQuestion(
      {
        _id: new Types.ObjectId(),
        ...en,
        type: 'sentence_builder',
        answer: 'Hello',
        optionsI18n: { en: ['Hello'], uz: ['Salom'] },
        answerI18n: { en: 'Hello', uz: 'Salom' },
      },
      'en',
    );
    expect(result.options).toEqual(['Salom']);
    expect(result.answer).toBe('Salom');
  });

  it.each([
    ['ko', '안녕하세요'],
    ['uz', 'Salom'],
    ['en', 'Salom'],
  ])(
    'uses authored non-target matching translations for English / %s UI',
    (lang, expected) => {
      const { service } = fixture();
      const result = service.formatQuestion(
        {
          _id: new Types.ObjectId(),
          ...en,
          type: 'word_matching',
          pairs: [
            {
              text: 'hello',
              native: 'legacy salom',
              nativeI18n: { ko: '안녕하세요', uz: 'Salom', en: 'hello' },
            },
          ],
        },
        lang,
      );
      expect(result.pairs[0].native).toBe(expected);
      expect(result.pairs[0].text).toBe('hello');
    },
  );

  it('preserves the original plaintext matching native when no authored translation exists', () => {
    const { service } = fixture();
    const result = service.formatQuestion(
      {
        _id: new Types.ObjectId(),
        ...en,
        type: 'word_matching',
        pairs: [{ korean: 'hello', native: 'original salom' }],
      },
      'ko',
    );
    expect(result.pairs[0].native).toBe('original salom');
  });

  it('rejects an English placement test before touching the Korean question pool', async () => {
    const { service, questions } = fixture();
    await expect(
      service.getLevelTestQuestions(undefined, 'uz', en),
    ).rejects.toThrow('COURSE_MODE_UNAVAILABLE');
    expect(questions.aggregate).not.toHaveBeenCalled();
  });
});

describe('language-aware typed grading', () => {
  function grader(targetLanguage: string, answer: string) {
    const question = { type: 'type_answer', targetLanguage, answer };
    const questionModel = { findOne: jest.fn(() => query(question)) };
    return new AnswerGradingService(
      questionModel as any,
      { get: () => undefined } as any,
    );
  }

  it('does not accept not -> now as a one-letter English typo', async () => {
    const result = await grader('en', 'I am not here').grade(
      new Types.ObjectId().toString(),
      'I am now here',
      'uz',
    );
    expect(result.isCorrect).toBe(false);
  });

  it('still accepts a harmless English one-letter spelling mistake', async () => {
    const result = await grader('en', 'hello').grade(
      new Types.ObjectId().toString(),
      'helo',
      'uz',
    );
    expect(result).toMatchObject({ isCorrect: true, result: 'almost' });
  });

  it('preserves Korean meaning-sensitive typo protection', async () => {
    const result = await grader('ko', '안 가요').grade(
      new Types.ObjectId().toString(),
      '가요',
      'uz',
    );
    expect(result.isCorrect).toBe(false);
  });
});
// Exercise real services without initializing circular Mongo schema decorators.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
