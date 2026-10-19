"use client";

import { forwardRef, useImperativeHandle, useRef, type CSSProperties } from "react";

import { cinemaAt } from "../../../shared/model/cinema";
import { CHEST_TRACK, GRADE_LIGHT, gemAt, type ChestGrade, type FlyingGem } from "../../../shared/model/chest-cinematic";
import styles from "./chest-reward-screen.module.css";

/**
 * 상자가 열린 뒤 화면 전체 위에 겹치는 층 — 등급 색 번쩍, 빛기둥, 카운터로 날아가는 보석
 * (앱 chest-reward/ChestBurstLayer). 좌표(from·to)는 화면(.page) 기준 px.
 * 시계는 화면이 돌리고 매 프레임 apply(t) 를 부른다 (shared/model/chest-cinematic).
 */

export interface ChestBurstHandle {
  apply(t: number): void;
}

interface Props {
  grade: ChestGrade;
  gems: FlyingGem[];
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const PILLAR_W = 130;

export const ChestBurstLayer = forwardRef<ChestBurstHandle, Props>(function ChestBurstLayer(
  { grade, gems, fromX, fromY, toX, toY },
  ref,
) {
  const light = GRADE_LIGHT[grade];
  const flash = useRef<HTMLElement>(null);
  const pillar = useRef<HTMLDivElement>(null);
  const gemEls = useRef<(HTMLDivElement | null)[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      apply(t: number) {
        if (flash.current) flash.current.style.opacity = String(cinemaAt(CHEST_TRACK.flash, t) * light.flashOpacity);
        if (pillar.current) {
          const p = cinemaAt(CHEST_TRACK.pillar, t);
          // 솟을 때 가늘게 시작해 넓어진다
          pillar.current.style.opacity = String(p);
          pillar.current.style.transform = `scaleX(${0.35 + 0.65 * Math.min(1, p * 1.4)})`;
        }
        gems.forEach((gem, i) => {
          const el = gemEls.current[i];
          if (!el) return;
          const p = gemAt(gem, t, fromX, fromY, toX, toY);
          el.style.opacity = String(p.opacity);
          el.style.transform = `translate(${p.x - gem.size / 2}px, ${p.y - gem.size / 2}px) rotate(${p.rotate}deg) scale(${p.scale})`;
        });
      },
    }),
    [gems, fromX, fromY, toX, toY, light],
  );

  return (
    <div aria-hidden className={styles.burstLayer}>
      <i className={styles.burstFlash} ref={flash} style={{ background: light.flash, opacity: 0 }} />
      <div
        className={styles.pillar}
        ref={pillar}
        style={
          {
            left: fromX - PILLAR_W / 2,
            height: Math.max(0, fromY - 10),
            width: PILLAR_W,
            opacity: 0,
            "--pillar": light.pillar,
          } as CSSProperties
        }
      >
        <i />
      </div>
      {gems.map((gem, i) => (
        <div
          className={styles.flyingGem}
          key={i}
          ref={(el) => {
            gemEls.current[i] = el;
          }}
          style={{ width: gem.size, height: gem.size, opacity: 0 }}
        >
          <svg height={gem.size} viewBox="0 0 100 100" width={gem.size}>
            <polygon fill="#3BB6E5" points="50,4 92,30 50,96 8,30" />
            <polygon fill="#A8E5F7" points="50,4 92,30 50,40 8,30" />
            <polygon fill="#5CD0F0" points="50,40 92,30 50,96" />
            <path d="M30 22 L42 14 L46 22 L34 28 Z" fill="#FFFFFF" opacity={0.85} />
          </svg>
        </div>
      ))}
    </div>
  );
});
