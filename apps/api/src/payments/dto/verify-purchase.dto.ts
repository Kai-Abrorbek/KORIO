import { ArrayMaxSize, IsArray, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/** POST /payments/google-play/verify */
export class VerifyGooglePurchaseDto {
  /** Google Play 가 결제 성공 시 준 토큰. 서버가 이걸 구글에 직접 물어본다 */
  @IsString()
  @MaxLength(2048)
  purchaseToken: string;

  /** 참고용. 실제 상품은 구글 응답에서 읽으므로 이 값을 믿지 않는다 */
  @IsOptional()
  @IsString()
  @MaxLength(120)
  productId?: string;
}

export class RestorePurchaseItemDto {
  @IsString()
  @MaxLength(2048)
  purchaseToken: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  productId?: string;
}

/** POST /payments/google-play/restore — 재설치·기기변경 복원 */
export class RestoreGooglePurchasesDto {
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => RestorePurchaseItemDto)
  purchases: RestorePurchaseItemDto[];
}
