"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./legend-intro-screen.module.css";

const LEGEND_XP = 100;

export function LegendIntroScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useTelegramAuth();
  const [showEnergy, setShowEnergy] = useState(false);
  const nodeId = params.get("nodeId");
  const category = params.get("category") ?? "";
  const queryEnergy = Number(params.get("energy"));
  const energy = user?.energy ?? (Number.isFinite(queryEnergy) ? queryEnergy : 0);
  const isSuper = Boolean(
    user?.isSuper &&
      (!user.superExpiresAt || new Date(user.superExpiresAt).getTime() > Date.now()),
  );

  const roadmap = category ? `/roadmap?category=${encodeURIComponent(category)}` : "/roadmap";

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.replace(roadmap);
  };

  const start = () => {
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("light");
    if (!isSuper && energy <= 0) {
      setShowEnergy(true);
      return;
    }
    if (!nodeId) {
      router.replace(roadmap);
      return;
    }
    const query = new URLSearchParams({ mode: "legend", nodeId });
    if (category) query.set("category", category);
    router.replace(`/lesson?${query.toString()}`);
  };

  return (
    <main className={styles.page}>
      <section className={styles.body}>
        <div className={styles.hero} aria-hidden="true">
          <div className={styles.glow} />
          <span className={`${styles.spark} ${styles.sparkOne}`}>✦</span>
          <span className={`${styles.spark} ${styles.sparkTwo}`}>✦</span>
          <span className={`${styles.spark} ${styles.sparkThree}`}>✦</span>
          <div className={styles.trophyWrap}>
            <MobileIcon name="trophy" size={130} />
            <div className={styles.podium}><MobileIcon name="checkmark" size={40} /></div>
          </div>
        </div>
        <h1>Mahoratingizni isbotlang! Qo&apos;shimcha mukofot ham bor.</h1>
      </section>

      <footer className={styles.footer}>
        <button className={styles.startButton} onClick={start} type="button">
          Boshlash +{LEGEND_XP} XP
        </button>
        <button className={styles.laterButton} onClick={goBack} type="button">Keyinroq</button>
      </footer>

      {showEnergy ? (
        <div className={styles.energyBackdrop} role="dialog" aria-modal="true" aria-labelledby="energy-title">
          <div className={styles.gems}><MobileIcon name="diamond" size={20} /><b>{user?.gems ?? 20}</b></div>
          <section className={styles.energySheet}>
            <Image alt="" className={styles.energyMascot} height={92} src="/characters/hangulmon_confused.png" unoptimized width={92} />
            <h2 id="energy-title">Bu darsni boshlash uchun ko&apos;proq energiya kerak!</h2>
            <div className={styles.energyCards}>
              <button className={styles.superCard} onClick={() => router.push("/premium")} type="button">
                <span>SUPER</span><MobileIcon name="infinite" size={44} /><b>Cheksiz</b><small>Bepul sinab ko&apos;rish</small>
                <i><MobileIcon name="checkmark-circle" size={28} /></i>
              </button>
              <button className={`${styles.energyCard} ${styles.disabledCard}`} onClick={() => setShowEnergy(false)} type="button">
                <MobileIcon name="flash" size={44} /><b>To&apos;ldirish</b><small><MobileIcon name="diamond" size={16} />350</small>
              </button>
              <button className={styles.energyCard} onClick={() => setShowEnergy(false)} type="button">
                <MobileIcon name="flash" size={44} /><b>Energiya +5</b><small>Reklama ko&apos;rish</small>
              </button>
            </div>
            <button className={styles.trialButton} onClick={() => router.push("/premium")} type="button">30 kun bepul sinab ko&apos;rish</button>
            <button className={styles.dismissButton} onClick={() => router.replace(roadmap)} type="button">Yo&apos;q, rahmat</button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
