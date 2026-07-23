import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CompletePracticeDto {
  /** 'review' | 'nodeReview' | 'wordPractice' */
  @IsString()
  mode: string;

  /** 이번에 실제로 푼 문제들 (카테고리 집계의 근거) */
  @IsArray()
  questionIds: string[];

  @IsArray()
  @IsOptional()
  wrongQuestionIds?: string[];

  @IsNumber()
  @IsOptional()
  speedSeconds?: number;

  @IsNumber()
  @IsOptional()
  combo?: number;
}
