import type { ImageSourcePropType } from "react-native";
import type { CharacterFrame, GestureState } from "./character-controller";

export const CHARACTER_IDS = ["female_01", "male_01"] as const;
export type CharacterId = typeof CHARACTER_IDS[number];

export type CharacterAssetKey =
  | "idle" | "mouthSmall" | "mouthOpen" | "blink" | "halfBlink1" | "halfBlink2"
  | "headLeft" | "headRight"
  | "handRaise1" | "handRaise2" | "handRaise3"
  | "bothExplain1" | "bothExplain1Open" | "bothExplain2" | "bothExplain2Open"
  | "bothCompare" | "bothCompareOpen";

export interface TutorCharacterManifest {
  id: CharacterId;
  name: string;
  enabled: boolean;
  /** All sources must be transparent PNGs on the same 9:16 canvas and anchor. */
  assets: Partial<Record<CharacterAssetKey, ImageSourcePropType>>;
  recommendedVoiceIds?: string[];
}

// Provisional idle sprites keep both characters visible until the complete pose packs arrive.
// Missing mouth, blink, head, and gesture frames fall back to the corresponding idle sprite.
export const CHARACTER_MANIFESTS: Record<CharacterId, TutorCharacterManifest> = {
  female_01: {
    id: "female_01",
    name: "Female Tutor",
    enabled: true,
    assets: { idle: require("../../../../assets/images/voice-tutor/female_01/01_idle.png") },
  },
  male_01: {
    id: "male_01",
    name: "Male Tutor",
    enabled: true,
    assets: { idle: require("../../../../assets/images/voice-tutor/male_01/01_idle.png") },
  },
};

const GESTURE_BASE: Record<Exclude<GestureState, "none">, CharacterAssetKey> = {
  hand_raise_1: "handRaise1",
  hand_raise_2: "handRaise2",
  hand_raise_3: "handRaise3",
  both_explain_1: "bothExplain1",
  both_explain_2: "bothExplain2",
  both_compare: "bothCompare",
};

const GESTURE_OPEN: Partial<Record<Exclude<GestureState, "none">, CharacterAssetKey>> = {
  both_explain_1: "bothExplain1Open",
  both_explain_2: "bothExplain2Open",
  both_compare: "bothCompareOpen",
};

export function resolveCharacterAsset(
  manifest: TutorCharacterManifest,
  frame: CharacterFrame,
): ImageSourcePropType | undefined {
  const assets = manifest.assets;
  if (frame.gesture !== "none") {
    const gesture = frame.gesture;
    const open = GESTURE_OPEN[gesture];
    if (frame.mouth !== "closed" && open && assets[open]) return assets[open];
    const base = GESTURE_BASE[gesture];
    if (assets[base]) return assets[base];
  }
  if (frame.mouth === "open" && assets.mouthOpen) return assets.mouthOpen;
  if (frame.mouth === "small" && assets.mouthSmall) return assets.mouthSmall;
  if (frame.eye === "closed" && assets.blink) return assets.blink;
  if (frame.eye === "half2" && assets.halfBlink2) return assets.halfBlink2;
  if (frame.eye === "half1" && assets.halfBlink1) return assets.halfBlink1;
  if (frame.head === "left" && assets.headLeft) return assets.headLeft;
  if (frame.head === "right" && assets.headRight) return assets.headRight;
  return assets.idle;
}
