import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class ClaimReferralDto {
  /** 코드 또는 초대 링크 전체. 서버가 정리한다 */
  @IsString()
  @MaxLength(120)
  code: string;

  /** 링크로 들어왔는지 손으로 쳤는지 — 어느 경로가 도는지 보려고 */
  @IsOptional()
  @IsIn(['link', 'code'])
  source?: 'link' | 'code';
}
