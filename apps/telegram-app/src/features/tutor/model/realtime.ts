import {
  acquireMicrophoneStream,
  setSharedMicrophoneEnabled,
} from "../../../shared/browser/microphone-session";

const OPENAI_CALLS = "https://api.openai.com/v1/realtime/calls";

export interface RealtimeConnection {
  send: (event: unknown) => void;
  setMicEnabled: (enabled: boolean) => void;
  close: () => void;
}

interface RealtimeHandlers {
  onEvent?: (event: unknown) => void;
  onDataChannelOpen?: (send: (event: unknown) => void) => void;
  onConnectionState?: (state: RTCPeerConnectionState) => void;
  onError?: (error: Error) => void;
}

/** OpenAI Realtime에 브라우저 WebRTC 음성 연결을 연다. */
export async function connectRealtime(
  clientSecret: string,
  model: string,
  handlers: RealtimeHandlers = {},
): Promise<RealtimeConnection> {
  if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection) {
    throw new Error("MIC_UNSUPPORTED");
  }

  let localStream: MediaStream;
  try {
    localStream = await acquireMicrophoneStream();
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      throw new Error("MIC_PERMISSION_DENIED");
    }
    throw error;
  }

  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });
  const remoteAudio = document.createElement("audio");
  remoteAudio.autoplay = true;
  remoteAudio.setAttribute("playsinline", "");
  remoteAudio.hidden = true;
  document.body.append(remoteAudio);

  let closed = false;
  const cleanup = () => {
    if (closed) return;
    closed = true;
    setSharedMicrophoneEnabled(false);
    remoteAudio.pause();
    remoteAudio.srcObject = null;
    remoteAudio.remove();
    try {
      peer.close();
    } catch {
      // 이미 닫힌 연결은 그대로 둔다.
    }
  };

  peer.onconnectionstatechange = () => {
    handlers.onConnectionState?.(peer.connectionState);
    if (peer.connectionState === "failed" || peer.connectionState === "closed") {
      cleanup();
    }
  };
  peer.ontrack = (event) => {
    const [stream] = event.streams;
    if (!stream) return;
    remoteAudio.srcObject = stream;
    void remoteAudio.play().catch(() => undefined);
  };
  localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));

  const channel = peer.createDataChannel("oai-events");
  const pending: unknown[] = [];
  const send = (event: unknown) => {
    if (channel.readyState === "open") {
      channel.send(JSON.stringify(event));
    } else {
      pending.push(event);
    }
  };
  channel.onmessage = (event) => {
    try {
      handlers.onEvent?.(JSON.parse(String(event.data)) as unknown);
    } catch {
      // 알 수 없는 Realtime 메시지는 화면 상태에 반영하지 않는다.
    }
  };
  channel.onerror = () => handlers.onError?.(new Error("DATA_CHANNEL_ERROR"));
  channel.onopen = () => {
    while (pending.length) {
      const event = pending.shift();
      if (event === undefined) break;
      channel.send(JSON.stringify(event));
    }
    handlers.onDataChannelOpen?.(send);
  };

  try {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const response = await fetch(
      `${OPENAI_CALLS}?model=${encodeURIComponent(model)}`,
      {
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${clientSecret}`,
          "Content-Type": "application/sdp",
        },
        method: "POST",
      },
    );
    if (!response.ok) throw new Error(`REALTIME_SDP_FAILED_${response.status}`);
    await peer.setRemoteDescription({
      sdp: await response.text(),
      type: "answer",
    });
  } catch (error) {
    cleanup();
    throw error;
  }

  return {
    close: cleanup,
    send,
    setMicEnabled: (enabled) => {
      setSharedMicrophoneEnabled(enabled);
    },
  };
}
