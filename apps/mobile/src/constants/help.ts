/**
 * 고객지원 화면 데이터.
 *
 * 질문·답변 본문은 i18n(`help.faq.<id>.q` / `.a`)에 있고 여기엔 구조만 둔다.
 * 항목을 추가하면 4개 언어에 같은 키를 채워야 한다.
 */

export type HelpCategory = "learning" | "premium" | "account" | "etc";

export const HELP_CATEGORIES: HelpCategory[] = [
  "learning",
  "premium",
  "account",
  "etc",
];

export interface HelpItem {
  id: string;
  category: HelpCategory;
  icon: string;
}

export const HELP_FAQ: HelpItem[] = [
  { id: "energy", category: "learning", icon: "flash" },
  { id: "streak", category: "learning", icon: "flame" },
  { id: "xp", category: "learning", icon: "star" },
  { id: "league", category: "learning", icon: "trophy" },
  { id: "hangul", category: "learning", icon: "text" },
  { id: "levelTest", category: "learning", icon: "speedometer" },

  { id: "superWhat", category: "premium", icon: "diamond" },
  { id: "trial", category: "premium", icon: "gift" },
  { id: "cancel", category: "premium", icon: "close-circle" },
  { id: "refund", category: "premium", icon: "card" },

  { id: "password", category: "account", icon: "key" },
  { id: "device", category: "account", icon: "phone-portrait" },
  { id: "deleteAccount", category: "account", icon: "trash" },

  { id: "offline", category: "etc", icon: "cloud-offline" },
  { id: "bug", category: "etc", icon: "bug" },
];

/**
 * 지원 창구. 실제 주소가 정해지면 여기만 바꾸면 된다.
 * (임시값이라 배포 전에 반드시 교체할 것)
 */
export const SUPPORT = {
  email: "support@korio.app",
  telegram: "https://t.me/korio_support",
  terms: "https://korio.app/terms",
  privacy: "https://korio.app/privacy",
};
