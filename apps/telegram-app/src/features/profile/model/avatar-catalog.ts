import { AVATAR_IDS, type AvatarField } from "../../../shared/model/avatar";
import type { IoniconName } from "../../../shared/ui/mobile-icon";

export interface AvatarOption {
  id: string;
  swatch?: string;
}

export interface AvatarCategory {
  id: AvatarField;
  icon: IoniconName;
  label: string;
  options: readonly AvatarOption[];
  preview: "full" | "head";
}

const options = (ids: readonly string[], swatches?: readonly string[]) =>
  ids.map((id, index) => ({ id, swatch: swatches?.[index] }));

export const AVATAR_CATEGORIES: readonly AvatarCategory[] = [
  {
    id: "skinTone",
    icon: "color-palette-outline",
    label: "Teri",
    preview: "head",
    options: options(AVATAR_IDS.skinTone, [
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
    ]),
  },
  {
    id: "bodyShape",
    icon: "body-outline",
    label: "Gavda",
    preview: "full",
    options: options(AVATAR_IDS.bodyShape),
  },
  {
    id: "expression",
    icon: "happy-outline",
    label: "Ifoda",
    preview: "head",
    options: options(AVATAR_IDS.expression),
  },
  {
    id: "eyeColor",
    icon: "eye-outline",
    label: "Ko‘z",
    preview: "head",
    options: options(AVATAR_IDS.eyeColor, [
      "#25252B",
      "#6D3F2A",
      "#987426",
      "#3D853D",
      "#168A90",
      "#2C73BE",
    ]),
  },
  {
    id: "hairstyle",
    icon: "cut-outline",
    label: "Soch",
    preview: "head",
    options: options(AVATAR_IDS.hairstyle),
  },
  {
    id: "hairColor",
    icon: "brush-outline",
    label: "Soch rangi",
    preview: "head",
    options: options(AVATAR_IDS.hairColor, [
      "#24242B",
      "#3D2825",
      "#683C2C",
      "#A2512E",
      "#712F3E",
      "#95949C",
      "#D49B39",
    ]),
  },
  {
    id: "eyewear",
    icon: "glasses-outline",
    label: "Ko‘zoynak",
    preview: "head",
    options: options(AVATAR_IDS.eyewear),
  },
  {
    id: "facialHair",
    icon: "cloud-outline",
    label: "Soqol",
    preview: "head",
    options: options(AVATAR_IDS.facialHair),
  },
  {
    id: "headwear",
    icon: "baseball-outline",
    label: "Bosh kiyim",
    preview: "head",
    options: options(AVATAR_IDS.headwear),
  },
  {
    id: "outfit",
    icon: "shirt-outline",
    label: "Kiyim",
    preview: "full",
    options: options(AVATAR_IDS.outfit),
  },
  {
    id: "background",
    icon: "image-outline",
    label: "Fon",
    preview: "full",
    options: options(AVATAR_IDS.background, [
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
    ]),
  },
];
