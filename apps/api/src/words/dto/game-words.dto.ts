import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GamePoolQueryDto {
  /** 몇 개 필요한지. 게임마다 다르다 (짝맞추기 8쌍, 단어비 40개 …) */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(4)
  @Max(120)
  count?: number;

  /** 카드에 들어갈 최대 글자 수. 서버가 다시 한 번 조인다 */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  @Max(8)
  maxLen?: number;
}

export class ChainTurnDto {
  @IsString()
  @MaxLength(20)
  word: string;

  /** 직전 단어. 없으면 첫 수 */
  @IsOptional()
  @IsString()
  @MaxLength(20)
  prev?: string;

  /**
   * 이미 나온 단어들.
   * ⚠️ 앱이 보내는 값이라 상한을 서버에서 건다 — 안 걸면 긴 배열로
   *    $nin 쿼리를 부풀릴 수 있다.
   */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  used?: string[];
}
