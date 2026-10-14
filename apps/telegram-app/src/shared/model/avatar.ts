export const AVATAR_VERSION = 1 as const;

export const AVATAR_IDS = {
  skinTone: ["skin_01", "skin_02", "skin_03", "skin_04", "skin_05", "skin_06", "skin_07", "skin_08", "skin_09", "skin_10"],
  bodyShape: ["body_slim", "body_balanced", "body_soft", "body_broad"],
  expression: ["expression_calm", "expression_smile", "expression_proud", "expression_curious", "expression_playful", "expression_focused"],
  eyeColor: ["eyes_charcoal", "eyes_brown", "eyes_hazel", "eyes_green", "eyes_teal", "eyes_blue"],
  hairstyle: ["hair_none", "hair_crop", "hair_wave", "hair_bob", "hair_curls", "hair_topknot", "hair_pony"],
  hairColor: ["haircolor_charcoal", "haircolor_espresso", "haircolor_chestnut", "haircolor_copper", "haircolor_burgundy", "haircolor_silver", "haircolor_blonde"],
  eyewear: ["eyewear_none", "eyewear_round", "eyewear_square", "eyewear_sun", "eyewear_half"],
  facialHair: ["facial_none", "facial_stubble", "facial_mustache", "facial_beard"],
  headwear: ["headwear_none", "headwear_cap", "headwear_beanie", "headwear_headband", "headwear_bucket"],
  outfit: ["outfit_hoodie", "outfit_varsity", "outfit_sweater", "outfit_sport", "outfit_hanbok", "outfit_denim"],
  background: ["background_cloud", "background_lilac", "background_sky", "background_mint", "background_lime", "background_sand", "background_peach", "background_coral", "background_navy", "background_plum", "background_sunset", "background_aurora"],
  /** 보석으로 사는 움직이는 효과 (api cosmetics) — 산 것만 장착된다 */
  aura: ["aura_none", "aura_stardust", "aura_snow", "aura_blossom", "aura_flame", "aura_hangul"],
  /** 캐릭터 뒤 배경 장면 (api cosmetics, slot scene) — 서울 여행 그림. 고르면 색 배경 대신 이 그림 */
  scene: ["scene_none", "scene_hangang", "scene_cvs", "scene_namsan", "scene_jeju", "scene_snow", "scene_gyeongbokgung"],
  /** 캐릭터 옆 펫 (api cosmetics, slot pet) — 연속 학습일로 자란다 */
  pet: ["pet_none", "pet_jindo", "pet_hangulmon", "pet_tiger", "pet_dokkaebi"],
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
  aura: AvatarValue<"aura">;
  scene: AvatarValue<"scene">;
  pet: AvatarValue<"pet">;
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
  aura: "aura_none",
  scene: "scene_none",
  pet: "pet_none",
};

export function mergeAvatarConfig(avatar?: Partial<AvatarConfig> | null): AvatarConfig {
  return { ...DEFAULT_AVATAR_CONFIG, ...avatar, version: AVATAR_VERSION };
}

/** 무작위 — 오라·배경 장면·펫은 상점 아이템이라 바꾸지 않는다 */
export function randomAvatar(keep?: Partial<Pick<AvatarConfig, "aura" | "scene" | "pet">>): AvatarConfig {
  const pick = <T extends readonly string[]>(values: T): T[number] =>
    values[Math.floor(Math.random() * values.length)]!;
  return {
    version: AVATAR_VERSION,
    skinTone: pick(AVATAR_IDS.skinTone),
    bodyShape: pick(AVATAR_IDS.bodyShape),
    expression: pick(AVATAR_IDS.expression),
    eyeColor: pick(AVATAR_IDS.eyeColor),
    hairstyle: pick(AVATAR_IDS.hairstyle),
    hairColor: pick(AVATAR_IDS.hairColor),
    eyewear: pick(AVATAR_IDS.eyewear),
    facialHair: pick(AVATAR_IDS.facialHair),
    headwear: pick(AVATAR_IDS.headwear),
    outfit: pick(AVATAR_IDS.outfit),
    background: pick(AVATAR_IDS.background),
    aura: keep?.aura ?? "aura_none",
    scene: keep?.scene ?? "scene_none",
    pet: keep?.pet ?? "pet_none",
  };
}
