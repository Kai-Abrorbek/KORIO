import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { NotificationsModule } from '../notifications/notifications.module';
import { PushModule } from '../push/push.module';
import { PaymentsModule } from '../payments/payments.module';
import { Referral, ReferralSchema } from './schemas/referral.schema';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';

@Module({
  imports: [
    NotificationsModule,
    PushModule,
    // 초대 마일스톤 SUPER 이용권 (GemPassService.grantRewardDays)
    PaymentsModule,
    MongooseModule.forFeature([
      { name: Referral.name, schema: ReferralSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})
export class ReferralModule {}
