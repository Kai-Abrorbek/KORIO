import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
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
    ]),
    LeagueModule,
    UsersModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService, AnswerGradingService],
  exports: [LessonsService],
})
export class LessonsModule {}
