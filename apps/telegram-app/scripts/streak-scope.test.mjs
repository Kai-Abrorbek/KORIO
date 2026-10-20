import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeRequire = createRequire(import.meta.url);

// Render the actual calendar against API response fixtures. Only browser effects,
// authentication, icons and initial React state are replaced; no DOM dependency.
function load(file, mocks = {}) {
  const filename = path.resolve(appRoot, file);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const compiled = { exports: {} };
  const localRequire = (id) => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.endsWith(".css")) {
      return { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
    }
    if (id.includes("/topik/")) return { __esModule: true, default: {} };
    if (id.startsWith(".")) {
      const target = path.resolve(path.dirname(filename), id);
      const resolved = [target, `${target}.ts`, `${target}.tsx`].find(existsSync);
      assert.ok(resolved, `Cannot resolve ${id}`);
      return load(path.relative(appRoot, resolved), mocks);
    }
    return runtimeRequire(id);
  };
  new Function("require", "module", "exports", source)(localRequire, compiled, compiled.exports);
  return compiled.exports;
}

const locales = Object.fromEntries(["ko", "en", "uz", "ru"].map((language) => [
  language,
  load(`src/shared/i18n/locales/${language}.ts`).default,
]));

function calendarFixture(overrides = {}) {
  const today = new Date();
  return {
    completedDays: [1, 2],
    streakDays: [1, 2],
    frozenDays: [],
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    streak: 11,
    longestStreak: 17,
    ...overrides,
  };
}

function renderCalendar(calendar) {
  let stateSlot = 0;
  const { HomeCalendar } = load("src/features/home/ui/home-calendar.tsx", {
    react: {
      useEffect() {},
      useMemo: (factory) => factory(),
      useRef: (value) => ({ current: value }),
      useState: (initial) => [
        stateSlot++ === 1 ? calendar : typeof initial === "function" ? initial() : initial,
        () => {},
      ],
    },
    "../../auth/model/telegram-auth-context": { useTelegramAuth: () => ({ request() {} }) },
    "./home-icon": { HomeIcon: () => null },
    "../../../shared/ui/mobile-icon": { MobileIcon: () => null },
    "../../../shared/ui/use-swipe-to-close": { useSwipeToClose() {} },
  });
  return renderToStaticMarkup(HomeCalendar({ fallbackStreak: 7, fallbackLongestStreak: 13, onClose() {} }));
}

test("all UI languages define the same overall-streak and activity copy", () => {
  const keys = Object.keys(locales.ko.learningStreak).sort();
  for (const [language, locale] of Object.entries(locales)) {
    assert.deepEqual(Object.keys(locale.learningStreak).sort(), keys, language);
    for (const [key, value] of Object.entries(locale.learningStreak)) {
      assert.ok(value.trim(), `${language}.${key}`);
    }
    for (const key of ["days", "activityDays", "activityUnknown"]) {
      assert.equal((locale.learningStreak[key].match(/{{count}}/g) || []).length, 1);
    }
    for (const key of ["shareProgressMessage", "shareProgressPlain"]) {
      const message = locale.retention.quests[key];
      assert.doesNotMatch(message, /한국어|Korean|koreys|корейск|🇰🇷/i);
      assert.match(message, /{{code}}/);
      assert.match(message, /{{link}}/);
    }
  }
});

test("all account-streak surfaces bind to the overall title", () => {
  for (const file of [
    "home/ui/home-screen.tsx",
    "home/ui/home-calendar.tsx",
    "profile/ui/profile-screen.tsx",
    "retention/ui/streak-goal-screen.tsx",
    "misc/ui/streak-day-screen.tsx",
  ]) {
    const source = readFileSync(path.join(appRoot, "src/features", file), "utf8");
    assert.match(source, /learningStreak\.title/, file);
  }
});

test("calendar explains account sharing and retains the aggregate streak", () => {
  const html = renderCalendar(calendarFixture());
  assert.match(html, /data-i18n="learningStreak.title"/);
  assert.match(html, /data-i18n="learningStreak.description"/);
  assert.match(html, /data-i18n="learningStreak.sharedAcrossApps"/);
  assert.match(html, /<strong>11<\/strong>/);
});

test("calendar hides activity when an older API does not supply it", () => {
  assert.doesNotMatch(renderCalendar(calendarFixture()), /learningStreak\.activity/);
});

test("calendar renders API language counts without changing the overall streak", () => {
  const html = renderCalendar(calendarFixture({
    languageActivity: {
      languages: [{ targetLanguage: "ko", days: 5 }, { targetLanguage: "en", days: 3 }],
      unclassifiedDays: 0,
    },
  }));
  assert.match(html, /userCourses.list.korean/);
  assert.match(html, /userCourses.list.english/);
  assert.match(html, /activityDays">5 kun/);
  assert.match(html, /activityDays">3 kun/);
  assert.match(html, /<strong>11<\/strong>/);
  assert.match(html, /learningStreak.activityDescription/);
  assert.match(html, /learningStreak.activityTrackingNotice/);
  assert.doesNotMatch(html, /learningStreak.activityUnknown/);
});

test("empty activity does not invent a zero-day Korean row", () => {
  const html = renderCalendar(calendarFixture({ languageActivity: { languages: [], unclassifiedDays: 0 } }));
  assert.match(html, /learningStreak.activityEmpty/);
  assert.doesNotMatch(html, /userCourses.list.korean/);
  assert.doesNotMatch(html, /learningStreak.activityDays/);
});

test("legacy days are disclosed and future language codes remain usable", () => {
  const html = renderCalendar(calendarFixture({
    languageActivity: { languages: [{ targetLanguage: "ja", days: 2 }], unclassifiedDays: 9 },
  }));
  assert.match(html, /data-no-translate="true">ja<\/span>/);
  assert.match(html, /activityDays">2 kun/);
  assert.match(html, /learningStreak.activityUnknown/);
  assert.match(html, /9 o&#x27;qish kuni/);
  assert.doesNotMatch(html, /userCourses.list.korean/);
});

test("a response for the previous month is not displayed under the selected month", () => {
  const previous = new Date();
  previous.setDate(1);
  previous.setMonth(previous.getMonth() - 1);
  const html = renderCalendar(calendarFixture({
    year: previous.getFullYear(),
    month: previous.getMonth() + 1,
    languageActivity: { languages: [{ targetLanguage: "ko", days: 19 }], unclassifiedDays: 0 },
  }));
  assert.doesNotMatch(html, /learningStreak.activityTitle/);
  assert.match(html, /<strong>7<\/strong>/);
});
