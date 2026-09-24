const AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  autoGainControl: true,
  echoCancellation: true,
  noiseSuppression: true,
};

let sharedStream: MediaStream | null = null;
let sharedRequest: Promise<MediaStream> | null = null;
let permissionDenied: DOMException | null = null;

function isLive(stream: MediaStream | null): stream is MediaStream {
  return Boolean(
    stream?.getAudioTracks().some((track) => track.readyState === "live"),
  );
}

function setEnabled(stream: MediaStream, enabled: boolean) {
  stream.getAudioTracks().forEach((track) => {
    track.enabled = enabled;
  });
}

async function microphoneStream() {
  if (isLive(sharedStream)) return sharedStream;
  if (sharedRequest) return sharedRequest;
  if (permissionDenied) throw permissionDenied;
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("MIC_UNSUPPORTED");
  }

  const pending = navigator.mediaDevices
    .getUserMedia({ audio: AUDIO_CONSTRAINTS, video: false })
    .then((stream) => {
      sharedStream = stream;
      stream.getAudioTracks().forEach((track) => {
        track.addEventListener("ended", () => {
          if (!isLive(stream) && sharedStream === stream) sharedStream = null;
        });
      });
      return stream;
    });
  sharedRequest = pending;
  try {
    return await pending;
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      permissionDenied = error;
    }
    throw error;
  } finally {
    if (sharedRequest === pending) sharedRequest = null;
  }
}

export async function prepareMicrophoneSession() {
  const stream = await microphoneStream();
  setEnabled(stream, false);
}

export async function acquireMicrophoneStream() {
  const stream = await microphoneStream();
  setEnabled(stream, true);
  return stream;
}

export function setSharedMicrophoneEnabled(enabled: boolean) {
  if (isLive(sharedStream)) setEnabled(sharedStream, enabled);
}

export function releaseMicrophoneSession() {
  sharedStream?.getTracks().forEach((track) => track.stop());
  sharedStream = null;
  sharedRequest = null;
  permissionDenied = null;
}
