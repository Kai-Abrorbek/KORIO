import { Types, type Model } from 'mongoose';
import { knownStudyLanguages } from './language-activity.util';

/**
 * 일일 퀘스트용 행동 카운터 (UserStats.questCounters).
 *
 * 학습 통계(xp·정답·시간)로는 못 세는 것 — 레슨 판 수·정확도·오답 해소·팔로우·공유 —
 * 을 그날 통계 문서에 같이 쌓는다. 하루 경계는 통계와 같다 (유저 시간대 자정).
 */
export type QuestCounterKey =
  | 'sessions'
  | 'accurate'
  | 'perfect'
  | 'mistakes'
  | 'follow'
  | 'shareProgress'
  | 'shareInvite';

export const QUEST_EVENT_KEYS: QuestCounterKey[] = [
  'shareProgress',
  'shareInvite',
];

/**
 * day = startOfDay(now, tz). cap 이 있으면 그 값까지만 올린다 (앱이 보내는 이벤트용).
 * 실패해도 던지지 않는다 — 퀘스트 때문에 학습·팔로우가 실패하면 안 된다.
 */
export async function bumpQuestCounter(
  statsModel: Model<any>,
  userId: string | Types.ObjectId,
  day: Date,
  key: QuestCounterKey,
  n = 1,
  cap?: number,
  /**
   * 언어별로 나눈 몫 (언어 → 개수). 문제 퀘스트(오답 해결)는 언어마다 따로 센다 —
   * 등록된 언어 코드만 넘긴다. 상한(cap) 있는 이벤트(공유)는 계정 공통이라 안 쓴다.
   */
  byLanguage?: Record<string, number>,
): Promise<boolean> {
  if (n <= 0) return false;
  const field = `questCounters.${key}`;
  const uid = new Types.ObjectId(String(userId));
  try {
    if (cap == null) {
      const perLanguage: Record<string, number> = {};
      for (const [language, count] of Object.entries(byLanguage ?? {})) {
        if (count > 0) perLanguage[languageQuestPath(language, key)] = count;
      }
      await statsModel.updateOne(
        { userId: uid, date: day },
        { $inc: { [field]: n, ...perLanguage } },
        { upsert: true },
      );
      return true;
    }
    // 상한이 있으면 문서가 있을 때만 조건부로 올리고, 없으면 만든다
    const res = await statsModel.updateOne(
      {
        userId: uid,
        date: day,
        $or: [{ [field]: { $exists: false } }, { [field]: { $lt: cap } }],
      },
      { $inc: { [field]: n } },
    );
    if (res.modifiedCount) return true;
    const exists = await statsModel.exists({ userId: uid, date: day });
    if (exists) return false;
    await statsModel.updateOne(
      { userId: uid, date: day },
      { $setOnInsert: { [field]: Math.min(n, cap) } },
      { upsert: true },
    );
    return true;
  } catch {
    // 같은 순간 두 요청이 문서를 만들면 유니크 인덱스에 한쪽이 걸린다 — 무시
    return false;
  }
}

// ───────────────────────── 언어별 문제 퀘스트 ─────────────────────────

/** 언어마다 따로 세는 문제 퀘스트 카운터 (retention.config COURSE_QUEST_KINDS 의 저장 칸) */
export type LanguageQuestKey =
  | 'correct'
  | 'sessions'
  | 'accurate'
  | 'perfect'
  | 'mistakes';

export const LANGUAGE_QUEST_KEYS: LanguageQuestKey[] = [
  'correct',
  'sessions',
  'accurate',
  'perfect',
  'mistakes',
];

/** 한국어 — 언어별 카운터가 생기기 전 기록은 전부 이 언어다 (그래서 "합계 − 나머지" 로 읽는다) */
export const LEGACY_QUEST_LANGUAGE = 'ko';

/**
 * UserStats.languageQuests.<language> 경로. 언어 코드는 호출하는 쪽이 등록된 것만 넘긴다.
 * 등록 코드엔 지역이 붙을 수 있다 (pt-BR). 점·$ 는 경로를 깨므로 형식으로 막는다.
 */
export function languageQuestPath(language: string, key: string): string {
  if (!/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(language)) {
    throw new Error(`invalid quest language: ${language}`);
  }
  return `languageQuests.${language}.${key}`;
}

/**
 * 언어별 칸 — UserStats.languageQuests.<언어>.
 * 이름은 퀘스트 때 생겼지만 통계 화면의 언어별 보기도 같은 칸을 쓴다
 * (정답·레슨 판 수·오답 해결·분야별 수/정답·학습 시간·문제 수).
 */
export interface StatsRowForQuests {
  correctQuestions?: number;
  totalQuestions?: number;
  studyTimeSeconds?: number;
  questCounters?: unknown;
  categoryCounts?: unknown;
  categoryCorrect?: unknown;
  languageQuests?: unknown;
  studyLanguages?: unknown;
}

/** Map(lean 은 객체) · 객체 어느 쪽이든 숫자로 */
function numberAt(source: unknown, key: string): number {
  if (!source || typeof source !== 'object') return 0;
  const value =
    source instanceof Map
      ? (source.get(key) as unknown)
      : (source as Record<string, unknown>)[key];
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function languageBucket(
  row: StatsRowForQuests | null | undefined,
  language: string,
): Record<string, unknown> | undefined {
  const all = row?.languageQuests;
  if (!all || typeof all !== 'object') return undefined;
  const bucket = (all as Record<string, unknown>)[language];
  return bucket && typeof bucket === 'object'
    ? (bucket as Record<string, unknown>)
    : undefined;
}

/** 합계 필드에서 읽는 값 — 키마다 저장 위치가 다르다 */
function totalOf(
  row: StatsRowForQuests | null | undefined,
  key: string,
): number {
  if (key === 'correct') return Number(row?.correctQuestions ?? 0) || 0;
  if (key === 'studyTimeSeconds' || key === 'totalQuestions') {
    return Number(row?.[key] ?? 0) || 0;
  }
  if (key.startsWith('categoryCounts.')) {
    return numberAt(row?.categoryCounts, key.slice('categoryCounts.'.length));
  }
  if (key.startsWith('categoryCorrect.')) {
    return numberAt(row?.categoryCorrect, key.slice('categoryCorrect.'.length));
  }
  return numberAt(row?.questCounters, key);
}

function bucketOf(
  bucket: Record<string, unknown> | undefined,
  key: string,
): number {
  if (!bucket) return 0;
  const [head, tail] = key.split('.');
  return tail === undefined
    ? numberAt(bucket, head)
    : numberAt(bucket[head], tail);
}

/**
 * 언어별 칸이 생기기 전 기록인데 그날 배운 언어가 하나뿐이면 그 언어.
 *
 * 그날 기록은 전부 그 언어 것이다 — 그래야 칸이 생기기 전에 영어만 공부한 날이
 * 한국어로 잡히지 않는다. 언어가 둘 이상이거나 모르면(studyLanguages 없음) null —
 * 예전처럼 한국어로 남긴다 (모르는 걸 추측하지 않는다).
 */
export function soleLegacyLanguage(
  row: StatsRowForQuests | null | undefined,
): string | null {
  const all = row?.languageQuests;
  if (all && typeof all === 'object' && Object.keys(all).length) return null;
  const languages = knownStudyLanguages(row?.studyLanguages);
  return languages.length === 1 ? languages[0] : null;
}

/**
 * 그날 그 언어의 값.
 *
 * key = correct · sessions · accurate · perfect · mistakes · studyTimeSeconds · totalQuestions ·
 *       categoryCounts.<분야> · categoryCorrect.<분야>
 * 한국어는 합계에서 다른 언어 몫을 뺀다 — 언어별 카운터가 생기기 전 기록(전부 한국어)과
 * 언어를 모르는 모드(옛 게임 등)가 한국어로 남게. 다른 언어는 자기 칸만 본다.
 */
export function languageQuestValue(
  row: StatsRowForQuests | null | undefined,
  language: string,
  key: string,
): number {
  const sole = soleLegacyLanguage(row);
  if (sole) return sole === language ? Math.max(0, totalOf(row, key)) : 0;
  if (language !== LEGACY_QUEST_LANGUAGE) {
    return Math.max(0, bucketOf(languageBucket(row, language), key));
  }
  const all = row?.languageQuests;
  let others = 0;
  if (all && typeof all === 'object') {
    for (const [lang, bucket] of Object.entries(
      all as Record<string, unknown>,
    )) {
      if (
        lang === LEGACY_QUEST_LANGUAGE ||
        !bucket ||
        typeof bucket !== 'object'
      ) {
        continue;
      }
      others += bucketOf(bucket as Record<string, unknown>, key);
    }
  }
  return Math.max(0, totalOf(row, key) - others);
}

/**
 * 한 판(recordStudy)의 언어별 증가분. 한 판은 한 코스 안에서 풀므로 가장 많은 문제의
 * 언어 하나에 몰아 준다. inc 키는 합계 쪽 이름(correct · questCounters.sessions ·
 * categoryCounts.vocab …)을 그대로 받아 languageQuests.<언어>. 아래로 옮긴다.
 */
export function languageQuestInc(
  language: string | null,
  inc: Record<string, number>,
): Record<string, number> {
  if (!language) return {};
  const out: Record<string, number> = {};
  for (const [key, value] of Object.entries(inc)) {
    if (!value) continue;
    const local = key.startsWith('questCounters.')
      ? key.slice('questCounters.'.length)
      : key;
    out[languageQuestPath(language, local)] = value;
  }
  return out;
}

/** 문제들의 언어 중 가장 많은 것 (동점이면 먼저 나온 것). 없으면 null */
export function dominantLanguage(
  languages: (string | null | undefined)[],
): string | null {
  const counts = new Map<string, number>();
  for (const language of languages) {
    if (!language) continue;
    counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestN = 0;
  for (const [language, n] of counts) {
    if (n > bestN) {
      best = language;
      bestN = n;
    }
  }
  return best;
}
