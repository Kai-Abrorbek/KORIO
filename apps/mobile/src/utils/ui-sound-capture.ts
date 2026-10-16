/** Capture owns the native audio session; interface sounds wait until it is released. */
const captures = new Set<symbol>();
const listeners = new Set<(blocked: boolean) => void>();

export const isUiSoundCaptureActive = () => captures.size > 0;

export function subscribeUiSoundCapture(listener: (blocked: boolean) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function holdUiSoundsForCapture() {
  const token = Symbol("audio-capture");
  const wasBlocked = isUiSoundCaptureActive();
  captures.add(token);
  if (!wasBlocked) listeners.forEach((listener) => listener(true));
  return () => {
    if (!captures.delete(token) || captures.size > 0) return;
    listeners.forEach((listener) => listener(false));
  };
}
