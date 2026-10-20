/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(relative, imports = {}) {
  const file = path.resolve(__dirname, relative);
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const compiled = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (id) => {
      if (Object.hasOwn(imports, id)) return imports[id];
      throw new Error(`Unexpected dependency ${id} in ${file}`);
    },
    compiled,
    compiled.exports,
  );
  return compiled.exports;
}

const locales = Object.fromEntries(
  ["ko", "en", "uz", "ru"].map((language) => [
    language,
    load(`../src/locales/${language}.ts`, {
      [`./topik/${language}`]: { default: {} },
      "./alphabet": { default: {} },
    }).default,
  ]),
);
const courses = load("../src/constants/learnCourses.ts");

function translate(key, values = {}) {
  const message = key
    .split(".")
    .reduce((value, part) => value?.[part], locales.ko);
  if (typeof message !== "string") return message ?? key;
  return message.replace(/{{(\w+)}}/g, (_, name) => String(values[name]));
}

// Evaluate the real component with native-only boundaries replaced by a tree.
// State and effects remain observable, so month changes and cancelled loads are tested.
function renderCalendar({
  activity,
  responseMonth,
  currentDate = new Date(),
  visible = true,
  request,
} = {}) {
  let slot = 0;
  const states = [
    currentDate,
    [],
    [],
    [],
    11,
    17,
    activity,
    responseMonth ??
      `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`,
  ];
  const writes = [];
  const effects = [];
  const node = (type, props) => ({ type, props });
  const gesture = new Proxy({}, { get: () => () => gesture });
  const Calendar = load("../src/components/home/CalendarModal.tsx", {
    "react/jsx-runtime": { jsx: node, jsxs: node },
    react: {
      useState: () => {
        const index = slot++;
        return [states[index], (value) => writes.push({ index, value })];
      },
      useEffect: (effect) => effects.push(effect),
    },
    "react-native": {
      View: "View",
      Text: "Text",
      Modal: "Modal",
      ScrollView: "ScrollView",
      StyleSheet: { create: (styles) => styles },
      Dimensions: { get: () => ({ height: 800 }) },
    },
    "@/components/ui/Pressables": { TouchableOpacity: "TouchableOpacity" },
    "@expo/vector-icons": { Ionicons: "Ionicons" },
    "@/components/home/HaneulmonMascot": { default: "Mascot" },
    "@/hooks/useTheme": { useTheme: () => ({ primary: "#123456" }) },
    "react-i18next": { useTranslation: () => ({ t: translate }) },
    "@/services/stats.service": {
      StatsService: { getCalendar: request ?? (() => Promise.resolve({})) },
    },
    "@/constants/learnCourses": courses,
    "react-native-safe-area-context": {
      useSafeAreaInsets: () => ({ bottom: 0 }),
    },
    "react-native-gesture-handler": {
      Gesture: { Pan: () => gesture },
      GestureDetector: "GestureDetector",
      GestureHandlerRootView: "GestureHandlerRootView",
    },
    "react-native-reanimated": {
      default: { View: "AnimatedView" },
      runOnJS: (fn) => fn,
      useAnimatedStyle: (factory) => factory(),
      useSharedValue: (value) => ({ value }),
      withSpring: (value) => value,
      withTiming: (value) => value,
    },
  }).default;
  return {
    tree: Calendar({ visible, streak: 7, onClose() {} }),
    effects,
    writes,
  };
}

function textOf(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  return textOf(node.props?.children);
}

function nodesOf(node) {
  if (node == null || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap(nodesOf);
  return [node, ...nodesOf(node.props?.children)];
}

test("the taller calendar scrolls without the dismiss gesture capturing its body", () => {
  const nodes = nodesOf(renderCalendar().tree);
  assert.equal(nodes.filter((node) => node.type === "ScrollView").length, 1);
  const handles = nodes.filter((node) => node.type === "GestureDetector");
  assert.equal(handles.length, 1);
  assert.ok(!nodesOf(handles[0]).some((node) => node.type === "ScrollView"));
});

test("a live calendar response records the requested month and language activity", async () => {
  const activity = {
    languages: [{ targetLanguage: "en", days: 2 }],
    unclassifiedDays: 4,
  };
  let requested;
  const rendered = renderCalendar({
    currentDate: new Date(2026, 9, 20),
    request: (year, month) => {
      requested = { year, month };
      return Promise.resolve({
        year,
        month,
        streak: 11,
        longestStreak: 17,
        completedDays: [1, 2],
        languageActivity: activity,
      });
    },
  });
  rendered.effects[0]();
  await Promise.resolve();
  assert.deepEqual(requested, { year: 2026, month: 10 });
  assert.ok(
    rendered.writes.some(
      ({ index, value }) => index === 6 && value === activity,
    ),
  );
  assert.ok(
    rendered.writes.some(
      ({ index, value }) => index === 7 && value === "2026-10",
    ),
  );
});

test("all four languages have overall-streak copy and preserve share placeholders", () => {
  const keys = Object.keys(locales.ko.learningStreak).sort();
  for (const locale of Object.values(locales)) {
    assert.deepEqual(Object.keys(locale.learningStreak).sort(), keys);
    for (const value of Object.values(locale.learningStreak))
      assert.ok(value.trim());
    for (const key of ["days", "activityDays", "activityUnknown"]) {
      assert.match(locale.learningStreak[key], /{{count}}/);
    }
    for (const key of ["shareProgressMessage", "shareProgressPlain"]) {
      const message = locale.retention.quests[key];
      assert.doesNotMatch(message, /한국어|Korean|koreys|корейск|🇰🇷/i);
      assert.match(message, /{{code}}/);
      assert.match(message, /{{link}}/);
    }
    assert.match(locale.retention.quests.shareProgressMessage, /{{streak}}/);
  }
});

test("old API keeps the overall calendar without inventing language activity", () => {
  const text = textOf(renderCalendar().tree);
  assert.ok(text.includes(translate("learningStreak.title")));
  assert.ok(text.includes(translate("learningStreak.sharedAcrossApps")));
  assert.ok(!text.includes(translate("learningStreak.activityTitle")));
});

test("recorded empty activity explains future-only tracking without inventing Korean days", () => {
  const text = textOf(
    renderCalendar({ activity: { languages: [], unclassifiedDays: 3 } }).tree,
  );
  assert.ok(text.includes(translate("learningStreak.activityEmpty")));
  assert.ok(text.includes(translate("learningStreak.activityTrackingNotice")));
  assert.ok(
    text.includes(translate("learningStreak.activityUnknown", { count: 3 })),
  );
  assert.ok(!text.includes("🇰🇷"));
});

test("mixed-language days and future unknown language codes render independently", () => {
  const text = textOf(
    renderCalendar({
      activity: {
        languages: [
          { targetLanguage: "ko", days: 2 },
          { targetLanguage: "en", days: 4 },
          { targetLanguage: "ja", days: 1 },
        ],
        unclassifiedDays: 0,
      },
    }).tree,
  );
  assert.ok(text.includes("🇰🇷"));
  assert.ok(text.includes("🇺🇸"));
  assert.ok(text.includes("ja"));
  for (const count of [1, 2, 4])
    assert.ok(
      text.includes(translate("learningStreak.activityDays", { count })),
    );
  assert.ok(text.includes(translate("learningStreak.activityDescription")));
});

test("a response from a different month is never presented as current activity", () => {
  const text = textOf(
    renderCalendar({
      responseMonth: "2000-1",
      activity: {
        languages: [{ targetLanguage: "en", days: 31 }],
        unclassifiedDays: 0,
      },
    }).tree,
  );
  assert.ok(!text.includes(translate("learningStreak.activityTitle")));
});

test("closing or switching months prevents a late request from updating calendar state", async () => {
  let resolve;
  const pending = new Promise((done) => {
    resolve = done;
  });
  let requested;
  const rendered = renderCalendar({
    request: (year, month) => {
      requested = { year, month };
      return pending;
    },
  });
  const cleanup = rendered.effects[0]();
  cleanup();
  const writesBefore = rendered.writes.length;
  resolve({
    ...requested,
    completedDays: [5],
    languageActivity: {
      languages: [{ targetLanguage: "en", days: 1 }],
      unclassifiedDays: 0,
    },
  });
  await pending;
  await Promise.resolve();
  assert.equal(rendered.writes.length, writesBefore);
});

test("account calendar requests remain unscoped after course selection changes", () => {
  const urls = [];
  const { StatsService } = load("../src/services/stats.service.ts", {
    "./api": {
      __esModule: true,
      default: {
        get: (url) => {
          urls.push(url);
          return Promise.resolve({});
        },
      },
    },
    "@/store/settings.store": { getContentLang: () => "uz" },
  });
  for (const course of ["ko", "en"]) {
    StatsService.getCalendar(2026, 10);
    assert.equal(
      courses.learningScopePath(urls.at(-1), course),
      "/users/me/calendar?year=2026&month=10",
    );
  }
});
