import assert from "node:assert/strict";
import { test } from "node:test";
import {
  LaughNotationTransformer,
  NdjsonLineReader,
  openingAudioTag,
  voiceTutorTtsModel,
} from "./voice-tutor-speech.js";

test("a laugh split across deltas becomes one laugh", () => {
  const t = new LaughNotationTransformer();
  const out = t.push("아니 ㅋㅋ") + t.push("ㅋㅋ 배구리?!") + t.flush();
  assert.equal(out, "아니 [laughs] 배구리?!");
});

test("spelled-out laughter and elongation are left for the voice", () => {
  const t = new LaughNotationTransformer();
  assert.equal(t.push("AHAHAHA!!! 야아아아!!!") + t.flush(), "AHAHAHA!!! 야아아아!!!");
});

test("crying marks are dropped", () => {
  const t = new LaughNotationTransformer();
  assert.equal((t.push("아 ㅠㅠ 다시") + t.flush()).trim(), "아 다시");
});

test("opening tag follows delivery, then strong surprise", () => {
  assert.equal(openingAudioTag({ delivery: "shout" }), "[shouts]");
  assert.equal(openingAudioTag({ emotion: "disbelief", intensity: 0.95 }), "[shouts]");
  assert.equal(openingAudioTag({ emotion: "disbelief", intensity: 0.4 }), undefined);
  assert.equal(openingAudioTag({ emotion: "laughing" }), "[laughs]");
});

test("old v2 model names fall back to the expressive default", () => {
  assert.equal(voiceTutorTtsModel("eleven_multilingual_v2"), "eleven_v4_turbo");
  assert.equal(voiceTutorTtsModel("eleven_v3"), "eleven_v3");
  assert.equal(voiceTutorTtsModel(undefined), "eleven_v4_turbo");
});

test("NDJSON lines split across chunks", () => {
  const r = new NdjsonLineReader();
  assert.deepEqual(r.push('{"t":"speech","d":"야'), []);
  assert.deepEqual(r.push('아!"}\n{"t":"done"}\n'), [
    { t: "speech", d: "야아!" },
    { t: "done" },
  ]);
});
