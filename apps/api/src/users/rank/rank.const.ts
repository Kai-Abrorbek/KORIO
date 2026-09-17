/**
 * KORIO 점수 — "이 앱 학습자 중 나는 몇 등인가".
 *
 * 배너가 묻는 질문은 "내 한국어 실력이 어느 정도냐"다. 그래서 **XP 하나로
 * 줄 세우지 않는다.** XP 만 보면 오래 붙잡고 있던 사람이 무조건 위로 가고,
 * 늦게 시작했지만 실력이 좋은 사람은 바닥에 깔린다 — 질문에 대한 답이 아니다.
 *
 * 세 가지를 섞는다:
 *   실력   급수와 통과한 급수 시험      "얼마나 어려운 걸 하고 있나"
 *   학습량 누적 XP                      "얼마나 했나"
 *   꾸준함 연속 학습일 / 최장 기록      "계속 오나"
 *
 * ⚠️ 리그(league)는 일부러 뺐다. 리그는 **주간 XP** 로 정해지므로 학습량과
 *    같은 것을 두 번 세는 꼴이 된다.
 * ⚠️ 정답률도 뺐다. 유저 문서에 누적 정답률이 없어서 전체 유저를 줄 세우려면
 *    UserProgress 를 조인해야 하는데, 매 탭마다 그걸 돌릴 수는 없다.
 *    누적 정답률을 유저 문서에 투영하게 되면 그때 넣는다.
 */
export const RANK_WEIGHTS = {
  proficiency: 0.4,
  volume: 0.35,
  consistency: 0.25,
} as const;

/**
 * 학습량 만점 기준 XP.
 *
 * **로그 스케일**을 쓴다. XP 는 꼬리가 아주 긴 분포라 선형으로 정규화하면
 * 상위 1% 가 0.9~1.0 을 다 가져가고 **나머지 99% 가 0.01 근처에 뭉친다.**
 * 그러면 순위가 사실상 XP 순서 하나로 결정된다. 로그를 씌우면 초반 성장이
 * 점수에 또렷하게 반영된다 (0 → 1,000 XP 가 50,000 → 51,000 보다 크게 오른다).
 */
export const XP_CEIL = 100_000;

/** 급수 시험은 6개까지 센다 (1~6급) */
export const EXAM_CEIL = 6;
/** 급수는 1~6 */
export const LEVEL_MAX = 6;
/** 연속 학습일은 60일에서 만점 — 그 위는 더 벌어져도 의미가 옅다 */
export const STREAK_CEIL = 60;
/** 최장 기록은 120일 */
export const LONGEST_STREAK_CEIL = 120;

/** 점수 표시 범위 (0~1000). 소수점 대신 정수로 보여주려고 */
export const SCORE_SCALE = 1000;

/**
 * 순위에 들어가는 사람.
 *
 * **한 번도 공부한 적 없는 계정은 뺀다.** 가입만 하고 만 계정까지 분모에
 * 넣으면 "상위 5%" 가 그냥 가입자보다 낫다는 뜻이 돼서, 숫자가 듣기는 좋지만
 * 거짓말이 된다. 화면에도 "학습자 N명 중" 이라고 적는다.
 */
export const RANKED_FILTER = {
  isBot: { $ne: true },
  totalXP: { $gt: 0 },
} as const;

export const RANK_TIERS = [
  { key: 'legend', maxPercentile: 1 },
  { key: 'master', maxPercentile: 5 },
  { key: 'elite', maxPercentile: 10 },
  { key: 'rising', maxPercentile: 25 },
  { key: 'steady', maxPercentile: 50 },
  { key: 'starter', maxPercentile: 100 },
] as const;

export type RankTier = (typeof RANK_TIERS)[number]['key'];

/** 상위 몇 % 인지로 칭호를 고른다 */
export function tierFor(percentile: number): RankTier {
  return (
    RANK_TIERS.find((t) => percentile <= t.maxPercentile)?.key ?? 'starter'
  );
}

/**
 * 학습량 점수 → 필요한 누적 XP (로그의 역함수).
 *
 * "다음 순위까지 N XP" 를 계산하는 데 쓴다. 등수만 보여주면 그래서 뭘 하라는
 * 건지 알 수 없다 — 한 칸 올라가는 데 얼마가 드는지가 붙어야 행동이 된다.
 */
export function xpForVolumeScore(volume: number): number {
  const v = Math.max(0, Math.min(1, volume));
  return Math.exp(v * Math.log(1 + XP_CEIL)) - 1;
}

/** 누적 XP → 학습량 점수 (0~1) */
export function volumeScoreOf(totalXP: number): number {
  const xp = Math.max(0, totalXP);
  return Math.min(1, Math.log(1 + xp) / Math.log(1 + XP_CEIL));
}

/**
 * 점수 차이를 메우는 데 필요한 추가 XP.
 *
 * 실력·꾸준함은 오늘 당장 올릴 수 있는 값이 아니라(급수 시험을 봐야 하고
 * 연속일은 날짜가 지나야 한다) **XP 로 환산해서 보여준다.** 거짓이 아니라
 * "지금 당장 할 수 있는 가장 빠른 길" 이다.
 */
export function xpGapFor(
  currentXP: number,
  scoreGap: number,
): number | null {
  if (scoreGap <= 0) return 0;
  const current = volumeScoreOf(currentXP);
  const needed = current + scoreGap / SCORE_SCALE / RANK_WEIGHTS.volume;
  // 학습량만으로는 못 따라잡는 차이 (실력·꾸준함에서 벌어진 것)
  if (needed > 1) return null;
  return Math.ceil(xpForVolumeScore(needed) - currentXP);
}
