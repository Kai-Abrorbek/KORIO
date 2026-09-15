"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";

import { HomeIcon } from "../../home/ui/home-icon";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
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

function goBack(router: ReturnType<typeof useRouter>, fallback: string) {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.replace(fallback);
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
    <main className={`${styles.jumpPage} ${styles.jumpStartPage}`}>
      <section className={styles.jumpStartCenter}>
        {!sectionJump ? (
          <div className={styles.unitMark}><span>🇰🇷</span><b>{unit}</b></div>
        ) : null}
        <Image
          alt="KORIO"
          className={styles.jumpMascot}
          height={160}
          src="/characters/hangulmon_determined.png"
          unoptimized
          width={160}
        />
        <h1>
          {sectionJump
            ? `Bu testdan o'tsangiz, ${section}-bo'limga o'tasiz.`
            : `Unit ${unit}ga o'tib, mahoratingizni ko'rsating!`}
        </h1>
      </section>
      <footer className={styles.jumpFooter}>
        <button className={styles.blueAction} onClick={next} type="button">Testni boshlash</button>
        <button
          className={styles.blueTextAction}
          onClick={() => goBack(router, backToLearning(category))}
          type="button"
        >
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
        <button
          aria-label="Yopish"
          onClick={() => goBack(router, backToLearning(category))}
          type="button"
        >
          <MobileIcon name="close" size={30} />
        </button>
        <div>
          {Array.from({ length: hearts }, (_, index) => (
            <MobileIcon key={index} name="heart" size={26} />
          ))}
        </div>
      </header>
      <section className={styles.ruleStage}>
        <div className={styles.ruleVisual}>
          <Image
            alt="KORIO"
            height={130}
            src="/characters/hangulmon_confident.png"
            unoptimized
            width={130}
          />
          <div className={styles.speechBubble}>
            <strong>Bu sinovdan o&apos;tish uchun {hearts} tadan kam xato qiling. Omad!</strong>
          </div>
        </div>
      </section>
      <footer className={styles.jumpFooter}>
        <button className={styles.greenAction} onClick={start} type="button">Davom etish</button>
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
    <main className={styles.jumpPage}>
      {passed ? (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{ "--confetti-index": index } as CSSProperties} />
          ))}
        </div>
      ) : null}
      <section className={styles.resultStage}>
        <div className={`${styles.unlockStamp} ${passed ? "" : styles.unlockStampFail}`}>
          <MobileIcon name={passed ? "lock-open" : "refresh"} size={54} />
        </div>
        {passed ? (
          <small>{sectionJump ? "BO'LIM OCHILDI" : "DARS OCHILDI"}</small>
        ) : null}
        <h1>{title}</h1>
        <p>
          {passed
            ? sectionJump
              ? `Testdan o'tdingiz. ${section}-bo'limdan darrov davom eting.`
              : `Testdan o'tdingiz. ${unit}-darsdan davom eting.`
            : "Xatolar juda ko'p edi. Oldingi darslarni bajarib, mahoratingizni oshiring!"}
        </p>
        {passed && lessons > 0 ? (
          <div className={styles.resultStat}>
            <MobileIcon name="flash" size={18} />
            <b>{lessons} ta darsni o&apos;tkazib yubordingiz</b>
          </div>
        ) : null}
        {!passed ? (
          <div className={`${styles.resultStat} ${styles.resultStatFail}`}>
            <MobileIcon name="close-circle" size={18} />
            <b>{wrong} ta xato qildingiz</b>
          </div>
        ) : null}
      </section>
      <footer className={styles.jumpFooter}>
        <button
          className={passed ? styles.greenAction : styles.blueAction}
          onClick={() => router.replace(backToLearning(category))}
          type="button"
        >
          {passed ? "O'qishni boshlash" : "Davom etish"} <HomeIcon name="arrow" size={19} />
        </button>
      </footer>
    </main>
  );
}
