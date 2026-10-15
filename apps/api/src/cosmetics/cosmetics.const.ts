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
 * costume: 기본 옷 대신 입는 의상 (avatar.costume) · hand: 오른손에 든 것 (avatar.hand)
 * hat: 기본 모자 대신 쓰는 모자 (avatar.hat)
 * title: 이름 밑 칭호 문구 (avatar.title) — 세트 칭호는 그 세트를 입어 본 사람만 (requires)
 * 세트(K팝·왕·선비·수문장·태권도)와 세트 효과는 앱이 정한다 — 서버는 칸·id·가격만
 */
export type CosmeticSlot =
  | 'aura'
  | 'scene'
  | 'pet'
  | 'costume'
  | 'hand'
  | 'hat'
  | 'title';
export type CosmeticRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CosmeticItem {
  id: string;
  slot: CosmeticSlot;
  rarity: CosmeticRarity;
  price: number;
  /**
   * 이걸 가지려면 먼저 가져야 하는 것 — 묶음마다 하나 이상 (세트 칭호).
   * 무료여도 "모두의 것"이 아니다: 실제로 받아 둔(ownedCosmetics) 것으로만 따진다.
   * 무료 아이템은 입어서 저장하면 ownedCosmetics 에 들어가니, 세트를 한 번 입어 보면 열린다.
   */
  requires?: string[][];
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
  // K팝 세트
  { id: 'costume_stage', slot: 'costume', rarity: 'epic', price: 0 },
  { id: 'hand_lightstick', slot: 'hand', rarity: 'rare', price: 0 },
  { id: 'hand_mic', slot: 'hand', rarity: 'rare', price: 0 },
  // 한국 전통 세트 — 왕 · 선비 · 수문장 · 태권도
  { id: 'costume_gonryongpo', slot: 'costume', rarity: 'legendary', price: 0 },
  { id: 'hat_ikseongwan', slot: 'hat', rarity: 'epic', price: 0 },
  { id: 'costume_seonbi', slot: 'costume', rarity: 'epic', price: 0 },
  { id: 'hat_gat', slot: 'hat', rarity: 'rare', price: 0 },
  { id: 'costume_guard', slot: 'costume', rarity: 'epic', price: 0 },
  { id: 'hat_jeollip', slot: 'hat', rarity: 'rare', price: 0 },
  { id: 'costume_taekwondo', slot: 'costume', rarity: 'rare', price: 0 },
  // 칭호 — 이름 밑 문구
  { id: 'title_hangul_master', slot: 'title', rarity: 'rare', price: 0 },
  { id: 'title_dawn', slot: 'title', rarity: 'common', price: 0 },
  { id: 'title_night_owl', slot: 'title', rarity: 'common', price: 0 },
  { id: 'title_word_collector', slot: 'title', rarity: 'common', price: 0 },
  { id: 'title_kdrama', slot: 'title', rarity: 'common', price: 0 },
  { id: 'title_seoul_dreamer', slot: 'title', rarity: 'rare', price: 0 },
  { id: 'title_tteokbokki', slot: 'title', rarity: 'common', price: 0 },
  { id: 'title_honorific', slot: 'title', rarity: 'rare', price: 0 },
  { id: 'title_topik', slot: 'title', rarity: 'epic', price: 0 },
  { id: 'title_league_hunter', slot: 'title', rarity: 'epic', price: 0 },
  // 세트 칭호 — 그 세트를 입어 본(받아 둔) 사람만
  {
    id: 'title_kpop_idol',
    slot: 'title',
    rarity: 'epic',
    price: 0,
    requires: [['costume_stage'], ['hand_lightstick', 'hand_mic']],
  },
  {
    id: 'title_king',
    slot: 'title',
    rarity: 'legendary',
    price: 0,
    requires: [['costume_gonryongpo'], ['hat_ikseongwan']],
  },
  {
    id: 'title_seonbi',
    slot: 'title',
    rarity: 'epic',
    price: 0,
    requires: [['costume_seonbi'], ['hat_gat']],
  },
  {
    id: 'title_guard',
    slot: 'title',
    rarity: 'epic',
    price: 0,
    requires: [['costume_guard'], ['hat_jeollip']],
  },
  {
    id: 'title_taekwondo',
    slot: 'title',
    rarity: 'epic',
    price: 0,
    requires: [['costume_taekwondo']],
  },
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

export const COSTUME_NONE = 'costume_none';
export const HAND_NONE = 'hand_none';
export const HAT_NONE = 'hat_none';
export const TITLE_NONE = 'title_none';

/** avatar.costume / hand / hat 에 들어갈 수 있는 값 (none 포함). 모양은 앱이 같은 id 로 갖고 있다 */
export const COSTUME_IDS = [
  COSTUME_NONE,
  'costume_stage',
  'costume_gonryongpo',
  'costume_seonbi',
  'costume_guard',
  'costume_taekwondo',
] as const;
export const HAND_IDS = [HAND_NONE, 'hand_lightstick', 'hand_mic'] as const;
/** avatar.title 에 들어갈 수 있는 값 (none 포함). 문구는 앱 i18n 이 같은 id 로 갖고 있다 */
export const TITLE_IDS = [
  TITLE_NONE,
  'title_hangul_master',
  'title_dawn',
  'title_night_owl',
  'title_word_collector',
  'title_kdrama',
  'title_seoul_dreamer',
  'title_tteokbokki',
  'title_honorific',
  'title_topik',
  'title_league_hunter',
  'title_kpop_idol',
  'title_king',
  'title_seonbi',
  'title_guard',
  'title_taekwondo',
] as const;
export const HAT_IDS = [
  HAT_NONE,
  'hat_ikseongwan',
  'hat_gat',
  'hat_jeollip',
] as const;

/** 칸마다 "안 입음" 값 — 늘 가진 것으로 친다 */
export const NONE_BY_SLOT: Record<CosmeticSlot, string> = {
  aura: AURA_NONE,
  scene: SCENE_NONE,
  pet: PET_NONE,
  costume: COSTUME_NONE,
  hand: HAND_NONE,
  hat: HAT_NONE,
  title: TITLE_NONE,
};
/** avatar 에 장착되는 칸 (저장·목록에서 다 같이 다룬다) */
export const COSMETIC_SLOTS = Object.keys(NONE_BY_SLOT) as CosmeticSlot[];
const NONE_IDS = new Set(Object.values(NONE_BY_SLOT));
export const isNoneCosmetic = (id: string) => NONE_IDS.has(id);

export const cosmeticById = (id: string): CosmeticItem | undefined =>
  COSMETICS.find((item) => item.id === id);

/** 조건(requires)을 채웠나 — 실제로 받아 둔 것(ownedCosmetics)으로만 본다 */
export const meetsRequires = (
  item: CosmeticItem,
  owned: readonly string[] | null | undefined,
): boolean =>
  !item.requires ||
  item.requires.every((group) =>
    group.some((id) => (owned ?? []).includes(id)),
  );

/** 가격 0 = 무료 = 모두가 가진 것 (조건 있는 아이템은 빼고) */
export const isFreeCosmetic = (id: string | null | undefined): boolean => {
  const item = id ? cosmeticById(id) : undefined;
  return Boolean(item && item.price <= 0 && !item.requires);
};

/** 무료인데 조건을 채워서 내 것으로 칠 수 있나 (세트 칭호) */
export const isFreeForUser = (
  id: string | null | undefined,
  owned: readonly string[] | null | undefined,
): boolean => {
  const item = id ? cosmeticById(id) : undefined;
  return Boolean(item && item.price <= 0 && meetsRequires(item, owned));
};

/** 산 것 + 지금 무료인 것 (조건 있는 무료는 조건을 채웠을 때만) */
export const ownedWithFree = (owned: readonly string[] | null | undefined) => [
  ...new Set([
    ...(owned ?? []),
    ...COSMETICS.filter(
      (item) => item.price <= 0 && meetsRequires(item, owned),
    ).map((item) => item.id),
  ]),
];
