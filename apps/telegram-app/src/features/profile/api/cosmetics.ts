import type { AvatarConfig } from "../../../shared/model/avatar";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

/** api cosmetics — 꾸미기 아이템 (지금은 오라) */
export interface CosmeticItem {
  id: string;
  slot: "aura";
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
}

export interface CosmeticsState {
  gems: number;
  owned: string[];
  equipped: { aura: string };
  items: CosmeticItem[];
}

export function getCosmetics(request: AuthenticatedRequest) {
  return request<CosmeticsState>("/cosmetics");
}

/** 산 즉시 장착까지 (equip) */
export function purchaseCosmetic(request: AuthenticatedRequest, itemId: string, equip = true) {
  return request<{ itemId: string; gems: number; owned: string[]; avatar: Partial<AvatarConfig> }>(
    "/cosmetics/purchase",
    { body: JSON.stringify({ itemId, equip }), method: "POST" },
  );
}
