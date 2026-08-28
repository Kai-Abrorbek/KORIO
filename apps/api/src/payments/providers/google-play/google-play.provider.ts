import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import type {
  PaymentProvider,
  VerifyPurchaseInput,
  WebhookInput,
  WebhookVerification,
} from '../payment-provider.interface';
import {
  GOOGLE_PRODUCT_TO_PLAN,
  type SubscriptionCountry,
  type SubscriptionStatus,
  type VerifiedPurchase,
} from '../../subscriptions/subscription.types';

const ANDROID_PUBLISHER = 'https://androidpublisher.googleapis.com';
const SCOPE = 'https://www.googleapis.com/auth/androidpublisher';

/** subscriptionsv2 응답 중 우리가 쓰는 부분만 */
interface SubscriptionPurchaseV2 {
  subscriptionState?: string;
  startTime?: string;
  regionCode?: string;
  latestOrderId?: string;
  linkedPurchaseToken?: string;
  acknowledgementState?: string;
  testPurchase?: object;
  lineItems?: {
    productId?: string;
    expiryTime?: string;
    autoRenewingPlan?: { autoRenewEnabled?: boolean };
  }[];
}

/**
 * 구글이 알려주는 구독 상태를 우리 상태로 옮긴다.
 *
 * PAUSED 를 expired 가 아니라 on_hold 로 두는 이유: 유저가 스스로 일시정지한
 * 것이라 돌아올 사람이다. 권한은 끊되(프리미엄 정지) 구독 자체는 살려둔다.
 */
const STATE_MAP: Record<string, SubscriptionStatus> = {
  SUBSCRIPTION_STATE_ACTIVE: 'active',
  SUBSCRIPTION_STATE_CANCELED: 'cancelled', // 해지 예약. 만료 전까진 쓴다
  SUBSCRIPTION_STATE_IN_GRACE_PERIOD: 'grace_period',
  SUBSCRIPTION_STATE_ON_HOLD: 'on_hold',
  SUBSCRIPTION_STATE_PAUSED: 'on_hold',
  SUBSCRIPTION_STATE_EXPIRED: 'expired',
  SUBSCRIPTION_STATE_PENDING: 'on_hold', // 결제 대기(예: 계좌이체). 아직 권한 없음
};

@Injectable()
export class GooglePlayProvider implements PaymentProvider {
  readonly id = 'google_play' as const;
  private readonly logger = new Logger(GooglePlayProvider.name);
  private auth?: GoogleAuth;

  private get packageName(): string {
    const pkg = process.env.GOOGLE_PLAY_PACKAGE_NAME?.trim();
    if (!pkg) {
      throw new BadRequestException('GOOGLE_PLAY_NOT_CONFIGURED');
    }
    return pkg;
  }

  /**
   * 서비스 계정 키는 서버에만 있다. 앱에는 절대 넣지 않는다.
   * 두 가지 방식을 받는다:
   *  - GOOGLE_SERVICE_ACCOUNT_JSON: JSON 통째 (호스팅 환경변수에 넣기 좋다)
   *  - GOOGLE_APPLICATION_CREDENTIALS: 키 파일 경로 (구글 SDK 표준)
   */
  private getAuth(): GoogleAuth {
    if (this.auth) return this.auth;

    const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
    if (inline) {
      let credentials: Record<string, unknown>;
      try {
        credentials = JSON.parse(inline);
      } catch {
        throw new BadRequestException('GOOGLE_SERVICE_ACCOUNT_JSON_INVALID');
      }
      this.auth = new GoogleAuth({ credentials, scopes: [SCOPE] });
      return this.auth;
    }

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new BadRequestException('GOOGLE_PLAY_NOT_CONFIGURED');
    }
    this.auth = new GoogleAuth({ scopes: [SCOPE] });
    return this.auth;
  }

  private async call<T>(path: string, init?: RequestInit): Promise<T> {
    const client = await this.getAuth().getClient();
    const headers = await client.getRequestHeaders();
    const res = await fetch(`${ANDROID_PUBLISHER}${path}`, {
      ...init,
      headers: { ...Object.fromEntries(new Headers(headers)), ...(init?.headers ?? {}) },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      // 응답 본문을 그대로 던지면 서비스 계정 정보가 로그·클라로 샐 수 있다
      this.logger.warn(`Play API ${res.status} ${path} — ${text.slice(0, 300)}`);
      if (res.status === 404 || res.status === 400) {
        throw new BadRequestException('PURCHASE_NOT_FOUND');
      }
      throw new BadRequestException('PURCHASE_VERIFICATION_FAILED');
    }
    // acknowledge 는 본문이 비어있다
    const body = await res.text();
    return (body ? JSON.parse(body) : {}) as T;
  }

  /**
   * purchaseToken 을 구글에 직접 물어본다.
   * 앱이 "결제 성공했어요" 라고 말하는 건 아무 근거가 아니다.
   */
  async verifyPurchase(input: VerifyPurchaseInput): Promise<VerifiedPurchase> {
    const token = (input.token ?? '').trim();
    if (!token) throw new BadRequestException('MISSING_PURCHASE_TOKEN');

    const purchase = await this.call<SubscriptionPurchaseV2>(
      `/androidpublisher/v3/applications/${encodeURIComponent(
        this.packageName,
      )}/purchases/subscriptionsv2/tokens/${encodeURIComponent(token)}`,
    );

    const line = purchase.lineItems?.[0];
    const productId = line?.productId;
    if (!productId) throw new BadRequestException('PURCHASE_NOT_FOUND');

    // 우리가 파는 상품인지. Play Console 의 다른 상품이나 남의 앱 토큰을 막는다
    const plan = GOOGLE_PRODUCT_TO_PLAN[productId];
    if (!plan) {
      this.logger.warn(`알 수 없는 상품 id: ${productId}`);
      throw new BadRequestException('UNKNOWN_PRODUCT');
    }

    const status =
      STATE_MAP[purchase.subscriptionState ?? ''] ?? ('expired' as const);

    // 만료 시각은 구글 값을 그대로 쓴다. 클라가 보낸 값은 쓰지 않는다.
    const expiresAt = line.expiryTime ? new Date(line.expiryTime) : null;
    if (!expiresAt || Number.isNaN(expiresAt.getTime())) {
      throw new BadRequestException('PURCHASE_VERIFICATION_FAILED');
    }

    // 3일 안에 승인(acknowledge)하지 않으면 구글이 자동 환불한다.
    if (purchase.acknowledgementState === 'ACKNOWLEDGEMENT_STATE_PENDING') {
      await this.acknowledge(productId, token);
    }

    return {
      provider: this.id,
      platform: 'android',
      productId,
      plan,
      status,
      startedAt: purchase.startTime ? new Date(purchase.startTime) : new Date(),
      expiresAt,
      autoRenew: line.autoRenewingPlan?.autoRenewEnabled ?? false,
      externalTransactionId: token,
      // 갱신되면 토큰이 바뀌는데 linkedPurchaseToken 이 이전 토큰을 가리킨다.
      // 이걸로 같은 구독의 연속임을 추적한다.
      externalSubscriptionId: purchase.linkedPurchaseToken ?? token,
      country: toCountry(purchase.regionCode),
      raw: purchase,
    };
  }

  /** 승인. 실패해도 검증 자체를 무르지는 않는다(로그만) — 웹훅에서 다시 온다 */
  private async acknowledge(productId: string, token: string) {
    try {
      await this.call(
        `/androidpublisher/v3/applications/${encodeURIComponent(
          this.packageName,
        )}/purchases/subscriptions/${encodeURIComponent(
          productId,
        )}/tokens/${encodeURIComponent(token)}:acknowledge`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' },
      );
    } catch (e) {
      this.logger.error(
        `구매 승인 실패 (${productId}). 3일 내 승인 안 되면 자동 환불된다`,
        e as Error,
      );
    }
  }

  /**
   * Google Play 서버 알림(Pub/Sub push).
   * 본문에 상태가 들어있지만 그 값을 믿지 않는다 — 토큰만 꺼내서 다시 조회한다.
   */
  async verifyWebhook(input: WebhookInput): Promise<WebhookVerification> {
    const body = input.body as {
      message?: { data?: string };
      subscription?: string;
    };
    const data = body?.message?.data;
    if (!data) return { valid: false };

    let payload: {
      subscriptionNotification?: { purchaseToken?: string; notificationType?: number };
      packageName?: string;
    };
    try {
      payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
    } catch {
      return { valid: false };
    }

    // 남의 앱 알림이 흘러들어오면 버린다
    if (payload.packageName && payload.packageName !== this.packageName) {
      return { valid: false };
    }

    const token = payload.subscriptionNotification?.purchaseToken;
    if (!token) return { valid: false }; // 구독 외 알림(테스트·보이스드아웃)은 무시

    return {
      valid: true,
      token,
      eventType: String(payload.subscriptionNotification?.notificationType ?? ''),
    };
  }
}

function toCountry(regionCode?: string): SubscriptionCountry {
  if (regionCode === 'KR') return 'KR';
  if (regionCode === 'UZ') return 'UZ';
  return 'OTHER';
}
