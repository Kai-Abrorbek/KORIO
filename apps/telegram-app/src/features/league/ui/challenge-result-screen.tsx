"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import { getTier } from "../model/league";
import styles from "./challenge-result-screen.module.css";

interface ResultParams {
  tier: string;
  xp: number;
  level: string;
  leveledUp: boolean;
  matched: number;
  hasMatched: boolean;
  combo: number;
  hasCombo: boolean;
  isRecord: boolean;
  rankUp: boolean;
  score: number;
  counted: boolean;
}

const DEFAULT_PARAMS: ResultParams = {
  tier: "bronze", xp: 0, level: "", leveledUp: false,
  matched: 0, hasMatched: false, combo: 0, hasCombo: false,
  isRecord: false, rankUp: false, score: 0, counted: true,
};

function useCountUp(target: number, duration: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(0);
    if (target <= 0) return;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        window.clearInterval(timer);
      } else setValue(Math.floor(current));
    }, duration / steps);
    return () => window.clearInterval(timer);
  }, [duration, target]);
  return value;
}

export function ChallengeResultScreen() {
  const router = useRouter();
  const [params, setParams] = useState<ResultParams>(DEFAULT_PARAMS);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hasMatched = query.has("matched");
    const hasCombo = query.has("combo");
    setParams({
      tier: query.get("tier") ?? "bronze",
      xp: Number(query.get("xp") ?? 0),
      level: query.get("level") ?? "",
      leveledUp: query.get("leveledUp") === "1",
      matched: Number(query.get("matched") ?? query.get("score") ?? 0),
      hasMatched,
      combo: Number(query.get("combo") ?? 0),
      hasCombo,
      isRecord: query.get("isRecord") === "1",
      rankUp: query.get("rankUp") === "1",
      score: Number(query.get("score") ?? 0),
      counted: query.get("counted") !== "0",
    });
  }, []);

  const tier = getTier(params.tier);
  const xpCount = useCountUp(params.xp, 1000);
  const matchedCount = useCountUp(params.hasMatched ? params.matched : params.score, 800);
  const comboCount = useCountUp(params.combo, 800);

  const next = () => {
    if (params.rankUp) {
      router.replace(`/league-rankup?tier=${encodeURIComponent(params.tier)}&xp=${params.xp}`);
    } else router.replace("/league");
  };

  return (
    <main className={styles.resultPage} style={{ "--tier-color": tier.color } as CSSProperties}>
      <section className={styles.body}>
        <div className={styles.xpCircle}>{xpCount}</div>
        <h1>
          <strong>{params.xp} XP</strong>
          {params.leveledUp
            ? ` olib ${params.level}-darajaga ko'tarildingiz!`
            : " oldingiz!"}
        </h1>
        {!params.counted ? (
          <p className={styles.notCounted}>XP olish uchun birozdan keyin qayta urinib ko&apos;ring</p>
        ) : null}

        <div className={styles.stats}>
          <div className={styles.statRow}>
            <span>{params.hasMatched ? "Topilgan juftliklar" : "Ball"}</span>
            <b><MobileIcon name="albums" size={22} />{matchedCount}</b>
          </div>
          {params.hasCombo ? (
            <div className={styles.statWrap}>
              {params.isRecord ? <i>Yangi rekord</i> : null}
              <div className={styles.statRow}>
                <span>Eng yuqori kombo</span>
                <b><MobileIcon name="flame" size={22} />{comboCount}</b>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <footer><button onClick={next} type="button">Davom etish</button></footer>
    </main>
  );
}
