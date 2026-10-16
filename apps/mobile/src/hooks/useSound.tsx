import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useAudioPlayer } from "expo-audio";
import { useSettingsStore } from "@/store/settings.store";
import { activatePlaybackAudio } from "@/utils/audio-session";

export type SoundKey =
  | "click"
  | "select"
  | "correct"
  | "correctAlt"
  | "wrong"
  | "combo"
  | "comboBig"
  | "lessonComplete"
  | "chestOpen"
  | "chestOpenRare"
  | "levelUp";

const SOURCES = {
  click: require("../../assets/sounds/click.wav"),
  select: require("../../assets/sounds/select.wav"),
  correct: require("../../assets/sounds/correct.wav"),
  correctAlt: require("../../assets/sounds/correct-alt.wav"),
  wrong: require("../../assets/sounds/wrong.wav"),
  combo: require("../../assets/sounds/combo.wav"),
  comboBig: require("../../assets/sounds/combo-big.wav"),
  lessonComplete: require("../../assets/sounds/lesson-complete.wav"),
  chestOpen: require("../../assets/sounds/chest-open.wav"),
  chestOpenRare: require("../../assets/sounds/chest-open-rare.wav"),
  levelUp: require("../../assets/sounds/level-up.wav"),
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
  const selectPlayer = useAudioPlayer(SOURCES.select, {
    keepAudioSessionActive: true,
  });
  const correctPlayer = useAudioPlayer(SOURCES.correct, {
    keepAudioSessionActive: true,
  });
  const correctAltPlayer = useAudioPlayer(SOURCES.correctAlt, {
    keepAudioSessionActive: true,
  });
  const wrongPlayer = useAudioPlayer(SOURCES.wrong, {
    keepAudioSessionActive: true,
  });
  const comboBigPlayer = useAudioPlayer(SOURCES.comboBig, {
    keepAudioSessionActive: true,
  });
  const lessonCompletePlayer = useAudioPlayer(SOURCES.lessonComplete, {
    keepAudioSessionActive: true,
  });
  const chestOpenPlayer = useAudioPlayer(SOURCES.chestOpen, {
    keepAudioSessionActive: true,
  });
  const chestOpenRarePlayer = useAudioPlayer(SOURCES.chestOpenRare, {
    keepAudioSessionActive: true,
  });
  const levelUpPlayer = useAudioPlayer(SOURCES.levelUp, {
    keepAudioSessionActive: true,
  });
  const players = useMemo(
    () => ({
      click: clickPlayer,
      select: selectPlayer,
      correct: correctPlayer,
      correctAlt: correctAltPlayer,
      wrong: wrongPlayer,
      combo: comboPlayer,
      comboBig: comboBigPlayer,
      lessonComplete: lessonCompletePlayer,
      chestOpen: chestOpenPlayer,
      chestOpenRare: chestOpenRarePlayer,
      levelUp: levelUpPlayer,
    }),
    [
      clickPlayer,
      selectPlayer,
      correctPlayer,
      correctAltPlayer,
      wrongPlayer,
      comboPlayer,
      comboBigPlayer,
      lessonCompletePlayer,
      chestOpenPlayer,
      chestOpenRarePlayer,
      levelUpPlayer,
    ],
  );
  const playRequest = useRef(0);

  useEffect(() => {
    // 무음모드여도 들리게 + 다른 앱 백그라운드 음악 안 멈춤
    void activatePlaybackAudio("mixWithOthers").catch(() => undefined);
  }, []);

  useEffect(
    () =>
      useSettingsStore.subscribe((state, previous) => {
        if (
          (state.muted && !previous.muted) ||
          (state.sound.uiSoundsEnabled === false &&
            previous.sound.uiSoundsEnabled !== false)
        ) {
          playRequest.current += 1;
          Object.values(players).forEach((player) => player.pause());
        }
      }),
    [players],
  );

  const play = useCallback(
    (key: SoundKey, options?: SoundPlaybackOptions) => {
      // 설정을 구독하지 않고 그때그때 읽는다.
      // 볼륨이 바뀔 때마다 Provider 가 리렌더되면 플레이어가 다시 만들어진다.
      const respectsSettings = options?.respectSoundSettings ?? true;
      const volumeNow = () => {
        const { sound, muted } = useSettingsStore.getState();
        // 명시적으로 효과음을 끄면 설정 미리듣기도 재생하지 않는다. TTS는 별도다.
        if (sound.uiSoundsEnabled === false || (respectsSettings && muted))
          return 0;
        const configuredVolume =
          key === "click" || key === "select"
            ? sound.keyVolume
            : sound.sfxVolume;
        return Math.min(1, Math.max(0, options?.volume ?? configuredVolume));
      };
      if (volumeNow() <= 0) return;
      const player = players[key];
      const request = ++playRequest.current;

      void (async () => {
        try {
          await activatePlaybackAudio("mixWithOthers").catch(() => undefined);
          if (player.isLoaded) await player.seekTo(0);
          const volume = volumeNow();
          if (request !== playRequest.current || volume <= 0) return;
          // 정답·콤보·보상 멜로디가 빠른 화면 전환에서 겹치지 않게 한다.
          if (key !== "click" && key !== "select") {
            Object.entries(players).forEach(([otherKey, otherPlayer]) => {
              if (
                otherKey !== key &&
                otherKey !== "click" &&
                otherKey !== "select"
              )
                otherPlayer.pause();
            });
          }
          player.volume = volume;
          player.play();
        } catch {
          // 사운드 못 틀어도 앱은 계속 돌아가게
        }
      })();
    },
    [players],
  );

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
