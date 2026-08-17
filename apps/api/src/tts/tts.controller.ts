import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SynthesizeSpeechDto } from './dto/synthesize-speech.dto';
import { TtsService } from './tts.service';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Get('voices')
  @UseGuards(JwtAuthGuard)
  getVoices() {
    return this.ttsService.listKoreanVoices();
  }

  @Post('speech')
  @UseGuards(JwtAuthGuard)
  prepare(@Body() dto: SynthesizeSpeechDto) {
    return this.ttsService.prepare(dto);
  }

  // audioId는 인증된 prepare 호출에서만 발급되는 임시 UUID다. URL 재생 시
  // 커스텀 헤더를 보내지 못하는 Expo Web도 사용할 수 있도록 GET은 공개한다.
  @Get('speech/:audioId')
  @Header('Content-Type', 'audio/wav')
  @Header('Cache-Control', 'private, max-age=21600')
  getAudio(@Param('audioId') audioId: string) {
    return new StreamableFile(this.ttsService.getAudio(audioId));
  }
}
