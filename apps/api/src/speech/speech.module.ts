import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';
import { Question, QuestionSchema } from '../lessons/schemas/question.schema';
import { Lesson, LessonSchema } from '../lessons/schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
