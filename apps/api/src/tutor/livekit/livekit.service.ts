import {
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AccessToken, AgentDispatchClient, TrackSource } from 'livekit-server-sdk';
import {
  TOKEN_TTL_SEC,
  isLiveKitConfigured,
  learnerIdentity,
  liveKitEnv,
  tutorRoomName,
} from './livekit.const';
import {
  encodeDispatchMetadata,
  type TutorDispatchMetadata,
} from './dispatch-metadata';

export interface LiveKitGrant {
  serverUrl: string;
  roomName: string;
  participantToken: string;
}

/**
 * LiveKit 방 하나를 준비한다.
 *
 * 두 가지만 한다:
 *  1) Tutor Agent 를 그 방으로 **명시적으로** 부른다 (explicit dispatch)
 *  2) 학습자용 참가자 토큰을 만든다
 *
 * ⚠️ API_SECRET 과 GOOGLE_API_KEY 는 이 프로세스(와 Agent) 밖으로 안 나간다.
 *    앱이 받는 건 이 방 하나에만 15분간 들어갈 수 있는 토큰뿐이다.
 */
@Injectable()
export class LiveKitService implements OnModuleInit {
  private readonly logger = new Logger(LiveKitService.name);
  private dispatchClient?: AgentDispatchClient;

  onModuleInit() {
    // ⚠️ 여기서 읽는 이유: onModuleInit 은 ConfigModule 이 dotenv 를 다 읽은
    //    **뒤에** 돈다. 모듈 최상단에서 읽으면 .env 값이 무시된다.
    const env = liveKitEnv();
    if (!isLiveKitConfigured()) {
      // 켜 두고 잊는 사고를 막는다. 설정이 없으면 튜터 세션은 503 이 된다.
      // 뭐가 비었는지까지 찍는다 — "없다"만 찍으면 어느 줄인지 찾느라 시간을 쓴다
      const missing = [
        !env.url && 'LIVEKIT_URL',
        !env.apiKey && 'LIVEKIT_API_KEY',
        !env.apiSecret && 'LIVEKIT_API_SECRET',
      ].filter(Boolean);
      this.logger.warn(
        `${missing.join(' / ')} 가 없다 — AI 튜터 통화가 비활성이다`,
      );
      return;
    }
    this.logger.log(`LiveKit 튜터: ${env.url} · agent=${env.agentName}`);
  }

  /**
   * dispatch 는 HTTP API 다. 클라이언트가 붙는 wss:// 주소를 그대로 쓰면
   * 안 되고 https:// 로 바꿔야 한다. 실수하기 쉬운 자리라 한 곳에 둔다.
   */
  private get httpHost(): string {
    return liveKitEnv().url.replace(/^ws(s?):\/\//, 'http$1://');
  }

  private get dispatch(): AgentDispatchClient {
    if (!this.dispatchClient) {
      const env = liveKitEnv();
      this.dispatchClient = new AgentDispatchClient(
        this.httpHost,
        env.apiKey,
        env.apiSecret,
      );
    }
    return this.dispatchClient;
  }

  /**
   * 세션 하나를 위한 방 + 토큰.
   *
   * 순서가 중요하다: **Agent 를 먼저 부르고** 토큰을 준다. 반대로 하면
   * 앱이 빈 방에 먼저 들어가서 "연결은 됐는데 아무 말도 안 하는" 화면을
   * 몇 초 보게 된다. dispatch 가 실패하면 토큰을 아예 안 준다 —
   * 선생님 없는 방에 들여보내지 않는다.
   */
  async prepareRoom(meta: TutorDispatchMetadata): Promise<LiveKitGrant> {
    if (!isLiveKitConfigured()) {
      throw new ServiceUnavailableException('TUTOR_NOT_CONFIGURED');
    }

    const env = liveKitEnv();
    const roomName = tutorRoomName(meta.sessionId);

    try {
      await this.dispatch.createDispatch(roomName, env.agentName, {
        metadata: encodeDispatchMetadata(meta),
      });
    } catch (e) {
      // 본문에 키가 실릴 수 있어 로그에만 남긴다
      this.logger.error(
        `Agent dispatch 실패 (room=${roomName}): ${(e as Error)?.message ?? e}`,
      );
      throw new ServiceUnavailableException('TUTOR_SESSION_FAILED');
    }

    const participantToken = await this.mintToken(roomName, meta.sessionId);
    return { serverUrl: env.url, roomName, participantToken };
  }

  /**
   * 학습자 토큰.
   *
   * 권한을 최소로 준다:
   *  · roomJoin + room  — 이 방 하나에만 들어간다
   *  · canPublish + MICROPHONE  — 마이크만. 카메라·화면공유는 못 켠다
   *  · canSubscribe  — 선생님 목소리를 듣는다
   *  · canPublishData: false  — 앱은 데이터를 보낼 일이 없다. 자막은
   *      Agent → 앱 **단방향** text stream 이고, 받는 건 canSubscribe 소관이다.
   *      (자막이나 RPC 가 안 되면 여기를 제일 먼저 의심할 것)
   *
   * roomAdmin / roomCreate 는 절대 주지 않는다 — 그건 API 키 급 권한이다.
   */
  private mintToken(roomName: string, sessionId: string): Promise<string> {
    const env = liveKitEnv();
    const at = new AccessToken(env.apiKey, env.apiSecret, {
      identity: learnerIdentity(sessionId),
      ttl: TOKEN_TTL_SEC,
    });
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canPublishSources: [TrackSource.MICROPHONE],
      canSubscribe: true,
      canPublishData: false,
      canUpdateOwnMetadata: false,
    });
    return at.toJwt();
  }
}
