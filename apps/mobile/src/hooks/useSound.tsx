/* eslint-disable react-hooks/immutability -- expo-audio exposes imperative player controls. */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAudioPlayer } from "expo-audio";
import { useSettingsStore } from "@/store/settings.store";
import { activatePlaybackAudio } from "@/utils/audio-session";

export type SoundKey = "click" | "combo";

const SOURCES = {
  click: require("../../assets/sounds/click.mp3"),
  combo: require("../../assets/sounds/combo.mp3"),
};

export interface SoundPlaybackOptions {
  volume?: number;
  respectSoundSettings?: boolean;
}

interface SoundContextValue {
  play: (key: SoundKey, options?: SoundPlaybackOptions) => void;
}

const SoundContext = createContext<SoundContextValue>({ play: () => {} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // 각 사운드를 root에서 한 번만 로드 (preload)
  const clickPlayer = useAudioPlayer(SOURCES.click, {
    keepAudioSessionActive: true,
  });
  const comboPlayer = useAudioPlayer(SOURCES.combo, {
    keepAudioSessionActive: true,
  });

  useEffect(() => {
    // 무음모드여도 들리게 + 다른 앱 백그라운드 음악 안 멈춤
    void activatePlaybackAudio("mixWithOthers").catch(() => undefined);
  }, []);

  const play = useCallback(
    (key: SoundKey, options?: SoundPlaybackOptions) => {
      // 설정을 구독하지 않고 그때그때 읽는다.
      // 볼륨이 바뀔 때마다 Provider 가 리렌더되면 플레이어가 다시 만들어진다.
      const { sound, muted } = useSettingsStore.getState();
      const respectsSettings = options?.respectSoundSettings ?? true;
      if (respectsSettings && muted) return;

      const player = key === "click" ? clickPlayer : comboPlayer;
      // click 은 자판 소리, combo 는 효과음으로 분리해서 조절
      const configuredVolume =
        key === "click" ? sound.keyVolume : sound.sfxVolume;
      const volume = Math.min(
        1,
        Math.max(0, options?.volume ?? configuredVolume),
      );
      if (volume <= 0) return;

      void (async () => {
        try {
          await activatePlaybackAudio("mixWithOthers").catch(() => undefined);
          player.volume = volume;
          if (player.isLoaded) await player.seekTo(0);
          player.play();
        } catch {
          // 사운드 못 틀어도 앱은 계속 돌아가게
        }
      })();
    },
    [clickPlayer, comboPlayer],
  );

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
