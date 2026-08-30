import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import {
  RestoreGooglePurchasesDto,
  VerifyGooglePurchaseDto,
} from './dto/verify-purchase.dto';
import { PaymentsService } from './payments.service';
import { verifyPubSubRequest } from './providers/google-play/pubsub-auth';
import { SubscriptionService } from './subscriptions/subscription.service';

@Controller('payments')
@UseGuards(RateLimitGuard)
export class PaymentsController {
  constructor(
    private readonly payments: PaymentsService,
    private readonly subscriptions: SubscriptionService,
  ) {}

  /** 앱이 결제 직후 부른다. 성공 여부는 서버가 구글에 물어서 판단한다 */
  @UseGuards(JwtAuthGuard)
  @RateLimit({ windowMs: 60 * 1000, max: 10 })
  @Post('google-play/verify')
  verifyGoogle(@Req() req: any, @Body() dto: VerifyGooglePurchaseDto) {
    return this.payments.verifyAndApply(
      'google_play',
      req.user._id.toString(),
      dto.purchaseToken,
      dto.productId,
    );
  }

  /** 재설치·기기변경 복원 */
  @UseGuards(JwtAuthGuard)
  @RateLimit({ windowMs: 60 * 1000, max: 5 })
  @Post('google-play/restore')
  restoreGoogle(@Req() req: any, @Body() dto: RestoreGooglePurchasesDto) {
    return this.payments.restore(
      'google_play',
      req.user._id.toString(),
      dto.purchases ?? [],
    );
  }

  /**
   * Google Play 서버 알림 (RTDN → Pub/Sub push).
   *
   * 로그인 가드가 없다 — 구글이 부르는 자리다. 대신 두 겹으로 막는다.
   *  1) 정말 구글이 보낸 것인지 (OIDC 토큰 또는 공유 비밀)
   *  2) 본문의 상태는 안 믿는다. 토큰만 꺼내 구글에 다시 물어본다
   *
   * 그래서 알림이 지연되거나 순서가 뒤집혀 와도 항상 지금 상태가 반영된다.
   *
   * 항상 200 을 돌려준다: Pub/Sub 은 200 이 아니면 계속 재시도하는데,
   * 우리 쪽 일시적 오류로 같은 알림이 무한히 재전송되면 더 나쁘다.
   * 놓친 건 SubscriptionRefreshService 가 주기적으로 주워 담는다.
   */
  @Post('google-play/webhook')
  async googleWebhook(
    @Req() req: Request,
    @Headers() headers: Record<string, string>,
    @Query() query: Record<string, string>,
    @Body() body: unknown,
  ) {
    const auth = await verifyPubSubRequest(headers, query);
    if (!auth.ok) throw new ForbiddenException(auth.reason ?? 'FORBIDDEN');

    try {
      return await this.payments.handleWebhook('google_play', {
        headers,
        rawBody: (req as any).rawBody ?? '',
        body,
      });
    } catch {
      return { ok: true, deferred: true };
    }
  }

  /** 프리미엄 권한 조회 — 플랫폼 무관, KORIO 계정 기준 */
  @UseGuards(JwtAuthGuard)
  @Get('subscriptions/me')
  me(@Req() req: any) {
    return this.subscriptions.getMySubscription(req.user._id.toString());
  }
}
