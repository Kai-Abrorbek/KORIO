import Constants from "expo-constants";
import { SettingsSection } from "@/types/settings";

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "main",
    items: [
      {
        id: "display",
        titleKey: "settings.items.display.title",
        descriptionKey: "settings.items.display.description",
        iconName: "sunny",
        iconColor: "#45B7D1",
        iconBgColor: "#DBF0FF",
        route: "/display",
      },
      {
        id: "notifications",
        titleKey: "settings.items.notifications.title",
        descriptionKey: "settings.items.notifications.description",
        iconName: "notifications",
        iconColor: "#F4B860",
        iconBgColor: "#FFF4D6",
        route: "/notifications",
      },
      {
        id: "sound",
        titleKey: "settings.items.sound.title",
        descriptionKey: "settings.items.sound.description",
        iconName: "volume-high",
        iconColor: "#FF7AAD",
        iconBgColor: "#FFE0EC",
        route: "/sound",
      },
      // ── 아직 안 만든 항목들. 기능 붙이면 주석 해제 ──
      // {
      //   id: "favorites",
      //   titleKey: "settings.items.favorites.title",
      //   descriptionKey: "settings.items.favorites.description",
      //   iconName: "star",
      //   iconColor: "#F4B860",
      //   iconBgColor: "#FFF4D6",
      // },
      // {
      //   id: "vocab",
      //   titleKey: "settings.items.vocab.title",
      //   descriptionKey: "settings.items.vocab.description",
      //   iconName: "bookmark",
      //   iconColor: "#A78BFA",
      //   iconBgColor: "#EBE5FA",
      // },
      // {
      //   id: "grammar",
      //   titleKey: "settings.items.grammar.title",
      //   descriptionKey: "settings.items.grammar.description",
      //   iconName: "book",
      //   iconColor: "#FF8888",
      //   iconBgColor: "#FFE0E0",
      // },
      // {
      //   id: "expression",
      //   titleKey: "settings.items.expression.title",
      //   descriptionKey: "settings.items.expression.description",
      //   iconName: "chatbubble",
      //   iconColor: "#FF9F66",
      //   iconBgColor: "#FFE5D0",
      // },
      // {
      //   id: "conversation",
      //   titleKey: "settings.items.conversation.title",
      //   descriptionKey: "settings.items.conversation.description",
      //   iconName: "chatbubbles",
      //   iconColor: "#1DBB7F",
      //   iconBgColor: "#D7F5E5",
      // },
      // {
      //   id: "listening",
      //   titleKey: "settings.items.listening.title",
      //   descriptionKey: "settings.items.listening.description",
      //   iconName: "headset",
      //   iconColor: "#45B7D1",
      //   iconBgColor: "#D5F0F5",
      // },
      // {
      //   id: "league",
      //   titleKey: "settings.items.league.title",
      //   descriptionKey: "settings.items.league.description",
      //   iconName: "school",
      //   iconColor: "#1DBB7F",
      //   iconBgColor: "#D7F5E5",
      //   route: "/league",
      // },
      // {
      //   id: "report",
      //   titleKey: "settings.items.report.title",
      //   descriptionKey: "settings.items.report.description",
      //   iconName: "stats-chart",
      //   iconColor: "#2BABA8",
      //   iconBgColor: "#D0F0F0",
      // },
      {
        id: "account",
        titleKey: "settings.items.account.title",
        descriptionKey: "settings.items.account.description",
        iconName: "person-circle",
        iconColor: "#FF9F66",
        iconBgColor: "#FFE5D0",
        route: "/account",
      },
      // {
      //   id: "subscription",
      //   titleKey: "settings.items.subscription.title",
      //   descriptionKey: "settings.items.subscription.description",
      //   iconName: "diamond",
      //   iconColor: "#45B7D1",
      //   iconBgColor: "#D5F0F5",
      // },
    ],
  },
  {
    id: "support",
    items: [
      {
        id: "help",
        titleKey: "settings.items.help.title",
        descriptionKey: "settings.items.help.description",
        iconName: "help-circle",
        iconColor: "#A78BFA",
        iconBgColor: "#EBE5FA",
        route: "/help",
      },
      {
        id: "language",
        titleKey: "settings.items.language.title",
        descriptionKey: "settings.items.language.description",
        iconName: "globe",
        iconColor: "#45B7D1",
        iconBgColor: "#D5F0F5",
        route: "/language",
      },
      // {
      //   id: "lab",
      //   titleKey: "settings.items.lab.title",
      //   descriptionKey: "settings.items.lab.description",
      //   iconName: "flask",
      //   iconColor: "#2BABA8",
      //   iconBgColor: "#D0F0F0",
      // },
      {
        id: "update",
        titleKey: "settings.items.update.title",
        descriptionKey: "settings.items.update.description",
        iconName: "information-circle",
        iconColor: "#A8A8B0",
        iconBgColor: "#ECECEE",
        route: "/update",
      },
    ],
  },
];

/**
 * app.json 이 진짜 버전이다. 두 군데에 적어두면 반드시 어긋난다
 * (실제로 1.0.0 / 1.2.400 로 갈라져 있었다). 아래 값은 최후의 보루일 뿐이다.
 */
const FALLBACK_VERSION = "1.2.400";

/**
 * 앱 버전.
 *
 * ⚠️ Constants.expoConfig 는 **null 일 수 있다** — 타입부터 `ExpoConfig | null`
 *    이고, 매니페스트가 안 실린 빌드에서 실제로 null 이 된다. 예전 코드는
 *    `?? FALLBACK` 하나였는데 그건 null/undefined 만 막고 **빈 문자열은 통과**시킨다.
 *    그래서 설정 화면에 "Ilova versiyasi: " 뒤가 비어 있었다
 *    (i18n 보간값 누락 경고로 잡혔다).
 */
function resolveAppVersion(): string {
  const v = Constants.expoConfig?.version;
  if (typeof v === "string" && v.trim()) return v.trim();
  if (__DEV__) {
    console.warn(
      "[app] expoConfig 에서 버전을 못 읽었다 — app.json 의 expo.version 을 확인할 것. " +
        `임시로 ${FALLBACK_VERSION} 을 쓴다.`,
    );
  }
  return FALLBACK_VERSION;
}

export const APP_VERSION = resolveAppVersion();
