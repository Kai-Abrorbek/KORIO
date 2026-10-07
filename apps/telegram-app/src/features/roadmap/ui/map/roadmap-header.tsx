"use client";

import { useRouter } from "next/navigation";

import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/**
 * 상단 통계 줄 (앱 RoadmapHeader) — 🇰🇷 스코어 ▾ · 🔥 스트릭 · 💎 보석 · 에너지(또는 SUPER).
 * 숫자는 전부 본문색, 아이콘만 색이 있다.
 */
export function RoadmapHeader({
  energy,
  gems,
  isSuper,
  isMax,
  onCourse,
  score,
  streak,
}: {
  energy: number;
  gems: number;
  isSuper: boolean;
  isMax: boolean;
  onCourse: () => void;
  score: number;
  streak: number;
}) {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <button onClick={onCourse} type="button">
        <span className={styles.flag}>🇰🇷</span>
        <b data-no-translate>{score}</b>
        <AppIcon className={styles.caret} name="caret-down" size={12} />
      </button>
      <span>
        <AppIcon className={styles.flame} name="flame" size={22} />
        <b data-no-translate>{streak}</b>
      </span>
      <span>
        <AppIcon className={styles.gem} name="diamond" size={20} />
        <b data-no-translate>{gems}</b>
      </span>
      {isSuper ? (
        <span className={`${styles.super} ${isMax ? styles.superMax : ""}`}>
          <b data-no-translate>{isMax ? "MAX" : "SUPER"}</b>
        </span>
      ) : (
        <button aria-label="Energiya" onClick={() => router.push("/energy")} type="button">
          <EnergyBadge energy={energy} />
        </button>
      )}
    </header>
  );
}

/** 배터리 모양 에너지 (앱 EnergyBadge size=26) */
export function EnergyBadge({ energy }: { energy: number }) {
  return (
    <span className={styles.energy}>
      <span className={styles.energyBody}>
        <AppIcon family="material-community" name="lightning-bolt" size={13} />
      </span>
      <i className={styles.energyNub} />
      <b data-no-translate>{energy}</b>
    </span>
  );
}
