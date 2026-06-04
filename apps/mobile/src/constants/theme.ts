export const themes = {
  light: {
    bg: "#ffffff",
    surface: "#FFFFFF",
    primary: "#776ee2",
    text: "#1A1A2E",
    textSecondary: "#55555F",
    border: "#ECEAF6",
    navy: "#1A1A2E",
  },
  dark: {
    bg: "#15151D",
    surface: "#25252E",
    primary: "#776ee2",
    text: "#FFFFFF",
    textSecondary: "#A6A6B3",
    border: "#3A3A44",
    navy: "#1A1A2E",
  },
};

export type ThemeColors = typeof themes.light;
