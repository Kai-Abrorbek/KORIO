import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

export interface ExpressionPackTheme {
  icon: ComponentProps<typeof Ionicons>["name"];
  background: string;
  accent: string;
  accentDark: string;
}

const DEFAULT_THEME: ExpressionPackTheme = {
  icon: "chatbubble-ellipses-outline",
  background: "#E7E2FF",
  accent: "#887BE8",
  accentDark: "#5E52C9",
};

const PACK_THEMES: Record<string, ExpressionPackTheme> = {
  greetings: DEFAULT_THEME,
  restaurant: {
    icon: "restaurant-outline",
    background: "#DDF7EF",
    accent: "#2BB69F",
    accentDark: "#178675",
  },
  shopping: {
    icon: "bag-handle-outline",
    background: "#FFE8D3",
    accent: "#EF9A45",
    accentDark: "#C56C1B",
  },
  transport: {
    icon: "train-outline",
    background: "#DDF1FF",
    accent: "#4D9FE8",
    accentDark: "#2A72B5",
  },
  directions: {
    icon: "navigate-outline",
    background: "#FFF1C9",
    accent: "#E8AF2F",
    accentDark: "#A97910",
  },
  school: {
    icon: "school-outline",
    background: "#FFE1EA",
    accent: "#E86D91",
    accentDark: "#B94267",
  },
};

export function expressionPackThemeByCode(code?: string) {
  return (code && PACK_THEMES[code]) || DEFAULT_THEME;
}
