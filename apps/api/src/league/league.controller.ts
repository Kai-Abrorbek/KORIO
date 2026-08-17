import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { LeagueService } from './league.service';

@Controller('league')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  // 수동 정산 (관리자 전용). 평시엔 매주 월 00:05 KST cron 이 자동으로 돈다.
  // weekKey 를 주면 특정 주를 다시 정산 (예: "2026-W33")
  @Roles(UserRole.ADMIN)
  @Post('settle')
  settle(@Body() body: { weekKey?: string }) {
    return this.service.settleWeek(body?.weekKey);
  }

  @Post('snapshot-rank')
  async snapshotRank(@Request() req) {
    return this.service.snapshotRank(req.user._id.toString());
  }

  @Post('ack-rank')
  async ackRank(@Request() req, @Body() body: { rank: number }) {
    return this.service.ackRank(req.user._id.toString(), body.rank ?? 0);
  }

  @Get('result')
  async getResult(@Request() req) {
    return this.service.getPendingResult(req.user._id.toString());
  }

  @Post('result/ack')
  async ackResult(@Request() req) {
    return this.service.clearPendingResult(req.user._id.toString());
  }
}
