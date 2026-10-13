import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { RateLimitGuard } from '../common/rate-limit';
import { NotificationsModule } from '../notifications/notifications.module';
import { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import { PushModule } from '../push/push.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AdminGemPayoutController } from './admin-gem-payout.controller';
import {
  GemPayoutRequest,
  GemPayoutRequestSchema,
} from './gem-payout-request.schema';
import { GemPayoutController } from './gem-payout.controller';
import { GemPayoutService } from './gem-payout.service';

/** 보석 출금 (상점 "카드로 받기" + 어드민 "출금 요청") */
@Module({
  imports: [
    AdminModule,
    JwtModule.register({}),
    NotificationsModule,
    PushModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: GemPayoutRequest.name, schema: GemPayoutRequestSchema },
    ]),
  ],
  controllers: [GemPayoutController, AdminGemPayoutController],
  providers: [GemPayoutService, TelegramBotApi, RateLimitGuard],
})
export class GemPayoutsModule {}
