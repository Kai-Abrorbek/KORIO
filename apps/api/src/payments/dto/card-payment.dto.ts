import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { STARS_PRODUCT_IDS } from '../providers/telegram-stars/telegram-stars.const';

/** POST /payments/card/orders — 상품은 Stars 와 같은 id, 가격은 card-payment.const */
export class CreateCardOrderDto {
  @IsString()
  @IsIn(STARS_PRODUCT_IDS)
  productId: string;
}

/** POST /payments/card/orders/:id/receipt (multipart 의 글자 필드) */
export class SubmitCardReceiptDto {
  /** 돈을 보낸 카드 끝 4자리. 카드번호 전체는 받지 않는다 */
  @Matches(/^\d{4}$/, { message: 'INVALID_LAST4' })
  payerLast4: string;

  /** 우리 카드 중 어디로 보냈는지 (끝 4자리) */
  @IsOptional()
  @Matches(/^\d{4}$/, { message: 'INVALID_LAST4' })
  receiverLast4?: string;
}
