import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { createHash, timingSafeEqual } from 'crypto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../../../common/rate-limit';
import { CreateStarsInvoiceDto } from '../../dto/create-stars-invoice.dto';
import { TelegramStarsService } from './telegram-stars.service';
import type { TgUpdate } from './telegram.types';

const logger = new Logger('TelegramStarsWebhook');

/** JwtAuthGuard 가 붙여주는 유저 */
type AuthedRequest = { user: { _id: { toString(): string } } };
let warnedNoSecret = false;

/**
 * setWebhook 의 secret_token 과 같은지. 텔레그램은 모든 웹훅 요청에
 * X-Telegram-Bot-Api-Secret-Token 헤더로 그 값을 실어 보낸다.
 * 값이 설정돼 있지 않으면 **전부 거절**한다 — 누구나 결제 완료를 꾸며 보낼 수 있다.
 */
export function webhookSecretMatches(header: string | undefined): boolean {
  const expected = (process.env.TELEGRAM_WEBHOOK_SECRET ?? '').trim();
  if (!expected) {
    if (!warnedNoSecret) {
      warnedNoSecret = true;
      logger.error(
        'TELEGRAM_WEBHOOK_SECRET 이 없다 — 텔레그램 웹훅을 전부 거절한다 (Stars 결제가 안 들어온다)',
      );
    }
    return false;
  }
  if (!header) return false;
  // 길이가 달라도 같은 시간에 비교하도록 해시로 맞춘다
  const a = createHash('sha256').update(header).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

@Controller('payments/telegram')
export class TelegramStarsController {
  constructor(private readonly stars: TelegramStarsService) {}

  /** 미니앱 요금제 카드 (Stars 가격) */
  @UseGuards(JwtAuthGuard)
  @Get('products')
  products() {
    return this.stars.catalog();
  }

  /** 결제 버튼 → 인보이스 링크 → 미니앱이 WebApp.openInvoice 로 연다 */
  @UseGuards(JwtAuthGuard, RateLimitGuard)
  @RateLimit({ windowMs: 60 * 1000, max: 10 })
  @Post('invoice')
  invoice(@Req() req: AuthedRequest, @Body() dto: CreateStarsInvoiceDto) {
    return this.stars.createInvoice(
      req.user._id.toString(),
      dto.productId,
      dto.lang,
    );
  }

  /**
   * 봇 웹훅 (setWebhook 으로 이 주소를 건다).
   *
   * 로그인 가드가 없다 — 텔레그램이 부르는 자리다. 비밀 헤더로만 막는다.
   * 결제 반영이 실패하면 500 을 돌려 텔레그램이 다시 보내게 한다 (반영은 멱등).
   * 그 밖의 업데이트는 실패해도 200 — 같은 걸 계속 받을 이유가 없다.
   */
  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Headers('x-telegram-bot-api-secret-token') secret: string | undefined,
    @Body() update: TgUpdate,
  ) {
    if (!webhookSecretMatches(secret))
      throw new ForbiddenException('FORBIDDEN');
    await this.stars.handleUpdate(update ?? {});
    return { ok: true };
  }
}
