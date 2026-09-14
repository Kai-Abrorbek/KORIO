import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { MAX_ANSWERS_PER_REPORT, MAX_QUESTION_DURATION_MS, MAX_QUESTION_INDEX } from '../analytics.const';

/**
 * 앱이 보고하는 답안 하나.
 *
 * ⚠️ 전부 **앱이 신고하는 값**이다. 서버가 검증할 방법이 없다 — 채점이 앱에
 *    있다. 그래서 이 값들은 통계에만 쓰이고 XP·보석·진행도에는 일절 쓰이지
 *    않는다. 여기서는 형태와 상한만 막는다.
 */
export class ReportAnswerDto {
  @IsString()
  @MaxLength(64)
  questionId: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(MAX_QUESTION_INDEX)
  index: number;

  @IsBoolean()
  isCorrect: boolean;

  @IsOptional()
  @IsBoolean()
  skipped?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(MAX_QUESTION_DURATION_MS)
  durationMs?: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  questionType?: string;
}

/** 레슨을 푸는 중에 몇 문제마다 한 번씩 보내는 진행 보고 */
export class ReportProgressDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(MAX_QUESTION_INDEX)
  index: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_ANSWERS_PER_REPORT)
  @ValidateNested({ each: true })
  @Type(() => ReportAnswerDto)
  answers?: ReportAnswerDto[];
}
