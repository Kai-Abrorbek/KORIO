import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import * as jsxRuntime from "react/jsx-runtime";
import ts from "typescript";
import { ENGLISH_ALPHABET } from "../src/constants/english-alphabet.ts";

const compiled = ts.transpileModule(
  readFileSync(new URL("../src/app/hangul.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  },
).outputText;

function renderPage(
  language,
  { category = "consonant", selected = null } = {},
) {
  let stateIndex = 0;
  const focusEffects = [];
  const calls = { progress: 0, energy: 0, complete: 0 };
  const koreanCharacter = {
    id: "c-giyeok",
    char: "ㄱ",
    category: "consonant",
    name: "기역",
    romanization: "g",
    examples: [],
  };
  const theme = {
    bg: "white",
    text: "black",
    textSecondary: "gray",
    primary: "purple",
  };
  const auth = {
    user: { energy: 5, hangulLevel: "none" },
    updateUser: () => {},
  };
  const dependencies = {
    react: {
      useState: (initial) => {
        const controlled = [category, selected, !!selected];
        const index = stateIndex++;
        return [
          index < controlled.length ? controlled[index] : initial,
          () => {},
        ];
      },
      useMemo: (factory) => factory(),
      useCallback: (callback) => callback,
      useEffect: () => {},
    },
    "react/jsx-runtime": jsxRuntime,
    "react-native": {
      View: "View",
      Text: "Text",
      ScrollView: "ScrollView",
      TouchableOpacity: "TouchableOpacity",
      StyleSheet: { create: (styles) => styles },
    },
    "@expo/vector-icons": { Ionicons: "Ionicons" },
    "@/components/ui/Pressables": { TouchableOpacity: "TouchableOpacity" },
    "react-native-reanimated": {
      __esModule: true,
      default: { View: "AnimatedView" },
      FadeIn: { duration: () => ({}) },
    },
    "react-i18next": {
      useTranslation: () => ({ t: (key) => key, i18n: { language: "ko" } }),
    },
    "expo-router": {
      useLocalSearchParams: () => ({ lang: language }),
      useRouter: () => ({ back: () => {}, replace: () => {}, push: () => {} }),
      useFocusEffect: (effect) => focusEffects.push(effect),
    },
    "@/hooks/useTheme": { useTheme: () => theme },
    "@/constants/hangul": { HANGUL_CHARACTERS: [koreanCharacter] },
    "@/constants/english-alphabet": { ENGLISH_ALPHABET },
    "@/store/energy.store": {
      useEnergyStore: (selector) => selector({ guardLessonStart: () => {} }),
      syncEnergyFromServer: async () => {
        calls.energy++;
      },
    },
    "@/store/auth.store": {
      useAuthStore: Object.assign((selector) => selector(auth), {
        getState: () => auth,
      }),
    },
    "@/services/user.service": {
      UserService: {
        completeHangul: async () => {
          calls.complete++;
        },
      },
    },
    "@/services/hangul.service": {
      HangulService: {
        getProgress: async () => {
          calls.progress++;
          return { progress: [], learnedCount: 0, total: 40 };
        },
      },
    },
  };
  for (const component of [
    "AmbientParticles",
    "MasteryCard",
    "CategoryTabs",
    "CharacterCard",
    "CharacterDetailSheet",
    "EnglishLetterSheet",
    "games/GameMenu",
  ]) {
    dependencies[`@/components/hangul/${component}`] = {
      __esModule: true,
      default: component.split("/").at(-1),
    };
  }
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.ok(dependencies[name], `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return { tree: exports.default(), focusEffects, calls };
}

function elements(tree, type) {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree))
    return tree.flatMap((child) => elements(child, type));
  return [
    ...(tree.type === type ? [tree] : []),
    ...elements(tree.props?.children, type),
  ];
}

test("both languages render the same page layout, mascot hero, tabs and letter grid", () => {
  const korean = renderPage("ko").tree;
  const english = renderPage("en").tree;
  for (const type of ["MasteryCard", "CategoryTabs", "ScrollView"]) {
    assert.equal(elements(korean, type).length, 1);
    assert.equal(elements(english, type).length, 1);
  }
  assert.equal(elements(korean, "CharacterDetailSheet").length, 1);
  assert.equal(elements(english, "EnglishLetterSheet").length, 1);
  assert.equal(elements(english, "CharacterDetailSheet").length, 0);
  assert.deepEqual(
    JSON.parse(JSON.stringify(korean.props.style)),
    JSON.parse(JSON.stringify(english.props.style)),
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(elements(korean, "AnimatedView")[0].props.style)),
    JSON.parse(
      JSON.stringify(elements(english, "AnimatedView")[0].props.style),
    ),
  );
  assert.equal(elements(english, "MasteryCard")[0].props.total, 26);
  assert.equal(
    elements(english, "MasteryCard")[0].props.reference.heading,
    "A–Z",
  );
  assert.equal(elements(korean, "MasteryCard")[0].props.reference, undefined);
});

test("the shared tabs expose all English consonants and vowels with English pronunciation", () => {
  const consonants = renderPage("en").tree;
  const vowels = renderPage("en", {
    category: "vowel",
    selected: ENGLISH_ALPHABET[0],
  }).tree;
  assert.equal(elements(consonants, "CharacterCard").length, 21);
  assert.equal(elements(vowels, "CharacterCard").length, 5);
  const detail = elements(vowels, "EnglishLetterSheet")[0].props;
  assert.equal(detail.letter, "en-a");
  assert.equal(typeof detail.onSelectLetter, "function");
  assert.equal(detail.onStartGame, undefined);
  assert.equal(elements(consonants, "GameMenu").length, 0);
});

test("English cannot read or complete Korean progress, while Korean retains its existing flow", async () => {
  const english = renderPage("en");
  const korean = renderPage("ko");
  for (const effect of [...english.focusEffects, ...korean.focusEffects])
    effect();
  await Promise.resolve();
  assert.deepEqual(english.calls, { progress: 0, energy: 0, complete: 0 });
  assert.equal(korean.calls.progress, 1);
  assert.equal(korean.calls.energy, 1);
  assert.equal(elements(english.tree, "TouchableOpacity").length, 1);
  assert.equal(elements(korean.tree, "TouchableOpacity").length, 2);
  assert.equal(elements(korean.tree, "GameMenu").length, 1);
  assert.equal(
    typeof elements(korean.tree, "CharacterDetailSheet")[0].props.onStartGame,
    "function",
  );
});
