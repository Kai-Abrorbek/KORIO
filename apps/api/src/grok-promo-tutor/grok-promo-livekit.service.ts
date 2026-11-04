import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createHmac } from 'node:crypto';
import {
  AccessToken,
  AgentDispatchClient,
  RoomServiceClient,
  TrackSource,
} from 'livekit-server-sdk';

export const GROK_PROMO_MAX_DURATION_SEC = 600;

export interface GrokPromoMetadata {
  version: 1;
  kind: 'admin-promo-grok';
  sessionId: string;
  ownerId: string;
  instructions: string;
  voice: 'eve';
  maxDurationSec: number;
  expiresAt: number;
  signature: string;
}

function connection() {
  return {
    url: process.env.LIVEKIT_URL?.trim() || '',
    apiKey: process.env.LIVEKIT_API_KEY?.trim() || '',
    apiSecret: process.env.LIVEKIT_API_SECRET?.trim() || '',
  };
}

@Injectable()
export class GrokPromoLiveKitService {
  private readonly logger = new Logger(GrokPromoLiveKitService.name);

  configured(): boolean {
    const env = connection();
    return !!(env.url && env.apiKey && env.apiSecret);
  }

  async prepare(sessionId: string, ownerId: string, instructions: string) {
    const env = this.requireConnection();
    const roomName = this.roomName(sessionId);
    const metadata: GrokPromoMetadata = {
      version: 1,
      kind: 'admin-promo-grok',
      sessionId,
      ownerId,
      instructions,
      voice: 'eve',
      maxDurationSec: GROK_PROMO_MAX_DURATION_SEC,
      expiresAt:
        Math.floor(Date.now() / 1000) + GROK_PROMO_MAX_DURATION_SEC + 60,
      signature: '',
    };
    metadata.signature = createHmac('sha256', env.apiSecret)
      .update(
        JSON.stringify([
          metadata.sessionId,
          metadata.ownerId,
          metadata.voice,
          metadata.maxDurationSec,
          metadata.expiresAt,
          metadata.instructions,
        ]),
      )
      .digest('base64url');
    const token = new AccessToken(env.apiKey, env.apiSecret, {
      identity: `grok-promo-owner-${sessionId}`,
      ttl: GROK_PROMO_MAX_DURATION_SEC,
    });
    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canPublishSources: [TrackSource.MICROPHONE],
      canSubscribe: true,
      canPublishData: true,
      canUpdateOwnMetadata: false,
    });
    const participantToken = await token.toJwt();
    const httpUrl = env.url.replace(/^ws(s?):\/\//, 'http$1://');
    const rooms = new RoomServiceClient(httpUrl, env.apiKey, env.apiSecret);
    let created = false;
    try {
      await rooms.createRoom({
        name: roomName,
        emptyTimeout: 60,
        departureTimeout: 10,
        maxParticipants: 2,
        // Server-owned room metadata survives API restarts and blue/green switches.
        metadata: JSON.stringify({ kind: metadata.kind, ownerId, sessionId }),
      });
      created = true;
      const dispatch = new AgentDispatchClient(
        httpUrl,
        env.apiKey,
        env.apiSecret,
      );
      await dispatch.createDispatch(
        roomName,
        process.env.GROK_PROMO_LIVEKIT_AGENT_NAME?.trim() || 'korio-grok-promo',
        { metadata: JSON.stringify(metadata) },
      );
    } catch {
      if (created) await rooms.deleteRoom(roomName).catch(() => undefined);
      this.logger.error('Grok promo room creation or dispatch failed');
      throw new ServiceUnavailableException('GROK_PROMO_SESSION_FAILED');
    }
    return { serverUrl: env.url, roomName, participantToken };
  }

  async end(sessionId: string, ownerId: string): Promise<void> {
    const roomName = this.roomName(sessionId);
    const env = this.requireConnection();
    const rooms = new RoomServiceClient(
      env.url.replace(/^ws(s?):\/\//, 'http$1://'),
      env.apiKey,
      env.apiSecret,
    );
    try {
      const [room] = await rooms.listRooms([roomName]);
      if (!room) return;
      let data: { kind?: string; ownerId?: string; sessionId?: string };
      try {
        data = JSON.parse(room.metadata) as typeof data;
      } catch {
        throw new ForbiddenException('GROK_PROMO_SESSION_FORBIDDEN');
      }
      if (
        !data ||
        data.kind !== 'admin-promo-grok' ||
        data.ownerId !== ownerId ||
        data.sessionId !== sessionId
      )
        throw new ForbiddenException('GROK_PROMO_SESSION_FORBIDDEN');
      await rooms.deleteRoom(roomName);
    } catch (error) {
      if (error instanceof ForbiddenException) throw error;
      this.logger.error('Grok promo room closure failed');
      throw new ServiceUnavailableException('GROK_PROMO_END_FAILED');
    }
  }

  private roomName(sessionId: string): string {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        sessionId,
      )
    ) {
      throw new BadRequestException('GROK_PROMO_INVALID_SESSION');
    }
    return `grok-promo-${sessionId}`;
  }

  private requireConnection() {
    if (!this.configured()) {
      throw new ServiceUnavailableException('GROK_PROMO_NOT_CONFIGURED');
    }
    return connection();
  }
}
