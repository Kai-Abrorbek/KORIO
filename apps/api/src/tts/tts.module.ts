import { Module } from '@nestjs/common';
import { RateLimitGuard } from '../common/rate-limit';
import { TtsController } from './tts.controller';
import { TtsService } from './tts.service';

@Module({
  controllers: [TtsController],
  providers: [TtsService, RateLimitGuard],
})
export class TtsModule {}
