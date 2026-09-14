import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { EnergyModule } from '../energy/energy.module';
import { LessonsModule } from '../lessons/lessons.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

/**
 * ⚠️ league/ 안이 아니라 별도 모듈인 이유.
 *
 * 챌린지 XP 지급에는 LessonsService(recordStudy·addXp)가 필요한데,
 * LessonsModule 은 이미 LeagueModule 을 import 한다. LeagueModule 에서
 * LessonsModule 을 가져오면 순환이 된다. 여기는 아무도 import 하지 않는
 * 잎 모듈이라 양쪽을 자유롭게 쓸 수 있다.
 */
@Module({
  imports: [
    UsersModule,
    EnergyModule,
    LessonsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}
