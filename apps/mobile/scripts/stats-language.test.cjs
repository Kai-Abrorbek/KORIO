/* global __dirname */
// 통계 화면 언어 전환 — 앱·텔레그램이 같은 언어를 고르고, 텔레그램 요청은 그 언어 몫만 묻는다.
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
    },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => {
      if (Object.hasOwn(imports, name)) return imports[name];
      throw new Error(`Unexpected dependency ${name} in ${file}`);
    },
    module,
    module.exports,
  );
  return module.exports;
}

const mobileCourses = load("../src/constants/learnCourses.ts");
const mobile = load("../src/utils/stats-language.ts", {
  "@/constants/learnCourses": mobileCourses,
});
const telegramCourses = load(
  "../../telegram-app/src/features/learning/model/learning-options.ts",
);
const telegram = load("../../telegram-app/src/features/stats/model/stats.ts", {
  "../../learning/model/learning-options": telegramCourses,
  // 영어 코스 + 한국어 화면이면 따로 고른 설명 언어 — 여기선 정해진 값으로
  "../../../shared/i18n/content-language": {
    getContentLang: (target) => (target === "en" ? "ru" : "uz"),
  },
});

for (const [client, stats] of [
  ["mobile", mobile],
  ["telegram", telegram],
]) {
  test(`${client}: a Korean-only learner gets no switch`, () => {
    assert.deepEqual(stats.statsLanguageOptions("ko", "ko", ["ko"]), ["ko"]);
    assert.deepEqual(stats.statsLanguageOptions("ko", "ko", []), ["ko"]);
  });

  test(`${client}: studied languages appear in registry order`, () => {
    assert.deepEqual(stats.statsLanguageOptions("en", "en", ["en", "ko"]), [
      "ko",
      "en",
    ]);
    // 지금 코스·고른 언어는 기록이 없어도 남는다 (방금 바꾼 코스)
    assert.deepEqual(stats.statsLanguageOptions("en", "ko", []), ["ko", "en"]);
  });

  test(`${client}: unknown server languages are ignored`, () => {
    assert.deepEqual(stats.statsLanguageOptions("ko", "ko", ["ja", "ko"]), [
      "ko",
    ]);
  });
}

test("telegram: stats requests ask for the chosen language only", () => {
  const period = new URL(
    telegram.statsLanguagePath("/users/me/stats/period?lang=uz&range=week", "en"),
    "https://api.test",
  );
  assert.equal(period.searchParams.get("targetLanguage"), "en");
  assert.equal(period.searchParams.get("range"), "week");
  assert.equal(period.searchParams.get("lang"), "uz");

  const skills = new URL(
    telegram.statsLanguagePath("/users/me/stats/skills?days=90", "ko"),
    "https://api.test",
  );
  assert.equal(skills.searchParams.get("targetLanguage"), "ko");
});

test("telegram: the study path card reads the chosen course, not the active one", () => {
  const studyPath = new URL(
    telegram.statsLanguagePath("/study-path?lang=uz", "en"),
    "https://api.test",
  );
  assert.equal(studyPath.searchParams.get("courseId"), "en-general");
  assert.equal(studyPath.searchParams.get("targetLanguage"), "en");
  // 설명 언어도 그 코스 기준
  assert.equal(studyPath.searchParams.get("lang"), "ru");
  // 이 경로는 요청 래퍼가 코스를 덮지 않는다 (명시한 코스 유지)
  assert.equal(
    new URL(
      telegramCourses.learningScopePath(
        `${studyPath.pathname}${studyPath.search}`,
        "ko",
      ),
      "https://api.test",
    ).searchParams.get("courseId"),
    "en-general",
  );
});

test("telegram: other requests pass through untouched", () => {
  for (const endpoint of ["/users/me", "/users/me/stats", "/study-path/levels"]) {
    assert.equal(telegram.statsLanguagePath(endpoint, "en"), endpoint);
  }
});
