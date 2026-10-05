import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';
import { UsersModule } from '../users/users.module';
import { PaymentsModule } from '../payments/payments.module';
import { RetentionController } from './retention.controller';
import { RetentionService } from './retention.service';

/**
 * 리텐션 장치 — 복구펜 · 일일 퀘스트 · 복귀 보상 · 첫 7일 출석 · 연속 목표.
 * 에너지 벌기는 EnergyService(earnFromPractice), XP 부스트는 lessons grantXp 에 있다.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserStats.name, schema: UserStatsSchema },
    ]),
    UsersModule,
    PaymentsModule,
  ],
  controllers: [RetentionController],
  providers: [RetentionService],
})
export class RetentionModule {}
