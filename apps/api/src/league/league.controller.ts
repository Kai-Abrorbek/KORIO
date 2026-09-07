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
import { AckRankDto, SettleDto } from './dto/league-body.dto';

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

  /**
   * 수동 정산 (관리자 전용).
   *
   * 평시엔 월요일 00:05 cron 이 돌고, 그때 서버가 안 떠 있었으면 매시간
   * 따라잡기가 가져간다. 그래도 급할 때가 있어서 남겨둔다.
   *
   * weekKey 없이 부르면 "끝났는데 아직 안 된 주" 를 전부 정산한다.
   * weekKey 를 주면 그 주만 다시 본다 (예: "2026-W33") — 보상 도중
   * 크래시가 나서 방이 settled:true 로 집힌 채 남은 경우, 그 방의 settled 를
   * false 로 되돌린 뒤 이걸로 다시 돌린다.
   */
  @Roles(UserRole.ADMIN)
  @Post('settle')
  settle(@Body() dto: SettleDto) {
    return dto?.weekKey
      ? this.service.settleWeek(dto.weekKey)
      : this.service.settleDueWeeks();
  }

  @Post('snapshot-rank')
  async snapshotRank(@Request() req) {
    return this.service.snapshotRank(req.user._id.toString());
  }

  @Post('ack-rank')
  async ackRank(@Request() req, @Body() dto: AckRankDto) {
    return this.service.ackRank(req.user._id.toString(), dto.rank);
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
