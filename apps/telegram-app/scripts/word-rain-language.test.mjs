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
const labels = ["apple", "bread", "chair", "dance", "earth", "field", "green", "house"];
const poolOf = (language) => labels.map((word, index) => ({ id: `word-${index}`, ko: language === "en" ? word : `단어${index}`, meaningKo: `뜻${index}`, uz: `uz${index}`, en: `meaning ${index}`, ru: `ru${index}` }));
const headwordOf = (tree) => tree.find((node) => hasClass(node, "fallingWord"))?.props.children;
const scoreOf = (tree) => tree.find((node) => hasClass(node, "scorePill"))?.props.children;
const optionsOf = (tree) => tree.find((node) => hasClass(node, "options"))?.props.children ?? [];
const heartsOf = (tree) => tree.filter((node) => node.type === "svg" && node.props.name === "heart").length;

function fixture({ language = "en", query = "", locale = "ko", words = poolOf(language), reject = false, challenge = false } = {}) {
  const scope = hookScope();
  const calls = [];
  const results = [];
  const animations = [];
  const timers = new Map();
  const frames = new Map();
  const observers = new Set();
  const user = { learnCourse: language };
  const params = new URLSearchParams(query);
  let handler = async () => { if (reject) throw new Error("offline"); return { words }; };
  let request = async (pathname) => { calls.push(pathname); return handler(pathname); };
  let timerId = 0;
  const window = {
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
    requestAnimationFrame(callback) { const id = ++timerId; frames.set(id, callback); return id; },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const playArea = { getBoundingClientRect: () => ({ height: 500 }) };
  const fallTrack = {
    style: {},
    animate(keyframes, options) {
      const animation = { keyframes, options, onfinish: null, cancelled: false, paused: false, pause() { this.paused = true; }, commitStyles() {}, cancel() { this.cancelled = true; } };
      animations.push(animation);
      return animation;
    },
  };
  class ResizeObserver {
    constructor(callback) { this.callback = callback; }
    observe() { observers.add(this); }
    disconnect() { observers.delete(this); }
  }
  const production = load("src/features/league/ui/word-rain-screen.tsx", {
    react: scope.react,
    "next/navigation": { useSearchParams: () => params },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request, user }) },
    "../../../shared/i18n/content-language": { getContentLang: () => locale },
    "../../../shared/ui/mobile-icon": { MobileIcon: (props) => ({ type: "svg", props }) },
    "../../../shared/telegram/back-button": { useTelegramBackOverride() {} },
    "../model/use-league-challenge": { useLeagueChallenge: () => ({ finish: (score) => results.push(score), isChallenge: challenge }) },
  }, { window, ResizeObserver });
  function nodes(node) {
    if (!node || typeof node !== "object") return [];
    if (Array.isArray(node)) return node.flatMap(nodes);
    if (typeof node.type === "function") return nodes(node.type(node.props));
    if (node.props?.ref) node.props.ref.current = hasClass(node, "playArea") ? playArea : fallTrack;
    return [node, ...nodes(node.props?.children)];
  }
  const render = () => scope.render(() => nodes(production.WordRainScreen()));
  return {
    calls, results, timers, frames, observers, animations, user, render,
    setHandler(next) { handler = next; request = async (pathname) => { calls.push(pathname); return handler(pathname); }; },
    async flush() { for (let index = 0; index < 8; index += 1) await Promise.resolve(); },
    async boot() { render(); await this.flush(); render(); render(); render(); return render(); },
    run(delay) { for (const [id, timer] of [...timers.entries()].filter(([, timer]) => timer.delay === delay)) if (timers.delete(id)) timer.callback(); },
    land() { animations.at(-1).onfinish?.(); },
    unmount: () => scope.unmount(),
  };
}

function rightOption(tree, language, prefix = "뜻") {
  const word = headwordOf(tree);
  const index = language === "en" ? labels.indexOf(word) : Number(word.replace("단어", ""));
  return optionsOf(tree).find((option) => option.props.children === `${prefix}${index}`);
}

test("Korean and English share three hearts, three protected choices, fall speed, combo and scoring", async () => {
  for (const language of ["ko", "en"]) {
    const f = fixture({ language });
    let tree = await f.boot();
    assert.equal(heartsOf(tree), 3);
    assert.equal(scoreOf(tree), 0);
    assert.equal(f.animations.at(-1).options.duration, 6000);
    assert.deepEqual(f.animations.at(-1).keyframes, [{ transform: "translateY(-70px)" }, { transform: "translateY(440px)" }]);
    let expectedScore = 0;
    for (let caught = 1; caught <= 18; caught += 1) {
      const choices = optionsOf(tree);
      assert.equal(choices.length, 3);
      assert.equal(new Set(choices.map((choice) => choice.props.children)).size, 3);
      assert.ok(choices.every((choice) => choice.props["data-no-translate"] === true));
      assert.ok(tree.find((node) => hasClass(node, "fallingWord")).props["data-no-translate"]);
      const animation = f.animations.at(-1);
      rightOption(tree, language).props.onClick(); tree = f.render();
      expectedScore += 10 + Math.min(caught, 10) * 2;
      assert.equal(scoreOf(tree), expectedScore);
      assert.equal(heartsOf(tree), 3);
      assert.ok(animation.paused && animation.cancelled);
      assert.ok(tree.some((node) => hasClass(node, "popping")));
      assert.ok([...f.timers.values()].some((timer) => timer.delay === 420));
      if (caught >= 2) assert.ok(tree.some((node) => hasClass(node, "combo") && node.props.children === `🔥 x${caught}` && node.props.style.visibility === "visible"));
      f.run(420); f.render(); tree = f.render();
      assert.equal(f.animations.at(-1).options.duration, Math.max(2600, 6000 - caught * 220));
    }
    tree.find((node) => node.type === "button" && node.props["aria-label"] === "Yopish").props.onClick();
    assert.deepEqual(f.results, [expectedScore]);
    f.unmount();
    assert.equal(f.timers.size, 0);
    assert.equal(f.frames.size, 0);
    assert.equal(f.observers.size, 0);
  }
});

test("wrong picks and landing use the same 600ms delay, combo reset, hearts, end stats and restart", async () => {
  const f = fixture();
  let tree = await f.boot();
  rightOption(tree, "en").props.onClick(); f.render(); f.run(420); f.render(); tree = f.render();
  const wrong = optionsOf(tree).find((choice) => choice !== rightOption(tree, "en"));
  wrong.props.onClick(); tree = f.render();
  assert.equal(heartsOf(tree), 2);
  assert.equal(scoreOf(tree), 12);
  assert.ok(tree.find((node) => hasClass(node, "combo")).props["aria-hidden"]);
  assert.ok([...f.timers.values()].some((timer) => timer.delay === 600));
  wrong.props.onClick(); assert.equal(heartsOf(f.render()), 2, "one drop can only cost one heart");
  f.run(600); f.render(); tree = f.render();
  f.land(); tree = f.render();
  assert.equal(heartsOf(tree), 1);
  f.run(600); f.render(); tree = f.render();
  f.land(); tree = f.render();
  assert.equal(heartsOf(tree), 0);
  assert.ok(tree.some((node) => node.type === "h1" && node.props.children === "O'yin tugadi!"));
  assert.ok(tree.some((node) => node.type === "strong" && node.props.children === 12));
  assert.ok(tree.some((node) => node.type === "strong" && node.props.children === 1));
  tree.find((node) => hasClass(node, "again")).props.onClick(); tree = f.render();
  assert.equal(heartsOf(tree), 3);
  assert.equal(scoreOf(tree), 0);
  assert.ok([...f.timers.values()].some((timer) => timer.delay === 300));
  f.run(300); f.render(); tree = f.render();
  assert.equal(f.animations.at(-1).options.duration, 6000);
  assert.equal(optionsOf(tree).length, 3);
  assert.equal(f.calls.length, 1);
  f.unmount();
});

test("explicit course beats active course in either direction; refreshes do not refetch or restart a drop", async () => {
  for (const [active, target, locale, prefix] of [["ko", "en", "ko", "뜻"], ["en", "ko", "uz", "uz"]]) {
    const f = fixture({ language: active, query: `targetLanguage=${target}`, locale, words: poolOf(target) });
    let tree = await f.boot();
    const word = headwordOf(tree);
    const choices = optionsOf(tree).map((choice) => choice.props.children);
    assert.ok(choices.every((choice) => choice.startsWith(prefix)));
    const url = new URL(f.calls[0], "https://korio.test");
    assert.equal(url.searchParams.get("targetLanguage"), target);
    assert.equal(url.searchParams.get("courseId"), `${target}-general`);
    assert.equal(url.searchParams.get("lang"), locale);
    f.user.learnCourse = active === "ko" ? "en" : "ko";
    f.setHandler(async () => ({ words: poolOf(active) }));
    tree = f.render();
    assert.equal(headwordOf(tree), word);
    assert.deepEqual(optionsOf(tree).map((choice) => choice.props.children), choices);
    assert.equal(f.animations.length, 1);
    assert.equal(f.calls.length, 1);
    rightOption(tree, target, prefix).props.onClick(); tree = f.render();
    assert.equal(scoreOf(tree), 12);
    f.unmount();
  }
});

test("exactly three distinct words are playable; too few, duplicate, old Korean and failed pools retry safely", async () => {
  const minimum = fixture({ words: poolOf("en").slice(0, 3) });
  assert.equal(optionsOf(await minimum.boot()).length, 3);
  minimum.unmount();
  const cases = [
    [poolOf("en").slice(0, 2), false],
    [[...poolOf("en").slice(0, 2), ...poolOf("en").slice(0, 2)], false],
    [poolOf("en").map((word) => ({ ...word, meaningKo: "same" })), false],
    [poolOf("ko"), false],
    [[], true],
  ];
  for (const [words, reject] of cases) {
    const f = fixture({ words, reject });
    let tree = await f.boot();
    assert.equal(optionsOf(tree).length, 0);
    assert.equal(f.animations.length, 0);
    const retry = tree.find((node) => node.type === "button" && node.props.children === "Qayta urinish");
    assert.ok(retry);
    f.user.learnCourse = "ko";
    f.setHandler(async () => ({ words: poolOf("en") }));
    retry.props.onClick(); tree = await f.boot();
    assert.equal(optionsOf(tree).length, 3);
    assert.ok(f.calls.every((pathname) => new URL(pathname, "https://korio.test").searchParams.get("targetLanguage") === "en"));
    f.unmount();
  }
});

test("exit cancels a pending next drop, flash and late landing callbacks", async () => {
  for (const correct of [true, false]) {
    const f = fixture();
    let tree = await f.boot();
    const lateLanding = f.animations.at(-1).onfinish;
    const right = rightOption(tree, "en");
    (correct ? right : optionsOf(tree).find((choice) => choice !== right)).props.onClick(); tree = f.render();
    tree.find((node) => node.type === "button" && node.props["aria-label"] === "Yopish").props.onClick();
    assert.equal(f.timers.size, 0);
    assert.equal(f.frames.size, 0);
    lateLanding(); f.run(correct ? 420 : 600); tree = f.render();
    assert.equal(f.animations.length, 1);
    assert.equal(heartsOf(tree), correct ? 3 : 2);
    assert.deepEqual(f.results, [correct ? 12 : 0]);
    f.unmount();
  }
});

test("challenge result hides restart and keeps the existing finish score", async () => {
  const f = fixture({ challenge: true });
  let tree = await f.boot();
  for (let heart = 0; heart < 3; heart += 1) {
    f.land(); tree = f.render();
    if (heart < 2) { f.run(600); f.render(); tree = f.render(); }
  }
  assert.ok(!tree.some((node) => hasClass(node, "again")));
  tree.find((node) => hasClass(node, "exit")).props.onClick();
  assert.deepEqual(f.results, [0]);
  f.unmount();
});
