/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

const deferred = () => {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

/** Run the real TypeScript modules; replace only React, native APIs, and services. */
function loadSource(file, dependencies, clock) {
  const source = readFileSync(path.join(__dirname, "../src", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const module = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    "setTimeout",
    "clearTimeout",
    "Date",
    "__DEV__",
    outputText,
  )(
    (name) => {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected dependency in ${file}: ${name}`);
    },
    module,
    module.exports,
    clock.setTimeout,
    clock.clearTimeout,
    class extends Date {
      static now() {
        return clock.now;
      }
    },
    false,
  );
  return module.exports;
}

function createClock() {
  let sequence = 0;
  const timers = new Map();
  return {
    now: 1000,
    setTimeout(callback, delay = 0) {
      const id = ++sequence;
      timers.set(id, { at: this.now + delay, callback });
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    async advance(ms, flush) {
      const end = this.now + ms;
      for (;;) {
        const next = [...timers]
          .filter(([, timer]) => timer.at <= end)
          .sort(
            ([leftId, left], [rightId, right]) =>
              left.at - right.at || leftId - rightId,
          )[0];
        if (!next) break;
        timers.delete(next[0]);
        this.now = next[1].at;
        next[1].callback();
        await flush();
      }
      this.now = end;
      await flush();
    },
  };
}

/** Minimal committed-render lifecycle, including dependency cleanups and focus loss. */
function createHooks() {
  const slots = [];
  let cursor = 0;
  let dirty = true;
  let focused = true;
  let mounted = true;
  let renderHook;
  let value;
  const equalDeps = (left, right) =>
    left &&
    right &&
    left.length === right.length &&
    left.every((item, index) => Object.is(item, right[index]));
  const memo = (factory, deps) => {
    const index = cursor++;
    if (!slots[index] || !equalDeps(slots[index].deps, deps)) {
      slots[index] = { deps, value: factory() };
    }
    return slots[index].value;
  };
  const effect = (create, deps, focus = false) => {
    const index = cursor++;
    const previous = slots[index];
    if (!previous || !equalDeps(previous.deps, deps)) {
      slots[index] = {
        deps,
        create,
        focus,
        cleanup: previous?.cleanup,
        pending: true,
      };
    }
  };
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!slots[index]) {
        slots[index] = {
          value: typeof initial === "function" ? initial() : initial,
        };
        slots[index].set = (next) => {
          if (!mounted) return;
          const previous = slots[index].value;
          const value = typeof next === "function" ? next(previous) : next;
          if (!Object.is(previous, value)) {
            slots[index].value = value;
            dirty = true;
          }
        };
      }
      return [slots[index].value, slots[index].set];
    },
    useRef(initial) {
      const index = cursor++;
      if (!slots[index]) slots[index] = { current: initial };
      return slots[index];
    },
    useMemo: memo,
    useCallback(callback, deps) {
      return memo(() => callback, deps);
    },
    useEffect: effect,
  };
  function render() {
    if (!mounted || !dirty) return;
    dirty = false;
    cursor = 0;
    value = renderHook();
    const effects = slots.filter((slot) => slot.pending);
    for (const slot of effects) {
      slot.cleanup?.();
      slot.cleanup = undefined;
    }
    for (const slot of effects) {
      slot.pending = false;
      if (!slot.focus || focused) slot.cleanup = slot.create();
    }
  }
  return {
    react,
    get value() {
      return value;
    },
    mount(hook) {
      renderHook = hook;
      render();
    },
    render,
    rerender() {
      dirty = true;
      render();
    },
    useFocusEffect(callback) {
      effect(callback, [callback], true);
    },
    blur() {
      focused = false;
      for (const slot of slots.filter((slot) => slot.focus)) {
        slot.cleanup?.();
        slot.cleanup = undefined;
      }
    },
    focus() {
      focused = true;
      for (const slot of slots.filter((slot) => slot.focus))
        slot.cleanup = slot.create();
    },
    unmount() {
      if (!mounted) return;
      mounted = false;
      for (const slot of slots) slot.cleanup?.();
    },
  };
}

async function fixture(t, options = {}) {
  const hooks = createHooks();
  const clock = createClock();
  // Functions are injected as standalone globals into each loaded module.
  clock.setTimeout = clock.setTimeout.bind(clock);
  clock.clearTimeout = clock.clearTimeout.bind(clock);
  const calls = {
    permission: 0,
    permissionCheck: 0,
    nativeStart: 0,
    nativeStop: 0,
    cancel: 0,
  };
  const stateListeners = new Set();
  const reads = [];
  const permission = options.permission;
  let streamOptions;
  let recorderOptions;
  let recording = false;
  let speechActive = null;
  const stream = {
    async start() {
      calls.nativeStart++;
      recording = true;
    },
    stop() {
      calls.nativeStop++;
      recording = false;
    },
  };
  const capture = loadSource("utils/ui-sound-capture.ts", {}, clock);
  const { useSpeechRecorder: nativeRecorder } = loadSource(
    "hooks/useSpeechRecorder.ts",
    {
      react: hooks.react,
      "expo-audio": {
        getRecordingPermissionsAsync: () => {
          calls.permissionCheck++;
          return Promise.resolve({ granted: options.granted === true });
        },
        requestRecordingPermissionsAsync: () => {
          calls.permission++;
          // Android: Activity.requestPermissions always launches the system
          // permission activity, even when already granted -> onPause -> RN
          // AppState "background", then "active" once it closes.
          if (options.permissionScreen) {
            for (const listener of stateListeners) listener("background");
          }
          const result = permission?.promise ?? Promise.resolve({ granted: true });
          if (!options.permissionScreen) return result;
          return result.then((value) => {
            for (const listener of stateListeners) listener("active");
            return value;
          });
        },
        useAudioStream: (next) => {
          streamOptions = next;
          return { stream, isStreaming: recording };
        },
      },
      "@/utils/audio-session": { activateRecordingAudio: async () => {} },
      "@/utils/ui-sound-capture": capture,
      "@/utils/speech-capture": loadSource(
        "utils/speech-capture.ts",
        {},
        clock,
      ),
      "@/utils/wav": loadSource("utils/wav.ts", {}, clock),
    },
    clock,
  );
  // A lagging bridge double lets orchestration tests deliver an already-committed
  // success after cancel, or leave an old start pending while a new start succeeds.
  // The normal and permission-overlap cases above it use the actual recorder/controller.
  const bridgeStarts = [];
  const bridgeRecorder = {
    isRecording: false,
    start() {
      calls.nativeStart++;
      const pending = deferred();
      bridgeStarts.push(pending);
      return pending.promise;
    },
    stop() {
      recording = false;
      calls.nativeStop++;
    },
    cancel() {
      recording = false;
      calls.cancel++;
    },
  };
  const speech = {
    speak: () => {},
    speakSlow: () => {},
    prewarm: () => {},
    speakAuto(text, language, playbackOptions) {
      speechActive = { text, language, options: playbackOptions };
      reads.push(speechActive);
    },
    stop() {
      speechActive = null;
    },
    isSpeaking: false,
    isSpeechPlaying: false,
    speechProgress: 0,
  };
  const item = {
    id: "expression-1",
    korean: "안녕하세요 반갑습니다",
    ...(options.english ? { text: "Hello, nice to meet you", targetLanguage: "en" } : {}),
    progress: { isSaved: false },
  };
  const requests = [];
  const auth = { user: { id: "learner-1" }, isLoggedIn: true };
  const { useSpeakingPractice } = loadSource(
    "features/speaking/useSpeakingPractice.ts",
    {
      react: hooks.react,
      "react-native": {
        AppState: {
          addEventListener: (_event, listener) => {
            stateListeners.add(listener);
            return { remove: () => stateListeners.delete(listener) };
          },
        },
      },
      "expo-router": { useFocusEffect: hooks.useFocusEffect },
      "@/store/auth.store": { useAuthStore: (selector) => selector(auth) },
      "@/store/speaking.store": {
        speakingCursorOf: () => 0,
        useSpeakingCursorStore: { getState: () => ({ setCursor: () => {} }) },
      },
      "@/hooks/useSpeech": { useSpeech: () => speech },
      "@/hooks/useSpeechRecorder": {
        useSpeechRecorder: (next) => {
          recorderOptions = next;
          return options.laggingBridge ? bridgeRecorder : nativeRecorder(next);
        },
      },
      "@/services/expression.service": {
        ExpressionService: {
          getPackExpressions: async (...args) => {
            requests.push(["items", ...args]);
            return { items: [item], pack: { targetLanguage: options.english ? "en" : "ko" } };
          },
          getSpeakingProgress: async (...args) => {
            requests.push(["progress", ...args]);
            return { index: 0 };
          },
          saveSpeakingProgress: async () => ({}),
        },
      },
      "@/services/stt.service": {
        SttService: { assessExpression: async () => ({ status: "no_speech" }) },
      },
      "@/utils/haptics": {
        impactAsync: async () => {},
        notificationAsync: async () => {},
        selectionAsync: async () => {},
        ImpactFeedbackStyle: { Light: "light" },
        NotificationFeedbackType: { Success: "success", Warning: "warning" },
      },
      "./session": loadSource("features/speaking/session.ts", {}, clock),
      "@/store/settings.store": {
        useContentLang: () => "en",
        useSettingsStore: (selector) => selector({ learnCourse: options.english ? "en" : "ko" }),
      },
      "@/utils/streak-chest-route": { openCelebration: () => {} },
    },
    clock,
  );
  async function flush() {
    // Covers the real recorder's permission -> audio -> stream promise chain and
    // all committed renders, without depending on real time or Promise internals.
    for (let index = 0; index < 60; index++) {
      await Promise.resolve();
      hooks.render();
    }
  }
  hooks.mount(() => useSpeakingPractice("greetings", options.proficiency));
  await flush();
  t.after(() => hooks.unmount());
  return {
    calls,
    reads,
    requests,
    bridgeStarts,
    get page() {
      return hooks.value;
    },
    get recording() {
      return recording;
    },
    flush,
    advance: (ms) => clock.advance(ms, flush),
    rerender: async () => {
      hooks.rerender();
      await flush();
    },
    finishRead() {
      assert.ok(speechActive, "automatic TTS should have begun");
      speechActive.options.onDone();
    },
    blur: async () => {
      hooks.blur();
      await flush();
    },
    focus: async () => {
      hooks.focus();
      await flush();
    },
    unmount: async () => {
      hooks.unmount();
      await flush();
    },
    appState: async (state) => {
      for (const listener of stateListeners) listener(state);
      await flush();
    },
    pcm: async () => {
      if (options.laggingBridge) recorderOptions.onLevel(1400);
      else
        streamOptions.onBuffer({
          data: new Int16Array(1600).fill(1400).buffer,
          sampleRate: 16000,
          channels: 1,
        });
      await flush();
    },
  };
}

test("English speaking uses the selected grade and English voice", async (t) => {
  const app = await fixture(t, { english: true, proficiency: "intermediate" });
  assert.deepEqual(app.requests.slice(0, 2), [
    ["items", "greetings", undefined, undefined, "intermediate"],
    ["progress", "greetings", "intermediate"],
  ]);
  await app.advance(120);
  assert.equal(app.reads[0]?.text, "Hello, nice to meet you");
  assert.equal(app.reads[0]?.language, "en-US");
});

test("English speaking deep links start at beginner when no grade is supplied", async (t) => {
  const app = await fixture(t, { english: true });
  assert.equal(app.requests[0]?.at(-1), "beginner");
  assert.equal(app.requests[1]?.at(-1), "beginner");
});

test("automatic TTS completion starts the actual microphone recorder", async (t) => {
  const app = await fixture(t);
  assert.equal(app.page.loading, false);
  await app.advance(120);
  assert.equal(app.reads.length, 1);
  assert.equal(app.calls.nativeStart, 0);
  app.finishRead();
  await app.advance(150);
  assert.equal(app.page.phase, "recording");
  assert.equal(app.recording, true);
  assert.equal(app.calls.nativeStart, 1);
});

test("manual press during the automatic permission request joins rather than cancels it", async (t) => {
  const permission = deferred();
  const app = await fixture(t, { permission });
  await app.advance(120);
  app.finishRead();
  await app.advance(150);
  assert.equal(app.page.phase, "starting");
  assert.equal(app.calls.permission, 1);
  const manual = app.page.record();
  await app.flush();
  permission.resolve({ granted: true });
  await app.flush();
  await manual;
  assert.equal(
    app.calls.permission,
    1,
    "the same pending start must be retained",
  );
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
});

test("manual microphone and incoming PCM remain active across committed rerenders", async (t) => {
  const app = await fixture(t);
  const start = app.page.record();
  await app.flush();
  await start;
  for (let count = 0; count < 4; count++) {
    await app.advance(100);
    await app.pcm();
    await app.rerender();
  }
  assert.equal(app.page.phase, "recording");
  assert.equal(app.recording, true);
  assert.equal(app.page.debug.buffers, 4);
  assert.ok(app.page.level > 0);
  assert.equal(app.calls.nativeStart, 1);
});

test("granting permission after eight seconds still starts the pending microphone", async (t) => {
  const permission = deferred();
  const app = await fixture(t, { permission });
  const pending = app.page.record();
  await app.flush();
  await app.advance(9000);
  assert.equal(
    app.page.phase,
    "starting",
    "the page must not impose an earlier permission timeout",
  );
  assert.equal(app.page.error, null);
  permission.resolve({ granted: true });
  await app.flush();
  await pending;
  assert.equal(app.calls.permission, 1);
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
});

test("unmount between TTS completion and the delayed microphone start opens no microphone", async (t) => {
  const app = await fixture(t);
  await app.advance(120);
  app.finishRead();
  await app.advance(75);
  await app.unmount();
  await app.advance(1000);
  assert.equal(app.calls.permission, 0);
  assert.equal(app.calls.nativeStart, 0);
});

test("a delayed old TTS completion cannot restart a microphone opened manually", async (t) => {
  const app = await fixture(t);
  await app.advance(120);
  const oldRead = app.reads[0];
  const pending = app.page.record();
  await app.flush();
  await pending;
  oldRead.options.onDone();
  await app.advance(150);
  await app.pcm();
  assert.equal(app.calls.permission, 1);
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
  assert.equal(app.page.error, null);
});

test("navigation during a pending start cannot resurrect recording on late success", async (t) => {
  const app = await fixture(t, { laggingBridge: true });
  const pending = app.page.record();
  await app.flush();
  assert.equal(app.page.phase, "starting");
  await app.blur();
  app.bridgeStarts[0].resolve(true);
  await app.flush();
  await pending;
  assert.equal(
    app.page.phase,
    "idle",
    "a departed start must not become recording",
  );
});

// 2026-10-20: the Android permission activity reports AppState "background"
// while the microphone is starting. That must not cancel the start.
test("Android permission screen during start still opens the microphone", async (t) => {
  const app = await fixture(t, { permissionScreen: true });
  const pending = app.page.record();
  await app.flush();
  await pending;
  assert.equal(app.calls.permission, 1);
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
  assert.equal(app.recording, true);
  assert.equal(app.page.error, null);
});

test("automatic microphone survives the Android permission screen too", async (t) => {
  const app = await fixture(t, { permissionScreen: true });
  await app.advance(120);
  app.finishRead();
  await app.advance(150);
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
});

test("already granted permission is checked without opening the system screen", async (t) => {
  const app = await fixture(t, { granted: true, permissionScreen: true });
  const pending = app.page.record();
  await app.flush();
  await pending;
  assert.equal(app.calls.permissionCheck, 1);
  assert.equal(app.calls.permission, 0);
  assert.equal(app.calls.nativeStart, 1);
  assert.equal(app.page.phase, "recording");
});

test("going to the background while recording still stops the microphone", async (t) => {
  const app = await fixture(t);
  const pending = app.page.record();
  await app.flush();
  await pending;
  assert.equal(app.page.phase, "recording");
  await app.appState("background");
  assert.equal(app.page.phase, "idle");
  assert.equal(app.recording, false);
});

test("an old start timeout cannot cancel a newer recording after navigation", async (t) => {
  const app = await fixture(t, { laggingBridge: true });
  const oldStart = app.page.record();
  await app.flush();
  await app.advance(100);
  await app.blur();
  await app.focus();
  const newerStart = app.page.record();
  await app.flush();
  app.bridgeStarts[1].resolve(true);
  await app.flush();
  await newerStart;
  await app.pcm();
  const cancels = app.calls.cancel;
  await app.advance(7900);
  app.bridgeStarts[0].resolve(true);
  await app.flush();
  await oldStart;
  assert.equal(
    app.calls.cancel,
    cancels,
    "old timeout must not cancel the current recorder",
  );
  assert.equal(app.page.phase, "recording");
  assert.equal(app.page.error, null);
});

for (const stop of ["cancel", "stop"]) {
  for (const result of [{ ok: true }, { ok: false, reason: "mic" }]) {
    test(`recorder ${stop} ignores an already-resolved ${result.ok ? "success" : "error"} before its continuation`, async () => {
      const hooks = createHooks();
      const clock = createClock();
      clock.setTimeout = clock.setTimeout.bind(clock);
      clock.clearTimeout = clock.clearTimeout.bind(clock);
      const pending = deferred();
      const errors = [];
      const capture = {
        active: false,
        start: () => pending.promise,
        cancel() {},
        finish: () => false,
      };
      const { useSpeechRecorder } = loadSource(
        "hooks/useSpeechRecorder.ts",
        {
          react: hooks.react,
          "expo-audio": {
            requestRecordingPermissionsAsync: async () => ({ granted: true }),
            useAudioStream: () => ({ stream: {} }),
          },
          "@/utils/audio-session": { activateRecordingAudio: async () => {} },
          "@/utils/ui-sound-capture": {
            holdUiSoundsForCapture: () => () => {},
          },
          "@/utils/speech-capture": { createSpeechCapture: () => capture },
          "@/utils/wav": loadSource("utils/wav.ts", {}, clock),
        },
        clock,
      );
      hooks.mount(() =>
        useSpeechRecorder({
          onResult() {},
          onError: (error) => errors.push(error),
        }),
      );
      const starting = hooks.value.start();
      pending.resolve(result);
      // The bridge result is decided, but the recorder continuation has not run.
      hooks.value[stop]();
      assert.equal(await starting, false);
      hooks.render();
      assert.equal(hooks.value.isRecording, false);
      assert.deepEqual(errors, []);
      hooks.unmount();
    });
  }
}
