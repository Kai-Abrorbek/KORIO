"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { challengeMetaOf, getTier } from "../model/league";
import styles from "./challenge-intro-screen.module.css";

const SEGMENTS = [5, 10, 20];
const DURATION = 150;

export function ChallengeIntroScreen() {
  const router = useRouter();
  const [params, setParams] = useState({ tier: "bronze", xp: "210", type: "match" });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setParams({
      tier: query.get("tier") ?? "bronze",
      xp: query.get("xp") ?? "210",
      type: query.get("type") ?? "match",
    });
  }, []);

  const tier = getTier(params.tier);
  const total = SEGMENTS.at(-1) ?? 20;
  const time = `${Math.floor(DURATION / 60)}:${String(DURATION % 60).padStart(2, "0")}`;

  const continueChallenge = () => {
    const route = challengeMetaOf(params.type).route;
    router.replace(
      `${route}?mode=challenge&tier=${encodeURIComponent(params.tier)}&xp=${encodeURIComponent(params.xp)}&type=${encodeURIComponent(params.type)}`,
    );
  };

  return (
    <main className={styles.introPage} style={{ "--tier-color": tier.color } as CSSProperties}>
      <header>
        <button aria-label="Yopish" onClick={() => router.back()} type="button">
          <MobileIcon name="close" size={30} />
        </button>
        <div className={styles.barWrap}>
          <span className={styles.track}>
            <i className={styles.fill} />
            {SEGMENTS.map((segment) => (
              <b key={segment} style={{ left: `${(segment / total) * 100}%` }}>{segment}</b>
            ))}
          </span>
        </div>
        <span className={styles.timer}>
          <i><MobileIcon name="time" size={16} /></i>
          <b>{time}</b>
        </span>
      </header>

      <section className={styles.body}>
        <div className={styles.mascotRow}>
          {/* 네이티브와 같은 768px 투명 PNG. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/characters/hangulmon_determined.png" />
          <div className={styles.bubble}>
            <p><strong>Tayyor bo&apos;ling!</strong> Birinchi raund boshlanmoqda.</p>
            <i />
          </div>
        </div>
      </section>

      <footer>
        <button onClick={continueChallenge} type="button">Davom etish</button>
      </footer>
    </main>
  );
}
