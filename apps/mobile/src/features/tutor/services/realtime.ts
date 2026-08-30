import {
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
  type MediaStream,
} from "react-native-webrtc";

const OPENAI_CALLS = "https://api.openai.com/v1/realtime/calls";

/**
 * OpenAI Realtime 과의 WebRTC 연결 한 개.
 *
 * 왜 WebRTC 인가: STT → LLM → TTS 파이프라인을 직접 만들면 각 단계마다
 * 지연이 쌓이고, 무엇보다 **유저가 AI 말을 끊었을 때** 이미 생성된 오디오를
 * 버리는 처리를 직접 해야 한다. WebRTC 는 오디오가 실시간 트랙으로 흐르기
 * 때문에 서버가 끊으면 그냥 끊긴다.
 *
 * 이 파일은 연결만 책임진다. UI 상태·쿼터는 훅에서 다룬다.
 */
export interface RealtimeHandlers {
  /** 데이터 채널로 오는 서버 이벤트 (자막·상태 등) */
  onEvent?: (event: any) => void;
  onConnectionState?: (state: string) => void;
  onError?: (e: Error) => void;
}

export interface RealtimeConnection {
  pc: RTCPeerConnection;
  localStream: MediaStream;
  send: (event: unknown) => void;
  close: () => void;
}

export async function connectRealtime(
  clientSecret: string,
  model: string,
  handlers: RealtimeHandlers = {},
): Promise<RealtimeConnection> {
  // 마이크. 회화용이라 에코 제거·잡음 억제를 켠다 —
  // 안 켜면 스피커로 나간 AI 목소리를 마이크가 다시 주워서
  // AI 가 자기 말에 반응한다.
  const localStream = await mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: false,
  });

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  let closed = false;
  const cleanup = () => {
    if (closed) return;
    closed = true;
    try {
      localStream.getTracks().forEach((t) => t.stop());
    } catch {}
    try {
      pc.close();
    } catch {}
  };

  pc.addEventListener("connectionstatechange", () => {
    handlers.onConnectionState?.(pc.connectionState);
    if (pc.connectionState === "failed" || pc.connectionState === "closed") {
      cleanup();
    }
  });

  // AI 목소리는 원격 트랙으로 온다. RN 에선 트랙이 붙는 순간 자동 재생돼서
  // <audio> 같은 엘리먼트를 만들 필요가 없다.
  pc.addEventListener("track", () => {
    /* 재생은 네이티브가 알아서 한다 */
  });

  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // 이벤트 채널. 이름은 OpenAI 가 정한 값이다
  const dc = pc.createDataChannel("oai-events");
  dc.addEventListener("message", (e: any) => {
    try {
      handlers.onEvent?.(JSON.parse(e.data));
    } catch {
      /* 파싱 못 하는 메시지는 무시 */
    }
  });
  dc.addEventListener("error", () => {
    handlers.onError?.(new Error("DATA_CHANNEL_ERROR"));
  });

  const send = (event: unknown) => {
    if (dc.readyState === "open") {
      dc.send(JSON.stringify(event));
    }
  };

  const offer = await pc.createOffer({});
  await pc.setLocalDescription(offer);

  // SDP 를 주고받아 연결을 맺는다. 정식 API 키가 아니라 단명 토큰을 쓴다.
  const res = await fetch(`${OPENAI_CALLS}?model=${encodeURIComponent(model)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${clientSecret}`,
      "Content-Type": "application/sdp",
    },
    body: offer.sdp,
  });

  if (!res.ok) {
    cleanup();
    throw new Error(`REALTIME_SDP_FAILED_${res.status}`);
  }

  const answer = await res.text();
  await pc.setRemoteDescription(
    new RTCSessionDescription({ type: "answer", sdp: answer }),
  );

  return { pc, localStream, send, close: cleanup };
}
