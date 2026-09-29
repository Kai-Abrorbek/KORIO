import type { CSSProperties } from "react";

import type { TutorState, VoiceTutorEmotion } from "../model/voice-tutor";
import { TUTOR_ACCENT } from "./tutor-labels";
import styles from "./tutor-mascot.module.css";

type Face = "calm" | "happy" | "shocked" | "sly";

function faceFor(state: TutorState, emotion?: VoiceTutorEmotion): Face {
  if (state !== "speaking" || !emotion) return "calm";
  if (emotion === "laughing" || emotion === "happy" || emotion === "excited") return "happy";
  if (emotion === "shocked" || emotion === "disbelief" || emotion === "angry") return "shocked";
  if (emotion === "mocking") return "sly";
  return "calm";
}

/**
 * KORIO 음성 튜터 마스코트 — 모바일 components/TutorMascot.tsx 의 웹판.
 *
 * 진주빛 라벤더 몸체 + 어두운 얼굴 화면 + 빛나는 노란 눈 + 안테나 + 볼터치.
 * 이미지 없이 CSS 로만 그린다. 표정은 두 축이다:
 *  - state  : 듣기 = 눈 크게, 생각 = 위를 봄·안테나 깜빡, 말하기 = 입이 움직임, 연결 중 = 두리번
 *  - emotion: 웃음 = ^ ^, 놀람 = 눈 커지고 입 O, 놀림 = 비스듬한 눈
 */
export function TutorMascot({
  emotion,
  size,
  state,
  tint = "#776ee2",
}: {
  emotion?: VoiceTutorEmotion;
  size: number;
  state: TutorState;
  tint?: string;
}) {
  const face = faceFor(state, emotion);
  const vars = {
    "--size": `${size}px`,
    "--accent": TUTOR_ACCENT[state] ?? TUTOR_ACCENT.idle,
    "--bulb": state === "thinking" ? "#FFC24B" : tint,
    "--float-dur": state === "speaking" ? "900ms" : "2800ms",
    "--float-scale": state === "speaking" ? 1.025 : 1.012,
    "--halo-dur": `${state === "speaking" ? 700 : state === "listening" ? 1600 : 2600}ms`,
    "--tilt": state === "listening" ? "-3deg" : "0deg",
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={[styles.mascot, styles[`state_${state}`], styles[`face_${face}`]].filter(Boolean).join(" ")}
      style={vars}
    >
      <i className={styles.halo} />
      <div className={styles.body}>
        <div className={styles.antenna}>
          <i className={styles.bulb} />
          <i className={styles.stem} />
        </div>
        <div className={styles.shell}>
          <i className={styles.gloss} />
          <div className={styles.screen}>
            <div className={styles.eyes}>
              {[0, 1].map((side) => (
                <span className={`${styles.eyeSlot} ${side ? styles.right : styles.left}`} key={side}>
                  <i className={styles.eye} />
                  <i className={styles.arc} />
                </span>
              ))}
            </div>
            <i className={styles.mouth} />
          </div>
          <i className={`${styles.cheek} ${styles.cheekL}`} />
          <i className={`${styles.cheek} ${styles.cheekR}`} />
        </div>
      </div>
    </div>
  );
}
