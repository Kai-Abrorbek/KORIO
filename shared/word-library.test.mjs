import assert from "node:assert/strict";
import test from "node:test";
import {
  filterWordCollections,
  getDefaultWordCollectionGroup,
  getMyWordCollections,
  getResumeWordIndex,
} from "./word-library.ts";
import { wordLibrary } from "./word-library.i18n.ts";

const counts = {
  words: 3,
  new: 3,
  learning: 0,
  review: 0,
  mastered: 0,
  due: 0,
};
const book = {
  ...counts,
  id: "collection-a",
  code: "a",
  courseId: "ko-general",
  targetLanguage: "ko",
  kind: "textbook",
  level: "beginner",
  cover: "paper",
  title: "서울대 한국어 1A",
  description: "인사와 소개",
  saved: true,
  groupCount: 2,
  lastPosition: null,
};
const group = (id, order, extra = {}) => ({
  ...counts,
  id,
  title: id,
  order,
  ...extra,
});

test("removing a wordbook hides it while retaining its independent cursor and shared mastery", () => {
  const removed = {
    ...book,
    id: "removed",
    saved: false,
    mastered: 2,
    new: 1,
    lastPosition: { groupId: "one", cardIndex: 1, lastWordId: "word-b" },
  };
  const before = structuredClone([book, removed]);
  assert.deepEqual(getMyWordCollections([book, removed]), [book]);
  assert.deepEqual([book, removed], before);
});

test("category, difficulty and normalized localized search combine without changing the catalog", () => {
  const catalog = [
    book,
    { ...book, id: "exam", kind: "exam", level: "advanced", title: "TOPIK II" },
  ];
  const before = structuredClone(catalog);
  assert.deepEqual(
    filterWordCollections(catalog, {
      kind: "textbook",
      level: "beginner",
      query: "  １Ａ  ",
    }),
    [book],
  );
  assert.deepEqual(
    filterWordCollections(catalog, { kind: "exam", level: "beginner" }),
    [],
  );
  assert.deepEqual(catalog, before);
});

test("resume anchors to word identity after reordering and safely handles removal or empty groups", () => {
  const words = [{ id: "c" }, { id: "a" }, { id: "b" }];
  assert.equal(getResumeWordIndex(words, { lastWordId: "b", cardIndex: 0 }), 2);
  assert.equal(
    getResumeWordIndex(words, { lastWordId: "removed", cardIndex: 99 }),
    2,
  );
  assert.equal(
    getResumeWordIndex(words, { lastWordId: null, cardIndex: -3 }),
    0,
  );
  assert.equal(getResumeWordIndex([], { lastWordId: "b", cardIndex: 2 }), 0);
});

test("a selected valid group wins, stale groups are skipped, and content order remains untouched", () => {
  const groups = [
    group("done", 0, { new: 0, mastered: 3 }),
    group("next", 2),
    group("learning", 1, { learning: 1, new: 2 }),
    group("empty", -1, { words: 0 }),
  ];
  const detail = {
    ...book,
    groups,
    lastPosition: { groupId: "removed", cardIndex: 0, lastWordId: null },
  };
  const before = structuredClone(groups);
  assert.equal(getDefaultWordCollectionGroup(detail)?.id, "learning");
  assert.equal(getDefaultWordCollectionGroup(detail, "next")?.id, "next");
  assert.equal(
    getDefaultWordCollectionGroup({
      ...detail,
      groups: [group("empty", 0, { words: 0 })],
    }),
    undefined,
  );
  assert.deepEqual(groups, before);
});

test("all four UI languages have complete translations and matching interpolation tokens", () => {
  const keys = Object.keys(wordLibrary.ko).sort();
  const tokens = (value) =>
    [...value.matchAll(/{{\s*(\w+)\s*}}/g)].map((match) => match[1]).sort();
  for (const [locale, copy] of Object.entries(wordLibrary)) {
    assert.deepEqual(Object.keys(copy).sort(), keys, locale);
    for (const key of keys) {
      assert.ok(copy[key].trim(), `${locale}.${key}`);
      assert.deepEqual(
        tokens(copy[key]),
        tokens(wordLibrary.ko[key]),
        `${locale}.${key}`,
      );
    }
  }
});
