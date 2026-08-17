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
    const audio = this.ttsService.getAudio(audioId);
    // length 를 안 주면 응답이 Transfer-Encoding: chunked 로 나간다.
    // 웹은 그래도 재생되지만 Android 의 오디오 프리로더는 길이를 모르면
    // 전체를 메모리에 담지 못해 실패한다 (증상: 앱에서만 무음).
    return new StreamableFile(audio, {
      type: 'audio/wav',
      length: audio.length,
    });
  }
}
