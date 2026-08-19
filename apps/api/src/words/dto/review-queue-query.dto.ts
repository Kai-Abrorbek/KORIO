import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  WORD_LANGUAGES,
  type WordLanguage,
} from '../schemas/word.schema';

export class ReviewQueueQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  section?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  unit?: number;

  @IsOptional()
  @IsIn([...WORD_LANGUAGES])
  lang: WordLanguage = 'uz';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;
}
