import { languageStatsRow, studiedLanguages } from './language-stats.util';
import { languageQuestPath } from './quest-counter.util';

const date = new Date('2026-10-20T00:00:00+05:00');

/** 하루: 한국어 30문제·20분 + 영어 10문제·5분 */
const mixed = {
  date,
  xpEarned: 400,
  studyTimeSeconds: 1500,
  totalQuestions: 40,
  correctQuestions: 33,
  categoryCounts: { vocab: 25, grammar: 15 },
  categoryCorrect: { vocab: 22, grammar: 11 },
  studyLanguages: ['ko', 'en'],
  languageQuests: {
    en: {
      correct: 8,
      totalQuestions: 10,
      studyTimeSeconds: 300,
      categoryCounts: { vocab: 10 },
      categoryCorrect: { vocab: 8 },
    },
  },
};

describe('통계 화면 — 하루 행을 언어 몫으로', () => {
  it('영어는 자기 칸, 한국어는 합계 − 영어', () => {
    const en = languageStatsRow(mixed, 'en');
    expect(en).toMatchObject({
      date,
      studyTimeSeconds: 300,
      totalQuestions: 10,
      correctQuestions: 8,
      categoryCounts: { vocab: 10 },
      categoryCorrect: { vocab: 8 },
    });
    const ko = languageStatsRow(mixed, 'ko');
    expect(ko).toMatchObject({
      studyTimeSeconds: 1200,
      totalQuestions: 30,
      correctQuestions: 25,
      categoryCounts: { vocab: 15, grammar: 15 },
      categoryCorrect: { vocab: 14, grammar: 11 },
    });
  });

  it('XP 는 언어별로 안 세니까 언어 몫에선 뺀다', () => {
    expect(languageStatsRow(mixed, 'en').xpEarned).toBeUndefined();
    expect(languageStatsRow(mixed, 'ko').xpEarned).toBeUndefined();
  });

  it('정답 기록이 없는 분야는 키가 없다 (0% 가 아니라 모름)', () => {
    const row = {
      ...mixed,
      categoryCorrect: {},
      languageQuests: {
        en: { totalQuestions: 10, categoryCounts: { vocab: 10 } },
      },
    };
    expect(languageStatsRow(row, 'en').categoryCorrect).toEqual({});
    expect(languageStatsRow(row, 'ko').categoryCorrect).toEqual({});
  });

  it('Map 으로 와도 같다 (lean 이 아닌 문서)', () => {
    const row = {
      ...mixed,
      categoryCounts: new Map(Object.entries(mixed.categoryCounts)),
      categoryCorrect: new Map(Object.entries(mixed.categoryCorrect)),
    };
    expect(languageStatsRow(row, 'ko').categoryCounts).toEqual({
      vocab: 15,
      grammar: 15,
    });
  });

  it('언어별 칸이 생기기 전 기록 — 그날 언어가 하나면 그 언어, 모르면 한국어', () => {
    const legacy = {
      date,
      studyTimeSeconds: 600,
      totalQuestions: 17,
      correctQuestions: 15,
      categoryCounts: { vocab: 17 },
      categoryCorrect: { vocab: 15 },
    };
    const englishOnly = { ...legacy, studyLanguages: ['en'] };
    expect(languageStatsRow(englishOnly, 'en')).toMatchObject({
      studyTimeSeconds: 600,
      totalQuestions: 17,
      categoryCounts: { vocab: 17 },
    });
    expect(languageStatsRow(englishOnly, 'ko')).toMatchObject({
      studyTimeSeconds: 0,
      totalQuestions: 0,
      categoryCounts: {},
    });

    // 언어를 모르거나 둘 다 했으면 예전처럼 한국어
    for (const row of [legacy, { ...legacy, studyLanguages: ['ko', 'en'] }]) {
      expect(languageStatsRow(row, 'ko').totalQuestions).toBe(17);
      expect(languageStatsRow(row, 'en').totalQuestions).toBe(0);
    }
  });

  it('공부한 언어 목록은 등록 순서대로, 기록이 있는 것만', () => {
    expect(studiedLanguages([mixed])).toEqual(['ko', 'en']);
    expect(
      studiedLanguages([{ date, totalQuestions: 5, studyTimeSeconds: 60 }]),
    ).toEqual(['ko']);
    expect(
      studiedLanguages([
        { date, totalQuestions: 5, studyLanguages: ['en'] },
        { date, totalQuestions: 0 },
      ]),
    ).toEqual(['en']);
    expect(studiedLanguages([])).toEqual([]);
  });

  it('지역이 붙은 언어 코드도 칸 경로가 된다 (점·$ 는 막는다)', () => {
    expect(languageQuestPath('pt-BR', 'correct')).toBe(
      'languageQuests.pt-BR.correct',
    );
    expect(() => languageQuestPath('en.x', 'correct')).toThrow();
    expect(() => languageQuestPath('$en', 'correct')).toThrow();
  });
});
