import { runtimeConfig } from '../app-settings/runtime-values';

/**
 * 보석으로 사는 꾸미기 아이템. 첫 번째 종류는 "오라" — 캐릭터 주위에서 움직이는 효과.
 *
 * 그림이 아니라 코드로 그린다(앱 AvatarAura · 텔레그램 avatar-aura). 그래서 여기엔
 * 식별자·등급·가격만 있고, 모양은 앱 쪽 카탈로그가 같은 id 로 갖고 있다.
 * 장착한 오라는 avatar.aura 에 들어가서 리그·친구 프로필·목록 어디서든 남에게 보인다.
 *
 * 가격 기준 (1 보석 = 1 so'm, 상자 보석으로 하루 70~85):
 *   일반 800 · 희귀 2,000 · 에픽 5,000 · 전설 12,000
 * 어드민 "앱 숫자 설정" 에서 바꿀 수 있다 (COSMETICS.<n>.price).
 */
export type CosmeticSlot = 'aura';
export type CosmeticRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CosmeticItem {
  id: string;
  slot: CosmeticSlot;
  rarity: CosmeticRarity;
  price: number;
}

export const AURA_NONE = 'aura_none';

export const COSMETICS: CosmeticItem[] = runtimeConfig('COSMETICS', [
  { id: 'aura_stardust', slot: 'aura', rarity: 'common', price: 800 },
  { id: 'aura_snow', slot: 'aura', rarity: 'common', price: 800 },
  { id: 'aura_blossom', slot: 'aura', rarity: 'rare', price: 2000 },
  { id: 'aura_flame', slot: 'aura', rarity: 'epic', price: 5000 },
  { id: 'aura_hangul', slot: 'aura', rarity: 'legendary', price: 12000 },
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

export const cosmeticById = (id: string): CosmeticItem | undefined =>
  COSMETICS.find((item) => item.id === id);
