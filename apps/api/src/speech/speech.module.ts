import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpeechController } from './speech.controller';
import { SpeechService } from './speech.service';
import {
  Expression,
  ExpressionSchema,
} from '../expressions/schemas/expression.schema';
import { Question, QuestionSchema } from '../lessons/schemas/question.schema';
import { Lesson, LessonSchema } from '../lessons/schemas/lesson.schema';
import {
  ReadingLesson,
  ReadingLessonSchema,
} from '../reading-lessons/schemas/reading-lesson.schema';
import { ReadingLessonsModule } from '../reading-lessons/reading-lessons.module';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import {
  UserExpressionProgress,
  UserExpressionProgressSchema,
} from '../expressions/schemas/user-expression-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: ReadingLesson.name, schema: ReadingLessonSchema },
      { name: Expression.name, schema: ExpressionSchema },
      {
        name: UserExpressionProgress.name,
        schema: UserExpressionProgressSchema,
      },
    ]),
    // 낭독 진도를 여기서 직접 찍는다 — 클라가 "다 읽었다" 고 주장하는
    // 경로를 만들지 않으려는 것이다
    ReadingLessonsModule,
    // 말하기 한 문장을 통계·XP·리그에 반영하려면 이 둘이 필요하다.
    // recordStudy/addXp 는 LessonsService, 연속 학습일은 UsersService.
    // (LessonsModule 은 SpeechModule 을 import 하지 않아 순환은 없다)
    LessonsModule,
    UsersModule,
  ],
  controllers: [SpeechController],
  providers: [SpeechService],
})
export class SpeechModule {}
