import assert from "node:assert/strict";
import test from "node:test";
import {
  filterWordCollections,
  getDefaultWordCollectionGroup,
  getMyWordCollections,
  getResumeWordIndex,
  getWordCollectionSections,
} from "./word-library.ts";
import { wordLibrary } from "./word-library.i18n.ts";
import {
  getWordLibraryPalette,
  getWordLibraryCssVariables,
} from "./word-library-theme.ts";

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

test("course sections retain canonical unit IDs and resume inside the correct section", () => {
  const groups = [
    group("s3-u2", 8, { section: 3, unit: 2 }),
    group("s1-u1", 0, { section: 1, unit: 1 }),
    group("s3-u1", 7, { section: 3, unit: 1 }),
    group("empty", 9, { section: 4, unit: 1, words: 0 }),
  ];
  const detail = {
    ...book,
    id: "course-ko-general",
    kind: "course",
    groups,
    lastPosition: { groupId: "s3-u2", cardIndex: 1, lastWordId: "word-b" },
  };
  const original = structuredClone(detail);
  const sections = getWordCollectionSections(detail);
  assert.deepEqual(
    sections.map((section) => section.section),
    [1, 3],
  );
  const resume = getDefaultWordCollectionGroup(detail);
  const current = sections.find((section) =>
    section.groups.some((item) => item.id === resume.id),
  );
  assert.equal(current.section, 3);
  assert.deepEqual(
    current.groups.map((item) => item.id),
    ["s3-u1", "s3-u2"],
  );
  assert.equal(
    getDefaultWordCollectionGroup({ ...detail, groups: sections[0].groups }).id,
    "s1-u1",
  );
  assert.deepEqual(detail, original);
});

test("curated collections keep their own groups and course sections do not invent aggregate word counts", () => {
  const groups = [
    group("one", 0, { section: 1, unit: 1 }),
    group("two", 1, { section: 2, unit: 1 }),
  ];
  assert.deepEqual(getWordCollectionSections({ ...book, groups }), []);
  const sections = getWordCollectionSections({
    ...book,
    id: "course-en-general",
    kind: "course",
    targetLanguage: "en",
    groups,
  });
  assert.deepEqual(
    sections.map((section) => Object.keys(section).sort()),
    [
      ["groups", "section"],
      ["groups", "section"],
    ],
  );
});

test("reference colors retain readable action, text, selection, saved and cover roles in both themes", () => {
  function luminance(hex) {
    const [r, g, b] = hex
      .slice(1)
      .match(/../g)
      .map((value) => parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function contrast(a, b) {
    const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (values[0] + 0.05) / (values[1] + 0.05);
  }
  for (const dark of [false, true]) {
    const p = getWordLibraryPalette(dark);
    for (const [foreground, background] of [
      [p.text, p.bg],
      [p.textSecondary, p.bg],
      [p.textSecondary, p.surface],
      [p.onAction, p.action],
      [p.primary, p.wash],
      [p.onYellow, p.yellowWash],
      [p.onPink, p.pinkWash],
      ...Object.values(p.covers).map((cover) => [cover.text, cover.bg]),
    ]) {
      assert.ok(
        contrast(foreground, background) >= 4.5,
        `${dark ? "dark" : "light"}: ${foreground} on ${background}`,
      );
    }
    assert.equal(getWordLibraryCssVariables(dark)["--wl-bg"], p.bg);
    assert.equal(getWordLibraryCssVariables(dark)["--wl-action"], p.action);
  }
});
