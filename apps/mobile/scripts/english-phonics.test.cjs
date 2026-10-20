/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(relative, mocks = {}, cache = new Map()) {
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
    if (id.startsWith(".")) {
      const target = path.resolve(path.dirname(file), id);
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(
        existsSync,
      );
      assert.ok(resolved, `Missing ${id}`);
      return load(path.relative(__dirname, resolved), mocks, cache);
    }
    throw new Error(`Unexpected dependency ${id} in ${file}`);
  };
  new Function("require", "module", "exports", source)(
    localRequire,
    compiled,
    compiled.exports,
  );
  cache.set(file, compiled.exports);
  return compiled.exports;
}

const content = load("../../../shared/english-phonics.ts");
const { PHONICS_COPY } = load("../../../shared/english-phonics-copy.ts");
const { ENGLISH_PHONICS, getEnglishPhonics, phonicsText, phonicsSegments } =
  content;
const languages = ["ko", "en", "uz", "ru"];

function checkText(value) {
  assert.deepEqual(Object.keys(value).sort(), languages.slice().sort());
  for (const locale of languages) assert.ok(value[locale].trim());
}

function checkExample(example) {
  assert.match(example.word, /^[a-z]+$/i);
  assert.match(example.ipa, /^\/[^/]+\/$/);
  checkText(example.meaning);
  assert.ok(example.focus.length > 0);
  let endBefore = 0;
  for (const [start, end] of example.focus) {
    assert.ok(Number.isInteger(start) && Number.isInteger(end));
    assert.ok(
      start >= endBefore && end > start && end <= example.word.length,
      example.word,
    );
    endBefore = end;
  }
  const segments = phonicsSegments(example);
  assert.equal(segments.map((segment) => segment.text).join(""), example.word);
  assert.ok(segments.some((segment) => segment.highlighted));
}

test("all 26 letters have localized conditions, examples and a valid two-choice check", () => {
  assert.deepEqual(
    ENGLISH_PHONICS.map((guide) => guide.letter),
    [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  );
  for (const guide of ENGLISH_PHONICS) {
    assert.equal(getEnglishPhonics(`en-${guide.letter.toLowerCase()}`), guide);
    assert.equal(
      getEnglishPhonics(guide.letter + guide.letter.toLowerCase()),
      guide,
    );
    assert.match(guide.nameIpa, /^\/[^/]+\/$/);
    assert.ok(guide.koreanName && guide.name);
    checkText(guide.tip);
    assert.ok(guide.rules.length > 0, guide.letter);
    assert.equal(
      new Set(guide.rules.map((rule) => rule.id)).size,
      guide.rules.length,
    );
    for (const rule of guide.rules) {
      assert.ok(rule.pattern && rule.sound);
      checkText(rule.title);
      checkText(rule.explanation);
      if (rule.caution) checkText(rule.caution);
      assert.ok(rule.examples.length >= 2, rule.id);
      rule.examples.forEach(checkExample);
      for (const example of rule.examples) {
        const highlighted = phonicsSegments(example)
          .filter((part) => part.highlighted)
          .map((part) => part.text)
          .join("")
          .toUpperCase();
        assert.ok(
          highlighted.includes(guide.letter),
          `${rule.id}: ${example.word} highlights ${highlighted}, not ${guide.letter}`,
        );
      }
    }
    if (guide.contrast) {
      checkText(guide.contrast.title);
      checkText(guide.contrast.explanation);
      assert.equal(guide.contrast.examples.length, 2);
      guide.contrast.examples.forEach(checkExample);
    }
    checkText(guide.check.prompt);
    checkText(guide.check.explanation);
    assert.equal(guide.check.options.length, 2);
    assert.notEqual(guide.check.options[0].word, guide.check.options[1].word);
    assert.ok([0, 1].includes(guide.check.correctIndex));
    guide.check.options.forEach(checkExample);
  }
});

test("locale fallbacks and malformed letter identifiers remain safe", () => {
  assert.equal(
    phonicsText(ENGLISH_PHONICS[0].tip, "ko-KR"),
    ENGLISH_PHONICS[0].tip.ko,
  );
  assert.equal(
    phonicsText(ENGLISH_PHONICS[0].tip, "ru_RU"),
    ENGLISH_PHONICS[0].tip.ru,
  );
  assert.equal(
    phonicsText(ENGLISH_PHONICS[0].tip, "ja"),
    ENGLISH_PHONICS[0].tip.en,
  );
  for (const invalid of ["", "en-", "AB", "en-aa", "가", "<A>"])
    assert.equal(getEnglishPhonics(invalid), undefined);
  const keys = Object.keys(PHONICS_COPY.en).sort();
  for (const locale of languages) {
    assert.deepEqual(Object.keys(PHONICS_COPY[locale]).sort(), keys);
    for (const value of Object.values(PHONICS_COPY[locale]))
      assert.ok(value.trim());
    assert.match(PHONICS_COPY[locale].patternCount, /{{count}}/);
    assert.match(PHONICS_COPY[locale].letterPosition, /{{current}}.*{{total}}/);
  }
});

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  return [node, ...nodes(node.props?.children)];
}
function textOf(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return textOf(node.props?.children);
}

// A minimal hook runner executes the actual sheet's effects and click handlers.
// Native presentation/gesture/audio boundaries are the only mocked behavior.
function sheetHarness({
  language = "ko",
  muted = false,
  volume = 1,
  letter = "A",
} = {}) {
  const states = [],
    refs = [],
    effects = [],
    sharedValues = [];
  let stateIndex, refIndex, effectIndex, sharedIndex, pending, dirty;
  let props,
    tree,
    speaking = false,
    stopCount = 0,
    closeCount = 0;
  const calls = [];
  const selectedLetters = [];
  const stop = () => {
    stopCount++;
    speaking = false;
  };
  const speak = (slow) => (text, locale, options) => {
    calls.push({ slow, text, locale, options });
    speaking = true;
  };
  const audio = { speak: speak(false), speakSlow: speak(true), stop };
  const gesture = new Proxy({}, { get: () => () => gesture });
  const element = (type, elementProps) => ({ type, props: elementProps });
  const cache = new Map();
  cache.set(
    path.resolve(__dirname, "../../../shared/english-phonics.ts"),
    content,
  );
  const Sheet = load(
    "../src/components/hangul/EnglishLetterSheet.tsx",
    {
      "react/jsx-runtime": { jsx: element, jsxs: element },
      react: {
        useState: (initial) => {
          const index = stateIndex++;
          if (!(index in states))
            states[index] = typeof initial === "function" ? initial() : initial;
          return [
            states[index],
            (next) => {
              const value =
                typeof next === "function" ? next(states[index]) : next;
              if (!Object.is(value, states[index])) {
                states[index] = value;
                dirty = true;
              }
            },
          ];
        },
        useRef: (initial) =>
          refs[refIndex++] ?? (refs[refIndex - 1] = { current: initial }),
        useEffect: (effect, deps) => {
          const index = effectIndex++;
          const previous = effects[index];
          if (
            !previous ||
            deps.some((value, i) => !Object.is(value, previous.deps[i]))
          ) {
            pending.push(() => {
              previous?.cleanup?.();
              effects[index] = { deps, cleanup: effect() };
            });
          }
        },
      },
      "react-native": {
        Modal: "Modal",
        ScrollView: "ScrollView",
        Text: "Text",
        View: "View",
        StyleSheet: { create: (styles) => styles, absoluteFill: {} },
      },
      "@expo/vector-icons": { Ionicons: "Ionicons" },
      "react-i18next": { useTranslation: () => ({ i18n: { language } }) },
      "react-native-safe-area-context": {
        useSafeAreaInsets: () => ({ bottom: 0 }),
      },
      "react-native-gesture-handler": {
        Gesture: { Pan: () => gesture },
        GestureDetector: "GestureDetector",
        GestureHandlerRootView: "GestureHandlerRootView",
      },
      "react-native-reanimated": {
        __esModule: true,
        default: { View: "AnimatedView" },
        runOnJS: (fn) => fn,
        useAnimatedStyle: (fn) => fn(),
        withSpring: (value) => value,
        useSharedValue: (value) =>
          sharedValues[sharedIndex++] ??
          (sharedValues[sharedIndex - 1] = { value }),
      },
      "@/components/ui/Pressables": {
        Pressable: "Pressable",
        TouchableOpacity: "TouchableOpacity",
      },
      "@/hooks/useSpeech": {
        useSpeech: () => ({ ...audio, isSpeaking: speaking }),
      },
      "@/hooks/useTheme": {
        useTheme: () => ({
          primary: "#776EE2",
          text: "#111111",
          textSecondary: "#777777",
          bg: "#FFFFFF",
          surface: "#FAFAFA",
          border: "#DDDDDD",
        }),
      },
      "@/store/settings.store": {
        useSettingsStore: (select) =>
          select({ muted, sound: { speechVolume: volume } }),
      },
    },
    cache,
  ).default;
  props = {
    letter,
    visible: true,
    onClose: () => closeCount++,
    onSelectLetter: (next) => selectedLetters.push(next),
  };
  function render(update = {}) {
    props = { ...props, ...update };
    for (let round = 0; round < 6; round++) {
      dirty = false;
      pending = [];
      stateIndex = refIndex = effectIndex = sharedIndex = 0;
      tree = Sheet(props);
      pending.forEach((effect) => effect());
      if (!dirty) return tree;
    }
    throw new Error("Sheet did not stabilize");
  }
  function find(predicate) {
    return nodes(tree).find(predicate);
  }
  function press(predicate) {
    const target = find(predicate);
    assert.ok(target, "Expected an actionable control");
    assert.ok(!target.props.disabled, "Control must be enabled");
    target.props.onPress();
    render();
  }
  render();
  return {
    render,
    find,
    press,
    calls,
    selectedLetters,
    get tree() {
      return tree;
    },
    get closeCount() {
      return closeCount;
    },
    get stopCount() {
      return stopCount;
    },
    unmount: () => effects.forEach((effect) => effect.cleanup?.()),
  };
}

const labelIs = (label) => (node) => node.props?.accessibilityLabel === label;
const textIs = (text) => (node) =>
  node.type === "TouchableOpacity" && textOf(node) === text;

test("rules show the condition and highlighted real words, not just IPA", () => {
  const sheet = sheetHarness();
  const guide = getEnglishPhonics("A");
  const visible = textOf(sheet.tree);
  assert.ok(visible.includes(PHONICS_COPY.ko.nameVsSound));
  assert.ok(visible.includes(guide.rules[0].explanation.ko));
  for (const example of guide.rules[0].examples) {
    assert.ok(visible.includes(example.word));
    assert.ok(visible.includes(example.meaning.ko));
  }
  assert.equal(sheet.calls.length, 0, "Opening never autoplays");
  assert.ok(
    !visible.includes(guide.rules.at(-1).explanation.ko),
    "Other rules are progressively disclosed",
  );
});

test("name, word and slower-word controls use en-US text, not IPA", () => {
  const sheet = sheetHarness();
  const guide = getEnglishPhonics("A");
  sheet.press(
    labelIs(`${PHONICS_COPY.ko.listen}: ${PHONICS_COPY.ko.nameLabel} A`),
  );
  assert.equal(sheet.calls.at(-1).text, guide.name);
  const word =
    guide.contrast?.examples[0].word ?? guide.rules[0].examples[0].word;
  sheet.press(labelIs(`${PHONICS_COPY.ko.listen}: ${word}`));
  assert.equal(sheet.calls.at(-1).text, word);
  sheet.press(labelIs(`${PHONICS_COPY.ko.slow}: ${word}`));
  assert.equal(sheet.calls.at(-1).slow, true);
  for (const call of sheet.calls) {
    assert.equal(call.locale, "en-US");
    assert.ok(!call.text.includes("/"));
  }
});

test("quick check permits listening before answering and explains both wrong and right choices", () => {
  const sheet = sheetHarness();
  const guide = getEnglishPhonics("A");
  sheet.press(textIs(PHONICS_COPY.ko.practiceTab));
  const word = guide.check.options[0].word;
  sheet.press(labelIs(`${PHONICS_COPY.ko.listen}: ${word}`));
  assert.equal(sheet.calls.at(-1).text, word);
  const wrong = guide.check.options[1 - guide.check.correctIndex];
  sheet.press(labelIs(`${wrong.word}, ${wrong.meaning.ko}`));
  assert.ok(textOf(sheet.tree).includes(PHONICS_COPY.ko.tryAgain));
  assert.ok(textOf(sheet.tree).includes(guide.check.explanation.ko));
  sheet.press(textIs(PHONICS_COPY.ko.resetPractice));
  const right = guide.check.options[guide.check.correctIndex];
  sheet.press(labelIs(`${right.word}, ${right.meaning.ko}`));
  assert.ok(textOf(sheet.tree).includes(PHONICS_COPY.ko.correct));
});

test("closing, changing letters and unmounting cancel speech and reset practice", () => {
  const sheet = sheetHarness();
  const initialStops = sheet.stopCount;
  sheet.render({ letter: "B" });
  assert.ok(sheet.stopCount > initialStops);
  assert.ok(
    textOf(sheet.tree).includes(getEnglishPhonics("B").rules[0].explanation.ko),
  );
  sheet.press(labelIs(PHONICS_COPY.ko.close));
  assert.equal(sheet.closeCount, 1);
  const stops = sheet.stopCount;
  sheet.unmount();
  assert.ok(sheet.stopCount > stops);
});

test("muted or zero-volume users do not start audio and see a helpful hint", () => {
  for (const settings of [{ muted: true }, { volume: 0 }]) {
    const sheet = sheetHarness(settings);
    sheet.press(
      labelIs(`${PHONICS_COPY.ko.listen}: ${PHONICS_COPY.ko.nameLabel} A`),
    );
    assert.equal(sheet.calls.length, 0);
    assert.ok(textOf(sheet.tree).includes(PHONICS_COPY.ko.mutedHint));
  }
});

test("audio errors can retry and a stale error cannot leak into the next letter", () => {
  const sheet = sheetHarness();
  const nameLabel = `${PHONICS_COPY.ko.listen}: ${PHONICS_COPY.ko.nameLabel} A`;
  sheet.press(labelIs(nameLabel));
  const old = sheet.calls.at(-1);
  old.options.onError();
  sheet.render();
  assert.ok(textOf(sheet.tree).includes(PHONICS_COPY.ko.audioError));
  sheet.press(labelIs(nameLabel));
  assert.equal(sheet.calls.length, 2);
  sheet.render({ letter: "C" });
  old.options.onError();
  sheet.render();
  assert.ok(!textOf(sheet.tree).includes(PHONICS_COPY.ko.audioError));
});

test("all locales and navigation endpoints render without routing into Korean games", () => {
  for (const language of ["ko-KR", "en", "uz", "ru_RU", "ja"]) {
    const sheet = sheetHarness({ language, letter: "Z" });
    const last = nodes(sheet.tree).filter(
      (node) => node.props?.accessibilityState?.disabled,
    );
    assert.equal(last.length, 1);
    assert.ok(textOf(sheet.tree).includes(getEnglishPhonics("Z").letter));
    const gesture = nodes(sheet.tree).find(
      (node) => node.type === "GestureDetector",
    );
    assert.ok(!nodes(gesture).some((node) => node.type === "ScrollView"));
  }
});
