import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import {
  UserProgress,
  UserProgressSchema,
} from '../users/schemas/user-progress.schema';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
      { name: UserStats.name, schema: UserStatsSchema },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
