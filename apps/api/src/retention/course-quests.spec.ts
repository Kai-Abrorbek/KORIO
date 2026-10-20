/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import { Types } from 'mongoose';
import { resolveCourseScope } from '../common/learning-course';
import { dayKey } from '../common/date.util';
import {
  languageQuestInc,
  languageQuestValue,
} from '../users/utils/quest-counter.util';
import { RetentionService } from './retention.service';
import type { QuestPick } from './quest-picker';

jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

const ko = resolveCourseScope();
const en = resolveCourseScope({ targetLanguage: 'en' });

/** 오늘: 한국어 정답 30 · 영어 정답 12, 한국어 레슨 2판 · 영어 1판 */
const row = {
  xpEarned: 300,
  studyTimeSeconds: 1200,
  correctQuestions: 42,
  questCounters: { sessions: 3, accurate: 2, mistakes: 4, follow: 1 },
  categoryCounts: { vocab: 30, grammar: 12 },
  categoryCorrect: { vocab: 26, grammar: 8 },
  languageQuests: {
    en: {
      correct: 12,
      sessions: 1,
      accurate: 1,
      mistakes: 1,
      categoryCounts: { vocab: 14 },
      categoryCorrect: { vocab: 12 },
    },
  },
};

describe('언어별 문제 퀘스트 카운터', () => {
  it('영어는 자기 칸, 한국어는 합계 − 다른 언어', () => {
    expect(languageQuestValue(row, 'en', 'correct')).toBe(12);
    expect(languageQuestValue(row, 'ko', 'correct')).toBe(30);
    expect(languageQuestValue(row, 'ko', 'sessions')).toBe(2);
    expect(languageQuestValue(row, 'en', 'categoryCounts.vocab')).toBe(14);
    expect(languageQuestValue(row, 'ko', 'categoryCounts.vocab')).toBe(16);
    expect(languageQuestValue(row, 'ko', 'categoryCounts.grammar')).toBe(12);
  });

  it('언어별 칸이 없는 옛 기록은 전부 한국어', () => {
    const legacy = { correctQuestions: 20, questCounters: { sessions: 2 } };
    expect(languageQuestValue(legacy, 'ko', 'correct')).toBe(20);
    expect(languageQuestValue(legacy, 'en', 'correct')).toBe(0);
    expect(languageQuestValue(legacy, 'ko', 'sessions')).toBe(2);
  });

  it('증가분 키를 언어 칸 아래로 옮긴다', () => {
    expect(
      languageQuestInc('en', {
        correct: 3,
        'questCounters.sessions': 1,
        'categoryCounts.vocab': 4,
        xpEarned: 0,
      }),
    ).toEqual({
      'languageQuests.en.correct': 3,
      'languageQuests.en.sessions': 1,
      'languageQuests.en.categoryCounts.vocab': 4,
    });
  });
});

describe('일일 퀘스트 — 코스마다 문제 퀘스트만 다르게', () => {
  const tz = 'Asia/Tashkent';
  const today = dayKey(new Date(), tz);
  const picks: QuestPick[] = [
    { slot: 'easy', kind: 'xp', target: 100 },
    {
      slot: 'normal',
      kind: 'correct',
      target: 25,
      courses: {
        'ko-general': { kind: 'correct', target: 25 },
        'en-general': { kind: 'correct', target: 25 },
      },
    },
    {
      slot: 'hard',
      kind: 'category',
      target: 12,
      category: 'grammar',
      courses: {
        'ko-general': { kind: 'category', target: 12, category: 'grammar' },
        // 영어엔 문법이 없어서 레슨 퀘스트로 바뀌어 있다
        'en-general': { kind: 'sessions', target: 1 },
      },
    },
  ];

  function service(claimed: string[] = []) {
    const statsModel = {
      findOne: jest.fn(() => ({
        select: () => ({ lean: () => Promise.resolve(row) }),
      })),
    };
    const svc = new RetentionService(
      {} as never,
      statsModel as never,
      {} as never,
      {} as never,
      {} as never,
    );
    const me = {
      _id: new Types.ObjectId(),
      dailyQuestState: { day: today, claimed, picks, rerolls: 0 },
    };
    const questsFor = (scope: typeof ko) =>
      (svc as any).questsFor(me, tz, today, scope) as Promise<any>;
    return { questsFor };
  }

  it('공통 퀘스트는 같고, 문제 퀘스트는 그 언어 것만 센다', async () => {
    const { questsFor } = service();
    const koView = await questsFor(ko);
    const enView = await questsFor(en);
    const bySlot = (view: any, slot: string) =>
      view.slots.find((s: any) => s.slot === slot);

    expect(bySlot(koView, 'easy')).toMatchObject({
      kind: 'xp',
      course: null,
      progress: 100,
      done: true,
    });
    expect(bySlot(enView, 'easy')).toMatchObject({
      kind: 'xp',
      course: null,
      progress: 100,
    });

    expect(bySlot(koView, 'normal')).toMatchObject({
      kind: 'correct',
      course: 'ko',
      progress: 25,
      done: true,
    });
    expect(bySlot(enView, 'normal')).toMatchObject({
      kind: 'correct',
      course: 'en',
      progress: 12,
      done: false,
    });

    expect(bySlot(koView, 'hard')).toMatchObject({
      kind: 'category',
      category: 'grammar',
      course: 'ko',
      progress: 12,
      done: true,
    });
    expect(bySlot(enView, 'hard')).toMatchObject({
      kind: 'sessions',
      course: 'en',
      progress: 1,
      done: true,
    });
  });

  it('칸은 하나 — 한국어로 받은 칸은 영어 화면에서도 받은 칸 (보상 두 번 없음)', async () => {
    const { questsFor } = service(['normal']);
    const enView = await questsFor(en);
    const normal = enView.slots.find((s: any) => s.slot === 'normal');
    expect(normal).toMatchObject({ claimed: true, done: true, progress: 25 });
  });

  it('상자는 세 칸이 (그 언어로든 받아서든) 다 끝나야 열린다', async () => {
    expect((await service().questsFor(en)).chest.ready).toBe(false);
    expect((await service(['normal']).questsFor(en)).chest.ready).toBe(true);
    expect((await service().questsFor(ko)).chest.ready).toBe(true);
  });
});
