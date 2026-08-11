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
  @IsOptional()
  @Matches(/^[1-4]$/)
  selectedChoiceKey?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => SaveTopikWrittenResponseDto)
  writtenResponses?: SaveTopikWrittenResponseDto[];

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

export class SaveTopikWrittenResponseDto {
  @IsString()
  @MaxLength(64)
  fieldKey: string;

  @IsString()
  @MaxLength(5000)
  text: string;
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
  @Max(54)
  currentQuestionNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  elapsedSeconds?: number;
}
