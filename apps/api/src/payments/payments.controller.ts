import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
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
   * Google Play 서버 알림 (Pub/Sub push).
   *
   * 로그인 가드가 없다 — 구글이 부르는 자리다. 대신 본문의 상태를 믿지 않고
   * 토큰만 꺼내 구글에 다시 물어본다. 위조 본문으로는 아무것도 못 바꾼다.
   * (Pub/Sub push 엔드포인트에는 반드시 추측 불가능한 URL 을 쓸 것)
   */
  @Post('google-play/webhook')
  async googleWebhook(
    @Req() req: Request,
    @Headers() headers: Record<string, string>,
    @Body() body: unknown,
  ) {
    return this.payments.handleWebhook('google_play', {
      headers,
      rawBody: (req as any).rawBody ?? '',
      body,
    });
  }

  /** 프리미엄 권한 조회 — 플랫폼 무관, KORIO 계정 기준 */
  @UseGuards(JwtAuthGuard)
  @Get('subscriptions/me')
  me(@Req() req: any) {
    return this.subscriptions.getMySubscription(req.user._id.toString());
  }
}
