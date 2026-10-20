import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { LessonsService } from './lessons.service';
import { QuestionType } from './schemas/question.schema';
import { StudyCategory } from '../users/utils/study-category.util';
import { TopikStatsService } from '../topik/topik-stats.service';

jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<typeof import('@nestjs/mongoose')>('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: {
    createForClass: () => ({ index: () => undefined, pre: () => undefined }),
  },
}));

function query<T>(value: T) {
  return {
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(value),
  };
}

const tz = 'Asia/Tashkent';
const userId = new Types.ObjectId().toString();
const localDay = (date: string) => new Date(`${date}T00:00:00+05:00`);
const question = (targetLanguage?: string) => ({
  _id: new Types.ObjectId(),
  type: QuestionType.TYPE_ANSWER,
  ...(targetLanguage === undefined ? {} : { targetLanguage }),
});

describe('server-owned daily language recording', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T18:00:00Z'));
  });

  afterEach(() => jest.useRealTimers());

  function fixture(storedQuestions: ReturnType<typeof question>[] = []) {
    const questionQuery = query(storedQuestions);
    const questions = { find: jest.fn(() => questionQuery) };
    const stats = { findOneAndUpdate: jest.fn().mockResolvedValue({}) };
    const mistakes = {
      bulkWrite: jest.fn().mockResolvedValue({}),
      updateMany: jest.fn().mockResolvedValue({}),
    };
    const service = new LessonsService(
      {} as never,
      {} as never,
      {} as never,
      questions as never,
      {} as never,
      stats as never,
      mistakes as never,
      {} as never,
      {} as never,
      {} as never,
      { getTimezone: jest.fn().mockResolvedValue(tz) } as never,
      {} as never,
      {} as never,
      {} as never,
    );
    return { service, stats, questions, questionQuery };
  }

  it('adds stored question languages in the same atomic global daily update', async () => {
    const stored = [question(), question('en'), question('en')];
    const { service, stats } = fixture(stored);

    await service.recordStudy(userId, {
      questionIds: stored.map((item) => item._id),
      speedSeconds: 30,
    });

    expect(stats.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(stats.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: new Types.ObjectId(userId), date: localDay('2026-10-20') },
      {
        $addToSet: { studyLanguages: { $each: ['ko', 'en'] } },
        $inc: {
          studyTimeSeconds: 30,
          totalQuestions: 3,
          correctQuestions: 3,
          xpEarned: 0,
          'categoryCounts.vocab': 3,
          'categoryCorrect.vocab': 3,
          // 일일 문제 퀘스트는 언어별로 — 영어 문제 두 개만 영어 칸에 (한국어는 합계 − 영어로 읽는다)
          'languageQuests.en.correct': 2,
          // 통계 화면의 언어별 보기 — 문제 수, 시간은 문제 수 비율로 (30초 × 2/3)
          'languageQuests.en.totalQuestions': 2,
          'languageQuests.en.studyTimeSeconds': 20,
          'languageQuests.en.categoryCounts.vocab': 2,
          'languageQuests.en.categoryCorrect.vocab': 2,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
  });

  it('still derives languages from question IDs when types and another language are supplied', async () => {
    const stored = [question('en')];
    const { service, stats, questions, questionQuery } = fixture(stored);
    await service.recordStudy(userId, {
      questionIds: stored.map((item) => item._id),
      questionTypes: [QuestionType.TYPE_ANSWER],
      targetLanguage: 'ko',
    });

    expect(questions.find).toHaveBeenCalledWith({
      _id: { $in: stored.map((item) => item._id) },
    });
    expect(questionQuery.select).toHaveBeenCalledWith(
      'type lessonCategory targetLanguage',
    );
    expect(stats.findOneAndUpdate).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        $addToSet: { studyLanguages: { $each: ['en'] } },
      }),
      expect.anything(),
    );
  });

  it('labels only trusted count-only modes and leaves an unknown challenge unclassified', async () => {
    const { service, stats } = fixture();
    await service.recordStudy(userId, {
      targetLanguage: 'ko',
      questionCount: 1,
      overrideCategory: StudyCategory.GRAMMAR,
    });
    expect(stats.findOneAndUpdate).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        $addToSet: { studyLanguages: { $each: ['ko'] } },
      }),
      expect.anything(),
    );

    stats.findOneAndUpdate.mockClear();
    await service.recordStudy(userId, {
      questionCount: 1,
      overrideCategory: StudyCategory.VOCAB,
    });
    expect(stats.findOneAndUpdate).toHaveBeenCalledWith(
      expect.anything(),
      {
        $inc: {
          studyTimeSeconds: 0,
          totalQuestions: 1,
          correctQuestions: 1,
          xpEarned: 0,
          'categoryCounts.vocab': 1,
          'categoryCorrect.vocab': 1,
        },
      },
      expect.anything(),
    );
  });

  it('does not infer a registered language from unsupported question metadata', async () => {
    const stored = [question('xx')];
    const { service, stats } = fixture(stored);
    await service.recordStudy(userId, {
      questionIds: stored.map((item) => item._id),
    });
    const writes = stats.findOneAndUpdate.mock.calls as unknown[][];
    expect(writes[0]?.[1]).not.toHaveProperty('$addToSet');
  });

  it('does not turn an empty request into a study day merely by supplying a language', async () => {
    const { service, stats } = fixture();
    await service.recordStudy(userId, { targetLanguage: 'ko' });
    expect(stats.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it.each([0, 3])(
    'records TOPIK language only with positive study credit: %i answers',
    async (answeredCount) => {
      const session = {};
      const stats = { findOneAndUpdate: jest.fn().mockResolvedValue({}) };
      const service = new TopikStatsService(
        {} as never,
        {} as never,
        {} as never,
        {} as never,
        {} as never,
        {} as never,
        stats as never,
        { findById: jest.fn(() => query({ timezone: tz })) } as never,
      );
      const daily = service as unknown as {
        updateDailyStats(
          attempt: {
            userId: Types.ObjectId;
            submittedAt: Date;
            elapsedSeconds: number;
            correctCount: number;
          },
          answeredCount: number,
          session: object,
        ): Promise<void>;
      };
      await daily.updateDailyStats(
        {
          userId: new Types.ObjectId(userId),
          submittedAt: new Date(),
          elapsedSeconds: 60,
          correctCount: Math.min(2, answeredCount),
        },
        answeredCount,
        session,
      );
      expect(stats.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: new Types.ObjectId(userId), date: localDay('2026-10-20') },
        {
          ...(answeredCount > 0 ? { $addToSet: { studyLanguages: 'ko' } } : {}),
          $inc: {
            studyTimeSeconds: 60,
            totalQuestions: answeredCount,
            correctQuestions: Math.min(2, answeredCount),
            'categoryCounts.topik': answeredCount,
          },
        },
        { upsert: true, session },
      );
    },
  );
});

describe('calendar language activity contract', () => {
  it.each([
    { zone: 'Asia/Tashkent', utcOffset: '+05:00' },
    { zone: 'America/Los_Angeles', utcOffset: '-07:00' },
    { zone: 'Pacific/Kiritimati', utcOffset: '+14:00' },
  ])(
    'returns the selected local month without changing global streak fields: $zone',
    async ({ zone, utcOffset }) => {
      const monthDay = (date: string) =>
        new Date(`${date}T00:00:00${utcOffset}`);
      const rows = [
        {
          date: monthDay('2026-10-01'),
          totalQuestions: 1,
          studyLanguages: ['en'],
        },
        { date: monthDay('2026-10-02'), totalQuestions: 1 },
        {
          date: monthDay('2026-10-31'),
          totalQuestions: 2,
          studyLanguages: ['ko', 'en'],
        },
      ];
      const user = {
        timezone: zone,
        streakFrozenDays: [monthDay('2026-10-03')],
      };
      const stats = { find: jest.fn(() => query(rows)) };
      const service = new UsersService(
        { findById: jest.fn(() => query(user)) } as never,
        stats as never,
        {} as never,
        {} as never,
        {} as never,
        {} as never,
        {} as never,
      );
      const result = await service.getCalendar(userId, 2026, 10);

      expect(result.completedDays).toEqual([1, 2, 31]);
      expect(result.frozenDays).toEqual([3]);
      expect(result.longestStreak).toBe(2);
      expect(result.languageActivity).toEqual({
        languages: [
          { targetLanguage: 'en', days: 2 },
          { targetLanguage: 'ko', days: 1 },
        ],
        unclassifiedDays: 1,
      });
      expect(stats.find).toHaveBeenNthCalledWith(1, {
        userId: new Types.ObjectId(userId),
        date: { $gte: monthDay('2026-10-01'), $lt: monthDay('2026-11-01') },
        $or: [{ xpEarned: { $gt: 0 } }, { totalQuestions: { $gt: 0 } }],
      });
    },
  );
});
