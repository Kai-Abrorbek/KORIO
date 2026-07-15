import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeagueService } from './league.service';

@Controller('league')
@UseGuards(JwtAuthGuard)
export class LeagueController {
  constructor(private readonly service: LeagueService) {}

  @Get('me')
  getMyLeague(@Request() req) {
    return this.service.getMyLeague(req.user._id.toString());
  }

  @Get('tiers')
  getTiers() {
    return this.service.getTiers();
  }

  // 임시 수동 정산 (테스트용 — 나중에 cron으로 대체/보호)
  @Post('settle')
  settle() {
    return this.service.settleWeek();
  }

  @Post('snapshot-rank')
  async snapshotRank(@Request() req) {
    return this.service.snapshotRank(req.user._id.toString());
  }

  @Post('ack-rank')
  async ackRank(@Request() req, @Body() body: { rank: number }) {
    return this.service.ackRank(req.user._id.toString(), body.rank ?? 0);
  }
}
