import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  TutorAddressStyle,
  TutorTeachingLanguage,
} from "../services/tutor.api";

/**
 * 튜터 화면의 개인 설정.
 *
 * "지난번에 고른 선생님" — 매번 네 명 중에 다시 고르게 하면 그건 선택이
 * 아니라 관문이 된다. 두 번째부터는 지난 선생님이 미리 선택돼 있어야 한다.
 *
 * 서버가 아니라 기기에 둔다. 계정마다 따라다닐 만큼 중요한 값이 아니고,
 * 서버에 두면 화면을 열 때마다 조회가 하나 더 붙는다.
 */
interface TutorPrefsState {
  teacherId: string | null;
  setTeacherId: (id: string) => void;
  /**
   * 튜터가 **나에게** 쓰는 말투.
   *
   * ⚠️ 가르치는 한국어의 존댓말/반말과는 **다른 축이다.** 반말 선생님이라도
   *    카페 주문은 "아이스 아메리카노 한 잔 주세요" 로 가르친다.
   * ⚠️ 성격과도 독립이다 — "놀리는데 존댓말" 을 고를 수 있어야 한다.
   *
   * 기본은 존댓말. 외국인이 한국에서 쓰기 안전한 쪽이다.
   */
  addressStyle: TutorAddressStyle;
  setAddressStyle: (style: TutorAddressStyle) => void;

  /**
   * 설명을 들을 언어.
   *
   * null = 아직 직접 고른 적이 없다. 그때만 앱 UI 언어를 기본값으로 삼는다.
   * ⚠️ 한 번 고른 뒤에는 앱 언어를 바꿔도 **따라가지 않는다.** 러시아어로 앱을
   *    쓰면서 한국어 설명을 듣는 사람이 매번 되돌려야 하면 안 된다.
   */
  teachingLanguage: TutorTeachingLanguage | null;
  setTeachingLanguage: (lang: TutorTeachingLanguage) => void;
}

export const useTutorPrefs = create<TutorPrefsState>()(
  persist(
    (set) => ({
      teacherId: null,
      setTeacherId: (teacherId) => set({ teacherId }),
      addressStyle: "polite",
      setAddressStyle: (addressStyle) => set({ addressStyle }),
      teachingLanguage: null,
      setTeachingLanguage: (teachingLanguage) => set({ teachingLanguage }),
    }),
    {
      name: "tutor-prefs",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
