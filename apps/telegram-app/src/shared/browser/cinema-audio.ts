"use client";

import { CINEMA_SOUND_CUES, type CinemaSound } from "../model/level-up-cinematic";
import type { CinemaCue } from "../model/cinema";
import { SOUND_PREFERENCES_EVENT, sfxAudioContext, sfxVolumeNow } from "./sfx";

/**
 * 연출 소리 — 시간표(cues)대로 겹쳐 튼다 (앱 components/cinema/useCinema 의 useCinemaAudio 와 같다).
 * 화면마다 소리 파일·크기·시간표를 넘긴다. 효과음 설정(끔·음소거·볼륨)을 따르고,
 * 소리가 안 나도 연출은 계속된다.
 */
export interface CinemaAudioConfig<S extends string> {
  sources: Record<S, string>;
  /** 소리마다 크기 — 목소리가 효과음에 묻히지 않게 (없으면 1) */
  gains?: Partial<Record<S, number>>;
  /** playFrom 이 따르는 시간표 */
  cues?: readonly CinemaCue<S>[];
}

export interface CinemaPlayOptions {
  /** 1 보다 크면 빠르고 높게 (긴장감이 올라가는 연타용) */
  rate?: number;
  /** 이 소리만 더 작게/크게 (gains 에 곱한다) */
  gain?: number;
}

/**
 * 레벨업 연출 소리 (앱 level-up 화면과 같다).
 * 목소리(셋·둘·하나·출발·도착)는 tools/levelup-audio 가 ElevenLabs 로 만든 파일이다.
 */
export const LEVEL_UP_AUDIO: CinemaAudioConfig<CinemaSound> = {
  sources: {
    vo3: "/sounds/levelup/vo-3.mp3",
    vo2: "/sounds/levelup/vo-2.mp3",
    vo1: "/sounds/levelup/vo-1.mp3",
    voGo: "/sounds/levelup/vo-go.mp3",
    voArrive: "/sounds/levelup/vo-arrive.mp3",
    rumble: "/sounds/levelup/rumble.mp3",
    launch: "/sounds/levelup/launch.mp3",
    arrive: "/sounds/level-up.wav",
  },
  gains: {
    vo3: 1,
    vo2: 1,
    vo1: 1,
    voGo: 1,
    voArrive: 1,
    rumble: 0.55,
    launch: 0.8,
    arrive: 0.85,
  },
  cues: CINEMA_SOUND_CUES,
};

/** 영어 코스 — 같은 목소리가 "Three! Two! One! Liftoff!" (앱 level-up 화면과 같다) */
export const LEVEL_UP_AUDIO_EN: CinemaAudioConfig<CinemaSound> = {
  ...LEVEL_UP_AUDIO,
  sources: {
    ...LEVEL_UP_AUDIO.sources,
    vo3: "/sounds/levelup/vo-3-en.mp3",
    vo2: "/sounds/levelup/vo-2-en.mp3",
    vo1: "/sounds/levelup/vo-1-en.mp3",
    voGo: "/sounds/levelup/vo-go-en.mp3",
    voArrive: "/sounds/levelup/vo-arrive-en.mp3",
  },
};

export function createCinemaAudio<S extends string>({ sources, gains = {}, cues = [] }: CinemaAudioConfig<S>) {
  const ctx = sfxAudioContext();
  const buffers = new Map<S, Promise<AudioBuffer | null>>();
  let playing: { source: AudioBufferSourceNode; at: number }[] = [];
  /** stop() 마다 올린다 — 디코딩이 늦게 끝난 예전 예약이 끊긴 뒤에 울리지 않게 */
  let generation = 0;
  let disposed = false;

  const load = (sound: S) => {
    let pending = buffers.get(sound);
    if (!pending && ctx) {
      pending = fetch(sources[sound])
        .then((response) => (response.ok ? response.arrayBuffer() : Promise.reject(new Error("audio"))))
        .then((data) => ctx.decodeAudioData(data))
        .catch(() => null);
      buffers.set(sound, pending);
    }
    return pending ?? Promise.resolve(null);
  };

  const stop = () => {
    generation += 1;
    for (const { source } of playing) {
      try {
        source.stop();
      } catch {
        // 이미 끝난 소리
      }
    }
    playing = [];
  };

  /** 소리 하나를 at(컨텍스트 시각)에 — 볼륨은 부를 때의 설정 */
  const start = (buffer: AudioBuffer, sound: S, at: number, volume: number, options?: CinemaPlayOptions) => {
    if (!ctx) return;
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    const rate = options?.rate ?? 1;
    if (rate !== 1) source.playbackRate.value = rate;
    gain.gain.value = Math.min(1, volume * (gains[sound] ?? 1) * (options?.gain ?? 1));
    source.connect(gain);
    gain.connect(ctx.destination);
    const startAt = Math.max(at, ctx.currentTime);
    source.onended = () => {
      playing = playing.filter((item) => item.source !== source);
      source.disconnect();
      gain.disconnect();
    };
    playing.push({ source, at: startAt });
    source.start(startAt);
  };

  const onPreferences = () => stop();
  if (typeof window !== "undefined") window.addEventListener(SOUND_PREFERENCES_EVENT, onPreferences);

  return {
    /** 연출 시작 전에 받아 둔다 */
    preload() {
      for (const sound of Object.keys(sources) as S[]) void load(sound);
    },
    /**
     * fromMs 시각부터의 큐를 지금 기준으로 예약한다.
     * 건너뛰기·동작 줄이기면 남은 것을 끊고 그 시각부터 다시 부른다.
     */
    async playFrom(fromMs: number) {
      if (!ctx || disposed) return;
      stop();
      const volume = sfxVolumeNow();
      if (volume <= 0) return;
      const mine = generation;
      if (ctx.state === "suspended") await ctx.resume().catch(() => undefined);
      if (mine !== generation || disposed) return;
      const base = ctx.currentTime;
      for (const cue of cues) {
        if (cue.t < fromMs) continue;
        void load(cue.sound).then((buffer) => {
          if (!buffer || disposed || mine !== generation) return;
          const at = base + (cue.t - fromMs) / 1000;
          if (at < ctx.currentTime - 0.05) return; // 디코딩이 늦어 이미 지난 큐는 건너뛴다
          start(buffer, cue.sound, at, volume);
        });
      }
    },
    /** 지금 바로 (탭에 반응할 때·보석이 닿을 때) */
    play(sound: S, options?: CinemaPlayOptions) {
      if (!ctx || disposed) return;
      const volume = sfxVolumeNow();
      if (volume <= 0) return;
      const mine = generation;
      // 사용자 제스처 안에서 resume 해야 iOS/텔레그램 웹뷰가 소리를 낸다
      const resumed = ctx.state === "suspended" ? ctx.resume().catch(() => undefined) : undefined;
      void Promise.all([resumed, load(sound)]).then(([, buffer]) => {
        if (!buffer || disposed || mine !== generation) return;
        start(buffer, sound, ctx.currentTime, volume, options);
      });
    },
    stop,
    dispose() {
      disposed = true;
      stop();
      if (typeof window !== "undefined") window.removeEventListener(SOUND_PREFERENCES_EVENT, onPreferences);
    },
    /**
     * 연출이 닫혀도 이미 울리기 시작한 소리는 끝까지 둔다 (빨려 드는 소리가 닫히는 순간에도 울린다).
     * 아직 안 울린 예약·디코딩 중인 것만 끊는다.
     */
    release() {
      disposed = true;
      generation += 1;
      const now = ctx?.currentTime ?? 0;
      playing = playing.filter(({ source, at }) => {
        if (at <= now + 0.01) return true;
        try {
          source.stop();
        } catch {
          // 이미 끝난 소리
        }
        return false;
      });
      if (typeof window !== "undefined") window.removeEventListener(SOUND_PREFERENCES_EVENT, onPreferences);
    },
  };
}

export type CinemaAudio<S extends string> = ReturnType<typeof createCinemaAudio<S>>;
