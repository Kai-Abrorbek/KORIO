import { IsString, MaxLength } from 'class-validator';

export class RedeemGemPassDto {
  /** GEM_PASSES 의 id (days_3 등) */
  @IsString()
  @MaxLength(32)
  passId: string;
}
