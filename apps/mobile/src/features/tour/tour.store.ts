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

      /**
       * ⚠️ 시작·이동할 때 rects 를 비운다.
       *
       * 남겨두면 **틀린 자리에 구멍이 한 프레임 뚫린다.** 이전에 잰 좌표는
       * 그 사이 데이터가 늦게 도착하거나 스크롤이 되면서 이미 옛날 것이다.
       * 비워두면 그 프레임엔 구멍 없이 어둡기만 하고, 대상이 스스로 다시
       * 재서(TourTarget 폴링) 곧 정확한 자리에 뚫린다.
       */
      startIfUnseen: (tourId) => {
        if (get().seen[tourId] || get().activeTour) return;
        set({ activeTour: tourId, step: 0, rects: {} });
      },

      restart: (tourId) => set({ activeTour: tourId, step: 0, rects: {} }),

      next: (total) => {
        const { step } = get();
        if (step + 1 >= total) {
          get().finish();
          return;
        }
        set({ step: step + 1, rects: {} });
      },

      prev: () => set((s) => ({ step: Math.max(0, s.step - 1), rects: {} })),

      finish: () => {
        const id = get().activeTour;
        set((s) => ({
          activeTour: null,
          step: 0,
          seen: id ? { ...s.seen, [id]: true } : s.seen,
        }));
      },

      setRect: (id, raw) =>
        set((s) => {
          /**
           * 정수로 끊는다.
           *
           * measureInWindow 는 소수를 준다 (470.333…). 화면이 가만히 있어도
           * 프레임마다 소수점이 흔들려서, "1px 미만이면 무시" 를 통과해
           * 계속 새 값이 들어오는 일이 생긴다. 그러면 그 값에 매달린 구멍과
           * 말풍선이 미세하게 떤다.
           */
          const rect = {
            x: Math.round(raw.x),
            y: Math.round(raw.y),
            width: Math.round(raw.width),
            height: Math.round(raw.height),
          };
          const prev = s.rects[id];
          /**
           * 2px 미만 변화는 무시한다 (히스테리시스).
           *
           * 활성 대상은 80ms 마다 다시 재는데, 화면이 가만히 있어도 측정값
           * 끝자리가 흔들려 1px 씩 오갈 수 있다. 그걸 그대로 받으면 구멍과
           * 말풍선이 초당 열두 번 떤다. 진짜 움직임(스크롤·내용 증가)은
           * 2px 을 훌쩍 넘으므로 놓칠 일은 없다.
           */
          if (
            prev &&
            Math.abs(prev.x - rect.x) < 2 &&
            Math.abs(prev.y - rect.y) < 2 &&
            Math.abs(prev.width - rect.width) < 2 &&
            Math.abs(prev.height - rect.height) < 2
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
