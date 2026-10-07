import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RankService } from './rank/rank.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {
  UserProgress,
  UserProgressSchema,
} from './schemas/user-progress.schema';
import { UserStats, UserStatsSchema } from './schemas/user-stats.schema';
import { LessonNode, LessonNodeSchema } from '../lessons/schemas/node.schema';
import {
  Subscription,
  SubscriptionSchema,
} from '../payments/subscriptions/subscription.schema';

import { NotificationsModule } from '../notifications/notifications.module';
import { PushModule } from '../push/push.module';

@Module({
  imports: [
    NotificationsModule,
    PushModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: UserStats.name, schema: UserStatsSchema },
      { name: LessonNode.name, schema: LessonNodeSchema },
      // getMe 가 끝난 구간 뒤에 이어지는 구독을 다시 투영할 때 읽는다 (쓰지 않는다)
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [UsersService, RankService],
  controllers: [UsersController],
  exports: [UsersService, RankService],
})
export class UsersModule {}
