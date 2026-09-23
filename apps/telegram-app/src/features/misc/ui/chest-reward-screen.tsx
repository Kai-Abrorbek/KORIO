"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./chest-reward-screen.module.css";

type Phase = "idle" | "opening" | "revealed";

const TITLES = {
  gold: "Afsonaviy buyum",
  silver: "Noyob buyum",
  wood: "Oddiy buyum",
} as const;

function GemCounter({ amount, target }: { amount: number; target: number }) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!amount) { setDisplay(target); return; }
    const start = target - amount;
    const steps = Math.min(Math.abs(amount), 30);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setDisplay(count >= steps ? target : Math.round(start + amount * count / steps));
      if (count >= steps) window.clearInterval(timer);
    }, 35);
    return () => window.clearInterval(timer);
  }, [amount, target]);
  return <span className={styles.gemCounter}><MobileIcon name="diamond" size={22} />{display}</span>;
}

function Sparkles() {
  return <div className={styles.sparkles} aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div>;
}

function Chest({ opening, ready, shaking }: { opening: boolean; ready: boolean; shaking: boolean }) {
  return (
    <div className={`${styles.chestScene} ${ready ? styles.chestReady : ""} ${shaking ? styles.chestShaking : ""} ${opening ? styles.chestOpening : ""}`}>
      <i className={styles.chestGlow} />
      {opening ? <><i className={styles.chestFlash} /><div className={styles.burst}>{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}</div></> : null}
      <div className={styles.chestBox}>
        <i className={styles.chestShadow} />
        <div className={styles.chestBase}><span><i /><i /></span></div>
        <div className={styles.chestLid}><span><i /></span></div>
        <div className={styles.chestLock}><i /></div>
      </div>
      {opening ? <div className={styles.gemParticles}>{["💎","✨","⭐","💫","💎","✨","⭐","💫"].map((item,index)=><i key={index} style={{ "--i": index } as CSSProperties}>{item}</i>)}</div> : null}
    </div>
  );
}

function GemsPile() {
  return <div className={styles.gemsPile}><i className={styles.gemShadow}/>{Array.from({ length: 5 },(_,index)=><span key={index} style={{ "--i": index } as CSSProperties}><i /></span>)}</div>;
}

export function ChestRewardScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const gradeRaw = params.get("grade") ?? "wood";
  const grade = gradeRaw === "gold" || gradeRaw === "silver" ? gradeRaw : "wood";
  const gems = Math.max(0, Number(params.get("gems")) || 0);
  const gemTotal = Math.max(0, Number(params.get("gemTotal")) || 0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [tapCount, setTapCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  const tap = () => {
    if (phase !== "idle") return;
    window.Telegram?.WebApp.HapticFeedback?.impactOccurred("medium");
    const next = tapCount + 1;
    setTapCount(next);
    if (next < 3) {
      setShaking(false);
      window.requestAnimationFrame(() => setShaking(true));
      window.setTimeout(() => setShaking(false), 430);
      return;
    }
    setPhase("opening");
    window.Telegram?.WebApp.HapticFeedback?.notificationOccurred("success");
    window.setTimeout(() => setPhase("revealed"), 1450);
  };

  const instruction = tapCount === 0 ? "Yangilash uchun bosing!" : tapCount === 2 ? "1 imkoniyat qoldi!" : "Bosing!";
  const back = () => {
    if (window.history.length > 1) { router.back(); return; }
    if (params.get("from") === "studyPath") { router.replace("/study-path"); return; }
    const category = params.get("category");
    router.replace(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/roadmap");
  };

  return (
    <main className={styles.page}>
      <header><span/><GemCounter amount={phase === "revealed" ? gems : 0} target={phase === "revealed" ? gemTotal + gems : gemTotal}/></header>
      <section className={`${styles.rewardSection} ${phase === "revealed" ? styles.sectionHidden : ""}`}>
        <h1>{TITLES[grade]}</h1>
        <button aria-label="Sandiqni ochish" className={styles.chestButton} onClick={tap} type="button"><Sparkles/><Chest opening={phase === "opening"} ready={ready} shaking={shaking}/></button>
        <div className={styles.tapBottom}>
          <div className={styles.tapDots}>{Array.from({ length: 3 },(_,index)=>{
            const used=index<tapCount; const active=index===tapCount;
            return <span className={`${used?styles.dotUsed:""} ${active?styles.dotActive:""}`} key={index}>{used?null:<MobileIcon name="arrow-up" size={18}/>}</span>;
          })}</div>
          <strong>{instruction}</strong>
        </div>
      </section>
      {phase === "revealed" ? <section className={`${styles.rewardSection} ${styles.revealedSection}`}>
        <h2>Tosh +{gems}</h2>
        <div className={styles.pileArea}><Sparkles/><GemsPile/></div>
        <button className={styles.continueButton} onClick={back} type="button">Davom etish</button>
      </section> : null}
    </main>
  );
}
