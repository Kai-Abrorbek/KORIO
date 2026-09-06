import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReferralState {
  /**
   * 초대 링크로 들어왔지만 아직 못 쓴 코드.
   *
   * 링크를 누르는 시점엔 대개 로그인 전이다. 설문 → 진단 → 요금제 → 로그인까지
   * 가는 동안 앱이 죽을 수도 있어서 **persist 여야 한다.** 안 그러면 초대를
   * 받고 들어온 사람이 보상을 못 받고, 초대한 쪽도 못 받는다.
   */
  pendingCode: string | null;
  setPendingCode: (code: string | null) => void;
  clear: () => void;
}

export const useReferralStore = create<ReferralState>()(
  persist(
    (set) => ({
      pendingCode: null,
      setPendingCode: (code) => set({ pendingCode: code }),
      clear: () => set({ pendingCode: null }),
    }),
    {
      name: "referral-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
