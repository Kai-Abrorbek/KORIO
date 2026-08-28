import { IsInt, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

/** POST /league/ack-rank — 지난주 등수 표시용 값 (화면 표시 외 쓰임 없음) */
export class AckRankDto {
  @IsInt()
  @Min(1)
  @Max(100)
  rank: number;
}

/** POST /league/settle (ADMIN 전용). 예: "2026-W33" */
export class SettleDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-W\d{2}$/, { message: 'WEEK_KEY_FORMAT' })
  weekKey?: string;
}
