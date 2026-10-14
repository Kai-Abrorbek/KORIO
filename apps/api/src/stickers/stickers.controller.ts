import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { StickersService } from './stickers.service';

type AuthedRequest = { user: { _id: { toString(): string } } };

/** 내 캐릭터 텔레그램 스티커팩 — 상태 · 미리보기 · 만들기 */
@Controller('stickers')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class StickersController {
  constructor(private readonly stickers: StickersService) {}

  @Get()
  state(@Request() req: AuthedRequest) {
    return this.stickers.state(req.user._id.toString());
  }

  /** 그림 8장을 그린다 — 가볍지 않아서 한도를 둔다 (같은 캐릭터는 캐시) */
  @Get('preview')
  @RateLimit({ windowMs: 60_000, max: 20 })
  preview(@Request() req: AuthedRequest) {
    return this.stickers.preview(req.user._id.toString());
  }

  @Post('make')
  @RateLimit({ windowMs: 60_000, max: 6 })
  make(@Request() req: AuthedRequest) {
    return this.stickers.make(req.user._id.toString());
  }
}
