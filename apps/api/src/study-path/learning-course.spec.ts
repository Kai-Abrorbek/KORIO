/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */

import { Types } from 'mongoose';
import { StudyPathService } from './study-path.service';
import { resolveCourseScope } from '../common/learning-course';

// Exercise real services without initializing circular Mongo schema decorators.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));

const en = resolveCourseScope({ targetLanguage: 'en' });
const ko = resolveCourseScope();
const userId = '507f1f77bcf86cd799439011';

/** 한국어 진도는 최상위, 영어 진도는 courseProgress['en-general'] */
const userDoc = {
  completedStudyNodes: ['1-1-words-1-1'],
  completedGrammar: ['g1'],
  placementLevel: 3,
  placementLevelSetAt: new Date(),
  completedLevelExams: [1, 2],
  gems: 10,
  courseProgress: {
    'en-general': {
      completedStudyNodes: [],
      placementLevel: 1,
    },
  },
};

function setup(me: any = userDoc) {
  const lean = (value: unknown) => ({
    select: () => ({ lean: () => Promise.resolve(value) }),
    lean: () => Promise.resolve(value),
  });
  const ok = <T>(value: T) => jest.fn(() => Promise.resolve(value));
  const userModel = {
    findById: jest.fn(() => lean(me)),
    updateOne: ok({}),
    findOneAndUpdate: ok({ gems: 60 }),
  };
  const grammarModel = {
    find: jest.fn(() => lean([{ code: 'g1', section: 1, unit: 1 }])),
  };
  const nodeModel = {
    find: jest.fn(() => lean([])),
    distinct: ok([1, 2, 3]),
    exists: ok({ _id: 'n' }),
  };
  const lessonsService = {
    getRoadmap: ok({
      currentSection: 1,
      units: [{ sectionNumber: 1, unitNumber: 1, title: 'Unit 1' }],
    }),
    countSectionQuestions: ok(
      new Map([
        ['1:vocabulary', 30],
        ['1:grammar', 20],
      ]),
    ),
    getLevelExam: ok({ questions: [] }),
    countExamQuestionsInRange: ok(25),
    recordStudy: ok(undefined),
    addXp: ok({ added: 50, totalXP: 500 }),
  };
  const wordsService = {
    getSectionSummary: ok({ units: [{ unit: 1, words: 12, new: 12 }] }),
  };
  const chestService = {
    pendingCount: ok(0),
    earn: ok(undefined),
  };
  const gemLedger = { record: ok(undefined) };
  const service = new StudyPathService(
    lessonsService as any,
    chestService as any,
    wordsService as any,
    grammarModel as any,
    nodeModel as any,
    userModel as any,
    {} as any,
    gemLedger as any,
  );
  return {
    service,
    userModel,
    grammarModel,
    nodeModel,
    lessonsService,
    wordsService,
    chestService,
  };
}

/** updateOne / findOneAndUpdate 에 넘긴 경로 전부 */
function writtenPaths(mock: jest.Mock): string[] {
  return mock.mock.calls.flatMap((call: any[]) => {
    const update = call[1] ?? {};
    return Object.values(update).flatMap((ops: any) => Object.keys(ops));
  });
}

describe('guided study path — English reuses the Korean structure', () => {
  it('builds English days from English content and English progress only', async () => {
    const t = setup();
    const path = await t.service.getStudyPath(userId, 'uz', en);

    expect(t.lessonsService.getRoadmap).toHaveBeenCalledWith(
      userId,
      'uz',
      undefined,
      true,
      undefined,
      en,
    );
    expect(t.lessonsService.countSectionQuestions).toHaveBeenCalledWith(1, en);
    expect(t.wordsService.getSectionSummary).toHaveBeenCalledWith(
      userId,
      1,
      en,
    );
    expect(t.grammarModel.find).toHaveBeenCalledWith({
      isActive: true,
      section: { $in: [1] },
      $and: [{ targetLanguage: 'en' }, { courseId: 'en-general' }],
    });
    const kinds = path.days.flatMap((day) => day.nodes.map((n) => n.kind));
    expect(kinds).toEqual(
      expect.arrayContaining([
        'words',
        'grammar',
        'vocabQuiz',
        'recap',
        'grammarQuiz',
        'final',
      ]),
    );

    expect(path.courseId).toBe('en-general');
    // 한국어 급수를 골랐어도 영어는 아직 안 고른 것
    expect(path.levelPicked).toBe(false);
    expect(path.currentLevel).toBe(1);
    // 한국어에서 끝낸 words 노드가 영어 노드를 완료로 만들지 않는다
    const words = path.days[0].nodes.find((n) => n.kind === 'words');
    expect(words?.done).toBe(false);
    expect(path.nextLevel?.title).toBe('2-daraja · A2 Kundalik ingliz tili');
  });

  it('keeps the Korean path on the legacy fields', async () => {
    const t = setup();
    const path = await t.service.getStudyPath(userId, 'uz', ko);
    expect(t.grammarModel.find).toHaveBeenCalled();
    expect(path.courseId).toBe('ko-general');
    expect(path.levelPicked).toBe(true);
    expect(path.currentLevel).toBe(3);
  });

  it('completing an English node writes only English progress and an English chest key', async () => {
    const t = setup();
    await t.service.completeNode(userId, 1, 1, 'vocabQuiz', 1, 1, en);
    const paths = writtenPaths(t.userModel.updateOne);
    expect(paths).toEqual(['courseProgress.en-general.completedStudyNodes']);
    for (const call of t.chestService.earn.mock.calls as any[][]) {
      expect(String(call[1])).toMatch(/^day:en-general:/);
    }
  });

  it('setting an English level never moves the Korean level', async () => {
    const t = setup();
    await t.service.setLevel(userId, 1, en);
    expect(writtenPaths(t.userModel.updateOne).sort()).toEqual([
      'courseProgress.en-general.placementLevel',
      'courseProgress.en-general.placementLevelSetAt',
      'courseProgress.en-general.studyLevelUnlocked',
    ]);
  });

  it('English levels use English names and English unlock state', async () => {
    const t = setup();
    const result = await t.service.getLevels(userId, 'en', en);
    expect(result.current).toBe(1);
    // 한국어 2급까지 통과했어도 영어는 1단계만 열려 있다
    expect(result.unlocked).toBe(1);
    expect(result.levels[0].title).toBe('Level 1 · A1 Starter');
  });

  it('passing the English exam rewards and unlocks within the English course', async () => {
    const t = setup();
    const ids = Array.from({ length: 25 }, () =>
      new Types.ObjectId().toString(),
    );
    const result = await t.service.completeLevelExam(
      userId,
      { questionIds: ids, wrongQuestionIds: [], lang: 'en' } as any,
      en,
    );
    expect(t.lessonsService.countExamQuestionsInRange).toHaveBeenCalledWith(
      [1, 2],
      expect.any(Array),
      en,
    );
    expect(result.passed).toBe(true);
    const [filter, update] = t.userModel.findOneAndUpdate.mock
      .calls[0] as any[];
    expect(filter).toMatchObject({
      'courseProgress.en-general.completedLevelExams': { $ne: 1 },
    });
    expect(Object.keys(update.$addToSet)).toEqual([
      'courseProgress.en-general.completedLevelExams',
    ]);
    expect(writtenPaths(t.userModel.updateOne).sort()).toEqual([
      'courseProgress.en-general.placementLevel',
      'courseProgress.en-general.placementLevelSetAt',
      'courseProgress.en-general.studyLevelUnlocked',
    ]);
    expect(result.nextLevelMeta?.title.en).toBe(
      'Level 2 · A2 Everyday English',
    );
  });

  it('rejects an unknown course', async () => {
    const t = setup();
    await expect(
      t.service.getStudyPath(userId, 'uz', {
        courseId: 'xx-general',
        targetLanguage: 'xx',
      }),
    ).rejects.toThrow('INVALID_LEARNING_COURSE');
  });
});
