import { IsIn, IsOptional, IsString } from 'class-validator';
import { STARS_PRODUCT_IDS } from '../providers/telegram-stars/telegram-stars.const';

/** POST /payments/telegram/invoice */
export class CreateStarsInvoiceDto {
  /** telegram-stars.const 의 상품 id (super_1m 등). 가격은 서버가 정한다 */
  @IsString()
  @IsIn(STARS_PRODUCT_IDS)
  productId: string;

  /** 인보이스 제목·설명 언어 — 미니앱의 지금 언어 */
  @IsOptional()
  @IsIn(['uz', 'ko', 'en', 'ru'])
  lang?: string;
}
