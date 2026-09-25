import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtOptionalGuard } from '../auth/jwt-optional.guard';
import { SynthesizeSpeechDto } from './dto/synthesize-speech.dto';
import { RequestQuota } from './guest-speech-quota';
import { TtsService } from './tts.service';

/** 온보딩 문장은 한 문제 분량이다. 이보다 길면 우리 화면에서 온 게 아니다 */
const GUEST_MAX_CHARS = 200;

@Controller('tts')
export class TtsController {
  /**
   * 온보딩 한 번은 문제 14개 + 다시 듣기 정도라 100회를 넘지 않는다.
   * IP 쪽이 넉넉한 건 한 집·한 와이파이에서 여러 명이 깔 수 있어서다.
   */
  private readonly bySession = new RequestQuota(120, 60 * 60 * 1000);
  private readonly byIp = new RequestQuota(600, 60 * 60 * 1000);

  constructor(private readonly ttsService: TtsService) {}

  @Get('voices')
  @UseGuards(JwtAuthGuard)
  getVoices() {
    return this.ttsService.listKoreanVoices();
  }

  /**
   * 문장 하나를 합성해 두고 임시 audioId 를 준다.
   *
   * ⚠️ **가드가 JwtAuthGuard 가 아니다.** 온보딩(설문·레벨 테스트)은 가입 전에
   *    도는데, 여기가 막혀 있어서 듣기 문제가 소리 없이 떴다 — 신규 유저가
   *    첫 화면에서 못 푸는 문제를 받았다. 앱은 401 을 조용히 삼켜서(useSpeech)
   *    아무 표시도 안 났다. useAuthGuard 의 주석이 말하는 "온보딩에서 부르는
   *    API 는 원래 공개" 규칙에서 여기만 빠져 있던 것이다.
   *
   * 토큰이 없으면 게스트로 보고 상한 안에서만 열어준다. 토큰이 있으면 예전과
   * 완전히 같다. 같은 문장은 캐시라 두 번째부터 업체 요청이 안 나간다.
   */
  @Post('speech')
  @UseGuards(JwtOptionalGuard)
  prepare(
    @Body() dto: SynthesizeSpeechDto,
    @Req() req: { user?: unknown },
    @Ip() ip: string,
  ) {
    if (!req.user) this.assertGuestAllowed(dto, ip);
    return this.ttsService.prepare(dto);
  }

  /**
   * 게스트 상한. 토큰이 없는 문이라 이게 유일한 방어선이다 —
   * 안 걸면 남의 공짜 TTS 서버가 된다 (Azure 는 글자 수로 돈이 나간다).
   */
  private assertGuestAllowed(dto: SynthesizeSpeechDto, ip: string) {
    if (dto.text.trim().length > GUEST_MAX_CHARS) {
      throw new BadRequestException('SPEECH_TEXT_TOO_LONG');
    }
    // 세션을 보내는 앱은 세션 단위로, 안 보내는 옛 앱은 IP 단위로 센다
    if (!this.bySession.hit(dto.sessionId ?? `ip:${ip}`) || !this.byIp.hit(ip)) {
      throw new HttpException('SPEECH_GUEST_LIMIT', HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  // audioId 는 위 prepare 가 방금 만든 임시 UUID 다 (6시간 캐시). URL 재생 시
  // 커스텀 헤더를 못 붙이는 플레이어(Expo Web·네이티브 프리로더)를 위해 공개다.
  // 값을 모르면 못 가져가고, prepare 쪽에 상한이 걸려 있으니 여기서 새지 않는다.
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
