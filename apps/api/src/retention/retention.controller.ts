import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { CourseScope } from '../common/learning-course';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RetentionService } from './retention.service';
import {
  ClaimMonthlyDto,
  ClaimQuestDto,
  QuestEventDto,
  RerollQuestDto,
  StartStreakGoalDto,
} from './dto';

@Controller('retention')
@UseGuards(JwtAuthGuard)
export class RetentionController {
  constructor(private readonly service: RetentionService) {}

  /** 홈 한 번에 — 복구펜·퀘스트·출석·복귀·XP 부스트·연속 목표 */
  @Get('summary')
  summary(@Request() req, @Query() course: Partial<CourseScope> = {}) {
    // 문제 퀘스트는 지금 배우는 코스 것으로 (앱이 courseId·targetLanguage 를 붙인다)
    return this.service.summary(req.user._id.toString(), course);
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
  claimQuest(
    @Request() req,
    @Body() dto: ClaimQuestDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.service.claimQuest(req.user._id.toString(), dto.id, course);
  }

  /** 한 칸 바꾸기 (하루 1번, SUPER 3번) */
  @Post('quests/reroll')
  rerollQuest(
    @Request() req,
    @Body() dto: RerollQuestDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.service.rerollQuest(req.user._id.toString(), dto.slot, course);
  }

  /** 앱이 알려 주는 행동 — 학습 결과 공유 · 초대장 보내기 */
  @Post('quests/event')
  questEvent(
    @Request() req,
    @Body() dto: QuestEventDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.service.questEvent(req.user._id.toString(), dto.type, course);
  }

  // ── 월간 챌린지 ──
  @Post('monthly/claim')
  claimMonthly(@Request() req, @Body() dto: ClaimMonthlyDto) {
    return this.service.claimMonthly(req.user._id.toString(), dto.at);
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
