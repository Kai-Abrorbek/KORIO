import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { GemPassService } from './gem-pass.service';
import { RedeemGemPassDto } from './redeem-gem-pass.dto';

@Controller('payments/gem-passes')
@UseGuards(JwtAuthGuard)
export class GemPassController {
  constructor(private readonly service: GemPassService) {}

  /** 상점 목록 + 내 보석·남은 프리미엄 */
  @Get()
  list(@Request() req) {
    return this.service.list(req.user._id.toString());
  }

  /** 보석을 쓰고 기간을 받는다 */
  @Post('redeem')
  redeem(@Request() req, @Body() dto: RedeemGemPassDto) {
    return this.service.redeem(req.user._id.toString(), dto.passId);
  }
}
