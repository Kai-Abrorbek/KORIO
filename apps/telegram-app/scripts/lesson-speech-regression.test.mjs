import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

// Execute the production hooks with deterministic timers and hook lifecycle
// doubles. This needs no browser/TTS service and adds no application dependency.
function fixture() {
  let current;
  const same = (left, right) => left?.length === right?.length && left.every((value, index) => Object.is(value, right[index]));
  class Scope {
    slots = [];
    render(callback) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias -- track the scope whose hooks are rendering
      current = this;
      this.cursor = 0;
      this.pending = [];
      const value = callback();
      current = null;
      for (const effect of this.pending) {
        effect.cleanup?.();
        effect.cleanup = effect.create();
      }
      return value;
    }
    replayEffects() {
      for (const slot of this.slots.filter((slot) => slot.effect)) {
        slot.cleanup?.();
        slot.cleanup = slot.create();
      }
    }
    unmount() {
      for (const slot of this.slots.filter((slot) => slot.effect)) slot.cleanup?.();
    }
  }
  const slot = (create) => {
    const index = current.cursor++;
    return current.slots[index] ??= create();
  };
  const react = {
    createContext: (value) => ({ value, Provider: Symbol("Provider") }),
    useContext: (context) => context.value,
    useState: (initial) => {
      const state = slot(() => ({ value: typeof initial === "function" ? initial() : initial }));
      return [state.value, (next) => { state.value = typeof next === "function" ? next(state.value) : next; }];
    },
    useRef: (value) => slot(() => ({ current: value })),
    useMemo: (create, deps) => {
      const memo = slot(() => ({}));
      if (!same(memo.deps, deps)) Object.assign(memo, { value: create(), deps });
      return memo.value;
    },
    useCallback: (callback, deps) => react.useMemo(() => callback, deps),
    useEffect: (create, deps) => {
      const effect = slot(() => ({ effect: true }));
      if (!same(effect.deps, deps)) {
        Object.assign(effect, { create, deps });
        current.pending.push(effect);
      }
    },
  };
  const jsx = (type, props) => ({ type, props });
  const timers = new Map();
  const saved = new Map();
  const session = new Map();
  const spoken = [];
  let cancelled = 0;
  let timerId = 0;
  const window = {
    localStorage: { getItem: (key) => saved.get(key) ?? null },
    sessionStorage: { getItem: (key) => session.get(key) ?? null },
    setTimeout(callback) { const id = ++timerId; timers.set(id, callback); return id; },
    clearTimeout: (id) => timers.delete(id),
    addEventListener() {}, removeEventListener() {},
    speechSynthesis: { cancel() { cancelled += 1; }, speak: (utterance) => spoken.push(utterance) },
  };
  function load(relativePath, imports) {
    const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const exports = {};
    vm.runInNewContext(compiled, {
      exports, window,
      SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
      cancelAnimationFrame() {},
      require(name) {
        if (name === "react") return react;
        if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
        if (Object.hasOwn(imports, name)) return imports[name];
        throw new Error(`Unexpected import ${name} in ${relativePath}`);
      },
    }, { filename: fileURLToPath(new URL(relativePath, import.meta.url)) });
    return exports;
  }
  const speech = load("../src/shared/browser/use-korean-speech.ts", { "../config/env": { apiBaseUrl: () => "/api" } });
  const shared = load("../src/features/lesson/ui/questions/shared.tsx", {
    "../../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request: undefined }) },
    "../../../../shared/browser/use-korean-speech": speech,
  });
  const typed = load("../src/features/lesson/ui/questions/typed-questions.tsx", {
    "../../../../shared/browser/use-korean-speech": speech,
    "../../../../shared/i18n/language-context": { useContentLanguage: () => "uz" },
    "../../../../shared/ui/mobile-icon": {}, "../lesson-chrome": {}, "../lesson-character": {},
    "./blank-sentence": {}, "./shared": shared, "./questions.module.css": { default: {} }, "./typed-questions.module.css": { default: {} },
  });
  const provider = new Scope();
  const question = new Scope();
  let context;
  const renderProvider = () => {
    const output = provider.render(() => shared.LessonSpeechProvider({ children: null }));
    // The public context's provider is the outer JSX node.
    if (!context) {
      const original = react.useContext;
      react.useContext = (value) => {
        context = value;
        value.value = output.props.value;
        react.useContext = original;
        return value.value;
      };
    } else context.value = output.props.value;
    return output.props.value;
  };
  renderProvider();
  const render = (instanceKey = "q1", answer = "안녕하세요") => question.render(() => typed.ListenType({
    question: { id: instanceKey, answer }, instanceKey, answerState: "idle", isChecking: false, onAnswer() {},
  }));
  return {
    render, renderProvider, spoken, question, provider,
    flush() {
      const queued = [...timers.values()]; timers.clear();
      for (const callback of queued) callback();
    },
    preferences(value) { saved.set("korio-sound-settings", JSON.stringify(value)); },
    mute(value) { session.set("korio-muted", String(value)); },
    get pending() { return timers.size; },
    get cancelled() { return cancelled; },
  };
}

test("listen_type reads once across typing rerenders and speech start/end transitions", () => {
  const f = fixture();
  f.render(); f.flush();
  const initial = f.renderProvider();
  f.render(); f.flush();
  assert.equal(f.spoken.length, 1);
  f.spoken[0].onend();
  const ended = f.renderProvider();
  assert.equal(ended.speaking, false);
  assert.equal(initial.speakAuto, ended.speakAuto, "speaking state cannot replace the autoplay command");
  assert.equal(initial.speak, ended.speak, "manual replay command also stays stable");
  for (let index = 0; index < 10; index += 1) {
    const input = f.render().props.children[2].props.children;
    input.props.onChange({ target: { value: `입력 ${index}` } });
    f.render(); f.flush();
  }
  assert.equal(f.spoken.length, 1);
});

test("StrictMode cancels the first timer and still reads exactly once", () => {
  const f = fixture();
  f.render(); f.question.replayEffects();
  assert.equal(f.pending, 1);
  f.flush(); f.renderProvider(); f.render(); f.flush();
  assert.equal(f.spoken.length, 1);
});

test("a new question instance reads even when its spoken text is identical", () => {
  const f = fixture();
  f.render("q1"); f.flush();
  f.render("q2"); f.flush();
  assert.equal(f.spoken.length, 2);
});

test("an empty prompt schedules no read, and resolved text reads once", () => {
  const f = fixture();
  f.render("q1", ""); f.flush();
  assert.equal(f.spoken.length, 0);
  f.render("q1", "안녕하세요"); f.flush();
  f.render("q1", "안녕하세요"); f.flush();
  f.render("q1", "안녕히 가세요"); f.flush();
  assert.equal(f.spoken.length, 1);
});

test("manual replay works without scheduling another automatic read", () => {
  const f = fixture();
  f.render(); f.flush();
  f.renderProvider().speak("안녕하세요", { slow: true });
  assert.equal(f.spoken.length, 2);
  assert.equal(f.spoken[1].rate, 0.55);
  f.renderProvider(); f.render(); f.flush();
  assert.equal(f.spoken.length, 2);
});

test("autoplay off, muted sessions and zero speech volume remain silent", () => {
  for (const setup of [
    (f) => f.preferences({ autoPlay: false }),
    (f) => f.mute(true),
    (f) => f.preferences({ speechVolume: 0 }),
    (f) => f.preferences({ startMuted: true }),
  ]) {
    const f = fixture(); setup(f); f.render(); f.flush();
    assert.equal(f.spoken.length, 0);
  }
});

test("question unmount cancels pending autoplay and stops active/manual speech", () => {
  const pending = fixture(); pending.render(); pending.question.unmount(); pending.flush();
  assert.equal(pending.spoken.length, 0);
  const active = fixture(); active.render(); active.flush();
  const before = active.cancelled;
  active.question.unmount();
  assert.equal(active.cancelled, before + 1);
  active.provider.unmount();
});
