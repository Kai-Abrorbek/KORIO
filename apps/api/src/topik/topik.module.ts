import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserStats,
  UserStatsSchema,
} from '../users/schemas/user-stats.schema';
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

@Module({
  imports: [
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
    ]),
  ],
  controllers: [TopikController],
  providers: [TopikService, TopikStatsService, TopikRecipeService],
  exports: [MongooseModule, TopikService, TopikStatsService],
})
export class TopikModule {}
