"use client";

/**
 * 모바일 hooks/useSound 와 같은 효과음 두 개.
 * click = 자판(버튼) 소리 → keyVolume, combo = 효과음 → sfxVolume.
 * 세션 음소거(korio-muted) / 무음으로 시작(startMuted) 을 존중한다.
 */
export type SfxKey = "click" | "combo";

export interface SfxOptions {
  respectSoundSettings?: boolean;
  volume?: number;
}

const SOURCES: Record<SfxKey, string> = {
  click: "/sounds/click.mp3",
  combo: "/sounds/combo.mp3",
};

let context: AudioContext | null = null;
const buffers = new Map<SfxKey, Promise<AudioBuffer | null>>();
const active = new Map<SfxKey, AudioBufferSourceNode>();

function audioContext() {
  if (context) return context;
  const Constructor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Constructor) return null;
  context = new Constructor();
  return context;
}

function load(key: SfxKey, ctx: AudioContext) {
  let pending = buffers.get(key);
  if (!pending) {
    pending = fetch(SOURCES[key])
      .then((response) => (response.ok ? response.arrayBuffer() : Promise.reject()))
      .then((data) => ctx.decodeAudioData(data))
      .catch(() => {
        buffers.delete(key);
        return null;
      });
    buffers.set(key, pending);
  }
  return pending;
}

function readSettings(): { keyVolume?: number; sfxVolume?: number; startMuted?: boolean } {
  try {
    return JSON.parse(window.localStorage.getItem("korio-sound-settings") ?? "{}");
  } catch {
    return {};
  }
}

function sessionMuted(startMuted: boolean) {
  try {
    const value = window.sessionStorage.getItem("korio-muted");
    return value === null ? startMuted : value === "true";
  } catch {
    return startMuted;
  }
}

/** 첫 터치 전에 미리 받아 두면 첫 클릭이 늦게 울리지 않는다 */
export function preloadSfx(...keys: SfxKey[]) {
  if (typeof window === "undefined") return;
  const ctx = audioContext();
  if (!ctx) return;
  for (const key of keys.length ? keys : (["click"] as SfxKey[])) void load(key, ctx);
}

export function playSfx(key: SfxKey, options?: SfxOptions) {
  if (typeof window === "undefined") return;
  const respect = options?.respectSoundSettings !== false;
  const saved = readSettings();
  if (respect && sessionMuted(Boolean(saved.startMuted))) return;
  const configured = key === "click" ? saved.keyVolume : saved.sfxVolume;
  const volume = Math.min(1, Math.max(0, options?.volume ?? configured ?? 1));
  if (volume <= 0) return;

  const ctx = audioContext();
  if (!ctx) return;
  // 사용자 제스처 안에서 resume 해야 iOS/텔레그램 웹뷰가 소리를 낸다
  const resumed = ctx.state === "suspended" ? ctx.resume().catch(() => undefined) : undefined;

  void (async () => {
    try {
      await resumed;
      const buffer = await load(key, ctx);
      if (!buffer) return;
      // 같은 소리를 연타하면 이전 것을 끊고 처음부터 (모바일 seekTo(0) 과 같게)
      try {
        active.get(key)?.stop();
      } catch {
        // 이미 끝난 소스
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.onended = () => {
        if (active.get(key) === source) active.delete(key);
      };
      active.set(key, source);
      source.start();
    } catch {
      // 효과음 실패로 앱 흐름을 막지 않는다
    }
  })();
}
