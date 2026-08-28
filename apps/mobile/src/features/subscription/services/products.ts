/**
 * Play Console 에 등록할 구독 상품 id.
 *
 * ⚠️ 가격은 여기 없다. 앱에 가격을 하드코딩하지 않는다.
 * 국가별 가격은 Play Console 이 갖고 있고, 앱은 스토어가 준 표시 문자열
 * (₩9,900 / 49 000 so'm)을 그대로 보여준다. 그래야 한국 유저는 KRW,
 * 우즈벡 유저는 UZS 를 보고 — IP 로 가격을 정하는 짓을 안 하게 된다.
 *
 * 서버의 GOOGLE_PRODUCT_TO_PLAN 과 반드시 같아야 한다.
 */
export const GOOGLE_SUBSCRIPTION_IDS = [
  "korio_premium_monthly",
  "korio_premium_3months",
  "korio_premium_6months",
  "korio_premium_yearly",
] as const;

export type GoogleSubscriptionId = (typeof GOOGLE_SUBSCRIPTION_IDS)[number];

/** 화면 정렬·라벨용. 가격은 여전히 스토어 값을 쓴다 */
export const PLAN_ORDER: Record<GoogleSubscriptionId, number> = {
  korio_premium_monthly: 0,
  korio_premium_3months: 1,
  korio_premium_6months: 2,
  korio_premium_yearly: 3,
};

/** i18n 키. premium.plans.<key> */
export const PLAN_I18N_KEY: Record<GoogleSubscriptionId, string> = {
  korio_premium_monthly: "monthly",
  korio_premium_3months: "threeMonths",
  korio_premium_6months: "sixMonths",
  korio_premium_yearly: "yearly",
};
