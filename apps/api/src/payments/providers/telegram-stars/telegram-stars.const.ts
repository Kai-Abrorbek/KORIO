import type {
  SubscriptionPlan,
  SubscriptionTier,
} from '../../subscriptions/subscription.types';

/**
 * 텔레그램 Stars(XTR) 로 파는 프리미엄 기간권.
 *
 * **왜 Stars 인가.** 텔레그램 봇·미니앱에서 디지털 상품은 Stars 로만 팔 수 있다
 * (텔레그램 정책). 그리고 우즈벡 유저 대부분은 구글 플레이가 받는 해외카드가
 * 없는데, Stars 는 현지 판매처에서 Humo·UzCard·Click·Payme 로 산다 — 우즈벡에서
 * 현지 카드로 우리 걸 살 수 있는 사실상 유일한 길이다 (claude/결제-시스템.md).
 *
 * **왜 자동 갱신이 아니라 기간권인가.** Stars 구독은 갱신일에 잔액이 있어야
 * 빠진다. 판매처에서 필요한 만큼만 사는 유저는 잔액이 보통 0 이라 갱신이 거의
 * 실패한다. 한 번 사고 끝나면 다시 사는 쪽이 실제 행동과 맞다.
 *
 * **가격 근거 (2026-10, Kai 확인).**
 *   - 유저가 내는 돈: 우즈벡 판매처 기준 1⭐ ≈ 240~255 so'm
 *   - 우리가 받는 돈: 출금 기준 1⭐ ≈ $0.013 (≈ 156 so'm) — 유저가 낸 돈의 약 62%
 *   - 맞춘 기준: 구글 플레이 UZS 가격(원화 가격의 약 9.7배)과 유저 부담이 같게.
 *     플랫폼마다 값이 다르면 싼 쪽으로 몰리고 차익이 생긴다
 *   - 할인 비율은 앱 요금제와 같다 (SUPER -10/-18/-35%, MAX -12/-17/-25%)
 *
 * ⚠️ 값을 바꾸면 이미 만든 인보이스 링크는 옛 가격 그대로다. 결제 직전 검사
 *    (pre_checkout_query)는 인보이스에 박힌 가격을 믿는다 — 우리가 만든 링크라서.
 */
export interface StarsProduct {
  /** 앱·서버·인보이스 payload 가 같이 쓰는 id (마침표 금지 — payload 구분자) */
  id: string;
  tier: SubscriptionTier;
  plan: SubscriptionPlan;
  months: number;
  days: number;
  stars: number;
}

export const STARS_PRODUCTS: readonly StarsProduct[] = [
  {
    id: 'super_1m',
    tier: 'super',
    plan: 'monthly',
    months: 1,
    days: 30,
    stars: 250,
  },
  {
    id: 'super_3m',
    tier: 'super',
    plan: 'three_months',
    months: 3,
    days: 90,
    stars: 675,
  },
  {
    id: 'super_6m',
    tier: 'super',
    plan: 'six_months',
    months: 6,
    days: 180,
    stars: 1225,
  },
  {
    id: 'super_12m',
    tier: 'super',
    plan: 'yearly',
    months: 12,
    days: 365,
    stars: 1950,
  },

  {
    id: 'max_1m',
    tier: 'max',
    plan: 'monthly',
    months: 1,
    days: 30,
    stars: 550,
  },
  {
    id: 'max_3m',
    tier: 'max',
    plan: 'three_months',
    months: 3,
    days: 90,
    stars: 1450,
  },
  {
    id: 'max_6m',
    tier: 'max',
    plan: 'six_months',
    months: 6,
    days: 180,
    stars: 2750,
  },
  {
    id: 'max_12m',
    tier: 'max',
    plan: 'yearly',
    months: 12,
    days: 365,
    stars: 4950,
  },
];

export const STARS_PRODUCT_IDS = STARS_PRODUCTS.map((p) => p.id);

export const starsProductById = (id: string): StarsProduct | undefined =>
  STARS_PRODUCTS.find((p) => p.id === id);

/** 같은 등급 1개월짜리 대비 몇 % 싼지 (앱 요금제 카드의 -n% 와 같은 계산) */
export function starsSavingPercent(product: StarsProduct): number {
  const monthly = STARS_PRODUCTS.find(
    (p) => p.tier === product.tier && p.months === 1,
  );
  if (!monthly || product.months <= 1) return 0;
  const full = monthly.stars * product.months;
  return Math.max(0, Math.round((1 - product.stars / full) * 100));
}

/** 미니앱 요금제 카드에 그대로 쓰는 모양 */
export function starsCatalog() {
  return STARS_PRODUCTS.map((p) => ({
    id: p.id,
    tier: p.tier,
    plan: p.plan,
    months: p.months,
    days: p.days,
    stars: p.stars,
    perMonthStars: Math.round(p.stars / p.months),
    savePercent: starsSavingPercent(p),
    /** 등급마다 1년권이 "가장 이득" */
    best: p.months === 12,
  }));
}

/** Stars 는 소수가 없다. Subscription.priceMicros 에 넣을 값 */
export const starsToMicros = (stars: number) => stars * 1_000_000;

/** 인보이스 그림 — 미니앱이 서빙하는 앱 아이콘 */
export const STARS_INVOICE_PHOTO_PATH = '/app-icon.png';
