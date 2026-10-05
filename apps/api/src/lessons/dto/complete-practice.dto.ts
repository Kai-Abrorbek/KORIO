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

  /**
   * 에너지로 칠 정답 수 — **본풀이**에서 맞힌 것만.
   * 틀린 문제 다시 풀기(복습 라운드)는 에너지를 안 쓴다. 없으면 correctAnswers.
   */
  @IsInt()
  @Min(0)
  @Max(1000)
  @IsOptional()
  energySpent?: number;

  /**
   * 이 판의 에너지 세션 id (앱이 레슨을 열 때 만든다). 레슨 도중 /energy/spend 로
   * 이미 깎은 만큼은 완료 때 다시 깎지 않는다.
   */
  @IsString()
  @MaxLength(64)
  @IsOptional()
  energySession?: string;
}
