"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramAuth } from "../../auth/model/telegram-auth-context";
import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getScore } from "../api/misc";
import { SCORE_ICONS, type ScoreData } from "../model/misc";
import styles from "./misc-screen.module.css";

const EMPTY: ScoreData = { completedUnits: 0, milestones: [], nextScore: 0, progress: 0, score: 0 };

export function ScoreScreen() {
  const router = useRouter();
  const { request } = useTelegramAuth();
  const [data, setData] = useState<ScoreData>(EMPTY);

  useEffect(() => {
    let active = true;
    void getScore(request).then((result) => { if (active) setData(result); }).catch(() => undefined);
    return () => { active = false; };
  }, [request]);

  return (
    <main className={styles.scorePage}>
      <section className={styles.scoreHero}>
        <header>
          <button aria-label="Yopish" onClick={() => window.history.length > 1 ? router.back() : router.replace("/roadmap")} type="button"><MobileIcon name="close" size={28} /></button>
          <button aria-label="Ulashish" type="button"><MobileIcon name="share-outline" size={26} /></button>
        </header>
        <h1>Koreys tilingiz shunchalik o‘sdi!</h1>
        <div><span>🇰🇷</span><b>{data.score}</b></div>
      </section>
      <div className={styles.scoreCloud} aria-hidden="true">
        <svg preserveAspectRatio="none" viewBox="0 0 390 70"><path d="M0 70V44Q10 22 30 26Q44 4 68 12Q86-4 108 12Q128 2 144 20Q164 6 182 22Q200 6 220 20Q240 2 258 20Q276 4 296 20Q316 4 336 22Q358 12 372 32Q384 30 390 46V70Z" /></svg>
      </div>
      <section className={styles.scoreTimeline}>
        {data.milestones.map((milestone, index) => {
          const status = milestone.status ?? (data.score >= milestone.score ? "completed" : index === 0 || data.score >= (data.milestones[index - 1]?.score ?? 0) ? "current" : "locked");
          const active = status !== "locked";
          const current = status === "current";
          const ratio = current ? Math.max(0, Math.min(1, (data.score - (milestone.startScore ?? 0)) / Math.max(1, milestone.units))) : status === "completed" ? 1 : 0;
          return (
            <article className={styles.scoreMilestone} key={`${milestone.score}-${index}`}>
              <div className={styles.scoreRail}>
                <span className={`${styles.scoreNode} ${active ? styles.scoreNodeActive : ""} ${current ? styles.scoreNodeCurrent : ""}`}><MobileIcon name={SCORE_ICONS[index % SCORE_ICONS.length] ?? "star"} size={26} /></span>
                {index < data.milestones.length - 1 ? <i><em style={{ height: `${ratio * 100}%` }} /></i> : null}
              </div>
              <div className={styles.scoreMilestoneCopy}>
                <div><span>🇰🇷</span><b>{milestone.score}</b>{current ? <small>O‘rganilmoqda</small> : null}</div>
                <h2>{milestone.title || `${milestone.section}-bo‘lim`}</h2>
                {current ? <p>{Math.max(0, data.score - (milestone.startScore ?? 0))}/{milestone.units} bo‘lim tugadi</p> : null}
              </div>
            </article>
          );
        })}
      </section>
      <footer className={styles.scoreFooter}><button onClick={() => window.history.length > 1 ? router.back() : router.replace("/roadmap")} type="button">Davom etish</button></footer>
    </main>
  );
}
