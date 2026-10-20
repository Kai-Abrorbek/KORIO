/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */

import { StudyPathService } from './study-path.service';
import { resolveCourseScope } from '../common/learning-course';

describe('guided study course boundary', () => {
  const en = resolveCourseScope({ targetLanguage: 'en' });
  const userId = '507f1f77bcf86cd799439011';

  it.each([
    [
      'path',
      (service: StudyPathService) => service.getStudyPath(userId, 'uz', en),
    ],
    [
      'score',
      (service: StudyPathService) => service.getScore(userId, 'uz', en),
    ],
    [
      'levels',
      (service: StudyPathService) => service.getLevels(userId, 'uz', en),
    ],
    [
      'set level',
      (service: StudyPathService) => service.setLevel(userId, 1, en),
    ],
    [
      'exam',
      (service: StudyPathService) => service.getLevelExam(userId, 'uz', 1, en),
    ],
    [
      'complete exam',
      (service: StudyPathService) =>
        service.completeLevelExam(userId, {} as any, en),
    ],
    [
      'complete node',
      (service: StudyPathService) =>
        service.completeNode(userId, 1, 1, 'vocabQuiz', 1, 1, en),
    ],
  ])(
    'rejects English %s before reading or mutating any Korean state',
    async (_name, invoke) => {
      const service = new (StudyPathService as any)();
      await expect(
        (invoke as (service: StudyPathService) => Promise<unknown>)(service),
      ).rejects.toThrow('COURSE_MODE_UNAVAILABLE');
    },
  );
});
// Exercise real services without initializing circular Mongo schema decorators.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
