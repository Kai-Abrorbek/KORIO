import { dateParts, dayKey } from '../../common/date.util';
import { LEARNING_COURSES } from '../../common/learning-course';

export interface LanguageActivityRow {
  date: Date | string | number;
  totalQuestions?: number;
  xpEarned?: number;
  studyLanguages?: unknown;
}

export interface LanguageActivity {
  languages: { targetLanguage: string; days: number }[];
  unclassifiedDays: number;
}

/** Only registered content languages can become stored Mongo/activity values. */
export function knownStudyLanguages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const registered = new Set<string>(
    LEARNING_COURSES.map((course) => course.targetLanguage),
  );
  return [
    ...new Set(
      value.filter(
        (language): language is string =>
          typeof language === 'string' && registered.has(language),
      ),
    ),
  ];
}

/**
 * Distinct study dates in the selected user-local month, not language streaks.
 * Missing historical metadata is unknown, not evidence of Korean activity.
 * A partially annotated legacy date cannot recover its earlier languages.
 */
export function summarizeLanguageActivity(
  rows: readonly LanguageActivityRow[],
  year: number,
  month: number,
  tz: string,
): LanguageActivity {
  const byDate = new Map<string, Set<string>>();
  for (const row of rows) {
    if (!((row.totalQuestions ?? 0) > 0 || (row.xpEarned ?? 0) > 0)) continue;
    const date = new Date(row.date);
    if (!Number.isFinite(date.getTime())) continue;
    const parts = dateParts(date, tz);
    if (parts.year !== year || parts.month !== month) continue;
    const key = dayKey(date, tz);
    const languages = byDate.get(key) ?? new Set<string>();
    for (const language of knownStudyLanguages(row.studyLanguages)) {
      languages.add(language);
    }
    byDate.set(key, languages);
  }

  const counts = new Map<string, number>();
  let unclassifiedDays = 0;
  for (const languages of byDate.values()) {
    if (!languages.size) unclassifiedDays += 1;
    for (const language of languages) {
      counts.set(language, (counts.get(language) ?? 0) + 1);
    }
  }
  return {
    languages: [...counts]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([targetLanguage, days]) => ({ targetLanguage, days })),
    unclassifiedDays,
  };
}
