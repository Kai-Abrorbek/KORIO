"use client";

import { CINEMA_SOUND_CUES, type CinemaSound } from "../model/level-up-cinematic";
import { SOUND_PREFERENCES_EVENT, sfxAudioContext, sfxVolumeNow } from "./sfx";

/**
 * 레벨업 연출 소리 — 시간표(CINEMA_SOUND_CUES)대로 겹쳐 튼다 (앱 level-up 화면과 같다).
 * 목소리(셋·둘·하나·출발·도착)는 tools/levelup-audio 가 ElevenLabs 로 만든 파일이다.
 * 효과음 설정(끔·음소거·볼륨)을 따른다.
 */
const SOURCES: Record<CinemaSound, string> = {
  vo3: "/sounds/levelup/vo-3.mp3",
  vo2: "/sounds/levelup/vo-2.mp3",
  vo1: "/sounds/levelup/vo-1.mp3",
  voGo: "/sounds/levelup/vo-go.mp3",
  voArrive: "/sounds/levelup/vo-arrive.mp3",
  rumble: "/sounds/levelup/rumble.mp3",
  launch: "/sounds/levelup/launch.mp3",
  arrive: "/sounds/level-up.wav",
};

/** 소리마다 크기 — 목소리가 효과음에 묻히지 않게 */
const GAIN: Record<CinemaSound, number> = {
  vo3: 1,
  vo2: 1,
  vo1: 1,
  voGo: 1,
  voArrive: 1,
  rumble: 0.55,
  launch: 0.8,
  arrive: 0.85,
};

export function createCinemaAudio() {
  const ctx = sfxAudioContext();
  const buffers = new Map<CinemaSound, Promise<AudioBuffer | null>>();
  let playing: AudioBufferSourceNode[] = [];
  let disposed = false;

  const load = (sound: CinemaSound) => {
    let pending = buffers.get(sound);
    if (!pending && ctx) {
      pending = fetch(SOURCES[sound])
        .then((response) => (response.ok ? response.arrayBuffer() : Promise.reject(new Error("audio"))))
        .then((data) => ctx.decodeAudioData(data))
        .catch(() => null);
      buffers.set(sound, pending);
    }
    return pending ?? Promise.resolve(null);
  };

  const stop = () => {
    for (const source of playing) {
      try {
        source.stop();
      } catch {
        // 이미 끝난 소리
      }
    }
    playing = [];
  };

  const onPreferences = () => stop();
  if (typeof window !== "undefined") window.addEventListener(SOUND_PREFERENCES_EVENT, onPreferences);

  return {
    /** 연출 시작 전에 받아 둔다 */
    preload() {
      for (const cue of CINEMA_SOUND_CUES) void load(cue.sound);
    },
    /**
     * fromMs 시각부터의 큐를 지금 기준으로 예약한다.
     * 건너뛰기면 남은 것을 끊고 결과 시각부터 다시 부른다.
     */
    async playFrom(fromMs: number) {
      if (!ctx || disposed) return;
      stop();
      const volume = sfxVolumeNow();
      if (volume <= 0) return;
      if (ctx.state === "suspended") await ctx.resume().catch(() => undefined);
      const base = ctx.currentTime;
      for (const cue of CINEMA_SOUND_CUES) {
        if (cue.t < fromMs) continue;
        void load(cue.sound).then((buffer) => {
          if (!buffer || disposed) return;
          const at = base + (cue.t - fromMs) / 1000;
          if (at < ctx.currentTime - 0.05) return; // 디코딩이 늦어 이미 지난 큐는 건너뛴다
          const source = ctx.createBufferSource();
          const gain = ctx.createGain();
          source.buffer = buffer;
          gain.gain.value = volume * GAIN[cue.sound];
          source.connect(gain);
          gain.connect(ctx.destination);
          source.onended = () => {
            playing = playing.filter((item) => item !== source);
            source.disconnect();
            gain.disconnect();
          };
          playing.push(source);
          source.start(Math.max(at, ctx.currentTime));
        });
      }
    },
    stop,
    dispose() {
      disposed = true;
      stop();
      if (typeof window !== "undefined") window.removeEventListener(SOUND_PREFERENCES_EVENT, onPreferences);
    },
  };
}
