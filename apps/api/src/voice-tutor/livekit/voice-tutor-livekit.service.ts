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
import { voiceTutorLiveKitEnv as liveKitEnv } from './livekit-env';
import type { ExplanationLanguage } from '../voice-tutor.config';

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
  /** 수업 언어. 워커가 STT 언어 힌트(ko + 이 언어)와 받아쓰기 프롬프트를 고르는 데 쓴다 */
  explanationLanguage?: ExplanationLanguage;
  /** 이번 수업 목표 단어 — 받아쓰기가 학습자 발음을 엉뚱한 단어로 듣지 않게 */
  sttKeywords?: string[];
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
    explanationLanguage?: ExplanationLanguage,
    sttKeywords: string[] = [],
    maxDurationSec: number = VOICE_TUTOR_MAX_DURATION_SEC,
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
      // 워커가 이 시간에 방을 닫는다 — 한도(quota)가 서버에서 강제되는 두 번째 자리
      maxDurationSec: Math.max(
        1,
        Math.min(VOICE_TUTOR_MAX_DURATION_SEC, Math.floor(maxDurationSec)),
      ),
      ...(explanationLanguage ? { explanationLanguage } : {}),
      ...(sttKeywords.length ? { sttKeywords } : {}),
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
      // 앱의 "멈추기" 버튼은 에이전트에게 RPC(voice_tutor_interrupt)를 보낸다.
      // RPC 는 데이터 채널로 가므로 이게 false 면 권한 오류로 늘 실패했다.
      // 에이전트 쪽 RPC 는 호출자 identity 를 확인하므로 열어도 된다
      canPublishData: true,
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
