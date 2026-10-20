const assert = require("node:assert/strict");
const test = require("node:test");
const { componentRuntime, nodes } = require("./helpers/component-runtime.cjs");

const en = [
  "cat",
  "dog",
  "bird",
  "fish",
  "milk",
  "rice",
  "tea",
  "cup",
  "book",
  "desk",
  "door",
  "road",
  "rain",
  "snow",
  "tree",
  "star",
  "moon",
  "sun",
];
const ko = [
  "고양이",
  "강아지",
  "새",
  "물고기",
  "우유",
  "밥",
  "차",
  "컵",
  "책",
  "책상",
  "문",
  "길",
  "비",
  "눈",
  "나무",
  "별",
  "달",
  "해",
];
const poolOf = (language) =>
  (language === "en" ? en : ko).map((word, i) => ({
    id: `${language}-${i}`,
    ko: word,
    meaningKo: `뜻${i}`,
    uz: `uz${i}`,
    en: `meaning${i}`,
    ru: `ru${i}`,
  }));
const levels = componentRuntime().load(
  "src/types/word-memory.ts",
).WORD_MEMORY_LEVELS;
const pressWithText = (runtime, text) => {
  const button = nodes(runtime.tree).find(
    (n) =>
      n.type === "TouchableOpacity" &&
      nodes(n).some((c) => c.type === "Text" && c.props.children === text),
  );
  assert.ok(button, text);
  button.props.onPress();
  runtime.render();
};

function screenFixture(language, initialPool = poolOf(language)) {
  const session = {
    language,
    targetLanguage: language,
    contentLanguage: language === "en" ? "ko" : "uz",
  };
  const settings = { learnCourse: language };
  const calls = [],
    scores = [];
  let pool = initialPool;
  const runtime = componentRuntime({
    "@/features/games/useGameSession": { useGameSession: () => session },
    "@/store/settings.store": {
      useSettingsStore: (select) => select(settings),
    },
    "@/services/game-words.service": {
      GameWordsApi: {
        pool: async (...args) => {
          calls.push(args);
          return { words: pool };
        },
      },
    },
    "@/hooks/useLeagueChallenge": {
      useLeagueChallenge: () => ({ finish: (score) => scores.push(score) }),
    },
    "@/components/hangul/games/WordMemoryGame": {
      __esModule: true,
      default: "MemoryEngine",
    },
    "@/features/games/GameWordsGate": { GameWordsGate: "Gate" },
  });
  runtime.mount(runtime.load("src/app/memory-game.tsx").default);
  return {
    runtime,
    settings,
    calls,
    scores,
    setPool: (next) => {
      pool = next;
    },
    engine: () => nodes(runtime.tree).find((n) => n.type === "MemoryEngine"),
  };
}

for (const language of ["ko", "en"]) {
  test(`${language}: same five-level engine, three-star rules and accumulated challenge score`, async () => {
    const h = screenFixture(language);
    await h.runtime.flush();
    assert.deepEqual(h.calls, [[40, 4, language]]);
    for (const config of levels) {
      const engine = h.engine();
      assert.equal(engine.props.level, config.level);
      assert.equal(engine.props.words.length, 18);
      assert.ok(
        engine.props.words.every((word) =>
          (language === "en" ? en : ko).includes(word.ko),
        ),
      );
      const deck = engine.props.words;
      h.settings.learnCourse = language === "en" ? "ko" : "en";
      h.runtime.render();
      assert.equal(
        h.engine().props.words,
        deck,
        "Settings refresh cannot reset the memory deck",
      );
      assert.equal(h.calls.length, 1);
      h.engine().props.onComplete({
        cleared: true,
        moves: config.pairs,
        level: config.level,
      });
      h.runtime.render();
      assert.equal(
        nodes(h.runtime.tree).filter(
          (n) => n.type === "Icon" && n.props.color === "#FFD93D",
        ).length,
        3,
      );
      if (config.level < 5)
        pressWithText(h.runtime, "hangul.wordMemory.nextLevel");
    }
    assert.ok(
      nodes(h.runtime.tree).some(
        (n) =>
          n.type === "Text" &&
          n.props.children === "hangul.wordMemory.allCleared",
      ),
    );
    pressWithText(h.runtime, "hangul.wordMemory.exit");
    assert.deepEqual(h.scores, [30]);
    h.runtime.unmount();
  });
}

test("insufficient distinct pairs show retry, and a failed level can restart without awarding stars", async () => {
  const h = screenFixture("en", Array(30).fill(poolOf("en")[0]));
  await h.runtime.flush();
  assert.equal(h.engine(), undefined);
  const gate = nodes(h.runtime.tree).find((n) => n.type === "Gate");
  assert.equal(gate.props.failed, true);
  h.setPool(poolOf("en"));
  gate.props.onRetry();
  await h.runtime.flush();
  assert.ok(h.engine());
  h.engine().props.onComplete({ cleared: false, moves: 4, level: 1 });
  h.runtime.render();
  assert.equal(
    nodes(h.runtime.tree).filter(
      (n) => n.type === "Icon" && n.props.name === "star",
    ).length,
    0,
  );
  pressWithText(h.runtime, "hangul.wordMemory.retry");
  assert.equal(h.engine().props.level, 1);
  assert.equal(h.calls.length, 2, "Restart reuses the loaded word pool");
  h.runtime.unmount();
});

function boardFixture(language, config) {
  const complete = [];
  const runtime = componentRuntime({
    "react-native": {
      View: "View",
      Text: "Text",
      StyleSheet: { create: (v) => v },
      useWindowDimensions: () => ({ width: 390 }),
    },
    "react-native-reanimated": {
      __esModule: true,
      default: { View: "AnimatedView" },
      useSharedValue: (value) => ({ value }),
      useAnimatedStyle: (fn) => fn(),
      withRepeat: (v) => v,
      withSequence: (v) => v,
      withTiming: (v) => v,
      FadeIn: { duration: () => ({}) },
    },
    "@/utils/haptics": {
      impactAsync: async () => {},
      notificationAsync: async () => {},
      ImpactFeedbackStyle: { Light: 1 },
      NotificationFeedbackType: { Success: 1, Error: 2 },
    },
    "./WordMemoryCard": { __esModule: true, default: "MemoryCard" },
  });
  const pairs = poolOf(language).map((word) => ({
    ko: word.ko,
    uz: language === "en" ? word.meaningKo : word.uz,
  }));
  runtime.mount(
    runtime.load("src/components/hangul/games/WordMemoryGame.tsx").default,
    {
      level: config.level,
      words: pairs,
      theme: { text: "#111", textSecondary: "#777", primary: "#776ee2" },
      onComplete: (result) => complete.push(result),
    },
  );
  const cards = () =>
    nodes(runtime.tree).filter((n) => n.type === "MemoryCard");
  const tap = (id) => {
    cards()
      .find((n) => n.props.card.id === id)
      .props.onPress();
    runtime.render();
  };
  return { runtime, pairs, cards, tap, complete };
}

for (const config of levels) {
  for (const language of ["ko", "en"]) {
    test(`${language}: level ${config.level} preserves ${config.previewMs}ms preview, ${config.timeSec}s and ${config.pairs} pairs`, () => {
      const h = boardFixture(language, config);
      assert.equal(h.cards().length, config.pairs * 2);
      assert.ok(h.cards().every((n) => n.props.card.isFlipped));
      const originalOrder = h.cards().map((n) => n.props.card.display);
      h.runtime.advance(config.previewMs - 1);
      assert.ok(h.cards().every((n) => n.props.card.isFlipped));
      h.runtime.advance(1);
      assert.ok(h.cards().every((n) => !n.props.card.isFlipped));
      h.runtime.advance(500);
      assert.deepEqual(
        h.cards().map((n) => n.props.card.display),
        originalOrder,
      );
      for (let index = 0; index < config.pairs; index++) {
        const pair = h.cards().filter((n) => n.props.card.pairId === index);
        h.tap(pair[0].props.card.id);
        h.tap(pair[1].props.card.id);
        h.runtime.advance(350);
        assert.ok(
          h
            .cards()
            .filter((n) => n.props.card.pairId === index)
            .every((n) => n.props.card.isMatched),
        );
      }
      h.runtime.advance(600);
      assert.equal(h.complete.length, 1);
      assert.equal(h.complete[0].cleared, true);
      assert.equal(h.complete[0].moves, config.pairs);
      assert.equal(h.complete[0].level, config.level);
      h.runtime.unmount();
    });
  }
}

test("the unchanged memory engine times out once without awarding a clear", () => {
  const h = boardFixture("en", levels[0]);
  h.runtime.advance(levels[0].previewMs + 500 + levels[0].timeSec * 1000);
  assert.equal(h.complete.length, 1);
  assert.equal(h.complete[0].cleared, false);
  assert.equal(h.complete[0].moves, 0);
  h.runtime.unmount();
});
