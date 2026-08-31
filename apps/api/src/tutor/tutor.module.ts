import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  UserMistake,
  UserMistakeSchema,
} from '../users/schemas/user-mistake.schema';
import { UsersModule } from '../users/users.module';
import { RateLimitGuard } from '../common/rate-limit';
import {
  TutorSession,
  TutorSessionSchema,
} from './schemas/tutor-session.schema';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TutorUsageService } from './tutor-usage.service';
import { TutorAnalysisService } from './tutor-analysis.service';

/**
 * AI 튜터. 기존 ai 모듈(보리쌤 텍스트 채팅)과 별개다 —
 * 그쪽은 Anthropic 텍스트, 이쪽은 OpenAI Realtime 음성이라 공유할 게 없다.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TutorSession.name, schema: TutorSessionSchema },
      { name: User.name, schema: UserSchema },
      { name: UserMistake.name, schema: UserMistakeSchema },
    ]),
    UsersModule,
  ],
  controllers: [TutorController],
  providers: [
    TutorService,
    TutorUsageService,
    TutorAnalysisService,
    RateLimitGuard,
  ],
  exports: [TutorUsageService],
})
export class TutorModule {}
