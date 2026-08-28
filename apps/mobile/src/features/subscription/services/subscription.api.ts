import api from "@/services/api";

/** 서버가 판단한 프리미엄 권한. 앱은 이 값만 믿는다 */
export interface MySubscription {
  isPremium: boolean;
  /** 기존 화면 호환 (user.isSuper 를 읽던 곳들) */
  isSuper: boolean;
  plan: string | null;
  provider: string | null;
  platform: string | null;
  productId: string | null;
  status: string | null;
  expiresAt: string | null;
  autoRenew: boolean;
  isTrial: boolean;
  trialDaysLeft: number | null;
}

export interface RestoreResult {
  restored: number;
  subscription: MySubscription;
}

/**
 * 결제 관련 서버 통신.
 *
 * 앱은 결제 성공 여부를 스스로 판단하지 않는다. Google Play 가 준
 * purchaseToken 을 서버로 넘기고, 서버가 구글에 물어본 결과를 받는다.
 * price / status / expiresAt 을 앱이 서버로 올려보내는 일은 없다.
 */
export const SubscriptionApi = {
  /** 프리미엄 권한 조회 — 어디서 결제했든 KORIO 계정 기준 */
  me: (): Promise<MySubscription> => api.get(`/payments/subscriptions/me`),

  /** 결제 직후. 서버 검증이 끝나야 프리미엄이 켜진다 */
  verifyGooglePurchase: (
    purchaseToken: string,
    productId?: string,
  ): Promise<MySubscription> =>
    api.post(`/payments/google-play/verify`, { purchaseToken, productId }),

  /** 재설치·기기변경 복원. 스토어의 활성 구매를 전부 서버로 다시 보낸다 */
  restoreGooglePurchases: (
    purchases: { purchaseToken: string; productId?: string }[],
  ): Promise<RestoreResult> =>
    api.post(`/payments/google-play/restore`, { purchases }),
};
