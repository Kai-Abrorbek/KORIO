export type ChestPhase = "idle" | "shaking" | "opening" | "revealed";

export interface ChestRewardData {
  rewardType: "common" | "rare" | "epic";
  gemAmount: number;
  currentGemTotal: number; // 525 등 기존 보유량
  tapsRequired: number; // 보통 3
}
