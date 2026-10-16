import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useAudioPlayer } from "expo-audio";
import { useSettingsStore } from "@/store/settings.store";
import { activateUiSoundAudio } from "@/utils/audio-session";
import {
  createUiSoundPlayback,
  type UiSoundPlaybackOptions,
} from "@/utils/ui-sound-player";
import {
  isUiSoundCaptureActive,
  subscribeUiSoundCapture,
} from "@/utils/ui-sound-capture";
import { claimPressSound } from "@/utils/press-sound";

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

export type SoundPlaybackOptions = UiSoundPlaybackOptions;

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
  const playback = useMemo(
    () =>
      createUiSoundPlayback({
        players,
        isTap: (key) => key === "click" || key === "select",
        blocked: isUiSoundCaptureActive,
        prepareAudio: activateUiSoundAudio,
        volumeFor: (key, options) => {
          const { sound, muted } = useSettingsStore.getState();
          if (
            sound.uiSoundsEnabled === false ||
            (options?.respectSoundSettings !== false && muted)
          )
            return 0;
          const volume =
            key === "click" || key === "select"
              ? sound.keyVolume
              : sound.sfxVolume;
          return Math.min(1, Math.max(0, options?.volume ?? volume));
        },
      }),
    [players],
  );

  useEffect(
    () =>
      useSettingsStore.subscribe((state, previous) => {
        if (
          (state.muted && !previous.muted) ||
          (state.sound.uiSoundsEnabled === false &&
            previous.sound.uiSoundsEnabled !== false)
        ) {
          playback.stop();
        }
      }),
    [playback],
  );

  useEffect(() => {
    const unsubscribe = subscribeUiSoundCapture((blocked) => {
      if (blocked) playback.stop();
    });
    return () => {
      unsubscribe();
      playback.stop();
    };
  }, [playback]);

  const play = useCallback(
    (key: SoundKey, options?: SoundPlaybackOptions) => {
      claimPressSound();
      void playback.play(key, options);
    },
    [playback],
  );

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
