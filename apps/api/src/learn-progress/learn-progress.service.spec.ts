// 서비스·스키마는 가짜로 — 진짜 스키마를 불러오면 레슨↔문제 스키마 순환 import 가 jest 에서 터진다
jest.mock('../lessons/lessons.service', () => ({ LessonsService: class {} }));
jest.mock('../study-path/study-path.service', () => ({
  StudyPathService: class {},
}));
jest.mock('../expressions/roadmap/expression-roadmap.service', () => ({
  ExpressionRoadmapService: class {},
}));
jest.mock('../grammer/schemas/grammar.schema', () => ({
  Grammar: class Grammar {},
}));
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../reading-lessons/schemas/reading-lesson.schema', () => ({
  ReadingLesson: class ReadingLesson {},
}));
jest.mock('../reading-lessons/schemas/reading-lesson-progress.schema', () => ({
  ReadingLessonProgress: class ReadingLessonProgress {},
}));
jest.mock('../expressions/schemas/expression.schema', () => ({
  Expression: class Expression {},
}));
jest.mock('../expressions/schemas/user-speaking-progress.schema', () => ({
  UserSpeakingProgress: class UserSpeakingProgress {},
}));
jest.mock('../topik/schemas/topik-exam.schema', () => ({
  TopikExam: class TopikExam {},
}));

import { Types } from 'mongoose';
import { LearnProgressService } from './learn-progress.service';

const USER = new Types.ObjectId().toString();

/** findById().select().lean() 사슬 */
const chain = (value: unknown) => ({
  select: () => ({ lean: () => Promise.resolve(value) }),
});

function build(me: Record<string, unknown> | null) {
  const lessonsService = {
    getRoadmap: jest.fn(() =>
      Promise.resolve({
        currentSection: 2,
        units: [
          { nodes: [{ completedLessons: 4, totalLessons: 4 }] },
          { nodes: [{ completedLessons: 1, totalLessons: 6 }] },
        ],
      }),
    ),
  };
  const studyPathService = {
    getStudyPath: jest.fn(() =>
      Promise.resolve({
        currentLevel: 1,
        days: [
          { status: 'completed' },
          { status: 'completed' },
          { status: 'current' },
          { status: 'locked' },
        ],
      }),
    ),
  };
  const expressionRoadmapService = { getRoadmap: jest.fn() };
  const userModel = { findById: jest.fn(() => chain(me)) };
  const none = {} as never;
  const service = new LearnProgressService(
    lessonsService as never,
    studyPathService as never,
    expressionRoadmapService as never,
    userModel as never,
    none,
    none,
    none,
    none,
    none,
    none,
    none,
    none,
  );
  return {
    service,
    lessonsService,
    studyPathService,
    expressionRoadmapService,
  };
}

const ME = {
  targetLanguage: 'korean',
  learnMode: 'vocabulary',
  studyMode: 'free',
  topikLevel: '1',
  completedGrammar: [],
};

describe('LearnProgressService', () => {
  it('자율 어휘 — 로드맵 지금 섹션의 레슨', async () => {
    const { service, lessonsService } = build(ME);
    await expect(service.get(USER)).resolves.toEqual({
      course: 'ko',
      mode: 'vocabulary',
      scope: 'section',
      scopeNumber: 2,
      title: null,
      unit: 'lesson',
      done: 5,
      total: 10,
      percent: 50,
    });
    expect(lessonsService.getRoadmap).toHaveBeenCalledWith(
      USER,
      'uz',
      undefined,
    );
  });

  it('문법 문제 풀이 — 문법 트랙 로드맵', async () => {
    const { service, lessonsService } = build(ME);
    const result = await service.get(USER, {
      mode: 'grammarPractice',
      lang: 'ru',
    });
    expect(result?.mode).toBe('grammarPractice');
    expect(lessonsService.getRoadmap).toHaveBeenCalledWith(
      USER,
      'ru',
      'grammar',
    );
  });

  it('학습 로드 어휘 — 지금 급의 하루', async () => {
    const { service, studyPathService } = build({ ...ME, studyMode: 'guided' });
    await expect(service.get(USER)).resolves.toMatchObject({
      scope: 'level',
      scopeNumber: 1,
      unit: 'day',
      done: 2,
      total: 4,
      percent: 50,
    });
    expect(studyPathService.getStudyPath).toHaveBeenCalled();
  });

  it('앱이 보낸 코스·모드가 계정 값보다 먼저 (모드를 막 바꾼 직후)', async () => {
    const { service, studyPathService, lessonsService } = build({
      ...ME,
      studyMode: 'guided',
    });
    await service.get(USER, { studyMode: 'free' });
    expect(studyPathService.getStudyPath).not.toHaveBeenCalled();
    expect(lessonsService.getRoadmap).toHaveBeenCalled();
  });

  it('셀 진도가 없는 모드·코스는 null', async () => {
    const { service } = build(ME);
    await expect(
      service.get(USER, { mode: 'conversation' }),
    ).resolves.toBeNull();
    await expect(
      service.get(USER, { course: 'en', mode: 'alphabet' }),
    ).resolves.toBeNull();
  });

  it('코스에 없는 모드는 null (영어 코스에 어휘)', async () => {
    const { service, lessonsService } = build({
      ...ME,
      targetLanguage: 'english',
    });
    await expect(service.get(USER)).resolves.toBeNull();
    expect(lessonsService.getRoadmap).not.toHaveBeenCalled();
  });

  it('계산이 터져도 홈은 안 깨진다 — null', async () => {
    const { service, lessonsService } = build(ME);
    lessonsService.getRoadmap.mockRejectedValueOnce(new Error('boom'));
    await expect(service.get(USER)).resolves.toBeNull();
  });
});
