import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import {
  CreateTutorSessionDto,
  EndTutorSessionDto,
  TutorExplainDto,
  TutorSpeakDto,
} from './dto/tutor.dto';
import { TUTOR_TEACHERS, toTeacherCard } from './teachers/tutor-teachers';
import { TutorSpeechService } from './tutor-speech.service';
import { TutorTtsError } from './tts/tutor-tts.types';
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
  constructor(
    private readonly tutor: TutorService,
    private readonly speech: TutorSpeechService,
  ) {}

  /** 고를 수 있는 선생님. 목소리만이 아니라 성격·추천 모드까지 같이 준다 */
  @Get('teachers')
  teachers(@Query('lang') lang = 'uz') {
    return { teachers: TUTOR_TEACHERS.map((t) => toTeacherCard(t, lang)) };
  }

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
      dto.teacherId,
    );
  }

  /**
   * 대화 종료 보고. 여기서 실제 사용 시간이 쿼터에 반영되고,
   * 대화 내용을 같이 보내면 요약까지 만들어서 돌려준다.
   */
  /**
   * 튜터가 만든 한국어 한 줄을 선생님 목소리로 읽어준다.
   *
   * Realtime 은 이제 텍스트만 만든다. 소리는 전부 여기를 지난다.
   * ⚠️ 업체 키는 이 함수 밖으로 나가지 않는다. 앱은 문장과 선생님 id 만 안다.
   *
   * 한도가 두 겹이다: DTO 가 문장 길이를, 여기가 요청 횟수를 막는다.
   * 둘 다 없으면 우리 키로 도는 공개 TTS 서버가 된다.
   * 정상 대화는 문장당 한 번이라 분당 30을 넘기 어렵다.
   */
  @RateLimit({ windowMs: 60 * 1000, max: 60 })
  @Post('tts')
  async tts(@Body() dto: TutorSpeakDto, @Res() res: Response) {
    try {
      const out = await this.speech.speak(dto);
      res.setHeader('Content-Type', out.contentType);
      res.setHeader('Cache-Control', 'no-store');
      // 받는 대로 흘려보낸다. 전부 모았다가 주면 첫 소리가 그만큼 늦는다
      out.body.pipe(res);
      out.body.on('error', () => res.destroy());
    } catch (e) {
      const code = e instanceof TutorTtsError ? 'TTS_ERROR' : 'TTS_FAILED';
      // 앱은 여기서 소리를 포기하고 자막만 유지한다. 대화는 안 끊긴다
      res.status(503).json({ message: code });
    }
  }

  /**
   * "우즈벡어 설명 보기".
   *
   * 튜터 응답마다 미리 만들지 않는다 — 대부분은 아무도 안 누르고, 미리 만든
   * 만큼은 그냥 버리는 돈이다. 누른 그 문장만 만든다.
   */
  @RateLimit({ windowMs: 60 * 1000, max: 20 })
  @Post('explain')
  explain(@Body() dto: TutorExplainDto) {
    return this.speech.explain(dto.text, dto.lang ?? 'uz');
  }

  @Post('session/end')
  endSession(@Request() req, @Body() dto: EndTutorSessionDto) {
    return this.tutor.endSession(
      req.user._id.toString(),
      dto.sessionId,
      dto.durationSec,
      dto.lang ?? 'uz',
      dto.transcript,
    );
  }
}
