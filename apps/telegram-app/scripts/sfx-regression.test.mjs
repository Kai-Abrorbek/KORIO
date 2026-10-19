import assert from "node:assert/strict";
import { setImmediate, setTimeout as waitTimers } from "node:timers/promises";
import { test } from "node:test";
import { register } from "node:module";

// Small browser/Web Audio doubles exercise the real delegated listener and async
// decoder without adding a DOM or audio dependency to the shipped application.
class ElementDouble {
  constructor(tag, attributes = {}, parent = null) {
    this.tag = tag;
    this.attributes = attributes;
    this.parent = parent;
  }

  matches(selector) {
    return selector.split(",").some((part) => {
      const rule = part.trim();
      if (rule === ":disabled") return this.closest("[disabled]") !== null;
      const tag = rule.match(/^[a-z]+/)?.[0];
      if (tag && tag !== this.tag) return false;
      return [...rule.matchAll(/\[([^=\]]+)(?:="([^"]+)")?\]/g)].every(([, name, value]) =>
        Object.hasOwn(this.attributes, name) && (value === undefined || this.attributes[name] === value),
      );
    });
  }

  closest(selector) {
    return this.matches(selector) ? this : this.parent?.closest(selector) ?? null;
  }
}

let fixtureId = 0;

async function browserFixture() {
  const started = [];
  const stopped = [];
  const storage = new Map();
  const session = new Map();
  const clickListeners = new Set();
  const bubbleListeners = new Set();
  const host = new EventTarget();
  let resumes = 0;
  let releaseDecode = null;
  let deferDecode = false;

  class AudioContextDouble {
    state = "suspended";
    destination = {};
    resume() { resumes += 1; this.state = "running"; return Promise.resolve(); }
    async decodeAudioData(data) {
      if (deferDecode) await new Promise((resolve) => { releaseDecode = resolve; });
      return { key: new TextDecoder().decode(data) };
    }
    createGain() { return { gain: { value: 1 }, connect() {}, disconnect() {} }; }
    createBufferSource() {
      const source = {
        buffer: null,
        gain: null,
        connect(gain) { this.gain = gain; },
        disconnect() {},
        start() { started.push({ key: this.buffer.key, volume: this.gain.gain.value }); },
        stop() { stopped.push(this.buffer?.key); },
      };
      return source;
    }
  }

  globalThis.window = Object.assign(host, {
    addEventListener(type, listener, options) {
      if (type === "click") bubbleListeners.add(listener);
      else EventTarget.prototype.addEventListener.call(host, type, listener, options);
    },
    removeEventListener(type, listener, options) {
      if (type === "click") bubbleListeners.delete(listener);
      else EventTarget.prototype.removeEventListener.call(host, type, listener, options);
    },
    AudioContext: AudioContextDouble,
    localStorage: { getItem: (key) => storage.get(key) ?? null },
    sessionStorage: { getItem: (key) => session.get(key) ?? null },
  });
  globalThis.document = {
    addEventListener(type, listener, capture) { assert.equal(type, "click"); assert.equal(capture, true); clickListeners.add(listener); },
    removeEventListener(type, listener) { clickListeners.delete(listener); },
  };
  globalThis.Element = ElementDouble;
  globalThis.fetch = async (url) => ({
    ok: true,
    arrayBuffer: async () => new TextEncoder().encode(url.match(/\/([^/]+)\.wav$/)[1]).buffer,
  });

  const sfx = await import(`../src/shared/browser/sfx.ts?fixture=${++fixtureId}`);
  const cleanup = sfx.installButtonSounds();
  await setImmediate();
  const capture = (target, extra) => {
    const event = {
      target, isTrusted: true, button: 0, propagationStopped: false,
      stopPropagation() { this.propagationStopped = true; },
      preventDefault() { this.defaultPrevented = true; },
      ...extra,
    };
    for (const listener of clickListeners) listener(event);
    return event;
  };
  const bubble = (event) => {
    if (!event.propagationStopped) for (const listener of bubbleListeners) listener(event);
  };
  return {
    sfx, started, stopped, cleanup,
    get resumes() { return resumes; },
    save(value) { storage.set("korio-sound-settings", JSON.stringify(value)); },
    mute(value) { session.set("korio-muted", String(value)); },
    click(target, handler = () => {}, extra = {}) {
      const event = capture(target, extra);
      handler(event);
      bubble(event);
    },
    async clickWithBrowserCheckpoint(target, handler) {
      const event = capture(target, {});
      await Promise.resolve();
      assert.deepEqual(started, [], "capture must not emit sound before React runs");
      handler(event);
      bubble(event);
    },
    defer() { deferDecode = true; },
    release() { releaseDecode?.(); },
    changed() { host.dispatchEvent(new Event(sfx.SOUND_PREFERENCES_EVENT)); },
  };
}

const button = () => new ElementDouble("button");

test("appwide default taps cover native/role controls, nested icons and keyboard clicks", async () => {
  const f = await browserFixture();
  assert.equal(f.resumes, 0, "preloading does not try to unlock audio outside a gesture");
  for (const target of [
    button(),
    new ElementDouble("path", {}, new ElementDouble("svg", {}, button())),
    new ElementDouble("a", { href: "/settings" }),
    new ElementDouble("div", { role: "button" }),
    new ElementDouble("div", { role: "tab" }),
    new ElementDouble("button", { role: "switch" }),
    new ElementDouble("input", { type: "submit" }),
    new ElementDouble("input", { type: "checkbox" }),
  ]) {
    f.click(target, () => assert.ok(f.resumes > 0, "resume runs synchronously before the handler"));
    await setImmediate();
  }
  assert.equal(f.started.length, 8);
  assert.ok(f.started.every((entry) => entry.key === "click"));
  f.click(button(), () => assert.ok(f.resumes > 0), { detail: 0 });
  await setImmediate();
  assert.equal(f.started.length, 9);
  f.cleanup();
  f.click(button());
  await setImmediate();
  assert.equal(f.started.length, 9, "unmount removes the listener");
});

test("explicit select, feedback and legacy click replace the fallback once", async () => {
  const f = await browserFixture();
  for (const key of ["select", "correct", "wrong", "click"]) {
    f.click(button(), () => f.sfx.playSfx(key));
    await setImmediate();
  }
  assert.deepEqual(f.started.map((entry) => entry.key), ["select", "correct", "wrong", "click"]);
});

test("disabled, inert, text/range inputs and non-controls stay silent", async () => {
  const f = await browserFixture();
  for (const target of [
    new ElementDouble("button", { disabled: "" }),
    new ElementDouble("button", { "aria-disabled": "true" }),
    new ElementDouble("button", {}, new ElementDouble("fieldset", { disabled: "" })),
    new ElementDouble("button", {}, new ElementDouble("section", { inert: "" })),
    new ElementDouble("input", { type: "range" }),
    new ElementDouble("input", { type: "text" }, new ElementDouble("div", { role: "button" })),
    new ElementDouble("textarea"),
    new ElementDouble("select"),
    new ElementDouble("p"),
  ]) f.click(target);
  f.click(button(), undefined, { isTrusted: false });
  f.click(button(), undefined, { button: 2 });
  await setImmediate();
  assert.deepEqual(f.started, []);
});

test("stopped propagation and Next navigation prevention still sound", async () => {
  const f = await browserFixture();
  f.click(button(), (event) => event.stopPropagation());
  await waitTimers(5);
  f.click(new ElementDouble("a", { href: "/home" }), (event) => event.preventDefault());
  await setImmediate();
  assert.equal(f.started.length, 2);
});

test("a browser checkpoint between capture and React does not beat an explicit sound", async () => {
  const f = await browserFixture();
  await f.clickWithBrowserCheckpoint(button(), () => f.sfx.playSfx("select"));
  await setImmediate();
  assert.deepEqual(f.started.map((entry) => entry.key), ["select"]);
});

test("sound toggle, session mute, startup mute and key volume gate defaults", async () => {
  const f = await browserFixture();
  for (const setting of [{ uiSoundsEnabled: false }, { keyVolume: 0 }, { startMuted: true }]) {
    f.save(setting);
    f.click(button());
    await setImmediate();
  }
  f.save({});
  f.mute(true);
  f.click(button());
  await setImmediate();
  assert.deepEqual(f.started, []);
  f.mute(false);
  f.save({ keyVolume: 0.25 });
  f.click(button());
  await setImmediate();
  assert.deepEqual(f.started, [{ key: "click", volume: 0.25 }]);
  f.click(button(), () => f.save({ uiSoundsEnabled: false }));
  await setImmediate();
  assert.equal(f.started.length, 1, "turning effects off also silences the switch's pending tap");
});

test("zero-volume explicit select does not fall back to an audible click", async () => {
  const f = await browserFixture();
  f.click(button(), () => f.sfx.playSfx("select", { volume: 0 }));
  await setImmediate();
  assert.deepEqual(f.started, []);
});

test("microphone start cancels both active sounds and the pending default tap", async () => {
  const f = await browserFixture();
  f.click(button());
  await setImmediate();
  f.click(button(), () => f.sfx.stopSfxForRecording());
  await setImmediate();
  assert.equal(f.started.length, 1);
  assert.deepEqual(f.stopped, ["click"]);
});

test("consumed post-drag clicks do not emit a second sound or stop the selection", async () => {
  const f = await browserFixture();
  f.sfx.playSfx("select");
  await setImmediate();
  f.click(button(), () => f.sfx.suppressDefaultButtonSound());
  await setImmediate();
  assert.deepEqual(f.started.map((entry) => entry.key), ["select"]);
  assert.deepEqual(f.stopped, []);
});

test("changing preferences cancels an audio decode that has not finished", async () => {
  const f = await browserFixture();
  f.defer();
  f.sfx.playSfx("combo-big");
  await setImmediate();
  f.save({ uiSoundsEnabled: false });
  f.changed();
  f.release();
  await setImmediate();
  assert.deepEqual(f.started, []);
});

// ── 연출 소리 (shared/browser/cinema-audio) ──
// cinema-audio.ts 는 확장자 없이 import 한다. ?cinema= 로 불러온 모듈 그래프만 .ts 를 붙이고
// 같은 query 를 이어 준다 — 테스트마다 새 sfx 모듈(새 오디오 컨텍스트)을 쓰게.
register(
  `data:text/javascript,${encodeURIComponent(`
    export async function resolve(specifier, context, next) {
      const parent = context.parentURL ?? "";
      if (specifier.startsWith(".") && parent.includes("?cinema=")) {
        const file = /[.][cm]?[jt]sx?$/.test(specifier) ? specifier : specifier + ".ts";
        return next(file + parent.slice(parent.indexOf("?")), context);
      }
      return next(specifier, context);
    }
  `)}`,
);

let cinemaFixtureId = 0;

async function cinemaFixture() {
  const started = [];
  const stopped = [];
  const storage = new Map();
  const session = new Map();
  const host = new EventTarget();
  const pendingDecodes = [];
  let deferDecode = false;
  const ctx = {
    state: "running",
    currentTime: 0,
    destination: {},
    resume() { this.state = "running"; return Promise.resolve(); },
    async decodeAudioData(data) {
      if (deferDecode) await new Promise((resolve) => { pendingDecodes.push(resolve); });
      return { key: new TextDecoder().decode(data) };
    },
    createGain() { return { gain: { value: 1 }, connect() {}, disconnect() {} }; },
    createBufferSource() {
      return {
        buffer: null,
        gain: null,
        playbackRate: { value: 1 },
        connect(gain) { this.gain = gain; },
        disconnect() {},
        start(at) { started.push({ key: this.buffer.key, at, rate: this.playbackRate.value, volume: this.gain.gain.value }); },
        stop() { stopped.push(this.buffer.key); },
      };
    },
  };
  globalThis.window = Object.assign(host, {
    AudioContext: function AudioContextDouble() { return ctx; },
    localStorage: { getItem: (key) => storage.get(key) ?? null },
    sessionStorage: { getItem: (key) => session.get(key) ?? null },
  });
  globalThis.fetch = async (url) => ({
    ok: true,
    arrayBuffer: async () => new TextEncoder().encode(url.match(/\/([^/]+)\.(?:mp3|wav)$/)[1]).buffer,
  });
  const id = ++cinemaFixtureId;
  const { createCinemaAudio } = await import(`../src/shared/browser/cinema-audio.ts?cinema=${id}`);
  const { SOUND_PREFERENCES_EVENT } = await import(`../src/shared/browser/sfx.ts?cinema=${id}`);
  const audio = createCinemaAudio({
    sources: { whoosh: "/sounds/lesson/stamp-whoosh.mp3", thump: "/sounds/lesson/stamp-thump.mp3", rattle: "/sounds/chest/rattle.mp3" },
    gains: { whoosh: 0.5 },
    cues: [{ t: 250, sound: "whoosh" }, { t: 930, sound: "thump" }],
  });
  return {
    audio, ctx, started, stopped,
    save(value) { storage.set("korio-sound-settings", JSON.stringify(value)); },
    mute(value) { session.set("korio-muted", String(value)); },
    defer() { deferDecode = true; },
    get decoding() { return pendingDecodes.length; },
    release() { pendingDecodes.splice(0).forEach((resolve) => resolve()); },
    changed() { host.dispatchEvent(new Event(SOUND_PREFERENCES_EVENT)); },
  };
}

const settle = async () => {
  for (let i = 0; i < 5; i++) await setImmediate();
};

test("cinema cues follow the timetable, the effects volume and each sound's gain", async () => {
  const f = await cinemaFixture();
  f.save({ sfxVolume: 0.8 });
  await f.audio.playFrom(0);
  await settle();
  assert.deepEqual(f.started, [
    { key: "stamp-whoosh", at: 0.25, rate: 1, volume: 0.4 },
    { key: "stamp-thump", at: 0.93, rate: 1, volume: 0.8 },
  ]);
  // 건너뛰기·동작 줄이기 — 그 시각 이전 큐는 건너뛴다
  f.started.length = 0;
  await f.audio.playFrom(950);
  await settle();
  assert.deepEqual(f.started, []);
});

test("cinema sounds stay silent when effects are off or the session is muted", async () => {
  const f = await cinemaFixture();
  f.save({ uiSoundsEnabled: false });
  await f.audio.playFrom(0);
  f.audio.play("rattle");
  await settle();
  f.save({});
  f.mute(true);
  await f.audio.playFrom(0);
  f.audio.play("rattle");
  await settle();
  assert.deepEqual(f.started, []);
});

test("skipping before a cue finishes decoding keeps that cue from sounding later", async () => {
  const f = await cinemaFixture();
  f.defer();
  await f.audio.playFrom(0);
  await settle();
  assert.equal(f.decoding, 2, "both cues are still decoding when the user skips");
  f.audio.stop();
  f.release();
  await settle();
  assert.deepEqual(f.started, []);
});

test("a tap sound plays now with its own pitch", async () => {
  const f = await cinemaFixture();
  f.ctx.currentTime = 2;
  f.audio.play("rattle", { rate: 1.3 });
  await settle();
  assert.deepEqual(f.started, [{ key: "rattle", at: 2, rate: 1.3, volume: 1 }]);
});

test("closing an effect lets a started sound ring but drops cues still to come", async () => {
  const f = await cinemaFixture();
  await f.audio.playFrom(0);
  await settle();
  f.ctx.currentTime = 0.5;
  f.audio.release();
  assert.deepEqual(f.stopped, ["stamp-thump"], "only the cue after now is cut");
  f.audio.play("rattle");
  await settle();
  assert.equal(f.started.length, 2, "a released player schedules nothing new");
});

test("changing sound preferences stops cinema sounds at once", async () => {
  const f = await cinemaFixture();
  await f.audio.playFrom(0);
  await settle();
  f.changed();
  assert.deepEqual(f.stopped, ["stamp-whoosh", "stamp-thump"]);
});
