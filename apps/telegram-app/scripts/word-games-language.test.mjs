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

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...nodes(node.props?.children)];
}
const hasClass = (node, name) => typeof node.props?.className === "string" && node.props.className.split(" ").includes(name);
const cardText = (card) => nodes(card).find((node) => node.type === "span").props.children;
const words = ["apple", "bread", "chair", "dance", "earth", "field", "green", "house"];
const learnedWords = (language) => words.map((word, index) => ({ korean: language === "en" ? word : `한국어${index}`, native: `뜻${index}` }));
const gameWords = (language) => words.map((word, index) => ({ id: `word-${index}`, ko: language === "en" ? word : `한국어${index}`, meaningKo: `뜻${index}`, uz: `uz${index}`, en: `meaning ${index}`, ru: `ru${index}` }));

function fixture({ language = "en", query = "", locale = "ko", learned = learnedWords(language), filler = gameWords(language), reject = false } = {}) {
  const scope = hookScope();
  const user = { learnCourse: language };
  const params = new URLSearchParams(query);
  const calls = [];
  const routes = [];
  const timers = new Map();
  let timerId = 0;
  let handler = async (pathname) => {
    if (reject) throw new Error("offline");
    return { words: pathname.startsWith("/lessons/") ? learned : filler };
  };
  let request = async (pathname) => { calls.push(pathname); return handler(pathname); };
  const window = {
    history: { length: 2 },
    setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay, interval: false }); return id; },
    clearTimeout: (id) => timers.delete(id),
    setInterval(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay, interval: true }); return id; },
    clearInterval: (id) => timers.delete(id),
  };
  const router = { push: (route) => routes.push(route), replace: (route) => routes.push(route), back: () => routes.push("back") };
  const mocks = {
    react: scope.react,
    "next/navigation": { useRouter: () => router, useSearchParams: () => params },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request, user, updateUser() {} }) },
    "../../../shared/i18n/content-language": { getContentLang: () => locale },
    "../../../shared/ui/mobile-icon": { MobileIcon: () => null },
    "../../../shared/telegram/back-button": { useTelegramBackOverride() {} },
    "../model/use-league-challenge": { useLeagueChallenge: () => ({ finish: (score) => routes.push(score), goBack: () => routes.push("back"), isChallenge: false }) },
  };
  const production = load("src/features/league/ui/match-game-screen.tsx", mocks, { window });
  const hub = load("src/features/games/ui/games-screen.tsx", mocks, { window });
  return {
    calls, routes, timers, user, params,
    render: () => scope.render(() => nodes(production.MatchGameScreen())),
    renderHub: () => scope.render(() => nodes(hub.GamesScreen())),
    setHandler(next) { handler = next; request = async (pathname) => { calls.push(pathname); return handler(pathname); }; },
    async flush() { for (let index = 0; index < 8; index += 1) await Promise.resolve(); },
    run(delay) {
      for (const [id, timer] of [...timers.entries()].filter(([, timer]) => timer.delay === delay)) {
        if (timers.has(id)) { if (!timer.interval) timers.delete(id); timer.callback(); }
      }
    },
    unmount: () => scope.unmount(),
  };
}

test("English and Korean use the same five-pair board and timer with protected learning text", async () => {
  for (const language of ["ko", "en"]) {
    const f = fixture({ language, locale: language === "en" ? "ko" : "uz" });
    f.render(); await f.flush();
    const tree = f.render();
    const cards = tree.filter((node) => hasClass(node, "pairCard"));
    assert.equal(cards.length, 10);
    assert.ok(cards.every((card) => hasClass(card, "idle") && hasClass(card, "appearing")));
    assert.equal(tree.find((node) => node.type === "b" && Array.isArray(node.props.children)).props.children.join(""), "1:00");
    assert.ok(cards.every((card) => nodes(card).some((node) => node.props?.["data-no-translate"] === true)));
    assert.equal(f.calls.length, 1, "enough learned words do not need a filler request");
    const url = new URL(f.calls[0], "https://korio.test");
    assert.equal(url.searchParams.get("targetLanguage"), language);
    assert.equal(url.searchParams.get("courseId"), `${language}-general`);
    f.unmount();
    assert.equal(f.timers.size, 0);
  }
});

test("English game-pool fallback displays English headwords and Korean meanings", async () => {
  const f = fixture({ language: "ko", query: "targetLanguage=en", learned: [], filler: gameWords("en") });
  f.render(); await f.flush();
  const tree = f.render();
  const cards = tree.filter((node) => hasClass(node, "pairCard"));
  assert.equal(cards.length, 10);
  assert.ok(cards.slice(0, 5).every((card) => words.includes(cardText(card))));
  assert.ok(cards.slice(5).every((card) => /^뜻/.test(cardText(card))));
  assert.equal(f.calls.length, 2);
  for (const request of f.calls) {
    const url = new URL(request, "https://korio.test");
    assert.equal(url.searchParams.get("targetLanguage"), "en");
    assert.equal(url.searchParams.get("courseId"), "en-general");
    assert.equal(url.searchParams.get("lang"), "ko");
  }
  f.unmount();
});

test("a course switch cannot reset an active board, timer, or request scope", async () => {
  const f = fixture();
  f.render(); await f.flush();
  let tree = f.render();
  const before = tree.filter((node) => hasClass(node, "pairCard")).map(cardText);
  f.run(1000);
  f.user.learnCourse = "ko";
  f.setHandler(async () => ({ words: learnedWords("ko") }));
  tree = f.render();
  assert.deepEqual(tree.filter((node) => hasClass(node, "pairCard")).map(cardText), before);
  assert.equal(f.calls.length, 1);
  assert.ok(tree.some((node) => node.type === "b" && Array.isArray(node.props.children) && node.props.children.join("") === "0:59"));
  f.unmount();
});

test("fewer than five valid words or failed requests never starts an empty timed board; retry stays scoped", async () => {
  for (const reject of [false, true]) {
    const f = fixture({ reject, learned: [], filler: gameWords("en").slice(0, 4) });
    f.render(); await f.flush();
    let tree = f.render();
    assert.equal(tree.filter((node) => hasClass(node, "pairCard")).length, 0);
    assert.equal(f.timers.size, 0);
    const retry = tree.find((node) => node.type === "button" && node.props.children === "Qayta urinish");
    assert.ok(retry);
    f.user.learnCourse = "ko";
    f.setHandler(async () => ({ words: gameWords("en") }));
    retry.props.onClick();
    f.render(); await f.flush();
    tree = f.render();
    assert.equal(tree.filter((node) => hasClass(node, "pairCard")).length, 10);
    assert.ok(f.calls.every((request) => new URL(request, "https://korio.test").searchParams.get("targetLanguage") === "en"));
    f.unmount();
  }
});

test("legacy Korean content cannot leak into an English game", async () => {
  const f = fixture({ learned: learnedWords("ko"), filler: gameWords("ko") });
  f.render(); await f.flush();
  const tree = f.render();
  assert.ok(tree.some((node) => node.type === "button" && node.props.children === "Qayta urinish"));
  assert.equal(tree.filter((node) => hasClass(node, "pairCard")).length, 0);
  assert.equal(f.timers.size, 0);
  f.unmount();
});

test("the reused game keeps correct, wrong and replacement animation timing in both languages", async () => {
  for (const language of ["ko", "en"]) {
    const f = fixture({ language });
    f.render(); await f.flush();
    let tree = f.render();
    let cards = tree.filter((node) => hasClass(node, "pairCard"));
    const word = cardText(cards[0]);
    const index = learnedWords(language).findIndex((pair) => pair.korean === word);
    const correct = cards.slice(5).find((card) => cardText(card) === `뜻${index}`);
    const wrong = cards.slice(5).find((card) => cardText(card) !== `뜻${index}`);
    cards[0].props.onClick(); tree = f.render();
    cards = tree.filter((node) => hasClass(node, "pairCard"));
    cards.slice(5).find((card) => cardText(card) === cardText(wrong)).props.onClick();
    tree = f.render();
    assert.equal(tree.filter((node) => hasClass(node, "wrong")).length, 2);
    f.run(520); tree = f.render();
    cards = tree.filter((node) => hasClass(node, "pairCard"));
    cards[0].props.onClick(); tree = f.render();
    cards = tree.filter((node) => hasClass(node, "pairCard"));
    cards.slice(5).find((card) => cardText(card) === cardText(correct)).props.onClick();
    tree = f.render();
    assert.equal(tree.filter((node) => hasClass(node, "correct")).length, 2);
    assert.ok([...f.timers.values()].some((timer) => timer.delay === 620));
    assert.ok([...f.timers.values()].some((timer) => timer.delay === 1040));
    f.run(620); tree = f.render();
    assert.ok(tree.some((node) => hasClass(node, "vanishing")));
    f.run(1040); tree = f.render();
    assert.equal(tree.filter((node) => hasClass(node, "pairCard")).length, 10);
    assert.equal(tree.filter((node) => hasClass(node, "correct")).length, 0);
    f.unmount();
  }
});

test("English games hub exposes only the three implemented games; Korean keeps all seven and Hangul", () => {
  for (const [language, query, expected] of [["en", "", 3], ["ko", "", 7], ["ko", "targetLanguage=en", 3], ["en", "targetLanguage=ko", 7]]) {
    const f = fixture({ language, query });
    const tree = f.renderHub();
    const cards = tree.filter((node) => hasClass(node, "card"));
    assert.equal(cards.length, expected);
    assert.equal(tree.some((node) => hasClass(node, "hangulCard")), expected === 7);
    cards[0].props.onClick();
    assert.equal(f.routes[0], `/match-game?targetLanguage=${expected === 3 ? "en" : "ko"}`);
    f.unmount();
  }
});

test("the same five-match XP reward pauses play, then resumes and shows the same final star tier", async () => {
  for (const language of ["ko", "en"]) {
    const f = fixture({ language });
    f.render(); await f.flush();
    let tree = f.render();
    for (let count = 0; count < 5; count += 1) {
      let cards = tree.filter((node) => hasClass(node, "pairCard"));
      const index = learnedWords(language).findIndex((pair) => pair.korean === cardText(cards[0]));
      cards[0].props.onClick(); tree = f.render();
      cards = tree.filter((node) => hasClass(node, "pairCard"));
      cards.slice(5).find((card) => cardText(card) === `뜻${index}`).props.onClick();
      tree = f.render();
      f.run(620); f.run(1040); tree = f.render();
    }
    assert.ok(tree.some((node) => hasClass(node, "rewardBubble") && node.props.children[0].includes("5 XP")));
    f.run(1000); tree = f.render();
    assert.ok(tree.some((node) => node.type === "b" && Array.isArray(node.props.children) && node.props.children.join("") === "1:00"));
    tree.find((node) => node.type === "button" && node.props.children === "Davom etish").props.onClick();
    for (let second = 0; second < 60; second += 1) f.run(1000);
    tree = f.render();
    assert.ok(tree.some((node) => node.type === "h2" && node.props.children === "Vaqt tugadi!"));
    assert.ok(tree.some((node) => node.type === "p" && node.props.children === "Jami 5 ta juftladingiz!"));
    assert.ok(tree.some((node) => hasClass(node, "stars")));
    tree.find((node) => node.type === "button" && node.props.children === "Davom etish").props.onClick();
    assert.deepEqual(f.routes, ["back"]);
    f.unmount();
  }
});

test("a game closed during its learned-word request does not fetch filler or start a timer", async () => {
  const f = fixture();
  let release;
  f.setHandler(() => new Promise((resolve) => { release = resolve; }));
  f.render();
  f.unmount();
  release({ words: [] }); await f.flush();
  assert.equal(f.calls.length, 1);
  assert.equal(f.timers.size, 0);
});

test("both English study modes route their existing games card with the explicit English course", async () => {
  const scope = hookScope();
  const routes = [];
  const production = load("src/features/learning/ui/course-categories-screen.tsx", {
    react: scope.react,
    "next/navigation": { useRouter: () => ({ push: (route) => routes.push(route) }), useSearchParams: () => new URLSearchParams("lang=en") },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ user: { learnCourse: "ko" }, updateUser() {}, request: async () => ({}) }) },
    "../../home/ui/home-icon": { HomeIcon: () => null },
    "../../../shared/ui/premium-gate-sheet": { PremiumGateSheet: () => null },
    "../../../shared/ui/swipe-slides": { SwipeSlides: ({ slides }) => slides },
    "../../../shared/ui/use-swipe-tabs": { useSwipeTabs() {}, writeSwipeProgress() {} },
    "./learning-icon": { LearningIcon: () => null },
    "./topik-level-sheet": { TopikLevelSheet: () => null },
  });
  const tree = scope.render(() => nodes(production.CourseCategoriesScreen()));
  const cards = tree.filter((node) => node.type === "button" && nodes(node).some((child) => child.type === "strong" && child.props?.children === "O'yinlar"));
  assert.equal(cards.length, 2);
  for (const card of cards) await card.props.onClick();
  assert.deepEqual(routes, ["/games?targetLanguage=en", "/games?targetLanguage=en"]);
  scope.unmount();
});

test("unmigrated generic game-word consumers fail closed for English without requesting a pool", async () => {
  const scope = hookScope();
  const user = { learnCourse: "en" };
  const calls = [];
  const request = async (pathname) => { calls.push(pathname); return { words: gameWords("ko") }; };
  const production = load("src/features/league/model/use-game-words.ts", {
    react: scope.react,
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ user, request }) },
    "../../../shared/i18n/content-language": { getContentLang: () => "uz" },
  });
  let state = scope.render(() => production.useGameWords());
  assert.deepEqual({ failed: state.failed, loading: state.loading, words: state.words }, { failed: true, loading: false, words: null });
  state.reload();
  assert.equal(calls.length, 0);
  user.learnCourse = "ko";
  scope.render(() => production.useGameWords());
  await Promise.resolve();
  state = scope.render(() => production.useGameWords());
  assert.equal(calls.length, 1);
  assert.equal(state.failed, false);
  assert.equal(state.words.length, 8);
  user.learnCourse = "en";
  state = scope.render(() => production.useGameWords());
  assert.equal(state.words, null, "a previous Korean pool is hidden immediately");
  assert.equal(state.failed, true);
  assert.equal(calls.length, 1);
  scope.unmount();
});

test("the real auth provider preserves scoped game explanation languages but still corrects legacy helpers", async () => {
  const scope = hookScope();
  const requests = [];
  const settings = { language: "ru", savedContentLanguage: "uz" };
  const production = load("src/features/auth/model/telegram-auth-context.tsx", {
    react: { ...scope.react, createContext: () => ({ Provider: Symbol("Provider") }) },
    "../api/telegram-auth": { exchangeTelegramInitData: async () => ({ accessToken: "fixture-token", user: { learnCourse: "en" } }) },
    "../../../shared/api/client": { apiRequest: async (pathname, init) => { requests.push({ pathname, init }); return {}; } },
    "../../../shared/telegram/runtime": { prepareTelegramWebApp: () => ({ initData: "fixture-init" }) },
    "../../../shared/i18n/learning-language-context": { LearningLanguageContext: { Provider: Symbol("LearningProvider") } },
    "../../../shared/i18n/language-context": { useAppLanguage: () => settings },
  });
  const render = () => scope.render(() => production.TelegramAuthProvider({ children: null })).props.value;
  render();
  for (let index = 0; index < 8; index += 1) await Promise.resolve();
  let auth = render();
  assert.equal(auth.status, "authenticated");
  const scoped = [
    "/words/game-pool?count=15&courseId=en-general&targetLanguage=en&lang=ko",
    "/lessons/learned-words?targetLanguage=en&lang=ko",
    "/words/game-pool?courseId=en-general&lang=ko",
  ];
  for (const pathname of scoped) await auth.request(pathname);
  assert.ok(requests.every(({ pathname }) => new URL(pathname, "https://korio.test").searchParams.get("lang") === "ko"));
  settings.language = "uz";
  auth = render();
  await auth.request(scoped[0]);
  assert.equal(new URL(requests.at(-1).pathname, "https://korio.test").searchParams.get("lang"), "ko", "later UI changes cannot rewrite a game session's explanation language");
  await auth.request("/words/game-pool?lang=en");
  const legacy = new URL(requests.at(-1).pathname, "https://korio.test");
  assert.equal(legacy.searchParams.get("targetLanguage"), "en");
  assert.equal(legacy.searchParams.get("lang"), "uz", "legacy unscoped helpers still resolve their language at the boundary");
  scope.unmount();
});
