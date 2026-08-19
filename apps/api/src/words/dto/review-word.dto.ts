import { IsEnum } from 'class-validator';

export enum WordReviewResult {
  AGAIN = 'again',
  HARD = 'hard',
  GOOD = 'good',
  EASY = 'easy',
}

export class ReviewWordDto {
  @IsEnum(WordReviewResult)
  result: WordReviewResult;
}
