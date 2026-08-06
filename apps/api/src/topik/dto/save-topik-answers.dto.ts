import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class SaveTopikAnswerItemDto {
  @IsMongoId()
  questionId: string;

  @IsString()
  @Matches(/^[1-4]$/)
  selectedChoiceKey: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationMs: number = 0;

  @IsOptional()
  @IsDateString()
  answeredAt?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  usedHintKeys?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  hintViewCount?: number;

  @IsOptional()
  @IsDateString()
  solutionViewedAt?: string;
}

export class SaveTopikAnswersDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => SaveTopikAnswerItemDto)
  answers: SaveTopikAnswerItemDto[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  currentQuestionNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  elapsedSeconds?: number;
}
