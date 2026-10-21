import {
  LEARNING_COURSES,
  courseContentFilter,
  courseProgressPath,
  getCourseProgress,
  resolveCourseScope,
  speechLocaleOf,
} from './learning-course';

describe('learning course scope', () => {
  it('publishes both English grammar learning modes', () => {
    const english = LEARNING_COURSES.find(
      (course) => course.courseId === 'en-general',
    );
    expect(english?.modes).toEqual(
      expect.arrayContaining(['grammarPractice', 'grammar']),
    );
  });

  it('defaults old requests to Korean but rejects conflicting/unknown scopes', () => {
    expect(resolveCourseScope()).toEqual({
      courseId: 'ko-general',
      targetLanguage: 'ko',
    });
    expect(resolveCourseScope({ targetLanguage: 'en' })).toEqual({
      courseId: 'en-general',
      targetLanguage: 'en',
    });
    expect(() =>
      resolveCourseScope({ courseId: 'ko-general', targetLanguage: 'en' }),
    ).toThrow('INVALID_LEARNING_COURSE');
    expect(() => resolveCourseScope({ courseId: 'unknown' })).toThrow(
      'INVALID_LEARNING_COURSE',
    );
    expect(() => resolveCourseScope({ targetLanguage: 'xx' })).toThrow(
      'INVALID_LEARNING_COURSE',
    );
  });

  it('only Korean queries may include documents missing legacy metadata', () => {
    const ko = courseContentFilter(resolveCourseScope());
    const en = courseContentFilter(
      resolveCourseScope({ targetLanguage: 'en' }),
    );
    expect(JSON.stringify(ko)).toContain('$exists');
    expect(JSON.stringify(en)).not.toContain('$exists');
    expect(en).toEqual({
      $and: [{ targetLanguage: 'en' }, { courseId: 'en-general' }],
    });
  });

  it('isolates course placement and leaves legacy Korean progress untouched', () => {
    const user = {
      placementLevel: 4,
      completedStudyNodes: ['s1:u1'],
      courseProgress: { 'en-general': { placementLevel: 1 } },
    };
    expect(getCourseProgress(user, resolveCourseScope()).placementLevel).toBe(
      4,
    );
    expect(
      getCourseProgress(user, resolveCourseScope({ targetLanguage: 'en' })),
    ).toEqual({ placementLevel: 1 });
    expect(
      getCourseProgress(
        { placementLevel: 6 },
        resolveCourseScope({ targetLanguage: 'en' }),
      ),
    ).toEqual({});
    expect(courseProgressPath(resolveCourseScope(), 'placementLevel')).toBe(
      'placementLevel',
    );
    expect(
      courseProgressPath(
        resolveCourseScope({ targetLanguage: 'en' }),
        'placementLevel',
      ),
    ).toBe('courseProgress.en-general.placementLevel');
    expect(speechLocaleOf('en')).toBe('en-US');
    expect(speechLocaleOf('ko')).toBe('ko-KR');
  });
});
