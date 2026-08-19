import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { ExpressionsController } from './expressions.controller';
import { ExpressionsService } from './expressions.service';
import {
  ExpressionPack,
  ExpressionPackSchema,
} from './schemas/expression-pack.schema';
import { Expression, ExpressionSchema } from './schemas/expression.schema';
import {
  UserExpressionProgress,
  UserExpressionProgressSchema,
} from './schemas/user-expression-progress.schema';

@Module({
  imports: [
    LessonsModule,
    MongooseModule.forFeature([
      { name: ExpressionPack.name, schema: ExpressionPackSchema },
      { name: Expression.name, schema: ExpressionSchema },
      {
        name: UserExpressionProgress.name,
        schema: UserExpressionProgressSchema,
      },
    ]),
  ],
  controllers: [ExpressionsController],
  providers: [ExpressionsService],
  exports: [MongooseModule, ExpressionsService],
})
export class ExpressionsModule {}
