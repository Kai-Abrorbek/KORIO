"use client";

import { useEffect, useState, type CSSProperties } from "react";

import styles from "./app-review.module.css";

/**
 * 하늘몬이 콩콩 뛰어와 고개 숙여 인사한다 (앱 HaneulmonBow 와 같은 타임라인·값).
 *
 * 그림이 한 장(정면)이라 통째로 기울이면 발까지 들려서 넘어지는 것처럼 보인다.
 * 허리선(592/768)에서 두 장으로 잘라 다리는 바닥에 두고, 몸통만 허리를 축으로
 * 보는 사람 쪽으로 38° 숙이며 내려앉는다. 움직임은 전부 CSS 키프레임 (app-review.module.css).
 */
export const BOW_BOTTOM_AT = 1890;
export const BOW_CHEER_AT = 2960;

/** 손을 앞에 모은 수줍은 포즈 — 공손한 인사에 맞다 */
const BOW_POSE = "/characters/hangulmon_shy.png";
const HIP = 592 / 768;

export function HaneulmonBow({ size, reducedMotion }: { size: number; reducedMotion: boolean }) {
  const [cheer, setCheer] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setCheer(true), BOW_CHEER_AT);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const bodyH = size * HIP;
  const vars = { "--size": `${size}px`, "--body": `${bodyH}px` } as CSSProperties;
  return (
    <div className={`${styles.bowMover} ${reducedMotion ? styles.still : ""}`} style={vars}>
      <div className={styles.bowHopper}>
        {cheer ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="" className={styles.bowWhole} src="/characters/hangulmon_celebrating.png" />
        ) : (
          <>
            <span className={styles.bowLegs}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={BOW_POSE} />
            </span>
            <span className={styles.bowBody}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={BOW_POSE} />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
