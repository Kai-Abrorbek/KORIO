import api from "./api";

export type AdminReward = {
  id: string;
  kind: "gems" | "energy_refill" | "streak_freeze" | "super_days";
  amount: number;
  appliedAt: string | null;
};

export const RewardInboxService = {
  pending: (): Promise<{ items: AdminReward[] }> => api.get("/reward-inbox"),
  acknowledge: (id: string): Promise<{ acknowledged: boolean }> =>
    api.post(`/reward-inbox/${encodeURIComponent(id)}/acknowledge`, {}),
};
