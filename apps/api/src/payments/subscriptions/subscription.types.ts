/** 결제 수단. 나라·플랫폼이 늘어도 여기만 늘어난다 */
export type PaymentProviderId =
  | 'google_play'
  | 'toss'
  | 'uzum'
  | 'click'
  | 'payme';

export type SubscriptionPlatform = 'android' | 'ios' | 'web';

/** 가격·상품이 나라별로 갈리므로 구독에 국가를 박아둔다 */
export type SubscriptionCountry = 'KR' | 'UZ' | 'OTHER';

export type SubscriptionPlan =
  | 'monthly'
  | 'three_months'
  | 'six_months'
  | 'yearly';

/**
 * 구독 상태.
 * - active: 지금 프리미엄
 * - cancelled: 해지했지만 남은 기간은 유지 (autoRenew=false)
 * - grace_period: 결제 실패, 구글이 재시도 중 — 프리미엄 유지
 * - on_hold: 재시도도 실패 — 프리미엄 정지, 아직 복구 가능
 * - expired: 끝
 */
export type SubscriptionStatus =
  | 'active'
  | 'cancelled'
  | 'grace_period'
  | 'on_hold'
  | 'expired';

/** 프리미엄을 실제로 줘야 하는 상태들 */
export const ENTITLED_STATUSES: SubscriptionStatus[] = [
  'active',
  'cancelled', // 해지해도 만료 전까지는 쓴다
  'grace_period',
];

export const PLAN_MONTHS: Record<SubscriptionPlan, number> = {
  monthly: 1,
  three_months: 3,
  six_months: 6,
  yearly: 12,
};

/**
 * 구독 등급.
 *
 * - super: 기존 프리미엄. 에너지 무제한, 잠긴 과정, 광고 제거 등
 * - max:   super 전부 + AI 음성 튜터
 *
 * 튜터는 분당 실비가 나가는 유일한 기능이라 등급을 나눈다. super 가격에
 * 튜터를 넣으면 많이 쓰는 유저일수록 손해가 커진다.
 */
export type SubscriptionTier = 'super' | 'max';

/**
 * Play Console 상품 ID → 등급 + 기간.
 *
 * 가격은 여기 없다. 가격은 Play Console 이 국가별로 갖고 있고 앱은 스토어가
 * 준 값을 그대로 보여준다. 서버가 아는 건 "어떤 등급의 몇 개월짜리인가" 뿐이다.
 *
 * ⚠️ 이 문자열은 Play Console 의 상품 ID 와 글자 하나까지 같아야 한다.
 */
export interface ProductSpec {
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
}

export const GOOGLE_PRODUCTS: Record<string, ProductSpec> = {
  korio_super_monthly: { tier: 'super', plan: 'monthly' },
  korio_super_3months: { tier: 'super', plan: 'three_months' },
  korio_super_6months: { tier: 'super', plan: 'six_months' },
  korio_super_yearly: { tier: 'super', plan: 'yearly' },

  korio_max_monthly: { tier: 'max', plan: 'monthly' },
  korio_max_3months: { tier: 'max', plan: 'three_months' },
  korio_max_6months: { tier: 'max', plan: 'six_months' },
  korio_max_yearly: { tier: 'max', plan: 'yearly' },
};

/** 등급 비교용. 높을수록 상위 */
export const TIER_RANK: Record<SubscriptionTier, number> = {
  super: 1,
  max: 2,
};

/** 검증을 마친 결과. 어느 Provider 든 이 모양으로 돌려준다 */
export interface VerifiedPurchase {
  provider: PaymentProviderId;
  platform: SubscriptionPlatform;
  productId: string;
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startedAt: Date;
  expiresAt: Date;
  autoRenew: boolean;
  /** 중복 처리 방지 키. 같은 값이면 같은 결제다 */
  externalTransactionId: string;
  country?: SubscriptionCountry;
  /** 갱신될 때마다 바뀌지 않는, 구독 자체의 식별자 */
  externalSubscriptionId?: string;
  raw?: unknown;
}
