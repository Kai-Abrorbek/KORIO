"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../auth/model/telegram-auth-context";
import { MobileIcon } from "../../shared/ui/mobile-icon";
import { getEnergy } from "../misc/api/misc";
import { getMistakeCount } from "../retention/api/retention";
import { rt } from "../retention/model/retention";
import { energySpendsSettled } from "./energy-sync";
import styles from "./energy-gate.module.css";

/**
 * 에너지 부족 모달 — 모바일의 useEnergyStore.guardLessonStart + 전역 EnergyModal.
 *
 * 레슨·복습·전설·한글 게임처럼 에너지를 쓰는 입구에서 guard(onAllowed) 를 부른다.
 * SUPER 거나 에너지가 남아 있으면 바로 진행, 아니면 모달을 띄운다
 * (서버도 SUPER 는 차감하지 않으니 막을 이유가 없다).
 */
const TRIAL_DAYS = 30;

interface ModalState {
  open: boolean;
  /**
   * 레슨 도중에 바닥나서 뜬 모달인가 (앱 energy.store modalFromLesson 과 같다).
   * 그러면 "괜찮아요" 는 레슨을 나가고, "복습으로 벌기" 는 레슨 위에 복습을 띄워서
   * 다 벌면 그 레슨으로 돌아와 이어서 푼다.
   */
  fromLesson: boolean;
}

const listeners = new Set<(state: ModalState) => void>();
function setModal(state: ModalState) {
  listeners.forEach((listener) => listener(state));
}

export function openEnergyModal(fromLesson = false) {
  setModal({ open: true, fromLesson });
}

/**
 * 화면에 들어올 때 에너지·보석을 서버 값으로 맞춘다 (앱 useEnergySync).
 * 시작 게이트와 헤더가 보는 값 — 다른 모드·레슨에서 쓴 만큼이 여기서도 보여야 한다.
 * 레슨에서 막 나왔으면 마지막 차감이 서버에 닿은 뒤에 묻는다
 * (먼저 물으면 한 칸 덜 깎인 값이 와서 숫자가 되감긴다).
 */
export function useEnergySync() {
  const { request, updateUser } = useTelegramAuth();
  useEffect(() => {
    let active = true;
    void energySpendsSettled()
      .then(() =>
        request<{ energy?: number; gems?: number; isSuper?: boolean; superExpiresAt?: string | null }>("/users/me"),
      )
      .then((me) => {
        if (!active) return;
        const synced = {
          energy: me.energy,
          gems: me.gems,
          isSuper: me.isSuper,
          superExpiresAt: me.superExpiresAt,
        };
        // 응답에 없는 값으로 이미 알던 값을 지우지 않는다
        updateUser(Object.fromEntries(Object.entries(synced).filter(([, value]) => value !== undefined)));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [request, updateUser]);
}

export function useEnergyGuard() {
  const { user } = useTelegramAuth();
  return useCallback(
    (onAllowed: () => void, energyOverride?: number) => {
      const superActive = Boolean(
        user?.isSuper &&
          (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
      );
      const energy = energyOverride ?? user?.energy ?? 0;
      if (!superActive && energy <= 0) {
        openEnergyModal();
        return false;
      }
      onAllowed();
      return true;
    },
    [user],
  );
}

function Battery({ value, pink = false, fraction = 0.42 }: { value: number | string; pink?: boolean; fraction?: number }) {
  return (
    <span className={styles.battery}>
      <span className={styles.batteryBody}>
        {pink ? <i style={{ width: `${fraction * 100}%` }} /> : null}
        <b data-no-translate>{value}</b>
      </span>
      <em className={pink ? styles.nubPink : styles.nub} />
    </span>
  );
}

export function EnergyModalHost() {
  const router = useRouter();
  const { request, user } = useTelegramAuth();
  const [state, setState] = useState<ModalState>({ open: false, fromLesson: false });
  const open = state.open;
  // 복습으로 벌기 — 틀린 문제가 있고 오늘 더 벌 수 있을 때만 보여준다
  const [earn, setEarn] = useState<number | null>(null);
  // 무료 체험을 이미 쓴 사람에게 "30일 무료" 를 다시 약속하지 않는다 (앱 EnergyModal 과 동일)
  const usedTrial = Boolean(user?.hasUsedTrial) || user?.superPlan === "trial";

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    setEarn(null);
    void Promise.all([
      getEnergy(request).catch(() => null),
      getMistakeCount(request).catch(() => null),
    ]).then(([energy, mistakes]) => {
      if (!alive || !energy || !mistakes) return;
      const remaining = energy.earnRemaining ?? 0;
      if ((mistakes.count ?? 0) > 0 && remaining > 0) {
        setEarn(Math.min(remaining, energy.earnSessionMax ?? remaining));
      }
    });
    return () => {
      alive = false;
    };
  }, [open, request]);

  if (!open) return null;
  const close = () => setState({ open: false, fromLesson: false });
  const toShop = () => {
    close();
    // 상점에서 실제로 충전·무료 +10 이 되므로 거기로 보낸다 (앱도 같다)
    router.push("/shop");
  };

  return (
    <div aria-modal="true" className={styles.backdrop} role="dialog">
      <span className={styles.gemFloat}>
        <MobileIcon name="diamond" size={20} />
        <b>{user?.gems ?? 0}</b>
      </span>
      <section className={styles.sheet}>
        {/* 에너지가 바닥난 자리라 지친 표정 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className={styles.mascot} src="/characters/hangulmon_exhausted.png" />
        <h2>Bu darsni boshlash uchun ko&apos;proq energiya kerak!</h2>

        <div className={styles.cards}>
          <div className={styles.superWrap}>
            <button
              className={styles.superCard}
              onClick={() => {
                close();
                router.push("/premium");
              }}
              type="button"
            >
              <span className={styles.superTag}>SUPER</span>
              <span className={styles.superBattery}>
                <span><MobileIcon family="material-community" name="infinity" size={22} /></span>
                <em />
              </span>
              <b>Cheksiz</b>
              <strong className={styles.magenta}>
                {usedTrial ? "SUPER'ni boshlash" : "Bepul sinab ko'rish"}
              </strong>
            </button>
            <span className={styles.check}><MobileIcon name="checkmark-circle" size={28} /></span>
          </div>
          <button className={`${styles.card} ${styles.dim}`} onClick={toShop} type="button">
            <Battery value={50} />
            <b className={styles.gray}>To&apos;ldirish</b>
            <span className={styles.gemRow}><MobileIcon name="diamond" size={16} /><strong>350</strong></span>
          </button>
          <button className={styles.card} onClick={toShop} type="button">
            <Battery fraction={0.42} pink value={10} />
            <b>Energiya +10</b>
            <strong className={styles.blue}>Bepul olish</strong>
          </button>
        </div>

        {/* 복습으로 에너지 벌기 — 바닥났을 때 앱을 닫는 대신 할 수 있는 일 */}
        {earn ? (
          <button
            className={styles.earnRow}
            onClick={() => {
              close();
              router.push("/lesson?mode=review&earn=1");
            }}
            type="button"
          >
            <i><MobileIcon name="refresh" size={22} /></i>
            <span>
              <b>{rt("earn.title")}</b>
              <small>{rt("earn.sub", { n: earn })}</small>
            </span>
            <em><MobileIcon name="flash" size={13} />+{earn}</em>
          </button>
        ) : null}

        <button
          className={styles.cta}
          onClick={() => {
            close();
            router.push("/premium");
          }}
          type="button"
        >
          {usedTrial ? "SUPER bilan cheksiz energiya" : `${TRIAL_DAYS} kun bepul sinab ko'rish`}
        </button>
        <button
          className={styles.dismiss}
          onClick={() => {
            const fromLesson = state.fromLesson;
            close();
            // 레슨 도중이면 레슨을 나간다. 시작 게이트에서 떴으면 그 자리에 머문다 (앱과 같다)
            if (fromLesson) {
              if (window.history.length > 1) router.back();
              else router.replace("/home");
            }
          }}
          type="button"
        >
          Yo&apos;q, rahmat
        </button>
      </section>
    </div>
  );
}
