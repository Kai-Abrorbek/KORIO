"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { HomeIcon } from "../../home/ui/home-icon";
import { backToLearning } from "../model/lesson";
import styles from "./lesson.module.css";

function useJumpParams() {
  const params = useSearchParams();
  return {
    category: params.get("category"),
    section: Math.max(1, Number(params.get("section")) || 1),
    target: params.get("target"),
    unit: Math.max(1, Number(params.get("unit")) || 1),
  };
}

export function JumpStartScreen() {
  const router = useRouter();
  const { category, section, target, unit } = useJumpParams();
  const sectionJump = target === "section";
  const next = () => {
    const query = new URLSearchParams({
      category: category ?? "",
      section: String(section),
      target: target ?? "",
      unit: String(unit),
    });
    router.push(`/jump-intro?${query.toString()}`);
  };

  return (
    <main className={styles.jumpPage}>
      <section className={styles.jumpHero}>
        {!sectionJump ? (
          <div className={styles.unitMark}><span>🇰🇷</span><b>{unit}</b></div>
        ) : (
          <span className={styles.jumpEyebrow}>TEZKOR O&apos;TISH</span>
        )}
        <div className={styles.mascotHalo}>
          <span className={styles.haloRing} />
          <Image alt="KORIO" height={158} src="/characters/hangulmon_default.png" unoptimized width={158} />
        </div>
        <h1>
          {sectionJump
            ? `Bu testdan o'tsangiz, ${section}-bo'limga o'tasiz.`
            : `${unit}-unitga o'tib, mahoratingizni ko'rsating!`}
        </h1>
        <p>Oldingi mavzulardan tanlangan qisqa sinov bilan darajangizni ko&apos;rsating.</p>
      </section>
      <footer className={styles.jumpFooter}>
        <button className={styles.blueAction} onClick={next} type="button">
          Testni boshlash <HomeIcon name="arrow" size={20} />
        </button>
        <button className={styles.blueTextAction} onClick={() => router.replace(backToLearning(category))} type="button">
          Keyinroq
        </button>
      </footer>
    </main>
  );
}

export function JumpIntroScreen() {
  const router = useRouter();
  const { category, section, target, unit } = useJumpParams();
  const hearts = target === "section" || section >= 2 ? 3 : 5;
  const start = () => {
    const query = new URLSearchParams({
      category: category ?? "",
      mode: "jumpTest",
      section: String(section),
      target: target ?? "",
      unit: String(unit),
    });
    router.replace(`/lesson?${query.toString()}`);
  };

  return (
    <main className={styles.jumpPage}>
      <header className={styles.jumpIntroHeader}>
        <button aria-label="Yopish" onClick={() => router.back()} type="button">×</button>
        <div>{Array.from({ length: hearts }, (_, index) => <span key={index}>♥</span>)}</div>
      </header>
      <section className={styles.ruleStage}>
        <div className={styles.ruleVisual}>
          <Image alt="KORIO" height={124} src="/characters/hangulmon_default.png" unoptimized width={124} />
          <div className={styles.speechBubble}>
            <span>SINOV QOIDASI</span>
            <strong>{hearts} tadan kam xato qiling</strong>
            <p>Har bir yurak — bitta imkoniyat. Oxirigacha diqqat bilan boring!</p>
          </div>
        </div>
        <div className={styles.ruleCards}>
          <article><b>25</b><span>gacha savol</span></article>
          <article><b>{hearts}</b><span>imkoniyat</span></article>
          <article><b>1</b><span>yangi start</span></article>
        </div>
      </section>
      <footer className={styles.jumpFooter}>
        <button className={styles.greenAction} onClick={start} type="button">
          Davom etish <HomeIcon name="arrow" size={20} />
        </button>
      </footer>
    </main>
  );
}

export function JumpResultScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category");
  const passed = params.get("passed") === "1";
  const section = params.get("section") ?? "";
  const unit = params.get("unit") ?? "";
  const sectionJump = params.get("target") === "section";
  const lessons = Math.max(0, Number(params.get("lessons")) || 0);
  const wrong = Math.max(0, Number(params.get("wrong")) || 0);
  const title = passed
    ? sectionJump
      ? `${section}-bo'lim ochildi!`
      : `${unit}-dars ochildi!`
    : "Yana biroz mashq kerak";

  return (
    <main className={`${styles.jumpPage} ${passed ? styles.resultPass : styles.resultFail}`}>
      {passed ? <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--confetti-index": index } as React.CSSProperties} />)}
      </div> : null}
      <section className={styles.resultStage}>
        <div className={styles.unlockStamp}>
          <span>{passed ? "🔓" : "↻"}</span>
        </div>
        <small>{passed ? (sectionJump ? "BO'LIM OCHILDI" : "DARS OCHILDI") : "YANA BIR URINISH"}</small>
        <h1>{title}</h1>
        <p>
          {passed
            ? sectionJump
              ? `Testdan o'tdingiz. ${section}-bo'limdan darrov davom eting.`
              : `Testdan o'tdingiz. ${unit}-darsdan davom eting.`
            : "Oldingi darslarni bajarib, mahoratingizni yana biroz oshiring."}
        </p>
        <div className={styles.resultStat}>
          {passed ? <span>⚡</span> : <b>×</b>}
          <b>{passed ? `${lessons} ta darsni o'tkazib yubordingiz` : `${wrong} ta xato qildingiz`}</b>
        </div>
      </section>
      <footer className={styles.jumpFooter}>
        <button
          className={passed ? styles.greenAction : styles.blueAction}
          onClick={() => router.replace(backToLearning(category))}
          type="button"
        >
          {passed ? "O'qishni boshlash" : "Davom etish"} <HomeIcon name="arrow" size={20} />
        </button>
      </footer>
    </main>
  );
}
