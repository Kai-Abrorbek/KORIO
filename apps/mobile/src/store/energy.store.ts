import { create } from "zustand";
import { useAuthStore } from "./auth.store";

interface EnergyState {
  modalVisible: boolean;
  openEnergyModal: () => void;
  closeEnergyModal: () => void;
  /**
   * 학습 시작 게이트. 에너지 있으면 onAllowed() 실행, 없으면 모달 띄움.
   * SUPER 는 에너지를 안 쓰므로 항상 통과시킨다.
   * @returns 시작 가능 여부
   */
  guardLessonStart: (energy: number, onAllowed: () => void) => boolean;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  modalVisible: false,
  openEnergyModal: () => set({ modalVisible: true }),
  closeEnergyModal: () => set({ modalVisible: false }),
  guardLessonStart: (energy, onAllowed) => {
    // 호출부가 여러 곳이라 여기서 직접 확인한다.
    // 서버도 SUPER 면 에너지를 차감하지 않으므로 막을 이유가 없다.
    const isSuper = useAuthStore.getState().user?.isSuper ?? false;

    if (!isSuper && energy <= 0) {
      set({ modalVisible: true });
      return false;
    }
    onAllowed();
    return true;
  },
}));
