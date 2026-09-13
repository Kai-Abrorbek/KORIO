import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { ExpressionsController } from './expressions.controller';
import { ExpressionsService } from './expressions.service';
import { ExpressionLearningService } from './learning/expression-learning.service';
import { ExpressionRoadmapService } from './roadmap/expression-roadmap.service';
import { SpeakingProgressService } from './speaking/speaking-progress.service';
import {
  ExpressionNode,
  ExpressionNodeSchema,
} from './schemas/expression-node.schema';
import {
  ExpressionPack,
  ExpressionPackSchema,
} from './schemas/expression-pack.schema';
import { Expression, ExpressionSchema } from './schemas/expression.schema';
import {
  UserExpressionProgress,
  UserExpressionProgressSchema,
} from './schemas/user-expression-progress.schema';
import {
  UserSpeakingProgress,
  UserSpeakingProgressSchema,
} from './schemas/user-speaking-progress.schema';

@Module({
  imports: [
    LessonsModule,
    MongooseModule.forFeature([
      { name: ExpressionPack.name, schema: ExpressionPackSchema },
      { name: ExpressionNode.name, schema: ExpressionNodeSchema },
      { name: Expression.name, schema: ExpressionSchema },
      {
        name: UserExpressionProgress.name,
        schema: UserExpressionProgressSchema,
      },
      {
        name: UserSpeakingProgress.name,
        schema: UserSpeakingProgressSchema,
      },
    ]),
  ],
  controllers: [ExpressionsController],
  providers: [
    ExpressionsService,
    ExpressionRoadmapService,
    ExpressionLearningService,
    SpeakingProgressService,
  ],
  exports: [
    MongooseModule,
    ExpressionsService,
    ExpressionRoadmapService,
    ExpressionLearningService,
    SpeakingProgressService,
  ],
})
export class ExpressionsModule {}
