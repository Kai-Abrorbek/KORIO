"use client";

import { useRouter } from "next/navigation";

import styles from "./onboarding.module.css";

export function WelcomeScreen() {
  const router = useRouter();

  return (
    <main className={styles.welcomePage}>
      <section className={styles.welcomeMascot}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/characters/hangulmon_cheering.png" />
      </section>
      <section className={styles.welcomeCopy}>
        <h1>Learn Korean,<br />gently.</h1>
        <p>Five minutes a day. Real conversations.<br />Built for Uzbek and international learners.</p>
      </section>
      <section className={styles.welcomeActions}>
        <button
          className={styles.welcomeButton}
          onClick={() => router.push("/onboarding")}
          type="button"
        >
          Boshlash
        </button>
        <button
          className={styles.welcomeSecondaryButton}
          onClick={() => router.replace("/home")}
          type="button"
        >
          Akkaunt mavjud
        </button>
      </section>
    </main>
  );
}
