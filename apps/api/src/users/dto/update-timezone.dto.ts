import { IsString, MaxLength } from 'class-validator';

export class UpdateTimezoneDto {
  /** IANA 시간대. 검증은 서비스에서 resolveTimezone 이 한다 (이상한 값이면 기본값). */
  @IsString()
  @MaxLength(64)
  timezone: string;
}
