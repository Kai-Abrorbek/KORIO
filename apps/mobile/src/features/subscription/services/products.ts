/**
 * Play Console 에 등록할 구독 상품 id.
 *
 * ⚠️ 가격은 여기 없다. 앱에 가격을 하드코딩하지 않는다.
 * 국가별 가격은 Play Console 이 갖고 있고, 앱은 스토어가 준 표시 문자열
 * (₩9,900 / 49 000 so'm)을 그대로 보여준다. 그래야 한국 유저는 KRW,
 * 우즈벡 유저는 UZS 를 보고 — IP 로 가격을 정하는 짓을 안 하게 된다.
 *
 * 서버의 GOOGLE_PRODUCTS 와 반드시 같아야 한다.
 */
export type SubscriptionTier = "super" | "max";

export const TIERS: SubscriptionTier[] = ["super", "max"];

export const PRODUCTS_BY_TIER: Record<SubscriptionTier, string[]> = {
  super: [
    "korio_super_monthly",
    "korio_super_3months",
    "korio_super_6months",
    "korio_super_yearly",
  ],
  max: [
    "korio_max_monthly",
    "korio_max_3months",
    "korio_max_6months",
    "korio_max_yearly",
  ],
};

export const GOOGLE_SUBSCRIPTION_IDS = [
  ...PRODUCTS_BY_TIER.super,
  ...PRODUCTS_BY_TIER.max,
];

/** 상품 id → 등급 */
export function tierOf(productId: string): SubscriptionTier {
  return productId.includes("_max_") ? "max" : "super";
}

/** 상품 id → 개월 수 */
export function monthsOf(productId: string): number {
  if (productId.endsWith("_3months")) return 3;
  if (productId.endsWith("_6months")) return 6;
  if (productId.endsWith("_yearly")) return 12;
  return 1;
}

/** 화면 정렬용 */
export function orderOf(productId: string): number {
  return monthsOf(productId);
}

/** i18n 키. premium.plans.<key> */
export function planKeyOf(productId: string): string {
  const m = monthsOf(productId);
  if (m === 3) return "threeMonths";
  if (m === 6) return "sixMonths";
  if (m === 12) return "yearly";
  return "monthly";
}

/**
 * 혜택 목록.
 *
 * MAX 는 SUPER 를 전부 포함한다. 그래서 SUPER 목록을 따로 두고 MAX 는
 * "SUPER 전부 + 아래" 로 보여준다 — 같은 항목을 두 번 나열하면 뭐가 다른지
 * 오히려 안 보인다.
 */
export const SUPER_FEATURES = [
  { icon: "infinite", key: "unlimitedEnergy" },
  { icon: "close-circle", key: "noAds" },
  { icon: "refresh", key: "unlimitedReview" },
  { icon: "diamond", key: "monthlyGems" },
  { icon: "stats-chart", key: "advancedStats" },
] as const;

/** MAX 에만 있는 것. 이게 MAX 를 사는 이유다 */
export const MAX_FEATURES = [
  { icon: "mic", key: "aiTutor" },
  { icon: "chatbubbles", key: "tutorTopics" },
  { icon: "volume-high", key: "tutorPronunciation" },
] as const;
