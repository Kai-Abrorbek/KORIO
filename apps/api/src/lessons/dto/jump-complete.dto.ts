import { ArrayMaxSize, IsArray, IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

/**
 * POST /lessons/jump-complete
 *
 * ⚠️ 이 엔드포인트는 목표 지점 이전의 레슨을 전부 완료로 찍는다.
 * 예전엔 `@Body() body: { section: number; unit: number }` 라 런타임 검증이
 * 전혀 없었고, `{ section: 99, unit: 99 }` 하나로 앱의 모든 레슨이 완료 처리됐다.
 *
 * 상한을 두면 말도 안 되는 값은 막히지만, "점프 테스트를 실제로 통과했는지"를
 * 서버가 모르는 건 그대로다 (getUnitJumpTest 가 아무것도 기록하지 않음).
 * 그건 별도 작업 — claude/보안-점검.md 참고.
 */
export class CompleteUnitJumpDto {
  @IsInt()
  @Min(1)
  @Max(20)
  section: number;

  @IsInt()
  @Min(1)
  @Max(50)
  unit: number;
}

/** POST /lessons/mistakes/resolve */
export class ResolveMistakesDto {
  @IsArray()
  @ArrayMaxSize(500)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  correctIds: string[];
}
