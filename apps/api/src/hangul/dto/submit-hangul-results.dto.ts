import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HANGUL_CHARACTER_IDS } from '../hangul.constants';

export class HangulResultItemDto {
  @IsString()
  @IsIn(HANGUL_CHARACTER_IDS)
  characterId: string;

  @IsBoolean()
  correct: boolean;
}

export class SubmitHangulResultsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => HangulResultItemDto)
  results: HangulResultItemDto[];

  /** 어느 게임에서 온 결과인지 (로깅/후속 분석용, 없어도 됨) */
  @IsOptional()
  @IsString()
  source?: string;
}
