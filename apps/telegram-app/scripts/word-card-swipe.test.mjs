import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { attachWordCardSwipe } from "../src/features/words/ui/use-word-card-swipe.ts";

class ElementDouble {
  constructor(tag = "div", parent = null, attributes = {}) {
    this.tag = tag;
    this.parent = parent;
    this.attributes = attributes;
  }
  closest(selector) {
    const matches = selector.split(",").some((rule) => {
      rule = rule.trim();
      if (!rule.startsWith("[")) return this.tag === rule;
      const [, name, value] =
        rule.match(/^\[([^=\]]+)(?:="([^"]+)")?\]$/) ?? [];
      return (
        name &&
        Object.hasOwn(this.attributes, name) &&
        (value === undefined || this.attributes[name] === value)
      );
    });
    return matches ? this : (this.parent?.closest(selector) ?? null);
  }
}
globalThis.Element = ElementDouble;

function fixture(overrides = {}) {
  const listeners = new Map();
  const registeredOptions = new Map();
  const captures = new Set();
  const root = Object.assign(new ElementDouble(), {
    addEventListener(type, listener, options) {
      listeners.set(type, listener);
      registeredOptions.set(type, options);
    },
    removeEventListener(type, listener) {
      if (listeners.get(type) === listener) listeners.delete(type);
    },
    hasPointerCapture: (id) => captures.has(id),
    setPointerCapture: (id) => captures.add(id),
    releasePointerCapture: (id) => captures.delete(id),
  });
  const card = new ElementDouble("article", root);
  const offsets = [];
  const commits = [];
  let resets = 0;
  const options = {
    disabled: false,
    canGoNext: true,
    canGoPrevious: true,
    onOffset: (offset) => offsets.push(offset),
    onCommit: (direction) => commits.push(direction),
    onReset: () => {
      resets++;
    },
    ...overrides,
  };
  const cleanup = attachWordCardSwipe(root, () => options);
  const emit = (type, properties = {}) => {
    const event = {
      target: card,
      cancelable: true,
      timeStamp: 0,
      prevented: false,
      preventDefault() {
        this.prevented = true;
      },
      ...properties,
    };
    listeners.get(type)?.(event);
    return event;
  };
  const touch = (type, x, y, time = 0, properties = {}) => {
    const point = { identifier: 1, clientX: x, clientY: y };
    return emit(type, {
      timeStamp: time,
      touches: type === "touchend" || type === "touchcancel" ? [] : [point],
      changedTouches: [point],
      ...properties,
    });
  };
  const pointer = (type, x, y, time = 0, properties = {}) =>
    emit(type, {
      pointerId: 2,
      pointerType: "mouse",
      isPrimary: true,
      button: 0,
      clientX: x,
      clientY: y,
      timeStamp: time,
      ...properties,
    });
  return {
    root,
    card,
    emit,
    touch,
    pointer,
    options,
    offsets,
    commits,
    captures,
    listeners,
    registeredOptions,
    cleanup,
    resets: () => resets,
  };
}

test("native touch listeners follow a left/right drag and commit the same directions as the mobile app", () => {
  for (const [destination, direction] of [
    [70, 1],
    [350, -1],
  ]) {
    const f = fixture();
    assert.equal(f.registeredOptions.get("touchmove").passive, false);
    f.touch("touchstart", 210, 150);
    assert.equal(f.touch("touchmove", destination, 152, 300).prevented, true);
    assert.deepEqual(f.offsets, [destination - 210]);
    f.touch("touchend", destination, 152, 320);
    assert.deepEqual(f.commits, [direction]);
    assert.equal(f.resets(), 0);
    f.cleanup();
  }
});

test("short drags spring back; a tap does not move or lock the card", () => {
  const f = fixture();
  f.touch("touchstart", 200, 150);
  f.touch("touchmove", 165, 150, 300);
  f.touch("touchend", 165, 150, 320);
  assert.deepEqual(f.commits, []);
  assert.equal(f.resets(), 1);
  f.touch("touchstart", 200, 150, 1000);
  f.touch("touchend", 201, 151, 1001);
  assert.equal(f.resets(), 1);
});

test("a quick flick uses recent velocity, even after holding the card before moving", () => {
  const f = fixture();
  f.touch("touchstart", 220, 150);
  f.touch("touchmove", 205, 150, 1000);
  f.touch("touchmove", 170, 150, 1020);
  f.touch("touchend", 170, 150, 1030);
  assert.deepEqual(f.commits, [1]);
});

test("a short flick held still before release returns instead of advancing", () => {
  const f = fixture();
  f.touch("touchstart", 220, 150);
  f.touch("touchmove", 175, 150, 20);
  f.touch("touchend", 175, 150, 500);
  assert.deepEqual(f.commits, []);
  assert.equal(f.resets(), 1);
});

test("vertical scrolling keeps ownership even if the finger later travels sideways", () => {
  const f = fixture();
  f.touch("touchstart", 200, 150);
  assert.equal(f.touch("touchmove", 195, 195, 40).prevented, false);
  assert.equal(f.touch("touchmove", 60, 195, 100).prevented, false);
  f.touch("touchend", 60, 195, 120);
  assert.deepEqual(f.commits, []);
  assert.deepEqual(f.offsets, []);
  assert.equal(f.resets(), 0);
});

test("first/last and unsolved recall boundaries resist the drag without skipping a card", () => {
  for (const [options, x] of [
    [{ canGoPrevious: false }, 320],
    [{ canGoNext: false }, 80],
  ]) {
    const f = fixture(options);
    f.touch("touchstart", 200, 150);
    f.touch("touchmove", x, 150, 100);
    f.touch("touchend", x, 150, 120);
    assert.deepEqual(f.offsets, [(x - 200) * 0.18]);
    assert.deepEqual(f.commits, []);
    assert.equal(f.resets(), 1);
  }
});

test("speaker buttons, nested icons, recall inputs and links keep their own gestures", () => {
  for (const tag of ["button", "input", "textarea", "select", "a", "label"]) {
    const f = fixture();
    const target = new ElementDouble("svg", new ElementDouble(tag, f.card));
    f.touch("touchstart", 200, 150, 0, { target });
    assert.equal(
      f.touch("touchmove", 60, 150, 100, { target }).prevented,
      false,
    );
    f.touch("touchend", 60, 150, 120, { target });
    assert.deepEqual(f.commits, []);
    assert.deepEqual(f.offsets, []);
  }
});

test("touch cancellation and multiple fingers reset instead of advancing", () => {
  for (const cancel of ["touchcancel", "multitouch"]) {
    const f = fixture();
    f.touch("touchstart", 200, 150);
    f.touch("touchmove", 60, 150, 100);
    if (cancel === "touchcancel") f.touch("touchcancel", 60, 150, 110);
    else
      f.touch("touchstart", 60, 150, 110, {
        touches: [{ identifier: 1 }, { identifier: 2 }],
      });
    f.touch("touchend", 60, 150, 120);
    assert.deepEqual(f.commits, []);
    assert.equal(f.resets(), 1);
  }
});

test("touch pointer events never duplicate or cancel the native touch gesture", () => {
  const f = fixture();
  f.pointer("pointerdown", 200, 150, 0, { pointerType: "touch" });
  f.touch("touchstart", 200, 150);
  f.touch("touchmove", 60, 150, 100);
  f.pointer("pointercancel", 60, 150, 105, { pointerType: "touch" });
  f.touch("touchend", 60, 150, 120);
  f.pointer("pointerup", 60, 150, 120, { pointerType: "touch" });
  assert.deepEqual(f.commits, [1]);
  assert.equal(f.resets(), 0);
});

test("desktop mouse/pen capture releases correctly, including cancellation", () => {
  for (const pointerType of ["mouse", "pen"]) {
    const f = fixture();
    f.pointer("pointerdown", 200, 150, 0, { pointerType });
    assert.equal(f.captures.has(2), true);
    f.pointer("pointermove", 70, 150, 100, { pointerType });
    f.pointer("pointerup", 70, 150, 120, { pointerType });
    assert.deepEqual(f.commits, [1]);
    assert.equal(f.captures.size, 0);
    f.pointer("pointerdown", 200, 150, 1000, { pointerType });
    f.pointer("pointermove", 70, 150, 1100, { pointerType });
    f.pointer("lostpointercapture", 70, 150, 1101, { pointerType });
    f.pointer("pointerup", 70, 150, 1120, { pointerType });
    assert.deepEqual(f.commits, [1]);
    assert.equal(f.resets(), 1);
  }
});

test("animation/modal locks are read live and unmount removes every listener", () => {
  const f = fixture({ disabled: true });
  f.touch("touchstart", 200, 150);
  f.touch("touchmove", 70, 150, 100);
  f.touch("touchend", 70, 150, 120);
  assert.deepEqual(f.commits, []);
  f.options.disabled = false;
  f.touch("touchstart", 200, 150, 1000);
  f.touch("touchmove", 70, 150, 1100);
  f.options.disabled = true;
  f.touch("touchend", 70, 150, 1120);
  assert.deepEqual(f.commits, []);
  assert.equal(
    f.resets(),
    1,
    "opening a modal during a drag must not leave the card offset",
  );
  f.cleanup();
  assert.equal(f.listeners.size, 0);
  assert.equal(f.captures.size, 0);
});

test("a different finger cannot finish the active gesture and repeated releases commit once", () => {
  const f = fixture();
  f.touch("touchstart", 200, 150);
  f.touch("touchmove", 60, 150, 100);
  f.touch("touchend", 60, 150, 110, {
    changedTouches: [{ identifier: 99, clientX: 60, clientY: 150 }],
  });
  assert.deepEqual(f.commits, []);
  f.touch("touchend", 60, 150, 120);
  f.touch("touchend", 60, 150, 121);
  assert.deepEqual(f.commits, [1]);
});

test("secondary mouse buttons and non-primary pointers do not start a drag", () => {
  for (const properties of [{ button: 2 }, { isPrimary: false }]) {
    const f = fixture();
    f.pointer("pointerdown", 200, 150, 0, properties);
    f.pointer("pointermove", 60, 150, 100, properties);
    f.pointer("pointerup", 60, 150, 120, properties);
    assert.deepEqual(f.commits, []);
    assert.deepEqual(f.offsets, []);
    assert.equal(f.captures.size, 0);
  }
});

test("both card scroll surfaces allow horizontal gestures and buttons retain the shared animation", () => {
  const css = readFileSync(
    new URL("../src/features/words/ui/word-study.module.css", import.meta.url),
    "utf8",
  );
  for (const selector of [
    /\.deck\s*\{([^}]+)\}/,
    /\.wordCard,\s*\.previewCard\s*\{([^}]+)\}/,
    /\.cardBody\s*\{([^}]+)\}/,
  ]) {
    assert.match(css.match(selector)?.[1] ?? "", /touch-action:\s*pan-y/);
  }
  const source = readFileSync(
    new URL("../src/features/words/ui/word-study-screen.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /ref=\{cardDeckRef\}/);
  assert.match(source, /onCommit:\s*animateCardOut/);
  assert.match(source, /onClick=\{\(\) => animateCardOut\(-1\)\}/);
  assert.match(source, /onClick=\{\(\) => animateCardOut\(1\)\}/);
  assert.match(source, /draggable=\{false\}/);
});
