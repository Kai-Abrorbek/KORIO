"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./celebration-screen.module.css";

export function ScoreUpScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const score = Math.max(0, Number(params.get("score")) || 0);
  const unit = params.get("unit") ?? "";
  const category = params.get("category");

  return (
    <main className={styles.scoreUpPage}>
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ "--i": index } as CSSProperties} />)}
      </div>
      <section className={styles.scoreUpCenter}>
        <small>DARAJA OSHDI</small>
        <div className={styles.medalWrap}>
          <i />
          <div className={styles.medal}>
            <b className={styles.oldScore}>{Math.max(0, score - 1)}</b>
            <b className={styles.newScore}>{score}</b>
          </div>
        </div>
        <h1>Daraja {score} ga yetdingiz!</h1>
        <p>{unit}-bo‘limni oxirigacha tugatdingiz. Shu tezlikda keyingi qism ham yaqin.</p>
      </section>
      <footer className={styles.scoreUpFooter}>
        <button onClick={() => router.replace(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/roadmap")} type="button">
          Davom etish <MobileIcon name="arrow-forward" size={19} />
        </button>
      </footer>
    </main>
  );
}
