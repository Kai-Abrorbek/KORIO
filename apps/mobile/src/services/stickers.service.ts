import api from "./api";

/** api stickers — 내 캐릭터 텔레그램 스티커팩 (텔레그램 features/profile/api/stickers.ts 와 같다) */
export interface StickerPackInfo {
  name: string;
  /** t.me/addstickers/<name> */
  url: string;
  count: number;
  /** 캐릭터를 바꿔서 지금 세트와 다르다 → 다시 만들기 */
  outdated: boolean;
  updatedAt: string;
}

export interface StickersState {
  /** 서버에 봇·그리기 엔진이 준비돼 있나 */
  enabled: boolean;
  price: number;
  refreshPrice: number;
  gems: number;
  /** 텔레그램으로 가입했거나 봇으로 이어 둔 계정이 있나 */
  telegram: { linked: boolean; username: string | null };
  /** 지금 만드는 중 (봇 /start 로 이어서 만드는 때 포함) */
  busy: boolean;
  pack: StickerPackInfo | null;
  stickers: { id: string; text: string }[];
}

export interface StickerPreview {
  avatarKey: string;
  stickers: { id: string; text: string; image: string }[];
}

export type StickerMakeResult =
  | { status: "ready"; gems: number; pack: StickerPackInfo }
  /** 텔레그램 봇에서 START 를 눌러야 이어진다 (보석은 그때 빠진다) */
  | { status: "link"; link: string };

export const StickersService = {
  state: () => api.get<StickersState>("/stickers"),
  preview: () => api.get<StickerPreview>("/stickers/preview"),
  make: () => api.post<StickerMakeResult>("/stickers/make", {}),
};
