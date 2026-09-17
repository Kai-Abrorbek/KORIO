import api from "./api";

export type RankTier =
  | "legend"
  | "master"
  | "elite"
  | "rising"
  | "steady"
  | "starter";

export interface RankBreakdown {
  key: "proficiency" | "volume" | "consistency";
  /** 0~1 — 막대 길이 */
  value: number;
  /** 화면에 같이 적을 실제 값 (급수 / 누적 XP / 연속일) */
  raw: number;
}

export interface MyRank {
  /** 한 문제도 안 푼 사람은 순위가 없다 — 0등으로 꾸며 주지 않는다 */
  ranked: boolean;
  rank: number | null;
  total: number;
  /** 상위 몇 % */
  percentile: number | null;
  tier: RankTier | null;
  score: number;
  breakdown: RankBreakdown[];
  /** 한 칸 올라가는 데 필요한 XP. null = 학습량만으로는 못 따라잡는다 */
  xpToNextRank: number | null;
  computedAt: string;
}

export const RankService = {
  getMyRank: (): Promise<MyRank> => api.get("/users/me/rank"),
};
