import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  UserStats,
  UserStatsSchema,
} from '../users/schemas/user-stats.schema';
import { DeviceToken, DeviceTokenSchema } from './schemas/device-token.schema';
import { PushLog, PushLogSchema } from './schemas/push-log.schema';
import { PushService } from './push.service';
import { PushSchedulerService } from './push-scheduler.service';
import { PushController } from './push.controller';

/**
 * 푸시.
 *
 * ⚠️ UsersModule 을 import 하지 않는다 — UsersModule 이 팔로우 푸시를 쓰려고
 * 이 모듈을 import 하기 때문에 서로 물면 순환이 된다. 필요한 모델만 직접
 * forFeature 로 가져온다.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceToken.name, schema: DeviceTokenSchema },
      { name: PushLog.name, schema: PushLogSchema },
      { name: User.name, schema: UserSchema },
      { name: UserStats.name, schema: UserStatsSchema },
    ]),
  ],
  controllers: [PushController],
  providers: [PushService, PushSchedulerService],
  exports: [PushService],
})
export class PushModule {}
