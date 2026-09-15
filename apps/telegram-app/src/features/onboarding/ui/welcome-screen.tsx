"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import styles from "./onboarding.module.css";

export function WelcomeScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useTelegramAuth();
  if (!user) return null;

  const isNew = params.get("new") === "1";
  const completed = user.isOnboardingCompleted;
  const destination = completed
    ? isNew
      ? "/courses"
      : "/home"
    : "/onboarding";

  return (
    <main className={styles.welcomePage}>
      <div className={styles.welcomeGlow} />
      <section className={styles.welcomeMascot}>
        <div className={styles.mascotHalo} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/characters/hangulmon_celebrating.png" />
      </section>
      <section className={styles.welcomeCopy}>
        <p className={styles.welcomeEyebrow}>KORIO · 한국어</p>
        <h1>Learn Korean,<br />gently.</h1>
        <p>Five minutes a day. Real conversations.<br />Built for Uzbek and international learners.</p>
      </section>
      <section className={styles.welcomeActions}>
        {completed ? (
          <div className={styles.accountReady}>
            <span><MobileIcon name="checkmark-circle" size={22} /></span>
            <div>
              <strong>{isNew ? "O'quv yo'lingiz tayyor" : "Xush kelibsiz"}</strong>
              <small>Telegram hisobingiz xavfsiz ulandi</small>
            </div>
          </div>
        ) : null}
        <button className={styles.welcomeButton} onClick={() => router.replace(destination)} type="button">
          <span>{completed ? "Davom etish" : "Boshlash"}</span>
          <i><MobileIcon name="arrow-forward" size={19} /></i>
        </button>
      </section>
    </main>
  );
}
