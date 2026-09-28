import type { ImageSourcePropType } from "react-native";
import type { CharacterFrame, GestureState } from "./character-controller";

export const CHARACTER_IDS = ["female_01", "male_01"] as const;
export type CharacterId = typeof CHARACTER_IDS[number];

export type CharacterAssetKey =
  | "idle" | "mouthSmall" | "mouthMedium" | "mouthOpen" | "laughOpen"
  | "blink" | "blinkSpeaking" | "halfBlink1" | "halfBlink2"
  | "headLeft" | "headRight"
  | "handRaise1" | "handRaise2" | "handRaise3"
  | "bothExplain1" | "bothExplain2" | "bothExplain2Open" | "bothExplainWideOpen"
  | "bothCompare" | "bothCompareOpen";

export interface TutorCharacterManifest {
  id: CharacterId;
  name: string;
  enabled: boolean;
  /** All sources must be transparent PNGs on the same 9:16 canvas and anchor. */
  assets: Partial<Record<CharacterAssetKey, ImageSourcePropType>>;
  recommendedVoiceIds?: string[];
}

// User-supplied poses: each PNG shares the same transparent 941×1672 canvas.
// A pose without a matching facial variant falls back to the closest supplied frame.
export const CHARACTER_MANIFESTS: Record<CharacterId, TutorCharacterManifest> = {
  female_01: {
    id: "female_01",
    name: "Female Tutor",
    enabled: true,
    assets: {
      idle: require("../../../../assets/images/voice-tutor/female_01/pose_idle.png"),
      mouthSmall: require("../../../../assets/images/voice-tutor/female_01/pose_mouth_small.png"),
      mouthMedium: require("../../../../assets/images/voice-tutor/female_01/pose_mouth_medium.png"),
      mouthOpen: require("../../../../assets/images/voice-tutor/female_01/pose_mouth_open.png"),
      laughOpen: require("../../../../assets/images/voice-tutor/female_01/pose_laugh_open.png"),
      headLeft: require("../../../../assets/images/voice-tutor/female_01/pose_look_left.png"),
      headRight: require("../../../../assets/images/voice-tutor/female_01/pose_look_right.png"),
      halfBlink1: require("../../../../assets/images/voice-tutor/female_01/pose_blink_half.png"),
      halfBlink2: require("../../../../assets/images/voice-tutor/female_01/pose_blink_near_closed.png"),
      blinkSpeaking: require("../../../../assets/images/voice-tutor/female_01/pose_blink_speaking.png"),
      handRaise1: require("../../../../assets/images/voice-tutor/female_01/pose_hand_raise_low.png"),
      handRaise2: require("../../../../assets/images/voice-tutor/female_01/pose_hand_raise_mid.png"),
      handRaise3: require("../../../../assets/images/voice-tutor/female_01/pose_hand_raise_high.png"),
      bothExplain1: require("../../../../assets/images/voice-tutor/female_01/pose_both_explain_cupped.png"),
      bothExplain2: require("../../../../assets/images/voice-tutor/female_01/pose_both_explain_open.png"),
      bothExplain2Open: require("../../../../assets/images/voice-tutor/female_01/pose_both_explain_speaking.png"),
      bothCompare: require("../../../../assets/images/voice-tutor/female_01/pose_both_compare.png"),
    },
  },
  male_01: {
    id: "male_01",
    name: "Male Tutor",
    enabled: true,
    assets: {
      idle: require("../../../../assets/images/voice-tutor/male_01/pose_idle.png"),
      mouthSmall: require("../../../../assets/images/voice-tutor/male_01/pose_mouth_small.png"),
      mouthOpen: require("../../../../assets/images/voice-tutor/male_01/pose_mouth_open.png"),
      headLeft: require("../../../../assets/images/voice-tutor/male_01/pose_look_left.png"),
      headRight: require("../../../../assets/images/voice-tutor/male_01/pose_look_right.png"),
      halfBlink1: require("../../../../assets/images/voice-tutor/male_01/pose_blink_half.png"),
      halfBlink2: require("../../../../assets/images/voice-tutor/male_01/pose_blink_near_closed.png"),
      blink: require("../../../../assets/images/voice-tutor/male_01/pose_blink_closed.png"),
      handRaise1: require("../../../../assets/images/voice-tutor/male_01/pose_hand_raise_low.png"),
      handRaise2: require("../../../../assets/images/voice-tutor/male_01/pose_hand_raise_mid.png"),
      handRaise3: require("../../../../assets/images/voice-tutor/male_01/pose_hand_raise_high.png"),
      bothExplain1: require("../../../../assets/images/voice-tutor/male_01/pose_both_explain_cupped.png"),
      bothExplain2: require("../../../../assets/images/voice-tutor/male_01/pose_both_explain_open.png"),
      bothExplain2Open: require("../../../../assets/images/voice-tutor/male_01/pose_both_explain_speaking.png"),
      bothExplainWideOpen: require("../../../../assets/images/voice-tutor/male_01/pose_both_explain_wide_speaking.png"),
      bothCompare: require("../../../../assets/images/voice-tutor/male_01/pose_both_compare.png"),
      bothCompareOpen: require("../../../../assets/images/voice-tutor/male_01/pose_both_compare_speaking.png"),
    },
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
    if (gesture === "both_explain_2" && frame.mouth === "open" &&
        frame.intensity >= 0.7 && assets.bothExplainWideOpen) {
      return assets.bothExplainWideOpen;
    }
    const open = GESTURE_OPEN[gesture];
    if (frame.mouth !== "closed" && open && assets[open]) return assets[open];
    const base = GESTURE_BASE[gesture];
    if (assets[base]) return assets[base];
  }
  if (frame.expression === "laughing" && frame.mouth !== "closed" && assets.laughOpen) return assets.laughOpen;
  if (frame.eye !== "open") {
    if (frame.mouth !== "closed" && assets.blinkSpeaking) return assets.blinkSpeaking;
    if (frame.eye === "closed") return assets.blink ?? assets.halfBlink2 ?? assets.idle;
    if (frame.eye === "half2" && assets.halfBlink2) return assets.halfBlink2;
    if (frame.eye === "half1" && assets.halfBlink1) return assets.halfBlink1;
  }
  if (frame.mouth === "open" && assets.mouthOpen) return assets.mouthOpen;
  if (frame.mouth === "medium" && assets.mouthMedium) return assets.mouthMedium;
  if (frame.mouth === "medium" && assets.mouthSmall) return assets.mouthSmall;
  if (frame.mouth === "small" && assets.mouthSmall) return assets.mouthSmall;
  if (frame.head === "left" && assets.headLeft) return assets.headLeft;
  if (frame.head === "right" && assets.headRight) return assets.headRight;
  return assets.idle;
}
