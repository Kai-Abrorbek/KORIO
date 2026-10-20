/* global __dirname */
const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

/** Execute real component hooks/handlers; mock only native, navigation and I/O. */
function componentRuntime(mocks = {}) {
  const root = path.resolve(__dirname, "../..");
  const cache = new Map(),
    slots = [],
    scheduled = new Map();
  let cursor = 0,
    pending = [],
    dirty,
    mounted,
    props,
    tree,
    now = 0,
    nextId = 0;
  const same = (a, b) =>
    a && b && a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
  const slot = (initial) => slots[cursor++] ?? (slots[cursor - 1] = initial());
  const react = {
    useState(initial) {
      const state = slot(() => ({
        value: typeof initial === "function" ? initial() : initial,
      }));
      return [
        state.value,
        (next) => {
          const value = typeof next === "function" ? next(state.value) : next;
          if (!Object.is(value, state.value)) {
            state.value = value;
            dirty = true;
          }
        },
      ];
    },
    useRef: (value) => slot(() => ({ current: value })),
    useMemo(create, deps) {
      const memo = slot(() => ({}));
      if (!same(memo.deps, deps))
        Object.assign(memo, { value: create(), deps });
      return memo.value;
    },
    useCallback(fn, deps) {
      return react.useMemo(() => fn, deps);
    },
    useEffect(create, deps) {
      const effect = slot(() => ({ effect: true }));
      if (!same(effect.deps, deps)) {
        effect.deps = deps;
        pending.push(() => {
          effect.cleanup?.();
          effect.cleanup = create();
        });
      }
    },
  };
  const schedule = (fn, delay, interval = false) => {
    const id = ++nextId;
    scheduled.set(id, { fn, due: now + delay, delay, interval });
    return id;
  };
  const globals = {
    setTimeout: (fn, delay) => schedule(fn, delay),
    clearTimeout: (id) => scheduled.delete(id),
    setInterval: (fn, delay) => schedule(fn, delay, true),
    clearInterval: (id) => scheduled.delete(id),
  };
  const native = Object.fromEntries(
    ["View", "Text", "ScrollView", "ActivityIndicator"].map((id) => [id, id]),
  );
  const theme = {
    bg: "#fff",
    primary: "#776ee2",
    text: "#111",
    textSecondary: "#666",
    surface: "#fff",
    border: "#ddd",
  };
  const animation = {
    delay() {
      return this;
    },
    duration() {
      return this;
    },
  };
  const boundaries = {
    react,
    "react/jsx-runtime": {
      jsx: (type, p, key) => ({ type, key, props: p }),
      jsxs: (type, p, key) => ({ type, key, props: p }),
    },
    "react-native": {
      ...native,
      StyleSheet: { create: (v) => v, absoluteFill: {} },
    },
    "@/components/ui/Pressables": {
      Pressable: "Pressable",
      TouchableOpacity: "TouchableOpacity",
    },
    "@expo/vector-icons": { Ionicons: "Icon", MaterialCommunityIcons: "Icon" },
    "@/hooks/useTheme": { useTheme: () => theme },
    "react-i18next": {
      useTranslation: () => ({
        t: (key, values) => (values ? `${key}:${JSON.stringify(values)}` : key),
      }),
    },
    "react-native-safe-area-context": {
      useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
    },
    "expo-linear-gradient": { LinearGradient: "Gradient" },
    "react-native-reanimated": {
      __esModule: true,
      default: { View: "AnimatedView" },
      FadeInDown: animation,
    },
    "@/utils/haptics": {
      impactAsync() {},
      ImpactFeedbackStyle: { Light: 1, Medium: 2 },
    },
    ...mocks,
  };
  function load(file) {
    const filename = path.isAbsolute(file) ? file : path.resolve(root, file);
    if (cache.has(filename)) return cache.get(filename);
    const source = ts.transpileModule(readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText;
    const compiled = { exports: {} };
    const requireLocal = (id) => {
      if (Object.hasOwn(boundaries, id)) return boundaries[id];
      const target = id.startsWith("@/")
        ? path.resolve(root, "src", id.slice(2))
        : id.startsWith(".")
          ? path.resolve(path.dirname(filename), id)
          : null;
      if (!target) throw new Error(`Unexpected dependency ${id}`);
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(
        existsSync,
      );
      assert.ok(resolved, `Cannot resolve ${id}`);
      return load(resolved);
    };
    new Function(
      "require",
      "module",
      "exports",
      ...Object.keys(globals),
      source,
    )(requireLocal, compiled, compiled.exports, ...Object.values(globals));
    cache.set(filename, compiled.exports);
    return compiled.exports;
  }
  function render(update = {}) {
    props = { ...props, ...update };
    for (let round = 0; round < 12; round++) {
      cursor = 0;
      pending = [];
      dirty = false;
      tree = mounted(props);
      pending.forEach((fn) => fn());
      if (!dirty) return tree;
    }
    throw new Error("Component did not stabilize");
  }
  return {
    load,
    render,
    mount(component, p = {}) {
      mounted = component;
      props = p;
      return render();
    },
    get tree() {
      return tree;
    },
    get timerCount() {
      return scheduled.size;
    },
    async flush() {
      for (let i = 0; i < 8; i++) await Promise.resolve();
      return render();
    },
    advance(ms) {
      const end = now + ms;
      let turns = 0;
      while (true) {
        const entry = [...scheduled]
          .filter(([, v]) => v.due <= end)
          .sort((a, b) => a[1].due - b[1].due)[0];
        if (!entry) break;
        assert.ok(turns++ < 500, "Timer loop did not stop");
        const [id, timer] = entry;
        now = timer.due;
        if (timer.interval) timer.due += timer.delay;
        else scheduled.delete(id);
        timer.fn();
        render();
      }
      now = end;
    },
    unmount() {
      slots.filter((s) => s.effect).forEach((s) => s.cleanup?.());
    },
  };
}

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodes);
  return [node, ...nodes(node.props?.children)];
}

module.exports = { componentRuntime, nodes };
