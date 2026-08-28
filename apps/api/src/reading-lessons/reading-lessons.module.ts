import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingLessonsController } from './reading-lessons.controller';
import { ReadingLessonsService } from './reading-lessons.service';
import {
  ReadingLesson,
  ReadingLessonSchema,
} from './schemas/reading-lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReadingLesson.name, schema: ReadingLessonSchema },
    ]),
  ],
  controllers: [ReadingLessonsController],
  providers: [ReadingLessonsService],
  exports: [ReadingLessonsService],
})
export class ReadingLessonsModule {}
