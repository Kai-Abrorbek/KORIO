import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** 화면에서 잰 대상 버튼의 위치 (window 좌표) */
export interface TourRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 기능 안내 투어.
 *
 * "본 적 있나" 만 디스크에 남기고(persist), 진행 상태(step·측정값)는
 * 메모리에 둔다. 앱을 껐다 켰는데 3단계부터 다시 시작하면 더 이상하다.
 *
 * ⚠️ seen 은 화면(id)별로 남긴다. 나중에 로드맵·게임 화면에도 투어를
 * 붙일 때 홈 투어를 본 사람이 그것까지 건너뛰면 안 된다.
 */
interface TourState {
  /** 이미 본 투어 화면들 */
  seen: Record<string, boolean>;
  /** 지금 도는 투어 (없으면 null) */
  activeTour: string | null;
  step: number;
  /** 대상 id → 화면상 위치. 대상들이 마운트되며 채운다 */
  rects: Record<string, TourRect>;
  /**
   * 재측정 신호. 스크롤은 레이아웃을 바꾸지 않아서 onLayout 이 안 뜬다.
   * 스크롤한 뒤 이 값을 올리면 TourTarget 들이 다시 잰다.
   */
  measureNonce: number;

  markSeen: (tourId: string) => void;
  /** 아직 안 봤으면 시작한다. 이미 봤으면 아무 일도 안 일어난다 */
  startIfUnseen: (tourId: string) => void;
  /** 설정 화면 등에서 다시 보기 */
  restart: (tourId: string) => void;
  next: (total: number) => void;
  prev: () => void;
  finish: () => void;
  setRect: (id: string, rect: TourRect) => void;
  remeasure: () => void;
  clearRects: () => void;
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      seen: {},
      activeTour: null,
      step: 0,
      rects: {},
      measureNonce: 0,

      markSeen: (tourId) => set((s) => ({ seen: { ...s.seen, [tourId]: true } })),

      startIfUnseen: (tourId) => {
        if (get().seen[tourId] || get().activeTour) return;
        set({ activeTour: tourId, step: 0 });
      },

      restart: (tourId) => set({ activeTour: tourId, step: 0 }),

      next: (total) => {
        const { step } = get();
        if (step + 1 >= total) {
          get().finish();
          return;
        }
        set({ step: step + 1 });
      },

      prev: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      finish: () => {
        const id = get().activeTour;
        set((s) => ({
          activeTour: null,
          step: 0,
          seen: id ? { ...s.seen, [id]: true } : s.seen,
        }));
      },

      setRect: (id, rect) =>
        set((s) => {
          const prev = s.rects[id];
          // 같은 값이면 쓰지 않는다 — 매 레이아웃마다 store 를 갱신하면
          // 투어를 쓰는 화면 전체가 계속 리렌더된다
          if (
            prev &&
            Math.abs(prev.x - rect.x) < 1 &&
            Math.abs(prev.y - rect.y) < 1 &&
            Math.abs(prev.width - rect.width) < 1 &&
            Math.abs(prev.height - rect.height) < 1
          ) {
            return s;
          }
          return { rects: { ...s.rects, [id]: rect } };
        }),

      remeasure: () => set((s) => ({ measureNonce: s.measureNonce + 1 })),

      clearRects: () => set({ rects: {} }),
    }),
    {
      name: "tour-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // 진행 상태는 저장하지 않는다. 껐다 켜면 처음부터가 맞다
      partialize: (s) => ({ seen: s.seen }),
    },
  ),
);
