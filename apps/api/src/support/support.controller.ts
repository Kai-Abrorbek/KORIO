import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CreateSupportTicketDto } from './dto/support.dto';
import { SupportService } from './support.service';

@Controller('support/tickets')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class SupportController {
  constructor(private readonly support: SupportService) {}

  @Get()
  mine(@Req() req: { user: { _id: { toString(): string } } }) {
    return this.support.listMine(req.user._id.toString());
  }

  @Post()
  @RateLimit({ windowMs: 60 * 60_000, max: 12 })
  create(
    @Req() req: { user: { _id: { toString(): string } } },
    @Body() dto: CreateSupportTicketDto,
  ) {
    return this.support.create(req.user._id.toString(), dto);
  }
}
