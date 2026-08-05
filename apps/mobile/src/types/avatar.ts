export const AVATAR_VERSION = 1 as const;

export type AvatarField =
  | "skinTone"
  | "bodyShape"
  | "expression"
  | "eyeColor"
  | "hairstyle"
  | "hairColor"
  | "eyewear"
  | "facialHair"
  | "headwear"
  | "outfit"
  | "background";

export interface AvatarConfig {
  version: typeof AVATAR_VERSION;
  skinTone: string;
  bodyShape: string;
  expression: string;
  eyeColor: string;
  hairstyle: string;
  hairColor: string;
  eyewear: string;
  facialHair: string;
  headwear: string;
  outfit: string;
  background: string;
}

export type AvatarUnlock =
  | {
      type: "free";
    }
  | {
      type: "gems";
      price: number;
    }
  | {
      type: "super";
    };

export interface AvatarOption {
  id: string;
  unlock: AvatarUnlock;
  swatch?: string;
}

export interface AvatarCategory {
  id: AvatarField;
  icon: string;
  options: readonly AvatarOption[];
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  version: AVATAR_VERSION,
  skinTone: "skin_05",
  bodyShape: "body_balanced",
  expression: "expression_smile",
  eyeColor: "eyes_charcoal",
  hairstyle: "hair_wave",
  hairColor: "haircolor_charcoal",
  eyewear: "eyewear_none",
  facialHair: "facial_none",
  headwear: "headwear_none",
  outfit: "outfit_hoodie",
  background: "background_lilac",
};
