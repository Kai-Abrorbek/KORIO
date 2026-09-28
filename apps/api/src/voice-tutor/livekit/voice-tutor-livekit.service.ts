import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  AccessToken,
  AgentDispatchClient,
  TrackSource,
} from 'livekit-server-sdk';
import { liveKitEnv } from '../../tutor/livekit/livekit.const';

const AGENT_TOKEN_TTL_SEC = 65 * 60;
const PARTICIPANT_TOKEN_TTL_SEC = 15 * 60;
export const VOICE_TUTOR_MAX_DURATION_SEC = 60 * 60;

export interface VoiceTutorDispatchMetadata {
  version: 1;
  kind: 'voice-tutor';
  sessionId: string;
  agentToken: string;
  voiceId: string;
  greeting: { displayText: string; speechText: string };
  maxDurationSec: number;
}

export interface VoiceTutorLiveKitGrant {
  serverUrl: string;
  roomName: string;
  participantToken: string;
}

@Injectable()
export class VoiceTutorLiveKitService {
  private readonly logger = new Logger(VoiceTutorLiveKitService.name);

  async prepareRoom(
    sessionId: string,
    voiceId: string,
    greeting: { displayText: string; speechText: string },
  ): Promise<VoiceTutorLiveKitGrant> {
    const env = liveKitEnv();
    if (!env.url || !env.apiKey || !env.apiSecret) {
      throw new ServiceUnavailableException(
        'VOICE_TUTOR_LIVEKIT_NOT_CONFIGURED',
      );
    }
    const roomName = `voice-tutor-${sessionId}`;
    const agentName =
      process.env.VOICE_TUTOR_LIVEKIT_AGENT_NAME?.trim() || 'korio-voice-tutor';
    const metadata: VoiceTutorDispatchMetadata = {
      version: 1,
      kind: 'voice-tutor',
      sessionId,
      agentToken: this.mintAgentToken(sessionId, env.apiSecret),
      voiceId,
      greeting,
      maxDurationSec: VOICE_TUTOR_MAX_DURATION_SEC,
    };
    try {
      const dispatch = new AgentDispatchClient(
        env.url.replace(/^ws(s?):\/\//, 'http$1://'),
        env.apiKey,
        env.apiSecret,
      );
      await dispatch.createDispatch(roomName, agentName, {
        metadata: JSON.stringify(metadata),
      });
    } catch (error) {
      this.logger.error(
        `Voice Tutor dispatch failed for ${roomName}: ${error instanceof Error ? error.name : 'unknown'}`,
      );
      throw new ServiceUnavailableException('VOICE_TUTOR_SESSION_FAILED');
    }

    const token = new AccessToken(env.apiKey, env.apiSecret, {
      identity: `voice-learner-${sessionId}`,
      ttl: PARTICIPANT_TOKEN_TTL_SEC,
    });
    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canPublishSources: [TrackSource.MICROPHONE],
      canSubscribe: true,
      canPublishData: false,
      canUpdateOwnMetadata: false,
    });
    return {
      serverUrl: env.url,
      roomName,
      participantToken: await token.toJwt(),
    };
  }

  verifyAgentToken(sessionId: string, authorization?: string): void {
    const secret = liveKitEnv().apiSecret;
    const match = /^Bearer ([A-Za-z0-9._-]+)$/.exec(authorization ?? '');
    if (!secret || !match) throw new UnauthorizedException();
    const [tokenSessionId, expiresRaw, signature, extra] = match[1].split('.');
    const expires = Number(expiresRaw);
    if (
      extra ||
      tokenSessionId !== sessionId ||
      !Number.isSafeInteger(expires) ||
      expires <= Math.floor(Date.now() / 1000) ||
      expires > Math.floor(Date.now() / 1000) + AGENT_TOKEN_TTL_SEC ||
      !signature
    ) {
      throw new UnauthorizedException();
    }
    const expected = this.signAgentToken(sessionId, expires, secret);
    const actual = Buffer.from(signature);
    const wanted = Buffer.from(expected);
    if (actual.length !== wanted.length || !timingSafeEqual(actual, wanted)) {
      throw new UnauthorizedException();
    }
  }

  private mintAgentToken(sessionId: string, secret: string): string {
    const expires = Math.floor(Date.now() / 1000) + AGENT_TOKEN_TTL_SEC;
    return `${sessionId}.${expires}.${this.signAgentToken(sessionId, expires, secret)}`;
  }

  private signAgentToken(
    sessionId: string,
    expires: number,
    secret: string,
  ): string {
    return createHmac('sha256', secret)
      .update(`voice-tutor-agent-turn:${sessionId}:${expires}`)
      .digest('base64url');
  }
}
