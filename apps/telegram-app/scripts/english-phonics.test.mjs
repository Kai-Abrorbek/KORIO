import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { setImmediate } from "node:timers";
import { test as nodeTest } from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const appRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const runtimeRequire = createRequire(import.meta.url);
const componentPath = "src/features/alphabet/ui/english-alphabet-screen.tsx";
// Optional bounded visual preview: no authentication bypass, app server or live TTS.
// eslint-disable-next-line turbo/no-undeclared-env-vars -- Local-only visual QA, never a cached build input.
const previewOutput = process.env.KORIO_PHONICS_PREVIEW_DIR;
const test = previewOutput ? () => {} : nodeTest;

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
    if (id.endsWith(".css"))
      return {
        __esModule: true,
        default: new Proxy({}, { get: (_, key) => String(key) }),
      };
    if (id.startsWith(".")) {
      const target = path.resolve(path.dirname(filename), id);
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(
        existsSync,
      );
      assert.ok(resolved, `Cannot resolve ${id}`);
      return load(resolved, mocks, globals);
    }
    return runtimeRequire(id);
  };
  new Function(
    "require",
    "module",
    "exports",
    ...Object.keys(globals),
    compiled,
  )(
    localRequire,
    compiledModule,
    compiledModule.exports,
    ...Object.values(globals),
  );
  return compiledModule.exports;
}

function hookScope() {
  const slots = [];
  let cursor = 0;
  let pending = [];
  const same = (left, right) =>
    left?.length === right?.length &&
    left.every((value, index) => Object.is(value, right[index]));
  const slot = (create) => (slots[cursor++] ??= create());
  const react = {
    useState(initial) {
      const state = slot(() => ({
        value: typeof initial === "function" ? initial() : initial,
      }));
      return [
        state.value,
        (next) => {
          state.value = typeof next === "function" ? next(state.value) : next;
        },
      ];
    },
    useRef(value) {
      return slot(() => ({ current: value }));
    },
    useMemo(create, deps) {
      const memo = slot(() => ({}));
      if (!same(memo.deps, deps))
        Object.assign(memo, { value: create(), deps });
      return memo.value;
    },
    useCallback(callback, deps) {
      return react.useMemo(() => callback, deps);
    },
    useEffect(create, deps) {
      const effect = slot(() => ({ effect: true }));
      if (!same(effect.deps, deps)) {
        Object.assign(effect, { create, deps });
        pending.push(effect);
      }
    },
  };
  return {
    react,
    render(callback) {
      cursor = 0;
      pending = [];
      const result = callback();
      for (const effect of pending) {
        effect.cleanup?.();
        effect.cleanup = effect.create();
      }
      return result;
    },
    unmount() {
      for (const effect of slots.filter((value) => value.effect))
        effect.cleanup?.();
    },
  };
}

const data = load("../../shared/english-phonics.ts");
const { PHONICS_COPY } = load("../../shared/english-phonics-copy.ts");
const guide = data.ENGLISH_PHONICS[0];
function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...nodes(node.props?.children)];
}
const find = (tree, predicate) => nodes(tree).find(predicate);

function modalFixture({
  language = "ko",
  preferences = {},
  sessionMuted = null,
  letter = guide,
  previewIcons = false,
} = {}) {
  const scope = hookScope();
  const calls = [];
  let stops = 0;
  let closes = 0;
  const navigations = [];
  const events = new Map();
  const sound = {
    speechRate: 1.1,
    speechVolume: 0.65,
    startMuted: false,
    ...preferences,
  };
  const document = {
    body: { style: { overflow: "auto" } },
    activeElement: null,
    getElementById: () => null,
  };
  const window = {
    sessionStorage: { getItem: () => sessionMuted },
    addEventListener: (key, listener) => events.set(key, listener),
    removeEventListener: (key) => events.delete(key),
  };
  const stop = () => {
    stops += 1;
  };
  const production = load(
    componentPath,
    {
      react: scope.react,
      "next/navigation": { useRouter: () => ({ back() {} }) },
      "../../auth/model/telegram-auth-context": {
        useTelegramAuth: () => ({
          request() {
            throw new Error("Unexpected progress request");
          },
        }),
      },
      "../../settings/model/preferences": {
        useSoundPreferences: () => ({ value: sound }),
      },
      "../../../shared/browser/sfx": {
        SOUND_PREFERENCES_EVENT: "sound-preferences",
      },
      "../../../shared/browser/use-korean-speech": {
        useKoreanSpeech: () => ({
          speak: (text, options) => calls.push({ text, options }),
          stop,
        }),
      },
      "../../../shared/i18n/language-context": {
        useAppLanguage: () => ({ language }),
      },
      "../../../shared/ui/mobile-icon": previewIcons
        ? load("src/shared/ui/mobile-icon.tsx")
        : { MobileIcon: () => null },
    },
    { window, document, HTMLElement: class {} },
  );
  const render = () =>
    scope.render(() =>
      production.EnglishLetterModal({
        guide: letter,
        locale: language,
        index: data.ENGLISH_PHONICS.indexOf(letter),
        onClose: () => {
          closes += 1;
        },
        onNavigate: (next) => navigations.push(next),
      }),
    );
  return {
    scope,
    production,
    render,
    calls,
    navigations,
    events,
    document,
    get stops() {
      return stops;
    },
    get closes() {
      return closes;
    },
  };
}

test("Telegram has a dedicated English route, without Korean progression or energy gates", () => {
  const options = load("src/features/learning/model/learning-options.ts");
  assert.equal(options.learningDestination("alphabet"), "/alphabet");
  assert.equal(
    options.continueLearningDestination({
      learnCourse: "en",
      learnMode: "alphabet",
    }),
    "/alphabet",
  );
  assert.match(
    readFileSync(
      path.join(appRoot, "app/(protected)/alphabet/page.tsx"),
      "utf8",
    ),
    /EnglishAlphabetScreen/,
  );
  assert.doesNotMatch(
    readFileSync(path.join(appRoot, componentPath), "utf8"),
    /completeHangul|useEnergy|\/learn-progress|\/hangul/,
  );
});

test("all 26 letters and each supported UI language render from the shared curriculum", () => {
  for (const language of ["ko", "en", "uz", "ru"]) {
    const f = modalFixture({ language });
    const html = renderToStaticMarkup(
      f.scope.render(() => f.production.EnglishAlphabetScreen()),
    );
    assert.match(html, /data-no-translate="true"/);
    assert.ok(html.includes(PHONICS_COPY[language].title));
    assert.equal(
      (html.match(/class="(?:vowelCard|letterCard)"/g) || []).length,
      26,
    );
    assert.equal(
      f.calls.length,
      0,
      "opening the page never automatically reads letters",
    );
    f.scope.unmount();
  }
});

test("letter modal teaches name vs sound, opens the first rule, and highlights exact spelling", () => {
  const f = modalFixture();
  const html = renderToStaticMarkup(f.render());
  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-modal="true"/);
  assert.match(html, /English · US/);
  assert.ok(html.includes(PHONICS_COPY.ko.nameVsSound));
  assert.match(html, /aria-expanded="true"/);
  assert.ok(html.includes(data.phonicsText(guide.rules[0].explanation, "ko")));
  const highlight = renderToStaticMarkup(
    f.production.FocusWord({
      example: {
        word: "cake",
        focus: [
          [1, 2],
          [3, 4],
        ],
      },
    }),
  );
  assert.match(highlight, /c<mark>a<\/mark>k<mark>e<\/mark>/);
  assert.equal(f.calls.length, 0);
  f.scope.unmount();
});

test("examples read English words, never IPA, with saved rate and relative slow playback", () => {
  const f = modalFixture();
  let tree = f.render();
  const example = guide.rules[0].examples[0];
  find(
    tree,
    (node) =>
      node.props?.["aria-label"] ===
      `${PHONICS_COPY.ko.listen}: ${example.word}`,
  ).props.onClick();
  assert.equal(f.calls[0].text, example.word);
  assert.equal(f.calls[0].options.language, "en-US");
  assert.equal(f.calls[0].options.rate, 1.1);
  assert.equal(f.calls[0].options.respectSoundSettings, true);
  tree = f.render();
  find(
    tree,
    (node) =>
      node.props?.["aria-label"] === `${PHONICS_COPY.ko.slow}: ${example.word}`,
  ).props.onClick();
  assert.ok(Math.abs(f.calls[1].options.rate - 1.1 * 0.55) < 0.001);
  f.calls[1].options.onEnd();
  assert.doesNotMatch(
    renderToStaticMarkup(f.render()),
    /aria-pressed="true" class="(?:audioActive|slowActive)"/,
  );
  f.scope.unmount();
});

test("muted and zero-volume preferences explain silence without overriding user settings", () => {
  for (const config of [
    { preferences: { startMuted: true } },
    { preferences: { speechVolume: 0 } },
    { sessionMuted: "true" },
  ]) {
    const f = modalFixture(config);
    const tree = f.render();
    find(
      tree,
      (node) =>
        node.props?.["aria-label"] ===
        `${PHONICS_COPY.ko.listen}: ${guide.name}`,
    ).props.onClick();
    assert.equal(f.calls.length, 0);
    assert.ok(
      renderToStaticMarkup(f.render()).includes(PHONICS_COPY.ko.mutedHint),
    );
    f.scope.unmount();
  }
});

test("failed audio is recoverable and stale callbacks cannot overwrite the next example", () => {
  const f = modalFixture();
  const button = () =>
    find(
      f.render(),
      (node) =>
        node.props?.["aria-label"] ===
        `${PHONICS_COPY.ko.listen}: ${guide.name}`,
    );
  button().props.onClick();
  f.calls[0].options.onError();
  assert.ok(
    renderToStaticMarkup(f.render()).includes(PHONICS_COPY.ko.audioError),
  );
  button().props.onClick();
  assert.equal(f.calls.length, 2);
  f.calls[0].options.onError();
  assert.ok(
    !renderToStaticMarkup(f.render()).includes(PHONICS_COPY.ko.audioError),
  );
  f.scope.unmount();
});

test("practice gives immediate explanation, allows retry and never mutates progress", () => {
  const f = modalFixture();
  find(
    f.render(),
    (node) => node.props?.id === "phonics-tab-practice",
  ).props.onClick();
  let tree = f.render();
  const choices = nodes(tree).filter(
    (node) => node.props?.className === "choiceButton",
  );
  choices[1 - guide.check.correctIndex].props.onClick();
  let html = renderToStaticMarkup(f.render());
  assert.ok(html.includes(PHONICS_COPY.ko.tryAgain));
  assert.ok(html.includes(data.phonicsText(guide.check.explanation, "ko")));
  tree = f.render();
  find(
    tree,
    (node) =>
      node.type === "button" &&
      node.props.children === PHONICS_COPY.ko.resetPractice,
  ).props.onClick();
  assert.ok(
    !renderToStaticMarkup(f.render()).includes(PHONICS_COPY.ko.tryAgain),
  );
  nodes(f.render())
    .filter((node) => node.props?.className === "choiceButton")
    [guide.check.correctIndex].props.onClick();
  html = renderToStaticMarkup(f.render());
  assert.ok(html.includes(PHONICS_COPY.ko.correct));
  assert.equal(
    f.calls.length,
    0,
    "practice does not auto-play or write learning progress",
  );
  f.scope.unmount();
});

test("Escape, next letter, preference change and unmount cancel pending or active speech", () => {
  const f = modalFixture();
  let tree = f.render();
  const before = f.stops;
  find(tree, (node) => node.props?.role === "dialog").props.onKeyDown({
    key: "Escape",
    stopPropagation() {},
  });
  assert.equal(f.closes, 1);
  assert.ok(f.stops > before);
  tree = f.render();
  find(
    tree,
    (node) => node.props?.["aria-label"] === `${PHONICS_COPY.ko.nextLetter}: B`,
  ).props.onClick();
  assert.deepEqual(f.navigations, [1]);
  const after = f.stops;
  f.events.get("sound-preferences")();
  assert.ok(f.stops > after);
  f.scope.unmount();
  assert.equal(f.document.body.style.overflow, "auto");
  assert.ok(f.stops > after + 1);
});

test("speech hook reports an actual error once but not a canceled, stale utterance", () => {
  const scope = hookScope();
  const utterances = [];
  const window = {
    localStorage: { getItem: () => null },
    sessionStorage: { getItem: () => null },
    addEventListener() {},
    removeEventListener() {},
    speechSynthesis: {
      cancel() {},
      speak: (utterance) => utterances.push(utterance),
    },
  };
  const { useKoreanSpeech } = load(
    "src/shared/browser/use-korean-speech.ts",
    {
      react: scope.react,
      "../config/env": { apiBaseUrl: () => "/api" },
    },
    {
      window,
      SpeechSynthesisUtterance: class {
        constructor(text) {
          this.text = text;
        }
      },
      cancelAnimationFrame() {},
    },
  );
  let errors = 0;
  let endings = 0;
  const speech = scope.render(() => useKoreanSpeech());
  speech.speak("cat", {
    language: "en-US",
    onError: () => {
      errors += 1;
    },
    onEnd: () => {
      endings += 1;
    },
  });
  utterances[0].onerror();
  utterances[0].onend();
  assert.equal(errors, 1);
  assert.equal(endings, 1);
  speech.speak("cake", {
    language: "en-US",
    onError: () => {
      errors += 1;
    },
  });
  speech.stop();
  utterances[1].onerror();
  assert.equal(errors, 1);
  scope.unmount();
});

test("closing while server TTS prepares never starts delayed playback", async () => {
  const scope = hookScope();
  let release;
  const pending = new Promise((resolve) => {
    release = resolve;
  });
  const bodies = [];
  let starts = 0;
  let browserFallbacks = 0;
  let errors = 0;
  class AudioContext {
    state = "running";
    resume() {
      return Promise.resolve();
    }
    decodeAudioData() {
      return Promise.resolve({ duration: 1 });
    }
    createBufferSource() {
      return {
        connect() {},
        start() {
          starts += 1;
        },
        stop() {},
        disconnect() {},
      };
    }
    createGain() {
      return { gain: {}, connect() {}, disconnect() {} };
    }
    close() {
      return Promise.resolve();
    }
  }
  const window = {
    AudioContext,
    localStorage: {
      getItem: () => JSON.stringify({ speechRate: 0.9, speechVolume: 0.5 }),
    },
    sessionStorage: { getItem: () => null },
    addEventListener() {},
    removeEventListener() {},
    speechSynthesis: {
      cancel() {},
      speak() {
        browserFallbacks += 1;
      },
    },
  };
  const { useKoreanSpeech } = load(
    "src/shared/browser/use-korean-speech.ts",
    {
      react: scope.react,
      "../config/env": { apiBaseUrl: () => "/api" },
    },
    {
      window,
      fetch: async () => ({
        ok: true,
        arrayBuffer: async () => new ArrayBuffer(0),
      }),
      cancelAnimationFrame() {},
    },
  );
  const request = async (_path, init) => {
    bodies.push(JSON.parse(init.body));
    return pending;
  };
  const speech = scope.render(() => useKoreanSpeech(request));
  speech.speak("cake", {
    language: "en-US",
    onError: () => {
      errors += 1;
    },
  });
  speech.stop();
  release({ audioId: "test-audio" });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(bodies[0].language, "en-US");
  assert.equal(bodies[0].text, "cake");
  assert.equal(bodies[0].rate, 0.9);
  assert.equal(
    bodies[0].voice,
    undefined,
    "Korean saved voices never override English speech",
  );
  assert.equal(starts, 0);
  assert.equal(browserFallbacks, 0);
  assert.equal(errors, 0, "intentional close is not a playback failure");
  scope.unmount();
});

test("a successful browser fallback does not report the server error", async () => {
  const scope = hookScope();
  const utterances = [];
  let errors = 0;
  let endings = 0;
  const window = {
    localStorage: { getItem: () => null },
    sessionStorage: { getItem: () => null },
    addEventListener() {},
    removeEventListener() {},
    speechSynthesis: {
      cancel() {},
      speak: (utterance) => utterances.push(utterance),
    },
  };
  const { useKoreanSpeech } = load(
    "src/shared/browser/use-korean-speech.ts",
    {
      react: scope.react,
      "../config/env": { apiBaseUrl: () => "/api" },
    },
    {
      window,
      SpeechSynthesisUtterance: class {
        constructor(text) {
          this.text = text;
        }
      },
      cancelAnimationFrame() {},
    },
  );
  const speech = scope.render(() =>
    useKoreanSpeech(async () => {
      throw new Error("TTS temporarily unavailable");
    }),
  );
  speech.speak("cat", {
    language: "en-US",
    onError: () => {
      errors += 1;
    },
    onEnd: () => {
      endings += 1;
    },
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(utterances.length, 1);
  assert.equal(utterances[0].lang, "en-US");
  utterances[0].onend();
  assert.equal(errors, 0);
  assert.equal(endings, 1);
  scope.unmount();
});

if (previewOutput) {
  const outputRoot = path.resolve(previewOutput);
  const temporaryRoot = path.resolve(tmpdir());
  assert.ok(
    outputRoot.startsWith(`${temporaryRoot}${path.sep}`),
    "Preview output must be inside the OS temporary directory",
  );
  mkdirSync(outputRoot, { recursive: true });
  const productionCss = readFileSync(
    path.join(appRoot, "src/features/alphabet/ui/english-alphabet.module.css"),
    "utf8",
  ).replace(/:global\(([^)]+)\)/g, "$1");
  const globalCss = readFileSync(path.join(appRoot, "app/globals.css"), "utf8");
  const files = new Map();
  const store = (name, content, contentType = "text/html; charset=utf-8") => {
    writeFileSync(path.join(outputRoot, name), content);
    files.set(`/${name}`, { content, contentType });
  };
  store(
    "preview.css",
    `${globalCss}\n${productionCss}`,
    "text/css; charset=utf-8",
  );
  const variants = [
    { id: "ko-a", language: "ko", letter: "A", width: 390, height: 844 },
    { id: "ko-c", language: "ko", letter: "C", width: 390, height: 844 },
    { id: "ko-g", language: "ko", letter: "G", width: 390, height: 844 },
    { id: "ko-u", language: "ko", letter: "U", width: 390, height: 844 },
    {
      id: "ko-a-practice",
      language: "ko",
      letter: "A",
      width: 320,
      height: 700,
      practice: true,
    },
    {
      id: "ru-u-dark",
      language: "ru",
      letter: "U",
      width: 320,
      height: 700,
      dark: true,
    },
    { id: "ko-grid", language: "ko", width: 390, height: 844 },
  ];
  const available = [];
  for (const variant of variants) {
    const letter = variant.letter
      ? data.getEnglishPhonics(variant.letter)
      : null;
    if (variant.letter && !letter) continue;
    const f = modalFixture({
      language: variant.language,
      letter,
      previewIcons: true,
    });
    const pageFixture = modalFixture({
      language: variant.language,
      previewIcons: true,
    });
    const page = renderToStaticMarkup(
      pageFixture.scope.render(() =>
        pageFixture.production.EnglishAlphabetScreen(),
      ),
    );
    let body = page;
    if (letter) {
      if (variant.practice) {
        find(
          f.render(),
          (node) => node.props?.id === "phonics-tab-practice",
        ).props.onClick();
        const choices = nodes(f.render()).filter(
          (node) => node.props?.className === "choiceButton",
        );
        choices[1 - letter.check.correctIndex].props.onClick();
      }
      const modal = renderToStaticMarkup(f.render());
      body = page.replace("</main>", `${modal}</main>`);
    }
    store(
      `${variant.id}.html`,
      `<!doctype html><html lang="${variant.language}" data-theme="${variant.dark ? "dark" : "light"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Korio phonics ${variant.id}</title><link rel="stylesheet" href="/preview.css"></head><body>${body}</body></html>`,
    );
    f.scope.unmount();
    pageFixture.scope.unmount();
    available.push(variant);
  }
  store(
    "index.html",
    `<!doctype html><html><head><meta charset="utf-8"><title>Korio English phonics visual QA</title><style>body{font:14px system-ui;background:#e9e8ef;padding:24px;margin:0}main{display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap}article{display:flex;flex-direction:column;gap:10px}iframe{border:1px solid #b9b4cd;border-radius:18px;background:#fff}h1{font-size:22px}p{max-width:850px;line-height:1.6}</style></head><body><h1>English phonics · static component preview</h1><p>Production component markup and CSS. Authentication and speech are not exercised; controls are non-interactive SSR snapshots. Scroll within each phone to inspect overflow. Practice snapshot shows a wrong answer and its explanation.</p><main>${available.map((variant) => `<article><b>${variant.id} · ${variant.width} × ${variant.height}</b><a href="/${variant.id}.html">Open viewport</a><iframe title="${variant.id}" src="/${variant.id}.html" width="${variant.width}" height="${variant.height}"></iframe></article>`).join("")}</main></body></html>`,
  );
  for (const name of ["Ionicons.ttf", "MaterialCommunityIcons.ttf"]) {
    files.set(`/fonts/${name}`, {
      content: readFileSync(path.join(appRoot, "public/fonts", name)),
      contentType: "font/ttf",
    });
  }
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
    const file = files.get(pathname === "/" ? "/index.html" : pathname);
    if (!file || request.method !== "GET") {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, {
      "Content-Type": file.contentType,
      "Cache-Control": "no-store",
    });
    response.end(file.content);
  });
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    console.log(
      `Phonics static preview: http://127.0.0.1:${address.port} · output: ${outputRoot}`,
    );
  });
}
