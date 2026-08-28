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
import { RateLimitGuard } from '../common/rate-limit';

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
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    SubscriptionService,
    GooglePlayProvider,
    RateLimitGuard,
  ],
  exports: [SubscriptionService],
})
export class PaymentsModule {}
