import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { GooglePlayProvider } from './providers/google-play/google-play.provider';
import {
  Subscription,
  SubscriptionSchema,
} from './subscriptions/subscription.schema';
import { SubscriptionService } from './subscriptions/subscription.service';
import { SubscriptionRefreshService } from './subscriptions/subscription-refresh.service';
import { RateLimitGuard } from '../common/rate-limit';
import { AnalyticsModule } from '../analytics/analytics.module';
import { GemPassController } from './gems/gem-pass.controller';
import { GemPassService } from './gems/gem-pass.service';
import { TelegramBotApi } from './providers/telegram-stars/telegram-bot.api';
import { TelegramStarsController } from './providers/telegram-stars/telegram-stars.controller';
import { TelegramStarsService } from './providers/telegram-stars/telegram-stars.service';
import { CardPaymentController } from './card/card-payment.controller';
import { CardPaymentService } from './card/card-payment.service';
import { CardReceiptOcrService } from './card/card-receipt-ocr.service';
import {
  CardPaymentOrder,
  CardPaymentOrderSchema,
} from './card/card-payment-order.schema';

/**
 * 결제는 독립 모듈이다. 기존 subscription 모듈(체험·플랜 목록)은 그대로 두고,
 * 실제 결제·권한 판정만 이쪽으로 옮긴다.
 *
 * SubscriptionService 를 export 하는 이유: 나중에 AI 튜터 같은 프리미엄
 * 기능이 권한을 물어볼 창구가 필요하다.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: User.name, schema: UserSchema },
      { name: CardPaymentOrder.name, schema: CardPaymentOrderSchema },
    ]),
    // 구독 상태 전이 기록 (분석 전용)
    AnalyticsModule,
  ],
  controllers: [
    PaymentsController,
    GemPassController,
    TelegramStarsController,
    CardPaymentController,
  ],
  providers: [
    PaymentsService,
    SubscriptionService,
    SubscriptionRefreshService,
    GooglePlayProvider,
    GemPassService,
    // 텔레그램 미니앱 Stars 결제 + 봇 웹훅
    TelegramBotApi,
    TelegramStarsService,
    // Humo·Uzcard 카드 입금 (운영자 승인) — card/card-payment.const 참고
    CardPaymentService,
    CardReceiptOcrService,
    RateLimitGuard,
  ],
  exports: [SubscriptionService, GemPassService],
})
export class PaymentsModule {}
