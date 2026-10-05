import api from "./api";

export interface EnergyState {
  energy: number;
  maxEnergy: number;
  gems: number;
  isSuper: boolean;
  secondsToNext: number;
  minutesToFull: number;
  etaHours: number;
  etaMinutes: number;
  refillCost: number;
  freeRemaining: number;
}

export const EnergyService = {
  getState: (): Promise<EnergyState> => api.get("/energy"),
  refill: (): Promise<EnergyState> => api.post("/energy/refill", {}),
  claimFree: (): Promise<EnergyState> => api.post("/energy/free", {}),
  consume: (): Promise<EnergyState> => api.post("/energy/consume", {}),
  /**
   * 4연속 정답 보너스. spent = 이번 레슨에서 지금까지 쓴 에너지 —
   * 서버는 레슨 완료 때 한꺼번에 깎으므로 이걸 알아야 "에너지가 적다" 를 판단한다
   */
  comboBonus: (
    spent = 0,
  ): Promise<EnergyState & { bonusGranted: number }> => {
    return api.post("/energy/combo-bonus", { spent });
  },
};
