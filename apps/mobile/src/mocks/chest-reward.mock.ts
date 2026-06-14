import { ChestRewardData } from "@/types/chest-reward";

export const MOCK_CHEST_REWARD: ChestRewardData = {
  rewardType: "common",
  gemAmount: 5,
  currentGemTotal: 520,
  tapsRequired: 3,
};

export const CHEST_TITLES: Record<string, string> = {
  common: "chestReward.titles.common", // 흔한템
  rare: "chestReward.titles.rare",
  epic: "chestReward.titles.epic",
};
