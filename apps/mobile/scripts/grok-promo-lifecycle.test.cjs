const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(file, dependencies = {}) {
  const source = readFileSync(path.join(__dirname, "../src", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)((name) => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name];
    throw new Error(`Unexpected dependency: ${name}`);
  }, module, module.exports);
  return module.exports;
}

const { createPromoConnectionOwner } = load("features/grok-promo-tutor/promo-connection-owner.ts");
const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((done, fail) => { resolve = done; reject = fail; });
  return { promise, resolve, reject };
};
const tick = () => new Promise((done) => setImmediate(done));

function fixture() {
  const operations = [];
  const audio = load("utils/audio-session.ts", {
    "expo-audio": {
      setIsAudioActiveAsync: async () => { operations.push("audio-active"); },
      setAudioModeAsync: async () => { operations.push("playback-mode"); },
    },
    "./ui-sound-capture": { isUiSoundCaptureActive: () => false },
  });
  return { operations, audio, owner: createPromoConnectionOwner(audio.holdAudioSessionUntil) };
}

test("cancel mid-connect drains old native audio before a new promo connection opens", async () => {
  const { owner, audio, operations } = fixture();
  const pending = deferred();
  const stopped = deferred();
  const first = owner.connect(async () => {
    // Same synchronous snapshot as connectLiveKitTutor; reserving before it
    // would deadlock the cancelled connection against its own cleanup.
    await audio.waitForAudioSessionIdle();
    operations.push("old-connect");
    return pending.promise;
  });
  await tick();
  const ending = owner.close();
  let restarted = false;
  const second = owner.connect(async () => {
    restarted = true;
    operations.push("new-connect");
    return { close: async () => undefined };
  });
  pending.resolve({ close: async () => { operations.push("old-stop"); await stopped.promise; operations.push("old-stopped"); } });
  assert.equal(await first, null);
  await tick();
  assert.equal(restarted, false);
  stopped.resolve();
  await ending;
  assert.ok(await second);
  assert.deepEqual(operations, ["old-connect", "old-stop", "old-stopped", "new-connect"]);
});

test("unmount cleanup reserves audio synchronously for an ordinary tutor or Expo playback", async () => {
  const { owner, audio, operations } = fixture();
  const pending = deferred();
  const stopped = deferred();
  const first = owner.connect(() => pending.promise);
  await tick();
  const closing = owner.close();
  let ordinaryReady = false;
  const ordinary = audio.waitForAudioSessionIdle().then(() => { ordinaryReady = true; });
  const playback = audio.activatePlaybackAudio("doNotMix");
  await tick();
  assert.equal(ordinaryReady, false);
  assert.deepEqual(operations, []);
  pending.resolve({ close: () => stopped.promise });
  assert.equal(await first, null);
  await tick();
  assert.equal(ordinaryReady, false);
  stopped.resolve();
  await Promise.all([closing, ordinary, playback]);
  assert.equal(ordinaryReady, true);
  assert.deepEqual(operations, ["audio-active", "playback-mode"]);
});

test("a failed pending connection drains its own cleanup before audio can be reused", async () => {
  const { owner, audio } = fixture();
  const failure = deferred();
  const first = owner.connect(() => failure.promise);
  const rejection = assert.rejects(first, /connect failed/);
  await tick();
  const closing = owner.close();
  let available = false;
  const waiting = audio.waitForAudioSessionIdle().then(() => { available = true; });
  await tick();
  assert.equal(available, false);
  failure.reject(new Error("connect failed"));
  await Promise.all([rejection, closing, waiting]);
  assert.equal(available, true);
});

test("repeated close joins teardown and never stops the same native call twice", async () => {
  const { owner } = fixture();
  const stopped = deferred();
  let closes = 0;
  await owner.connect(async () => ({ close: async () => { closes += 1; await stopped.promise; } }));
  const first = owner.close();
  const second = owner.close();
  assert.equal(first, second);
  await tick();
  assert.equal(closes, 1);
  stopped.resolve();
  await Promise.all([first, second]);
});

test("cancelling before connect begins prevents opening an obsolete owner's microphone", async () => {
  const { owner } = fixture();
  let opens = 0;
  const connection = owner.connect(async () => { opens += 1; return { close: async () => undefined }; });
  await owner.close();
  assert.equal(await connection, null);
  assert.equal(opens, 0);
});
