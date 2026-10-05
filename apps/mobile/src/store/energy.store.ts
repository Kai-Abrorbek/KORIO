import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { create } from "zustand";
import { EnergyService } from "@/services/energy.service";
import { useAuthStore } from "./auth.store";

// ─────────────────────────── 서버 에너지 동기화 ───────────────────────────
//
// 에너지의 주인은 서버(유저 문서) 하나다. 자유 학습·학습 로드·표현·한글·챌린지
// 어디서 쓰든 같은 값이어야 한다. 앱은 auth 스토어의 user.energy 를 거울로만
// 들고, 화면에 들어올 때마다 서버 값으로 다시 맞춘다.
//
// ⚠️ 레슨에서 맞힐 때마다 /energy/spend 가 날아간다. 그게 서버에 닿기 **전에**
//    다른 화면이 에너지를 물어보면 한 칸 덜 깎인 값이 와서 화면 숫자를 되감는다
//    ("나갔다 오니 다시 찼다"). 그래서 진행 중인 차감을 여기 모아 두고, 조회는
//    그게 끝난 뒤에 한다.

const inflightSpends = new Set<Promise<unknown>>();

/** 레슨의 /energy/spend 요청을 등록한다. 조회가 이걸 기다린다 */
export function trackEnergySpend<T>(p: Promise<T>): Promise<T> {
  inflightSpends.add(p);
  const done = () => {
    inflightSpends.delete(p);
  };
  p.then(done, done);
  return p;
}

/** 진행 중인 차감이 서버에 닿을 때까지 기다린다 (네트워크가 죽어도 timeoutMs 뒤엔 놓아준다) */
export async function energySpendsSettled(timeoutMs = 3000): Promise<void> {
  if (inflightSpends.size === 0) return;
  await Promise.race([
    Promise.allSettled([...inflightSpends]),
    new Promise((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

let syncSeq = 0;

/**
 * 서버의 진짜 에너지·보석으로 화면 거울을 맞춘다.
 * GET /energy 는 흐른 시간만큼 회복까지 반영해서 돌려준다.
 */
export async function syncEnergyFromServer(): Promise<void> {
  if (!useAuthStore.getState().isLoggedIn) return;
  const seq = ++syncSeq;
  await energySpendsSettled();
  try {
    const state = await EnergyService.getState();
    // 그사이 더 늦게 보낸 조회가 있으면 그게 더 최신이다 — 옛 응답으로 덮지 않는다
    if (seq !== syncSeq) return;
    useAuthStore.getState().updateUser({
      energy: state.energy,
      gems: state.gems,
    });
  } catch {
    // 실패하면 거울을 그대로 둔다. 다음 화면 진입 때 다시 맞춘다
  }
}

/** 에너지를 보여주거나 쓰는 화면에 넣는다 — 들어올 때마다 서버 값으로 맞춘다 */
export function useEnergySync(): void {
  useFocusEffect(
    useCallback(() => {
      void syncEnergyFromServer();
    }, []),
  );
}

interface EnergyState {
  modalVisible: boolean;
  openEnergyModal: () => void;
  closeEnergyModal: () => void;
  /**
   * 학습 시작 게이트. 에너지 있으면 onAllowed() 실행, 없으면 모달 띄움.
   * SUPER 는 에너지를 안 쓰므로 항상 통과시킨다.
   * @returns 시작 가능 여부
   */
  guardLessonStart: (energy: number, onAllowed: () => void) => boolean;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  modalVisible: false,
  openEnergyModal: () => set({ modalVisible: true }),
  closeEnergyModal: () => set({ modalVisible: false }),
  guardLessonStart: (energy, onAllowed) => {
    // 호출부가 여러 곳이라 여기서 직접 확인한다.
    // 서버도 SUPER 면 에너지를 차감하지 않으므로 막을 이유가 없다.
    const isSuper = useAuthStore.getState().user?.isSuper ?? false;

    if (!isSuper && energy <= 0) {
      set({ modalVisible: true });
      return false;
    }
    onAllowed();
    return true;
  },
}));
