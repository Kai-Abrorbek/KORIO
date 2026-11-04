import { Module } from '@nestjs/common';
import { RateLimitGuard } from '../common/rate-limit';
import { GrokPromoAdminGuard } from './grok-promo-admin.guard';
import { GrokPromoLiveKitService } from './grok-promo-livekit.service';
import { GrokPromoTutorController } from './grok-promo-tutor.controller';
import { GrokPromoTutorService } from './grok-promo-tutor.service';

@Module({
  controllers: [GrokPromoTutorController],
  providers: [
    GrokPromoTutorService,
    GrokPromoLiveKitService,
    GrokPromoAdminGuard,
    RateLimitGuard,
  ],
})
export class GrokPromoTutorModule {}
