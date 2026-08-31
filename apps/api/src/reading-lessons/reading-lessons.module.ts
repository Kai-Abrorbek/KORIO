import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ReadingLessonsController } from './reading-lessons.controller';
import { ReadingLessonsService } from './reading-lessons.service';
import {
  ReadingLessonProgress,
  ReadingLessonProgressSchema,
} from './schemas/reading-lesson-progress.schema';
import {
  ReadingLesson,
  ReadingLessonSchema,
} from './schemas/reading-lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadingLesson.name, schema: ReadingLessonSchema },
      { name: ReadingLessonProgress.name, schema: ReadingLessonProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
    LessonsModule,
    UsersModule,
  ],
  controllers: [ReadingLessonsController],
  providers: [ReadingLessonsService],
  exports: [ReadingLessonsService],
})
export class ReadingLessonsModule {}
