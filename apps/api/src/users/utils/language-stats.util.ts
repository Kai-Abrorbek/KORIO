import { LEARNING_COURSES } from '../../common/learning-course';
import {
  LEGACY_QUEST_LANGUAGE,
  languageBucket,
  languageQuestValue,
  soleLegacyLanguage,
  type StatsRowForQuests,
} from './quest-counter.util';

/**
 * 통계 화면의 언어별 보기.
 *
 * UserStats 는 하루 한 문서에 모든 언어를 합쳐 쌓고, 언어별 몫은 languageQuests.<언어>
 * 칸에 따로 둔다 (recordStudy). 한국어는 칸이 없다 — 합계 − 다른 언어.
 * 그래서 언어별 칸이 생기기 전 기록은 전부 한국어로 보인다. 그날 배운 언어가 하나뿐이면
 * 그 언어로 본다 (quest-counter.util soleLegacyLanguage).
 *
 * XP 는 언어별로 안 센다 (보상·게임·상자 등 출처가 많다). 그래서 이 행에선 뺀다.
 */
export type LanguageStatsRow<T> = Omit<
  T,
  | 'studyTimeSeconds'
  | 'totalQuestions'
  | 'correctQuestions'
  | 'categoryCounts'
  | 'categoryCorrect'
  | 'xpEarned'
> & {
  studyTimeSeconds: number;
  totalQuestions: number;
  correctQuestions: number;
  categoryCounts: Record<string, number>;
  /** 그 언어에 정답 기록이 있는 분야만 키가 있다 (없으면 "모름" — 0 과 다르다) */
  categoryCorrect: Record<string, number>;
  xpEarned?: undefined;
};

function keysOf(source: unknown): string[] {
  if (!source || typeof source !== 'object') return [];
  return source instanceof Map
    ? [...(source.keys() as Iterable<string>)]
    : Object.keys(source);
}

/** 하루 통계 행을 한 언어 몫으로 */
export function languageStatsRow<T extends StatsRowForQuests>(
  row: T,
  language: string,
): LanguageStatsRow<T> {
  const value = (key: string) => languageQuestValue(row, language, key);
  const sole = soleLegacyLanguage(row);
  // 분야 키를 어디서 읽나 — 그 언어가 가진 분야만 (한국어는 합계 쪽 키에서 빼서 센다)
  const keySource: StatsRowForQuests | Record<string, unknown> | undefined =
    sole
      ? sole === language
        ? row
        : undefined
      : language === LEGACY_QUEST_LANGUAGE
        ? row
        : languageBucket(row, language);
  const byCategory = (field: 'categoryCounts' | 'categoryCorrect') =>
    Object.fromEntries(
      keysOf(keySource?.[field]).map((key) => [key, value(`${field}.${key}`)]),
    );

  return {
    ...row,
    studyTimeSeconds: value('studyTimeSeconds'),
    totalQuestions: value('totalQuestions'),
    correctQuestions: value('correct'),
    categoryCounts: byCategory('categoryCounts'),
    categoryCorrect: byCategory('categoryCorrect'),
    xpEarned: undefined,
  };
}

/** 이 행들에서 한 번이라도 공부한 언어 (등록 순서대로) */
export function studiedLanguages(rows: readonly StatsRowForQuests[]): string[] {
  return LEARNING_COURSES.map((course) => course.targetLanguage).filter(
    (language) =>
      rows.some((row) => {
        const own = languageStatsRow(row, language);
        return own.totalQuestions > 0 || own.studyTimeSeconds > 0;
      }),
  );
}
