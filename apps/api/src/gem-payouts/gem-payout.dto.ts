import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  PAYOUT_BRANDS,
  PAYOUT_REJECT_REASONS,
  type PayoutBrand,
} from './gem-payout.const';

export class CreateGemPayoutDto {
  @IsIn([...PAYOUT_BRANDS])
  brand: PayoutBrand;

  /** 공백·하이픈은 서버가 지운다 */
  @IsString()
  @MaxLength(32)
  cardNumber: string;

  @IsString()
  @MaxLength(60)
  cardHolder: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  gems: number;
}

export class SetGemPayoutStatusDto {
  @IsIn(['processing', 'completed', 'rejected'])
  status: 'processing' | 'completed' | 'rejected';

  /** 반려일 때 사유 코드 */
  @IsOptional()
  @IsIn([...PAYOUT_REJECT_REASONS])
  reason?: string;

  /** 운영자 메모 (유저에게 안 보인다) */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
