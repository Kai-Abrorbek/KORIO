/**
 * 통계 버킷.
 * 값은 프론트 i18n 키(home.categories.*) 와 동일하게 유지한다.
 *
 * LessonCategory 와 분리한 이유:
 * 게임 · AI 대화처럼 "레슨"이 아닌 학습도 통계에는 들어가야 하기 때문.
 */
export enum StudyCategory {
  VOCAB = 'vocab',
  GRAMMAR = 'grammar',
  EXPRESSION = 'expression',
  CONVERSATION = 'conversation',
  LISTENING = 'listening',
  TOPIK = 'topik',
  /** 아직 분류되지 않은 문제 타입이 모이는 곳 (조용한 오염 방지용) */
  OTHER = 'other',
}

export const STUDY_CATEGORIES: StudyCategory[] = Object.values(StudyCategory);

export type CategoryCounts = Record<StudyCategory, number>;

/** 전 카테고리를 0으로 채운 객체 */
export function emptyCounts(): CategoryCounts {
  const out = {} as CategoryCounts;
  for (const c of STUDY_CATEGORIES) out[c] = 0;
  return out;
}

/**
 * Mongo Map(또는 평범한 객체) → 전 카테고리 0 채운 평면 객체.
 * 저장된 적 없는 카테고리도 항상 0으로 나오므로 프론트에서 undefined 처리가 필요 없다.
 */
export function toCounts(
  src?: Map<string, number> | Record<string, number> | null,
): CategoryCounts {
  const out = emptyCounts();
  if (!src) return out;
  const entries: Iterable<[string, number]> =
    src instanceof Map ? src.entries() : Object.entries(src);
  for (const [k, v] of entries) {
    if ((STUDY_CATEGORIES as string[]).includes(k)) {
      out[k as StudyCategory] = v ?? 0;
    }
  }
  return out;
}

/** 카테고리 카운트 합계 */
export function sumCounts(counts: CategoryCounts): number {
  return STUDY_CATEGORIES.reduce((n, k) => n + (counts[k] ?? 0), 0);
}
