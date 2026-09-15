"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { HomeIcon } from "../../home/ui/home-icon";
import { backToLearning } from "../model/lesson";
import styles from "./lesson.module.css";

function displayTime(raw: string | null): string {
  const seconds = Math.max(0, Number(raw) || 0);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function LessonCompleteScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const xp = Math.max(0, Number(params.get("xp")) || 0);
  const accuracy = Math.max(0, Number(params.get("accuracy")) || 0);
  const exam = params.get("exam") === "1";
  const passed = params.get("passed") !== "0";
  const category = params.get("category");
  const from = params.get("from");
  const level = params.get("level");
  const nextLevel = params.get("nextLevel");

  return (
    <main className={styles.completePage}>
      <div className={styles.completeGlow} />
      <section className={styles.completeHero}>
        <span className={styles.completeEyebrow}>{exam ? "DARAJA SINOVI" : "DARS YAKUNLANDI"}</span>
        <Image alt="KORIO" height={174} src="/characters/hangulmon_streak.png" unoptimized width={174} />
        <h1>{exam ? (passed ? "Imtihondan o'tdingiz!" : "Yana bir qadam qoldi") : "Ajoyib ishladingiz!"}</h1>
        <p>
          {exam && passed && nextLevel
            ? `${level}-daraja tugadi. Endi ${nextLevel}-darajani boshlashingiz mumkin.`
            : exam && !passed
              ? "Keyingi daraja ochildi. Xohlasangiz avval bu mavzularni takrorlang."
              : "Bugungi o'qishingiz hisobga olindi. Shu ritmni saqlab qoling!"}
        </p>
      </section>
      <section className={styles.completeStats}>
        <article><span>⚡</span><b>+{xp}</b><small>XP</small></article>
        <article><span>◎</span><b>{accuracy}%</b><small>Aniqlik</small></article>
        <article><span>◷</span><b>{displayTime(params.get("time"))}</b><small>Vaqt</small></article>
      </section>
      {Number(params.get("chestGems")) > 0 ? (
        <div className={styles.gemReward}>◆ +{params.get("chestGems")} gavhar mukofoti</div>
      ) : null}
      <footer className={styles.completeFooter}>
        <button className={styles.greenAction} onClick={() => router.replace(backToLearning(category, from))} type="button">
          Davom etish <HomeIcon name="arrow" size={20} />
        </button>
      </footer>
    </main>
  );
}
