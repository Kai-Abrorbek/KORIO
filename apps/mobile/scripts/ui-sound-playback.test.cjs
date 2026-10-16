const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function loadSource(file, dependencies = {}) {
  const source = readFileSync(
    path.join(__dirname, "../src/utils", file),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const result = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => {
      if (name in dependencies) return dependencies[name];
      throw new Error(`Unexpected dependency: ${name}`);
    },
    result,
    result.exports,
  );
  return result.exports;
}

const { createUiSoundPlayback } = loadSource("ui-sound-player.ts");
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

function fixture(overrides = {}) {
  const players = Object.fromEntries(
    ["click", "select", "correct", "wrong", "comboBig"].map((key) => [
      key,
      {
        isLoaded: false, // Android reports false at STATE_ENDED, despite a loaded source.
        currentTime: 1,
        volume: 0,
        plays: 0,
        pauses: 0,
        seeks: [],
        async seekTo(...args) {
          this.seeks.push(args);
          this.currentTime = 0;
        },
        play() {
          assert.equal(this.currentTime, 0);
          this.plays++;
          this.currentTime = 1;
        },
        pause() {
          this.pauses++;
        },
      },
    ]),
  );
  const state = { volume: 0.7, blocked: false };
  const controller = createUiSoundPlayback({
    players,
    isTap: (key) => key === "click" || key === "select",
    volumeFor: (_key, options) => options?.volume ?? state.volume,
    prepareAudio: async () => {},
    blocked: () => state.blocked,
    ...overrides,
  });
  return { players, state, controller };
}

test("Android ended sounds rewind and replay every time, even when isLoaded is false", async () => {
  const { players, controller } = fixture();
  for (let index = 0; index < 4; index++) await controller.play("correct");
  assert.equal(players.correct.plays, 4);
  assert.deepEqual(
    players.correct.seeks,
    Array.from({ length: 4 }, () => [0, 0, 0]),
  );
});

test("a button click cannot cancel a pending correct-answer sound", async () => {
  const correctReady = deferred();
  const clickReady = deferred();
  let preparation = 0;
  const { controller, players } = fixture({
    prepareAudio: () =>
      ++preparation === 1 ? correctReady.promise : clickReady.promise,
  });
  const correct = controller.play("correct");
  const click = controller.play("click");
  clickReady.resolve();
  await click;
  correctReady.resolve();
  await correct;
  assert.equal(players.correct.plays, 1);
  assert.equal(players.click.plays, 1);
});

test("a newer feedback outcome replaces an older one, even if readiness resolves backwards", async () => {
  const oldReady = deferred();
  const newReady = deferred();
  let preparation = 0;
  const { controller, players } = fixture({
    prepareAudio: () =>
      ++preparation === 1 ? oldReady.promise : newReady.promise,
  });
  const old = controller.play("correct");
  const latest = controller.play("wrong");
  newReady.resolve();
  await latest;
  oldReady.resolve();
  await old;
  assert.equal(players.correct.plays, 0);
  assert.equal(players.wrong.plays, 1);
});

test("muting cancels pending sound even when the user enables it again before seek finishes", async () => {
  const pending = deferred();
  const { controller, players, state } = fixture();
  players.correct.seekTo = () => pending.promise;
  const playing = controller.play("correct");
  await Promise.resolve();
  controller.stop();
  state.volume = 0;
  state.volume = 0.7;
  pending.resolve();
  await playing;
  assert.equal(players.correct.plays, 0);
  assert.equal(players.correct.pauses, 1);
});

test("capture blocks sound without changing the native session; release allows the next button", async () => {
  let prepares = 0;
  const { controller, players, state } = fixture({
    prepareAudio: async () => {
      prepares++;
    },
  });
  state.blocked = true;
  await controller.play("click");
  assert.equal(prepares, 0);
  state.blocked = false;
  await controller.play("click");
  assert.equal(players.click.plays, 1);
});

test("capture taking ownership while preparation is pending prevents late playback", async () => {
  const pending = deferred();
  const { controller, players, state } = fixture({
    prepareAudio: () => pending.promise,
  });
  const playing = controller.play("click");
  state.blocked = true;
  pending.resolve();
  await playing;
  assert.equal(players.click.plays, 0);
});

test("a failed player does not prevent later feedback and the big combo stays a single cue", async () => {
  const { controller, players } = fixture();
  players.correct.seekTo = async () => {
    throw new Error("native seek failed");
  };
  await controller.play("correct");
  await controller.play("comboBig");
  assert.equal(players.correct.plays, 0);
  assert.equal(players.comboBig.plays, 1);
  assert.equal(players.comboBig.volume, 0.7);
});

test("capture ownership is reference-counted and releases are idempotent", () => {
  const capture = loadSource("ui-sound-capture.ts");
  const transitions = [];
  const unsubscribe = capture.subscribeUiSoundCapture((blocked) =>
    transitions.push(blocked),
  );
  const releaseFirst = capture.holdUiSoundsForCapture();
  const releaseSecond = capture.holdUiSoundsForCapture();
  releaseFirst();
  releaseFirst();
  assert.equal(capture.isUiSoundCaptureActive(), true);
  releaseSecond();
  assert.equal(capture.isUiSoundCaptureActive(), false);
  assert.deepEqual(transitions, [true, false]);
  unsubscribe();
});

test("queued SFX audio configuration cannot override a newly acquired recording session", async () => {
  const capture = loadSource("ui-sound-capture.ts");
  const activation = deferred();
  const modes = [];
  const sessions = loadSource("audio-session.ts", {
    "./ui-sound-capture": capture,
    "expo-audio": {
      setIsAudioActiveAsync: () => activation.promise,
      setAudioModeAsync: async (mode) => {
        modes.push(mode);
      },
    },
  });
  const sound = sessions.activateUiSoundAudio();
  await Promise.resolve();
  const release = capture.holdUiSoundsForCapture();
  const recording = sessions.activateRecordingAudio();
  activation.resolve();
  await Promise.all([sound, recording]);
  assert.equal(modes.length, 1);
  assert.equal(modes[0].allowsRecording, true);
  release();
  await sessions.activateUiSoundAudio();
  assert.equal(modes[1].allowsRecording, false);
});

for (const [file, name] of [
  ["../hooks/useSpeechRecorder.ts", "useSpeechRecorder"],
  [
    "../features/reading-listening/useContinuousReadingRecorder.ts",
    "useContinuousReadingRecorder",
  ],
]) {
  for (const phase of ["audio mode", "native stream"]) {
    test(`${name}: stopping during ${phase} releases SFX ownership and prevents late recording`, async () => {
      const capture = loadSource("ui-sound-capture.ts");
      const ready = deferred();
      const entered = deferred();
      const states = [];
      let stops = 0;
      let firstStart = true;
      const stream = {
        start: async () => {
          if (phase === "native stream" && firstStart) {
            entered.resolve();
            await ready.promise;
          }
        },
        stop: () => {
          stops++;
        },
      };
      const hooks = loadSource(file, {
        react: {
          useRef: (current) => ({ current }),
          useCallback: (callback) => callback,
          useState: (initial) => [initial, (next) => states.push(next)],
          useEffect: () => {},
        },
        "expo-audio": {
          requestRecordingPermissionsAsync: async () => ({ granted: true }),
          useAudioStream: () => ({ stream }),
        },
        "@/utils/audio-session": {
          activateRecordingAudio: async () => {
            if (phase === "audio mode" && firstStart) {
              entered.resolve();
              await ready.promise;
            }
          },
        },
        "@/utils/ui-sound-capture": capture,
        "@/utils/wav": {
          TARGET_SAMPLE_RATE: 16000,
          concatInt16: () => new Int16Array(),
          resampleInt16: (pcm) => pcm,
        },
      });
      const recorder = hooks[name]({
        onResult: () => {},
        onSegment: async () => ({ consumedMs: 0, dropAll: false }),
      });
      const starting = recorder.start();
      await entered.promise;
      assert.equal(capture.isUiSoundCaptureActive(), true);
      recorder.stop();
      assert.equal(capture.isUiSoundCaptureActive(), false);
      assert.equal(
        await recorder.start(),
        false,
        "do not overlap a pending native start",
      );
      ready.resolve();
      assert.equal(await starting, false);
      assert.equal(
        states.includes(true),
        false,
        "a cancelled start cannot resurrect recording",
      );
      assert.equal(capture.isUiSoundCaptureActive(), false);
      firstStart = false;
      assert.equal(await recorder.start(), true);
      assert.equal(capture.isUiSoundCaptureActive(), true);
      recorder.stop();
      assert.equal(capture.isUiSoundCaptureActive(), false);
      assert.ok(stops > 0);
    });
  }
}
