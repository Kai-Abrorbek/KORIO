"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { rt } from "../retention/model/retention";
import styles from "./energy-surge.module.css";

/**
 * 콤보 에너지 보상 연출 — "에너지 코어" (앱 components/lesson/EnergySurge 와 같은 흐름).
 *   1) 가장자리 불꽃이 소용돌이치며 가운데로 빨려 든다
 *   2) 코어가 튀어나오고 충격파 링 두 겹, 뒤에서 빛줄기가 돈다
 *   3) 코어 안 배터리가 차며 +N 이 올라간다
 *   4) 코어가 헤더의 에너지 쪽으로 날아가 흡수된다
 * 번개 연출(배터리 팝업)과 랜덤으로 번갈아 나온다. 클릭을 막지 않는다.
 */
/** CSS --total 과 같아야 한다 (energy-surge.module.css) */
const TOTAL_MS = 3700;
const FILL_AT = 820;
const SPARKS = Array.from({ length: 18 }, (_, index) => ({
  angle: (index / 18) * 360 + (index % 2 ? 10 : -7),
  delay: (index % 6) * 0.05,
  distance: 260 + (index % 4) * 50,
  size: 5 + (index % 3) * 4,
  swirl: (index % 2 ? 1 : -1) * (40 + (index % 3) * 12),
  color: ["#FFFFFF", "#FFE066", "#C9C3FF", "#FFD23F"][index % 4],
}));

export function EnergySurge({
  amount,
  onDone,
  subtitle,
}: {
  amount: number;
  onDone: () => void;
  subtitle?: string;
}) {
  const [display, setDisplay] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const haptic = window.Telegram?.WebApp.HapticFeedback;
    const timers: number[] = [];
    [0, 180, 360].forEach((ms) =>
      timers.push(window.setTimeout(() => haptic?.impactOccurred("light"), ms)),
    );
    timers.push(window.setTimeout(() => haptic?.notificationOccurred("success"), 620));

    let current = 0;
    let counter: number | undefined;
    timers.push(
      window.setTimeout(() => {
        const step = Math.max(45, Math.floor(560 / Math.max(1, amount)));
        counter = window.setInterval(() => {
          current += 1;
          setDisplay(current);
          if (current >= amount && counter) window.clearInterval(counter);
        }, step);
      }, FILL_AT),
    );
    timers.push(window.setTimeout(() => doneRef.current(), TOTAL_MS + 80));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (counter) window.clearInterval(counter);
    };
  }, [amount]);

  return (
    <div aria-live="polite" className={styles.surge}>
      <i className={styles.dim} />
      <div className={styles.center}>
        {SPARKS.map((spark, index) => (
          <span
            className={styles.arm}
            key={index}
            style={
              {
                "--a0": `${spark.angle}deg`,
                "--sw": `${spark.swirl}deg`,
                "--sd": `${spark.delay}s`,
              } as CSSProperties
            }
          >
            <i
              className={styles.spark}
              style={
                {
                  "--dist": `${spark.distance}px`,
                  "--size": `${spark.size}px`,
                  "--c": spark.color,
                } as CSSProperties
              }
            />
          </span>
        ))}

        <i className={styles.ring} />
        <i className={`${styles.ring} ${styles.ring2}`} />

        <div className={styles.orbWrap}>
          <i className={styles.rays} />
          <div className={styles.orb}>
            <span className={styles.battery}>
              <i />
            </span>
            <b data-no-translate>+{display}</b>
          </div>
        </div>

        <div className={styles.title}>
          <strong>{rt("surge.title")}</strong>
          <small>{subtitle ?? rt("surge.sub")}</small>
        </div>
      </div>
    </div>
  );
}
