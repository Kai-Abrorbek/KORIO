import { useCallback, useEffect, useMemo, useRef } from "react";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import {
  Easing,
  cancelAnimation,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSettingsStore } from "@/store/settings.store";
import { activatePlaybackAudio } from "@/utils/audio-session";
import { isUiSoundCaptureActive } from "@/utils/ui-sound-capture";
import { cinemaLanguageOf, type CinemaCue, type CinemaLanguage } from "./cinema";

/** 연출의 목소리·글자 언어 = 지금 배우는 코스. 영어 코스면 영어 목소리·글씨 */
export function useCinemaLanguage(): CinemaLanguage {
  return cinemaLanguageOf(useSettingsStore((s) => s.learnCourse));
}

/**
 * 연출 시계 — 0 에서 end(ms) 까지 한 번 곧게 흐른다. 부위마다 이 값으로 자기 자리를 계산한다
 * (cinemaAt, UI 스레드). run(from) 으로 아무 시각부터, 건너뛰기는 run(뒤 시각).
 */
export function useCinemaClock(end: number) {
  const clock = useSharedValue(0);

  const run = useCallback(
    (from = 0, to = end) => {
      cancelAnimation(clock);
      clock.value = from;
      if (to > from) {
        clock.value = withTiming(to, { duration: to - from, easing: Easing.linear });
      }
    },
    [clock, end],
  );

  useEffect(() => () => cancelAnimation(clock), [clock]);
  return { clock, run };
}

/** 효과음 설정을 따른다 (끔·음소거·녹음 중이면 0) — 로켓과 같다 */
export function sfxVolumeNow() {
  const { sound, muted } = useSettingsStore.getState();
  if (sound.uiSoundsEnabled === false || muted || isUiSoundCaptureActive()) return 0;
  return Math.min(1, Math.max(0, sound.sfxVolume));
}

export interface PlayOptions {
  /** 1 보다 크면 빠르고 높게 (긴장감이 올라가는 연타용) */
  rate?: number;
  /** 이 소리만 더 작게/크게 (GAIN 에 곱한다) */
  gain?: number;
}

/**
 * 연출 소리 — 소리마다 플레이어 하나를 화면이 떠 있는 동안만 만든다.
 * playFrom(ms, cues) 는 시간표대로 겹쳐 틀고, play(key) 는 지금 바로 튼다 (탭에 반응할 때).
 * 소리가 안 나도 연출은 계속된다.
 */
export function useCinemaAudio<S extends string>(
  sources: Record<S, number>,
  gains: Partial<Record<S, number>> = {},
) {
  const players = useRef<Partial<Record<S, AudioPlayer>>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const gainsRef = useRef(gains);
  gainsRef.current = gains;

  useEffect(() => {
    const made: Partial<Record<S, AudioPlayer>> = {};
    for (const key of Object.keys(sources) as S[]) {
      try {
        made[key] = createAudioPlayer(sources[key]);
      } catch {
        // 이 소리 하나 없이 간다
      }
    }
    players.current = made;
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      for (const player of Object.values(made) as AudioPlayer[]) {
        try {
          player.pause();
          player.remove();
        } catch {
          // 이미 풀린 플레이어
        }
      }
      players.current = {};
    };
    // 소스는 모듈 상수다 — 화면이 떠 있는 동안 한 번만 만든다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = useCallback((key: S, options?: PlayOptions) => {
    const volume = sfxVolumeNow();
    if (volume <= 0) return;
    const player = players.current[key];
    if (!player) return;
    const gain = (gainsRef.current[key] ?? 1) * (options?.gain ?? 1);
    void (async () => {
      await activatePlaybackAudio("mixWithOthers").catch(() => undefined);
      // 안드로이드는 끝난 플레이어의 isLoaded 가 false 다 — 늘 처음으로 감는다
      await player.seekTo(0, 0, 0).catch(() => undefined);
      try {
        // 높낮이 바꾸기는 덤 — 안 되면 원래 높이로 튼다
        const rate = options?.rate ?? 1;
        player.shouldCorrectPitch = rate === 1;
        player.setPlaybackRate(rate);
      } catch {
        // 아직 안 불러진 플레이어 등
      }
      try {
        player.volume = Math.min(1, volume * gain);
        player.play();
      } catch {
        // 소리 못 내도 연출은 계속
      }
    })();
  }, []);

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    for (const player of Object.values(players.current) as AudioPlayer[]) {
      try {
        player.pause();
      } catch {
        // 이미 풀린 플레이어
      }
    }
  }, []);

  /** 시간표대로 — fromMs 이전 큐는 건너뛴다 (건너뛰기·동작 줄이기) */
  const playFrom = useCallback(
    (fromMs: number, cues: readonly CinemaCue<S>[]) => {
      stop();
      for (const cue of cues) {
        if (cue.t < fromMs) continue;
        timers.current.push(setTimeout(() => play(cue.sound), cue.t - fromMs));
      }
    },
    [play, stop],
  );

  return useMemo(() => ({ play, playFrom, stop }), [play, playFrom, stop]);
}
