import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { PurchaseCosmeticDto } from './cosmetics.dto';
import { CosmeticsService } from './cosmetics.service';

type AuthedRequest = { user: { _id: { toString(): string } } };

/** 캐릭터 꾸미기 아이템 (오라) — 목록 · 보석으로 구매 */
@Controller('cosmetics')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class CosmeticsController {
  constructor(private readonly cosmetics: CosmeticsService) {}

  @Get()
  list(@Request() req: AuthedRequest) {
    return this.cosmetics.list(req.user._id.toString());
  }

  @Post('purchase')
  @RateLimit({ windowMs: 60_000, max: 20 })
  purchase(@Request() req: AuthedRequest, @Body() dto: PurchaseCosmeticDto) {
    return this.cosmetics.purchase(
      req.user._id.toString(),
      dto.itemId,
      dto.equip === true,
    );
  }
}
