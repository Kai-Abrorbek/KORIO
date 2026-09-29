import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Header,
  HttpException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import {
  CreateVoiceTutorSessionDto,
  UpdateVoiceTutorSettingsDto,
  VoiceTutorAgentTurnDto,
} from './dto/voice-tutor.dto';
import { supportedAudioMime } from './providers/openai-stt.provider';
import { VOICE_TUTOR_MAX_AUDIO_BYTES } from './voice-tutor.config';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import { VoiceTutorService } from './voice-tutor.service';
import {
  VOICE_TUTOR_TOPICS,
  toVoiceTutorTopicCard,
} from './topics/voice-tutor-topics';

interface UploadedVoiceAudio {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@Controller('voice-tutor')
@UseGuards(JwtAuthGuard, RateLimitGuard)
export class VoiceTutorController {
  constructor(
    private readonly tutor: VoiceTutorService,
    private readonly audio: VoiceTutorAudioService,
  ) {}

  @Get('options')
  options() {
    return this.tutor.options();
  }

  /** 오늘·이번 달 남은 시간. 설정 화면이 시작 전에 보여 준다 */
  @Get('quota')
  quota(@Request() request: { user: { _id: { toString(): string } } }) {
    return this.tutor.getQuota(request.user._id.toString());
  }

  /** 회화 주제 카드. lang = 카드 제목·설명 언어 (앱 언어) */
  @Get('topics')
  topics(@Query('lang') lang = 'uz') {
    return {
      topics: VOICE_TUTOR_TOPICS.map((topic) =>
        toVoiceTutorTopicCard(topic, lang),
      ),
    };
  }

  @Get('settings')
  settings(@Request() request: { user: { _id: { toString(): string } } }) {
    return this.tutor.settings(request.user._id.toString());
  }

  @Patch('settings')
  updateSettings(
    @Request() request: { user: { _id: { toString(): string } } },
    @Body() dto: UpdateVoiceTutorSettingsDto,
  ) {
    return this.tutor.updateSettings(request.user._id.toString(), dto);
  }

  @Post('sessions')
  @RateLimit({ windowMs: 60_000, max: 6 })
  start(
    @Request() request: { user: { _id: { toString(): string } } },
    @Body() dto?: CreateVoiceTutorSessionDto,
  ) {
    return this.tutor.start(
      request.user._id.toString(),
      dto?.settings,
      dto?.topicId,
    );
  }

  @Get('sessions/:id')
  get(
    @Request() request: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
  ) {
    return this.tutor.get(request.user._id.toString(), id);
  }

  @Post('sessions/:id/turns')
  @RateLimit({ windowMs: 60_000, max: 30 })
  @UseInterceptors(
    FileInterceptor('audio', {
      limits: { fileSize: VOICE_TUTOR_MAX_AUDIO_BYTES },
    }),
  )
  turn(
    @Request() request: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
    @UploadedFile() file?: UploadedVoiceAudio,
  ) {
    if (
      !file?.buffer?.length ||
      file.size > VOICE_TUTOR_MAX_AUDIO_BYTES ||
      !supportedAudioMime(file.mimetype)
    ) {
      throw new BadRequestException('VOICE_TUTOR_INVALID_AUDIO');
    }
    return this.tutor.turn(
      request.user._id.toString(),
      id,
      file.buffer,
      file.mimetype,
    );
  }

  @Post('sessions/:id/end')
  @RateLimit({ windowMs: 60_000, max: 6 })
  end(
    @Request() request: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
  ) {
    return this.tutor.end(request.user._id.toString(), id);
  }

  @Post('sessions/:id/messages/:messageId/audio')
  @RateLimit({ windowMs: 60_000, max: 20 })
  replayAudio(
    @Request() request: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
    @Param('messageId') messageId: string,
  ) {
    return this.tutor.replayAudio(request.user._id.toString(), id, messageId);
  }

  @Get('audio/:id')
  @Header('Cache-Control', 'private, max-age=3600')
  async getAudio(
    @Request() request: { user: { _id: { toString(): string } } },
    @Param('id') id: string,
  ) {
    const data = await this.audio.read(request.user._id.toString(), id);
    return new StreamableFile(data, {
      type: 'audio/mpeg',
      length: data.length,
    });
  }
}

/** Worker-only callback: the signed dispatch token is never sent to the app. */
@Controller('voice-tutor/agent')
export class VoiceTutorAgentController {
  constructor(private readonly tutor: VoiceTutorService) {}

  @Post('sessions/:id/turns')
  agentTurn(
    @Param('id') id: string,
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: VoiceTutorAgentTurnDto,
  ) {
    return this.tutor.agentTurn(id, authorization, dto);
  }

  /**
   * Streaming variant for the live worker. NDJSON, one object per line:
   *   {"t":"meta","emotion","delivery","intensity","gesture"}  before the first word
   *   {"t":"speech","d":"..."}   words to speak, as the model writes them
   *   {"t":"done","teacherMessage":{...},"warning":...}
   *   {"t":"error"}              only if it broke after speech had started
   * Failures before the first word keep their HTTP status (401/404/409) so the
   * worker's retry logic works exactly as with the JSON route.
   */
  @Post('sessions/:id/turns/stream')
  async agentTurnStream(
    @Param('id') id: string,
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: VoiceTutorAgentTurnDto,
    @Res() res: Response,
  ): Promise<void> {
    const abort = new AbortController();
    res.on('close', () => {
      if (!res.writableFinished) abort.abort();
    });
    const write = (payload: Record<string, unknown>) => {
      if (!res.headersSent) {
        res.status(200);
        res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        // nginx must not buffer: the whole point is the first sentence early
        res.setHeader('X-Accel-Buffering', 'no');
        // Caddy 의 `encode zstd gzip` 이 압축하려고 모았다가 보내면 첫 문장이 늦는다.
        // 이미 Content-Encoding 이 있으면 Caddy 는 손대지 않는다
        res.setHeader('Content-Encoding', 'identity');
        res.flushHeaders();
      }
      if (!res.writableEnded) res.write(`${JSON.stringify(payload)}\n`);
    };
    try {
      const result = await this.tutor.agentTurnStream(
        id,
        authorization,
        dto,
        (d) => write({ t: 'speech', d }),
        abort.signal,
        (meta) => write({ t: 'meta', ...meta }),
      );
      write({
        t: 'done',
        teacherMessage: result.teacherMessage,
        warning: result.warning,
      });
      res.end();
    } catch (error) {
      if (res.headersSent) {
        this.logger.warn(
          `Voice Tutor stream broke mid-turn: ${(error as Error).name}`,
        );
        write({ t: 'error' });
        res.end();
        return;
      }
      const status = error instanceof HttpException ? error.getStatus() : 500;
      const body =
        error instanceof HttpException
          ? error.getResponse()
          : { statusCode: 500, message: 'VOICE_TUTOR_TURN_FAILED' };
      res.status(status).json(body);
    }
  }

  private readonly logger = new Logger(VoiceTutorAgentController.name);
}
