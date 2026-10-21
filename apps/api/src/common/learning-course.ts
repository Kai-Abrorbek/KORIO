import { BadRequestException } from '@nestjs/common';

export interface CourseScope {
  courseId: string;
  targetLanguage: string;
}

export const DEFAULT_COURSE_ID = 'ko-general';
export const DEFAULT_TARGET_LANGUAGE = 'ko';

/** Register content and speech support here; language is not a per-collection enum. */
export const LEARNING_COURSES = [
  {
    courseId: DEFAULT_COURSE_ID,
    targetLanguage: 'ko',
    speechLocale: 'ko-KR',
    title: { ko: '한국어', uz: 'Koreys tili', en: 'Korean', ru: 'Корейский' },
    modes: [
      'vocabulary',
      'grammarPractice',
      'grammar',
      'expression',
      'speaking',
      'conversation',
      'listening',
      'topik',
    ],
  },
  {
    courseId: 'en-general',
    targetLanguage: 'en',
    speechLocale: 'en-US',
    title: { ko: '영어', uz: 'Ingliz tili', en: 'English', ru: 'Английский' },
    // conversation = AI 음성 튜터 (영어 튜터)
    modes: [
      'vocabulary',
      'alphabet',
      'grammarPractice',
      'grammar',
      'conversation',
    ],
  },
] as const;

export function resolveCourseScope(
  input: Partial<CourseScope> = {},
): CourseScope {
  const { courseId, targetLanguage } = input;
  const course = courseId
    ? LEARNING_COURSES.find((item) => item.courseId === courseId)
    : targetLanguage
      ? LEARNING_COURSES.find((item) => item.targetLanguage === targetLanguage)
      : LEARNING_COURSES[0];
  if (!course || (targetLanguage && course.targetLanguage !== targetLanguage)) {
    throw new BadRequestException('INVALID_LEARNING_COURSE');
  }
  return { courseId: course.courseId, targetLanguage: course.targetLanguage };
}

/** Old Korean documents remain readable without a destructive backfill. */
export function targetLanguageFilter(targetLanguage: string) {
  return targetLanguage === DEFAULT_TARGET_LANGUAGE
    ? { $or: [{ targetLanguage }, { targetLanguage: { $exists: false } }] }
    : { targetLanguage };
}

export function courseContentFilter(
  scope: CourseScope,
): Record<string, unknown> {
  return {
    $and: [
      targetLanguageFilter(scope.targetLanguage),
      scope.courseId === DEFAULT_COURSE_ID
        ? {
            $or: [
              { courseId: scope.courseId },
              { courseId: { $exists: false } },
            ],
          }
        : { courseId: scope.courseId },
    ],
  };
}

export function speechLocaleOf(
  targetLanguage = DEFAULT_TARGET_LANGUAGE,
): string {
  const language = LEARNING_COURSES.find(
    (course) => course.targetLanguage === targetLanguage,
  );
  if (!language) throw new BadRequestException('UNSUPPORTED_SPEECH_LANGUAGE');
  return language.speechLocale;
}

export interface CourseProgress {
  placementLevel?: number;
  placementLevelSetAt?: Date;
  studyLevelUnlocked?: number;
  completedGrammar?: string[];
  completedGrammarSections?: number[];
  legendNodes?: (string | { toString(): string })[];
  completedStudyNodes?: string[];
  completedLevelExams?: number[];
}

/** Korean continues to use the published fields; other courses never inherit them. */
export function getCourseProgress(
  user:
    | (CourseProgress & { courseProgress?: Record<string, CourseProgress> })
    | null
    | undefined,
  scope: CourseScope,
): CourseProgress {
  if (scope.courseId === DEFAULT_COURSE_ID) return user ?? {};
  return user?.courseProgress?.[scope.courseId] ?? {};
}

export function courseProgressPath(
  scope: CourseScope,
  field: keyof CourseProgress,
): string {
  // Scope must come from resolveCourseScope, never an arbitrary Mongo path.
  resolveCourseScope(scope);
  return scope.courseId === DEFAULT_COURSE_ID
    ? field
    : `courseProgress.${scope.courseId}.${field}`;
}
