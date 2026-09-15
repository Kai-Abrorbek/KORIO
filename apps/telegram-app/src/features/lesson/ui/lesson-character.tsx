import Image from "next/image";

import type { AnswerState } from "../model/lesson";
import styles from "./lesson.module.css";

type CharacterId = "nuri" | "hara" | "sori" | "dodo";
type Mood = "idle" | "correct" | "combo" | "wrong";

interface Pose {
  key: string;
  moods: Mood[];
}

const CHARACTERS: Record<CharacterId, Pose[]> = {
  nuri: [
    { key: "nuri_cool", moods: ["idle", "combo"] },
    { key: "nuri_thinking", moods: ["idle"] },
    { key: "nuri_wink_point", moods: ["correct", "combo"] },
    { key: "nuri_cheer", moods: ["correct"] },
  ],
  hara: [
    { key: "hara_confident", moods: ["idle", "combo"] },
    { key: "hara_studying", moods: ["idle"] },
    { key: "hara_thumbs_up", moods: ["correct", "combo"] },
    { key: "hara_cheer", moods: ["correct"] },
    { key: "hara_love", moods: ["correct"] },
  ],
  sori: [
    { key: "sori_cool", moods: ["idle", "combo"] },
    { key: "sori_peeking", moods: ["idle"] },
    { key: "sori_sleeping", moods: ["idle"] },
  ],
  dodo: [
    { key: "dodo_cool", moods: ["idle", "combo"] },
    { key: "dodo_thinking", moods: ["idle"] },
    { key: "dodo_cheer", moods: ["correct"] },
    { key: "dodo_dancing", moods: ["correct", "combo"] },
    { key: "dodo_angry", moods: ["wrong"] },
    { key: "dodo_oops", moods: ["wrong"] },
    { key: "dodo_dizzy", moods: ["wrong"] },
  ],
};

const IDS = Object.keys(CHARACTERS) as CharacterId[];

function seedHash(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function selectPose(seed: string, state: AnswerState, combo: number) {
  const character = IDS[seedHash(seed) % IDS.length] ?? "nuri";
  const mood: Mood = state === "wrong" ? "wrong" : state === "correct" ? (combo >= 3 ? "combo" : "correct") : "idle";
  const poses = CHARACTERS[character];
  const order: Mood[] = mood === "wrong" ? ["wrong", "idle"] : mood === "combo" ? ["combo", "correct", "idle"] : [mood, "idle"];
  for (const candidateMood of order) {
    const matches = poses.filter((pose) => pose.moods.includes(candidateMood));
    if (matches.length) return matches[seedHash(`${seed}${candidateMood}`) % matches.length]!;
  }
  return poses[0]!;
}

export function LessonCharacter({
  combo = 0,
  height = 160,
  seed,
  state,
}: {
  combo?: number;
  height?: number;
  seed: string;
  state: AnswerState;
}) {
  const pose = selectPose(seed, state, combo);
  return (
    <span className={`${styles.lessonCharacter} ${state !== "idle" ? styles.lessonCharacterReacting : ""}`} style={{ height, width: height * (600 / 780) }}>
      <Image alt="" fill priority sizes={`${Math.ceil(height * (600 / 780))}px`} src={`/characters/${pose.key}.png`} unoptimized />
    </span>
  );
}
