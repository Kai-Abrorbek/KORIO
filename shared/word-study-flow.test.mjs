import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { getWordBrowseAdvance } from "./word-study-flow.ts";
import { wordStudyFinish } from "./word-study.i18n.ts";

test("a forward action reaches the final card before it offers recall", () => {
  assert.deepEqual(getWordBrowseAdvance(0, 3), { type: "next", index: 1 });
  assert.deepEqual(getWordBrowseAdvance(1, 3), { type: "next", index: 2 });
  assert.deepEqual(getWordBrowseAdvance(2, 3), { type: "offer" });
});

test("a single-card set offers recall on its forward action", () => {
  assert.deepEqual(getWordBrowseAdvance(0, 1), { type: "offer" });
});

test("empty, stale, and malformed positions cannot advance or complete", () => {
  for (const [index, total] of [
    [0, 0],
    [-1, 5],
    [5, 5],
    [1, 1],
    [0.5, 3],
    [0, NaN],
    [NaN, 2],
    [0, Infinity],
    [0, -1],
    [0, 2.5],
  ]) {
    assert.deepEqual(getWordBrowseAdvance(index, total), { type: "blocked" });
  }
});

test("both clients register every completion label in all four UI languages", () => {
  const keys = Object.keys(wordStudyFinish.ko).sort();
  for (const language of ["ko", "en", "uz", "ru"]) {
    const copy = wordStudyFinish[language];
    assert.deepEqual(Object.keys(copy).sort(), keys);
    assert.ok(Object.values(copy).every((label) => label.trim()));
    for (const client of [
      "apps/mobile/src/locales",
      "apps/telegram-app/src/shared/i18n/locales",
    ]) {
      const source = readFileSync(
        new URL(`../${client}/${language}.ts`, import.meta.url),
        "utf8",
      );
      assert.ok(source.includes(`finish: wordStudyFinish.${language}`));
    }
  }
});
