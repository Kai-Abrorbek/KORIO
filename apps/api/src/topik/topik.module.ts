import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStats, UserStatsSchema } from '../users/schemas/user-stats.schema';
import {
  TopikAttempt,
  TopikAttemptSchema,
} from './schemas/topik-attempt.schema';
import { TopikExam, TopikExamSchema } from './schemas/topik-exam.schema';
import {
  TopikQuestionGroup,
  TopikQuestionGroupSchema,
} from './schemas/topik-question-group.schema';
import {
  TopikQuestion,
  TopikQuestionSchema,
} from './schemas/topik-question.schema';
import {
  TopikUserQuestionPerformance,
  TopikUserQuestionPerformanceSchema,
} from './schemas/topik-user-question-performance.schema';
import {
  TopikUserSummary,
  TopikUserSummarySchema,
} from './schemas/topik-user-summary.schema';
import { TopikController } from './topik.controller';
import { TopikService } from './topik.service';
import { TopikStatsService } from './topik-stats.service';
import { TopikRecipeService } from './topik-recipe.service';
import { TopikRecipe, TopikRecipeSchema } from './schemas/topik-recipe.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LessonsModule } from '../lessons/lessons.module';
import { RateLimitGuard } from '../common/rate-limit';
import { ReadingGlossService } from '../reading-lessons/reading-gloss.service';
import {
  ReadingGlossCache,
  ReadingGlossCacheSchema,
} from '../reading-lessons/schemas/reading-gloss-cache.schema';
import { TopikGlossService } from './topik-gloss.service';

@Module({
  imports: [
    // 제출 = 학습 모드 완료 → 연속 학습 도장·상자 (LessonsModule 은 TopikModule 을 안 물어 순환 없음)
    LessonsModule,
    MongooseModule.forFeature([
      { name: TopikExam.name, schema: TopikExamSchema },
      { name: TopikQuestionGroup.name, schema: TopikQuestionGroupSchema },
      { name: TopikQuestion.name, schema: TopikQuestionSchema },
      { name: TopikAttempt.name, schema: TopikAttemptSchema },
      { name: TopikUserSummary.name, schema: TopikUserSummarySchema },
      {
        name: TopikUserQuestionPerformance.name,
        schema: TopikUserQuestionPerformanceSchema,
      },
      { name: TopikRecipe.name, schema: TopikRecipeSchema },
      { name: UserStats.name, schema: UserStatsSchema },
      { name: User.name, schema: UserSchema },
      // 단어 뜻보기 캐시 — 읽기·듣기 학습과 같은 저장소를 쓴다 (topik:<묶음 id>)
      { name: ReadingGlossCache.name, schema: ReadingGlossCacheSchema },
    ]),
  ],
  controllers: [TopikController],
  providers: [
    TopikService,
    TopikStatsService,
    TopikRecipeService,
    TopikGlossService,
    ReadingGlossService,
    RateLimitGuard,
  ],
  exports: [MongooseModule, TopikService, TopikStatsService],
})
export class TopikModule {}
