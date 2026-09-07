import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Request,
  ServiceUnavailableException,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
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
   * 튜터가 만든 한국어 한 줄을 선생님 목소리로 합성한다.
   *
   * Realtime 은 이제 텍스트만 만든다. 소리는 전부 여기를 지난다.
   * ⚠️ 업체 키는 서버 밖으로 나가지 않는다. 앱은 문장과 선생님 id 만 안다.
   *
   * 한도가 두 겹이다: DTO 가 문장 길이(500자), 여기가 요청 횟수(분당 60).
   * 둘 다 없으면 우리 키로 도는 공개 TTS 서버가 된다. 정상 대화는 문장당
   * 한 번이라 분당 60 근처도 안 간다.
   */
  @RateLimit({ windowMs: 60 * 1000, max: 60 })
  @Post('tts')
  async tts(@Body() dto: TutorSpeakDto) {
    try {
      return await this.speech.speak(dto);
    } catch (e) {
      // 앱은 소리를 포기하고 자막만 유지한다. 대화 자체는 안 끊긴다
      throw new ServiceUnavailableException(
        e instanceof TutorTtsError ? 'TTS_ERROR' : 'TTS_FAILED',
      );
    }
  }

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

/**
 * 오디오 재생만 담당하는 별도 컨트롤러.
 *
 * 클래스 단위 JwtAuthGuard 를 피하려고 분리했다. 플레이어는 URL 을 재생할 때
 * 인증 헤더를 붙이지 못한다. audioId 는 인증된 POST /tutor/tts 에서만 나오는
 * 임시 난수(2분)라, 그 자체가 접근권이다 — 기존 /tts/speech/:audioId 와 같다.
 */
@Controller('tutor')
export class TutorAudioController {
  constructor(private readonly speech: TutorSpeechService) {}

  @Get('tts/audio/:audioId')
  @Header('Cache-Control', 'private, max-age=120')
  audio(@Param('audioId') audioId: string) {
    const hit = this.speech.takeAudio(audioId);
    // length 를 안 주면 chunked 로 나가는데, 안드로이드 오디오 프리로더는
    // 길이를 모르면 전체를 못 담고 **소리 없이** 실패한다
    return new StreamableFile(hit.audio, {
      type: hit.contentType,
      length: hit.audio.length,
    });
  }
}
