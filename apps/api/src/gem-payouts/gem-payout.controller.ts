import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CreateGemPayoutDto } from './gem-payout.dto';

type AuthedRequest = { user: { _id: { toString(): string } } };
import { GemPayoutService } from './gem-payout.service';

/** 상점의 "카드로 받기" — 보석을 카드로 출금 신청 */
@Controller('gem-payouts')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class GemPayoutController {
  constructor(private readonly payouts: GemPayoutService) {}

  /** 최소 수량·지금 열린 신청·최근 결과 */
  @Get('me')
  me(@Request() req: AuthedRequest) {
    return this.payouts.overview(req.user._id.toString());
  }

  @Post()
  @RateLimit({ windowMs: 60 * 60_000, max: 10 })
  create(@Request() req: AuthedRequest, @Body() dto: CreateGemPayoutDto) {
    return this.payouts.create(req.user._id.toString(), dto);
  }

  /** 접수 상태일 때만 취소 (보석 반환) */
  @Post(':id/cancel')
  @RateLimit({ windowMs: 60 * 60_000, max: 20 })
  cancel(@Request() req: AuthedRequest, @Param('id') id: string) {
    return this.payouts.cancel(req.user._id.toString(), id);
  }
}
