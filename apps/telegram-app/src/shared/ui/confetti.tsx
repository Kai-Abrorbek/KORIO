import type { CSSProperties } from "react";

import styles from "./confetti.module.css";

/** 꽃가루 — 위에서 흩날려 떨어진다 (앱 lesson-complete/Confetti). 상자 금 등급 · 연속 학습 기념일 */
export function Confetti() {
  return (
    <div aria-hidden className={styles.confetti}>
      {Array.from({ length: 18 }, (_, index) => (
        <i key={index} style={{ "--confetti-index": index } as CSSProperties} />
      ))}
    </div>
  );
}
