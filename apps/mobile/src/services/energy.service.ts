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
  comboBonus: (): Promise<EnergyState & { bonusGranted: number }> => {
    console.log(api.post("/energy/combo-bonus", {}));
    return api.post("/energy/combo-bonus", {});
  },
};
