import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import { CreateTutorSessionDto, EndTutorSessionDto } from './dto/tutor.dto';
import { TUTOR_TOPICS, toTopicCard } from './topics/tutor-topics';
import { TutorService } from './tutor.service';
import {
  DEFAULT_TUTOR_VOICE,
  TUTOR_VOICES,
  type RolePlayScene,
  type TutorMode,
} from './tutor.const';

@Controller('tutor')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class TutorController {
  constructor(private readonly tutor: TutorService) {}

  /**
   * 고를 수 있는 목소리.
   *
   * ⚠️ Azure ko-KR 목소리(=/tts/voices)와 다른 목록이다. 이쪽은 대화 모델이
   * 직접 내는 소리라 영어 우선으로 만들어졌고 한국어 발음이 그만큼 정확하지
   * 않다. 정확한 발음이 필요한 예문은 TTS 쪽을 쓴다.
   */
  @Get('voices')
  voices() {
    return { voices: TUTOR_VOICES, default: DEFAULT_TUTOR_VOICE };
  }

  /** 고를 수 있는 주제. 화면 언어로 제목·설명을 내려준다 */
  @Get('topics')
  topics(@Query('lang') lang = 'uz') {
    return {
      topics: TUTOR_TOPICS.map((t) => toTopicCard(t, lang)),
    };
  }

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
      dto.voice,
      dto.topicId,
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
