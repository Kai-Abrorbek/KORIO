"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

import { createCinemaAudio } from "../../shared/browser/cinema-audio";
import { prefersReducedMotion, runCinemaClock } from "../../shared/browser/cinema-clock";
import { surgeCues, type EnergySound } from "../../shared/model/energy-cinematic";
import { rt } from "../retention/model/retention";
import { energyBadgePoint } from "./energy-target";
import styles from "./energy-surge.module.css";

/**
 * 콤보 에너지 보상 연출 — "에너지 코어" (앱 components/lesson/EnergySurge 와 같은 흐름).
 *   1) 가장자리 불꽃이 소용돌이치며 가운데로 빨려 든다
 *   2) 코어가 튀어나오고 충격파 링 두 겹, 뒤에서 빛줄기가 돈다
 *   3) 코어 안 배터리가 차며 +N 이 올라간다
 *   4) 코어가 헤더의 에너지 쪽으로 날아가 흡수된다 — 빛 꼬리를 끌며
 * 소리: 빨려 듦(gather) → 코어 터짐(corePop) + 화면 쿵 → 충전(charge) → 흡수(collect)
 * 번개·잭팟 연출과 랜덤으로 번갈아 나온다. 클릭을 막지 않는다.
 * 큰 흐름은 CSS 키프레임, 쿵·빛 꼬리는 앱과 같은 계산을 rAF 로 (shared/browser/cinema-clock).
 */
/** CSS --total 과 같아야 한다 (energy-surge.module.css) */
const TOTAL_MS = 3700;
const FILL_AT = 820;
/** 앱 EnergySurge 의 T_POP · T_COLLECT · D_COLLECT */
const POP_AT = 620;
const COLLECT_AT = 3200;
const COLLECT_MS = 480;
/** 흡수될 때 뒤따르는 빛 꼬리 수 */
const TRAIL = 4;
/** 코어가 터질 때 흔들림 (px) */
const QUAKE = 10;

type SurgeSound = Extract<EnergySound, "gather" | "corePop" | "charge" | "collect">;
const SOURCES: Record<SurgeSound, string> = {
  gather: "/sounds/energy/gather.mp3",
  corePop: "/sounds/energy/core-pop.mp3",
  charge: "/sounds/energy/charge.mp3",
  collect: "/sounds/energy/collect.mp3",
};
const GAIN: Partial<Record<SurgeSound, number>> = { gather: 0.7, charge: 0.6, collect: 0.8 };
const CUES = surgeCues(POP_AT, FILL_AT, COLLECT_AT + COLLECT_MS) as { t: number; sound: SurgeSound }[];
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
  const surge = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const trails = useRef<(HTMLElement | null)[]>([]);

  // 헤더 에너지 배지 자리를 재서 코어·빛 꼬리가 그리로 간다. 쿵·빛 꼬리는 앱과 같은 계산
  useLayoutEffect(() => {
    const target = energyBadgePoint();
    const targetX = target.x - window.innerWidth / 2;
    const targetY = target.y - window.innerHeight / 2;
    surge.current?.style.setProperty("--tx", `${targetX}px`);
    surge.current?.style.setProperty("--ty", `${targetY}px`);
    const audio = createCinemaAudio({ sources: SOURCES, gains: GAIN, cues: CUES });
    audio.preload();
    // 동작 줄이기면 코어가 찬 모습부터 (CSS 가 움직임을 뺀다)
    const reduce = prefersReducedMotion();
    void audio.playFrom(reduce ? FILL_AT : 0);
    if (reduce) {
      return () => audio.release();
    }
    const clock = runCinemaClock(COLLECT_AT + COLLECT_MS, (t) => {
      if (center.current) {
        const q = (t - POP_AT) / 420;
        if (q <= 0 || q >= 1) center.current.style.transform = "";
        else {
          const a = QUAKE * (1 - q) * (1 - q);
          center.current.style.transform = `translate(${a * Math.sin(q * 38)}px, ${a * 0.7 * Math.cos(q * 28)}px)`;
        }
      }
      const u = Math.min(1, Math.max(0, (t - COLLECT_AT) / COLLECT_MS));
      const collect = u * u * u;
      trails.current.forEach((el, index) => {
        if (!el) return;
        const lag = (index + 1) * 0.11;
        const c = Math.min(1, Math.max(0, (collect - lag) / (1 - lag)));
        const live = collect > 0.02 && c < 1;
        el.style.opacity = live ? String(0.75 * (1 - index / TRAIL)) : "0";
        el.style.transform = `translate(${c * targetX}px, ${c * targetY}px) scale(${1 - 0.6 * c})`;
      });
    });
    return () => {
      clock.stop();
      // 소리는 끊지 않는다 — 닫히는 순간 빨려 드는 소리가 아직 울리고 있다
      audio.release();
    };
  }, []);

  useEffect(() => {
    const haptic = window.Telegram?.WebApp.HapticFeedback;
    const timers: number[] = [];
    if (prefersReducedMotion()) {
      setDisplay(amount);
      timers.push(window.setTimeout(() => doneRef.current(), TOTAL_MS + 80));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    [0, 180, 360].forEach((ms) =>
      timers.push(window.setTimeout(() => haptic?.impactOccurred("light"), ms)),
    );
    timers.push(window.setTimeout(() => haptic?.notificationOccurred("success"), POP_AT));
    timers.push(window.setTimeout(() => haptic?.impactOccurred("medium"), COLLECT_AT + COLLECT_MS - 40));

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
    <div aria-live="polite" className={styles.surge} ref={surge}>
      <i className={styles.dim} />
      <div className={styles.center} ref={center}>
        {/* 흡수될 때 뒤따르는 빛 꼬리 */}
        {Array.from({ length: TRAIL }, (_, index) => {
          const size = 46 - index * 8;
          return (
            <i
              className={styles.trail}
              key={`trail${index}`}
              ref={(el) => {
                trails.current[index] = el;
              }}
              style={{ width: size, height: size, opacity: 0 }}
            />
          );
        })}
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
