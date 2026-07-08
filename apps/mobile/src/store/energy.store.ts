import { create } from "zustand";

interface EnergyState {
  modalVisible: boolean;
  openEnergyModal: () => void;
  closeEnergyModal: () => void;
  /**
   * 학습 시작 게이트. 에너지 있으면 onAllowed() 실행, 없으면 모달 띄움.
   * @returns 시작 가능 여부
   */
  guardLessonStart: (energy: number, onAllowed: () => void) => boolean;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  modalVisible: false,
  openEnergyModal: () => set({ modalVisible: true }),
  closeEnergyModal: () => set({ modalVisible: false }),
  guardLessonStart: (energy, onAllowed) => {
    if (energy <= 0) {
      set({ modalVisible: true });
      return false;
    }
    onAllowed();
    return true;
  },
}));
