"use client";

import type { ReactNode } from "react";

import styles from "./questions.module.css";

/** 모바일 components/lesson/MatchPairCard 와 같은 상태·색·효과 */
export type PairStatus = "idle" | "selected" | "wrong" | "correct" | "ghost";

export function MatchPairCard({
  children,
  height = 85,
  onPress,
  status,
  text,
}: {
  text?: string;
  status: PairStatus;
  onPress: () => void;
  height?: number;
  children?: ReactNode;
}) {
  return (
    <button
      className={`${styles.pair} ${styles[`pc_${status}`]}`}
      disabled={status === "correct" || status === "ghost"}
      onClick={onPress}
      style={{ height }}
      type="button"
    >
      {children ?? <b data-no-translate>{text}</b>}
      {status === "correct" ? (
        <>
          <i aria-hidden="true" className={styles.pcShine} />
          <i aria-hidden="true" className={`${styles.pcSpark} ${styles.pcSparkTL}`}>✦</i>
          <i aria-hidden="true" className={`${styles.pcSpark} ${styles.pcSparkBR}`}>✦</i>
        </>
      ) : null}
    </button>
  );
}
