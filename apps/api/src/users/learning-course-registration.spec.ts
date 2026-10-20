describe('language registration compatibility', () => {
  afterEach(() => jest.dontMock('../common/learning-course'));

  it('keeps canonical regional language codes instead of falling back to Korean', () => {
    let modes: typeof import('./learn-mode.constants');
    jest.isolateModules(() => {
      jest.doMock('../common/learning-course', () => {
        const actual = jest.requireActual<
          typeof import('../common/learning-course')
        >('../common/learning-course');
        return {
          ...actual,
          LEARNING_COURSES: [
            ...actual.LEARNING_COURSES,
            {
              courseId: 'pt-general',
              targetLanguage: 'pt-BR',
              speechLocale: 'pt-BR',
              title: { en: 'Portuguese' },
              modes: ['vocabulary'],
            },
          ],
        };
      });
      modes = jest.requireActual<typeof import('./learn-mode.constants')>(
        './learn-mode.constants',
      );
    });
    expect(modes!.courseOf('PT-br')).toBe('pt-BR');
    expect(modes!.courseOf('english')).toBe('en');
    expect(modes!.courseOf('korean')).toBe('ko');
    expect(modes!.LEARN_COURSES).toContain('pt-BR');
    expect(modes!.COURSE_MODES).toMatchObject({ 'pt-BR': ['vocabulary'] });
    expect(modes!.COURSE_LANGUAGE).toMatchObject({ 'pt-BR': 'pt-BR' });
  });
});
