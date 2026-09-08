import { StudyCategory } from './study-category.util';

/**
 * 스킬 레이더 — "내 학습의 강점·약점을 한 눈에".
 *
 * 왜 정확도 하나로 안 하나:
 *  정확도만 보면 **한 문제 풀고 맞힌 분야가 100점**이 되어 제일 강한
 *  분야로 뜬다. 반대로 학습량만 보면 많이 틀리면서 많이 푼 분야가 강점이
 *  된다. 둘 다 혼자서는 거짓말을 한다.
 *
 * 그래서 세 가지를 섞는다:
 *  - 정확도 (55%) : 얼마나 맞히나. 표본이 적으면 평균 쪽으로 끌어당긴다
 *  - 학습량 (30%) : 가장 많이 한 분야 대비 얼마나 했나
 *  - 최근성 (15%) : 최근에 손댔나. 두 달 손 놓은 분야는 강점이 아니다
 *
 * 점수는 서로 비교하라고 있는 상대값이다. "듣기 62점" 자체보다
 * "듣기가 제일 낮다" 가 쓸모 있는 정보다. 화면도 그렇게 읽히게 그린다.
 */

/** 레이더에 그리는 축. other 는 분류 실패 버킷이라 뺀다 */
export const RADAR_CATEGORIES: StudyCategory[] = [
  StudyCategory.VOCAB,
  StudyCategory.GRAMMAR,
  StudyCategory.EXPRESSION,
  StudyCategory.CONVERSATION,
  StudyCategory.LISTENING,
  StudyCategory.TOPIK,
];

/**
 * 표본이 적을 때 정확도를 끌어당길 기준점과 세기.
 *
 * 베이지안 평활이다. 1문제 맞히고 100% 가 되는 걸 막는다:
 *   (맞힌 수 + PRIOR_N * PRIOR_P) / (푼 수 + PRIOR_N)
 * PRIOR_N=8 이면 8문제쯤 풀어야 자기 실력이 절반쯤 반영된다.
 */
const PRIOR_N = 8;
const PRIOR_P = 0.7; // 학습 앱 평균 정답률 근처

/** 최근성이 0점이 되는 기간 */
const RECENCY_FADE_DAYS = 30;

/** 진단 문구를 붙이기 위한 최소 표본. 이하면 "아직 판단 못 함" */
export const MIN_SAMPLE = 10;

export interface SkillInput {
  category: StudyCategory;
  /** 기간 내 푼 문제 수 */
  attempted: number;
  /**
   * 기간 내 맞힌 문제 수.
   * null = 이 필드가 생기기 전 기록이라 모른다 (0 과 다르다)
   */
  correct: number | null;
  /** 마지막으로 이 분야를 한 날로부터 며칠 지났나. null = 한 적 없음 */
  daysSinceLast: number | null;
}

export interface SkillScore {
  category: StudyCategory;
  attempted: number;
  correct: number | null;
  /** 0~1. 표본이 없으면 null */
  accuracy: number | null;
  /** 0~100. 레이더 축 길이 */
  score: number;
  /** 진단에 쓸 만큼 표본이 있나 */
  reliable: boolean;
  daysSinceLast: number | null;
}

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/** 표본이 적을수록 평균 쪽으로 당겨진 정답률 */
export function smoothedAccuracy(attempted: number, correct: number): number {
  return (correct + PRIOR_N * PRIOR_P) / (attempted + PRIOR_N);
}

export function recencyScore(daysSinceLast: number | null): number {
  if (daysSinceLast === null) return 0;
  return clamp01(1 - daysSinceLast / RECENCY_FADE_DAYS);
}

export function computeSkillScores(inputs: SkillInput[]): SkillScore[] {
  const maxAttempted = Math.max(1, ...inputs.map((i) => i.attempted));

  return inputs.map((i) => {
    const hasAccuracy = i.correct !== null && i.attempted > 0;
    const rawAccuracy = hasAccuracy ? i.correct! / i.attempted : null;

    // 정확도 항은 세 갈래다.
    //  푼 적 없음        → 0. 안 해본 분야에 실력 점수를 줄 수는 없다
    //  풀었는데 기록 없음 → 기준점. categoryCorrect 가 생기기 전 기록이라
    //                      모르는 것이지 못하는 게 아니다. 0 으로 두면
    //                      오래 쓴 유저의 모든 축이 바닥으로 깔린다
    //  둘 다 있음        → 평활 정답률
    const accTerm =
      i.attempted === 0 ? 0 : hasAccuracy ? smoothedAccuracy(i.attempted, i.correct!) : PRIOR_P;

    // 학습량은 제곱근으로 눌러준다. 선형으로 두면 한 분야만 몰아친 유저의
    // 나머지 축이 전부 0 에 붙어서 레이더가 삼각형 하나로 찌그러진다.
    const volumeTerm = Math.sqrt(clamp01(i.attempted / maxAttempted));

    const score =
      55 * clamp01(accTerm) +
      30 * volumeTerm +
      15 * recencyScore(i.daysSinceLast);

    return {
      category: i.category,
      attempted: i.attempted,
      correct: i.correct,
      accuracy: rawAccuracy,
      score: Math.round(clamp01(score / 100) * 100),
      reliable: i.attempted >= MIN_SAMPLE,
      daysSinceLast: i.daysSinceLast,
    };
  });
}

export type DiagnosisKey =
  | 'noData' // 아직 데이터가 거의 없다
  | 'balanced' // 고르게 하고 있다
  | 'weakSpot' // 약한 분야가 뚜렷하다
  | 'untouched' // 아예 손 안 댄 분야가 있다
  | 'accuracyDrop'; // 많이 푸는데 정답률이 낮다

export interface Diagnosis {
  key: DiagnosisKey;
  /** 문구에 끼워 넣을 분야 (없을 수 있음) */
  category: StudyCategory | null;
  strongest: StudyCategory | null;
  weakest: StudyCategory | null;
  /** 축 사이 편차 0~100. 클수록 편식 */
  spread: number;
}

/**
 * 한 줄 진단.
 *
 * 순서가 곧 우선순위다. 여러 개가 동시에 참일 때 **가장 행동으로 옮기기
 * 쉬운 것** 을 고른다: "아예 안 한 분야가 있다" > "정답률이 낮다" >
 * "약한 분야가 있다" > "고르다".
 */
export function diagnose(scores: SkillScore[]): Diagnosis {
  const touched = scores.filter((s) => s.attempted > 0);
  const totalAttempted = scores.reduce((n, s) => n + s.attempted, 0);

  const base: Diagnosis = {
    key: 'noData',
    category: null,
    strongest: null,
    weakest: null,
    spread: 0,
  };

  if (totalAttempted < MIN_SAMPLE || touched.length === 0) return base;

  const sorted = [...touched].sort((a, b) => b.score - a.score);
  const strongest = sorted[0].category;
  const weakest = sorted[sorted.length - 1].category;
  const spread = Math.round(sorted[0].score - sorted[sorted.length - 1].score);

  const out: Diagnosis = { ...base, strongest, weakest, spread };

  // 1) 두 분야 이상 했는데 아예 안 건드린 분야가 있으면 그게 제일 급하다
  const untouched = scores.filter((s) => s.attempted === 0);
  if (touched.length >= 2 && untouched.length > 0) {
    return { ...out, key: 'untouched', category: untouched[0].category };
  }

  // 2) 표본이 충분한데 정답률이 낮은 분야
  const lowAcc = touched
    .filter((s) => s.reliable && s.accuracy !== null && s.accuracy < 0.6)
    .sort((a, b) => (a.accuracy ?? 1) - (b.accuracy ?? 1));
  if (lowAcc.length > 0) {
    return { ...out, key: 'accuracyDrop', category: lowAcc[0].category };
  }

  // 3) 축 편차가 크면 약점이 뚜렷한 것
  if (spread >= 25) {
    return { ...out, key: 'weakSpot', category: weakest };
  }

  return { ...out, key: 'balanced', category: strongest };
}
