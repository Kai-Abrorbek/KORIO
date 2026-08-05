export const AVATAR_VERSION = 1 as const;

export const AVATAR_OPTIONS = {
  skinTone: [
    'skin_01',
    'skin_02',
    'skin_03',
    'skin_04',
    'skin_05',
    'skin_06',
    'skin_07',
    'skin_08',
    'skin_09',
    'skin_10',
  ],
  bodyShape: ['body_balanced', 'body_slim', 'body_soft', 'body_broad'],
  expression: [
    'expression_calm',
    'expression_smile',
    'expression_proud',
    'expression_curious',
    'expression_playful',
    'expression_focused',
  ],
  eyeColor: [
    'eyes_charcoal',
    'eyes_brown',
    'eyes_hazel',
    'eyes_green',
    'eyes_teal',
    'eyes_blue',
  ],
  hairstyle: [
    'hair_none',
    'hair_crop',
    'hair_wave',
    'hair_bob',
    'hair_curls',
    'hair_topknot',
    'hair_pony',
  ],
  hairColor: [
    'haircolor_charcoal',
    'haircolor_espresso',
    'haircolor_chestnut',
    'haircolor_copper',
    'haircolor_burgundy',
    'haircolor_silver',
    'haircolor_blonde',
  ],
  eyewear: [
    'eyewear_none',
    'eyewear_round',
    'eyewear_square',
    'eyewear_sun',
    'eyewear_half',
  ],
  facialHair: [
    'facial_none',
    'facial_stubble',
    'facial_mustache',
    'facial_beard',
  ],
  headwear: [
    'headwear_none',
    'headwear_cap',
    'headwear_beanie',
    'headwear_headband',
    'headwear_bucket',
  ],
  outfit: [
    'outfit_hoodie',
    'outfit_varsity',
    'outfit_sweater',
    'outfit_sport',
    'outfit_hanbok',
    'outfit_denim',
  ],
  background: [
    'background_cloud',
    'background_lilac',
    'background_sky',
    'background_mint',
    'background_lime',
    'background_sand',
    'background_peach',
    'background_coral',
    'background_navy',
    'background_plum',
    'background_sunset',
    'background_aurora',
  ],
} as const;

export interface AvatarConfigValue {
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

export const DEFAULT_AVATAR_CONFIG: AvatarConfigValue = {
  version: AVATAR_VERSION,
  skinTone: 'skin_05',
  bodyShape: 'body_balanced',
  expression: 'expression_smile',
  eyeColor: 'eyes_charcoal',
  hairstyle: 'hair_wave',
  hairColor: 'haircolor_charcoal',
  eyewear: 'eyewear_none',
  facialHair: 'facial_none',
  headwear: 'headwear_none',
  outfit: 'outfit_hoodie',
  background: 'background_lilac',
};
