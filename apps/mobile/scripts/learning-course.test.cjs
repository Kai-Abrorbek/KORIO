/* global __dirname */
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function load(relative, imports = {}, globals = {}) {
  const file = path.resolve(__dirname, relative);
  const { outputText } = ts.transpileModule(readFileSync(file, "utf8"), {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const module = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    ...Object.keys(globals),
    outputText,
  )(
    (name) => {
      if (Object.hasOwn(imports, name)) return imports[name];
      throw new Error(`Unexpected dependency ${name} in ${file}`);
    },
    module,
    module.exports,
    ...Object.values(globals),
  );
  return module.exports;
}

const mobile = load("../src/constants/learnCourses.ts");
const telegram = load(
  "../../telegram-app/src/features/learning/model/learning-options.ts",
);

for (const [client, courses] of [
  ["mobile", mobile],
  ["telegram", telegram],
]) {
  test(`${client}: vocabulary request has independent course and explanation language`, () => {
    const url = new URL(
      courses.learningScopePath("/words?section=1&lang=uz", "en"),
      "https://api.test",
    );
    assert.equal(url.searchParams.get("courseId"), "en-general");
    assert.equal(url.searchParams.get("targetLanguage"), "en");
    assert.equal(url.searchParams.get("lang"), "uz");
    assert.equal(url.searchParams.get("section"), "1");
  });

  test(`${client}: Korean legacy requests receive the default Korean course`, () => {
    for (const endpoint of [
      "/words",
      "/lessons/roadmap",
      "/study-path",
      "/speech/transcribe",
      "/learn-progress",
      "/retention/summary",
    ]) {
      const scoped = courses.learningScopePath(endpoint, "ko");
      assert.match(scoped, /courseId=ko-general/);
      assert.match(scoped, /targetLanguage=ko/);
    }
  });

  test(`${client}: daily quests carry the course but are not learning requests`, () => {
    const claim = new URL(
      courses.learningScopePath("/retention/quests/claim", "en"),
      "https://api.test",
    );
    assert.equal(claim.searchParams.get("courseId"), "en-general");
    assert.equal(claim.searchParams.get("targetLanguage"), "en");
    // 받기 응답을 코스 전환 때문에 버리면 보상 연출이 사라진다
    assert.equal(courses.isLearningRequest("/retention/quests/claim"), false);
    assert.equal(courses.isCourseScopedRequest("/retentionx"), false);
  });

  test(`${client}: auth and unrelated or similarly prefixed endpoints are untouched`, () => {
    for (const endpoint of [
      "/auth/login",
      "/users/me",
      "/tts/speech",
      "/wordsmith",
      "/lessons-admin",
    ]) {
      assert.equal(courses.learningScopePath(endpoint, "en"), endpoint);
    }
  });

  test(`${client}: explicit session scope is not replaced by a later selection`, () => {
    const scoped = courses.learningScopePath(
      "/lessons/42?courseId=ko-general&targetLanguage=ko",
      "en",
    );
    assert.equal(
      new URL(scoped, "https://api.test").searchParams.get("courseId"),
      "ko-general",
    );
  });

  test(`${client}: partially explicit scopes are completed from the registry, not the active course`, () => {
    const byId = new URL(
      courses.learningScopePath("/words?courseId=en-general", "ko"),
      "https://api.test",
    );
    assert.equal(byId.searchParams.get("targetLanguage"), "en");
    const byLanguage = new URL(
      courses.learningScopePath("/words?targetLanguage=en", "ko"),
      "https://api.test",
    );
    assert.equal(byLanguage.searchParams.get("courseId"), "en-general");
    const unknown = new URL(
      courses.learningScopePath("/words?courseId=ja-general", "ko"),
      "https://api.test",
    );
    assert.equal(unknown.searchParams.has("targetLanguage"), false);
    const mismatch = new URL(
      courses.learningScopePath(
        "/words?courseId=en-general&targetLanguage=ko",
        "ko",
      ),
      "https://api.test",
    );
    assert.equal(mismatch.searchParams.get("targetLanguage"), "ko");
  });

  test(`${client}: English exposes vocabulary without unsupported Korean modes`, () => {
    assert.ok(courses.LEARN_COURSES.en.modes.includes("vocabulary"));
    assert.ok(!courses.LEARN_COURSES.en.modes.includes("grammar"));
    assert.ok(!courses.LEARN_COURSES.en.modes.includes("topik"));
  });
}

test("both clients use exactly the same course and locale registry", () => {
  assert.deepEqual(
    mobile.DEFAULT_LEARNING_COURSES,
    telegram.DEFAULT_LEARNING_COURSES,
  );
});

// The guided planner is course-scoped (study-path requests carry courseId), so English
// reuses the same structure. The server's levelPicked decides the level picker per course.
test("Telegram English guided vocabulary opens the English study path", () => {
  assert.equal(
    telegram.continueLearningDestination({
      learnCourse: "en",
      learnMode: "vocabulary",
      studyMode: "guided",
    }),
    "/study-path",
  );
  assert.equal(
    telegram.continueLearningDestination({
      learnCourse: "en",
      learnMode: "vocabulary",
      studyMode: "free",
    }),
    "/roadmap",
  );
  assert.equal(
    telegram.continueLearningDestination({
      learnCourse: "ko",
      learnMode: "vocabulary",
      studyMode: "guided",
      hasPickedLevel: true,
    }),
    "/study-path",
  );
});

function settingsFixture() {
  let state;
  let storageOptions;
  const settings = load("../src/store/settings.store.ts", {
    zustand: {
      create: () => (initialize) => {
        state = initialize((patch) =>
          Object.assign(
            state,
            typeof patch === "function" ? patch(state) : patch,
          ),
        );
        const hook = (select) => select(state);
        hook.getState = () => state;
        return hook;
      },
    },
    "zustand/middleware": {
      createJSONStorage: () => ({}),
      persist: (initialize, options) => {
        storageOptions = options;
        return initialize;
      },
    },
    "@react-native-async-storage/async-storage": {},
    "@/constants/learnCourses": mobile,
    "@/utils/speech-voice": {
      DEFAULT_SPEECH_VOICE: "ko-voice",
      DEFAULT_ENGLISH_SPEECH_VOICE: "en-US-voice",
    },
    "../locales/i18n": {
      __esModule: true,
      default: { changeLanguage() {} },
      detectDeviceLanguage: () => "uz",
      detectDeviceContentLanguage: () => "uz",
      isContentLanguage: (value) => ["uz", "en", "ru"].includes(value),
    },
  });
  return { settings, state, rehydrate: storageOptions.onRehydrateStorage() };
}

test("mobile word-card resume positions are separate for each course", () => {
  const { state } = settingsFixture();
  const korean = { section: 6, unit: 1, cardIndex: 8 };
  const english = { section: 1, unit: 2, cardIndex: 3 };
  state.setWordStudyLast(korean);
  state.setLearnCourse("en");
  assert.equal(state.wordStudyLast, null);
  state.setWordStudyLast(english);
  state.setLearnCourse("ko");
  assert.deepEqual(state.wordStudyLast, korean);
  state.setLearnCourse("en");
  assert.deepEqual(state.wordStudyLast, english);
});

test("mobile legacy bookmark migration assigns only the Korean course", () => {
  const { state, rehydrate } = settingsFixture();
  state.wordStudyLast = { section: 3, unit: 9, cardIndex: 1 };
  state.wordStudyPositions = {};
  state.learnCourse = "en";
  rehydrate(state);
  assert.deepEqual(state.wordStudyPositions["ko-general"], {
    section: 3,
    unit: 9,
    cardIndex: 1,
  });
  assert.equal(state.wordStudyLast, null);
});

test("mobile English guided vocabulary opens the English study path", () => {
  const { settings } = settingsFixture();
  assert.equal(
    settings.learnModePath("vocabulary", "1", "guided", "en"),
    "/study-path",
  );
  assert.equal(
    settings.learnModePath("vocabulary", "1", "free", "en"),
    "/roadmap",
  );
  assert.equal(
    settings.learnModePath("vocabulary", "1", "guided", "ko"),
    "/study-path",
  );
});

const telegramContent = load(
  "../../telegram-app/src/shared/i18n/content-language.ts",
  {
    "./language": {
      isAppLanguage: (value) => ["ko", "uz", "en", "ru"].includes(value),
    },
  },
  { navigator: { languages: ["en-US"] } },
);

for (const [client, resolve] of [
  ["mobile", settingsFixture().settings.resolveContentLanguage],
  ["telegram", telegramContent.resolveContentLanguage],
]) {
  test(`${client}: English course supports Korean explanations without changing Korean legacy behavior`, () => {
    assert.equal(resolve("ko", "ru", "en"), "ko");
    assert.equal(resolve("en", "ru", "en"), "ru");
    assert.equal(resolve("en", "en", "en"), "uz");
    assert.equal(resolve("uz", "ru", "en"), "uz");
    assert.equal(resolve("ko", "ru", "ko"), "ru");
    assert.equal(resolve("en", "ru", "ko"), "en");
    assert.equal(resolve("ko", "ru"), "ru");
  });
}

test("mobile API freezes request scope before token lookup and rejects stale results", async () => {
  const state = { learnCourse: "ko" };
  const calls = [];
  const { default: api } = load(
    "../src/services/api.ts",
    {
      "react-native": { Platform: { OS: "web", select: (value) => value.web } },
      "@/store/error.store": {
        useErrorStore: { getState: () => ({ present: async () => false }) },
      },
      "@/store/settings.store": { useSettingsStore: { getState: () => state } },
      "@/constants/learnCourses": mobile,
    },
    {
      __DEV__: false,
      process: { env: { EXPO_PUBLIC_API_URL: "https://api.test" } },
      localStorage: { getItem: () => null },
      fetch: async (url) => {
        calls.push(url);
        return { ok: true, json: async () => ({ items: [] }) };
      },
    },
  );
  const pending = api.get("/words?lang=uz");
  state.learnCourse = "en";
  await assert.rejects(pending, /LEARNING_COURSE_CHANGED/);
  assert.equal(new URL(calls[0]).searchParams.get("courseId"), "ko-general");
  await api.get("/words?lang=uz");
  assert.equal(new URL(calls[1]).searchParams.get("courseId"), "en-general");
});

test("mobile word pagination never mixes Korean and English pages", async () => {
  const state = { learnCourse: "ko" };
  class ApiError extends Error {}
  const { WordService } = load("../src/services/word.service.ts", {
    "@/store/settings.store": {
      getContentLang: () => "uz",
      useSettingsStore: { getState: () => state },
    },
    "@/constants/learnCourses": mobile,
    "@/services/api": {
      __esModule: true,
      ApiError,
      default: {
        get: async () => {
          state.learnCourse = "en";
          return { items: [{ headword: "안녕" }], nextCursor: "second" };
        },
      },
    },
  });
  await assert.rejects(
    WordService.getUnitWords(1, 1),
    /LEARNING_COURSE_CHANGED/,
  );
});

test("Telegram request snapshots use Korean explanations for English and preserve explicit session scope", async () => {
  const calls = [];
  const values = ["token", { learnCourse: "en" }, null];
  const refs = [];
  const react = {
    createContext: () => ({ Provider: "provider" }),
    useState: () => [values.shift(), () => {}],
    useRef: (value) => {
      const ref = { current: value };
      refs.push(ref);
      return ref;
    },
    useCallback: (fn) => fn,
    useMemo: (fn) => fn(),
    useEffect() {},
  };
  const { TelegramAuthProvider } = load(
    "../../telegram-app/src/features/auth/model/telegram-auth-context.tsx",
    {
      react,
      "react/jsx-runtime": {
        jsx: (type, props) => ({ type, props }),
        jsxs: (type, props) => ({ type, props }),
      },
      "../api/telegram-auth": {},
      "../../../shared/api/client": {
        apiRequest: async (path, init) => {
          calls.push({ path, init });
          return {};
        },
      },
      "../../../shared/telegram/runtime": {},
      "../../learning/model/learning-options": telegram,
      "../../../shared/i18n/learning-language-context": {
        LearningLanguageContext: { Provider: "language" },
      },
      "../../../shared/i18n/content-language": telegramContent,
      "../../../shared/i18n/language-context": {
        useAppLanguage: () => ({ language: "ko", savedContentLanguage: "ru" }),
      },
    },
  );
  const { request } = TelegramAuthProvider({ children: null }).props.value;
  await request("/words?lang=uz");
  const current = new URL(calls[0].path, "https://api.test");
  assert.equal(current.searchParams.get("courseId"), "en-general");
  assert.equal(current.searchParams.get("lang"), "ko");
  await request("/lessons/old?courseId=ko-general&targetLanguage=ko&lang=uz");
  const previous = new URL(calls[1].path, "https://api.test");
  assert.equal(previous.searchParams.get("courseId"), "ko-general");
  assert.equal(previous.searchParams.get("lang"), "ru");
  await request("/lessons/questions/en-1/grade", {
    method: "POST",
    body: JSON.stringify({ answer: "hello", lang: "ru" }),
  });
  assert.equal(JSON.parse(calls[2].init.body).lang, "ko");
  const old = request("/words?courseId=en-general&targetLanguage=en");
  refs[0].current = "ko";
  await assert.rejects(old, /LEARNING_COURSE_CHANGED/);
});

test("mobile pending seen-word writes preserve the originating course", async () => {
  const calls = [];
  const { WordService } = load("../src/services/word.service.ts", {
    "@/store/settings.store": {
      useSettingsStore: { getState: () => ({ learnCourse: "en" }) },
    },
    "@/constants/learnCourses": mobile,
    "@/services/api": {
      __esModule: true,
      default: {
        post: async (url, body) => {
          calls.push({ url, body });
          return { seen: 1 };
        },
      },
    },
  });
  await WordService.markSeen(["ko-word"], "ko");
  assert.match(calls[0].url, /courseId=ko-general/);
  assert.deepEqual(calls[0].body.ids, ["ko-word"]);
});
