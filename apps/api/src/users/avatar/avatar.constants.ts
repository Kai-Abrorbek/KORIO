import {
  AURA_IDS,
  COSTUME_IDS,
  HAND_IDS,
  HAT_IDS,
  TITLE_IDS,
  PET_IDS,
  SCENE_IDS,
} from '../../cosmetics/cosmetics.const';

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
  bodyShape: ['body_slim', 'body_balanced', 'body_soft', 'body_broad'],
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
  /** 보석으로 사는 움직이는 효과 (cosmetics). 가진 것만 장착할 수 있다 */
  aura: AURA_IDS,
  /** 캐릭터 뒤 장면 그림 (cosmetics). background 그라데이션 위에 깐다 — 예전 앱은 이 칸을 모른다 */
  scene: SCENE_IDS,
  /** 캐릭터 옆 펫 (cosmetics). 크기·모습은 연속 학습일로 앱이 정한다 — 예전 앱은 이 칸을 모른다 */
  pet: PET_IDS,
  /** 기본 옷 대신 입는 의상 (cosmetics) — 예전 앱은 이 칸을 몰라 기본 옷으로 보인다 */
  costume: COSTUME_IDS,
  /** 오른손에 든 것 (cosmetics) */
  hand: HAND_IDS,
  /** 기본 모자 대신 쓰는 모자 (cosmetics) */
  hat: HAT_IDS,
  /** 이름 밑 칭호 (cosmetics). 세트 칭호는 그 세트를 받아 둔 사람만 */
  title: TITLE_IDS,
} as const;

export interface AvatarConfigValue {
  version: typeof AVATAR_VERSION;
  skinTone: (typeof AVATAR_OPTIONS.skinTone)[number];
  bodyShape: (typeof AVATAR_OPTIONS.bodyShape)[number];
  expression: (typeof AVATAR_OPTIONS.expression)[number];
  eyeColor: (typeof AVATAR_OPTIONS.eyeColor)[number];
  hairstyle: (typeof AVATAR_OPTIONS.hairstyle)[number];
  hairColor: (typeof AVATAR_OPTIONS.hairColor)[number];
  eyewear: (typeof AVATAR_OPTIONS.eyewear)[number];
  facialHair: (typeof AVATAR_OPTIONS.facialHair)[number];
  headwear: (typeof AVATAR_OPTIONS.headwear)[number];
  outfit: (typeof AVATAR_OPTIONS.outfit)[number];
  background: (typeof AVATAR_OPTIONS.background)[number];
  aura?: (typeof AVATAR_OPTIONS.aura)[number];
  scene?: (typeof AVATAR_OPTIONS.scene)[number];
  pet?: (typeof AVATAR_OPTIONS.pet)[number];
  costume?: (typeof AVATAR_OPTIONS.costume)[number];
  hand?: (typeof AVATAR_OPTIONS.hand)[number];
  hat?: (typeof AVATAR_OPTIONS.hat)[number];
  title?: (typeof AVATAR_OPTIONS.title)[number];
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfigValue = {
  version: AVATAR_VERSION,
  skinTone: 'skin_08',
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
  aura: 'aura_none',
  scene: 'scene_none',
  pet: 'pet_none',
  costume: 'costume_none',
  hand: 'hand_none',
  hat: 'hat_none',
  title: 'title_none',
};
