import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GooglePlayProvider } from './providers/google-play/google-play.provider';
import type { PaymentProvider } from './providers/payment-provider.interface';
import { SubscriptionService } from './subscriptions/subscription.service';
import type { PaymentProviderId } from './subscriptions/subscription.types';

/**
 * Provider 들을 모아두고 라우팅만 한다.
 * 여기에 PG 별 분기 로직을 넣지 않는다 — 그건 각 Provider 안에 있다.
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly providers = new Map<PaymentProviderId, PaymentProvider>();

  constructor(
    private readonly googlePlay: GooglePlayProvider,
    private readonly subscriptions: SubscriptionService,
  ) {
    this.register(googlePlay);
    // Phase 3~4 에서 여기 toss / uzum / click / payme 가 추가된다
  }

  private register(p: PaymentProvider) {
    this.providers.set(p.id, p);
  }

  private get(id: PaymentProviderId): PaymentProvider {
    const p = this.providers.get(id);
    if (!p) throw new BadRequestException('UNSUPPORTED_PROVIDER');
    return p;
  }

  /** 앱이 결제 직후 purchaseToken 을 보내오는 경로 */
  async verifyAndApply(
    providerId: PaymentProviderId,
    userId: string,
    token: string,
    productId?: string,
  ) {
    const verified = await this.get(providerId).verifyPurchase({
      token,
      productId,
      userId,
    });
    // 갱신·업그레이드로 토큰이 바뀐 경우 옛 구독을 눕힌다
    await this.subscriptions.supersede(userId, verified);
    return this.subscriptions.applyVerifiedPurchase(userId, verified);
  }

  /**
   * 복원. 스토어가 준 활성 구매 목록을 전부 다시 검증한다.
   * 하나가 실패해도 나머지는 계속 — 재설치 직후엔 죽은 토큰이 섞여 온다.
   */
  async restore(
    providerId: PaymentProviderId,
    userId: string,
    items: { purchaseToken: string; productId?: string }[],
  ) {
    let restored = 0;
    for (const item of items) {
      try {
        await this.verifyAndApply(
          providerId,
          userId,
          item.purchaseToken,
          item.productId,
        );
        restored++;
      } catch (e) {
        this.logger.warn(`복원 실패한 항목 하나 건너뜀: ${(e as Error).message}`);
      }
    }
    return {
      restored,
      subscription: await this.subscriptions.getMySubscription(userId),
    };
  }

  /**
   * 스토어 서버 알림. 본문의 상태 값은 믿지 않고 토큰만 꺼내 재조회한다.
   * (알림 본문은 위조될 수 있고, 지연되어 순서가 뒤집혀 올 수도 있다)
   */
  async handleWebhook(
    providerId: PaymentProviderId,
    input: { headers: Record<string, any>; rawBody: Buffer | string; body: unknown },
  ) {
    const provider = this.get(providerId);
    if (!provider.verifyWebhook) return { ok: true, ignored: true };

    const check = await provider.verifyWebhook(input);
    if (!check.valid || !check.token) return { ok: true, ignored: true };

    const verified = await provider.verifyPurchase({
      token: check.token,
      userId: '',
    });
    const applied = await this.subscriptions.applyFromWebhook(verified);
    return { ok: true, applied: !!applied };
  }
}
