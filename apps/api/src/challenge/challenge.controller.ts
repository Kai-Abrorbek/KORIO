import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChallengeService } from './challenge.service';
import { CompleteChallengeDto } from './dto/complete-challenge.dto';

/**
 * 리그 주간 챌린지. 경로는 /league/challenge 지만 모듈은 league/ 밖에 있다 —
 * 이유는 challenge.service.ts 주석 참고 (LessonsModule ↔ LeagueModule 순환).
 */
@Controller('league/challenge')
@UseGuards(JwtAuthGuard)
export class ChallengeController {
  constructor(private readonly service: ChallengeService) {}

  /** 내 리그의 종목·비용·남은 횟수 */
  @Get()
  get(@Request() req) {
    return this.service.getChallenge(req.user._id.toString());
  }

  /** 시작 — 에너지 차감 */
  @Post('start')
  start(@Request() req) {
    return this.service.startChallenge(req.user._id.toString());
  }

  /** 완료 — 점수를 XP 로 (상한·쿨다운·하루 횟수는 서버가 건다) */
  @Post('complete')
  complete(@Request() req, @Body() dto: CompleteChallengeDto) {
    return this.service.completeChallenge(req.user._id.toString(), dto.score);
  }
}
