/* global __dirname */
const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const { componentRuntime, nodes } = require("./helpers/component-runtime.cjs");

const sharedPath = path.resolve(__dirname, "../../../shared/word-games.ts");
const shared = componentRuntime().load(sharedPath);
const english = [
  "apple",
  "bread",
  "water",
  "house",
  "chair",
  "table",
  "train",
  "green",
  "black",
  "small",
];
function words(language) {
  return english.map((word, i) => ({
    id: `${language}-${i}`,
    ko: language === "en" ? word : `단어${i}`,
    meaningKo: `뜻${i}`,
    uz: `uz${i}`,
    en: `definition${i}`,
    ru: `ru${i}`,
  }));
}

function fixture({
  language = "en",
  learned = [],
  pool = words(language),
  fail = false,
} = {}) {
  const calls = [],
    finishes = [];
  let currentFail = fail,
    learnedWords = learned,
    poolWords = pool;
  const runtime = componentRuntime({
    "@/services/lesson.service": {
      LessonService: {
        getLearnedWords: async (...args) => {
          calls.push({ kind: "learned", args });
          if (currentFail) throw new Error("offline");
          return { words: learnedWords };
        },
      },
    },
    "@/services/game-words.service": {
      GameWordsApi: {
        pool: async (...args) => {
          calls.push({ kind: "pool", args });
          if (currentFail) throw new Error("offline");
          return { words: poolWords };
        },
      },
    },
    "@/store/settings.store": { getContentLang: () => "uz" },
    "@/components/lesson/MatchPairCard": {
      __esModule: true,
      default: "PairCard",
    },
    "./MatchProgressBar": { __esModule: true, default: "Progress" },
    "./XpRewardScreen": { __esModule: true, default: "Reward" },
    "@/features/games/GameWordsGate": { GameWordsGate: "Gate" },
  });
  const Match = runtime.load("src/components/match-game/MatchGame.tsx").default;
  runtime.mount(Match, {
    targetLanguage: language,
    contentLanguage: language === "en" ? "ko" : "uz",
    onExit() {},
    onFinish: (v) => finishes.push(v),
  });
  const cards = () =>
    nodes(runtime.tree).filter((node) => node.type === "PairCard");
  function pickPair() {
    const left = cards()
      .slice(0, 5)
      .find((card) => card.props.status === "idle");
    assert.ok(left);
    const index = poolWords.findIndex((word) => word.ko === left.props.text);
    const meaning = language === "en" ? `뜻${index}` : `uz${index}`;
    const right = cards()
      .slice(5)
      .find((card) => card.props.text === meaning);
    assert.ok(right, meaning);
    left.props.onPress();
    runtime.render();
    cards()
      .find((card) => card.props.text === right.props.text)
      .props.onPress();
    runtime.render();
  }
  return {
    ...runtime,
    calls,
    finishes,
    cards,
    pickPair,
    get tree() {
      return runtime.tree;
    },
    get timerCount() {
      return runtime.timerCount;
    },
    setData({
      fail: nextFail = false,
      learned: nextLearned = [],
      pool: nextPool = words(language),
    } = {}) {
      currentFail = nextFail;
      learnedWords = nextLearned;
      poolWords = nextPool;
    },
  };
}

test("shared adapter uses all four explanation languages and unambiguous learned-first labels", () => {
  const word = words("en")[0];
  for (const [locale, expected] of [
    ["ko-KR", word.meaningKo],
    ["en", word.en],
    ["ru", word.ru],
    ["uz", word.uz],
  ]) {
    assert.equal(shared.gameWordMeaning(word, locale), expected);
  }
  const learned = [
    { korean: "apple", native: "사과" },
    { korean: "APPLE", native: "다른 뜻" },
    { korean: "pear", native: "사과" },
  ];
  const result = shared.matchingPool(
    learned,
    [word, { ...word, id: "other", ko: "한국어" }],
    "ko",
    "en",
  );
  assert.deepEqual(result, [{ id: "apple", ko: "apple", native: "사과" }]);
  assert.equal(shared.isWordGameAvailable("matchGame", "en"), true);
  assert.equal(shared.isWordGameAvailable("wordMemory", "en"), true);
  assert.equal(shared.isWordGameAvailable("particleRush", "ko"), true);
});

for (const language of ["ko", "en"]) {
  test(`${language}: same ten cards, sixty-second timer, correct/wrong feedback and five-match milestone`, async () => {
    const h = fixture({ language });
    await h.flush();
    assert.equal(h.cards().length, 10);
    assert.deepEqual(h.calls[0].args, [
      language,
      language === "en" ? "ko" : "uz",
    ]);
    assert.deepEqual(h.calls[1].args, [15, 5, language]);
    assert.ok(
      h
        .cards()
        .slice(0, 5)
        .every((card) => words(language).some((w) => w.ko === card.props.text)),
    );
    // The two languages execute the very same matching and animation callbacks.
    const left = h.cards()[0];
    const index = words(language).findIndex((w) => w.ko === left.props.text);
    const right = h
      .cards()
      .slice(5)
      .find(
        (card) =>
          card.props.text !== (language === "en" ? `뜻${index}` : `uz${index}`),
      );
    left.props.onPress();
    h.render();
    h.cards()
      .find((card) => card.props.text === right.props.text)
      .props.onPress();
    h.render();
    assert.equal(
      h.cards().filter((card) => card.props.status === "wrong").length,
      2,
    );
    h.advance(520);
    for (let i = 0; i < 5; i++) {
      h.pickPair();
      assert.equal(
        h.cards().filter((card) => card.props.status === "correct").length,
        2,
      );
      h.advance(620);
      assert.ok(h.cards().some((card) => card.props.vanishing));
      h.advance(420);
    }
    const reward = nodes(h.tree).find((node) => node.type === "Reward");
    assert.equal(reward.props.xp, 5);
    assert.equal(reward.props.stars, null);
    // Milestone pauses time just as before, then resumes on continue.
    h.advance(60000);
    assert.equal(nodes(h.tree).find((n) => n.type === "Reward").props.xp, 5);
    reward.props.onContinue();
    h.render();
    h.advance(60000);
    const final = nodes(h.tree).find((node) => node.type === "Reward");
    final.props.onContinue();
    h.render();
    assert.equal(h.finishes[0].matched, 5);
    assert.equal(h.finishes[0].bestCombo, 5);
    h.unmount();
  });
}

test("a learned-only pool does not fetch filler or use a hardcoded Korean fallback", async () => {
  const learned = words("en").map((w, i) => ({
    korean: w.ko,
    native: `뜻${i}`,
  }));
  const h = fixture({ learned });
  await h.flush();
  assert.equal(h.cards().length, 10);
  assert.equal(h.calls.length, 1);
  assert.ok(
    h
      .cards()
      .slice(0, 5)
      .every((card) => english.includes(card.props.text)),
  );
  h.unmount();
});

test("offline/short/duplicate pools do not start a broken board or timer; retry can recover", async () => {
  for (const options of [
    { fail: true },
    { pool: [] },
    { pool: Array(10).fill(words("en")[0]) },
  ]) {
    const h = fixture(options);
    await h.flush();
    assert.equal(h.cards().length, 0);
    assert.equal(h.timerCount, 0);
    const gate = nodes(h.tree).find((node) => node.type === "Gate");
    assert.ok(gate.props.failed);
    h.setData();
    gate.props.onRetry();
    await h.flush();
    assert.equal(h.cards().length, 10);
    h.unmount();
  }
});

test("the existing game route snapshots explicit course and explanation language", () => {
  const settings = { learnCourse: "ko", language: "ko", contentLanguage: "uz" };
  const state = () => settings;
  state.getState = () => settings;
  const runtime = componentRuntime({
    "expo-router": { useLocalSearchParams: () => ({ targetLanguage: "en" }) },
    "@/store/settings.store": {
      useSettingsStore: state,
      resolveContentLanguage: (ui, saved, target) =>
        target === "en" && ui === "ko" ? "ko" : saved,
    },
    "@/hooks/useLeagueChallenge": {
      useLeagueChallenge: () => ({
        isChallenge: false,
        finish() {},
        goBack() {},
      }),
    },
    "@/components/match-game/MatchGame": { __esModule: true, default: "Match" },
  });
  runtime.mount(runtime.load("src/app/match-game.tsx").default);
  const match = () => nodes(runtime.tree).find((node) => node.type === "Match");
  assert.equal(match().props.targetLanguage, "en");
  assert.equal(match().props.contentLanguage, "ko");
  settings.learnCourse = "en";
  settings.language = "ru";
  runtime.render();
  assert.equal(match().props.contentLanguage, "ko");
  runtime.unmount();
});

test("game pool and learned-word adapters send explicit English scope and Korean meanings", async () => {
  const paths = [];
  const runtime = componentRuntime({
    "./api": {
      __esModule: true,
      default: {
        get: async (p) => {
          paths.push(p);
          return {};
        },
      },
    },
    "@/store/settings.store": { getContentLang: () => "uz" },
  });
  const gameApi = runtime.load(
    "src/services/game-words.service.ts",
  ).GameWordsApi;
  const lessons = runtime.load("src/services/lesson.service.ts").LessonService;
  await gameApi.pool(15, 5, "en");
  await lessons.getLearnedWords("en", "ko");
  for (const p of paths) {
    const query = new URL(p, "https://test.invalid").searchParams;
    assert.equal(query.get("targetLanguage"), "en");
    assert.equal(query.get("courseId"), "en-general");
  }
  assert.equal(
    new URL(paths[1], "https://test.invalid").searchParams.get("lang"),
    "ko",
  );
});

test("unported game loaders remain unavailable in English rather than silently switching data", async () => {
  const calls = [];
  const settings = { learnCourse: "en" };
  const runtime = componentRuntime({
    "@/store/settings.store": {
      useSettingsStore: (select) => select(settings),
    },
    "@/services/game-words.service": {
      GameWordsApi: {
        pool: async (...args) => {
          calls.push(args);
          return { words: words("ko") };
        },
      },
    },
  });
  const { useGameWords } = runtime.load("src/features/games/useGameWords.ts");
  runtime.mount(() => useGameWords(40, 5));
  await runtime.flush();
  assert.equal(runtime.tree.failed, true);
  assert.equal(runtime.tree.words, null);
  assert.equal(calls.length, 0);
  settings.learnCourse = "ko";
  await runtime.flush();
  await runtime.flush();
  assert.equal(runtime.tree.failed, false);
  assert.equal(runtime.tree.words.length, 10);
  assert.deepEqual(calls, [[40, 5, "ko"]]);
  runtime.unmount();
});

test("the same games hub keeps all Korean games and routes only the verified English game", () => {
  for (const language of ["ko", "en"]) {
    const pushed = [];
    const runtime = componentRuntime({
      "expo-router": {
        useLocalSearchParams: () => ({ targetLanguage: language }),
        router: {
          push: (p) => pushed.push(p),
          canGoBack: () => true,
          back() {},
        },
      },
      "@/store/settings.store": {
        useSettingsStore: (select) => select({ learnCourse: "ko" }),
      },
      "@/components/home/HaneulmonMascot": {
        __esModule: true,
        default: "Mascot",
      },
    });
    runtime.mount(runtime.load("src/app/games.tsx").default);
    const cards = nodes(runtime.tree).filter(
      (n) => n.type?.name === "GameCard",
    );
    assert.equal(cards.length, language === "en" ? 2 : 7);
    const match = cards.find((card) => card.props.game.id === "matchGame");
    const cardTree = match.type(match.props);
    nodes(cardTree)
      .find((n) => n.type === "Pressable")
      .props.onPress();
    assert.deepEqual(pushed[0], {
      pathname: "/match-game",
      params: { targetLanguage: language },
    });
    assert.equal(
      nodes(runtime.tree).some(
        (n) => n.type === "Text" && n.props.children === "games.hangulTitle",
      ),
      language === "ko",
    );
    runtime.unmount();
  }
});
