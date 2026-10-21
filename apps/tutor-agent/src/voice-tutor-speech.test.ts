import assert from "node:assert/strict";
import { test } from "node:test";
import {
  AudioTagStripper,
  LaughNotationTransformer,
  NdjsonLineReader,
  openingAudioTag,
  startsWithAudioTag,
  stripAudioTags,
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

test("explicit normal delivery does not turn emotion into an opening sound", () => {
  for (const emotion of ["laughing", "shocked", "disbelief"]) {
    assert.equal(
      openingAudioTag({ emotion, delivery: "normal", intensity: 0.95 }),
      undefined,
    );
  }
});

test("opening tag preserves every explicit expressive delivery", () => {
  for (const [delivery, tag] of [
    ["shout", "[shouts]"],
    ["whisper", "[whispers]"],
    ["laugh", "[laughs]"],
    ["dramatic", "[dramatic]"],
  ]) {
    assert.equal(
      openingAudioTag({ emotion: "laughing", delivery, intensity: 0.95 }),
      tag,
    );
  }
});

test("legacy metadata without delivery keeps its emotion fallback", () => {
  assert.equal(openingAudioTag({ emotion: "disbelief", intensity: 0.95 }), "[shouts]");
  assert.equal(openingAudioTag({ emotion: "disbelief", intensity: 0.4 }), undefined);
  assert.equal(openingAudioTag({ emotion: "laughing" }), "[laughs]");
  assert.equal(openingAudioTag(), undefined);
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

test("subtitles drop audio tags even when one is split across deltas", () => {
  const t = new AudioTagStripper();
  const out =
    t.push("[gas") + t.push("ps] 진짜? [la") + t.push("ughs hard] 너 미쳤구나") + t.flush();
  assert.equal(out, "진짜? 너 미쳤구나");
});

test("a bracket that never closes into a tag is kept", () => {
  const t = new AudioTagStripper();
  assert.equal(t.push("A [") + t.push("B") + t.flush(), "A [B");
});

test("the heard-text hint and the opening check see the tags", () => {
  assert.equal(stripAudioTags("[sighs] 아이고, [laughs] 또 라면이야?"), "아이고, 또 라면이야?");
  assert.equal(startsWithAudioTag("[gasps] 뭐?"), true);
  assert.equal(startsWithAudioTag("뭐? [gasps]"), false);
});
