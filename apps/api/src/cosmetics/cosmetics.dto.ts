import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class PurchaseCosmeticDto {
  @IsString()
  @MaxLength(64)
  itemId: string;

  /** 사자마자 장착 (에디터에서 입어본 채로 산다) */
  @IsOptional()
  @IsBoolean()
  equip?: boolean;
}
