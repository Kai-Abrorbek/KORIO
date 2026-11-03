import assert from "node:assert/strict";
import { test } from "node:test";
import { recallInputScrollOffset } from "../src/utils/word-recall-layout.ts";

const frame = {
  inputTop: 140,
  inputHeight: 64,
  viewportHeight: 360,
  contentHeight: 580,
  scrollOffset: 0,
};

test("an already visible answer field stays still", () => {
  assert.equal(recallInputScrollOffset(frame), 0);
});

test("a tall keyboard reducing the viewport reveals the entire answer field", () => {
  const next = recallInputScrollOffset({ ...frame, viewportHeight: 180 });
  assert.equal(next, 36);
  assert.ok(frame.inputTop >= next + 12);
  assert.ok(frame.inputTop + frame.inputHeight <= next + 180 - 12);
});

test("removing the illustration restores a field above the old scroll position", () => {
  assert.equal(
    recallInputScrollOffset({ ...frame, inputTop: 74, scrollOffset: 220 }),
    62,
  );
});

test("short content and very small viewports clamp to reachable scroll positions", () => {
  assert.equal(recallInputScrollOffset({ ...frame, contentHeight: 200 }), 0);
  assert.equal(recallInputScrollOffset({ ...frame, viewportHeight: 60 }), 128);
  assert.equal(
    recallInputScrollOffset({ ...frame, viewportHeight: 0, scrollOffset: 12 }),
    12,
  );
});
