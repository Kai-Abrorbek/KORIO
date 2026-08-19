import { IsEnum } from 'class-validator';

export enum ExpressionReviewResult {
  AGAIN = 'again',
  HARD = 'hard',
  GOOD = 'good',
  EASY = 'easy',
}

export class ReviewExpressionDto {
  @IsEnum(ExpressionReviewResult)
  result: ExpressionReviewResult;
}
