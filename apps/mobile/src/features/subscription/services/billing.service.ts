import { Platform } from "react-native";
import type {
  Purchase,
  ProductSubscription,
  SubscriptionOffer,
} from "expo-iap";
import {
  GOOGLE_SUBSCRIPTION_IDS,
  PLAN_MONTHS,
  PLAN_ORDER,
} from "./products";

/**
 * 스토어(expo-iap)와 우리 서버 사이의 얇은 번역기.
 *
 * 여기서 하는 일은 딱 두 가지다.
 *  1) 스토어가 준 상품 정보를 화면이 쓰기 좋은 모양으로 바꾼다 (가격 포함)
 *  2) 결제 결과에서 purchaseToken 을 꺼낸다
 *
 * 여기서 "구독이 유효한가" 를 판단하지 않는다. 그건 서버가 구글에 물어서
 * 정한다. 앱은 토큰 배달부다.
 *
 * ⚠️ expo-iap 은 네이티브 모듈이라 Expo Go 에서 안 돈다. 개발 빌드
 * (npx expo run:android) 로 실행해야 한다.
 */

/** 화면이 쓰는 상품 모양. 가격은 전부 스토어가 준 문자열 그대로다 */
export interface StorePlan {
  productId: string;
  title: string;
  /** "₩9,900" / "49 000 so'm" — 스토어가 유저 국가에 맞춰 만들어준 문자열 */
  displayPrice: string;
  currency: string;
  price: number;
  /** Android 결제에 반드시 필요한 오퍼 토큰 */
  offerToken?: string;
  /** 무료 체험이 붙은 오퍼인지 */
  hasFreeTrial: boolean;
  /** 이 상품이 몇 개월치인지 */
  months: number;
  order: number;
}

/**
 * 구독 상품 목록을 화면용으로 정리한다.
 *
 * Android 는 상품 하나에 여러 오퍼(기본 요금제 / 체험 / 프로모션)가 달릴 수
 * 있고, 결제할 때 그중 하나의 offerToken 을 지정해야 한다. 유저에게 가장
 * 유리한 것 = 무료 체험이 있으면 그걸, 없으면 제일 싼 걸 고른다.
 */
export function toStorePlans(subs: ProductSubscription[]): StorePlan[] {
  return subs
    .filter(isPurchasable)
    .map((sub) => {
      const offers: SubscriptionOffer[] =
        (sub as any).subscriptionOffers ?? [];
      const best = pickBestOffer(offers);

      return {
        productId: sub.id,
        title: sub.title,
        // 오퍼가 있으면 오퍼 가격이 실제로 청구되는 값이다
        displayPrice: best?.displayPrice ?? (sub as any).displayPrice ?? "",
        currency: best?.currency ?? (sub as any).currency ?? "",
        price: best?.price ?? (sub as any).price ?? 0,
        offerToken: best?.offerTokenAndroid ?? undefined,
        hasFreeTrial: best?.paymentMode === "free-trial",
        months: PLAN_MONTHS[sub.id as keyof typeof PLAN_MONTHS] ?? 1,
        order: PLAN_ORDER[sub.id as keyof typeof PLAN_ORDER] ?? 99,
      };
    })
    .filter((p) => !!p.displayPrice && p.price > 0)
    .sort((a, b) => a.order - b.order);
}

/**
 * 실제로 살 수 있는 상품인지.
 *
 * Play Console 에 등록 안 된 SKU 를 물어보면 expo-iap 은 그 자리를 비워두는 게
 * 아니라 productStatusAndroid: 'not-found' 인 껍데기를 돌려준다. 그대로 그리면
 * 이름만 있고 가격이 빈 카드가 4개 뜬다 (실제로 그렇게 보였다).
 * 'no-offers-available' 도 마찬가지 — 유저가 살 수 있는 오퍼가 없다는 뜻이라
 * 결제를 걸어봐야 실패한다.
 */
function isPurchasable(sub: ProductSubscription): boolean {
  const status = (sub as any).productStatusAndroid;
  if (status && status !== "ok") return false;
  return true;
}

function pickBestOffer(offers: SubscriptionOffer[]): SubscriptionOffer | null {
  if (!offers.length) return null;
  const trial = offers.find((o) => o.paymentMode === "free-trial");
  if (trial) return trial;
  return offers.reduce((cheapest, o) =>
    (o.price ?? Infinity) < (cheapest.price ?? Infinity) ? o : cheapest,
  );
}

/** requestPurchase 에 넘길 인자. 안드로이드는 offerToken 이 필수다 */
export function buildSubscriptionRequest(plan: StorePlan) {
  return {
    type: "subs" as const,
    request: {
      google: {
        skus: [plan.productId],
        subscriptionOffers: plan.offerToken
          ? [{ sku: plan.productId, offerToken: plan.offerToken }]
          : [],
      },
    },
  };
}

/**
 * 결제 결과에서 서버로 보낼 토큰을 꺼낸다.
 *
 * purchaseState 가 'pending' 이면 아직 돈이 안 빠진 상태다(계좌이체 등).
 * 이때 서버로 보내봐야 구글이 권한을 안 주므로 보내지 않는다 — 결제가
 * 완료되면 서버 알림(Pub/Sub)으로 들어온다.
 */
export function extractToken(
  purchase: Purchase,
): { purchaseToken: string; productId: string } | null {
  if (purchase.purchaseState === "pending") return null;
  const token = purchase.purchaseToken;
  if (!token) return null;
  return { purchaseToken: token, productId: purchase.productId };
}

/** 복원용: 활성 구매 목록에서 우리 상품만 골라 토큰을 모은다 */
export function extractRestorable(purchases: Purchase[]) {
  const ours = new Set<string>(GOOGLE_SUBSCRIPTION_IDS);
  return purchases
    .filter((p) => ours.has(p.productId))
    .map(extractToken)
    .filter((x): x is { purchaseToken: string; productId: string } => !!x);
}

export const SUBSCRIPTION_SKUS = [...GOOGLE_SUBSCRIPTION_IDS];

/** 안드로이드에서만 스토어 결제를 쓴다 (웹은 Phase 3~4 의 PG) */
export const isStoreBillingSupported = Platform.OS === "android";

/**
 * 월간 대비 몇 % 싼지. 스토어가 준 실제 가격으로만 계산한다.
 * 하드코딩한 할인율을 보여주면 나라별 가격이 다를 때 거짓말이 된다.
 */
export function savingPercent(plan: StorePlan, plans: StorePlan[]): number {
  const monthly = plans.find((p) => p.months === 1);
  if (!monthly || !monthly.price || plan.months <= 1) return 0;
  const perMonth = plan.price / plan.months;
  const pct = Math.round((1 - perMonth / monthly.price) * 100);
  return pct > 0 ? pct : 0;
}

/**
 * 월 환산 표시용.
 *
 * 통화 기호·자릿수 구분자는 스토어가 준 문자열에서 그대로 따라간다.
 * toLocaleString() 을 쓰면 기기 로케일을 따라가서, 스토어가 "49 000 so'm"
 * 이라고 준 걸 우리가 "43,000 so'm" 으로 바꿔 쓰는 꼴이 된다.
 */
export function perMonthPrice(plan: StorePlan): string {
  if (plan.months <= 1) return plan.displayPrice;
  const perMonth = plan.price / plan.months;

  // 스토어 문자열에서 숫자 덩어리를 찾는다 (기호·공백은 그대로 둔다)
  const match = plan.displayPrice.match(/\d[\d.,\s\u00A0\u202F]*\d|\d/);
  if (!match) return plan.displayPrice;

  const raw = match[0];
  const hasDecimals = /[.,]\d{1,2}$/.test(raw);
  // 천 단위 구분자: 스토어가 쓴 걸 그대로 (공백 / 쉼표 / 마침표 / 없음)
  const sepMatch = raw.match(/[\s\u00A0\u202F,.](?=\d{3}(\D|$))/);
  const sep = sepMatch ? sepMatch[0] : "";
  const decimalSep = hasDecimals ? raw.slice(-3, -2) : ".";

  const fixed = hasDecimals ? perMonth.toFixed(2) : String(Math.round(perMonth));
  const [intPart, decPart] = fixed.split(".");
  const grouped = sep
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
    : intPart;
  const out = decPart ? `${grouped}${decimalSep}${decPart}` : grouped;

  return plan.displayPrice.replace(raw, out);
}
