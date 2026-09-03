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
  email: "abror0dev@gmail.com",
  telegram: "https://t.me/Abror_bek_0",
  // 도메인은 korio.online 이다 (korio.app 은 우리 것이 아니다).
  // ⚠️ 이 두 페이지는 아직 없다. 구글 플레이는 개인정보처리방침 URL 을
  //    필수로 요구하므로 심사 전에 올려야 한다.
  terms: "https://korio.online/terms",
  privacy: "https://korio.online/privacy",
};
