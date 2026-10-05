"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../auth/model/telegram-auth-context";
import { MobileIcon } from "../../shared/ui/mobile-icon";
import styles from "./energy-gate.module.css";

/**
 * 에너지 부족 모달 — 모바일의 useEnergyStore.guardLessonStart + 전역 EnergyModal.
 *
 * 레슨·복습·전설·한글 게임처럼 에너지를 쓰는 입구에서 guard(onAllowed) 를 부른다.
 * SUPER 거나 에너지가 남아 있으면 바로 진행, 아니면 모달을 띄운다
 * (서버도 SUPER 는 차감하지 않으니 막을 이유가 없다).
 */
const TRIAL_DAYS = 30;

const listeners = new Set<(open: boolean) => void>();
function setModal(open: boolean) {
  listeners.forEach((listener) => listener(open));
}

export function openEnergyModal() {
  setModal(true);
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
  const { user } = useTelegramAuth();
  const [open, setOpen] = useState(false);
  // 무료 체험을 이미 쓴 사람에게 "30일 무료" 를 다시 약속하지 않는다 (앱 EnergyModal 과 동일)
  const usedTrial = Boolean(user?.hasUsedTrial) || user?.superPlan === "trial";

  useEffect(() => {
    listeners.add(setOpen);
    return () => {
      listeners.delete(setOpen);
    };
  }, []);

  if (!open) return null;
  const close = () => setOpen(false);
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
            close();
            // 앱처럼 로드맵으로 돌려보낸다 (레슨 화면에서 떴을 때 거기 머물지 않게)
            router.replace("/roadmap");
          }}
          type="button"
        >
          Yo&apos;q, rahmat
        </button>
      </section>
    </div>
  );
}
