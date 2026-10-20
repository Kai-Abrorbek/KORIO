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
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
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
  new Function("require", "module", "exports", ...Object.keys(globals), compiled)(
    localRequire, compiledModule, compiledModule.exports, ...Object.values(globals),
  );
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
const find = (tree, predicate) => tree.find(predicate);

function fixture({ language = "en", query = "level=lv1&step=1&mode=easy", scores = {} } = {}) {
  const scope = hookScope();
  const user = { learnCourse: language };
  const params = new URLSearchParams(query);
  const calls = [];
  const warmed = [];
  const saves = [];
  const routes = [];
  const timers = new Map();
  let timerId = 0;
  let stops = 0;
  const window = {
    setTimeout: (callback, delay) => { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
  };
  const router = { push: (route) => routes.push(route), replace: (route) => routes.push(route) };
  const request = async () => ({ scores });
  const stop = () => { stops += 1; };
  const speech = {
    prewarm: (words, locale) => warmed.push({ words, locale }),
    speak: (word, options) => calls.push({ word, options }),
    stop,
  };
  const mocks = {
    react: scope.react,
    "next/navigation": { useRouter: () => router, useSearchParams: () => params },
    "next/image": { __esModule: true, default: () => null },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request, user }) },
    "../../../shared/browser/use-korean-speech": { useKoreanSpeech: () => speech },
    "../../../shared/i18n/content-language": { getContentLang: () => "ko" },
    "../../../shared/i18n/language-context": { useAppLanguage: () => ({ language: "ko" }) },
    "../../../shared/ui/mobile-icon": { MobileIcon: () => null },
    "../../../shared/telegram/back-button": { safeBack: () => routes.push("back") },
    "../api/pronunciation": {
      getPronunciationScores: async () => ({ scores }),
      savePronunciationScore: async (_request, body) => { saves.push(body); return { scores }; },
    },
  };
  const production = load("src/features/pronunciation/ui/pronunciation-quiz-screen.tsx", mocks, { window });
  const practice = load("src/features/pronunciation/ui/pronunciation-practice-screen.tsx", mocks, { window });
  return {
    calls, warmed, saves, routes, timers, user, params,
    get stops() { return stops; },
    renderQuiz: () => scope.render(() => nodes(production.PronunciationQuizScreen())),
    renderPractice: () => scope.render(() => nodes(practice.PronunciationPracticeScreen())),
    run(delay) {
      const current = [...timers.entries()].filter(([, timer]) => timer.delay === delay);
      for (const [id, timer] of current) { if (timers.delete(id)) timer.callback(); }
    },
    unmount: () => scope.unmount(),
  };
}

test("English and Korean reuse the same game engine with separate score keys", () => {
  const data = load("src/features/pronunciation/data/pronunciation-curriculum.ts");
  for (const language of ["ko", "en"]) {
    const curriculum = data.getPronunciationCurriculum(language);
    for (const level of ["lv1", "lv2", "lv3", "lv4"]) {
      assert.equal(curriculum.levelTotal(level), curriculum.data[level].stages.length * 2);
      for (const stage of curriculum.data[level].stages) {
        const plan = curriculum.stageQuestionPlan(level, stage.step);
        assert.equal(plan.length, stage.pairs.length * 2);
        assert.equal(plan.filter((question) => question.answer === 0).length, stage.pairs.length);
        assert.equal(plan.filter((question) => question.answer === 1).length, stage.pairs.length);
      }
    }
    assert.equal(curriculum.speechLocale, language === "en" ? "en-US" : "ko-KR");
  }
  assert.equal(data.pronunciationScoreKey("lv1", 1, "easy", "ko"), "lv1:1:easy");
  assert.equal(data.pronunciationScoreKey("lv1", 1, "easy", "en"), "en:lv1:1:easy");
  assert.ok(data.pronunciationGloss("sheep", "ko-KR", "en"));
});

test("English automatic, second-word, replay, option and correct audio stay English", () => {
  const f = fixture();
  f.renderQuiz();
  let tree = f.renderQuiz();
  f.run(60);
  assert.equal(f.calls.length, 1);
  f.calls[0].options.onEnd();
  f.run(60);
  assert.equal(f.calls.length, 2);
  find(tree, (node) => node.props?.["aria-label"] === "Qayta tinglash").props.onClick();
  assert.equal(f.calls.length, 3);
  const target = find(tree, (node) => node.type === "h1").props.children;
  find(tree, (node) => node.type === "button" && node.props?.["aria-label"] === target).props.onClick();
  f.run(180);
  tree = f.renderQuiz();
  find(tree, (node) => node.props?.className === "cardSpeaker").props.onClick();
  assert.ok(f.calls.length >= 5);
  assert.ok(f.calls.every((call) => call.options.language === "en-US"));
  assert.ok(f.warmed.every((call) => call.locale === "en-US"));
  assert.ok(tree.some((node) => node.props?.["data-no-translate"]));
  f.unmount();
  assert.equal(f.timers.size, 0);
});

test("legacy Korean routes keep Korean voice; explicit route overrides the active course", () => {
  for (const [language, query, expected] of [
    ["ko", "", "ko-KR"],
    ["en", "targetLanguage=ko", "ko-KR"],
    ["ko", "targetLanguage=en", "en-US"],
  ]) {
    const f = fixture({ language, query });
    f.renderQuiz(); f.renderQuiz(); f.run(60);
    assert.ok(f.calls.length);
    assert.equal(f.calls[0].options.language, expected);
    assert.ok(f.warmed.every((call) => call.locale === expected));
    f.unmount();
  }
});

test("a fast answer or exit cancels pending automatic playback", () => {
  const f = fixture();
  f.renderQuiz();
  const tree = f.renderQuiz();
  const target = find(tree, (node) => node.type === "h1").props.children;
  find(tree, (node) => node.type === "button" && node.props?.["aria-label"] === target).props.onClick();
  f.run(60);
  assert.equal(f.calls.length, 0);
  f.unmount();
  f.run(180);
  assert.equal(f.calls.length, 0);
  assert.equal(f.timers.size, 0);
});

test("English HARD reads only the target word and keeps manual replay English", () => {
  const f = fixture({ query: "targetLanguage=en&mode=hard" });
  f.renderQuiz();
  const tree = f.renderQuiz();
  f.run(60);
  assert.equal(f.calls.length, 1);
  assert.match(f.calls[0].word, /^[a-z]+$/);
  assert.equal(f.calls[0].options.onEnd, undefined);
  find(tree, (node) => node.props?.["aria-label"] === "Qayta tinglash").props.onClick();
  assert.equal(f.calls.length, 2);
  assert.ok(f.calls.every((call) => call.options.language === "en-US"));
  f.unmount();
});

test("English course categories expose the existing pronunciation card in both study modes", async () => {
  const scope = hookScope();
  const routes = [];
  const router = { push: (route) => routes.push(route) };
  const params = new URLSearchParams("lang=en");
  const production = load("src/features/learning/ui/course-categories-screen.tsx", {
    react: scope.react,
    "next/navigation": { useRouter: () => router, useSearchParams: () => params },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ user: { learnCourse: "ko" }, updateUser() {}, request: async () => ({}) }) },
    "../../home/ui/home-icon": { HomeIcon: () => null },
    "../../../shared/ui/premium-gate-sheet": { PremiumGateSheet: () => null },
    "../../../shared/ui/swipe-slides": { SwipeSlides: ({ slides }) => slides },
    "../../../shared/ui/use-swipe-tabs": { useSwipeTabs() {}, writeSwipeProgress() {} },
    "./learning-icon": { LearningIcon: () => null },
    "./topik-level-sheet": { TopikLevelSheet: () => null },
  });
  const tree = scope.render(() => nodes(production.CourseCategoriesScreen()));
  const cards = tree.filter((node) => node.type === "button" && nodes(node).some((child) => child.type === "strong" && child.props?.children === "Talaffuz"));
  assert.equal(cards.length, 2);
  for (const card of cards) await card.props.onClick();
  assert.deepEqual(routes, ["/pronunciation-practice?targetLanguage=en", "/pronunciation-practice?targetLanguage=en"]);
  scope.unmount();
});

test("a quiz snapshots its language and saves English even if active course changes", async () => {
  const f = fixture();
  f.renderQuiz();
  let tree = f.renderQuiz();
  f.user.learnCourse = "ko";
  const count = load("src/features/pronunciation/data/pronunciation-curriculum.ts")
    .getPronunciationCurriculum("en").stageQuestionCount("lv1", 1);
  for (let index = 0; index < count; index += 1) {
    tree = f.renderQuiz();
    const target = find(tree, (node) => node.type === "h1").props.children;
    find(tree, (node) => node.type === "button" && node.props?.["aria-label"] === target).props.onClick();
    tree = f.renderQuiz();
    find(tree, (node) => node.type === "button" && node.props?.disabled === false && node.props?.children?.[1] === "Keyingi").props.onClick();
    tree = f.renderQuiz();
  }
  await Promise.resolve();
  assert.equal(f.saves.length, 1);
  assert.deepEqual(f.saves[0], { level: "lv1", step: 1, mode: "easy", score: 100, targetLanguage: "en" });
  f.unmount();
});

test("Korean EASY scores never unlock English HARD; progress only counts the selected language", async () => {
  for (const [language, expectedScore, unlocked] of [["en", "--", false], ["ko", 100, true]]) {
    const f = fixture({ language, scores: { "lv1:1:easy": 100 } });
    f.renderPractice();
    await Promise.resolve();
    const tree = f.renderPractice();
    const modes = tree.filter((node) => node.props?.className === "mode");
    assert.equal(find(nodes(modes[0]), (node) => node.type === "span").props.children, expectedScore);
    const hard = find(nodes(modes[1]), (node) => node.type === "button");
    assert.equal(hard.props.className !== "lockedStart", unlocked);
    hard.props.onClick();
    assert.equal(f.routes.length > 0, unlocked);
    if (unlocked) assert.match(f.routes[0], /targetLanguage=ko$/);
    f.unmount();
  }
});

test("invalid stages return to the same language without speech or writes", () => {
  const f = fixture({ query: "targetLanguage=en&step=999" });
  f.renderQuiz();
  assert.deepEqual(f.routes, ["/pronunciation-practice?targetLanguage=en"]);
  assert.equal(f.calls.length, 0);
  assert.equal(f.saves.length, 0);
  f.unmount();
});
