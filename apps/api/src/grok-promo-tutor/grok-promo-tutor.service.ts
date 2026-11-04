import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  GROK_PROMO_MAX_DURATION_SEC,
  GrokPromoLiveKitService,
} from './grok-promo-livekit.service';
import { GROK_PROMO_PERSONA } from './grok-promo-persona';

@Injectable()
export class GrokPromoTutorService {
  constructor(private readonly livekit: GrokPromoLiveKitService) {}

  options() {
    const available =
      process.env.GROK_PROMO_TUTOR_ENABLED?.trim() === 'true' &&
      this.livekit.configured();
    return {
      available,
      ...(!available ? { reason: 'NOT_CONFIGURED' as const } : {}),
      maxDurationSec: GROK_PROMO_MAX_DURATION_SEC,
      voice: 'eve' as const,
      name: 'Grok 촬영 튜터',
    };
  }

  async start(ownerId: string) {
    if (!this.options().available) {
      throw new ServiceUnavailableException('GROK_PROMO_NOT_CONFIGURED');
    }
    const sessionId = randomUUID();
    const livekit = await this.livekit.prepare(
      sessionId,
      ownerId,
      GROK_PROMO_PERSONA,
    );
    return {
      sessionId,
      status: 'active' as const,
      maxDurationSec: GROK_PROMO_MAX_DURATION_SEC,
      livekit,
    };
  }

  async end(sessionId: string, ownerId: string) {
    await this.livekit.end(sessionId, ownerId);
    return { sessionId, status: 'ended' as const };
  }
}
