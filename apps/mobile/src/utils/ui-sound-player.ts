/** Small playback controller with separate tap/feedback requests, independent of React/native modules. */
export interface UiSoundPlayer {
  volume: number;
  seekTo: (seconds: number, before?: number, after?: number) => Promise<void>;
  play: () => void;
  pause: () => void;
}

export interface UiSoundPlaybackOptions {
  volume?: number;
  respectSoundSettings?: boolean;
}

export function createUiSoundPlayback<Key extends string>({
  players,
  isTap,
  volumeFor,
  prepareAudio,
  blocked,
}: {
  players: Record<Key, UiSoundPlayer>;
  isTap: (key: Key) => boolean;
  volumeFor: (key: Key, options?: UiSoundPlaybackOptions) => number;
  prepareAudio: () => Promise<void>;
  blocked: () => boolean;
}) {
  let revision = 0;
  const requests = { tap: 0, feedback: 0 };

  const pause = (player: UiSoundPlayer) => {
    try {
      player.pause();
    } catch {
      /* A released/failed player must not block the others. */
    }
  };

  const stop = () => {
    revision += 1;
    Object.values<UiSoundPlayer>(players).forEach(pause);
  };

  const play = async (key: Key, options?: UiSoundPlaybackOptions) => {
    if (blocked() || volumeFor(key, options) <= 0) return;
    const channel = isTap(key) ? "tap" : "feedback";
    const request = ++requests[channel];
    const startedRevision = revision;
    const cancelled = () =>
      startedRevision !== revision ||
      request !== requests[channel] ||
      blocked() ||
      volumeFor(key, options) <= 0;
    const player = players[key];

    try {
      await prepareAudio();
      if (cancelled()) return;
      // Android's direct isLoaded is false at STATE_ENDED. Always rewind, including
      // completed players, or subsequent button/answer sounds remain at their end.
      await player.seekTo(0, 0, 0);
      if (cancelled()) return;
      for (const otherKey of Object.keys(players) as Key[]) {
        if (otherKey !== key && isTap(otherKey) === isTap(key))
          pause(players[otherKey]);
      }
      player.volume = volumeFor(key, options);
      player.play();
    } catch {
      // Feedback audio must never stop navigation, learning, or recording controls.
    }
  };

  return { play, stop };
}
