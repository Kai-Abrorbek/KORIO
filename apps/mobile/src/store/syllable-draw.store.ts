import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 음절 쓰기 게임의 레벨 진행도.
 *
 * 서버에 둘 만한 게 아니다 — 한글 자모 진행도는 이미 `hangul` 모듈이
 * 기록하고 있고(획을 그을 때마다 자모 정/오답이 올라간다), 여기 남는 건
 * "몇 단계까지 열었나" 뿐이라 기기 안에 두는 걸로 충분하다.
 */
interface SyllableDrawState {
  /** 레벨 id → 그 레벨의 최고 별(1~3) */
  stars: Record<number, number>;
  recordResult: (levelId: number, stars: number) => void;
  clear: () => void;
}

export const useSyllableDrawStore = create<SyllableDrawState>()(
  persist(
    (set) => ({
      stars: {},
      recordResult: (levelId, stars) =>
        set((s) => {
          const best = s.stars[levelId] ?? 0;
          if (stars <= best) return s;
          return { stars: { ...s.stars, [levelId]: stars } };
        }),
      clear: () => set({ stars: {} }),
    }),
    {
      name: "syllable-draw",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

/** 1단계는 항상 열려 있고, 그다음부터는 앞 단계를 별 하나라도 받아야 열린다. */
export function isLevelUnlocked(
  levelId: number,
  stars: Record<number, number>,
): boolean {
  if (levelId <= 1) return true;
  return (stars[levelId - 1] ?? 0) > 0;
}
