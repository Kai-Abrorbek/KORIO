import { runtimeConfig } from '../app-settings/runtime-values';

/**
 * 보석으로 사는 꾸미기 아이템. 첫 번째 종류는 "오라" — 캐릭터 주위에서 움직이는 효과.
 *
 * 그림이 아니라 코드로 그린다(앱 AvatarAura · 텔레그램 avatar-aura). 그래서 여기엔
 * 식별자·등급·가격만 있고, 모양은 앱 쪽 카탈로그가 같은 id 로 갖고 있다.
 * 장착한 오라는 avatar.aura 에 들어가서 리그·친구 프로필·목록 어디서든 남에게 보인다.
 *
 * 2026-10-14 부터 **전부 무료**(가격 0). 가격이 0 인 아이템은 모두가 가진 걸로 친다 —
 * 입으면(구매·아바타 저장) ownedCosmetics 에 넣어 둬서, 나중에 다시 팔아도 그때 받은 건 계속 내 것.
 *
 * 다시 팔 때 기준 (1 보석 = 1 so'm, 상자 보석으로 하루 70~85):
 *   일반 800 · 희귀 2,000 · 에픽 5,000 · 전설 12,000
 * 어드민 "앱 숫자 설정" 에서 가격만 올리면 된다 (COSMETICS.<n>.price, 0 = 무료).
 */
/**
 * aura: 캐릭터 주위 효과 · scene: 캐릭터 뒤 "서울 여행" 장면 그림 (avatar.scene)
 * pet: 캐릭터 옆 펫 (avatar.pet) — 연속 학습일에 따라 앱이 아기·꼬마·다 큰 모습으로 그린다
 */
export type CosmeticSlot = 'aura' | 'scene' | 'pet';
export type CosmeticRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CosmeticItem {
  id: string;
  slot: CosmeticSlot;
  rarity: CosmeticRarity;
  price: number;
}

export const AURA_NONE = 'aura_none';

export const COSMETICS: CosmeticItem[] = runtimeConfig('COSMETICS', [
  { id: 'aura_stardust', slot: 'aura', rarity: 'common', price: 0 },
  { id: 'aura_snow', slot: 'aura', rarity: 'common', price: 0 },
  { id: 'aura_blossom', slot: 'aura', rarity: 'rare', price: 0 },
  { id: 'aura_flame', slot: 'aura', rarity: 'epic', price: 0 },
  { id: 'aura_hangul', slot: 'aura', rarity: 'legendary', price: 0 },
  // ⚠️ 새 아이템은 맨 뒤에 — 어드민 설정 키가 순번(COSMETICS.<n>.price)이다
  { id: 'scene_hangang', slot: 'scene', rarity: 'rare', price: 0 },
  { id: 'scene_cvs', slot: 'scene', rarity: 'rare', price: 0 },
  { id: 'scene_namsan', slot: 'scene', rarity: 'rare', price: 0 },
  { id: 'scene_jeju', slot: 'scene', rarity: 'epic', price: 0 },
  { id: 'scene_snow', slot: 'scene', rarity: 'epic', price: 0 },
  { id: 'scene_gyeongbokgung', slot: 'scene', rarity: 'legendary', price: 0 },
  { id: 'pet_jindo', slot: 'pet', rarity: 'rare', price: 0 },
  { id: 'pet_hangulmon', slot: 'pet', rarity: 'rare', price: 0 },
  { id: 'pet_tiger', slot: 'pet', rarity: 'epic', price: 0 },
  { id: 'pet_dokkaebi', slot: 'pet', rarity: 'legendary', price: 0 },
]);

/** avatar.aura 에 들어갈 수 있는 값 (none 포함) */
export const AURA_IDS = [
  AURA_NONE,
  'aura_stardust',
  'aura_snow',
  'aura_blossom',
  'aura_flame',
  'aura_hangul',
] as const;

export const SCENE_NONE = 'scene_none';

/** avatar.scene 에 들어갈 수 있는 값 (none 포함). 그림은 앱이 같은 id 로 갖고 있다 */
export const SCENE_IDS = [
  SCENE_NONE,
  'scene_hangang',
  'scene_cvs',
  'scene_namsan',
  'scene_jeju',
  'scene_snow',
  'scene_gyeongbokgung',
] as const;

export const PET_NONE = 'pet_none';

/** avatar.pet 에 들어갈 수 있는 값 (none 포함). 그림은 앱이 같은 id 로 갖고 있다 */
export const PET_IDS = [
  PET_NONE,
  'pet_jindo',
  'pet_hangulmon',
  'pet_tiger',
  'pet_dokkaebi',
] as const;

/** 칸마다 "안 입음" 값 — 늘 가진 것으로 친다 */
export const NONE_BY_SLOT: Record<CosmeticSlot, string> = {
  aura: AURA_NONE,
  scene: SCENE_NONE,
  pet: PET_NONE,
};
const NONE_IDS = new Set(Object.values(NONE_BY_SLOT));
export const isNoneCosmetic = (id: string) => NONE_IDS.has(id);

export const cosmeticById = (id: string): CosmeticItem | undefined =>
  COSMETICS.find((item) => item.id === id);

/** 가격 0 = 무료 = 모두가 가진 것 */
export const isFreeCosmetic = (id: string | null | undefined): boolean => {
  const item = id ? cosmeticById(id) : undefined;
  return Boolean(item && item.price <= 0);
};

/** 산 것 + 지금 무료인 것 */
export const ownedWithFree = (owned: readonly string[] | null | undefined) => [
  ...new Set([
    ...(owned ?? []),
    ...COSMETICS.filter((item) => item.price <= 0).map((item) => item.id),
  ]),
];
