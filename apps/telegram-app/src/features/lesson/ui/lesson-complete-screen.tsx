"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { backToLearning } from "../model/lesson";
import styles from "./lesson.module.css";

function displayTime(raw: string | null): string {
  if (raw?.includes(":")) return raw;
  const seconds = Math.max(0, Number(raw) || 0);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function Celebration() {
  return (
    <>
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} style={{ "--confetti-index": index } as CSSProperties} />
        ))}
      </div>
      <Image
        alt="KORIO"
        className={styles.celebrationMascot}
        height={200}
        src="/characters/hangulmon_celebrating.png"
        unoptimized
        width={200}
      />
    </>
  );
}

export function LessonCompleteScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const xp = Math.max(0, Number(params.get("xp")) || 0);
  const accuracy = Math.max(0, Number(params.get("accuracy")) || 0);
  const category = params.get("category");
  const from = params.get("from");

  if (params.get("exam") === "1") {
    const passed = params.get("passed") !== "0";
    const level = Math.max(1, Number(params.get("level")) || 1);
    const nextLevel = Number(params.get("nextLevel")) || null;
    const correct = Math.max(0, Number(params.get("correct")) || 0);
    const total = Math.max(0, Number(params.get("total")) || 0);
    const weak = (params.get("weak") ?? "").split(",").filter(Boolean);
    return (
      <main className={`${styles.completePage} ${styles.examPage}`}>
        {passed ? <Celebration /> : (
          <Image
            alt="KORIO"
            className={styles.examMascot}
            height={150}
            src="/characters/hangulmon_default.png"
            unoptimized
            width={150}
          />
        )}
        <section className={styles.examContent}>
          <h1 className={passed ? styles.examPassed : styles.examMissed}>
            {passed ? `${level}-daraja o'tildi!` : `${level}-daraja, ozgina qoldi`}
          </h1>
          <p>
            {passed
              ? "Bu yergacha kelganingiz zo'r. Keyingi darajaga o'tamiz."
              : "Keyingi daraja ochiq. Quyidagilarni yana bir ko'rsangiz ancha oson bo'ladi."}
          </p>
          <div className={styles.examScore}>
            <b className={passed ? styles.examPassed : styles.examMissed}>{accuracy}%</b>
            {total > 0 ? <span>{total} savoldan {correct} tasi to&apos;g&apos;ri</span> : null}
          </div>
          {xp > 0 || Number(params.get("gems")) > 0 ? (
            <div className={styles.examRewards}>
              {Number(params.get("gems")) > 0 ? <span><MobileIcon name="diamond" size={19} />+{params.get("gems")}</span> : null}
              {xp > 0 ? <span><MobileIcon name="flash" size={19} />+{xp} XP</span> : null}
            </div>
          ) : null}
          {weak.length > 0 ? (
            <div className={styles.examWeak}>
              <strong>Shu qismlar qiyin bo&apos;ldi</strong>
              <div>{weak.map((area) => <span key={area}>{area}</span>)}</div>
            </div>
          ) : null}
          {nextLevel ? <small>{nextLevel}-daraja ochildi</small> : null}
        </section>
        <footer className={styles.examActions}>
          <button
            className={passed ? styles.examPassAction : styles.primaryAction}
            onClick={() => router.replace("/study-path")}
            type="button"
          >
            Davom etish
          </button>
          {!passed ? (
            <button
              className={styles.blueTextAction}
              onClick={() => router.replace("/lesson?mode=levelExam&from=studyPath")}
              type="button"
            >
              Qayta urinish
            </button>
          ) : null}
        </footer>
      </main>
    );
  }

  const share = async () => {
    const text = `Hozirgina koreys tili darsini tugatdim! 🔥\n⚡ ${xp} XP · 🎯 Aniqlik ${accuracy}% · ⏱ ${displayTime(params.get("time"))}\n\nKORIO'da koreys tilini o'rganyapman 🇰🇷`;
    if (navigator.share) {
      await navigator.share({ text, title: "Dars tugadi!" }).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(text).catch(() => undefined);
  };

  return (
    <main className={styles.completePage}>
      <section className={styles.completeContent}>
        <Celebration />
        <h1>Dars yakunlandi!</h1>
        <div className={styles.completeStats}>
          <article>
            <strong>Jami XP</strong>
            <div><MobileIcon name="flash" size={22} /><b>{xp}</b></div>
          </article>
          <article>
            <strong>Aniqlik</strong>
            <div><MobileIcon name="locate" size={22} /><b>{accuracy}%</b></div>
          </article>
          <article>
            <strong>Tezlik</strong>
            <div><MobileIcon name="timer" size={22} /><b>{displayTime(params.get("time"))}</b></div>
          </article>
        </div>
      </section>
      <footer className={styles.completeActions}>
        <button aria-label="Ulashish" className={styles.shareAction} onClick={() => void share()} type="button">
          <MobileIcon name="share-outline" size={26} />
        </button>
        <button
          className={styles.completeClaim}
          onClick={() => router.replace(backToLearning(category, from))}
          type="button"
        >
          XP olish
        </button>
      </footer>
    </main>
  );
}
