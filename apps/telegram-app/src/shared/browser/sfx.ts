"use client";

/** 모바일과 같은 UI 효과음. 학습용 TTS 설정과는 독립적이다. */
export type SfxKey =
  | "click" | "select" | "correct" | "correct-alt" | "wrong"
  | "combo" | "combo-big" | "lesson-complete"
  | "chest-open" | "chest-open-rare" | "level-up";

export const SOUND_PREFERENCES_EVENT = "korio-sound-settings-changed";

export interface SfxOptions {
  respectSoundSettings?: boolean;
  volume?: number;
}

const SOURCES: Record<SfxKey, string> = {
  click: "/sounds/click.wav",
  select: "/sounds/select.wav",
  correct: "/sounds/correct.wav",
  "correct-alt": "/sounds/correct-alt.wav",
  wrong: "/sounds/wrong.wav",
  combo: "/sounds/combo.wav",
  "combo-big": "/sounds/combo-big.wav",
  "lesson-complete": "/sounds/lesson-complete.wav",
  "chest-open": "/sounds/chest-open.wav",
  "chest-open-rare": "/sounds/chest-open-rare.wav",
  "level-up": "/sounds/level-up.wav",
};

let context: AudioContext | null = null;
const buffers = new Map<SfxKey, Promise<AudioBuffer | null>>();
const active = new Map<SfxKey, AudioBufferSourceNode>();
const requests = new Map<SfxKey, number>();
let revision = 0;
let feedbackRequest = 0;
let listening = false;

/** 설정 변경은 진행 중인 효과음과 아직 디코딩 중인 재생 요청을 함께 취소한다. */
export function stopSfx() {
  revision += 1;
  for (const source of active.values()) {
    try { source.stop(); } catch { /* 이미 끝난 소스 */ }
  }
  active.clear();
}

function listenForPreferences() {
  if (listening) return;
  listening = true;
  window.addEventListener(SOUND_PREFERENCES_EVENT, stopSfx);
  window.addEventListener("storage", (event) => {
    if (event.key === "korio-sound-settings" || event.key === "korio-muted" || event.key === null) stopSfx();
  });
}

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

function readSettings(): { keyVolume?: number; sfxVolume?: number; startMuted?: boolean; uiSoundsEnabled?: boolean } {
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
  listenForPreferences();
  const ctx = audioContext();
  if (!ctx) return;
  for (const key of keys.length ? keys : (["click"] as SfxKey[])) void load(key, ctx);
}

export function playSfx(key: SfxKey, options?: SfxOptions) {
  if (typeof window === "undefined") return;
  listenForPreferences();
  const respect = options?.respectSoundSettings !== false;
  const saved = readSettings();
  // 미리 듣기도 사용자가 명시적으로 끈 UI 효과음을 다시 켜지 않는다.
  if (saved.uiSoundsEnabled === false) return;
  if (respect && sessionMuted(Boolean(saved.startMuted))) return;
  const configured = key === "click" || key === "select" ? saved.keyVolume : saved.sfxVolume;
  const volume = Math.min(1, Math.max(0, options?.volume ?? configured ?? 1));
  if (volume <= 0) return;

  const ctx = audioContext();
  if (!ctx) return;
  // 사용자 제스처 안에서 resume 해야 iOS/텔레그램 웹뷰가 소리를 낸다
  const resumed = ctx.state === "suspended" ? ctx.resume().catch(() => undefined) : undefined;
  const startedRevision = revision;
  const request = (requests.get(key) ?? 0) + 1;
  requests.set(key, request);
  const feedback = key !== "click" && key !== "select";
  const currentFeedbackRequest = feedback ? ++feedbackRequest : feedbackRequest;
  if (feedback) {
    // 정답·오답·축하 연출은 한 번에 하나만 들려준다.
    for (const [playingKey, source] of active) {
      if (playingKey === "click" || playingKey === "select") continue;
      try { source.stop(); } catch { /* 이미 끝난 소스 */ }
      active.delete(playingKey);
    }
  }

  void (async () => {
    try {
      await resumed;
      const buffer = await load(key, ctx);
      if (!buffer || startedRevision !== revision || requests.get(key) !== request) return;
      if (feedback && currentFeedbackRequest !== feedbackRequest) return;
      const current = readSettings();
      if (current.uiSoundsEnabled === false || (respect && sessionMuted(Boolean(current.startMuted)))) return;
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
        source.disconnect();
        gain.disconnect();
      };
      active.set(key, source);
      source.start();
    } catch {
      // 효과음 실패로 앱 흐름을 막지 않는다
    }
  })();
}

/**
 * 레벨업 연출처럼 여러 소리를 시각에 맞춰 겹쳐 트는 곳이 같은 오디오 컨텍스트를 쓰게 한다
 * (iOS·텔레그램 웹뷰는 사용자가 한 번 만진 컨텍스트만 소리를 낸다).
 */
export function sfxAudioContext() {
  if (typeof window === "undefined") return null;
  listenForPreferences();
  return audioContext();
}

/** 지금 효과음 볼륨 — 효과음을 껐거나 음소거면 0 */
export function sfxVolumeNow() {
  if (typeof window === "undefined") return 0;
  const saved = readSettings();
  if (saved.uiSoundsEnabled === false) return 0;
  if (sessionMuted(Boolean(saved.startMuted))) return 0;
  return Math.min(1, Math.max(0, saved.sfxVolume ?? 1));
}
