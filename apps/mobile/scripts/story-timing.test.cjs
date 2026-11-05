/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

/** 듣기 이야기: 재생 위치 → 문장·단어 (src/features/stories/storyTiming.ts) */
function load(relative) {
  const file = path.resolve(__dirname, relative);
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => {
      throw new Error(`Unexpected dependency ${name} in ${file}`);
    },
    module,
    module.exports,
  );
  return module.exports;
}

const timing = load("../src/features/stories/storyTiming.ts");

const sentence = (startMs, words) => ({
  startMs,
  words: words.map(([text, start, end]) => ({ text, startMs: start, endMs: end })),
});

// "Hello, everyone." 0–1161ms, 쉼 650ms, "My name is Rustam." 1811ms~
const story = [
  sentence(0, [
    ["Hello,", 0, 476],
    ["everyone.", 511, 1161],
  ]),
  sentence(1811, [
    ["My", 1811, 1997],
    ["name", 2078, 2241],
    ["is", 2275, 2357],
    ["Rustam.", 2426, 3216],
  ]),
];

test("the first word lights up from the very start", () => {
  assert.deepEqual(timing.locateInStory(story, 0), { sentence: 0, word: 0 });
  assert.deepEqual(timing.locateInStory(story, 600), { sentence: 0, word: 1 });
});

test("the pause between sentences marks the whole sentence as read", () => {
  assert.deepEqual(timing.locateInStory(story, 1500), { sentence: 0, word: 2 });
});

test("the next sentence takes over just before its first word", () => {
  assert.deepEqual(timing.locateInStory(story, 1780), { sentence: 1, word: -1 });
  assert.deepEqual(timing.locateInStory(story, 2300), { sentence: 1, word: 2 });
  assert.deepEqual(timing.locateInStory(story, 9000), { sentence: 1, word: 4 });
});

test("sentences without timings (device voice) stay addressable", () => {
  assert.deepEqual(timing.locateInStory([sentence(0, []), sentence(0, [])], 0), {
    sentence: 1,
    word: -1,
  });
});

test("tokens match the server's split and vocabulary normalisation", () => {
  assert.deepEqual(timing.tokenize("He said,  “Eat more!”"), [
    "He",
    "said,",
    "“Eat",
    "more!”",
  ]);
  assert.equal(timing.normalizeToken("“Brave”,"), "brave");
  assert.equal(timing.normalizeToken("o’clock."), "o'clock");
});

test("key words survive in any script (other language courses)", () => {
  assert.equal(timing.normalizeToken("«Привет!»"), "привет");
  assert.equal(timing.normalizeToken("“학교에서,”"), "학교에서");
});
