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
  /** 무료 충전 한 번에 받는 양 (옛 서버는 안 준다 → ENERGY_FREE_AMOUNT 폴백) */
  freeAmount?: number;
  /** 오늘 복습으로 더 벌 수 있는 양 / 한 판 최대 (옛 서버는 안 준다) */
  earnRemaining?: number;
  earnSessionMax?: number;
  freeRemaining: number;
}

export const EnergyService = {
  getState: (): Promise<EnergyState> => api.get("/energy"),
  refill: (): Promise<EnergyState> => api.post("/energy/refill", {}),
  claimFree: (): Promise<EnergyState> => api.post("/energy/free", {}),
  consume: (): Promise<EnergyState> => api.post("/energy/consume", {}),
  /** 레슨 도중 맞힐 때마다 서버에서 바로 깎는다. session = 이번 판 id */
  spend: (session: string, amount = 1): Promise<EnergyState> =>
    api.post("/energy/spend", { session, amount }),
  /**
   * 4연속 정답 보너스. spent = 화면상 썼지만 아직 서버에서 안 깎인 몫
   * (spend 가 실패했거나 진행 중인 것. 보통 0)
   */
  comboBonus: (
    spent = 0,
  ): Promise<EnergyState & { bonusGranted: number }> => {
    return api.post("/energy/combo-bonus", { spent });
  },
};
