import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import ts from "typescript";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeRequire = createRequire(import.meta.url);

function load(file, mocks = {}, globals = {}) {
  const filename = path.resolve(appRoot, file);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  const compiledModule = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.endsWith(".css")) return { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
    if (id.startsWith(".")) {
      const target = path.resolve(path.dirname(filename), id);
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(existsSync);
      assert.ok(resolved, `Cannot resolve ${id}`);
      return load(resolved, mocks, globals);
    }
    return runtimeRequire(id);
  };
  new Function("require", "module", "exports", ...Object.keys(globals), compiled)(localRequire, compiledModule, compiledModule.exports, ...Object.values(globals));
  return compiledModule.exports;
}

function hookScope() {
  const slots = [];
  let cursor = 0;
  let pending = [];
  const same = (left, right) => left?.length === right?.length && left.every((value, index) => Object.is(value, right[index]));
  const slot = (create) => (slots[cursor++] ??= create());
  const react = {
    useState(initial) {
      const state = slot(() => ({ value: typeof initial === "function" ? initial() : initial }));
      return [state.value, (next) => { state.value = typeof next === "function" ? next(state.value) : next; }];
    },
    useRef(value) { return slot(() => ({ current: value })); },
    useMemo(create, deps) {
      const memo = slot(() => ({}));
      if (!same(memo.deps, deps)) Object.assign(memo, { value: create(), deps });
      return memo.value;
    },
    useCallback(callback, deps) { return react.useMemo(() => callback, deps); },
    useEffect(create, deps) {
      const effect = slot(() => ({ effect: true }));
      if (!same(effect.deps, deps)) { Object.assign(effect, { create, deps }); pending.push(effect); }
    },
  };
  return {
    react,
    render(callback) {
      cursor = 0; pending = [];
      const result = callback();
      for (const effect of pending) { effect.cleanup?.(); effect.cleanup = effect.create(); }
      return result;
    },
    unmount() { for (const effect of slots.filter((value) => value.effect)) effect.cleanup?.(); },
  };
}

const hasClass = (node, name) => typeof node.props?.className === "string" && node.props.className.split(" ").includes(name);
const labels = ["book", "milk", "hand", "fish", "tree", "bird", "door", "star", "moon", "rain", "snow", "wind", "fire", "rice", "shoe", "cake", "desk", "coat", "ring", "lamp"];
const poolOf = (language) => labels.map((word, index) => ({ id: `word-${index}`, ko: language === "en" ? word : `단어${index}`, meaningKo: `뜻${index}`, uz: `uz${index}`, en: `meaning ${index}`, ru: `ru${index}` }));
const cardsOf = (tree) => tree.filter((node) => hasClass(node, "memoryCard"));
const textOf = (card) => card.props.children.find((node) => hasClass(node, "wordKo") || hasClass(node, "wordUz")).props.children;
const isHeadword = (card) => card.props.children.some((node) => hasClass(node, "wordKo"));

function fixture({ language = "en", query = "", locale = "ko", words = poolOf(language), reject = false } = {}) {
  const scopes = new Map();
  let activeScope;
  const react = Object.fromEntries(["useState", "useRef", "useMemo", "useCallback", "useEffect"].map((name) => [name, (...args) => activeScope.react[name](...args)]));
  const calls = [];
  const results = [];
  const timers = new Map();
  const listeners = new Map();
  const user = { learnCourse: language };
  const params = new URLSearchParams(query);
  let handler = async () => { if (reject) throw new Error("offline"); return { words }; };
  let request = async (pathname) => { calls.push(pathname); return handler(pathname); };
  let timerId = 0;
  const window = {
    innerWidth: 390,
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const mocks = {
    react,
    "next/navigation": { useSearchParams: () => params },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request, user }) },
    "../../../shared/i18n/content-language": { getContentLang: () => locale },
    "../../../shared/ui/mobile-icon": { MobileIcon: (props) => ({ type: "svg", props }) },
    "../../../shared/telegram/back-button": { useTelegramBackOverride() {} },
    "../model/use-league-challenge": { useLeagueChallenge: () => ({ finish: (score) => results.push(score) }) },
  };
  const production = load("src/features/league/ui/memory-game-screen.tsx", mocks, { window });
  function render() {
    const seen = new Set();
    function visit(node, identity) {
      if (!node || typeof node !== "object") return [];
      if (Array.isArray(node)) return node.flatMap((child, index) => visit(child, `${identity}/${child?.key ?? index}`));
      if (typeof node.type === "function") {
        const key = `${identity}/${node.type.name}/${node.key ?? ""}`;
        seen.add(key);
        if (!scopes.has(key)) scopes.set(key, hookScope());
        activeScope = scopes.get(key);
        const child = activeScope.render(() => node.type(node.props));
        return visit(child, `${key}/render`);
      }
      return [node, ...visit(node.props?.children, `${identity}/children`)];
    }
    const tree = visit({ type: production.MemoryGameScreen, props: {} }, "root");
    for (const [key, scope] of scopes) if (!seen.has(key)) { scope.unmount(); scopes.delete(key); }
    return tree;
  }
  return {
    calls, results, timers, listeners, user, render,
    setHandler(next) { handler = next; request = async (pathname) => { calls.push(pathname); return handler(pathname); }; },
    async flush() { for (let index = 0; index < 8; index += 1) await Promise.resolve(); },
    run(delay) {
      for (const [id, timer] of [...timers.entries()].filter(([, timer]) => timer.delay === delay)) {
        if (timers.delete(id)) timer.callback();
      }
    },
    unmount() { for (const scope of scopes.values()) scope.unmount(); scopes.clear(); },
  };
}

function startBoard(f, previewMs) {
  let tree = f.render();
  tree = f.render();
  assert.ok(cardsOf(tree).every((card) => hasClass(card, "flipped")));
  assert.ok(tree.some((node) => hasClass(node, "preview")));
  assert.ok([...f.timers.values()].some((timer) => timer.delay === previewMs));
  f.run(previewMs); tree = f.render();
  assert.ok(cardsOf(tree).every((card) => !hasClass(card, "flipped")));
  f.run(500); return f.render();
}

function matchOne(f, tree, language) {
  const wordCard = cardsOf(tree).find((card) => isHeadword(card) && !hasClass(card, "matched"));
  const word = textOf(wordCard);
  const index = language === "en" ? labels.indexOf(word) : Number(word.replace("단어", ""));
  wordCard.props.onClick(); tree = f.render();
  cardsOf(tree).find((card) => !isHeadword(card) && textOf(card) === `뜻${index}`).props.onClick();
  tree = f.render();
  assert.ok([...f.timers.values()].some((timer) => timer.delay === 350));
  f.run(350); return f.render();
}

test("English and Korean reuse every level's cards, preview, columns, timer, matches, stars and final result", async () => {
  const configs = [[5, 3, 2200, "1:10"], [7, 4, 2200, "1:30"], [10, 4, 2000, "2:00"], [12, 4, 1800, "2:30"], [15, 5, 1600, "3:00"]];
  for (const language of ["ko", "en"]) {
    const f = fixture({ language });
    f.render(); await f.flush();
    let tree;
    for (const [index, [pairs, columns, previewMs, clock]] of configs.entries()) {
      tree = startBoard(f, previewMs);
      const cards = cardsOf(tree);
      assert.equal(cards.length, pairs * 2);
      assert.ok(cards.every((card) => card.props.style["--card-size"] === `${Math.floor((390 - 32 - columns * 12) / columns)}px`));
      assert.ok(tree.some((node) => node.type === "b" && Array.isArray(node.props.children) && node.props.children.join("") === clock));
      assert.ok(tree.some((node) => node.type === "strong" && node.props.children === `${index + 1}-daraja`));
      assert.ok(cards.every((card) => card.props.children.some((child) => child.props?.["data-no-translate"] === true)));
      for (let pair = 0; pair < pairs; pair += 1) tree = matchOne(f, tree, language);
      assert.equal(cardsOf(tree).filter((card) => hasClass(card, "matched")).length, pairs * 2);
      assert.ok([...f.timers.values()].some((timer) => timer.delay === 600));
      f.run(600); tree = f.render();
      assert.ok(tree.some((node) => node.type === "h1" && node.props.children === "Bajarildi!"));
      assert.equal(tree.filter((node) => node.type === "svg" && hasClass(node, "earned")).length, 3);
      if (index < 4) tree.find((node) => node.type === "button" && node.props.children === "Keyingi daraja").props.onClick();
    }
    assert.ok(tree.some((node) => hasClass(node, "allClear")));
    assert.equal(f.calls.length, 1, "levels reuse the same frozen word pool");
    tree.find((node) => node.type === "button" && node.props.children === "Chiqish").props.onClick();
    assert.deepEqual(f.results, [30]);
    f.unmount();
    assert.equal(f.timers.size, 0);
    assert.equal(f.listeners.size, 0);
  }
});

test("an explicit memory course overrides either active course and keeps its explanation language", async () => {
  for (const [active, target, locale] of [["ko", "en", "ko"], ["en", "ko", "uz"]]) {
    const f = fixture({ language: active, query: `targetLanguage=${target}`, locale, words: poolOf(target) });
    f.render(); await f.flush();
    const tree = startBoard(f, 2200);
    const cards = cardsOf(tree);
    assert.ok(cards.filter(isHeadword).every((card) => target === "en" ? labels.includes(textOf(card)) : /^단어/.test(textOf(card))));
    assert.ok(cards.filter((card) => !isHeadword(card)).every((card) => (locale === "ko" ? /^뜻/ : /^uz/).test(textOf(card))));
    const url = new URL(f.calls[0], "https://korio.test");
    assert.equal(url.searchParams.get("courseId"), `${target}-general`);
    assert.equal(url.searchParams.get("targetLanguage"), target);
    assert.equal(url.searchParams.get("lang"), locale);
    assert.equal(url.searchParams.get("count"), "40");
    assert.equal(url.searchParams.get("maxLen"), "4");
    f.unmount();
  }
});

test("rerenders, a first flip, and active-course/auth callback changes never remix or re-preview the deck", async () => {
  const f = fixture();
  f.render(); await f.flush();
  let tree = startBoard(f, 2200);
  const original = cardsOf(tree).map(textOf);
  cardsOf(tree)[0].props.onClick(); tree = f.render();
  assert.equal(cardsOf(tree).filter((card) => hasClass(card, "flipped")).length, 1);
  f.user.learnCourse = "ko";
  f.setHandler(async () => ({ words: poolOf("ko") }));
  tree = f.render();
  assert.deepEqual(cardsOf(tree).map(textOf), original);
  assert.equal(cardsOf(tree).filter((card) => hasClass(card, "flipped")).length, 1);
  assert.ok(!tree.some((node) => hasClass(node, "preview")));
  assert.equal(f.calls.length, 1);
  assert.ok(![...f.timers.values()].some((timer) => timer.delay === 2200));
  f.unmount();
});

test("a mismatch keeps the existing 900ms flipback, timeout result and retry reset", async () => {
  const f = fixture();
  f.render(); await f.flush();
  let tree = startBoard(f, 2200);
  const heads = cardsOf(tree).filter(isHeadword);
  heads[0].props.onClick(); tree = f.render();
  cardsOf(tree).find((card) => isHeadword(card) && textOf(card) === textOf(heads[1])).props.onClick();
  tree = f.render();
  assert.equal(cardsOf(tree).filter((card) => hasClass(card, "flipped")).length, 2);
  f.run(900); tree = f.render();
  assert.equal(cardsOf(tree).filter((card) => hasClass(card, "flipped")).length, 0);
  for (let second = 0; second < 70; second += 1) { f.run(1000); tree = f.render(); }
  tree = f.render();
  assert.ok(tree.some((node) => node.type === "h1" && node.props.children === "Vaqt tugadi!"));
  tree.find((node) => node.type === "button" && node.props.children === "Qayta").props.onClick();
  tree = startBoard(f, 2200);
  assert.equal(cardsOf(tree).length, 10);
  assert.equal(f.calls.length, 1);
  f.unmount();
});

test("failed, short, duplicate or Korean-only English pools show retry instead of an unplayable board", async () => {
  const cases = [
    [poolOf("en").slice(0, 14), false],
    [[...poolOf("en").slice(0, 14), ...poolOf("en").slice(0, 6)], false],
    [poolOf("ko"), false],
    [[], true],
  ];
  for (const [words, reject] of cases) {
    const f = fixture({ words, reject });
    f.render(); await f.flush();
    let tree = f.render();
    assert.equal(cardsOf(tree).length, 0);
    assert.equal(f.timers.size, 0);
    const retry = tree.find((node) => node.type === "button" && node.props.children === "Qayta urinish");
    assert.ok(retry);
    f.user.learnCourse = "ko";
    f.setHandler(async () => ({ words: poolOf("en") }));
    retry.props.onClick(); f.render(); await f.flush();
    tree = startBoard(f, 2200);
    assert.equal(cardsOf(tree).length, 10);
    assert.ok(f.calls.every((pathname) => new URL(pathname, "https://korio.test").searchParams.get("targetLanguage") === "en"));
    f.unmount();
  }
});

test("leaving during pool loading ignores the late response and never starts a preview", async () => {
  const f = fixture();
  let release;
  f.setHandler(() => new Promise((resolve) => { release = resolve; }));
  f.render(); f.unmount();
  release({ words: poolOf("en") }); await f.flush();
  assert.equal(f.calls.length, 1);
  assert.equal(f.timers.size, 0);
  assert.equal(f.listeners.size, 0);
});
