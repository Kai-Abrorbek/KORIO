import {
  knownStudyLanguages,
  summarizeLanguageActivity,
  type LanguageActivityRow,
} from './language-activity.util';

const tz = 'Asia/Tashkent';
const row = (
  date: string,
  studyLanguages?: unknown,
  totalQuestions = 1,
): LanguageActivityRow => ({
  date: new Date(`${date}T00:00:00+05:00`),
  studyLanguages,
  totalQuestions,
});

describe('monthly language study activity', () => {
  it('counts each language once per date, including mixed-language dates', () => {
    expect(
      summarizeLanguageActivity(
        [
          row('2026-10-01', ['ko', 'en', 'ko']),
          row('2026-10-02', ['ko']),
          row('2026-10-02', ['ko', 'en']),
          row('2026-10-03', ['en']),
        ],
        2026,
        10,
        tz,
      ),
    ).toEqual({
      languages: [
        { targetLanguage: 'en', days: 3 },
        { targetLanguage: 'ko', days: 2 },
      ],
      unclassifiedDays: 0,
    });
  });

  it('keeps missing historical languages unclassified instead of assuming Korean', () => {
    expect(
      summarizeLanguageActivity(
        [row('2026-10-01'), row('2026-10-01'), row('2026-10-02', [])],
        2026,
        10,
        tz,
      ),
    ).toEqual({ languages: [], unclassifiedDays: 2 });
  });

  it('does not invent earlier languages on partially annotated historical dates', () => {
    expect(
      summarizeLanguageActivity(
        [row('2026-10-01'), row('2026-10-01', ['en'])],
        2026,
        10,
        tz,
      ),
    ).toEqual({
      languages: [{ targetLanguage: 'en', days: 1 }],
      unclassifiedDays: 0,
    });
  });

  it('ignores freeze-only, quest-only and empty rows without global study credit', () => {
    expect(
      summarizeLanguageActivity(
        [
          row('2026-10-01', ['ko'], 0),
          { ...row('2026-10-02', ['en'], 0), xpEarned: 0 },
          { ...row('2026-10-03', ['en'], 0), xpEarned: 5 },
        ],
        2026,
        10,
        tz,
      ),
    ).toEqual({
      languages: [{ targetLanguage: 'en', days: 1 }],
      unclassifiedDays: 0,
    });
  });

  it('uses the selected local month, including its first and last dates', () => {
    expect(
      summarizeLanguageActivity(
        [
          row('2026-09-30', ['ko']),
          row('2026-10-01', ['en']),
          row('2026-10-31', ['en']),
          row('2026-11-01', ['ko']),
        ],
        2026,
        10,
        tz,
      ),
    ).toEqual({
      languages: [{ targetLanguage: 'en', days: 2 }],
      unclassifiedDays: 0,
    });
  });

  it('ignores invalid dates and treats unsupported languages as unclassified', () => {
    expect(
      summarizeLanguageActivity(
        [
          { date: 'invalid', totalQuestions: 1, studyLanguages: ['ko'] },
          row('2026-10-01', ['xx', '', null, 3]),
          row('2026-10-02', { ko: true }),
          row('2026-10-03', ['en', 'xx']),
        ],
        2026,
        10,
        tz,
      ),
    ).toEqual({
      languages: [{ targetLanguage: 'en', days: 1 }],
      unclassifiedDays: 2,
    });
  });

  it('returns a stable empty response when no language tracking exists', () => {
    expect(summarizeLanguageActivity([], 2026, 10, tz)).toEqual({
      languages: [],
      unclassifiedDays: 0,
    });
    expect(knownStudyLanguages(['ko', 'en', 'en', 'unknown'])).toEqual([
      'ko',
      'en',
    ]);
  });
});
