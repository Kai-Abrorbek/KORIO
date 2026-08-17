import { setAudioModeAsync, setIsAudioActiveAsync } from "expo-audio";

export type PlaybackInterruptionMode = "doNotMix" | "mixWithOthers";

type AudioSessionMode = PlaybackInterruptionMode | "recording";

let activeMode: AudioSessionMode | null = null;
let audioSessionQueue: Promise<void> = Promise.resolve();

function configureAudioSession(
  mode: AudioSessionMode,
  configure: () => Promise<void>,
) {
  const update = audioSessionQueue.then(async () => {
    // 같은 모드라도 매번 적용한다. 네이티브 전역 세션은 녹음·다른 플레이어·
    // 포커스 상실로 우리 모르게 바뀔 수 있는데, JS 캐시만 믿고 건너뛰면
    // playsInSilentMode 가 false 인 채로 남아 play() 가 조용히 무시된다.
    await setIsAudioActiveAsync(true);
    await configure();
    activeMode = mode;
  });

  // 여러 플레이어가 동시에 모드를 바꿔도 네이티브 전역 세션 변경 순서를 보장한다.
  audioSessionQueue = update.catch(() => undefined);
  return update;
}

/** 녹음 뒤에도 남는 전역 오디오 모드를 스피커 재생용으로 되돌린다. */
export async function activatePlaybackAudio(
  interruptionMode: PlaybackInterruptionMode,
) {
  await configureAudioSession(interruptionMode, () =>
    setAudioModeAsync({
      allowsRecording: false,
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      shouldRouteThroughEarpiece: false,
      interruptionMode,
    }),
  );
}

/** 재생 세션 캐시까지 갱신해 녹음 직후 스피커 복원이 생략되지 않게 한다. */
export async function activateRecordingAudio() {
  await configureAudioSession("recording", () =>
    setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    }),
  );
}
