/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(relative, mocks = {}, cache = new Map(), timers = {}) {
  const file = path.resolve(__dirname, relative);
  if (cache.has(file)) return cache.get(file);
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const compiled = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    const target = id.startsWith("@/")
      ? path.resolve(__dirname, "../src", id.slice(2))
      : id.startsWith(".")
        ? path.resolve(path.dirname(file), id)
        : null;
    if (!target) throw new Error(`Unexpected dependency ${id}`);
    const resolved = [target, `${target}.ts`, `${target}.tsx`].find(existsSync);
    assert.ok(resolved, `Missing ${id}`);
    return load(path.relative(__dirname, resolved), mocks, cache, timers);
  };
  new Function(
    "require",
    "module",
    "exports",
    "setTimeout",
    "clearTimeout",
    source,
  )(
    localRequire,
    compiled,
    compiled.exports,
    timers.setTimeout ?? setTimeout,
    timers.clearTimeout ?? clearTimeout,
  );
  cache.set(file, compiled.exports);
  return compiled.exports;
}

const shared = load("../../../shared/pronunciation.ts");
const english = load("../../../shared/english-pronunciation.ts");
const korean = load("../src/constants/pronunciation.ts");
const selector = load("../src/constants/pronunciation-curriculum.ts");
const { PRON_LEVELS, HARD_UNLOCK_SCORE, pronunciationScoreKey } = shared;

test("English has real-word contrasts, complete glosses and localized copy in all four UI languages", () => {
  const curriculum = selector.getPronunciationCurriculum("en");
  assert.equal(curriculum.speechLocale, "en-US");
  for (const locale of ["ko", "en", "uz", "ru"]) {
    const copy = english.ENGLISH_PRON_COPY[locale];
    assert.ok(copy.accentNote && copy.languageLabel && copy.practiceHint);
    for (const level of PRON_LEVELS) {
      assert.ok(copy.stories[level] && copy.focus[level]);
      assert.equal(curriculum.data[level].stages.length, 4);
      assert.equal(curriculum.levelTotal(level), 8);
      for (const stage of curriculum.data[level].stages) {
        assert.ok(copy.positions[stage.pos]);
        assert.match(stage.a, /^\/.+\/$/);
        assert.match(stage.b, /^\/.+\/$/);
        assert.equal(stage.leftBubble.split("{0}").length, 2);
        assert.equal(stage.rightBubble.split("{0}").length, 2);
        assert.ok(stage.pairs.length >= 3);
        for (const [left, right] of stage.pairs) {
          assert.notEqual(left.word, right.word);
          assert.match(left.word, /^[a-z]+$/);
          assert.match(right.word, /^[a-z]+$/);
          assert.equal(`/${left.jamo}/`, stage.a);
          assert.equal(`/${right.jamo}/`, stage.b);
          for (const option of [left, right]) {
            assert.ok(curriculum.gloss(option.word, locale), option.word);
            assert.equal(
              curriculum.gloss(option.word, `${locale}-XX`),
              curriculum.gloss(option.word, locale),
            );
          }
        }
      }
    }
  }
  assert.deepEqual(
    selector.englishPronunciationCopy("xx"),
    english.ENGLISH_PRON_COPY.en,
  );
});

test("both languages use the same two-sided question engine and independent legacy-compatible score keys", () => {
  for (const language of ["ko", "en"]) {
    const curriculum = selector.getPronunciationCurriculum(language);
    for (const level of PRON_LEVELS) {
      for (const stage of curriculum.data[level].stages) {
        const plan = curriculum.stageQuestionPlan(level, stage.step);
        assert.equal(plan.length, stage.pairs.length * 2);
        for (const pair of stage.pairs) {
          assert.deepEqual(
            plan
              .filter((p) => p.pair === pair)
              .map((p) => p.answer)
              .sort(),
            [0, 1],
          );
        }
        assert.deepEqual(
          curriculum.correctNeededFor(level, stage.step, HARD_UNLOCK_SCORE),
          {
            total: plan.length,
            need: Math.ceil(plan.length * 0.8),
          },
        );
      }
    }
    assert.deepEqual(curriculum.stageQuestionPlan("lv1", 99), []);
  }
  assert.deepEqual(
    selector.getPronunciationCurriculum("ko").data,
    korean.PRON_DATA,
  );
  assert.equal(pronunciationScoreKey("lv1", 1, "easy"), "lv1:1:easy");
  assert.equal(pronunciationScoreKey("lv1", 1, "easy", "ko"), "lv1:1:easy");
  assert.equal(pronunciationScoreKey("lv1", 1, "easy", "en"), "en:lv1:1:easy");
  assert.equal(shared.resolvePronunciationLanguage("unknown", "en"), "en");
});

function nodes(node) {
  if (node == null || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  return [node, ...nodes(node.props?.children)];
}

// Execute the actual route and session hooks. Only native presentation/audio,
// navigation and HTTP boundaries are mocked; timers are deterministic.
function harness({
  language = "en",
  course = "ko",
  mode = "easy",
  level = "lv1",
  step = "1",
  scores = {},
} = {}) {
  let states = [],
    refs = [],
    effects = [],
    memos = [],
    sharedValues = [];
  let si,
    ri,
    ei,
    mi,
    vi,
    pending,
    dirty,
    tree,
    Component,
    props = {};
  let timerId = 0,
    stopped = 0;
  const scheduled = new Map(),
    calls = [],
    warmed = [],
    saved = [],
    pushed = [];
  const store = { learnCourse: course, language: "ko" };
  const params = {
    level,
    step,
    mode,
    ...(language ? { targetLanguage: language } : {}),
  };
  const hookMemo = (fn, deps) => {
    const i = mi++,
      previous = memos[i];
    if (!previous || deps.some((v, j) => !Object.is(v, previous.deps[j])))
      memos[i] = { deps, value: fn() };
    return memos[i].value;
  };
  const useEffect = (effect, deps) => {
    const i = ei++,
      previous = effects[i];
    if (
      !previous ||
      !deps ||
      deps.some((v, j) => !Object.is(v, previous.deps[j]))
    )
      pending.push(() => {
        previous?.cleanup?.();
        effects[i] = { deps, cleanup: effect() };
      });
  };
  const react = {
    useState: (initial) => {
      const i = si++;
      if (!(i in states))
        states[i] = typeof initial === "function" ? initial() : initial;
      return [
        states[i],
        (next) => {
          const value = typeof next === "function" ? next(states[i]) : next;
          if (!Object.is(value, states[i])) {
            states[i] = value;
            dirty = true;
          }
        },
      ];
    },
    useRef: (initial) => refs[ri++] ?? (refs[ri - 1] = { current: initial }),
    useMemo: hookMemo,
    useCallback: (fn, deps) => hookMemo(() => fn, deps),
    useEffect,
  };
  const timers = {
    setTimeout: (fn, delay) => {
      const id = ++timerId;
      scheduled.set(id, { fn, delay });
      return id;
    },
    clearTimeout: (id) => scheduled.delete(id),
  };
  const audio = {
    speak: (text, locale, options) => calls.push({ text, locale, options }),
    stop: () => {
      stopped++;
    },
    prewarm: (words, locale) => warmed.push({ words, locale }),
  };
  const mocks = {
    react,
    "react/jsx-runtime": {
      jsx: (type, p) => ({ type, props: p }),
      jsxs: (type, p) => ({ type, props: p }),
    },
    "react-native": {
      View: "View",
      Text: "Text",
      ScrollView: "ScrollView",
      Modal: "Modal",
      ActivityIndicator: "ActivityIndicator",
      StyleSheet: { create: (v) => v },
    },
    "@/components/ui/Pressables": { Pressable: "Pressable" },
    "expo-linear-gradient": { LinearGradient: "Gradient" },
    "@expo/vector-icons": { Ionicons: "Icon" },
    "react-native-safe-area-context": {
      useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
    },
    "expo-router": {
      useRouter: () => ({ push: (v) => pushed.push(v), back() {} }),
      useLocalSearchParams: () => params,
      Redirect: "Redirect",
      useFocusEffect: (fn) => useEffect(fn, [fn]),
    },
    "@/hooks/useSpeech": { AUTO_SPEECH_DELAY_MS: 60, useSpeech: () => audio },
    "react-native-reanimated": {
      __esModule: true,
      default: { View: "AnimatedView" },
      useSharedValue: (value) =>
        sharedValues[vi++] ?? (sharedValues[vi - 1] = { value }),
      useAnimatedStyle: (fn) => fn(),
      withTiming: (v) => v,
      withSpring: (v) => v,
      interpolate: (v) => v,
      FadeIn: { duration: () => ({}) },
    },
    "react-i18next": { useTranslation: () => ({ t: (key) => key }) },
    "@/store/settings.store": {
      useContentLang: () => "ko",
      useSettingsStore: (select) => select(store),
    },
    "@/services/user.service": {
      UserService: {
        getPronunciation: async () => ({ scores }),
        savePronunciation: async (v) => {
          saved.push(v);
          return { scores };
        },
      },
    },
    "@/components/home/HaneulmonMascot": {
      __esModule: true,
      default: "Mascot",
    },
    "@/utils/haptics": {
      impactAsync() {},
      selectionAsync() {},
      notificationAsync() {},
      ImpactFeedbackStyle: { Light: 1 },
      NotificationFeedbackType: { Warning: 1 },
    },
  };
  const cache = new Map();
  const quiz = load(
    "../src/app/pronunciation-quiz.tsx",
    mocks,
    cache,
    timers,
  ).default;
  const practice = load(
    "../src/app/pronunciation-practice.tsx",
    mocks,
    cache,
    timers,
  ).default;
  function render() {
    for (let round = 0; round < 8; round++) {
      si = ri = ei = mi = vi = 0;
      pending = [];
      dirty = false;
      tree = Component(props);
      pending.forEach((fn) => fn());
      if (!dirty) return tree;
    }
    throw new Error("Hooks did not stabilize");
  }
  function mountRoute(route) {
    Component = route;
    props = {};
    render();
    const routeTree = tree;
    if (typeof tree.type === "function") {
      Component = tree.type;
      props = tree.props;
      states = [];
      refs = [];
      effects = [];
      memos = [];
      sharedValues = [];
      render();
    }
    return routeTree;
  }
  return {
    calls,
    warmed,
    saved,
    pushed,
    store,
    params,
    render,
    renderQuizRoute: () => {
      Component = quiz;
      props = {};
      return render();
    },
    mountQuiz: () => mountRoute(quiz),
    mountPractice: () => mountRoute(practice),
    get tree() {
      return tree;
    },
    get stopped() {
      return stopped;
    },
    get scheduled() {
      return scheduled.size;
    },
    find: (predicate) => nodes(tree).find(predicate),
    options: () => nodes(tree).filter((n) => n.type?.name === "OptionCard"),
    runTimers: (delay) => {
      for (const [id, timer] of [...scheduled])
        if (delay == null || timer.delay === delay) {
          scheduled.delete(id);
          timer.fn();
        }
      render();
    },
    flush: async () => {
      await Promise.resolve();
      await Promise.resolve();
      render();
    },
    unmount: () => effects.forEach((effect) => effect.cleanup?.()),
  };
}

for (const language of ["en", "ko"]) {
  const locale = language === "en" ? "en-US" : "ko-KR";
  test(`${language}: auto, second word, replay, correct feedback and option audio use the learning language`, () => {
    const h = harness({ language });
    h.mountQuiz();
    assert.ok(h.warmed.length >= 2);
    assert.ok(h.warmed.every((c) => c.locale === locale));
    h.runTimers(60);
    assert.equal(h.calls.length, 1);
    h.calls.at(-1).options.onDone();
    h.runTimers(60);
    assert.equal(h.calls.length, 2);
    h.options()[0].props.onSpeak();
    // EASY target is rendered in the target card; compare the answer word.
    const targetWord = nodes(h.tree).find(
      (n) => n.type === "Text" && n.props.style?.fontSize === 44,
    ).props.children;
    const correct = h.options().find((n) => n.props.opt.word === targetWord);
    correct.props.onPress();
    h.render();
    h.runTimers(180);
    assert.equal(h.calls.at(-1).text, targetWord);
    const replay = h.find(
      (n) => n.type === "Pressable" && n.props.onPress?.name === "replay",
    );
    replay.props.onPress();
    h.render();
    assert.ok(h.calls.every((c) => c.locale === locale));
    h.unmount();
    assert.equal(h.scheduled, 0);
  });

  test(`${language}: HARD reads one target, does not restart after an unrelated render and saves scoped score`, async () => {
    const h = harness({ language, mode: "hard" });
    h.mountQuiz();
    h.runTimers(60);
    assert.equal(h.calls.length, 1);
    assert.equal(h.calls[0].options, undefined);
    h.render();
    h.runTimers(60);
    assert.equal(h.calls.length, 1);
    const count = selector
      .getPronunciationCurriculum(language)
      .stageQuestionCount("lv1", 1);
    for (let i = 0; i < count; i++) {
      h.options()[0].props.onPress();
      h.render();
      const next = h.find(
        (n) =>
          n.type === "Pressable" &&
          nodes(n).some(
            (c) => c.type === "Text" && c.props.children === "pronQuiz.next",
          ),
      );
      next.props.onPress();
      h.render();
    }
    await h.flush();
    assert.equal(h.saved.length, 1);
    assert.equal(h.saved[0].targetLanguage, language);
    assert.equal(h.saved[0].mode, "hard");
    assert.equal(h.saved[0].level, "lv1");
    assert.ok(h.saved[0].score >= 0 && h.saved[0].score <= 100);
    assert.equal(h.scheduled, 0);
    h.unmount();
  });

  test(`${language}: progress and HARD unlock only use that language's scores`, async () => {
    const scores = { "lv1:1:easy": 100, "en:lv1:1:easy": 50 };
    const h = harness({ language, scores });
    h.mountPractice();
    await h.flush();
    const hard = h.find(
      (n) => n.type?.name === "ModeCol" && n.props.label === "HARD",
    );
    assert.equal(hard.props.enabled, language === "ko");
    const easy = h.find(
      (n) => n.type?.name === "ModeCol" && n.props.label === "EASY",
    );
    assert.equal(easy.props.score, language === "ko" ? 100 : 50);
    easy.props.onStart();
    assert.equal(h.pushed[0].params.targetLanguage, language);
    h.unmount();
  });
}

test("unsupported levels/steps safely return to the same language's practice screen", () => {
  for (const params of [
    { level: "unknown" },
    { step: "99" },
    { step: "NaN" },
  ]) {
    const h = harness(params);
    const route = h.mountQuiz();
    assert.equal(route.type, "Redirect");
    assert.equal(route.props.href.params.targetLanguage, "en");
    assert.equal(h.calls.length, 0);
  }
});

test("a quiz entered without explicit language snapshots the selected course", () => {
  const h = harness({ language: null, course: "en" });
  const route = h.renderQuizRoute();
  assert.equal(route.props.language, "en");
  h.store.learnCourse = "ko";
  assert.equal(h.render().props.language, "en");
  h.unmount();
});

test("an explicit quiz language takes precedence over the active course", () => {
  const h = harness({ language: "en", course: "ko" });
  assert.equal(h.renderQuizRoute().props.language, "en");
  h.unmount();
});

test("answering before autoplay cancels the pending prompt", () => {
  const h = harness();
  h.mountQuiz();
  h.options()[0].props.onPress();
  h.render();
  h.runTimers(60);
  assert.equal(h.calls.length, 0);
  h.unmount();
  assert.equal(h.scheduled, 0);
});
