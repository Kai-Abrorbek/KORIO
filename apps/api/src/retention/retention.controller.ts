import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RetentionService } from './retention.service';
import { ClaimQuestDto, StartStreakGoalDto } from './dto';

@Controller('retention')
@UseGuards(JwtAuthGuard)
export class RetentionController {
  constructor(private readonly service: RetentionService) {}

  /** 홈 한 번에 — 복구펜·퀘스트·출석·복귀·XP 부스트·연속 목표 */
  @Get('summary')
  summary(@Request() req) {
    return this.service.summary(req.user._id.toString());
  }

  // ── 복구펜 ──
  @Post('freeze/buy')
  buyFreeze(@Request() req) {
    return this.service.buyFreeze(req.user._id.toString());
  }

  @Post('freeze/notice/ack')
  ackFreezeNotice(@Request() req) {
    return this.service.ackFreezeNotice(req.user._id.toString());
  }

  // ── 일일 퀘스트 ──
  @Post('quests/claim')
  claimQuest(@Request() req, @Body() dto: ClaimQuestDto) {
    return this.service.claimQuest(req.user._id.toString(), dto.id);
  }

  // ── 복귀 보상 ──
  @Post('comeback/claim')
  claimComeback(@Request() req) {
    return this.service.claimComeback(req.user._id.toString());
  }

  // ── 첫 7일 출석 ──
  @Post('checkin/claim')
  claimCheckin(@Request() req) {
    return this.service.claimCheckin(req.user._id.toString());
  }

  // ── 연속 목표 ──
  @Get('streak-goal')
  getGoal(@Request() req) {
    return this.service.getGoal(req.user._id.toString());
  }

  @Post('streak-goal')
  startGoal(@Request() req, @Body() dto: StartStreakGoalDto) {
    return this.service.startGoal(req.user._id.toString(), dto.days);
  }

  @Post('streak-goal/ack')
  ackGoal(@Request() req) {
    return this.service.ackGoal(req.user._id.toString());
  }
}
