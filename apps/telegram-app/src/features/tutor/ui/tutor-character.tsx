import type { CSSProperties } from "react";

import type { TutorState } from "../model/tutor";
import { TUTOR_ACCENT, hexA } from "./tutor-labels";
import styles from "./tutor-call.module.css";

/**
 * 통화 화면 한가운데 서는 선생님 — 모바일 components/TutorCharacter.tsx.
 *
 * 일러스트가 아직 없어서 이모지를 후광·유리 디스크·광택으로 감싸 하나의 캐릭터 슬롯으로 만든다.
 *  1) 퍼져나가는 후광 링 — 말이 오가는 중이라는 신호
 *  2) 디스크의 호흡 — 상태마다 속도가 다르다
 *  3) 대각선으로 지나가는 광택 — 멈춰 있어도 죽어 보이지 않게
 *  4) 상태 배지 — 지금 누가 말할 차례인지
 */
export function TutorCharacter({
  avatar,
  color,
  size = 140,
  state,
}: {
  avatar: string;
  color: string;
  size?: number;
  state: TutorState;
}) {
  const speaking = state === "speaking";
  const listening = state === "listening";
  const alive = speaking || listening;
  const accent = TUTOR_ACCENT[state] ?? TUTOR_ACCENT.idle;
  const halo = size * 1.42;

  const vars = {
    "--accent": accent,
    "--accent-rim": hexA(accent, 0.55),
    "--accent-soft": hexA(accent, 0.18),
    "--accent-line": hexA(accent, 0.5),
    "--breath": `${speaking ? 460 : listening ? 1500 : 1100}ms`,
    "--breath-scale": speaking ? 1.045 : 1.02,
    "--breath-lift": speaking ? "-3px" : "-1.5px",
    "--disc": `${size}px`,
    "--disc-a": hexA(color, 0.92),
    "--disc-b": hexA(color, 0.55),
    "--glow-min": alive ? 0.45 : 0.22,
    "--glow-max": alive ? 0.8 : 0.34,
    "--halo": `${halo}px`,
  } as CSSProperties;

  return (
    <div aria-hidden="true" className={`${styles.character} ${alive ? styles.characterAlive : ""}`} style={vars}>
      <i className={styles.ring} />
      <i className={styles.ring} style={{ animationDelay: "740ms" }} />
      <i className={styles.ring} style={{ animationDelay: "1480ms" }} />
      <i className={styles.characterGlow} />
      <div className={styles.disc}>
        <span className={styles.discEmoji} style={{ fontSize: size * 0.46 }}>{avatar}</span>
        <i className={styles.discSheen} />
        <i className={styles.discRim} />
      </div>
      {alive ? (
        <span className={styles.characterBadge}>
          {[0, 1, 2, 3].map((index) => (
            <i
              className={speaking ? styles.badgeBarFast : styles.badgeBar}
              key={index}
              style={{
                animationDelay: `${index * 60}ms`,
                animationDuration: `${speaking ? 240 + index * 57 : 760 + index * 91}ms`,
              }}
            />
          ))}
        </span>
      ) : null}
    </div>
  );
}
