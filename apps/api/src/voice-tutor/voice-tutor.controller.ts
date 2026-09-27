import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Request,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RateLimit, RateLimitGuard } from '../common/rate-limit';
import {
  CreateVoiceTutorSessionDto,
  UpdateVoiceTutorSettingsDto,
} from './dto/voice-tutor.dto';
import { supportedAudioMime } from './providers/openai-stt.provider';
import { VOICE_TUTOR_MAX_AUDIO_BYTES } from './voice-tutor.config';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import { VoiceTutorService } from './voice-tutor.service';

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
    return this.tutor.start(request.user._id.toString(), dto?.settings);
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
