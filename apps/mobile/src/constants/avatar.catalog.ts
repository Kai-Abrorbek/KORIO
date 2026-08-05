import { Ionicons } from "@expo/vector-icons";
import {
  AVATAR_IDS,
  type AvatarField,
  type AvatarOption,
} from "@/types/avatar";

export interface AvatarCategory {
  id: AvatarField;
  icon: keyof typeof Ionicons.glyphMap;
  preview: "full" | "head";
  options: readonly AvatarOption[];
}

const free = (id: AvatarOption["id"], swatch?: string): AvatarOption => ({
  id,
  swatch,
  unlock: {
    type: "free",
  },
});

export const AVATAR_CATEGORIES: readonly AvatarCategory[] = [
  {
    id: "skinTone",
    icon: "color-palette-outline",
    preview: "head",
    options: AVATAR_IDS.skinTone.map((id, index) =>
      free(
        id,
        [
          "#5B3226",
          "#71402E",
          "#875039",
          "#9D6245",
          "#B87956",
          "#CC906B",
          "#DDA17D",
          "#EAB692",
          "#F3C8A9",
          "#F8DCC7",
        ][index],
      ),
    ),
  },
  {
    id: "bodyShape",
    icon: "body-outline",
    preview: "full",
    options: AVATAR_IDS.bodyShape.map((id) => free(id)),
  },
  {
    id: "expression",
    icon: "happy-outline",
    preview: "head",
    options: AVATAR_IDS.expression.map((id) => free(id)),
  },
  {
    id: "eyeColor",
    icon: "eye-outline",
    preview: "head",
    options: AVATAR_IDS.eyeColor.map((id, index) =>
      free(
        id,
        ["#25252B", "#6D3F2A", "#987426", "#3D853D", "#168A90", "#2C73BE"][
          index
        ],
      ),
    ),
  },
  {
    id: "hairstyle",
    icon: "cut-outline",
    preview: "head",
    options: AVATAR_IDS.hairstyle.map((id) => free(id)),
  },
  {
    id: "hairColor",
    icon: "brush-outline",
    preview: "head",
    options: AVATAR_IDS.hairColor.map((id, index) =>
      free(
        id,
        [
          "#24242B",
          "#3D2825",
          "#683C2C",
          "#A2512E",
          "#712F3E",
          "#95949C",
          "#D49B39",
        ][index],
      ),
    ),
  },
  {
    id: "eyewear",
    icon: "glasses-outline",
    preview: "head",
    options: AVATAR_IDS.eyewear.map((id) => free(id)),
  },
  {
    id: "facialHair",
    icon: "cloud-outline",
    preview: "head",
    options: AVATAR_IDS.facialHair.map((id) => free(id)),
  },
  {
    id: "headwear",
    icon: "baseball-outline",
    preview: "head",
    options: AVATAR_IDS.headwear.map((id) => free(id)),
  },
  {
    id: "outfit",
    icon: "shirt-outline",
    preview: "full",
    options: AVATAR_IDS.outfit.map((id) => free(id)),
  },
  {
    id: "background",
    icon: "image-outline",
    preview: "full",
    options: AVATAR_IDS.background.map((id, index) =>
      free(
        id,
        [
          "#E7EAF0",
          "#C9BEFF",
          "#B8E4FF",
          "#B9EDD9",
          "#D8F2A7",
          "#F0D9A7",
          "#F6C5AA",
          "#F5ADAF",
          "#385783",
          "#644879",
          "#EE9C60",
          "#72CFC5",
        ][index],
      ),
    ),
  },
] as const;
