import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SpeechService } from './speech.service';

/**
 * 오디오는 JSON 이 아니라 raw WAV 바디로 받는다 (base64 로 감싸면 33% 커짐).
 * main.ts 에서 `/speech` 경로에 express.raw 를 물려놨고, 그 결과가 req.body(Buffer) 다.
 */
@Controller('speech')
@UseGuards(JwtAuthGuard)
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post('assess')
  assess(@Req() req: Request, @Query('questionId') questionId: string) {
    if (!questionId) throw new BadRequestException('QUESTION_ID_REQUIRED');
    return this.speechService.assess(
      req.user!['_id'].toString(),
      questionId,
      this.readAudio(req),
    );
  }

  @Post('transcribe')
  transcribe(@Req() req: Request) {
    return this.speechService.transcribe(
      req.user!['_id'].toString(),
      this.readAudio(req),
    );
  }

  private readAudio(req: Request): Buffer {
    const body = req.body as unknown;
    if (!Buffer.isBuffer(body)) {
      // express.raw 가 안 걸렸거나 Content-Type 이 audio/wav 가 아닌 경우
      throw new BadRequestException('AUDIO_BODY_REQUIRED');
    }
    return body;
  }
}
