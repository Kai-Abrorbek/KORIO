"use client";

import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";

import { WearShapes } from "../../league/ui/generated-avatar";
import { cinemaAt, starPath } from "../../../shared/model/cinema";
import {
  BURST_STARS,
  IMPRINT_BOX,
  IMPRINT_STARS,
  INK_DROPS,
  INK_GAPS,
  RAY_SHAPES,
  STAMP_BOX,
  STAMP_SHAPES,
  STAMP_TRACK,
  STAMP_WORDS,
  burstStarAt,
  dropAt,
  imprintShapes,
  type StampTier,
} from "../../../shared/model/lesson-stamp-cinematic";
import styles from "./stamp-cinema.module.css";

/**
 * "참 잘했어요 도장" 무대 — 정사각형 공책(size) 위에 도장이 찍힌다 (앱 lesson-complete/StampCinema).
 * 시계(ms)는 화면이 돌리고 매 프레임 apply(t) 를 부른다. 그림·시간표는 shared/model/lesson-stamp-cinematic.
 */

export interface StampCinemaHandle {
  apply(t: number): void;
}

interface Props {
  tier: StampTier;
  size: number;
  /** 잉크 색 (어두운 테마는 밝은 보라) */
  ink: string;
  /** 원고지 선 */
  grid: string;
}

/** 하늘몬 표정 — 앱 HaneulmonMascot mood 와 같은 그림 */
const MASCOT: Record<StampTier, string> = {
  perfect: "/characters/hangulmon_celebrating.png",
  great: "/characters/hangulmon_great.png",
  good: "/characters/hangulmon_cheering.png",
};

/** 자국 = 공책의 이만큼 */
const IMPRINT = 0.86;
/** 눌렸을 때 도장 고무 바닥 = 공책 가운데에서 이만큼 아래 (도장 몸통이 자국 자리를 덮는다) */
const PRESS_Y = 0.3;
const STAR = starPath(50, 50, 48, 20);

export const StampCinema = forwardRef<StampCinemaHandle, Props>(function StampCinema({ tier, size: S, ink, grid }, ref) {
  const D = S * IMPRINT;
  const stampScale = (D * (192 / IMPRINT_BOX.size)) / STAMP_BOX.faceWidth;
  const stampW = STAMP_BOX.width * stampScale;
  const stampH = STAMP_BOX.height * stampScale;
  const stampRestTop = S / 2 + PRESS_Y * S - STAMP_BOX.faceY * stampScale;
  const word = STAMP_WORDS[tier];
  const wordSize = D * Math.min(0.16, 0.68 / word.length);
  const perfect = tier === "perfect";

  // 부위들 (apply 가 직접 만진다)
  const paper = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const drops = useRef<(HTMLElement | null)[]>([]);
  const imprint = useRef<HTMLDivElement>(null);
  const wet = useRef<HTMLElement>(null);
  const stars = useRef<(HTMLDivElement | null)[]>([]);
  const mascot = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      apply(t: number) {
        if (paper.current) paper.current.style.transform = `scale(${cinemaAt(STAMP_TRACK.paperScale, t)})`;
        if (rays.current) {
          const r = cinemaAt(STAMP_TRACK.rays, t);
          rays.current.style.opacity = String(r);
          rays.current.style.transform = `scale(${0.6 + 0.6 * r}) rotate(${t / 40}deg)`;
        }
        if (ring.current) {
          const r = cinemaAt(STAMP_TRACK.ring, t);
          ring.current.style.opacity = String(r <= 0 || r >= 1 ? 0 : 0.7 * (1 - r));
          ring.current.style.transform = `scale(${0.7 + 0.9 * r})`;
        }
        INK_DROPS.forEach((drop, i) => {
          const el = drops.current[i];
          if (!el) return;
          const d = dropAt(drop, t);
          const box = drop.size * S;
          el.style.opacity = String(d.opacity * 0.85);
          el.style.transform = `translate(${S / 2 + Math.cos(drop.angle) * d.r * S - box / 2}px, ${S / 2 + Math.sin(drop.angle) * d.r * S - box / 2}px) scale(${d.scale})`;
        });
        if (imprint.current) {
          imprint.current.style.opacity = String(cinemaAt(STAMP_TRACK.imprint, t) * 0.94);
          imprint.current.style.transform = `scale(${cinemaAt(STAMP_TRACK.imprintScale, t)})`;
        }
        if (wet.current) wet.current.style.opacity = String(cinemaAt(STAMP_TRACK.wet, t));
        BURST_STARS.forEach((star, i) => {
          const el = stars.current[i];
          if (!el) return;
          const p = burstStarAt(star, t);
          const box = star.size * S;
          el.style.opacity = String(p.opacity);
          el.style.transform = `translate(${S / 2 + Math.cos(star.angle) * p.r * S - box / 2}px, ${S / 2 + Math.sin(star.angle) * p.r * S - box / 2}px) rotate(${p.rotate}deg) scale(${p.scale})`;
        });
        if (mascot.current) {
          const m = cinemaAt(STAMP_TRACK.mascot, t);
          mascot.current.style.opacity = m <= 0 ? "0" : "1";
          mascot.current.style.transform = `translateY(${(1 - m) * S * 0.18}px) scale(${Math.max(0.001, m)})`;
        }
        if (stamp.current) {
          const y = cinemaAt(STAMP_TRACK.stampY, t);
          const squash = cinemaAt(STAMP_TRACK.stampSquash, t);
          stamp.current.style.opacity = y < -2.3 ? "0" : "1";
          stamp.current.style.transform = `translateY(${y * S}px) rotate(${cinemaAt(STAMP_TRACK.stampRotate, t)}deg) scaleY(${squash}) scaleX(${2 - squash})`;
        }
      },
    }),
    [S],
  );

  const lines = Array.from({ length: 7 }, (_, i) => ((i + 1) / 8) * S);

  return (
    <div aria-hidden className={styles.stage} style={{ width: S, height: S }}>
      {/* 공책 — 원고지 칸 */}
      <div className={styles.paper} ref={paper} style={{ width: S, height: S }}>
        <svg height={S} width={S}>
          {lines.map((p) => (
            <line key={`v${p}`} stroke={grid} strokeWidth={1} x1={p} x2={p} y1={S * 0.06} y2={S * 0.94} />
          ))}
          {lines.map((p) => (
            <line key={`h${p}`} stroke={grid} strokeWidth={1} x1={S * 0.06} x2={S * 0.94} y1={p} y2={p} />
          ))}
        </svg>
      </div>

      {/* 100% — 자국 뒤 금빛 햇살 */}
      {perfect ? (
        <div className={styles.center} ref={rays} style={{ width: S, height: S, opacity: 0 }}>
          <svg height={S * 1.3} viewBox="0 0 200 200" width={S * 1.3}>
            <WearShapes shapes={RAY_SHAPES} />
          </svg>
        </div>
      ) : null}

      {/* 충격파 고리 */}
      <div
        className={styles.ring}
        ref={ring}
        style={{ left: S / 2 - D / 2, top: S / 2 - D / 2, width: D, height: D, borderColor: ink, opacity: 0 }}
      />

      {/* 튄 잉크 방울 — 공책에 남는다 */}
      {INK_DROPS.map((drop, i) => {
        const box = drop.size * S;
        return (
          <i
            className={styles.drop}
            key={i}
            ref={(el) => {
              drops.current[i] = el;
            }}
            style={{ width: box, height: box, background: ink, opacity: 0 }}
          />
        );
      })}

      {/* 도장 자국 */}
      <div
        className={styles.abs}
        ref={imprint}
        style={{ left: S / 2 - D / 2, top: S / 2 - D / 2, width: D, height: D, opacity: 0 }}
      >
        <svg height={D} viewBox={`0 0 ${IMPRINT_BOX.size} ${IMPRINT_BOX.size}`} width={D}>
          <WearShapes shapes={imprintShapes(ink)} />
          {perfect ? <WearShapes shapes={IMPRINT_STARS} /> : null}
        </svg>
        <b
          className={styles.word}
          data-no-translate
          style={{ color: ink, fontSize: wordSize, lineHeight: `${wordSize * 1.2}px`, top: D * 0.64 - wordSize * 0.6 }}
        >
          {word}
        </b>
        {/* 잉크가 덜 묻은 자리 (종이 색) */}
        <svg className={styles.fill} viewBox={`0 0 ${IMPRINT_BOX.size} ${IMPRINT_BOX.size}`}>
          {INK_GAPS.map((gap, i) => (
            <circle className={styles.gap} cx={gap.cx} cy={gap.cy} key={i} opacity={gap.o} r={gap.r} />
          ))}
        </svg>
        {/* 막 찍힌 잉크의 젖은 광택 */}
        <i className={styles.wet} ref={wet} style={{ width: D * 0.5, height: D * 0.08, left: D * 0.16, top: D * 0.22, opacity: 0 }} />
      </div>

      {/* 100% — 금빛 별이 튀어나간다 */}
      {perfect
        ? BURST_STARS.map((star, i) => {
            const box = star.size * S;
            return (
              <div
                className={styles.drop}
                key={i}
                ref={(el) => {
                  stars.current[i] = el;
                }}
                style={{ width: box, height: box, opacity: 0 }}
              >
                <svg height={box} viewBox="0 0 100 100" width={box}>
                  <path d={STAR} fill="#FFD45C" stroke="#E2A83A" strokeWidth={4} />
                </svg>
              </div>
            );
          })
        : null}

      {/* 하늘몬 — 공책 오른쪽 아래에서 튀어나온다 */}
      <div
        className={styles.abs}
        ref={mascot}
        style={{ left: S * 0.66, top: S * 0.6, width: S * 0.46, height: S * 0.46, transformOrigin: "50% 100%", opacity: 0 }}
      >
        <Image alt="" className={styles.mascot} height={200} src={MASCOT[tier]} unoptimized width={200} />
      </div>

      {/* 도장 — 위에서 내려와 쾅 */}
      <div
        className={styles.abs}
        ref={stamp}
        style={{ left: S / 2 - stampW / 2, top: stampRestTop, width: stampW, height: stampH, transformOrigin: "50% 98%", opacity: 0 }}
      >
        <svg height={stampH} viewBox={`0 0 ${STAMP_BOX.width} ${STAMP_BOX.height}`} width={stampW}>
          <WearShapes shapes={STAMP_SHAPES} />
        </svg>
      </div>
    </div>
  );
});
