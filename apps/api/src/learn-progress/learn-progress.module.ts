import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { StudyPathModule } from '../study-path/study-path.module';
import { ExpressionsModule } from '../expressions/expressions.module';
import { TopikModule } from '../topik/topik.module';
import { Grammar, GrammarSchema } from '../grammer/schemas/grammar.schema';
import {
  ReadingLesson,
  ReadingLessonSchema,
} from '../reading-lessons/schemas/reading-lesson.schema';
import {
  ReadingLessonProgress,
  ReadingLessonProgressSchema,
} from '../reading-lessons/schemas/reading-lesson-progress.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LearnProgressController } from './learn-progress.controller';
import { LearnProgressService } from './learn-progress.service';

/**
 * 홈 카드 진행도. 여러 학습 모듈을 읽기만 하는 잎 모듈이다 —
 * 아무도 이 모듈을 import 하지 않아서 순환이 생기지 않는다.
 * (표현·말하기·TOPIK 모델은 각 모듈이 MongooseModule 을 export 해서 받는다)
 */
@Module({
  imports: [
    LessonsModule,
    StudyPathModule,
    ExpressionsModule,
    TopikModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Grammar.name, schema: GrammarSchema },
      { name: ReadingLesson.name, schema: ReadingLessonSchema },
      { name: ReadingLessonProgress.name, schema: ReadingLessonProgressSchema },
    ]),
  ],
  controllers: [LearnProgressController],
  providers: [LearnProgressService],
})
export class LearnProgressModule {}
