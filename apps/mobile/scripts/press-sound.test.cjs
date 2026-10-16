const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const sourceRoot = path.resolve(__dirname, "../src");
function loadSource(relative, dependencies = {}) {
  const exports = {};
  const compiled = ts.transpileModule(
    fs.readFileSync(path.join(sourceRoot, relative), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  ).outputText;
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.ok(dependencies[name], `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  return exports;
}

function fixture() {
  const transaction = loadSource("utils/press-sound.ts");
  const sounds = [];
  const play = (key) => {
    transaction.claimPressSound();
    sounds.push(key);
  };
  const controls = loadSource("components/ui/Pressables.tsx", {
    react: {
      forwardRef: (render) => (props, ref) => render(props, ref),
      useCallback: (callback) => callback,
    },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "react-native": Object.fromEntries(
      [
        "Pressable",
        "TouchableOpacity",
        "TouchableHighlight",
        "TouchableWithoutFeedback",
        "Button",
        "Switch",
        "Text",
      ].map((name) => [name, name]),
    ),
    "@/hooks/useSound": { useSound: () => ({ play }) },
    "@/utils/press-sound": transaction,
  });
  return { ...transaction, sounds, play, controls };
}

test("default clicks follow the action and explicit selection/answer sounds win", () => {
  const { runWithDefaultPressSound, claimPressSound } = fixture();
  const calls = [];
  runWithDefaultPressSound(
    () => calls.push("action"),
    () => calls.push("click"),
  );
  assert.deepEqual(calls, ["action", "click"]);
  runWithDefaultPressSound(
    () => {
      claimPressSound();
      calls.push("correct");
    },
    () => calls.push("unexpected click"),
  );
  assert.deepEqual(calls, ["action", "click", "correct"]);
});

test("nested handlers and the same bubbling event produce only one sound", () => {
  const { runWithDefaultPressSound } = fixture();
  const calls = [];
  const event = {};
  runWithDefaultPressSound(
    () => {
      runWithDefaultPressSound(
        () => calls.push("inner action"),
        () => calls.push("inner click"),
        { event },
      );
      calls.push("outer action");
    },
    () => calls.push("outer click"),
    { event },
  );
  runWithDefaultPressSound(
    () => calls.push("parent action"),
    () => calls.push("parent click"),
    { event },
  );
  assert.deepEqual(calls, [
    "inner action",
    "outer action",
    "outer click",
    "parent action",
  ]);
  runWithDefaultPressSound(
    () => {},
    () => calls.push("next click"),
    { event: {} },
  );
  assert.equal(calls.at(-1), "next click");
});

test("outer explicit feedback suppresses nested defaults and custom defaults retain priority", () => {
  const { runWithDefaultPressSound, claimPressSound } = fixture();
  const calls = [];
  runWithDefaultPressSound(
    () => {
      runWithDefaultPressSound(
        () => {},
        () => calls.push("inner click"),
      );
      claimPressSound();
      calls.push("select");
    },
    () => calls.push("outer click"),
  );
  assert.deepEqual(calls, ["select"]);
  runWithDefaultPressSound(
    () => {
      runWithDefaultPressSound(
        () => {},
        () => calls.push("custom"),
        { preferDefault: true },
      );
    },
    () => calls.push("outer click"),
  );
  assert.deepEqual(calls, ["select", "custom"]);
});

test("pooled React Native event reuse still plays every distinct press", () => {
  const { runWithDefaultPressSound } = fixture();
  const calls = [];
  const pooled = { nativeEvent: { timestamp: 1 } };
  runWithDefaultPressSound(
    () => {},
    () => calls.push("first"),
    { event: pooled },
  );
  runWithDefaultPressSound(
    () => {},
    () => calls.push("duplicate"),
    { event: pooled },
  );
  pooled.nativeEvent = { timestamp: 2 };
  runWithDefaultPressSound(
    () => {},
    () => calls.push("second"),
    { event: pooled },
  );
  assert.deepEqual(calls, ["first", "second"]);
});

test("silent presses still act, disabled presses do neither, and thrown actions clear the transaction", () => {
  const { runWithDefaultPressSound } = fixture();
  const calls = [];
  runWithDefaultPressSound(
    () => calls.push("silent action"),
    () => calls.push("click"),
    { silent: true },
  );
  runWithDefaultPressSound(
    () => calls.push("disabled action"),
    () => calls.push("click"),
    { disabled: true },
  );
  assert.throws(
    () =>
      runWithDefaultPressSound(
        () => {
          throw new Error("action failed");
        },
        () => calls.push("click"),
      ),
    /action failed/,
  );
  runWithDefaultPressSound(
    () => {},
    () => calls.push("next click"),
  );
  assert.deepEqual(calls, ["silent action", "next click"]);
});

test("every native press wrapper forwards refs and props and respects custom/disabled/silent presses", () => {
  const { controls, sounds, play } = fixture();
  for (const name of [
    "Pressable",
    "TouchableOpacity",
    "TouchableHighlight",
    "TouchableWithoutFeedback",
    "Button",
    "PressableText",
  ]) {
    const ref = {};
    const style = () => ({ opacity: 0.8 });
    let calls = 0;
    const element = controls[name](
      {
        onPress: () => {
          calls++;
        },
        style,
        children: "label",
        accessibilityLabel: "action",
      },
      ref,
    );
    assert.equal(element.props.ref, ref);
    assert.equal(element.props.style, style);
    assert.equal(element.props.children, "label");
    assert.equal(element.props.accessibilityLabel, "action");
    element.props.onPress({});
    assert.equal(calls, 1);
    assert.equal(sounds.at(-1), "click");

    const before = sounds.length;
    controls[name]({ onPress: () => play("select") }).props.onPress({});
    assert.deepEqual(sounds.slice(before), ["select"]);
    controls[name]({
      onPress: () => {
        calls++;
      },
      sound: false,
    }).props.onPress({});
    assert.equal(sounds.length, before + 1);
    controls[name]({
      onPress: () => {
        calls++;
      },
      disabled: true,
    }).props.onPress({});
    assert.equal(calls, 2);
    assert.equal(sounds.length, before + 1);
    controls[name]({ onPress: () => {}, sound: "wrong" }).props.onPress({});
    assert.equal(sounds.at(-1), "wrong");
  }
});

test("scroll touches, focus/press-in, and handler-less controls do not play", () => {
  const { controls, sounds } = fixture();
  const pressIn = () => {};
  const element = controls.Pressable({ onPressIn: pressIn });
  assert.equal(element.props.onPress, undefined);
  assert.equal(element.props.onPressIn, pressIn);
  pressIn({});
  assert.deepEqual(sounds, []);
});

test("native switch invokes both native callbacks before fallback and plays once", () => {
  const { controls, sounds } = fixture();
  const calls = [];
  const event = { nativeEvent: { value: true } };
  const element = controls.Switch({
    value: false,
    onChange: (change) => calls.push(change),
    onValueChange: (value) => {
      assert.deepEqual(sounds, []);
      calls.push(value);
    },
  });
  element.props.onChange(event);
  assert.deepEqual(calls, [event, true]);
  assert.deepEqual(sounds, ["click"]);
  assert.equal(element.props.onValueChange, undefined);
});

test("authored native dialog buttons preserve actions and use one settings-aware fallback", () => {
  const { runWithDefaultPressSound, sounds, play } = fixture();
  const calls = [];
  const { useSoundAlert } = loadSource("hooks/useSoundAlert.ts", {
    react: { useCallback: (callback) => callback, useMemo: (create) => create() },
    "react-native": { Alert: { alert: (...args) => calls.push(args) } },
    "react-i18next": { useTranslation: () => ({ t: () => "Confirm" }) },
    "@/hooks/useSound": { useSound: () => ({ play }) },
    "@/utils/press-sound": { runWithDefaultPressSound },
  });
  const dialog = useSoundAlert();
  let acted = false;
  const options = { cancelable: true };
  dialog.alert("Title", "Body", [
    { text: "Cancel", style: "cancel" },
    { text: "Buy", onPress: () => { acted = true; play("correct"); } },
  ], options);
  assert.equal(calls[0][3], options);
  const buttons = calls[0][2];
  assert.equal(buttons[0].style, "cancel");
  buttons[0].onPress();
  buttons[1].onPress();
  assert.equal(acted, true);
  assert.deepEqual(sounds, ["click", "correct"]);
  dialog.alert("Notice");
  assert.equal(calls[1][2][0].text, "Confirm");
  calls[1][2][0].onPress();
  assert.equal(sounds.at(-1), "click");
});

test("mobile application controls cannot bypass the shared sound wrappers", () => {
  const interactive = new Set([
    "Pressable",
    "TouchableOpacity",
    "TouchableHighlight",
    "TouchableWithoutFeedback",
    "TouchableNativeFeedback",
    "Button",
    "Switch",
  ]);
  const failures = [];
  function scan(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        scan(file);
        continue;
      }
      if (!/\.tsx?$/.test(file) || file.endsWith("Pressables.tsx")) continue;
      const source = ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
        file.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const nativeTexts = new Set();
      for (const node of source.statements) {
        if (
          !ts.isImportDeclaration(node) ||
          node.importClause?.isTypeOnly ||
          !node.importClause?.namedBindings ||
          !ts.isNamedImports(node.importClause.namedBindings)
        )
          continue;
        if (
          !["react-native", "react-native-gesture-handler"].includes(
            node.moduleSpecifier.text,
          )
        )
          continue;
        for (const specifier of node.importClause.namedBindings.elements) {
          if (specifier.isTypeOnly) continue;
          const name = specifier.propertyName?.text || specifier.name.text;
          if (interactive.has(name))
            failures.push(
              `${path.relative(sourceRoot, file)} imports native ${name}`,
            );
          if (name === "Text") nativeTexts.add(specifier.name.text);
        }
      }
      function visit(node) {
        if (
          (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
          nativeTexts.has(node.tagName.getText(source)) &&
          node.attributes.properties.some(
            (attribute) =>
              ts.isJsxAttribute(attribute) &&
              ["onPress", "onLongPress"].includes(
                attribute.name.getText(source),
              ),
          )
        )
          failures.push(
            `${path.relative(sourceRoot, file)} has clickable native Text`,
          );
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
  scan(sourceRoot);
  assert.deepEqual(failures, []);
});
