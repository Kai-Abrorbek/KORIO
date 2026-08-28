import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { PRACTICE_BASE_XP } from '../economy.const';

export class CompletePracticeDto {
  /** 'review' | 'nodeReview' | 'wordPractice' ... — XP 표에 있는 모드만 */
  @IsString()
  @IsIn(Object.keys(PRACTICE_BASE_XP))
  mode: string;

  /** 이번에 실제로 푼 문제들 (카테고리 집계의 근거) */
  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  questionIds: string[];

  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  @IsOptional()
  wrongQuestionIds?: string[];

  @IsInt()
  @Min(0)
  @Max(86400)
  @IsOptional()
  speedSeconds?: number;

  @IsInt()
  @Min(0)
  @Max(1000)
  @IsOptional()
  combo?: number;
}
