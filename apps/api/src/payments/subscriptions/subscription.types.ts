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
 * Play Console 상품 ID → 우리 플랜.
 *
 * 가격은 여기 없다. 가격은 Play Console 이 국가별로 갖고 있고 앱은 스토어가
 * 준 값을 그대로 보여준다. 서버가 아는 건 "이 상품은 몇 개월짜리인가" 뿐이다.
 */
export const GOOGLE_PRODUCT_TO_PLAN: Record<string, SubscriptionPlan> = {
  korio_premium_monthly: 'monthly',
  korio_premium_3months: 'three_months',
  korio_premium_6months: 'six_months',
  korio_premium_yearly: 'yearly',
};

/** 검증을 마친 결과. 어느 Provider 든 이 모양으로 돌려준다 */
export interface VerifiedPurchase {
  provider: PaymentProviderId;
  platform: SubscriptionPlatform;
  productId: string;
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
