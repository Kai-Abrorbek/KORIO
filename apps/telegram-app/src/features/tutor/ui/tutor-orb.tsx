import type { CSSProperties } from "react";

import { MobileIcon } from "../../../shared/ui/mobile-icon";
import type { TutorState } from "../model/tutor";
import styles from "./tutor-screen.module.css";

const PALETTE: Record<TutorState, [string, string, string]> = {
  idle: ["#C9C4E8", "#A8A2CF", "#8B85B8"],
  connecting: ["#B9B2E8", "#9089D8", "#6F68C0"],
  listening: ["#8FE3AC", "#58CC02", "#3B9E00"],
  thinking: ["#FFD98A", "#FFB020", "#E08900"],
  speaking: ["#B3A6FF", "#776ee2", "#4F41C4"],
  error: ["#F5A79A", "#E5533D", "#B8341F"],
};

export function TutorOrb({ state }: { state: TutorState }) {
  const colors = PALETTE[state];
  const active = state === "listening" || state === "speaking";
  const properties = {
    "--orb-a": colors[0],
    "--orb-b": colors[1],
    "--orb-c": colors[2],
  } as CSSProperties;

  return (
    <div
      className={`${styles.orbWrap} ${styles[`orb_${state}`]}`}
      style={properties}
    >
      {active
        ? [0, 1, 2].map((index) => (
            <i
              className={styles.orbRing}
              key={index}
              style={{ animationDelay: `${index * (state === "speaking" ? 0.466 : 0.733)}s` }}
            />
          ))
        : null}
      <i className={styles.orbGlow} />
      <div className={styles.orb}>
        {active ? (
          <span className={styles.wave}>
            {[0, 1, 2, 3, 4].map((index) => (
              <i key={index} style={{ animationDelay: `${index * 0.06}s` }} />
            ))}
          </span>
        ) : (
          <MobileIcon
            name={
              state === "connecting"
                ? "ellipsis-horizontal"
                : state === "error"
                  ? "alert"
                  : "chatbubble-ellipses"
            }
            size={44}
          />
        )}
      </div>
    </div>
  );
}
