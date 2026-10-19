"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

import { createCinemaAudio } from "../../shared/browser/cinema-audio";
import { cinemaHaptic, prefersReducedMotion, runCinemaClock } from "../../shared/browser/cinema-clock";
import { cinemaAt, progress } from "../../shared/model/cinema";
import {
  ARC_SETS,
  LIGHTNING,
  LIGHTNING_CUES,
  LIGHTNING_TRACK,
  arcPhase,
  type LightningSound,
} from "../../shared/model/energy-cinematic";
import { energyBadgePoint } from "./energy-target";
import styles from "./energy-lightning.module.css";

const SOURCES: Record<LightningSound, string> = {
  thunder: "/sounds/energy/thunder.mp3",
  charge: "/sounds/energy/charge.mp3",
  collect: "/sounds/energy/collect.mp3",
};
const GAIN = { thunder: 0.8, charge: 0.7, collect: 0.8 };
const FILL_END = LIGHTNING.fill + LIGHTNING.cells * LIGHTNING.cellGap;

/**
 * 콤보 에너지 보상 연출 — "번개 배터리" (앱 LightningStrike + EnergyBonusPopup 을 한 시계로).
 * 하늘에서 번개가 내리꽂혀 화면 가운데 배터리 머리에 닿으면, 배터리가 튀어나와 칸칸이 충전되고
 * 둘레에 전기가 지지직 튄다. 다 차면 번쩍, 그리고 헤더 에너지 배지로 빨려 들어간다.
 * 시간표는 shared/model/energy-cinematic LIGHTNING. 클릭을 막지 않는다.
 */
export function EnergyLightning({ amount, onDone }: { amount: number; onDone: () => void }) {
  const glowId = useId();
  const [{ W, H }] = useState(() => ({ W: window.innerWidth, H: window.innerHeight }));
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const dim = useRef<HTMLElement>(null);
  const flash = useRef<HTMLElement>(null);
  const bolt = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const full = useRef<HTMLElement>(null);
  const arcs = useRef<(SVGSVGElement | null)[]>([]);
  const cells = useRef<(HTMLElement | null)[]>([]);
  const text = useRef<HTMLElement>(null);

  // 배터리 머리 (배터리는 화면 가운데에 있다)
  const hitY = H / 2 - 62;
  const cx = W / 2;
  const main = `M${cx + 14} -10 L${cx - 22} ${hitY * 0.2} L${cx + 18} ${hitY * 0.36} L${cx - 26} ${hitY * 0.56} L${cx + 14} ${hitY * 0.74} L${cx - 8} ${hitY * 0.88} L${cx} ${hitY}`;
  const branch1 = `M${cx - 22} ${hitY * 0.2} L${cx - 70} ${hitY * 0.3} L${cx - 58} ${hitY * 0.42} L${cx - 96} ${hitY * 0.5}`;
  const branch2 = `M${cx - 26} ${hitY * 0.56} L${cx + 40} ${hitY * 0.62} L${cx + 30} ${hitY * 0.7} L${cx + 78} ${hitY * 0.76}`;
  const branch3 = `M${cx + 18} ${hitY * 0.36} L${cx + 60} ${hitY * 0.4} L${cx + 84} ${hitY * 0.32}`;

  useLayoutEffect(() => {
    // 헤더 에너지 배지 (화면 가운데 기준)
    const target = energyBadgePoint();
    const targetX = target.x - W / 2;
    const targetY = target.y - H / 2;
    const audio = createCinemaAudio({ sources: SOURCES, gains: GAIN, cues: LIGHTNING_CUES });
    audio.preload();
    // 동작 줄이기면 배터리가 다 찬 뒤부터
    const reduce = prefersReducedMotion();
    const from = reduce ? FILL_END : 0;

    const apply = (t: number) => {
      if (dim.current) dim.current.style.opacity = String(cinemaAt(LIGHTNING_TRACK.dim, t));
      if (flash.current) flash.current.style.opacity = String(cinemaAt(LIGHTNING_TRACK.flash, t));
      if (bolt.current) {
        bolt.current.style.opacity = String(cinemaAt(LIGHTNING_TRACK.bolt, t));
        // 위에서 아래로 그어진다 — 잘라 보이는 높이를 늘린다
        bolt.current.style.height = `${Math.max(0.001, cinemaAt(LIGHTNING_TRACK.boltDraw, t)) * (hitY + 14)}px`;
      }
      if (wrap.current) {
        const pop = cinemaAt(LIGHTNING_TRACK.battery, t);
        const c = cinemaAt(LIGHTNING_TRACK.collect, t);
        wrap.current.style.opacity = String((pop <= 0 ? 0 : 1) * (1 - Math.max(0, (c - 0.8) / 0.2)));
        wrap.current.style.transform = `translate(${c * targetX}px, ${c * targetY}px) scale(${Math.max(0.001, pop) * (1 - 0.82 * c)})`;
      }
      if (full.current) {
        const f = cinemaAt(LIGHTNING_TRACK.full, t);
        full.current.style.opacity = String(f);
        full.current.style.transform = `scale(${1 + 0.5 * (1 - f)})`;
      }
      const phase = arcPhase(t);
      const arcLevel = cinemaAt(LIGHTNING_TRACK.arcs, t);
      arcs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(phase === i ? arcLevel : 0);
      });
      // 칸 하나 — 차례가 오면 아래서 위로 차오르며 번쩍
      cells.current.forEach((el, i) => {
        if (!el) return;
        const start = LIGHTNING.fill + i * LIGHTNING.cellGap;
        const p = progress(t, start, start + 160);
        el.style.opacity = p <= 0 ? "0" : "1";
        el.style.transform = `scaleY(${Math.max(0.001, p)})`;
        el.style.background = p < 1 ? "#FFFFFF" : "#FFE066";
      });
      // +N — 칸이 차는 동안 따라 오른다
      if (text.current) text.current.textContent = `+${Math.round(progress(t, LIGHTNING.fill, FILL_END) * amount)}`;
    };

    const clock = runCinemaClock(LIGHTNING.end, apply, from);
    void audio.playFrom(from);
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, Math.max(0, ms - from)));
    if (!reduce) {
      at(LIGHTNING.strike, () => cinemaHaptic("warning"));
      at(LIGHTNING.strike + 100, () => cinemaHaptic("heavy"));
    }
    // 다 찼을 때 · 헤더에 닿을 때 진동
    at(1400, () => cinemaHaptic("success"));
    at(LIGHTNING.collect + LIGHTNING.collectDur - 60, () => cinemaHaptic("medium"));
    // 애니메이션이 끊겨도 반드시 닫힌다
    at(LIGHTNING.end, () => doneRef.current());
    return () => {
      clock.stop();
      timers.forEach((timer) => window.clearTimeout(timer));
      // 소리는 끊지 않는다 — 닫히는 순간 빨려 드는 소리가 아직 울리고 있다
      audio.release();
    };
  }, [amount, W, H, hitY]);

  const layers: { d: string; w: number; color: string; o?: number }[] = [];
  for (const [d, scale] of [
    [main, 1],
    [branch1, 0.6],
    [branch2, 0.6],
    [branch3, 0.5],
  ] as const) {
    layers.push({ d, w: 18 * scale, color: "#FFC107", o: 0.3 });
    layers.push({ d, w: 7 * scale, color: `url(#${glowId})` });
    layers.push({ d, w: 2.6 * scale, color: "#FFFFFF" });
  }

  return (
    <div aria-live="polite" className={styles.overlay}>
      <i className={styles.dim} ref={dim} />
      {/* 화면 번쩍 (노란빛, 두 번) */}
      <i className={styles.flash} ref={flash} />

      {/* 번개 줄기 */}
      <div aria-hidden className={styles.clip} ref={bolt} style={{ width: W, height: 0, opacity: 0 }}>
        <svg height={hitY + 14} width={W}>
          <defs>
            <linearGradient id={glowId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#FFF3B0" />
              <stop offset="1" stopColor="#FFD93B" />
            </linearGradient>
          </defs>
          {layers.map((layer, i) => (
            <path
              d={layer.d}
              fill="none"
              key={i}
              stroke={layer.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={layer.o ?? 1}
              strokeWidth={layer.w}
            />
          ))}
        </svg>
      </div>

      <div className={styles.center}>
        <div className={styles.wrap} ref={wrap} style={{ opacity: 0 }}>
          {/* 다 찼을 때 번쩍 테 */}
          <i className={styles.fullRing} ref={full} style={{ opacity: 0 }} />

          {/* 둘레 전기 — 세 벌이 번갈아 */}
          {ARC_SETS.map((d, i) => (
            <svg
              aria-hidden
              className={styles.arcs}
              height={160}
              key={i}
              ref={(el) => {
                arcs.current[i] = el;
              }}
              style={{ opacity: 0 }}
              width={240}
            >
              <path d={d} fill="none" stroke="#FFE066" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.35} strokeWidth={6} />
              <path d={d} fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} />
            </svg>
          ))}

          <div className={styles.batteryRow}>
            <div className={styles.battery}>
              <div className={styles.cells}>
                {Array.from({ length: LIGHTNING.cells }, (_, i) => (
                  <span key={i}>
                    <i
                      ref={(el) => {
                        cells.current[i] = el;
                      }}
                      style={{ opacity: 0 }}
                    />
                  </span>
                ))}
              </div>
              <i className={styles.gloss} />
              <b data-no-translate ref={text}>+0</b>
            </div>
            {/* 양극 꼭지 */}
            <i className={styles.cap} />
          </div>
        </div>
      </div>
    </div>
  );
}
