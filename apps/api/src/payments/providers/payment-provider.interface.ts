import type {
  PaymentProviderId,
  VerifiedPurchase,
} from '../subscriptions/subscription.types';

/**
 * 결제 수단 하나를 감싸는 계약.
 *
 * SubscriptionService 는 이 인터페이스만 알고, 구글이든 Toss 든 Uzum 이든
 * 모른다. 나라·PG 가 늘어도 여기 구현체만 추가된다.
 *
 * createPayment / refundPayment 가 optional 인 이유: Google Play 는 결제
 * 자체를 스토어가 하고 우리는 검증만 한다. 반대로 웹 PG 는 결제를 우리가
 * 시작시킨다. 둘을 같은 필수 메서드로 묶으면 한쪽이 빈 구현으로 남는다.
 */
export interface PaymentProvider {
  readonly id: PaymentProviderId;

  /** 스토어/PG 에 직접 물어봐서 진짜 결제인지 확인한다. 클라 말은 안 믿는다 */
  verifyPurchase(input: VerifyPurchaseInput): Promise<VerifiedPurchase>;

  /** 웹 PG 처럼 우리가 결제를 시작시켜야 하는 경우 */
  createPayment?(input: CreatePaymentInput): Promise<CreatePaymentResult>;

  /** 웹훅 서명 검증. 통과 못 하면 그 요청은 버린다 */
  verifyWebhook?(input: WebhookInput): Promise<WebhookVerification>;

  cancelPayment?(externalTransactionId: string): Promise<void>;
  refundPayment?(externalTransactionId: string): Promise<void>;
}

export interface VerifyPurchaseInput {
  /** Google: purchaseToken / 웹 PG: 결제 id */
  token: string;
  productId?: string;
  userId: string;
}

export interface CreatePaymentInput {
  userId: string;
  productId: string;
  country: string;
  returnUrl?: string;
}

export interface CreatePaymentResult {
  /** 유저를 보낼 결제 페이지 */
  redirectUrl: string;
  externalTransactionId: string;
}

export interface WebhookInput {
  headers: Record<string, string | string[] | undefined>;
  rawBody: Buffer | string;
  body: unknown;
}

export interface WebhookVerification {
  valid: boolean;
  /** 검증에 성공했을 때, 다시 조회해야 할 결제 토큰 */
  token?: string;
  eventType?: string;
}
