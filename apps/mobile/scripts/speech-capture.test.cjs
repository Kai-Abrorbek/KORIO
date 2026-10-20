const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function loadSource(file) {
  const source = readFileSync(path.join(__dirname, "../src/utils", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const result = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => {
      throw new Error(`Unexpected dependency: ${name}`);
    },
    result,
    result.exports,
  );
  return result.exports;
}

const { createSpeechCapture } = loadSource("speech-capture.ts");

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
};
const tick = () => new Promise((done) => setTimeout(done, 0));
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

/** 가짜 마이크 — 각 단계를 손으로 풀어 줄 수 있다 */
function fixture(overrides = {}) {
  const calls = [];
  let holds = 0;
  const deps = {
    requestPermission: async () => {
      calls.push("permission");
      return { granted: true };
    },
    activateAudio: async () => {
      calls.push("audio");
    },
    startStream: async () => {
      calls.push("stream:start");
    },
    stopStream: () => {
      calls.push("stream:stop");
    },
    holdCapture: () => {
      holds += 1;
      calls.push("hold");
      let released = false;
      return () => {
        if (released) return;
        released = true;
        holds -= 1;
        calls.push("release");
      };
    },
    timeouts: { permission: 200, audio: 30, stream: 60 },
    ...overrides,
  };
  return { capture: createSpeechCapture(deps), calls, holds: () => holds };
}

test("a normal start opens the mic and holds UI sounds until finish", async () => {
  const { capture, calls, holds } = fixture();
  assert.deepEqual(await capture.start(), { ok: true });
  assert.equal(capture.active, true);
  assert.equal(holds(), 1);
  assert.equal(capture.finish(), true);
  assert.equal(capture.active, false);
  assert.equal(holds(), 0);
  assert.deepEqual(calls, ["permission", "hold", "audio", "stream:start", "stream:stop", "release"]);
});

// 2026-10-20: 자동으로 열리는 마이크와 사용자의 탭이 겹치면 두 start 가 서로를 무르고
// 둘 다 조용히 false 가 됐다 — 화면은 아무 반응 없이 그대로였다.
test("a second start while one is in flight joins it instead of failing silently", async () => {
  const permission = deferred();
  const { capture, calls } = fixture({
    requestPermission: () => {
      calls.push("permission");
      return permission.promise;
    },
  });
  const first = capture.start();
  const second = capture.start();
  permission.resolve({ granted: true });
  assert.deepEqual(await first, { ok: true });
  assert.deepEqual(await second, { ok: true });
  assert.equal(calls.filter((call) => call === "stream:start").length, 1);
});

test("cancel during start ends that attempt and the next start works", async () => {
  const permission = deferred();
  let asked = 0;
  const { capture, holds } = fixture({
    requestPermission: () => {
      asked += 1;
      return asked === 1 ? permission.promise : Promise.resolve({ granted: true });
    },
  });
  const first = capture.start();
  capture.cancel();
  const second = capture.start();
  permission.resolve({ granted: true });
  assert.deepEqual(await first, { ok: false, reason: "cancelled" });
  assert.deepEqual(await second, { ok: true });
  assert.equal(capture.active, true);
  assert.equal(holds(), 1);
});

test("a cancelled attempt that finishes late never stops the newer recording", async () => {
  const stream = deferred();
  let starts = 0;
  const { capture, calls } = fixture({
    startStream: () => {
      starts += 1;
      calls.push("stream:start");
      return starts === 1 ? stream.promise : Promise.resolve();
    },
  });
  const first = capture.start();
  await tick();
  await tick();
  capture.cancel();
  const second = capture.start();
  stream.resolve();
  assert.deepEqual(await first, { ok: false, reason: "cancelled" });
  assert.deepEqual(await second, { ok: true });
  assert.equal(capture.active, true);
  // 마지막 동작은 새 녹음의 시작이어야 한다 — 늦게 끝난 옛 시도가 멈추면 안 된다
  assert.equal(calls[calls.length - 1], "stream:start");
});

// 오디오 세션 큐가 밀려 있어도 마이크는 연다 — 예전엔 여기서 start 가 영영 안 끝나
// "시작 중" 표시가 굳고, 그 뒤 모든 탭이 조용히 무시됐다.
test("a stuck audio session does not wedge the mic", async () => {
  const { capture } = fixture({ activateAudio: () => new Promise(() => undefined) });
  assert.deepEqual(await capture.start(), { ok: true });
  assert.equal(capture.active, true);
});

test("a stream that never starts times out with a visible error and the next start is free", async () => {
  let starts = 0;
  const { capture, holds } = fixture({
    startStream: () => {
      starts += 1;
      return starts === 1 ? new Promise(() => undefined) : Promise.resolve();
    },
  });
  assert.deepEqual(await capture.start(), { ok: false, reason: "mic" });
  assert.equal(capture.active, false);
  assert.equal(holds(), 0);
  assert.deepEqual(await capture.start(), { ok: true });
});

test("a stream that throws reports mic and releases UI sounds", async () => {
  const { capture, holds } = fixture({
    startStream: async () => {
      throw new Error("mic held by another app");
    },
  });
  assert.deepEqual(await capture.start(), { ok: false, reason: "mic" });
  assert.equal(holds(), 0);
});

test("denied permission is reported, not swallowed", async () => {
  const { capture, holds } = fixture({ requestPermission: async () => ({ granted: false }) });
  assert.deepEqual(await capture.start(), { ok: false, reason: "permission" });
  assert.equal(holds(), 0);
});

test("a permission request that never answers times out instead of wedging", async () => {
  let asked = 0;
  const { capture } = fixture({
    requestPermission: () => {
      asked += 1;
      return asked === 1 ? new Promise(() => undefined) : Promise.resolve({ granted: true });
    },
  });
  assert.deepEqual(await capture.start(), { ok: false, reason: "mic" });
  assert.deepEqual(await capture.start(), { ok: true });
});

test("start while already recording reports ok without reopening", async () => {
  const { capture, calls } = fixture();
  await capture.start();
  assert.deepEqual(await capture.start(), { ok: true });
  assert.equal(calls.filter((call) => call === "stream:start").length, 1);
});

test("finish and cancel without an active recording are harmless", async () => {
  const { capture, calls } = fixture();
  assert.equal(capture.finish(), false);
  capture.cancel();
  assert.deepEqual(calls, []);
  await wait(5);
  assert.deepEqual(await capture.start(), { ok: true });
});

test("stopping mid-start frees UI sounds at once, not when the attempt settles", async () => {
  const audio = deferred();
  const { capture, holds } = fixture({ activateAudio: () => audio.promise, timeouts: { audio: 5000 } });
  const starting = capture.start();
  await tick();
  await tick();
  assert.equal(holds(), 1);
  capture.finish();
  assert.equal(holds(), 0);
  audio.resolve();
  assert.deepEqual(await starting, { ok: false, reason: "cancelled" });
  assert.equal(holds(), 0);
});
