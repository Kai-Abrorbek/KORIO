import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  WORD_LANGUAGES,
  type WordLanguage,
} from '../schemas/word.schema';

export class ListWordsQueryDto {
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
  @IsString()
  @MaxLength(160)
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 50;
}
