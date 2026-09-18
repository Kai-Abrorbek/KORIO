import {
  AudioSession,
  AndroidAudioTypePresets,
} from "@livekit/react-native";
import {
  ConnectionState,
  Room,
  RoomEvent,
  type Participant,
  type RemoteParticipant,
  type TextStreamReader,
} from "livekit-client";

/**
 * LiveKit 튜터 연결 하나.
 *
 *   마이크 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──▶ Gemini 3.8 Live
 *                                                      │
 *   스피커 ◀──WebRTC── LiveKit ◀────────────────────────┘
 *
 * ── 예전 구조와 뭐가 다른가 ──
 *
 * 직접 만들던 걸 전부 안 만든다: SDP 교환, 데이터 채널 이벤트, PCM 조립,
 * 끼어들기 취소, 에코 제거. WebRTC 가 에코 제거와 통화 오디오 경로를
 * 담당하고, 끼어들기는 Agent 쪽 AgentSession 이 처리한다.
 *
 * 이 파일이 책임지는 것: 연결 · 마이크 · **자막 해석** 세 가지.
 */

/** Agent 가 자기 상태를 적어두는 참가자 attribute */
const ATTR_AGENT_STATE = "lk.agent.state";

/** 자막이 흐르는 text stream 토픽 */
const TOPIC_TRANSCRIPTION = "lk.transcription";
/** 확정 자막인지 */
const ATTR_FINAL = "lk.transcription_final";
/** 같은 한 마디를 묶는 id. interim → final 중복을 막는 열쇠 */
const ATTR_SEGMENT_ID = "lk.segment_id";

/**
 * Agent 가 보고하는 상태.
 *
 * ⚠️ 이건 우리가 만든 목록이 아니라 LiveKit Agents 의 AgentState 다.
 *    ('initializing' | 'idle' | 'listening' | 'thinking' | 'speaking')
 *    훅에서 우리 TutorState 로 옮긴다.
 */
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
  /** 확정본인가. interim 은 화면에만 쓰고 기록엔 넣지 않는다 */
  isFinal: boolean;
  /** 같은 한 마디를 잇는 id */
  segmentId: string;
}

export interface LiveKitTutorHandlers {
  onAgentState?: (state: LiveKitAgentState) => void;
  onTranscript?: (chunk: TranscriptChunk) => void;
  /** 방이 끊겼다. 유저가 끊은 게 아니면 에러로 다룬다 */
  onDisconnected?: (reason?: string) => void;
  onError?: (e: Error) => void;
}

export interface LiveKitTutorConnection {
  room: Room;
  setMicEnabled: (on: boolean) => void;
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
  /**
   * 통화 오디오 경로.
   *
   * ⚠️ 이게 예전에 손으로 씨름하던 AEC 문제의 답이다. `communication` 프리셋은
   *    안드로이드에서 VOICE_COMMUNICATION 스트림을 잡고, 그게 곧 플랫폼의
   *    하드웨어 에코 제거다. 직접 PCM 을 재던 시절엔 이 손잡이가 아예 없었다.
   *
   * ⚠️ `media` 로 두면 스피커 소리가 마이크로 돌아와서 선생님이 자기 말에
   *    끼어든다. 회화 앱에서 제일 티 나는 고장이다.
   */
  await AudioSession.configureAudio({
    android: {
      // 이어폰/블루투스가 없으면 스피커로. 수화기로 나가면 "소리가 안 난다"는
      // 문의가 그대로 온다
      preferredOutputList: ["speaker"],
      audioTypeOptions: AndroidAudioTypePresets.communication,
    },
    ios: { defaultOutput: "speaker" },
  });
  await AudioSession.startAudioSession();

  const room = new Room({
    // 마이크는 통화 품질 기준으로. 음악이 아니라 말이다
    adaptiveStream: false,
    dynacast: false,
  });

  /**
   * 델타를 이어 붙이는 버퍼.
   *
   * ⚠️ 키가 **스트림 id** 지 segmentId 가 아니다. Agent 는 한 마디에 대해
   *    interim 스트림과 final 스트림을 따로 여는데 **segmentId 는 둘이
   *    같다.** segmentId 로 잡으면 두 스트림이 겹치는 순간 같은 말이 두 번
   *    이어 붙어서 "안녕하세요안녕하세요" 가 된다.
   */
  const buffers = new Map<string, string>();

  let closed = false;
  const close = async () => {
    if (closed) return;
    closed = true;
    try {
      room.unregisterTextStreamHandler(TOPIC_TRANSCRIPTION);
    } catch {
      /* 등록 전이면 그만 */
    }
    try {
      await room.disconnect();
    } catch {
      /* 이미 끊겼으면 그만 */
    }
    try {
      await AudioSession.stopAudioSession();
    } catch {
      /* 다른 화면이 쓰고 있을 수 있다 */
    }
  };

  room
    .on(RoomEvent.Disconnected, (reason) => {
      handlers.onDisconnected?.(reason !== undefined ? String(reason) : undefined);
    })
    .on(RoomEvent.ConnectionStateChanged, (s) => {
      if (s === ConnectionState.Disconnected) handlers.onDisconnected?.();
    })
    /**
     * Agent 상태.
     *
     * Agent 는 자기 상태를 참가자 attribute 에 적는다. 예전 OpenAI 구조처럼
     * 이벤트 종류별로 상태를 **추론**하지 않는다 — 말하는 쪽이 직접 알려준다.
     */
    .on(
      RoomEvent.ParticipantAttributesChanged,
      (changed: Record<string, string>, participant: Participant) => {
        if (participant === room.localParticipant) return;
        const next = changed[ATTR_AGENT_STATE];
        if (next) handlers.onAgentState?.(next as LiveKitAgentState);
      },
    )
    .on(RoomEvent.ParticipantConnected, (p: RemoteParticipant) => {
      // 늦게 들어온 Agent 의 현재 상태를 한 번 읽어 준다.
      // attribute 는 "바뀔 때"만 이벤트가 오므로 입장 시점 값은 여기서 챙긴다
      const now = p.attributes?.[ATTR_AGENT_STATE];
      if (now) handlers.onAgentState?.(now as LiveKitAgentState);
    });

  /**
   * 자막.
   *
   * 학습자 자막도 **Agent 가** 보낸다 (Gemini 가 받아적은 것이다). 다만
   * 보낼 때 senderIdentity 를 학습자로 찍어주기 때문에, 받는 쪽에서는
   * identity 만 보면 누구 말인지 알 수 있다.
   */
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
            handlers.onTranscript?.({
              role,
              text,
              // 스트림이 닫히기 전까지는 확정이 아니다. 헤더의 final 플래그는
              // "이 스트림이 확정본을 싣고 있다"는 뜻이라 같이 본다
              isFinal: false,
              segmentId,
            });
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
        } catch (e) {
          // 자막 하나 놓친 걸로 통화를 끊지는 않는다
          buffers.delete(streamId);
          handlers.onError?.(e instanceof Error ? e : new Error("TRANSCRIPT_ERROR"));
        }
      })();
    },
  );

  try {
    await room.connect(grant.serverUrl, grant.participantToken);
    // 마이크는 연결 **뒤에** 켠다. 먼저 켜면 publish 할 곳이 없다
    await room.localParticipant.setMicrophoneEnabled(true);
  } catch (e) {
    await close();
    throw e instanceof Error ? e : new Error("LIVEKIT_CONNECT_FAILED");
  }

  return {
    room,
    /**
     * 마이크 토글.
     *
     * 트랙을 껐다 켜는 게 아니라 mute 다 — 껐다 켜면 재협상이 일어나서
     * 예문 하나 들려줄 때마다 소리가 튄다.
     */
    setMicEnabled: (on: boolean) => {
      void room.localParticipant?.setMicrophoneEnabled(on).catch(() => undefined);
    },
    close,
  };
}
