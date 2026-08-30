import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CreateTutorSessionDto, EndTutorSessionDto } from './dto/tutor.dto';
import { TutorService } from './tutor.service';
import type { RolePlayScene, TutorMode } from './tutor.const';

@Controller('tutor')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class TutorController {
  constructor(private readonly tutor: TutorService) {}

  /** 남은 사용량. 화면에서 미리 보여주고 막을 때 쓴다 */
  @Get('quota')
  quota(@Request() req) {
    return this.tutor.getQuota(req.user._id.toString());
  }

  /**
   * WebRTC 연결용 임시 토큰 발급.
   *
   * 한 번 호출에 OpenAI 세션이 하나 열리므로 연타를 막는다.
   * (쿼터가 이미 막고 있지만, 발급만 반복해서 API 를 두드리는 건 별개다)
   */
  @RateLimit({ windowMs: 60 * 1000, max: 6 })
  @Post('session')
  createSession(@Request() req, @Body() dto: CreateTutorSessionDto) {
    return this.tutor.createSession(
      req.user._id.toString(),
      dto.mode as TutorMode,
      dto.lang ?? 'uz',
      dto.scene as RolePlayScene | undefined,
    );
  }

  /** 대화 종료 보고. 여기서 실제 사용 시간이 쿼터에 반영된다 */
  @Post('session/end')
  endSession(@Request() req, @Body() dto: EndTutorSessionDto) {
    return this.tutor.endSession(
      req.user._id.toString(),
      dto.sessionId,
      dto.durationSec,
    );
  }
}
