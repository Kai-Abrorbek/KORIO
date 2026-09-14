import { Module } from '@nestjs/common';
import { EnergyModule } from '../energy/energy.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { ChestService } from './chest.service';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { LessonNode, LessonNodeSchema } from './schemas/node.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import {
  UserProgress,
  UserProgressSchema,
} from '../users/schemas/user-progress.schema';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';
import {
  UserMistake,
  UserMistakeSchema,
} from '../users/schemas/user-mistake.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LeagueModule } from '../league/league.module';
import { UsersModule } from '../users/users.module';

import { NotificationsModule } from '../notifications/notifications.module';
import { AnswerGradingService } from './answer-grading.service';
import {
  JumpAttempt,
  JumpAttemptSchema,
} from './schemas/jump-attempt.schema';
import {
  PendingChest,
  PendingChestSchema,
} from './schemas/pending-chest.schema';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: LessonNode.name, schema: LessonNodeSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: UserStats.name, schema: UserStatsSchema },
      { name: UserMistake.name, schema: UserMistakeSchema },
      { name: User.name, schema: UserSchema },
      { name: JumpAttempt.name, schema: JumpAttemptSchema },
      { name: PendingChest.name, schema: PendingChestSchema },
    ]),
    LeagueModule,
    UsersModule,
    // 레슨 완료 시 에너지 차감 (앱이 자진 신고하던 걸 서버로 옮겼다).
    // EnergyModule 은 아무것도 import 하지 않으므로 순환이 생기지 않는다.
    EnergyModule,
    // 학습 계측. 레슨 시작·문제별 답안을 기록한다 (분석 전용, 학습 로직 아님).
    // AnalyticsModule 은 아무것도 import 하지 않아 순환이 없다.
    AnalyticsModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService, AnswerGradingService, ChestService],
  exports: [LessonsService, ChestService],
})
export class LessonsModule {}
