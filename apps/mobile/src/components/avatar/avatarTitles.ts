import type { WearSet } from "./avatarWearables";

/**
 * 칭호 — 이름 밑 문구 (api cosmetics, slot title). 텔레그램 shared/model/avatar-titles.ts 와 같다.
 * 문구는 i18n avatarEditor.nameTitle.items.<id>. 세트 칭호(set)는 그 세트를 입어 본 사람만 단다
 * (서버가 requires 로 막는다 — 앱은 잠금 표시만).
 */
export const TITLE_IDS = [
  "title_none",
  "title_hangul_master",
  "title_dawn",
  "title_night_owl",
  "title_word_collector",
  "title_kdrama",
  "title_seoul_dreamer",
  "title_tteokbokki",
  "title_honorific",
  "title_topik",
  "title_league_hunter",
  "title_kpop_idol",
  "title_king",
  "title_seonbi",
  "title_guard",
  "title_taekwondo",
] as const;
export type TitleId = (typeof TITLE_IDS)[number];
export type PaidTitle = Exclude<TitleId, "title_none">;
export type TitleRarity = "common" | "rare" | "epic" | "legendary";

export const TITLE_LOOK: Record<PaidTitle, { rarity: TitleRarity; set?: WearSet }> = {
  title_hangul_master: { rarity: "rare" },
  title_dawn: { rarity: "common" },
  title_night_owl: { rarity: "common" },
  title_word_collector: { rarity: "common" },
  title_kdrama: { rarity: "common" },
  title_seoul_dreamer: { rarity: "rare" },
  title_tteokbokki: { rarity: "common" },
  title_honorific: { rarity: "rare" },
  title_topik: { rarity: "epic" },
  title_league_hunter: { rarity: "epic" },
  title_kpop_idol: { rarity: "epic", set: "kpop" },
  title_king: { rarity: "legendary", set: "king" },
  title_seonbi: { rarity: "epic", set: "seonbi" },
  title_guard: { rarity: "epic", set: "guard" },
  title_taekwondo: { rarity: "epic", set: "taekwondo" },
};

/** 에디터 순서 — 일반 칭호 다음 세트 칭호 */
export const TITLE_ORDER = TITLE_IDS.filter((id): id is PaidTitle => id !== "title_none");

export const isTitle = (value: unknown): value is PaidTitle => typeof value === "string" && value in TITLE_LOOK;
