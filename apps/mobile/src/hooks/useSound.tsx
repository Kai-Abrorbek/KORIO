import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";

export type SoundKey = "click" | "combo";

const SOURCES = {
  click: require("../../assets/sounds/click.mp3"),
  combo: require("../../assets/sounds/combo.mp3"),
};

interface SoundContextValue {
  play: (key: SoundKey) => void;
}

const SoundContext = createContext<SoundContextValue>({ play: () => {} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // 각 사운드를 root에서 한 번만 로드 (preload)
  const clickPlayer = useAudioPlayer(SOURCES.click);
  const comboPlayer = useAudioPlayer(SOURCES.combo);

  useEffect(() => {
    // 무음모드여도 들리게 + 다른 앱 백그라운드 음악 안 멈춤
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "mixWithOthers",
      shouldPlayInBackground: false,
    }).catch(() => {});
  }, []);

  const play = useCallback(
    (key: SoundKey) => {
      const player = key === "click" ? clickPlayer : comboPlayer;
      try {
        player.seekTo(0);
        player.play();
      } catch {
        // 사운드 못 틀어도 앱은 계속 돌아가게
      }
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
