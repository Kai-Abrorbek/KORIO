import {
  ConnectionState,
  Room,
  RoomEvent,
  Track,
  type Participant,
  type RemoteParticipant,
  type RemoteTrack,
  type TextStreamReader,
} from "livekit-client";

import {
  acquireMicrophoneStream,
  setSharedMicrophoneEnabled,
} from "../../../shared/browser/microphone-session";

/**
 * LiveKit 튜터 연결 하나 — 모바일 services/livekit-tutor.ts 의 웹 버전.
 *
 *   마이크 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──▶ Gemini Live
 *   스피커 ◀──WebRTC── LiveKit ◀──────────────────────┘
 *
 * ⚠️ 서버 /tutor/session 은 이제 OpenAI clientSecret 이 아니라 LiveKit grant 를
 *    준다. 예전 OpenAI 직결 코드는 "Bearer undefined" 로 401 이 나면서 통화가
 *    아예 안 붙었고, 실패할 때마다 서버 세션만 열렸다 닫혔다.
 *
 * 모바일과 다른 점 (웹이라서):
 *  - AudioSession 이 없다. 에코 제거는 getUserMedia 제약(echoCancellation)이 한다.
 *  - 원격 오디오를 직접 <audio> 에 붙여야 소리가 난다 (RN 은 자동 재생).
 *  - 자동재생 정책에 막히면 room.startAudio() 를 사용자 탭 안에서 다시 불러야 한다.
 *  - 마이크는 앱 공용 스트림(microphone-session)의 **복제 트랙**을 올린다.
 *    공용 스트림을 그대로 올리면 방을 나갈 때 LiveKit 이 트랙을 멈춰서
 *    다른 화면(발음 채점 등)이 권한을 다시 물어본다.
 */

const ATTR_AGENT_STATE = "lk.agent.state";
const TOPIC_TRANSCRIPTION = "lk.transcription";
const ATTR_FINAL = "lk.transcription_final";
const ATTR_SEGMENT_ID = "lk.segment_id";

/** 이 시간 안에 Agent 가 상태를 한 번도 안 알리면 고장으로 본다 (모바일과 같은 값) */
const AGENT_WATCHDOG_MS = 20_000;

export type LiveKitAgentState =
  | "initializing"
  | "idle"
  | "listening"
  | "thinking"
  | "speaking";

export interface TranscriptChunk {
  role: "user" | "tutor";
  /** 지금까지 쌓인 이 한 마디의 전체 텍스트 (델타가 아니다) */
  text: string;
  isFinal: boolean;
  segmentId: string;
}

export interface LiveKitTutorHandlers {
  onAgentState?: (state: LiveKitAgentState) => void;
  onTranscript?: (chunk: TranscriptChunk) => void;
  onAgentMissing?: () => void;
  onDisconnected?: (reason?: string) => void;
  onError?: (error: Error) => void;
  /** 브라우저가 소리 재생을 막았다 (true) / 풀렸다 (false) */
  onAudioBlocked?: (blocked: boolean) => void;
}

export interface LiveKitTutorConnection {
  setMicEnabled: (on: boolean) => void;
  /** 자동재생이 막혔을 때 사용자 탭 안에서 부른다 */
  resumeAudio: () => Promise<boolean>;
  close: () => Promise<void>;
}

export interface LiveKitGrant {
  serverUrl: string;
  roomName: string;
  participantToken: string;
}

export async function connectLiveKitTutor(
  grant: LiveKitGrant,
  handlers: LiveKitTutorHandlers = {},
): Promise<LiveKitTutorConnection> {
  if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection) {
    throw new Error("MIC_UNSUPPORTED");
  }

  let micTrack: MediaStreamTrack;
  try {
    const stream = await acquireMicrophoneStream();
    const source = stream.getAudioTracks()[0];
    if (!source) throw new Error("MIC_UNSUPPORTED");
    micTrack = source.clone();
    micTrack.enabled = true;
    // 원본은 계속 꺼둔다. 통화에서 쓰는 건 복제본이다
    setSharedMicrophoneEnabled(false);
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      throw new Error("MIC_PERMISSION_DENIED");
    }
    throw error instanceof Error ? error : new Error("MIC_UNSUPPORTED");
  }

  const room = new Room({ adaptiveStream: false, dynacast: false });

  /** 스트림 id 별 버퍼. segmentId 로 잡으면 interim/final 스트림이 겹쳐 두 번 붙는다 */
  const buffers = new Map<string, string>();
  const audioElements = new Set<HTMLMediaElement>();

  let agentSeen = false;
  let watchdog: ReturnType<typeof setTimeout> | undefined;

  const reportAgentState = (next: string) => {
    if (!agentSeen) {
      agentSeen = true;
      if (watchdog) clearTimeout(watchdog);
      watchdog = undefined;
    }
    handlers.onAgentState?.(next as LiveKitAgentState);
  };

  let closed = false;
  const close = async () => {
    if (closed) return;
    closed = true;
    if (watchdog) clearTimeout(watchdog);
    watchdog = undefined;
    try {
      room.unregisterTextStreamHandler(TOPIC_TRANSCRIPTION);
    } catch {
      // 등록 전이면 그만
    }
    try {
      await room.disconnect(true);
    } catch {
      // 이미 끊겼으면 그만
    }
    micTrack.stop();
    audioElements.forEach((element) => {
      element.pause();
      element.srcObject = null;
      element.remove();
    });
    audioElements.clear();
  };

  const attachAudio = (track: RemoteTrack) => {
    if (track.kind !== Track.Kind.Audio) return;
    const element = track.attach();
    element.hidden = true;
    element.setAttribute("playsinline", "");
    document.body.append(element);
    audioElements.add(element);
  };

  room
    .on(RoomEvent.Disconnected, (reason) => {
      if (closed) return;
      handlers.onDisconnected?.(reason !== undefined ? String(reason) : undefined);
    })
    .on(RoomEvent.ConnectionStateChanged, (state) => {
      if (closed) return;
      if (state === ConnectionState.Disconnected) handlers.onDisconnected?.();
    })
    .on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => attachAudio(track))
    .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
      track.detach().forEach((element) => {
        audioElements.delete(element);
        element.remove();
      });
    })
    .on(RoomEvent.AudioPlaybackStatusChanged, () => {
      handlers.onAudioBlocked?.(!room.canPlaybackAudio);
    })
    .on(
      RoomEvent.ParticipantAttributesChanged,
      (changed: Record<string, string>, participant: Participant) => {
        if (participant === room.localParticipant) return;
        const next = changed[ATTR_AGENT_STATE];
        if (next) reportAgentState(next);
      },
    )
    .on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      const now = participant.attributes?.[ATTR_AGENT_STATE];
      if (now) reportAgentState(now);
    });

  room.registerTextStreamHandler(
    TOPIC_TRANSCRIPTION,
    (reader: TextStreamReader, info: { identity: string }) => {
      const attrs = reader.info.attributes ?? {};
      const streamId = reader.info.id;
      const segmentId = attrs[ATTR_SEGMENT_ID] ?? streamId;
      const role: TranscriptChunk["role"] =
        info.identity === room.localParticipant?.identity ? "user" : "tutor";

      void (async () => {
        try {
          for await (const delta of reader) {
            const text = (buffers.get(streamId) ?? "") + delta;
            buffers.set(streamId, text);
            handlers.onTranscript?.({ role, text, isFinal: false, segmentId });
          }
          const text = buffers.get(streamId) ?? "";
          buffers.delete(streamId);
          if (text.trim()) {
            handlers.onTranscript?.({
              role,
              text,
              isFinal: attrs[ATTR_FINAL] === "true",
              segmentId,
            });
          }
        } catch (error) {
          // 자막 하나 놓친 걸로 통화를 끊지는 않는다
          buffers.delete(streamId);
          handlers.onError?.(error instanceof Error ? error : new Error("TRANSCRIPT_ERROR"));
        }
      })();
    },
  );

  try {
    await room.connect(grant.serverUrl, grant.participantToken);
    await room.localParticipant.publishTrack(micTrack, {
      source: Track.Source.Microphone,
    });

    // 시작 버튼 탭의 여운이 남아 있을 때 재생을 풀어 둔다
    await room.startAudio().catch(() => undefined);
    if (!room.canPlaybackAudio) handlers.onAudioBlocked?.(true);

    for (const participant of room.remoteParticipants.values()) {
      const now = participant.attributes?.[ATTR_AGENT_STATE];
      if (now) reportAgentState(now);
    }

    if (!agentSeen) {
      watchdog = setTimeout(() => {
        if (agentSeen || closed) return;
        handlers.onAgentMissing?.();
      }, AGENT_WATCHDOG_MS);
    }
  } catch (error) {
    await close();
    throw error instanceof Error ? error : new Error("LIVEKIT_CONNECT_FAILED");
  }

  return {
    setMicEnabled: (on: boolean) => {
      void room.localParticipant
        ?.setMicrophoneEnabled(on)
        .catch(() => undefined);
    },
    resumeAudio: async () => {
      try {
        await room.startAudio();
      } catch {
        // 아래에서 상태로 판단한다
      }
      const ok = room.canPlaybackAudio;
      handlers.onAudioBlocked?.(!ok);
      return ok;
    },
    close,
  };
}
