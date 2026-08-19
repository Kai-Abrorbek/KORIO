import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsMongoId,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class CompleteExpressionPracticeDto {
  @IsArray()
  @ArrayMaxSize(100)
  @IsMongoId({ each: true })
  questionIds: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsMongoId({ each: true })
  wrongQuestionIds?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10800)
  speedSeconds?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  combo?: number;
}
