/**
 * 한글 자모 40자 (자음 19 + 모음 21).
 * 표시용 데이터(이름/로마자/예시)는 모바일 `constants/hangul.ts` 가 갖고,
 * 서버는 진행도 검증·집계에 필요한 id 목록만 갖는다. 자모는 늘어나지 않으므로 고정 목록.
 * ⚠️ 모바일 constants/hangul.ts 의 id 와 반드시 1:1로 일치해야 한다.
 */
export const HANGUL_CONSONANT_IDS = [
  'c-giyeok',
  'c-nieun',
  'c-digeut',
  'c-rieul',
  'c-mieum',
  'c-bieup',
  'c-siot',
  'c-ieung',
  'c-jieut',
  'c-chieut',
  'c-kieuk',
  'c-tieut',
  'c-pieup',
  'c-hieut',
  'c-ggiyeok',
  'c-ddigeut',
  'c-bbieup',
  'c-ssiot',
  'c-jjieut',
] as const;

export const HANGUL_VOWEL_IDS = [
  'v-a',
  'v-ya',
  'v-eo',
  'v-yeo',
  'v-o',
  'v-yo',
  'v-u',
  'v-yu',
  'v-eu',
  'v-i',
  'v-ae',
  'v-yae',
  'v-e',
  'v-ye',
  'v-wa',
  'v-wae',
  'v-oe',
  'v-wo',
  'v-we',
  'v-wi',
  'v-ui',
] as const;

export const HANGUL_CHARACTER_IDS: string[] = [
  ...HANGUL_CONSONANT_IDS,
  ...HANGUL_VOWEL_IDS,
];

export const HANGUL_CHARACTER_ID_SET = new Set<string>(HANGUL_CHARACTER_IDS);

/** score 상한. 정답을 아무리 쌓아도 여기서 멈춰야 오답 1~2번이 의미를 갖는다. */
export const HANGUL_MAX_SCORE = 6;

/** score 임계값 → mastery. 정답 누적 1회=1, 3회=2, 6회=3 */
export const HANGUL_MASTERY_STEPS = [
  { score: 6, mastery: 3 },
  { score: 3, mastery: 2 },
  { score: 1, mastery: 1 },
] as const;

/** 이 mastery 이상이면 "익힌 글자"로 센다. 한글 노드 자동 완료 판정 기준. */
export const HANGUL_LEARNED_MASTERY = 2;

export type HangulMastery = 0 | 1 | 2 | 3;

export function clampHangulScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.min(HANGUL_MAX_SCORE, Math.max(0, Math.trunc(score)));
}

export function hangulMasteryFromScore(score: number): HangulMastery {
  const s = clampHangulScore(score);
  for (const step of HANGUL_MASTERY_STEPS) {
    if (s >= step.score) return step.mastery;
  }
  return 0;
}
