import {
  ArrayMaxSize,
  IsArray,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * POST /lessons/jump-complete
 *
 * 범위(section/unit)와 합격 기준은 요청에 없다 — 서버가 응시 기록에서 읽는다.
 * 예전엔 `{ section: 99, unit: 99 }` 하나로 앱의 모든 레슨이 완료 처리됐다.
 */
export class CompleteUnitJumpDto {
  /** GET /lessons/jump-test 가 발급한 응시 id */
  @IsString()
  @MaxLength(64)
  attemptId: string;

  /** 이번 응시에서 틀린 문제들. 실제로 내준 문제와의 교집합만 인정된다 */
  @IsArray()
  @ArrayMaxSize(200)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  wrongQuestionIds: string[];
}

/** POST /lessons/mistakes/resolve */
export class ResolveMistakesDto {
  @IsArray()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  correctIds: string[];
}
