import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';
import { Question, QuestionSchema } from '../lessons/schemas/question.schema';
import { Lesson, LessonSchema } from '../lessons/schemas/lesson.schema';
import {
  ReadingLesson,
  ReadingLessonSchema,
} from '../reading-lessons/schemas/reading-lesson.schema';
import { ReadingLessonsModule } from '../reading-lessons/reading-lessons.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: ReadingLesson.name, schema: ReadingLessonSchema },
    ]),
    // 낭독 진도를 여기서 직접 찍는다 — 클라가 "다 읽었다" 고 주장하는
    // 경로를 만들지 않으려는 것이다
    ReadingLessonsModule,
  ],
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
