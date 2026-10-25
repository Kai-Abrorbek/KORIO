import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 잘 안 보이는 기능을 알리는 안내 모달 (친구 초대 · 텔레그램 스티커팩 · 보석 출금).
 *
 * 규칙 (2026-10-26 정함):
 *  - 처음 본 날(이 기기)에는 안 띄운다 — 앱에 익숙해진 다음에
 *  - 세 가지를 합쳐 하루에 하나
 *  - 기능마다 최대 MAX_SHOWS 번, "다시 보지 않기" 면 끝
 *  - 아무 때나가 아니라 그 기능이 의미 있는 순간에 (pending 트리거 · 보석 개수)
 *
 * 기록은 기기에만 둔다 (서버 DB 를 안 바꾼다). 기기를 바꾸면 한 번 더 보일 수 있다.
 */
export const FEATURE_TIPS = ["payout", "invite", "stickers"] as const;
export type FeatureTipId = (typeof FEATURE_TIPS)[number];

export const MAX_SHOWS = 2;
/** 보석이 이만큼 모이면 출금을 알린다 */
export const PAYOUT_TIP_GEMS = 10000;

/** 기기 시간대 기준 YYYY-MM-DD */
export const localDay = (at = new Date()) =>
  `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}-${String(at.getDate()).padStart(2, "0")}`;

interface FeatureTipsState {
  /** 이 기기에서 홈을 처음 본 날 */
  firstSeenDay: string | null;
  /** 마지막으로 하나를 띄운 날 — 하루에 하나 */
  lastShownDay: string | null;
  shown: Partial<Record<FeatureTipId, number>>;
  /** "다시 보지 않기" 또는 이미 쓰고 있어서 알릴 필요가 없어진 것 */
  done: Partial<Record<FeatureTipId, boolean>>;
  /** 의미 있는 순간이 지나갔다 — 다음에 홈에 오면 띄울 후보 (상자 열기 → 초대, 아바타 저장 → 스티커) */
  pending: Partial<Record<FeatureTipId, boolean>>;

  touchFirstSeen: () => void;
  trigger: (id: FeatureTipId) => void;
  recordShown: (id: FeatureTipId) => void;
  finish: (id: FeatureTipId) => void;
}

export const useFeatureTipsStore = create<FeatureTipsState>()(
  persist(
    (set, get) => ({
      firstSeenDay: null,
      lastShownDay: null,
      shown: {},
      done: {},
      pending: {},

      touchFirstSeen: () => {
        if (!get().firstSeenDay) set({ firstSeenDay: localDay() });
      },
      trigger: (id) => {
        if (get().done[id]) return;
        set((s) => ({ pending: { ...s.pending, [id]: true } }));
      },
      recordShown: (id) =>
        set((s) => ({
          lastShownDay: localDay(),
          shown: { ...s.shown, [id]: (s.shown[id] ?? 0) + 1 },
          pending: { ...s.pending, [id]: false },
        })),
      finish: (id) =>
        set((s) => ({
          done: { ...s.done, [id]: true },
          pending: { ...s.pending, [id]: false },
        })),
    }),
    {
      name: "feature-tips-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        firstSeenDay: s.firstSeenDay,
        lastShownDay: s.lastShownDay,
        shown: s.shown,
        done: s.done,
        pending: s.pending,
      }),
    },
  ),
);

/** 상자 화면·아바타 편집기처럼 스토어를 구독하지 않는 곳에서 부른다 */
export const triggerFeatureTip = (id: FeatureTipId) =>
  useFeatureTipsStore.getState().trigger(id);
