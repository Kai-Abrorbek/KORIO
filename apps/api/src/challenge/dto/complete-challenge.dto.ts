import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CompleteChallengeDto {
  /** 이번 판 점수. 서버가 상한을 걸고 XP 로 환산한다 */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  score: number;
}
