import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { WordsModule } from '../words/words.module';
import { Grammar, GrammarSchema } from '../grammer/schemas/grammar.schema';
import { LessonNode, LessonNodeSchema } from '../lessons/schemas/node.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { StudyPathController } from './study-path.controller';
import { StudyPathService } from './study-path.service';

/**
 * GrammarModule 을 통째로 끌어오지 않고 Grammar 모델만 주입한다.
 * GrammarService.listGrammar 는 유닛 하나씩만 볼 수 있어서 하루치마다
 * 쿼리가 나가는데, 여기서는 현재 섹션 전체를 한 번에 읽어야 한다.
 */
@Module({
  imports: [
    LessonsModule,
    WordsModule,
    MongooseModule.forFeature([
      { name: Grammar.name, schema: GrammarSchema },
      { name: LessonNode.name, schema: LessonNodeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StudyPathController],
  providers: [StudyPathService],
  exports: [StudyPathService],
})
export class StudyPathModule {}
