import { create } from "zustand";
import {
  RetentionService,
  type RetentionSummary,
} from "@/services/retention.service";
import { useAuthStore } from "./auth.store";

interface RetentionState {
  summary: RetentionSummary | null;
  loading: boolean;
  /** 서버에서 다시 받아온다. 보석·연속·복구펜 수를 auth 거울에도 맞춘다 */
  refresh: () => Promise<RetentionSummary | null>;
  /** 받은 응답의 일부만 바꿀 때 (보상 받은 직후 등) */
  patch: (fn: (s: RetentionSummary) => RetentionSummary) => void;
}

let seq = 0;

/**
 * 홈·연속 목표 화면·상점이 같은 요약을 본다. 한 곳에서 받고 같이 쓴다.
 * 서버가 주인이다 — 여기 값은 화면용 거울.
 */
export const useRetentionStore = create<RetentionState>((set) => ({
  summary: null,
  loading: false,
  refresh: async () => {
    if (!useAuthStore.getState().isLoggedIn) return null;
    const my = ++seq;
    set({ loading: true });
    try {
      const s = await RetentionService.summary();
      if (my !== seq) return s; // 더 늦게 보낸 요청이 있다
      set({ summary: s, loading: false });
      useAuthStore.getState().updateUser({
        gems: s.gems,
        streak: s.streak,
        streakFreeze: s.freeze.owned,
      } as any);
      return s;
    } catch {
      if (my === seq) set({ loading: false });
      return null;
    }
  },
  patch: (fn) => set((st) => (st.summary ? { summary: fn(st.summary) } : {})),
}));
