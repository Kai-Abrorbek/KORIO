import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 튜터 화면의 개인 설정.
 *
 * 지금은 "지난번에 고른 선생님" 하나뿐이다. 매번 네 명 중에 다시 고르게
 * 하면 그건 선택이 아니라 관문이 된다 — 두 번째부터는 지난 선생님이 미리
 * 선택돼 있어야 한다.
 *
 * 서버가 아니라 기기에 둔다. 계정마다 따라다닐 만큼 중요한 값이 아니고,
 * 서버에 두면 화면을 열 때마다 조회가 하나 더 붙는다.
 */
interface TutorPrefsState {
  teacherId: string | null;
  setTeacherId: (id: string) => void;
}

export const useTutorPrefs = create<TutorPrefsState>()(
  persist(
    (set) => ({
      teacherId: null,
      setTeacherId: (teacherId) => set({ teacherId }),
    }),
    {
      name: "tutor-prefs",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
