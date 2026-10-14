import api from "./api";
import type { AvatarConfig } from "@/types/avatar";

/** api cosmetics — 꾸미기 아이템 (오라 · 배경 장면 · 펫 · 의상 · 손) */
export interface CosmeticItem {
  id: string;
  slot: "aura" | "scene" | "pet" | "costume" | "hand";
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
}

export interface CosmeticsState {
  gems: number;
  owned: string[];
  equipped: { aura: string; scene?: string; pet?: string; costume?: string; hand?: string };
  items: CosmeticItem[];
}

export const CosmeticsService = {
  list: () => api.get<CosmeticsState>("/cosmetics"),
  /** 산 즉시 장착까지 (equip) */
  purchase: (itemId: string, equip = true) =>
    api.post<{ itemId: string; gems: number; owned: string[]; avatar: Partial<AvatarConfig> }>(
      "/cosmetics/purchase",
      { itemId, equip },
    ),
};
