import { AvatarCategory, AvatarOption } from "@/types/avatar";

const free = (id: string, swatch?: string): AvatarOption => ({
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
    options: [
      free("skin_01", "#6F3D2D"),
      free("skin_02", "#7F4935"),
      free("skin_03", "#935638"),
      free("skin_04", "#A96845"),
      free("skin_05", "#BE7C54"),
      free("skin_06", "#CF8F65"),
      free("skin_07", "#DFA27A"),
      free("skin_08", "#ECB58F"),
      free("skin_09", "#F4C8A7"),
      free("skin_10", "#F9DCC7"),
    ],
  },
  {
    id: "bodyShape",
    icon: "body-outline",
    options: [
      free("body_balanced"),
      free("body_slim"),
      free("body_soft"),
      free("body_broad"),
    ],
  },
  {
    id: "expression",
    icon: "happy-outline",
    options: [
      free("expression_calm"),
      free("expression_smile"),
      free("expression_proud"),
      free("expression_curious"),
      free("expression_playful"),
      free("expression_focused"),
    ],
  },
  {
    id: "eyeColor",
    icon: "eye-outline",
    options: [
      free("eyes_charcoal", "#30343B"),
      free("eyes_brown", "#6E3D24"),
      free("eyes_hazel", "#96761B"),
      free("eyes_green", "#3D8C38"),
      free("eyes_teal", "#168E92"),
      free("eyes_blue", "#247CC5"),
    ],
  },
  {
    id: "hairstyle",
    icon: "cut-outline",
    options: [
      free("hair_none"),
      free("hair_crop"),
      free("hair_wave"),
      free("hair_bob"),
      free("hair_curls"),
      free("hair_topknot"),
      free("hair_pony"),
    ],
  },
  {
    id: "hairColor",
    icon: "brush-outline",
    options: [
      free("haircolor_charcoal", "#303033"),
      free("haircolor_espresso", "#4A2D25"),
      free("haircolor_chestnut", "#713E2B"),
      free("haircolor_copper", "#A54F2A"),
      free("haircolor_burgundy", "#7D2E38"),
      free("haircolor_silver", "#96949B"),
      free("haircolor_blonde", "#D99C33"),
    ],
  },
  {
    id: "eyewear",
    icon: "glasses-outline",
    options: [
      free("eyewear_none"),
      free("eyewear_round"),
      free("eyewear_square"),
      free("eyewear_sun"),
      free("eyewear_half"),
    ],
  },
  {
    id: "facialHair",
    icon: "cloud-outline",
    options: [
      free("facial_none"),
      free("facial_stubble"),
      free("facial_mustache"),
      free("facial_beard"),
    ],
  },
  {
    id: "headwear",
    icon: "baseball-outline",
    options: [
      free("headwear_none"),
      free("headwear_cap"),
      free("headwear_beanie"),
      free("headwear_headband"),
      free("headwear_bucket"),
    ],
  },
  {
    id: "outfit",
    icon: "shirt-outline",
    options: [
      free("outfit_hoodie"),
      free("outfit_varsity"),
      free("outfit_sweater"),
      free("outfit_sport"),
      free("outfit_hanbok"),
      free("outfit_denim"),
    ],
  },
  {
    id: "background",
    icon: "image-outline",
    options: [
      free("background_cloud", "#EEF0F4"),
      free("background_lilac", "#DDB8FF"),
      free("background_sky", "#B7E4FF"),
      free("background_mint", "#BDF4DF"),
      free("background_lime", "#D9F4A5"),
      free("background_sand", "#F5E4B7"),
      free("background_peach", "#FFD0B7"),
      free("background_coral", "#FFB5B5"),
      free("background_navy", "#2E4E83"),
      free("background_plum", "#6C4A83"),
      free("background_sunset", "#F4A75A"),
      free("background_aurora", "#7EDAC8"),
    ],
  },
] as const;
