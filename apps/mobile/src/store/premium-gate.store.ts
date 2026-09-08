import { create } from "zustand";
import type { Feature } from "@/features/subscription/access";

/**
 * 구독 유도 모달.
 *
 * 에너지 모달과 같은 방식이다 — 화면마다 모달을 들고 있으면 진입점이
 * 10곳 넘어서 다 따로 관리해야 한다. 스토어 하나로 모으고 _layout 에서
 * 한 번만 그린다.
 */
interface PremiumGateState {
  visible: boolean;
  /** 무엇을 열려다 막혔는지 — 모달 문구가 이걸로 갈린다 */
  feature: Feature | null;
  /** 맛보기로 들어가겠다고 했을 때 실행할 것 */
  tasterAction: (() => void) | null;
  open: (feature: Feature, tasterAction?: () => void) => void;
  close: () => void;
}

export const usePremiumGateStore = create<PremiumGateState>((set) => ({
  visible: false,
  feature: null,
  tasterAction: null,
  open: (feature, tasterAction) =>
    set({ visible: true, feature, tasterAction: tasterAction ?? null }),
  close: () => set({ visible: false, tasterAction: null }),
}));
