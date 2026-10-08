import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../../common/rate-limit';
import {
  CreateCardOrderDto,
  SubmitCardReceiptDto,
} from '../dto/card-payment.dto';
import { CARD_RECEIPT_MAX_BYTES } from './card-payment.const';
import {
  CardPaymentService,
  type UploadedReceipt,
} from './card-payment.service';

/** JwtAuthGuard 가 붙여주는 유저 */
type AuthedRequest = { user: { _id: { toString(): string } } };

/** Humo·Uzcard 카드 입금 (텔레그램 미니앱) */
@Controller('payments/card')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class CardPaymentController {
  constructor(private readonly cards: CardPaymentService) {}

  /** 켜져 있는지 · 우리 카드 · so'm 가격표 · 진행 중 주문 */
  @Get('config')
  config(@Req() req: AuthedRequest) {
    return this.cards.config(req.user._id.toString());
  }

  /** 주문 만들기 → 고유 금액 */
  @Post('orders')
  @RateLimit({ windowMs: 10 * 60 * 1000, max: 15 })
  create(@Req() req: AuthedRequest, @Body() dto: CreateCardOrderDto) {
    return this.cards.createOrder(req.user._id.toString(), dto.productId);
  }

  /** 상태 폴링 (심사 중 → 승인/거절) */
  @Get('orders/:id')
  get(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.cards.getOrder(req.user._id.toString(), id);
  }

  @Post('orders/:id/cancel')
  cancel(@Req() req: AuthedRequest, @Param('id') id: string) {
    return this.cards.cancel(req.user._id.toString(), id);
  }

  /** 영수증 스크린샷 + 보낸 카드 끝 4자리 (multipart: receipt, payerLast4, receiverLast4) */
  @Post('orders/:id/receipt')
  @RateLimit({ windowMs: 10 * 60 * 1000, max: 10 })
  @UseInterceptors(
    FileInterceptor('receipt', {
      limits: { fileSize: CARD_RECEIPT_MAX_BYTES },
    }),
  )
  receipt(
    @Req() req: AuthedRequest,
    @Param('id') id: string,
    @Body() dto: SubmitCardReceiptDto,
    @UploadedFile() file?: UploadedReceipt,
  ) {
    return this.cards.submitReceipt(
      req.user._id.toString(),
      id,
      file,
      dto.payerLast4,
      dto.receiverLast4,
    );
  }
}
