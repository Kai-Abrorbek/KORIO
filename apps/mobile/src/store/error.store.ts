import { create } from "zustand";

interface ErrorState {
  visible: boolean;
  code: string | null;
  _resolvers: ((retry: boolean) => void)[];
  present: (code: string) => Promise<boolean>; // 재시도 여부를 promise로 반환
  retry: () => void;
  dismiss: () => void;
}

export const useErrorStore = create<ErrorState>((set, get) => ({
  visible: false,
  code: null,
  _resolvers: [],
  present: (code) =>
    new Promise<boolean>((resolve) => {
      set((st) => ({
        visible: true,
        code: st.visible ? st.code : code, // 이미 떠 있으면 첫 에러 유지 (합침)
        _resolvers: [...st._resolvers, resolve],
      }));
    }),
  retry: () => {
    const rs = get()._resolvers;
    set({ visible: false, _resolvers: [] });
    rs.forEach((r) => r(true)); // 대기 중인 모든 요청 재시도
  },
  dismiss: () => {
    const rs = get()._resolvers;
    set({ visible: false, _resolvers: [] });
    rs.forEach((r) => r(false)); // 전부 포기(reject)
  },
}));
