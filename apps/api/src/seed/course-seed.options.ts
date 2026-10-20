import {
  resolveCourseScope,
  type CourseScope,
} from '../common/learning-course';

/** Existing commands stay Korean-only; another course must be selected explicitly. */
export function parseSeedCourseScope(
  args = process.argv.slice(2),
): CourseScope {
  let courseId: string | undefined;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--') continue;
    const value = arg.startsWith('--courseId=')
      ? arg.slice('--courseId='.length)
      : arg === '--courseId'
        ? args[++index]
        : undefined;
    if (!value || value.startsWith('--')) {
      throw new Error(
        `Unsupported seed option: ${arg}. Use --courseId=<course>.`,
      );
    }
    if (courseId) throw new Error('Specify --courseId only once.');
    courseId = value;
  }
  return resolveCourseScope({ courseId });
}
