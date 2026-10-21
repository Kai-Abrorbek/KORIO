/* global __dirname */
const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");
const { componentRuntime, nodes } = require("./helpers/component-runtime.cjs");

const heads = ["cat", "dog", "bird", "milk", "rice", "book"];
const words = (language) =>
  heads.map((head, i) => ({
    id: `${language}-${i}`,
    ko:
      language === "en" ? head : ["고양이", "개", "새", "우유", "밥", "책"][i],
    meaningKo: `뜻${i}`,
    uz: `uz${i}`,
    en: `meaning${i}`,
    ru: `ru${i}`,
    emoji: "🐾",
    difficulty: 1,
  }));
const hasText = (node, text) =>
  nodes(node).some(
    (child) => child.type === "Text" && child.props.children === text,
  );

test("playable words retain the validated original record, including emoji and difficulty", () => {
  const { playableGameWords } = componentRuntime().load(
    path.resolve(__dirname, "../../../shared/word-games.ts"),
  );
  const valid = words("en");
  const invalidFirst = { ...valid[0], ko: "고양이" };
  const duplicateHead = { ...valid[1], id: "duplicate-head", ko: " CAT " };
  const duplicateMeaning = {
    ...valid[2],
    id: "duplicate-meaning",
    meaningKo: valid[0].meaningKo,
  };
  const pool = [invalidFirst, ...valid, duplicateHead, duplicateMeaning];
  const result = playableGameWords(pool, "ko", "en");
  assert.deepEqual(result, valid);
  assert.equal(result[0], valid[0]);
  assert.equal(result[0].emoji, "🐾");
  assert.equal(result[0].difficulty, 1);
  assert.equal(pool.length, 9, "Source data is not mutated");
});

function fixture(
  language = "en",
  initialPool = words(language),
  challenge = false,
  initialOffline = false,
) {
  const settings = { learnCourse: language };
  const session = {
    language,
    targetLanguage: language,
    contentLanguage: language === "en" ? "ko" : "uz",
  };
  const calls = [],
    finishes = [],
    falls = [];
  let pool = initialPool,
    offline = initialOffline,
    runtime;
  const motion = {
    __esModule: true,
    default: { View: "AnimatedView", Text: "AnimatedText" },
    useSharedValue: (value) => runtime.hooks.useRef({ value }).current,
    useAnimatedStyle: (fn) => fn(),
    withTiming: (value, config, done) => {
      if (done) falls.push({ value, config, done, cancelled: false });
      return value;
    },
    withSequence: (value) => value,
    cancelAnimation: () =>
      falls.forEach((fall) => {
        fall.cancelled = true;
      }),
    runOnJS: (fn) => fn,
    Easing: { linear: "linear" },
    FadeIn: { duration: () => ({}) },
    ZoomIn: { duration: () => ({}) },
  };
  runtime = componentRuntime({
    "react-native-reanimated": motion,
    "@/features/games/useGameSession": { useGameSession: () => session },
    "@/store/settings.store": {
      useSettingsStore: (select) => select(settings),
    },
    "@/services/game-words.service": {
      GameWordsApi: {
        pool: async (...args) => {
          calls.push(args);
          if (offline) throw new Error("offline");
          return { words: pool };
        },
      },
    },
    "@/hooks/useLeagueChallenge": {
      useLeagueChallenge: () => ({
        isChallenge: challenge,
        finish: (score) => finishes.push(score),
      }),
    },
    "@/features/games/GameWordsGate": { GameWordsGate: "Gate" },
    "expo-haptics": {
      notificationAsync() {},
      NotificationFeedbackType: { Success: 1, Error: 2 },
    },
  });
  runtime.mount(runtime.load("src/app/word-rain.tsx").default);
  const choices = () =>
    nodes(runtime.tree).filter(
      (node) =>
        node.type === "TouchableOpacity" && node.props.activeOpacity === 0.85,
    );
  const target = () =>
    nodes(runtime.tree).find(
      (node) => node.type === "Text" && node.props.style?.fontSize === 26,
    )?.props.children;
  const score = () =>
    Number(
      nodes(runtime.tree).find(
        (node) => node.type === "Text" && node.props.style?.fontSize === 18,
      )?.props.children ?? 0,
    );
  const hearts = () =>
    nodes(runtime.tree).filter(
      (node) => node.type === "Icon" && node.props.name === "heart",
    ).length;
  const layout = () => {
    const area = nodes(runtime.tree).find((node) => node.props?.onLayout);
    assert.ok(area);
    area.props.onLayout({ nativeEvent: { layout: { height: 400 } } });
    runtime.render();
  };
  const choose = (correct = true) => {
    const index = pool.findIndex((word) => word.ko === target());
    const expected = language === "en" ? `뜻${index}` : `uz${index}`;
    const button = choices().find(
      (node) => hasText(node, expected) === correct,
    );
    assert.ok(button);
    button.props.onPress();
    runtime.render();
  };
  const land = () => {
    falls.at(-1).done(true);
    runtime.render();
  };
  const press = (text) => {
    const button = nodes(runtime.tree).find(
      (node) => node.type === "TouchableOpacity" && hasText(node, text),
    );
    assert.ok(button);
    button.props.onPress();
    runtime.render();
  };
  return {
    runtime,
    session,
    settings,
    calls,
    finishes,
    falls,
    choices,
    target,
    score,
    hearts,
    layout,
    choose,
    land,
    press,
    setPool: (next) => {
      pool = next;
    },
    setOffline: (next) => {
      offline = next;
    },
  };
}

for (const language of ["ko", "en"]) {
  test(`${language}: identical three choices, hearts, combo scoring and fall speed floor`, async () => {
    const h = fixture(language);
    await h.runtime.flush();
    h.layout();
    assert.deepEqual(h.calls, [[40, 5, language]]);
    assert.equal(h.hearts(), 3);
    assert.equal(h.choices().length, 3);
    assert.equal(
      new Set(h.choices().map((node) => node.props.children.props.children))
        .size,
      3,
    );
    assert.equal(h.falls.at(-1).config.duration, 6000);
    const first = h.target(),
      count = h.falls.length;
    h.settings.learnCourse = language === "en" ? "ko" : "en";
    h.runtime.render();
    assert.equal(h.calls.length, 1);
    assert.equal(h.target(), first);
    assert.equal(h.falls.length, count);
    for (let i = 0; i < 20; i++) {
      h.choose();
      h.runtime.advance(420);
    }
    assert.equal(h.score(), 510);
    assert.equal(h.falls.at(-1).config.duration, 2600);
    assert.equal(h.hearts(), 3);
    h.choose(false);
    assert.equal(h.hearts(), 2);
    h.runtime.advance(600);
    h.choose();
    assert.equal(h.score(), 522, "Wrong answers reset the combo");
    h.runtime.unmount();
    assert.equal(h.runtime.timerCount, 0);
  });

  test(`${language}: three missed drops end the same game, restart resets state and exit cancels callbacks`, async () => {
    const h = fixture(language);
    await h.runtime.flush();
    h.layout();
    h.land();
    assert.equal(h.hearts(), 2);
    h.runtime.advance(600);
    h.land();
    assert.equal(h.hearts(), 1);
    h.runtime.advance(600);
    h.land();
    assert.ok(
      nodes(h.runtime.tree).some(
        (node) =>
          node.type === "Text" && node.props.children === "arcade.gameOver",
      ),
    );
    h.press("arcade.playAgain");
    h.runtime.advance(300);
    assert.equal(h.hearts(), 3);
    assert.equal(h.score(), 0);
    assert.equal(h.falls.at(-1).config.duration, 6000);
    h.choose();
    const closingFall = h.falls.at(-1),
      fallsBeforeExit = h.falls.length;
    const exit = nodes(h.runtime.tree).find(
      (node) =>
        node.type === "TouchableOpacity" &&
        nodes(node).some(
          (icon) => icon.type === "Icon" && icon.props.name === "close",
        ),
    );
    exit.props.onPress();
    h.runtime.render();
    closingFall.done(true);
    h.runtime.advance(2000);
    assert.deepEqual(h.finishes, [12]);
    assert.equal(h.falls.length, fallsBeforeExit);
    assert.equal(h.hearts(), 3);
    h.runtime.unmount();
    assert.equal(h.runtime.timerCount, 0);
  });
}

test("duplicate/short/wrong-language pools show retry and exactly three valid words can play", async () => {
  for (const bad of [[], Array(8).fill(words("en")[0]), words("ko")]) {
    const h = fixture("en", bad);
    await h.runtime.flush();
    const gate = nodes(h.runtime.tree).find((node) => node.type === "Gate");
    assert.ok(gate.props.failed);
    assert.equal(h.falls.length, 0);
    h.setPool(words("en").slice(0, 3));
    gate.props.onRetry();
    await h.runtime.flush();
    h.layout();
    assert.equal(h.choices().length, 3);
    assert.ok(h.target());
    h.runtime.unmount();
  }
});

test("offline retry stays English and challenge result submits the existing score without replay", async () => {
  const h = fixture("en", words("en"), true, true);
  await h.runtime.flush();
  const gate = nodes(h.runtime.tree).find((node) => node.type === "Gate");
  assert.ok(gate.props.failed);
  h.setOffline(false);
  gate.props.onRetry();
  await h.runtime.flush();
  h.layout();
  h.choose();
  h.runtime.advance(420);
  h.land();
  h.runtime.advance(600);
  h.land();
  h.runtime.advance(600);
  h.land();
  assert.ok(
    !nodes(h.runtime.tree).some(
      (node) =>
        node.type === "TouchableOpacity" && hasText(node, "arcade.playAgain"),
    ),
  );
  h.press("arcade.exit");
  assert.deepEqual(h.finishes, [12]);
  h.runtime.unmount();
});
