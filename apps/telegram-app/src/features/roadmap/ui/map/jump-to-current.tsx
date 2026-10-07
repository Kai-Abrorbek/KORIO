import type { CSSProperties } from "react";

import { darken } from "./color";
import { AppIcon } from "./icon";
import styles from "./roadmap-map.module.css";

/**
 * 지금 할 곳으로 되돌아가는 둥근 버튼 (앱 JumpToCurrentButton).
 * 노드와 같은 입체 원판으로 — 화살표가 가야 할 쪽으로 가끔 살짝 움직여 눈에 띈다.
 */
export function JumpToCurrent({
  bottom = 72,
  color,
  direction,
  label,
  onPress,
}: {
  /** 화면 아래(안전 영역 위)에서 띄울 높이 */
  bottom?: number;
  color: string;
  direction: "up" | "down" | "back";
  label: string;
  onPress: () => void;
}) {
  const style = {
    "--jump": color,
    "--jump-dark": darken(color, 45),
    bottom: `calc(${bottom}px + var(--korio-bottom, 0px))`,
  } as CSSProperties;
  return (
    <button aria-label={label} className={styles.jumpCurrent} onClick={onPress} style={style} type="button">
      <i className={styles.jumpGlow} />
      <i className={styles.jumpDepth} />
      <span>
        <i
          className={`${styles.jumpArrow} ${
            direction === "down" ? styles.jumpDown : direction === "up" ? styles.jumpUp : ""
          }`}
        >
          <AppIcon name={direction === "back" ? "arrow-undo" : direction === "up" ? "arrow-up" : "arrow-down"} size={26} />
        </i>
      </span>
    </button>
  );
}
