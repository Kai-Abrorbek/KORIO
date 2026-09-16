import type { CSSProperties } from "react";

import { topicLookOf } from "../model/speaking";
import styles from "./speaking-topics-screen.module.css";

export function TopicIllustration({ code, size = 100 }: { code: string; size?: number }) {
  const look = topicLookOf(code);
  return (
    <span aria-hidden="true" className={styles.topicIllustration} style={{ "--from": look.from, "--size": `${size}px`, "--to": look.to } as CSSProperties}>
      <span className={styles.topicDrop} />
      <span className={styles.topicTile}><span className={styles.topicGloss} /><b>{look.mark}</b></span>
    </span>
  );
}
