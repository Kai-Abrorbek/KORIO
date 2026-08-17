import { setAudioModeAsync, setIsAudioActiveAsync } from "expo-audio";

export type PlaybackInterruptionMode = "doNotMix" | "mixWithOthers";

/** 녹음 뒤에도 남는 전역 오디오 모드를 스피커 재생용으로 되돌린다. */
export async function activatePlaybackAudio(
  interruptionMode: PlaybackInterruptionMode,
) {
  await setIsAudioActiveAsync(true);
  await setAudioModeAsync({
    allowsRecording: false,
    playsInSilentMode: true,
    shouldPlayInBackground: false,
    shouldRouteThroughEarpiece: false,
    interruptionMode,
  });
}
