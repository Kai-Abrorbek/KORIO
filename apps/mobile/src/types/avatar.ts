export const AVATAR_VERSION = 1 as const;

export const AVATAR_IDS = {
  skinTone: [
    "skin_01",
    "skin_02",
    "skin_03",
    "skin_04",
    "skin_05",
    "skin_06",
    "skin_07",
    "skin_08",
    "skin_09",
    "skin_10",
  ],
  bodyShape: ["body_slim", "body_balanced", "body_soft", "body_broad"],
  expression: [
    "expression_calm",
    "expression_smile",
    "expression_proud",
    "expression_curious",
    "expression_playful",
    "expression_focused",
  ],
  eyeColor: [
    "eyes_charcoal",
    "eyes_brown",
    "eyes_hazel",
    "eyes_green",
    "eyes_teal",
    "eyes_blue",
  ],
  hairstyle: [
    "hair_none",
    "hair_crop",
    "hair_wave",
    "hair_bob",
    "hair_curls",
    "hair_topknot",
    "hair_pony",
  ],
  hairColor: [
    "haircolor_charcoal",
    "haircolor_espresso",
    "haircolor_chestnut",
    "haircolor_copper",
    "haircolor_burgundy",
    "haircolor_silver",
    "haircolor_blonde",
  ],
  eyewear: [
    "eyewear_none",
    "eyewear_round",
    "eyewear_square",
    "eyewear_sun",
    "eyewear_half",
  ],
  facialHair: [
    "facial_none",
    "facial_stubble",
    "facial_mustache",
    "facial_beard",
  ],
  headwear: [
    "headwear_none",
    "headwear_cap",
    "headwear_beanie",
    "headwear_headband",
    "headwear_bucket",
  ],
  outfit: [
    "outfit_hoodie",
    "outfit_varsity",
    "outfit_sweater",
    "outfit_sport",
    "outfit_hanbok",
    "outfit_denim",
  ],
  background: [
    "background_cloud",
    "background_lilac",
    "background_sky",
    "background_mint",
    "background_lime",
    "background_sand",
    "background_peach",
    "background_coral",
    "background_navy",
    "background_plum",
    "background_sunset",
    "background_aurora",
  ],
} as const;

export type AvatarField = keyof typeof AVATAR_IDS;

export type AvatarValue<K extends AvatarField> = (typeof AVATAR_IDS)[K][number];

export interface AvatarConfig {
  version: typeof AVATAR_VERSION;
  skinTone: AvatarValue<"skinTone">;
  bodyShape: AvatarValue<"bodyShape">;
  expression: AvatarValue<"expression">;
  eyeColor: AvatarValue<"eyeColor">;
  hairstyle: AvatarValue<"hairstyle">;
  hairColor: AvatarValue<"hairColor">;
  eyewear: AvatarValue<"eyewear">;
  facialHair: AvatarValue<"facialHair">;
  headwear: AvatarValue<"headwear">;
  outfit: AvatarValue<"outfit">;
  background: AvatarValue<"background">;
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

export interface AvatarOption<K extends AvatarField = AvatarField> {
  id: AvatarValue<K>;
  unlock: AvatarUnlock;
  swatch?: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  version: AVATAR_VERSION,
  skinTone: "skin_08",
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

export function mergeAvatarConfig(
  avatar?: Partial<AvatarConfig> | null,
): AvatarConfig {
  return {
    ...DEFAULT_AVATAR_CONFIG,
    ...avatar,
    version: AVATAR_VERSION,
  };
}
