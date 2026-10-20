/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { Types } from 'mongoose';
import { UsersService } from './users.service';

jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: {
    createForClass: () => ({ index: () => undefined, pre: () => undefined }),
  },
}));

const tz = 'Asia/Tashkent';
const userId = new Types.ObjectId().toString();

/** 오늘: 한국어 30문제·20분 + 영어 10문제·5분 */
function todayRow() {
  return {
    userId: new Types.ObjectId(userId),
    date: new Date('2026-10-20T00:00:00+05:00'),
    xpEarned: 400,
    studyTimeSeconds: 1500,
    totalQuestions: 40,
    correctQuestions: 33,
    categoryCounts: { vocab: 25, grammar: 15 },
    categoryCorrect: { vocab: 22, grammar: 11 },
    studyLanguages: ['ko', 'en'],
    languageQuests: {
      en: {
        correct: 8,
        totalQuestions: 10,
        studyTimeSeconds: 300,
        categoryCounts: { vocab: 10 },
        categoryCorrect: { vocab: 8 },
      },
    },
  };
}

function setup() {
  const rows = [todayRow()];
  const chain = () => {
    const q: any = {
      select: jest.fn(() => q),
      sort: jest.fn(() => q),
      lean: jest.fn(() => Promise.resolve(rows.map((row) => ({ ...row })))),
    };
    return q;
  };
  const statsModel = { find: jest.fn(chain) };
  const userModel = {
    findById: jest.fn(() => ({
      lean: () => Promise.resolve({ createdAt: new Date('2026-09-01') }),
    })),
  };
  const service = new UsersService(
    userModel as never,
    statsModel as never,
    null as never,
    null as never,
    null as never,
    null as never,
    null as never,
  );
  jest.spyOn(service, 'getTimezone').mockResolvedValue(tz);
  return { service, statsModel };
}

describe('통계 화면 — 언어별 보기', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-10-20T12:00:00+05:00'));
  });
  afterEach(() => jest.useRealTimers());

  it('기간 통계: 오늘·히트맵이 그 언어 몫만, 공부한 언어 목록을 같이 준다', async () => {
    const { service } = setup();
    const en: any = await service.getPeriodStats(
      userId,
      'week',
      undefined,
      'uz',
      'en',
    );
    expect(en.targetLanguage).toBe('en');
    expect(en.studiedLanguages).toEqual(['ko', 'en']);
    expect(en.today.totalQuestions).toBe(10);
    expect(en.today.studyTimeLabel).toBe('05:00');
    expect(en.today.categories).toEqual([
      expect.objectContaining({ category: 'vocab', total: 10 }),
    ]);
    // 5분 → 2단계, 한국어 20분 → 3단계
    expect(en.heatmap[en.heatmap.length - 1].intensity).toBe(2);

    const ko: any = await service.getPeriodStats(
      userId,
      'week',
      undefined,
      'uz',
      'ko',
    );
    expect(ko.today.totalQuestions).toBe(30);
    expect(ko.heatmap[ko.heatmap.length - 1].intensity).toBe(3);
  });

  it('언어를 안 보내면 (옛 앱) 예전처럼 모든 언어 합계', async () => {
    const { service } = setup();
    const all: any = await service.getPeriodStats(userId, 'week', undefined);
    expect(all.targetLanguage).toBeNull();
    expect(all.today.totalQuestions).toBe(40);
  });

  it('등록 안 된 언어는 400', async () => {
    const { service } = setup();
    await expect(
      service.getPeriodStats(userId, 'week', undefined, 'uz', 'xx'),
    ).rejects.toThrow('INVALID_LEARNING_COURSE');
  });

  it('스킬 레이더는 그 언어로 푼 문제만', async () => {
    const { service } = setup();
    const en: any = await service.getSkillRadar(userId, 90, 'en');
    expect(en.totalAttempted).toBe(10);
    const ko: any = await service.getSkillRadar(userId, 90, 'ko');
    expect(ko.totalAttempted).toBe(30);
  });

  it('분야 통계도 그 언어 몫 (전체 문제 수·오늘 시간)', async () => {
    const { service } = setup();
    const en: any = await service.getCategoryStats(
      userId,
      'vocab',
      'week',
      undefined,
      'uz',
      'en',
    );
    expect(en.totalProblems).toBe(10);
    // 영어 5분 전부가 어휘
    expect(en.todayTime).toBe(service['formatTime'](300));
    expect(en.chart[en.chart.length - 1].newWords).toBe(10);

    const ko: any = await service.getCategoryStats(
      userId,
      'vocab',
      'week',
      undefined,
      'uz',
      'ko',
    );
    expect(ko.totalProblems).toBe(15);
  });
});
