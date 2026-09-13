import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 말하기 연습 커서의 로컬 사본. 주제 코드 → 다음에 시작할 문장 번호.
 *
 * 진짜 기록은 서버(UserSpeakingProgress)다. 이건 그 앞에 두는 캐시고, 두 가지를 한다.
 *  · 서버가 아직 배포 안 됐거나 네트워크가 죽어도 이어서 시작된다
 *  · 화면을 열 때 서버 응답을 기다리지 않고 바로 자리를 잡는다
 *
 * 서버 응답이 오면 그게 이긴다 — 기기 여러 대에서 맞춰야 하는 값이라 로컬이
 * 최종 판정을 하면 안 된다.
 */
interface SpeakingCursorState {
  cursors: Record<string, number>;
  setCursor: (packCode: string, index: number, total: number) => void;
}

export const useSpeakingCursorStore = create<SpeakingCursorState>()(
  persist(
    (set) => ({
      cursors: {},
      setCursor: (packCode, index, total) =>
        set((state) => ({
          cursors: {
            ...state.cursors,
            // 끝까지 했으면 0 — 다시 들어오면 처음부터. 서버와 같은 규칙이다.
            [packCode]:
              total > 0 && index >= total ? 0 : Math.max(0, Math.trunc(index)),
          },
        })),
    }),
    {
      name: "speaking-cursor",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const speakingCursorOf = (packCode: string): number =>
  useSpeakingCursorStore.getState().cursors[packCode] ?? 0;
