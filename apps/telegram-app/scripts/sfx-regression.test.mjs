import assert from "node:assert/strict";
import { setImmediate, setTimeout as waitTimers } from "node:timers/promises";
import { test } from "node:test";

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
