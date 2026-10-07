import type { CSSProperties } from "react";

import { darken } from "./color";
import styles from "./roadmap-map.module.css";

// 8엽 로제트 (100x106 viewBox) — 앱 ScoreNode 와 같은 path
const ROSETTE_PATH =
  "M50 3 C58 3 62 10 68 12 C74 14 82 11 87 16 C92 21 89 29 91 35 C93 41 100 45 100 53 C100 61 93 65 91 71 C89 77 92 85 87 90 C82 95 74 92 68 94 C62 96 58 103 50 103 C42 103 38 96 32 94 C26 92 18 95 13 90 C8 85 11 77 9 71 C7 65 0 61 0 53 C0 45 7 41 9 35 C11 29 8 21 13 16 C18 11 26 14 32 12 C38 10 42 3 50 3 Z";

function Rosette({ className, color }: { className?: string; color: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 100 106">
      <path d={ROSETTE_PATH} fill={color} />
    </svg>
  );
}

/**
 * 유닛 끝 스코어 배지 (앱 ScoreNode).
 * 잠겨 있으면 숫자 ↔ 🇰🇷 를 번갈아 뒤집는다. 끝낸 유닛은 유닛 색에 흰 숫자로 멈춰 있다.
 */
export function ScoreNode({
  locked,
  onPress,
  score,
  unitColor,
}: {
  locked: boolean;
  onPress: () => void;
  score: number;
  unitColor: string;
}) {
  const main = locked ? "#D3D3D6" : unitColor;
  const style = {
    "--base": locked ? "#BFBFC4" : darken(unitColor, 32),
    "--base-dark": locked ? "#A9A9AE" : darken(unitColor, 48),
    "--num": locked ? "#8A8A90" : "#fff",
  } as CSSProperties;
  return (
    <button
      aria-label={String(score)}
      className={`${styles.scoreNode} ${locked ? "" : styles.scoreStatic}`}
      onClick={onPress}
      style={style}
      type="button"
    >
      <span className={styles.scoreBase}>
        <i />
        <i />
      </span>
      <span className={styles.scoreBadge}>
        <Rosette className={styles.scoreHalo} color={main} />
        <span className={`${styles.scoreFace} ${locked ? styles.scoreFlipFront : ""}`}>
          <Rosette color={main} />
          <b data-no-translate>{score}</b>
        </span>
        <span className={`${styles.scoreFace} ${locked ? styles.scoreFlipBack : ""}`}>
          <Rosette color={main} />
          <span>🇰🇷</span>
        </span>
      </span>
    </button>
  );
}
