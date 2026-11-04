// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      // expo-router 는 react-navigation 을 자기 안에 따로 들고 있다(vendoring).
      // @react-navigation/* 에서 훅을 가져오면 다른 인스턴스라 네비게이션 컨텍스트를
      // 못 찾고 "Couldn't find a navigation object" 로 터진다 — 릴리스 빌드에서는
      // 화면을 여는 순간 앱이 꺼진다. 같은 훅은 전부 expo-router 에 있다.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@react-navigation/*"],
              message:
                "expo-router 에서 가져오세요 (useIsFocused, useFocusEffect, useNavigation, ThemeProvider …). @react-navigation/* 는 다른 컨텍스트라 앱이 꺼집니다.",
            },
          ],
        },
      ],
    },
  },
]);
