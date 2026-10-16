"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, type CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { playSfx, preloadSfx } from "../../../shared/browser/sfx";
import styles from "./celebration-screen.module.css";

export function ScoreUpScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const score = Math.max(0, Number(params.get("score")) || 0);
  const unit = params.get("unit") ?? "";
  const category = params.get("category");

  useEffect(() => {
    preloadSfx("level-up", "chest-open", "chest-open-rare");
    // 숫자가 뒤집히기 시작하는 CSS animation-delay(.52s)에 맞춘다.
    const timer = window.setTimeout(() => playSfx("level-up"), 520);
    return () => window.clearTimeout(timer);
  }, []);

  // 이 레슨으로 노드도 끝났으면 스코어 축하 다음에 상자를 연다
  const goOn = () => {
    const chestGrade = params.get("chestGrade");
    if (chestGrade) {
      const next = new URLSearchParams({ category: category ?? "", from: params.get("from") ?? "", gemTotal: params.get("gemTotal") || "0", gems: params.get("chestGems") || "0", grade: chestGrade });
      router.replace(`/chest-reward?${next.toString()}`);
      return;
    }
    router.replace(category ? `/roadmap?category=${encodeURIComponent(category)}` : "/roadmap");
  };

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
        <h1>{`Daraja ${score} ga yetdingiz!`}</h1>
        <p>{`${unit}-bo‘limni oxirigacha tugatdingiz. Shu tezlikda keyingi qism ham yaqin.`}</p>
      </section>
      <footer className={styles.scoreUpFooter}>
        <button onClick={goOn} type="button">
          Davom etish <MobileIcon name="arrow-forward" size={19} />
        </button>
      </footer>
    </main>
  );
}
