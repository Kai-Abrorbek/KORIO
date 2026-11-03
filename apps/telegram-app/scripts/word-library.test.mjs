import assert from "node:assert/strict";
import { register } from "node:module";
import { test } from "node:test";

// The app bundler resolves extensionless TS imports. Use the same sources in
// Node's type-stripping runner without changing shipped imports or adding deps.
register(
  `data:text/javascript,${encodeURIComponent(`
  export async function resolve(specifier, context, nextResolve) {
    try { return await nextResolve(specifier, context); }
    catch (error) {
      if (error.code === "ERR_MODULE_NOT_FOUND" && specifier.startsWith(".")) {
        return nextResolve(specifier + ".ts", context);
      }
      throw error;
    }
  }
`)}`,
  import.meta.url,
);

const {
  readWordAutoPlay,
  readWordPreferences,
  saveWordAutoPlay,
  saveWordPreferences,
} = await import("../src/features/words/model/word-preferences.ts");

function storageFixture() {
  const values = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => values.set(key, value),
    },
  };
  return values;
}

test("reading positions and autoplay belong to their account and course", () => {
  storageFixture();
  const position = { autoPlay: false, cardIndex: 7, section: 3, unit: 2 };
  saveWordPreferences("ko", "learner-a", position);
  assert.deepEqual(readWordPreferences("ko", "learner-a"), position);
  assert.equal(readWordPreferences("en", "learner-a"), null);
  assert.equal(readWordPreferences("ko", "learner-b"), null);
  assert.equal(readWordAutoPlay("ko", "learner-a"), false);
  assert.equal(readWordAutoPlay("en", "learner-a"), true);
  saveWordAutoPlay("en", "learner-a", false);
  assert.equal(readWordAutoPlay("en", "learner-a"), false);
  assert.equal(readWordAutoPlay("en", "learner-b"), true);
  assert.equal(readWordPreferences("ko", undefined), null);
});

test("unowned legacy preferences are not assigned to another account", () => {
  const values = storageFixture();
  const legacy = JSON.stringify({
    autoPlay: false,
    cardIndex: 9,
    section: 4,
    unit: 2,
  });
  values.set("korio.telegram.word-scope", legacy);
  values.set("korio.telegram.word-scope:ko-general", legacy);
  assert.equal(readWordPreferences("ko", "learner-a"), null);
  assert.equal(readWordAutoPlay("ko", "learner-a"), true);
});

test("malformed positions cannot restore invalid curriculum coordinates", () => {
  const values = storageFixture();
  saveWordPreferences("ko", "learner-a", {
    autoPlay: true,
    cardIndex: 1,
    section: 2,
    unit: 3,
  });
  const positionKey = [...values.keys()].find(
    (key) => !key.endsWith(":autoplay"),
  );
  values.set(positionKey, "not-json");
  assert.equal(readWordPreferences("ko", "learner-a"), null);
  values.set(
    positionKey,
    JSON.stringify({ section: -1, unit: 3, cardIndex: 5 }),
  );
  assert.equal(readWordPreferences("ko", "learner-a"), null);
  values.set(
    positionKey,
    JSON.stringify({ section: 2, unit: 3, cardIndex: -5 }),
  );
  assert.equal(readWordPreferences("ko", "learner-a").cardIndex, 0);
});

test("disabled webview storage cannot prevent learning", () => {
  globalThis.window = {
    localStorage: {
      getItem() {
        throw new Error("Storage denied");
      },
      setItem() {
        throw new Error("Storage denied");
      },
    },
  };
  assert.equal(readWordPreferences("ko", "learner-a"), null);
  assert.equal(readWordAutoPlay("ko", "learner-a"), true);
  assert.doesNotThrow(() =>
    saveWordPreferences("ko", "learner-a", {
      autoPlay: true,
      cardIndex: 0,
      section: 1,
      unit: 1,
    }),
  );
  assert.doesNotThrow(() => saveWordAutoPlay("ko", "learner-a", false));
});
